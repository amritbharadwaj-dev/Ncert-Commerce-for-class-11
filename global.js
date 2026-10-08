// Global Widget & Telegram Integration Logic - Snap to Edges, No Blur & Cool Cartoon

const TG_BOT_TOKEN = "8619738096:AAFcVqqGP4zkoTkV9zd9fsBinJOsVsGkAyA";
const TG_CHAT_ID = "8871892242";

// Eye toggle state localStorage me save rehta hai ('off' tabhi hoga jab user khud band kare)
let showLiveMessages = localStorage.getItem('eye_live_messages') !== 'off';
let lastProcessedUpdateId = 0;

document.addEventListener('DOMContentLoaded', () => {
    injectGlobalWidget();
    loadIdentity();
    applyEyeState();
    startTelegramPolling();
    makeAvatarDraggable();
});

// Inject Global Widget HTML dynamically across all pages
function injectGlobalWidget() {
    if (!document.getElementById('global-widget-root')) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div id="global-widget-root">
            <!-- Draggable support avatar -->
            <div id="floating-avatar-btn" onclick="handleAvatarClick(event)" class="fixed bottom-24 right-4 z-50 w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-1 shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 flex items-center justify-center select-none touch-none">
                <div class="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center border-3 border-white dark:border-slate-800 shadow-inner">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=CoolBuddy99&backgroundColor=b6e3f4,c0aede,d1d4f9" alt="Support" class="w-full h-full object-cover">
                </div>
            </div>

            <!-- Contact drawer -->
            <div id="contactDrawer" class="fixed inset-0 z-50 bg-black/30 hidden flex items-end justify-center transition-opacity">
                <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-3xl p-5 space-y-4 shadow-2xl border-t border-slate-200 dark:border-slate-800 max-h-[88vh] flex flex-col">
                    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div class="flex items-center space-x-2 min-w-0">
                            <div class="bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-1.5 rounded-xl">
                                <i data-lucide="message-square" class="w-4 h-4"></i>
                            </div>
                            <h3 class="font-extrabold text-xs text-slate-900 dark:text-white truncate">For any issue please contact us and send message</h3>
                        </div>
                        <div class="flex items-center space-x-2 flex-shrink-0">
                            <button onclick="toggleTelegramEye()" id="eyeToggleBtn" title="Toggle Live Messages" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                <i data-lucide="eye" id="eyeIcon" class="w-4 h-4"></i>
                            </button>
                            <button onclick="toggleContactDrawer()" title="Close" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                <i data-lucide="x" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <div class="overflow-y-auto space-y-3 pr-1 flex-grow">
                        <!-- Identity -->
                        <div class="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                            <label class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Identity</label>
                            <input type="password" id="userIdentityInput" oninput="saveUserIdentity(this.value)" class="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white font-mono tracking-widest" placeholder="Enter your identity...">
                        </div>

                        <!-- Live messages -->
                        <div id="liveMessageBox" class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[120px] max-h-[260px] overflow-y-auto flex flex-col justify-end space-y-2">
                            <div class="text-xs text-slate-400 italic text-center py-6" id="chatPlaceholder">
                                Send a message to start conversation.
                            </div>
                        </div>

                        <!-- WhatsApp-style selected attachment preview -->
                        <div id="attachPreview" class="hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
                            <div id="attachMediaPreview" class="hidden w-full max-h-64 bg-slate-950 flex items-center justify-center overflow-hidden"></div>
                            <div class="flex items-center gap-3 p-3">
                                <div id="attachThumb" class="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 flex-shrink-0">
                                    <i data-lucide="file" class="w-5 h-5"></i>
                                </div>
                                <div class="min-w-0 flex-1">
                                    <div id="attachType" class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Attachment</div>
                                    <div id="attachName" class="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate"></div>
                                </div>
                                <button onclick="clearPendingFile()" title="Remove attachment" class="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center flex-shrink-0">
                                    <i data-lucide="x" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>

                        <!-- WhatsApp-style attachment menu: Camera / Photo & Video / File -->
                        <div id="attachMenu" class="hidden flex items-stretch gap-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-2">
                            <button onclick="pickCamera()" class="flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition text-slate-800 dark:text-slate-100">
                                <span class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <i data-lucide="camera" class="w-5 h-5"></i>
                                </span>
                                <span class="text-[10px] font-bold">Camera</span>
                            </button>
                            <button onclick="pickFile('media')" class="flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition text-slate-800 dark:text-slate-100">
                                <span class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <i data-lucide="image" class="w-5 h-5"></i>
                                </span>
                                <span class="text-[10px] font-bold">Photo &amp; Video</span>
                            </button>
                            <button onclick="pickFile('any')" class="flex-1 min-w-0 flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-[0.98] transition text-slate-800 dark:text-slate-100">
                                <span class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <i data-lucide="file" class="w-5 h-5"></i>
                                </span>
                                <span class="text-[10px] font-bold">File</span>
                            </button>
                        </div>

                        <!-- Hidden native pickers -->
                        <input type="file" id="fileInput" class="hidden" onchange="handleFileSelected(this)">
                        <input type="file" id="cameraInput" class="hidden" accept="image/*,video/*" capture="environment" onchange="handleFileSelected(this)">

                        <!-- Voice recording status -->
                        <div id="voiceStatus" class="hidden items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2">
                            <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span class="text-xs font-semibold text-slate-800 dark:text-slate-100">Recording</span>
                            <span id="voiceTimer" class="text-xs tabular-nums text-slate-500 dark:text-slate-400">00:00</span>
                            <span class="flex-1"></span>
                            <button onclick="stopVoiceRecording()" class="text-xs font-bold px-2.5 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black">Send</button>
                        </div>

                        <!-- Clean chat bar: plus / text / voice / send -->
                        <div class="flex items-center gap-2 pt-1">
                            <button onclick="toggleAttachMenu()" id="attachButton" title="Attach" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                <i data-lucide="plus" class="w-5 h-5"></i>
                            </button>

                            <div class="flex-1 min-w-0">
                                <input type="text" id="messageInput" placeholder="Type message here..." class="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs rounded-2xl px-4 py-3 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white">
                            </div>

                            <button onclick="toggleVoiceRecording()" id="voiceButton" title="Voice recording" class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                                <i data-lucide="mic" id="voiceIcon" class="w-5 h-5"></i>
                            </button>

                            <button onclick="sendTelegramMessage()" id="sendButton" title="Send" class="w-10 h-10 rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 flex items-center justify-center flex-shrink-0 transition shadow-md">
                                <i data-lucide="send" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.appendChild(div);
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

// Draggable Avatar with Snap-to-Edge Logic (Sides only)
let isDragging = false;
let startX, startY, initialX, initialY;

function makeAvatarDraggable() {
    const avatar = document.getElementById('floating-avatar-btn');
    if (!avatar) return;

    const dragStart = (e) => {
        isDragging = false;
        startX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        startY = e.clientY || (e.touches ? e.touches[0].clientY : 0);
        
        const rect = avatar.getBoundingClientRect();
        initialX = rect.left;
        initialY = rect.top;

        avatar.style.transition = 'none';
        avatar.style.bottom = 'auto';
        avatar.style.right = 'auto';
        avatar.style.left = initialX + 'px';
        avatar.style.top = initialY + 'px';

        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
        document.addEventListener('touchmove', dragMove, { passive: false });
        document.addEventListener('touchend', dragEnd);
    };

    const dragMove = (e) => {
        const clientX = e.clientX || (e.touches ? e.touches[0].clientX : 0);
        const clientY = e.clientY || (e.touches ? e.touches[0].clientY : 0);

        const dx = clientX - startX;
        const dy = clientY - startY;

        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            isDragging = true;
        }

        let newX = initialX + dx;
        let newY = initialY + dy;

        // Keep inside vertical screen bounds
        const maxY = window.innerHeight - avatar.offsetHeight - 20;
        newY = Math.max(20, Math.min(newY, maxY));

        avatar.style.left = newX + 'px';
        avatar.style.top = newY + 'px';
    };

    const dragEnd = (e) => {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragEnd);
        document.removeEventListener('touchmove', dragMove);
        document.removeEventListener('touchend', dragEnd);

        if (isDragging) {
            // Snap to nearest side (Left or Right)
            const rect = avatar.getBoundingClientRect();
            const screenWidth = window.innerWidth;
            const middle = screenWidth / 2;
            const currentCenterX = rect.left + (rect.width / 2);

            avatar.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            if (currentCenterX < middle) {
                // Snap to Left Edge
                avatar.style.left = '10px';
            } else {
                // Snap to Right Edge
                avatar.style.left = (screenWidth - rect.width - 10) + 'px';
            }
        }
    };

    avatar.addEventListener('mousedown', dragStart);
    avatar.addEventListener('touchstart', dragStart, { passive: true });
}

