// Setting Screen Core Logic & Theme Switcher + Secret RAMDIRI Form Logic

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    loadCurrentThemeState();
    initSecretFormHandler();
});

function setTheme(mode) {
    const htmlEl = document.documentElement;
    localStorage.setItem('app_theme_mode', mode);

    // Remove active styles from buttons
    ['light', 'dark', 'auto'].forEach(m => {
        const btn = document.getElementById(`btn-${m}`);
        if(btn) {
            btn.className = "ripple-btn py-2.5 px-3 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition shadow-xs flex items-center justify-center space-x-1.5";
        }
    });

    const activeBtn = document.getElementById(`btn-${mode}`);
    if(activeBtn) {
        activeBtn.className = "ripple-btn py-2.5 px-3 rounded-xl text-xs font-bold border border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900 transition shadow-sm flex items-center justify-center space-x-1.5";
    }

    if(mode === 'dark') {
        htmlEl.classList.add('dark');
        htmlEl.classList.remove('light');
    } else if(mode === 'light') {
        htmlEl.classList.remove('dark');
        htmlEl.classList.add('light');
    } else if(mode === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if(prefersDark) {
            htmlEl.classList.add('dark');
            htmlEl.classList.remove('light');
        } else {
            htmlEl.classList.remove('dark');
            htmlEl.classList.add('light');
        }
    }
}

function loadCurrentThemeState() {
    const savedMode = localStorage.getItem('app_theme_mode') || 'light';
    setTheme(savedMode);
}

// Listen to system changes if auto mode is enabled
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const savedMode = localStorage.getItem('app_theme_mode');
    if(savedMode === 'auto') {
        setTheme('auto');
    }
});

// Secret Form Handler Logic
function initSecretFormHandler() {
    const form = document.getElementById('secret-query-form');
    if(!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const subjectInput = document.getElementById('subject').value.trim();
        const successMsg = document.getElementById('form-success-msg');
        const secretChatUI = document.getElementById('secret-chat-ui');

        if(subjectInput.toLowerCase() === 'ramdiri') {
            // Unlock WhatsApp-style UI
            if(secretChatUI) {
                secretChatUI.classList.remove('hidden');
                secretChatUI.scrollIntoView({ behavior: 'smooth' });
            }
            successMsg.textContent = "Secret Unlocked! Welcome to P2P Chat.";
            successMsg.classList.remove('hidden');
        } else {
            // Normal success message
            successMsg.textContent = "Query sent successfully!";
            successMsg.classList.remove('hidden');
            if(secretChatUI) {
                secretChatUI.classList.add('hidden');
            }
        }
    });
}

function closeSecretChat() {
    const secretChatUI = document.getElementById('secret-chat-ui');
    if(secretChatUI) {
        secretChatUI.classList.add('hidden');
    }
}

function switchChatTab(channelName) {
    const headerTitle = document.getElementById('chat-title-header');
    const seenLabel = document.getElementById('seen-status-label');
    if(headerTitle) headerTitle.textContent = channelName + " Chat";
    
    if(channelName === 'Commerce Hub') {
        if(seenLabel) seenLabel.textContent = "Seen status enabled for Commerce Hub";
    } else {
        if(seenLabel) seenLabel.textContent = "Seen status disabled for " + channelName;
    }
}

function sendSecretMessage() {
    const input = document.getElementById('chat-msg-input');
    const box = document.getElementById('chat-messages-box');
    if(!input || !input.value.trim()) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = "text-right";
    msgDiv.innerHTML = `<span class="inline-block bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-3 py-1.5 rounded-lg">${input.value} <small class="text-[9px] opacity-70">✓ Sent</small></span>`;
    box.appendChild(msgDiv);
    input.value = "";
    box.scrollTop = box.scrollHeight;
}
