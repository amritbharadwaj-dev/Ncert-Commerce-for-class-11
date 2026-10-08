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
            <!-- Draggable Cartoon Avatar (Snaps to sides, Double Size: w-24 h-24) -->
            <div id="floating-avatar-btn" onclick="handleAvatarClick(event)" class="fixed bottom-24 right-4 z-50 w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-1 shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300 flex items-center justify-center select-none touch-none">
                <div class="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center border-3 border-white dark:border-slate-800 shadow-inner">
                    <img src="https://api.dicebear.com/7.x/bottts/svg?seed=CoolBuddy99&backgroundColor=b6e3f4,c0aede,d1d4f9" alt="Cartoon Avatar" class="w-full h-full object-cover">
                </div>
            </div>

            <!-- Contact Us Bottom Drawer Popup (No Background Blur so background is fully readable) -->
            <div id="contactDrawer" class="fixed inset-0 z-50 bg-black/30 hidden flex items-end justify-center transition-opacity">
                <div class="bg-white dark:bg-slate-900 w-full max-w-lg rounded-t-3xl p-5 space-y-4 shadow-2xl border-t border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col">
                    <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div class="flex items-center space-x-2">
                            <div class="bg-slate-900 text-white dark:bg-white dark:text-slate-900 p-1.5 rounded-xl">
                                <i data-lucide="message-square" class="w-4 h-4"></i>
                            </div>
                            <h3 class="font-extrabold text-xs text-slate-900 dark:text-white">For any issue please contact us and send message</h3>
                        </div>
                        <div class="flex items-center space-x-2 flex-shrink-0">
                            <button onclick="toggleTelegramEye()" id="eyeToggleBtn" title="Toggle Live Messages" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                <i data-lucide="eye" id="eyeIcon" class="w-4 h-4"></i>
                            </button>
                            <button onclick="toggleContactDrawer()" class="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                <i data-lucide="x" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>

                    <div class="overflow-y-auto space-y-4 pr-1 flex-grow">
                        <!-- Identity Box (Password Masked Style) -->
                        <div class="bg-slate-50 dark:bg-slate-800/50 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                            <label class="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Identity</label>
                            <input type="password" id="userIdentityInput" oninput="saveUserIdentity(this.value)" class="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono tracking-widest" placeholder="Enter your identity...">
                        </div>

                        <!-- Live Message Box -->
                        <div id="liveMessageBox" class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[120px] max-h-[260px] overflow-y-auto flex flex-col justify-end space-y-2">
                            <div class="text-xs text-slate-400 italic text-center py-6" id="chatPlaceholder">
                                Send a message to start conversation.
                            </div>
                        </div>

                        <!-- Attachment preview -->
                        <div id="attachPreview" class="hidden items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-xl p-2 border border-slate-200 dark:border-slate-700">
                            <div id="attachThumb" class="w-12 h-12 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xl flex-shrink-0"></div>
                            <div id="attachName" class="flex-grow text-[11px] font-semibold text-slate-700 dark:text-slate-200 truncate"></div>
                            <button onclick="clearPendingFile()" class="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex-shrink-0"><i data-lucide="x" class="w-4 h-4"></i></button>
                        </div>

                        <!-- Emoji picker -->
                        <div id="emojiPanel" class="hidden flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-2 border border-slate-200 dark:border-slate-700 text-xl"></div>

                        <!-- Attach menu (WhatsApp style) -->
                        <div id="attachMenu" class="hidden bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg p-2 flex space-x-2">
                            <button onclick="pickFile('media')" class="flex-1 flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100">
                                <span class="text-2xl">🖼️</span><span class="text-[10px] font-bold">Photo / Video</span>
                            </button>
                            <button onclick="pickFile('any')" class="flex-1 flex flex-col items-center space-y-1 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100">
                                <span class="text-2xl">📄</span><span class="text-[10px] font-bold">File / GIF</span>
                            </button>
                        </div>
                        <input type="file" id="fileInput" class="hidden" onchange="handleFileSelected(this)">

                        <!-- Input Bar with + button, emoji and Black Send Button -->
                        <div class="flex items-center space-x-2 pt-1">
                            <button onclick="toggleAttachMenu()" title="Attach" class="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 text-xl font-bold">+</button>
                            <input type="text" id="messageInput" placeholder="Type message here..." class="flex-grow min-w-0 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white border border-slate-200 dark:border-slate-700">
                            <button onclick="toggleEmojiPanel()" title="Emoji" class="text-xl flex-shrink-0">😊</button>
                            <button onclick="sendTelegramMessage()" class="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 px-4 py-3 rounded-xl text-xs font-bold transition shadow-md flex items-center space-x-1 flex-shrink-0">
                                <span>Send</span>
                                <i data-lucide="send" class="w-3.5 h-3.5"></i>
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

    const fullMessage =`👤 *Identity:* \`${identity}\`\n✉️ *Message:* ${text}`;

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



// ================= MEDIA / ATTACHMENT SYSTEM =================
const MAX_UPLOAD = 50 * 1024 * 1024; // Telegram bot upload limit 50MB
let pendingFile = null;
let pendingURL = null;
const EMOJIS = ['😀','😂','🤣','😊','😍','😘','😎','🥰','😢','😭','😡','😮','🤔','👍','👎','🙏','👏','🔥','❤️','💔','🎉','✅','❌','💯','🙌','😴','🤝','👀','🥳','😅','🤗','💪'];

function closePanels() {
    ['attachMenu', 'emojiPanel'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.classList.add('hidden'); el.classList.remove('flex'); }
    });
}

function togglePanel(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const wasHidden = el.classList.contains('hidden');
    closePanels();
    if (wasHidden) { el.classList.remove('hidden'); el.classList.add('flex'); }
}