function handleAvatarClick(e) {
    if (!isDragging) {
        toggleContactDrawer();
    }
}

function toggleContactDrawer() {
    const drawer = document.getElementById('contactDrawer');
    if (drawer) {
        const willClose = !drawer.classList.contains('hidden');
        if (willClose && mediaRecorder && mediaRecorder.state === 'recording') stopVoiceRecording();
        drawer.classList.toggle('hidden');
        if (!drawer.classList.contains('hidden') && typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

function saveUserIdentity(val) {
    localStorage.setItem('app_user_identity', val);
}

function loadIdentity() {
    const savedId = localStorage.getItem('app_user_identity') || 'User_' + Math.floor(1000 + Math.random() * 9000);
    localStorage.setItem('app_user_identity', savedId);
    const input = document.getElementById('userIdentityInput');
    if (input) input.value = savedId;
}

function applyEyeState() {
    const btn = document.getElementById('eyeToggleBtn');
    if (!btn) return;
    btn.innerHTML = '<i data-lucide="' + (showLiveMessages ? 'eye' : 'eye-off') + '" id="eyeIcon" class="w-4 h-4"></i>';
    btn.style.opacity = showLiveMessages ? '1' : '0.5';
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function toggleTelegramEye() {
    showLiveMessages = !showLiveMessages;
    localStorage.setItem('eye_live_messages', showLiveMessages ? 'on' : 'off');
    applyEyeState();
}

// Send message to Telegram & auto disappear in 1 second
async function sendTelegramMessage() {
    const msgInput = document.getElementById('messageInput');
    const identityInput = document.getElementById('userIdentityInput');
    const text = msgInput.value.trim();
    const identity = identityInput ? identityInput.value : 'Anonymous';

    if (pendingFile) { sendMediaFile(text, identity); msgInput.value = ''; return; }
    if (!text) return;

    const fullMessage =`Identity: \`${identity}\`\nMessage: ${text}`;

    appendMessageBubble(`You: ${text}`, 'user', 1000); // 1 second disappear
    msgInput.value = '';

    try {
        await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TG_CHAT_ID,
                text: fullMessage,
                parse_mode: 'Markdown'
            })
        });
    } catch (err) {
        console.error("Failed to send telegram message", err);
    }
}

