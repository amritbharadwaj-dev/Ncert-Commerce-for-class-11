// Global Widget & Telegram Integration Logic - Snap to Edges, No Blur & Cool Cartoon

const TG_BOT_TOKEN = "8619738096:AAFcVqqGP4zkoTkV9zd9fsBinJOsVsGkAyA";
const TG_CHAT_ID = "8871892242";

let showLiveMessages = true;
let lastProcessedUpdateId = 0;

document.addEventListener('DOMContentLoaded', () => {
    injectGlobalWidget();
    loadIdentity();
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
                        <div id="liveMessageBox" class="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 min-h-[120px] max-h-[180px] overflow-y-auto flex flex-col justify-end space-y-2">
                            <div class="text-xs text-slate-400 italic text-center py-6" id="chatPlaceholder">
                                Send a message to start conversation.
                            </div>
                        </div>

                        <!-- Input Bar with Black Send Button -->
                        <div class="flex items-center space-x-2 pt-1">
                            <input type="text" id="messageInput" placeholder="Type message here..." class="flex-grow bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white border border-slate-200 dark:border-slate-700">
                            <button onclick="sendTelegramMessage()" class="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 px-5 py-3 rounded-xl text-xs font-bold transition shadow-md flex items-center space-x-1 flex-shrink-0">
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

function toggleTelegramEye() {
    showLiveMessages = !showLiveMessages;
    const icon = document.getElementById('eyeIcon');
    if (icon) {
        icon.setAttribute('data-lucide', showLiveMessages ? 'eye' : 'eye-off');
        lucide.createIcons();
    }
}

// Send message to Telegram & auto disappear in 1 second
async function sendTelegramMessage() {
    const msgInput = document.getElementById('messageInput');
    const identityInput = document.getElementById('userIdentityInput');
    const text = msgInput.value.trim();
    const identity = identityInput ? identityInput.value : 'Anonymous';

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
        if (!showLiveMessages) return;
        try {
            const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/getUpdates?offset=${lastProcessedUpdateId + 1}&timeout=2`);
            const data = await res.json();
            if (data.ok && data.result.length > 0) {
                data.result.forEach(update => {
                    lastProcessedUpdateId = update.update_id;
                    const messageObj = update.message || update.edited_message;
                    if (messageObj && messageObj.text) {
                        if (String(messageObj.chat.id) === String(TG_CHAT_ID)) {
                            appendMessageBubble(`Developer: ${messageObj.text}`, 'admin', 3000); // 3 seconds disappear with Developer prefix
                        }
                    }
                });
            }
        } catch (err) {}
    }, 4000);
          }