function toggleAttachMenu() { togglePanel('attachMenu'); }

function toggleEmojiPanel() {
    const panel = document.getElementById('emojiPanel');
    if (panel && !panel.dataset.ready) {
        EMOJIS.forEach(e => {
            const b = document.createElement('button');
            b.textContent = e;
            b.onclick = () => {
                const inp = document.getElementById('messageInput');
                inp.value += e;
                inp.focus();
            };
            panel.appendChild(b);
        });
        panel.dataset.ready = '1';
    }
    togglePanel('emojiPanel');
}

function pickFile(kind) {
    const fi = document.getElementById('fileInput');
    if (!fi) return;
    fi.accept = kind === 'media' ? 'image/*,video/*' : '*/*';
    fi.value = '';
    closePanels();
    fi.click();
}

function handleFileSelected(input) {
    const file = input.files && input.files[0];
    if (!file) return;
    if (file.size > MAX_UPLOAD) {
        alert('File 50 MB se badi hai, Telegram nahi lega.');
        input.value = '';
        return;
    }
    clearPendingFile();
    pendingFile = file;
    const thumb = document.getElementById('attachThumb');
    const name = document.getElementById('attachName');
    thumb.innerHTML = '';
    if (file.type.startsWith('image/')) {
        pendingURL = URL.createObjectURL(file);
        thumb.innerHTML = '<img src="' + pendingURL + '" class="w-full h-full object-cover">';
    } else if (file.type.startsWith('video/')) {
        pendingURL = URL.createObjectURL(file);
        thumb.innerHTML = '<video src="' + pendingURL + '" class="w-full h-full object-cover" muted></video>';
    } else {
        thumb.textContent = '📄';
    }
    name.textContent = file.name + ' (' + (file.size / 1048576).toFixed(1) + ' MB)';
    const prev = document.getElementById('attachPreview');
    prev.classList.remove('hidden');
    prev.classList.add('flex');
}

function clearPendingFile() {
    pendingFile = null;
    if (pendingURL) { URL.revokeObjectURL(pendingURL); pendingURL = null; }
    const prev = document.getElementById('attachPreview');
    if (prev) { prev.classList.add('hidden'); prev.classList.remove('flex'); }
    const fi = document.getElementById('fileInput');
    if (fi) fi.value = '';
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
    pendingFile = null; pendingURL = null; // bubble will use localURL
    const prev = document.getElementById('attachPreview');
    if (prev) { prev.classList.add('hidden'); prev.classList.remove('flex'); }

    const type = file.type || '';
    const isGif = type === 'image/gif';
    let method = 'sendDocument', field = 'document';
    if (isGif) { method = 'sendAnimation'; field = 'animation'; }
    else if (type.startsWith('image/') && file.size <= 10 * 1048576) { method = 'sendPhoto'; field = 'photo'; }
    else if (type.startsWith('video/')) { method = 'sendVideo'; field = 'video'; }

    const bubble = createBubble('user');
    if (!bubble) return;
    let preview = '';
    if (localURL && type.startsWith('image/')) preview = '<img src="' + localURL + '" class="rounded-lg max-h-40 mb-1">';
    else if (localURL && type.startsWith('video/')) preview = '<video src="' + localURL + '" class="rounded-lg max-h-40 mb-1" muted></video>';
    else preview = '<div class="mb-1">📄 ' + escapeHtml(file.name) + '</div>';
    bubble.innerHTML = preview + (text ? '<div>You: ' + escapeHtml(text) + '</div>' : '') + '<div class="text-[10px] opacity-70" id="upl-status">Sending… 0%</div>';
    const status = bubble.querySelector('#upl-status');
    status.removeAttribute('id');

    const fd = new FormData();
    fd.append('chat_id', TG_CHAT_ID);
    fd.append(field, file, file.name);
    fd.append('caption', '👤 Identity: ' + identity + (text ? '\n✉️ Message: ' + text : ''));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.telegram.org/bot' + TG_BOT_TOKEN + '/' + method);
    xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) status.textContent = 'Sending… ' + Math.round(e.loaded / e.total * 100) + '%';
    };
    xhr.onload = () => {
        let ok = false;
        try { ok = JSON.parse(xhr.responseText).ok; } catch (e) {}
        status.textContent = ok ? 'Sent ✓' : 'Failed ✗';
        removeBubbleLater(bubble, ok ? 1000 : 3000); // user media: 1 second
        setTimeout(() => { if (localURL) URL.revokeObjectURL(localURL); }, 5000);
    };
    xhr.onerror = () => {
        status.textContent = 'Failed ✗ (internet check karo)';
        removeBubbleLater(bubble, 3000);
    };
    xhr.send(fd);
    const fi = document.getElementById('fileInput');
    if (fi) fi.value = '';
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
        if (m.sticker.is_animated) { kind = 'emoji'; label = m.sticker.emoji || '🙂'; }
        else { fileId = m.sticker.file_id; kind = m.sticker.is_video ? 'video-loop' : 'sticker'; label = m.sticker.emoji || ''; }
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

    if (kind === 'emoji') { bubble.innerHTML = '<div class="text-5xl">' + label + '</div>' + caption; startTimer(); return; }
    if (!fileId) { bubble.innerHTML = '<div>Developer: 📄 ' + escapeHtml(label) + '</div>' + caption; startTimer(); return; }

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
        bubble.innerHTML = '<div>Developer: 📎 (media load nahi hua, 20MB se badi ho sakti hai)</div>' + caption;
        startTimer();
    }
}

// Enter dabane par bhi send ho
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target && e.target.id === 'messageInput') sendTelegramMessage();
});