// Message Bubble with Timed Disappearance (User: 1s, Developer: 3s)
function appendMessageBubble(text, sender, timeoutMs) {
    const box = document.getElementById('liveMessageBox');
    const placeholder = document.getElementById('chatPlaceholder');
    if (placeholder) placeholder.style.display = 'none';

    if (!box) return;

    const bubble = document.createElement('div');
    bubble.className = `p-2.5 rounded-xl text-xs max-w-[85%] ${sender === 'user' ? 'bg-black text-white dark:bg-white dark:text-black ml-auto' : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mr-auto'}`;
    bubble.innerText = text;
    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;

    setTimeout(() => {
        bubble.style.transition = 'opacity 0.4s ease';
        bubble.style.opacity = '0';
        setTimeout(() => {
            bubble.remove();
            if (box.children.length === 0 && placeholder) {
                placeholder.style.display = 'block';
            }
        }, 400);
    }, timeoutMs);
}

// Telegram Polling with 3 seconds disappearance and "Developer" tag
async function startTelegramPolling() {
    setInterval(async () => {
        try {
            const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/getUpdates?offset=${lastProcessedUpdateId + 1}&timeout=2`);
            const data = await res.json();
            if (data.ok && data.result.length > 0) {
                data.result.forEach(update => {
                    lastProcessedUpdateId = update.update_id;
                    if (!showLiveMessages) return; // eye OFF: message le kar ignore kar do
                    const messageObj = update.message || update.edited_message;
                    if (messageObj && String(messageObj.chat.id) === String(TG_CHAT_ID)) {
                        if (messageObj.text) {
                            appendMessageBubble(`Developer: ${messageObj.text}`, 'admin', 3000); // 3 seconds disappear with Developer prefix
                        } else {
                            showIncomingMedia(messageObj); // photo/video/gif/sticker/file - 3 seconds
                        }
                    }
                });
            }
        } catch (err) {}
    }, 4000);
          }
// --- Support Toggle & Avatar Visibility System ---
document.addEventListener('DOMContentLoaded', () => {
    initSupportState();
});

function toggleGlobalSupport() {
    let isActive = localStorage.getItem('global_support_active') === 'true';
    isActive = !isActive; // State flip karo (true se false, false se true)
    localStorage.setItem('global_support_active', isActive);
    updateSupportUI(isActive);
}

function initSupportState() {
    // Agar pehle se kuch saved nahi hai, toh default 'false' (OFF) rakho
    if (localStorage.getItem('global_support_active') === null) {
        localStorage.setItem('global_support_active', 'false');
    }
    const isActive = localStorage.getItem('global_support_active') === 'true';
    updateSupportUI(isActive);
}

function updateSupportUI(isActive) {
    const avatar = document.getElementById('floating-avatar-btn');
    const toggleInput = document.getElementById('supportToggleInput');

    if (avatar) {
        // Agar active true hai toh dikhao, false hai toh hide kar do
        avatar.style.display = isActive ? 'flex' : 'none';
        if (!isActive) {
            const drawer = document.getElementById('contactDrawer');
            if (drawer) drawer.classList.add('hidden');
        }
    }

    if (toggleInput) {
        toggleInput.checked = isActive;
    }
}



// ================= MEDIA / ATTACHMENT + VOICE SYSTEM =================
const MAX_UPLOAD = 50 * 1024 * 1024; // 50 MB
let pendingFile = null;
let pendingURL = null;
let mediaRecorder = null;
let recordedChunks = [];
let voiceRecordingStartedAt = 0;
let voiceTimerInterval = null;
let voiceMimeType = '';

function closePanels() {
    ['attachMenu'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.classList.add('hidden'); el.classList.remove('flex'); }
    });
}

function togglePanel(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const wasHidden = el.classList.contains('hidden');
    closePanels();
    if (wasHidden) {
        el.classList.remove('hidden');
        el.classList.add('flex');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
}

function toggleAttachMenu() {
    if (mediaRecorder && mediaRecorder.state === 'recording') return;
    togglePanel('attachMenu');
}

function pickCamera() {
    const input = document.getElementById('cameraInput');
    if (!input) return;
    closePanels();
    input.value = '';
    input.click();
}

function pickFile(kind) {
    const input = document.getElementById('fileInput');
    if (!input) return;
    input.accept = kind === 'media' ? 'image/*,video/*' : '*/*';
    input.value = '';
    closePanels();
    input.click();
}

function handleFileSelected(input) {
    const file = input.files && input.files[0];
    if (!file) return;

    if (file.size > MAX_UPLOAD) {
        alert('File 50 MB se badi hai. 50 MB tak file hi bheji ja sakti hai.');
        input.value = '';
        return;
    }

    clearPendingFile();
    pendingFile = file;

    const thumb = document.getElementById('attachThumb');
    const name = document.getElementById('attachName');
    const typeLabel = document.getElementById('attachType');
    const mediaPreview = document.getElementById('attachMediaPreview');
    const prev = document.getElementById('attachPreview');

    if (!thumb || !name || !typeLabel || !prev) return;

    thumb.innerHTML = '';
    mediaPreview.innerHTML = '';
    mediaPreview.classList.add('hidden');

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (pendingURL) URL.revokeObjectURL(pendingURL);
    if (isImage || isVideo) {
        pendingURL = URL.createObjectURL(file);
        const media = document.createElement(isImage ? 'img' : 'video');
        media.src = pendingURL;
        media.className = 'w-full max-h-64 object-contain';
        if (isVideo) {
            media.muted = true;
            media.playsInline = true;
            media.controls = true;
        }
        mediaPreview.appendChild(media);
        mediaPreview.classList.remove('hidden');

        const icon = isImage ? 'image' : 'video';
        thumb.innerHTML = '<i data-lucide="' + icon + '" class="w-5 h-5"></i>';
        typeLabel.textContent = isImage ? 'Photo' : 'Video';
    } else {
        thumb.innerHTML = '<i data-lucide="file" class="w-5 h-5"></i>';
        typeLabel.textContent = 'File';
    }

    name.textContent = file.name + ' · ' + formatFileSize(file.size);
    prev.classList.remove('hidden');
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Scroll the attachment preview into view on mobile.
    requestAnimationFrame(() => prev.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
}

function clearPendingFile() {
    pendingFile = null;
    if (pendingURL) {
        URL.revokeObjectURL(pendingURL);
        pendingURL = null;
    }

    const prev = document.getElementById('attachPreview');
    const mediaPreview = document.getElementById('attachMediaPreview');
    const thumb = document.getElementById('attachThumb');
    const name = document.getElementById('attachName');

    if (mediaPreview) {
        mediaPreview.innerHTML = '';
        mediaPreview.classList.add('hidden');
    }
    if (thumb) thumb.innerHTML = '<i data-lucide="file" class="w-5 h-5"></i>';
    if (name) name.textContent = '';
    if (prev) prev.classList.add('hidden');

    ['fileInput', 'cameraInput'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ================= VOICE RECORDING =================
function getSupportedAudioMimeType() {
    const types = [
        'audio/ogg;codecs=opus',
        'audio/ogg',
        'audio/mp4',
        'audio/webm;codecs=opus',
        'audio/webm'
    ];
    return types.find(type => window.MediaRecorder && MediaRecorder.isTypeSupported(type)) || '';
}

async function toggleVoiceRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        stopVoiceRecording();
    } else {
        await startVoiceRecording();
    }
}

async function startVoiceRecording() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
        alert('Is device/browser me voice recording supported nahi hai.');
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        voiceMimeType = getSupportedAudioMimeType();
        mediaRecorder = voiceMimeType
            ? new MediaRecorder(stream, { mimeType: voiceMimeType })
            : new MediaRecorder(stream);

        recordedChunks = [];
        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) recordedChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            stream.getTracks().forEach(track => track.stop());
            stopVoiceTimer();

            const finalType = voiceMimeType || 'audio/webm';
            const blob = new Blob(recordedChunks, { type: finalType });
            recordedChunks = [];

            if (!blob.size) {
                resetVoiceUI();
                return;
            }

            await sendVoiceRecording(blob, finalType);
        };

        mediaRecorder.start(250);
        voiceRecordingStartedAt = Date.now();
        setTimeout(() => {
            if (mediaRecorder && mediaRecorder.state === 'recording') stopVoiceRecording();
        }, 5 * 60 * 1000);

        const status = document.getElementById('voiceStatus');
        const button = document.getElementById('voiceButton');
        const icon = document.getElementById('voiceIcon');

        if (status) {
            status.classList.remove('hidden');
            status.classList.add('flex');
        }
        if (button) {
            button.classList.add('bg-red-50', 'text-red-600', 'border-red-200');
            button.classList.remove('bg-slate-100', 'text-slate-800', 'dark:bg-slate-800', 'dark:text-slate-100');
        }
        if (icon) icon.setAttribute('data-lucide', 'square');

        startVoiceTimer();
        if (typeof lucide !== 'undefined') lucide.createIcons();
    } catch (err) {
        console.error('Microphone permission/recording failed:', err);
        alert('Microphone permission allow karke dobara try karein.');
        resetVoiceUI();
    }
}

function stopVoiceRecording() {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
}

function startVoiceTimer() {
    stopVoiceTimer();
    updateVoiceTimer();
    voiceTimerInterval = setInterval(updateVoiceTimer, 1000);
}

function updateVoiceTimer() {
    const timer = document.getElementById('voiceTimer');
    if (!timer) return;
    const elapsed = Math.floor((Date.now() - voiceRecordingStartedAt) / 1000);
    const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
    const seconds = String(elapsed % 60).padStart(2, '0');
    timer.textContent = minutes + ':' + seconds;
}

function stopVoiceTimer() {
    if (voiceTimerInterval) clearInterval(voiceTimerInterval);
    voiceTimerInterval = null;
}

function resetVoiceUI() {
    stopVoiceTimer();

    const status = document.getElementById('voiceStatus');
    const button = document.getElementById('voiceButton');
    const icon = document.getElementById('voiceIcon');
    const timer = document.getElementById('voiceTimer');

    if (status) {
        status.classList.add('hidden');
        status.classList.remove('flex');
    }
    if (button) {
        button.classList.remove('bg-red-50', 'text-red-600', 'border-red-200');
        button.classList.add('bg-slate-100', 'text-slate-800', 'dark:bg-slate-800', 'dark:text-slate-100');
    }
    if (icon) icon.setAttribute('data-lucide', 'mic');
    if (timer) timer.textContent = '00:00';
    mediaRecorder = null;

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function sendVoiceRecording(blob, mimeType) {
    const identityInput = document.getElementById('userIdentityInput');
    const identity = identityInput ? identityInput.value : 'Anonymous';

    const extension = mimeType.includes('ogg') ? 'ogg'
        : mimeType.includes('mp4') ? 'm4a'
        : 'webm';

    const filename = 'voice_' + Date.now() + '.' + extension;

    const bubble = createBubble('user');
    if (bubble) {
        bubble.innerHTML = '<div class="flex items-center gap-2"><i data-lucide="mic" class="w-4 h-4"></i><span>Voice recording</span></div><div class="text-[10px] opacity-70 mt-1" id="voice-send-status">Sending…</div>';
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    const fd = new FormData();
    fd.append('chat_id', TG_CHAT_ID);
    fd.append('caption', 'Identity: ' + identity);

    // Telegram voice messages prefer OGG/OPUS. Browser fallbacks are sent as a document
    // so the recording is still delivered instead of silently failing.
    const canSendAsVoice = mimeType.includes('ogg');
    const method = canSendAsVoice ? 'sendVoice' : 'sendDocument';
    const field = canSendAsVoice ? 'voice' : 'document';
    fd.append(field, blob, filename);

    try {
        const response = await fetch('https://api.telegram.org/bot' + TG_BOT_TOKEN + '/' + method, {
            method: 'POST',
            body: fd
        });
        const data = await response.json();

        if (bubble) {
            const status = bubble.querySelector('#voice-send-status');
            if (status) status.textContent = data.ok ? 'Sent' : 'Failed';
            removeBubbleLater(bubble, data.ok ? 1000 : 3000);
        }
    } catch (err) {
        console.error('Voice upload failed:', err);
        if (bubble) {
            const status = bubble.querySelector('#voice-send-status');
            if (status) status.textContent = 'Failed';
            removeBubbleLater(bubble, 3000);
        }
    } finally {
        resetVoiceUI();
    }
}

function createBubble(sender) {
    const box = document.getElementById('liveMessageBox');
    const placeholder = document.getElementById('chatPlaceholder');
    if (placeholder) placeholder.style.display = 'none';
    if (!box) return null;
    const bubble = document.createElement('div');
    bubble.className = 'p-2 rounded-xl text-xs max-w-[85%] ' + (sender === 'user'
        ? 'bg-black text-white dark:bg-white dark:text-black ml-auto'
        : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 mr-auto');
    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;
    return bubble;
}

function removeBubbleLater(bubble, ms) {
    setTimeout(() => {
        bubble.style.transition = 'opacity 0.4s ease';
        bubble.style.opacity = '0';
        setTimeout(() => {
            bubble.remove();
            const box = document.getElementById('liveMessageBox');
            const placeholder = document.getElementById('chatPlaceholder');
            if (box && box.children.length === 0 && placeholder) placeholder.style.display = 'block';
        }, 400);
    }, ms);
}

function sendMediaFile(text, identity) {
    const file = pendingFile;
    const localURL = pendingURL;
    pendingFile = null;
    pendingURL = null;

    const prev = document.getElementById('attachPreview');
    if (prev) prev.classList.add('hidden');

    if (!file) return;

    const type = file.type || '';
    const isGif = type === 'image/gif';

    // Telegram's sendPhoto has a smaller image limit, so larger images are sent as documents.
    let method = 'sendDocument';
    let field = 'document';
    if (isGif) {
        method = 'sendAnimation';
        field = 'animation';
    } else if (type.startsWith('image/') && file.size <= 10 * 1048576) {
        method = 'sendPhoto';
        field = 'photo';
    } else if (type.startsWith('video/')) {
        method = 'sendVideo';
        field = 'video';
    }

    const bubble = createBubble('user');
    if (!bubble) return;

    let preview = '';
    if (localURL && type.startsWith('image/')) {
        preview = '<img src="' + localURL + '" class="rounded-lg max-h-40 max-w-full object-contain mb-1">';
    } else if (localURL && type.startsWith('video/')) {
        preview = '<video src="' + localURL + '" class="rounded-lg max-h-40 max-w-full object-contain mb-1" controls muted playsinline></video>';
    } else {
        preview = '<div class="flex items-center gap-2 mb-1"><i data-lucide="file" class="w-4 h-4"></i><span>' + escapeHtml(file.name) + '</span></div>';
    }

    bubble.innerHTML = preview
        + (text ? '<div>You: ' + escapeHtml(text) + '</div>' : '')
        + '<div class="text-[10px] opacity-70" id="upl-status">Sending… 0%</div>';

    if (typeof lucide !== 'undefined') lucide.createIcons();

    const status = bubble.querySelector('#upl-status');
    const fd = new FormData();
    fd.append('chat_id', TG_CHAT_ID);
    fd.append(field, file, file.name);
    fd.append('caption', 'Identity: ' + identity + (text ? '\nMessage: ' + text : ''));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.telegram.org/bot' + TG_BOT_TOKEN + '/' + method);

    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable && status) {
            status.textContent = 'Sending… ' + Math.round(e.loaded / e.total * 100) + '%';
        }
    };

    xhr.onload = () => {
        let ok = false;
        try { ok = JSON.parse(xhr.responseText).ok; } catch (e) {}

        if (status) status.textContent = ok ? 'Sent' : 'Failed';
        removeBubbleLater(bubble, ok ? 1000 : 3000);

        if (localURL) setTimeout(() => URL.revokeObjectURL(localURL), 5000);
    };

    xhr.onerror = () => {
        if (status) status.textContent = 'Failed';
        removeBubbleLater(bubble, 3000);
        if (localURL) setTimeout(() => URL.revokeObjectURL(localURL), 5000);
    };

    xhr.send(fd);

    ['fileInput', 'cameraInput'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Incoming media from Telegram (photo / video / gif / sticker / file / voice) - disappears 3s after loading
async function showIncomingMedia(m) {
    let fileId = null, kind = 'file', label = '';
    if (m.photo) { fileId = m.photo[m.photo.length - 1].file_id; kind = 'image'; }
    else if (m.animation) { fileId = m.animation.file_id; kind = 'video-loop'; }
    else if (m.video) { fileId = m.video.file_id; kind = 'video'; }
    else if (m.video_note) { fileId = m.video_note.file_id; kind = 'video'; }
    else if (m.sticker) {
        if (m.sticker.is_animated) { fileId = m.sticker.file_id; kind = 'video-loop'; }
        else { fileId = m.sticker.file_id; kind = m.sticker.is_video ? 'video-loop' : 'sticker'; label = ''; }
    }
    else if (m.voice) { fileId = m.voice.file_id; kind = 'audio'; }
    else if (m.audio) { fileId = m.audio.file_id; kind = 'audio'; }
    else if (m.document) {
        fileId = m.document.file_id;
        const mt = m.document.mime_type || '';
        label = m.document.file_name || 'file';
        kind = mt.startsWith('image/') ? (mt === 'image/gif' ? 'video-loop' : 'image') : mt.startsWith('video/') ? 'video' : 'file';
        if (kind === 'file') fileId = null; // sirf naam dikhao
    }
    else { return; }

    const bubble = createBubble('admin');
    if (!bubble) return;
    const caption = m.caption ? '<div class="mt-1">Developer: ' + escapeHtml(m.caption) + '</div>' : '';
    let timerStarted = false;
    const startTimer = () => { if (!timerStarted) { timerStarted = true; removeBubbleLater(bubble, 3000); } };

    if (!fileId) { bubble.innerHTML = '<div class="flex items-center gap-2"><i data-lucide="file" class="w-4 h-4"></i><span>Developer: ' + escapeHtml(label) + '</span></div>' + caption; if (typeof lucide !== 'undefined') lucide.createIcons(); startTimer(); return; }

    bubble.innerHTML = '<div class="opacity-70">Loading…</div>';
    try {
        const res = await fetch('https://api.telegram.org/bot' + TG_BOT_TOKEN + '/getFile?file_id=' + fileId);
        const data = await res.json();
        if (!data.ok) throw new Error('too big');
        const url = 'https://api.telegram.org/file/bot' + TG_BOT_TOKEN + '/' + data.result.file_path;
        let el;
        if (kind === 'image' || kind === 'sticker') {
            el = document.createElement('img');
            el.className = 'rounded-lg ' + (kind === 'sticker' ? 'max-h-32' : 'max-h-44');
            el.onload = startTimer; el.onerror = startTimer;
        } else if (kind === 'audio') {
            el = document.createElement('audio'); el.controls = true; el.autoplay = true;
            el.onloadeddata = startTimer; el.onerror = startTimer;
        } else {
            el = document.createElement('video');
            el.className = 'rounded-lg max-h-44';
            el.autoplay = true; el.muted = (kind === 'video-loop'); el.loop = (kind === 'video-loop'); el.playsInline = true;
            el.controls = (kind === 'video');
            el.onloadeddata = startTimer; el.onerror = startTimer;
        }
        el.src = url;
        bubble.innerHTML = '';
        bubble.appendChild(el);
        if (caption) bubble.insertAdjacentHTML('beforeend', caption);
        const box = document.getElementById('liveMessageBox');
        if (box) box.scrollTop = box.scrollHeight;
        setTimeout(startTimer, 8000); // fallback
    } catch (err) {
        bubble.innerHTML = '<div class="flex items-center gap-2"><i data-lucide="file-warning" class="w-4 h-4"></i><span>Developer: Media load nahi hua.</span></div>' + caption;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        startTimer();
    }
}

// Enter dabane par bhi send ho
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target && e.target.id === 'messageInput') sendTelegramMessage();
});
