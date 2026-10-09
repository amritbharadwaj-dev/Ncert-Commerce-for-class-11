// Setting Screen Core Logic & Theme Switcher

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    loadCurrentThemeState();
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
        // Check system preference
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
