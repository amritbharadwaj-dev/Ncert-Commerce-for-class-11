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


/* =====================================================================
   CONTACT US  +  PRIVATE CHAT (Radhe <-> Amrit) + TELEGRAM CHAT
   ===================================================================== */
(function () {
'use strict';

/* ------------------------------ CONFIG ------------------------------ */
const SB_URL = 'https://dvbbcfntfzkvepzertte.supabase.co';
const SB_KEY = 'sb_publishable_skOK2qGKqEnP9-6qpNC5nA_crr-FZR3';
const T_MSG = 'rd_messages';      // offline delivery table (rows deleted after delivery)
const T_PRES = 'rd_presence';     // tiny last-seen table
const BUCKET = 'rd-media';        // storage bucket for offline photo/video/audio/files
const TG_TOKEN = '8757418240:AAExb3IseUbaa3XkReFdwUqxJ0wG2oo7t88';
const TG_CHAT = '8871892242';
const TG_API = 'https://api.telegram.org/bot' + TG_TOKEN + '/';
const SECRET_WORD = 'ramdiri';
const NAMES = { radhe: 'Radhe', amrit: 'Amrit' };
const REACTS = ['❤️', '😊', '😡', '😭', '😔', '😂', '👍'];
const EMOJIS = ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','🙂','😉','😍','🥰','😘','😗','😋','😜','🤪','😎','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','😶','😐','😑','😬','🙄','😯','😲','😴','🤤','😪','😷','🤒','🤕','🤢','🤮','🥴','😇','🤠','🤡','👻','💀','👽','🤖','💩','🙈','🙉','🙊','👍','👎','👌','✌️','🤞','🤟','🤘','👏','🙌','🙏','💪','👋','🤝','👀','❤️','🧡','💛','💚','💙','💜','🖤','🤍','💔','❣️','💕','💞','💓','💗','💖','💘','💝','🔥','✨','⭐','🌟','🎉','🎊','🎁','🎂','🍕','🍔','🍟','☕','🍫','🌹','🌸','🌈','☀️','🌙','⚡','💯','✅','❌','❓','❗'];
const CHUNK = 64 * 1024;            // datachannel chunk (safe default)
function chunkSize() { try { return Math.max(16 * 1024, Math.min(256 * 1024, (pc && pc.sctp && pc.sctp.maxMessageSize) || CHUNK)); } catch (e) { return CHUNK; } }
const SLICE = 4 * 1024 * 1024;       // file read slice
const MAX_DB_FILE = 50 * 1024 * 1024;
const MAX_P2P_FILE = 1024 * 1024 * 1024; // 1 GB (P2P)
// STUN + TURN. Mobile data (Jio/Airtel) par direct P2P ke liye TURN zaruri hota hai.
// Neeche wale free public TURN best-effort hain. Pakka chahiye to metered.ca par free account banao
// aur apna username/credential yaha daalo.
const TURN_USER = 'openrelayproject';
const TURN_PASS = 'openrelayproject';
const ICE = {
    iceServers: [
        { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun.cloudflare.com:3478'] },
        { urls: ['turn:openrelay.metered.ca:80', 'turn:openrelay.metered.ca:443', 'turn:openrelay.metered.ca:443?transport=tcp', 'turns:openrelay.metered.ca:443?transport=tcp'], username: TURN_USER, credential: TURN_PASS }
    ],
    iceCandidatePoolSize: 2
};

/* ------------------------------ HELPERS ------------------------------ */
const $ = id => document.getElementById(id);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const fmtTime = ts => new Date(ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
const dayKey = ts => { const d = new Date(ts); return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate(); };
function dayLabel(ts) {
    const now = Date.now();
    if (dayKey(ts) === dayKey(now)) return 'Today';
    if (dayKey(ts) === dayKey(now - 864e5)) return 'Yesterday';
    return new Date(ts).toLocaleDateString([], { day: 'numeric', month: 'long', year: 'numeric' });
}
function fmtSize(b) { if (!b) return ''; if (b < 1024) return b + ' B'; if (b < 1048576) return (b / 1024).toFixed(0) + ' KB'; return (b / 1048576).toFixed(1) + ' MB'; }
function fmtDur(ms) { const s = Math.floor(ms / 1000); return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0'); }
function extOf(type) {
    if (type.includes('mp4')) return type.startsWith('audio') ? 'm4a' : 'mp4';
    if (type.includes('ogg')) return 'ogg';
    if (type.includes('webm')) return 'webm';
    if (type.includes('mpeg')) return 'mp3';
    return 'bin';
}
function toast(t) {
    const el = document.createElement('div');
    el.className = 'rd-toast';
    el.textContent = t;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2600);
}

/* ------------------------------ ICONS ------------------------------ */
const P = {
    back: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>',
    'video-off': '<path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"/><line x1="1" y1="1" x2="23" y2="23"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    more: '<circle cx="12" cy="5" r="1.4"/><circle cx="12" cy="12" r="1.4"/><circle cx="12" cy="19" r="1.4"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    'mic-off': '<line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    file: '<path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    undo: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    screen: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
    flip: '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
    bookmark: '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    list: '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>'
};
function ic(n, s) {
    s = s || 22;
    return '<svg viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + P[n] + '</svg>';
}
const TICK = {
    pending: '<svg class="rd-tick" viewBox="0 0 16 16" width="15" height="15"><circle cx="8" cy="8" r="6"/><path d="M8 4.5V8l2.2 1.4"/></svg>',
    sent: '<svg class="rd-tick" viewBox="0 0 16 11" width="16" height="11"><path d="M1.5 5.5l3.5 3.5L12 2"/></svg>',
    delivered: '<svg class="rd-tick" viewBox="0 0 18 11" width="18" height="11"><path d="M1.5 5.5l3.5 3.5L12 2"/><path d="M7 8.5l1 .9L16 2"/></svg>',
    seen: '<svg class="rd-tick seen" viewBox="0 0 18 11" width="18" height="11"><path d="M1.5 5.5l3.5 3.5L12 2"/><path d="M7 8.5l1 .9L16 2"/></svg>'
};

/* ------------------------------ LOCAL STORE (IndexedDB) ------------------------------ */
let _db = null;
function idb() {
    if (_db) return _db;
    _db = new Promise((res, rej) => {
        const r = indexedDB.open('rd_chat_v1', 1);
        r.onupgradeneeded = () => {
            const d = r.result;
            d.createObjectStore('msgs', { keyPath: 'id' });
            d.createObjectStore('blobs');
            d.createObjectStore('kv');
        };
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
    });
    return _db;
}
async function tx(store, mode, fn) {
    const d = await idb();
    return new Promise((res, rej) => {
        const t = d.transaction(store, mode);
        let rq;
        try { rq = fn(t.objectStore(store)); } catch (e) { rej(e); return; }
        t.oncomplete = () => res(rq ? rq.result : undefined);
        t.onerror = () => rej(t.error);
        t.onabort = () => rej(t.error);
    });
}
const dbPut = (s, v, k) => tx(s, 'readwrite', o => k === undefined ? o.put(v) : o.put(v, k)).catch(() => {});
const dbGet = (s, k) => tx(s, 'readonly', o => o.get(k)).catch(() => undefined);
const dbDel = (s, k) => tx(s, 'readwrite', o => o.delete(k)).catch(() => {});
const dbAll = s => tx(s, 'readonly', o => o.getAll()).catch(() => []);

/* ------------------------------ STATE ------------------------------ */
let ME = null, PEER = null;
let msgs = [], outbox = [], loaded = false;
let curChat = null;
let sb = null, channel = null, chanReady = false, peerOnline = false, peerLastSeen = null, peerTyping = false;
let pc = null, dc = null, makingOffer = false, ignoreOffer = false, pendingCand = [], candBuf = [], candTimer = null;
let appOpen = false, tgOffset = 0, tgBusy = false, tgTimer = null, hbTimer = null, fetchTimer = null, fetching = false;
let selMode = false, sel = new Set(), editingId = null, renderLimit = 150, stick = true;
let remoteStream = null;
let rec = null, call = null, callTimer = null, callTick = null, typingTimer = null, typingSentAt = 0, typingOffTimer = null;
let rafId = 0, rafForce = false, ctxId = null;
const busy = new Set(), urlCache = {}, memBlobs = {}, incoming = { cur: null };
const RANK = { pending: 0, sent: 1, delivered: 2, seen: 3 };
let nick = '', photoURL = null;
const peerName = () => nick || NAMES[PEER];
function avInfo(which) {
    if (which === 'p2p') return { cls: PEER === 'radhe' ? 'r' : 'a', letter: NAMES[PEER][0], photo: photoURL };
    if (which === 'tg') return { cls: 't', letter: 'T', photo: null };
    return { cls: 's', letter: '', photo: null };
}
function paintAv(el, which, extra) {
    if (!el) return;
    const a = avInfo(which);
    el.className = 'rd-av ' + (extra ? extra + ' ' : '') + a.cls;
    if (a.photo) { el.style.backgroundImage = 'url(' + a.photo + ')'; el.textContent = ''; }
    else { el.style.backgroundImage = ''; if (which === 'saved') el.innerHTML = ic('bookmark', 22); else el.textContent = a.letter; }
}
function avHTML(which) {
    const a = avInfo(which);
    if (a.photo) return '<span class="rd-av ' + a.cls + '" data-avof="' + which + '" style="background-image:url(' + a.photo + ')"></span>';
    return '<span class="rd-av ' + a.cls + '" data-avof="' + which + '">' + (which === 'saved' ? ic('bookmark', 24) : a.letter) + '</span>';
}
async function loadProfile() {
    nick = (await dbGet('kv', 'nick_' + PEER)) || '';
    const b = await dbGet('blobs', 'photo_' + PEER);
    if (photoURL) { URL.revokeObjectURL(photoURL); photoURL = null; }
    if (b) photoURL = URL.createObjectURL(b);
    applyNames();
    renderList();
}
function applyNames() {
    if (curChat === 'p2p') { $('rdName').textContent = peerName(); paintAv($('rdAv'), 'p2p'); }
    paintAv($('rdProfAv'), 'p2p', 'big');
    $('rdProfName').textContent = NAMES[PEER] || '';
    const nt = $('rdNickTxt');
    if (nt) { nt.textContent = nick || 'Add nickname'; nt.style.opacity = nick ? '1' : '.5'; }
    $('rdCallName').textContent = peerName(); $('rdInName').textContent = peerName();
    paintAv($('rdCallAv'), 'p2p'); paintAv($('rdInAv'), 'p2p');
}

const getMsg = id => msgs.find(m => m.id === id);
function addMsg(m) {
    msgs.push(m);
    if (msgs.length > 1 && msgs[msgs.length - 2].ts > m.ts) msgs.sort((a, b) => a.ts - b.ts);
    dbPut('msgs', m);
}
const saveMsg = m => dbPut('msgs', m);
async function loadStore() {
    if (loaded) return;
    try {
        msgs = (await dbAll('msgs')) || [];
        outbox = (await dbGet('kv', 'outbox')) || [];
        tgOffset = (await dbGet('kv', 'tg_offset')) || 0;
    } catch (e) { msgs = []; }
    msgs.sort((a, b) => a.ts - b.ts);
    msgs.forEach(m => { if (m.media && m.media.loading) { m.media.loading = false; m.media.failed = !m.media.url; } delete m.rx; delete m.prog; });
    msgs = msgs.filter(m => !(m.from === 'peer' && m.media === undefined && m.rx));
    loaded = true;
}

/* ------------------------------ NAVIGATION (back button friendly) ------------------------------ */
const layers = [];
function pushLayer(n) { layers.push(n); try { history.pushState({ rd: n }, ''); } catch (e) {} }
function goBack() { if (layers.length) history.back(); }
window.addEventListener('popstate', () => {
    if (!layers.length) return;
    if (call) { try { history.pushState({ rd: 'call' }, ''); } catch (e) {} return; }
    closeLayer(layers.pop());
});
function closeLayer(n) {
    if (n === 'contact') $('contactPage').hidden = true;
    else if (n === 'app') leaveApp();
    else if (n === 'chat') leaveChat();
    else if (n === 'viewer') { $('rdViewer').hidden = true; $('rdViewerImg').src = ''; $('rdViewerLetter').hidden = true; }
    else if (n === 'profile') { showScreen('rdChat'); cancelNick(); }
}
function showScreen(id) { ['rdWho', 'rdList', 'rdChat', 'rdProfile'].forEach(s => $(s).classList.toggle('active', s === id)); }

/* ------------------------------ CONTACT US PAGE ------------------------------ */
function openContact() {
    $('cForm').reset();
    $('contactPage').hidden = false;
    pushLayer('contact');
}
function onContactSubmit(e) {
    e.preventDefault();
    const subj = $('cf-subject').value.trim().toLowerCase();
    $('cForm').reset(); // everything disappears
    if (subj === SECRET_WORD) {
        $('contactPage').hidden = true;
        layers[layers.length - 1] = 'app';
        try { history.replaceState({ rd: 'app' }, ''); } catch (err) {}
        startApp();
    } else {
        toast('Message sent successfully ✓');
    }
}

/* ------------------------------ APP START / STOP ------------------------------ */
async function startApp() {
    $('rdApp').hidden = false;
    appOpen = true;
    await loadStore();
    const me = localStorage.getItem('rd_me');
    if (me === 'radhe' || me === 'amrit') enterApp(me);
    else showScreen('rdWho');
}
function enterApp(me) {
    ME = me;
    PEER = me === 'radhe' ? 'amrit' : 'radhe';
    showScreen('rdList');
    renderList();
    loadProfile();
    initNet();
    tgStart();
}
function leaveApp() {
    cancelRec();
    if (call) endCall(true);
    if (curChat) leaveChat();
    closeLayerUI();
    stopNet();
    tgStop();
    appOpen = false;
    $('rdApp').hidden = true;
}

/* ------------------------------ SUPABASE: presence, signaling, offline queue ------------------------------ */
function initNet() {
    if (!sb && window.supabase && window.supabase.createClient) {
        try {
            sb = window.supabase.createClient(SB_URL, SB_KEY, {
                auth: { persistSession: false, autoRefreshToken: false },
                realtime: { params: { eventsPerSecond: 20 } }
            });
        } catch (e) { sb = null; }
    }
    if (!sb) { updateSub(); return; }
    startRealtime();
    touchLastSeen();
    loadLastSeen();
    fetchPending();
    flushAll();
    clearInterval(hbTimer);
    hbTimer = setInterval(() => { if (!document.hidden) touchLastSeen(); }, 90000);
    clearInterval(fetchTimer);
    fetchTimer = setInterval(() => { if (!document.hidden && !dcOpen()) fetchPending(); }, 25000);
}
function stopNet() {
    clearInterval(hbTimer); clearInterval(fetchTimer);
    touchLastSeen();
    closePC();
    if (channel && sb) { try { sb.removeChannel(channel); } catch (e) {} }
    channel = null; chanReady = false; peerOnline = false;
}
function startRealtime() {
    if (channel || !sb) return;
    channel = sb.channel('rd-room', { config: { presence: { key: ME }, broadcast: { self: false } } });
    channel
        .on('presence', { event: 'sync' }, onPresence)
        .on('broadcast', { event: 'signal' }, m => onSignal(m.payload))
        .on('broadcast', { event: 'call' }, m => onCallMsg(m.payload))
        .on('broadcast', { event: 'poke' }, () => fetchPending())
        .on('broadcast', { event: 'evt' }, m => { if (m.payload) handleEvt(m.payload).catch(() => {}); })
        .subscribe(st => {
            if (st === 'SUBSCRIBED') { chanReady = true; channel.track({ at: Date.now() }); }
            else if (st === 'CLOSED' || st === 'CHANNEL_ERROR' || st === 'TIMED_OUT') chanReady = false;
        });
}
function bsend(ev, payload) {
    if (channel && chanReady) { try { channel.send({ type: 'broadcast', event: ev, payload }); } catch (e) {} }
}
function onPresence() {
    if (!channel) return;
    const now = !!channel.presenceState()[PEER];
    if (now === peerOnline) return;
    peerOnline = now;
    if (now) { ensurePC(); fetchPending(); flushAll(); }
    else {
        closePC();
        if (call) endCall(false);
        peerLastSeen = Date.now();
        setTimeout(loadLastSeen, 1500);
    }
    updateSub(); renderList();
}
function touchLastSeen() {
    if (!sb || !ME || !navigator.onLine) return;
    try { sb.from(T_PRES).upsert({ user_id: ME, last_seen: new Date().toISOString() }).then(() => {}, () => {}); } catch (e) {}
}
async function loadLastSeen() {
    if (!sb || !PEER) return;
    try {
        const { data } = await sb.from(T_PRES).select('last_seen').eq('user_id', PEER).maybeSingle();
        if (data && data.last_seen) {
            const t = new Date(data.last_seen).getTime();
            if (!peerLastSeen || t > peerLastSeen - 5000 || !peerOnline) peerLastSeen = t;
            updateSub();
        }
    } catch (e) {}
}
function lastSeenText() {
    if (!peerLastSeen) return 'offline';
    const t = fmtTime(peerLastSeen), k = dayKey(peerLastSeen), now = Date.now();
    if (k === dayKey(now)) return 'last seen today at ' + t;
    if (k === dayKey(now - 864e5)) return 'last seen yesterday at ' + t;
    return 'last seen ' + new Date(peerLastSeen).toLocaleDateString([], { day: 'numeric', month: 'short' }) + ' at ' + t;
}

/* ---- offline delivery: ek event DB me jaata hai, receiver ke lene ke baad delete ho jaata hai ---- */
async function insertEvt(evt) {
    if (!sb || !navigator.onLine || !ME) return false;
    try {
        const { error } = await sb.from(T_MSG).insert({ id: evt.id, from_user: ME, to_user: PEER, payload: evt });
        if (error) return error.code === '23505';
        if (peerOnline) bsend('poke', {});
        return true;
    } catch (e) { return false; }
}
async function sendEvt(evt) {
    if (dcOpen()) { try { dc.send(JSON.stringify(evt)); return true; } catch (e) {} }
    // fast path: samne wala online hai par P2P nahi bana -> realtime channel se turant (DB nahi)
    if (peerOnline && chanReady && !evt.media) { bsend('evt', evt); return true; }
    return await insertEvt(evt);
}
async function queueEvt(evt) {
    if (!(await sendEvt(evt))) { outbox.push(evt); dbPut('kv', outbox, 'outbox'); }
}
async function flushOutbox() {
    if (!outbox.length) return;
    const list = outbox.splice(0);
    for (const ev of list) { if (!(await sendEvt(ev))) outbox.push(ev); }
    dbPut('kv', outbox, 'outbox');
}
async function fetchPending() {
    if (!sb || !ME || !navigator.onLine || fetching || !appOpen) return;
    fetching = true;
    try {
        const { data, error } = await sb.from(T_MSG).select('*').eq('to_user', ME).order('created_at', { ascending: true });
        if (error || !data || !data.length) { fetching = false; return; }
        const done = [];
        for (const row of data) {
            try { await handleEvt(row.payload); done.push(row); } catch (e) {}
        }
        if (done.length) {
            await sb.from(T_MSG).delete().in('id', done.map(r => r.id));
            const paths = done.map(r => r.payload && r.payload.media && r.payload.media.path).filter(Boolean);
            if (paths.length) await sb.storage.from(BUCKET).remove(paths);
        }
    } catch (e) {}
    fetching = false;
}
function flushAll() {
    flushOutbox();
    msgs.forEach(m => { if (m.chat === 'p2p' && m.from === 'me' && m.status === 'pending' && !m.local) deliver(m); });
    tgFlush();
}

/* ------------------------------ WEBRTC (peer to peer) ------------------------------ */
function dcOpen() { return !!dc && dc.readyState === 'open'; }
function ensurePC() {
    if (pc || !appOpen) return;
    let mypc;
    try { mypc = new RTCPeerConnection(ICE); } catch (e) { pc = null; return; }
    pc = mypc;
    dc = mypc.createDataChannel('chat', { negotiated: true, id: 0, ordered: true });
    setupDC(dc);
    mypc.onicecandidate = e => {
        if (!e.candidate) return;
        candBuf.push(e.candidate.toJSON());
        clearTimeout(candTimer);
        candTimer = setTimeout(() => { const c = candBuf.splice(0); if (c.length) bsend('signal', { cands: c }); }, 60);
    };
    mypc.onnegotiationneeded = async () => {
        try {
            makingOffer = true;
            const offer = await mypc.createOffer();
            offer.sdp = tuneSDP(offer.sdp);
            if (mypc.signalingState !== 'stable') return;
            await mypc.setLocalDescription(offer);
            if (mypc !== pc) return;
            bsend('signal', { desc: { type: mypc.localDescription.type, sdp: mypc.localDescription.sdp } });
        } catch (e) {} finally { makingOffer = false; }
    };
    mypc.ontrack = e => {
        // saare incoming tracks (voice, camera, screen) ek hi stream me — awaaz kabhi nahi katti
        if (!remoteStream) remoteStream = new MediaStream();
        if (!remoteStream.getTracks().includes(e.track)) remoteStream.addTrack(e.track);
        const v = $('rdRemote');
        if (v.srcObject !== remoteStream) v.srcObject = remoteStream;
        e.track.onended = () => { try { remoteStream && remoteStream.removeTrack(e.track); } catch (x) {} };
        playRemote();
        if (call) { call.gotTrack = true; maybeLive(); }
    };
    mypc.oniceconnectionstatechange = () => {
        if (mypc !== pc) return;
        const s = mypc.iceConnectionState;
        if (s === 'failed') { mypc._fails = (mypc._fails || 0) + 1; if (mypc._fails <= 2) { try { mypc.restartIce(); } catch (e) {} } }
        else if (s === 'disconnected') { setTimeout(() => { if (mypc === pc && mypc.iceConnectionState === 'disconnected') { try { mypc.restartIce(); } catch (e) {} } }, 4000); }
    };
    mypc.onconnectionstatechange = () => {
        if (mypc !== pc) return;
        const s = mypc.connectionState;
        if (s === 'connected') maybeLive();
        if (s === 'failed' && (mypc._fails || 0) > 2 || s === 'closed') {
            closePC();
            if (peerOnline) setTimeout(() => { if (peerOnline && !pc) ensurePC(); }, 1200);
        }
        updateSub();
    };
}
function closePC() {
    const p = pc;
    pc = null;
    try { dc && dc.close(); } catch (e) {}
    try { p && p.close(); } catch (e) {}
    dc = null; pendingCand = []; makingOffer = false; incoming.cur = null; remoteStream = null;
    updateSub(); renderList();
}
async function onSignal(p) {
    if (!p || !appOpen) return;
    ensurePC();
    if (!pc) return;
    const polite = ME === 'radhe';
    try {
        if (p.desc) {
            const collision = p.desc.type === 'offer' && (makingOffer || pc.signalingState !== 'stable');
            ignoreOffer = !polite && collision;
            if (ignoreOffer) return;
            await pc.setRemoteDescription(p.desc);
            const q = pendingCand.splice(0);
            for (const c of q) { try { await pc.addIceCandidate(c); } catch (e) {} }
            if (p.desc.type === 'offer') {
                const ans = await pc.createAnswer();
                ans.sdp = tuneSDP(ans.sdp);
                await pc.setLocalDescription(ans);
                bsend('signal', { desc: { type: pc.localDescription.type, sdp: pc.localDescription.sdp } });
            }
        } else if (p.cands) {
            for (const c of p.cands) {
                if (pc.remoteDescription) { try { await pc.addIceCandidate(c); } catch (e) {} }
                else pendingCand.push(c);
            }
        }
    } catch (e) {}
}
function setupDC(ch) {
    ch.binaryType = 'arraybuffer';
    ch.onopen = () => { if (dc !== ch) return; updateSub(); renderList(); flushAll(); };
    ch.onclose = () => {
        if (dc !== ch) return;
        dropIncomplete();
        updateSub(); renderList();
    };
    ch.onmessage = ev => onDC(ev.data);
}
function dropIncomplete() {
    incoming.cur = null;
    const n = msgs.length;
    msgs = msgs.filter(m => !m.rx);
    if (msgs.length !== n) redraw();
}
let progT = 0;
function updateProg(id, pct, label) {
    const now = Date.now();
    if (pct < 100 && now - progT < 180) return;
    progT = now;
    const el = document.querySelector('[data-prog="' + id + '"]');
    if (!el) return;
    el.firstChild.textContent = label + ' ' + pct + '%';
    el.querySelector('i').style.width = pct + '%';
}
function onDC(d) {
    if (typeof d !== 'string') {
        const c = incoming.cur;
        if (!c || c.skip) return;
        c.buf.push(d); c.bufBytes += d.byteLength; c.got += d.byteLength;
        if (c.bufBytes >= 16 * 1024 * 1024) { c.acc.push(new Blob(c.buf)); c.buf = []; c.bufBytes = 0; } // disk-backed blobs, RAM bachti hai
        const total = (c.evt.media && c.evt.media.size) || 0;
        if (total) { c.ph.prog = Math.min(99, Math.floor(c.got * 100 / total)); updateProg(c.ph.id, c.ph.prog, 'Receiving'); }
        return;
    }
    let e;
    try { e = JSON.parse(d); } catch (x) { return; }
    if (e.t === 'media-start') {
        const ex = getMsg(e.id);
        if (ex && !ex.rx) { incoming.cur = { skip: true, evt: e }; return; } // pehle se mil chuka hai
        if (ex) msgs = msgs.filter(m => m.id !== e.id);
        const ph = { id: e.id, chat: 'p2p', from: 'peer', ts: e.ts || Date.now(), text: '', voice: !!e.voice, media: { name: e.media.name, type: e.media.type, size: e.media.size }, rx: true, prog: 0, status: 'received', read: false, reactions: {} };
        msgs.push(ph); msgs.sort((a, b) => a.ts - b.ts);
        incoming.cur = { evt: e, ph, acc: [], buf: [], bufBytes: 0, got: 0 };
        redraw(); renderList();
    } else if (e.t === 'media-end') {
        const c = incoming.cur;
        incoming.cur = null;
        if (!c) return;
        if (c.skip) { ackMsg(e.id, 'delivered'); return; }
        if (c.evt.id !== e.id) return;
        const blob = new Blob(c.acc.concat([new Blob(c.buf)]), { type: (c.evt.media && c.evt.media.type) || 'application/octet-stream' });
        msgs = msgs.filter(m => m.id !== e.id);
        handleEvt(Object.assign({}, c.evt, { t: 'msg' }), blob).catch(() => {});
    } else handleEvt(e).catch(() => {});
}

/* ------------------------------ EVENTS (msg / ack / edit / unsend / react / typing) ------------------------------ */
async function handleEvt(e, blob) {
    switch (e.t) {
        case 'msg': return onMsg(e, blob);
        case 'ack':
            for (const id of (e.ids || [])) { const m = getMsg(id); if (m && m.from === 'me') setStatus(m, e.s); }
            return;
        case 'edit': {
            const m = getMsg(e.mid);
            if (m && m.from === 'peer' && !m.deleted) { m.text = e.text; m.edited = true; saveMsg(m); redraw(); renderList(); }
            return;
        }
        case 'unsend': {
            const m = getMsg(e.mid);
            if (m && m.from === 'peer') wipe(m);
            return;
        }
        case 'react': {
            const m = getMsg(e.mid);
            if (m) {
                m.reactions = m.reactions || {};
                if (e.emoji) m.reactions.peer = e.emoji; else delete m.reactions.peer;
                saveMsg(m); redraw();
            }
            return;
        }
        case 'typing':
            peerTyping = !!e.on;
            clearTimeout(typingTimer);
            if (peerTyping) typingTimer = setTimeout(() => { peerTyping = false; updateSub(); }, 4500);
            updateSub();
            return;
    }
}
async function onMsg(e, blob) {
    if (getMsg(e.id)) { if (!e.system) ackMsg(e.id, 'delivered'); return; }
    const m = { id: e.id, chat: 'p2p', from: 'peer', ts: e.ts || Date.now(), text: e.text || '', system: !!e.system, sk: e.sk || '', voice: !!e.voice, status: 'received', read: false, reactions: {} };
    if (e.media) {
        m.media = { name: e.media.name, type: e.media.type, size: e.media.size };
        if (!blob && e.media.path) {
            const { data, error } = await sb.storage.from(BUCKET).download(e.media.path);
            if (error || !data) throw (error || new Error('download failed'));
            blob = data;
        }
        if (blob) await dbPut('blobs', blob, m.id); else m.media.failed = true;
    }
    addMsg(m);
    if (!m.system) {
        if (curChat === 'p2p' && !document.hidden) { m.read = true; saveMsg(m); ackMsg(m.id, 'seen'); }
        else ackMsg(m.id, 'delivered');
    }
    redraw(); renderList();
}
function ackMsg(id, s) { queueEvt({ t: 'ack', id: uid(), ids: [id], s }); }
function setStatus(m, s) {
    if ((RANK[s] || 0) <= (RANK[m.status] || 0)) return;
    m.status = s;
    if (s !== 'pending') delete memBlobs[m.id];
    saveMsg(m); redraw(); renderList();
}
function wipe(m) {
    m.deleted = true; m.text = ''; m.reactions = {};
    if (m.media) { dbDel('blobs', m.id); if (urlCache[m.id]) { URL.revokeObjectURL(urlCache[m.id]); delete urlCache[m.id]; } delete memBlobs[m.id]; m.media = null; }
    saveMsg(m); redraw(); renderList();
}

/* ------------------------------ SENDING (P2P chat) ------------------------------ */
async function p2pSend(o) {
    const file = o.file;
    if (file && file.size > MAX_P2P_FILE) { toast('File bahut badi hai (1 GB limit)'); return; }
    if (file && file.size > MAX_DB_FILE && !dcOpen()) toast('Badi file — P2P connect hote hi jaayegi');
    const m = { id: uid(), chat: 'p2p', from: 'me', ts: Date.now(), text: o.text || '', status: 'pending', reactions: {}, voice: !!o.voice };
    if (file) {
        m.media = { name: file.name || ('file_' + Date.now()), type: file.type || 'application/octet-stream', size: file.size };
        memBlobs[m.id] = file;
        if (file.size > 30 * 1024 * 1024) dbPut('blobs', file, m.id); // badi file: save background me, bhejna turant shuru
        else await dbPut('blobs', file, m.id);
    }
    addMsg(m);
    redraw(true); renderList();
    deliver(m);
}
function drain() {
    if (!dcOpen() || dc.bufferedAmount < 16 * 1024 * 1024) return Promise.resolve();
    return new Promise(res => {
        const ch = dc;
        ch.bufferedAmountLowThreshold = 4 * 1024 * 1024;
        const done = () => { ch.removeEventListener('bufferedamountlow', done); clearTimeout(t); res(); };
        const t = setTimeout(done, 1500);
        ch.addEventListener('bufferedamountlow', done);
    });
}
let chain = Promise.resolve();
function enqueue(fn) { chain = chain.then(fn, fn); return chain; }
function deliver(m) {
    if (busy.has(m.id) || m.status !== 'pending') return;
    busy.add(m.id);
    const run = async () => {
        try { await deliverNow(m); } catch (e) {}
        busy.delete(m.id);
    };
    if (m.media) enqueue(run); else run(); // text kabhi badi file ke peeche nahi ruke
}
async function deliverNow(m) {
    if (m.deleted) return;
    const evt = { t: 'msg', id: m.id, ts: m.ts, text: m.text, voice: !!m.voice, media: m.media ? { name: m.media.name, type: m.media.type, size: m.media.size } : null };
    if (dcOpen()) {
        try {
            if (m.media) {
                const blob = memBlobs[m.id] || await dbGet('blobs', m.id);
                if (!blob) throw new Error('no blob');
                dc.send(JSON.stringify(Object.assign({}, evt, { t: 'media-start' })));
                const total = blob.size;
                m.prog = 0; redraw();
                for (let o = 0; o < total; o += SLICE) {
                    const buf = await blob.slice(o, Math.min(o + SLICE, total)).arrayBuffer();
                    const CS = chunkSize();
                    for (let q = 0; q < buf.byteLength; q += CS) {
                        if (!dcOpen()) throw new Error('closed');
                        await drain();
                        dc.send(new Uint8Array(buf, q, Math.min(CS, buf.byteLength - q)));
                    }
                    m.prog = Math.min(99, Math.floor((o + buf.byteLength) * 100 / total));
                    updateProg(m.id, m.prog, 'Sending');
                }
                dc.send(JSON.stringify({ t: 'media-end', id: m.id }));
                delete m.prog;
            } else dc.send(JSON.stringify(evt));
            setStatus(m, 'sent');
            return;
        } catch (e) { delete m.prog; redraw(); /* DB route / dobara try */ }
    }
    // fast path: peer online hai par P2P nahi bana -> realtime channel (turant). 3.5s me delivered na aaye to DB se.
    if (!m.media && peerOnline && chanReady) {
        bsend('evt', evt);
        setStatus(m, 'sent');
        setTimeout(() => {
            const x = getMsg(m.id);
            if (x && !x.deleted && (RANK[x.status] || 0) < RANK.delivered) insertEvt(evt);
        }, 3500);
        return;
    }
    if (!sb || !navigator.onLine) return;
    try {
        if (m.media) {
            const blob = memBlobs[m.id] || await dbGet('blobs', m.id);
            if (!blob) return;
            if (blob.size > MAX_DB_FILE) return;
            const safe = String(m.media.name).replace(/[^\w.\-]+/g, '_');
            const path = ME + '/' + m.id + '_' + safe;
            const { error } = await sb.storage.from(BUCKET).upload(path, blob, { contentType: m.media.type || 'application/octet-stream', upsert: true });
            if (error) return;
            evt.media.path = path;
        }
        if (await insertEvt(evt)) setStatus(m, 'sent');
    } catch (e) {}
}
function sendReact(m, emoji) {
    m.reactions = m.reactions || {};
    if (emoji) m.reactions.me = emoji; else delete m.reactions.me;
    saveMsg(m); redraw();
    queueEvt({ t: 'react', id: uid(), mid: m.id, emoji: emoji || null });
}
function commitEdit(text) {
    const m = getMsg(editingId);
    cancelEdit();
    if (!m || !text.trim()) return;
    if (m.chat === 'tg') { tgEdit(m, text); return; }
    if (m.chat === 'saved') { m.text = text; m.edited = true; saveMsg(m); redraw(); renderList(); return; }
    m.text = text; m.edited = true;
    saveMsg(m); redraw(); renderList();
    queueEvt({ t: 'edit', id: uid(), mid: m.id, text });
}
function unsend(m) {
    if (m.chat === 'tg') { tgDelete(m); return; }
    wipe(m);
    queueEvt({ t: 'unsend', id: uid(), mid: m.id });
}
function deleteForMe(ids) {
    ids.forEach(id => {
        const i = msgs.findIndex(m => m.id === id);
        if (i < 0) return;
        msgs.splice(i, 1);
        dbDel('msgs', id); dbDel('blobs', id);
        if (urlCache[id]) { URL.revokeObjectURL(urlCache[id]); delete urlCache[id]; }
        delete memBlobs[id];
    });
    redraw(); renderList();
}
function clearChat() {
    const ids = msgs.filter(m => m.chat === curChat).map(m => m.id);
    deleteForMe(ids);
    toast('Chat cleared');
}
function sysLocal(text, sk) {
    const m = { id: uid(), chat: 'p2p', from: 'me', ts: Date.now(), text, system: true, sk: sk || 'call', local: true, status: 'sent', read: true, reactions: {} };
    addMsg(m); redraw(true); renderList();
}
function sendFile(file, voice) {
    if (curChat === 'tg') tgSendFile(file, voice);
    else if (curChat === 'saved') savedAdd({ file, voice });
    else p2pSend({ file, voice });
}
async function savedAdd(o) {
    const m = { id: 'sv_' + uid(), chat: 'saved', from: 'me', ts: Date.now(), text: o.text || '', status: 'sent', read: true, reactions: {}, voice: !!o.voice };
    if (o.file) {
        m.media = { name: o.file.name || ('file_' + Date.now()), type: o.file.type || 'application/octet-stream', size: o.file.size };
        memBlobs[m.id] = o.file;
        await dbPut('blobs', o.file, m.id);
        delete memBlobs[m.id];
    }
    addMsg(m); redraw(true); renderList();
}
function sendTyping(on) {
    if (curChat !== 'p2p') return;
    if (dcOpen()) { try { dc.send(JSON.stringify({ t: 'typing', on })); } catch (e) {} }
    else if (peerOnline && chanReady) bsend('evt', { t: 'typing', on });
}
function typingPing() {
    const now = Date.now();
    if (now - typingSentAt > 2500) { typingSentAt = now; sendTyping(true); }
    clearTimeout(typingOffTimer);
    typingOffTimer = setTimeout(() => { typingSentAt = 0; sendTyping(false); }, 3000);
}

/* ------------------------------ RENDERING ------------------------------ */
function redraw(force) {
    if (force) rafForce = true;
    if (rafId) return;
    rafId = requestAnimationFrame(() => { rafId = 0; const f = rafForce; rafForce = false; renderMessages(f); });
}
function mediaKind(t) { t = t || ''; if (t.startsWith('image/')) return 'image'; if (t.startsWith('video/')) return 'video'; if (t.startsWith('audio/')) return 'audio'; return 'file'; }
function mediaHTML(m) {
    const md = m.media;
    if (md.failed) return '<div class="rd-fail" data-retry="' + m.id + '">' + ic('download', 20) + '<span>' + esc(md.name) + '<br><small>' + (md.reason || 'Load nahi hua') + ' — tap to retry</small></span></div>';
    if (md.loading) return '<div class="rd-fail">' + ic('download', 20) + '<span>' + esc(md.name) + '<br><small>Loading…</small></span></div>';
    const u = urlCache[m.id];
    const k = mediaKind(md.type);
    const ok = u ? ' data-ok="1"' : '';
    if (k === 'image') return '<img class="rd-img" data-mid="' + m.id + '"' + ok + (u ? ' src="' + u + '"' : '') + ' alt="">';
    if (k === 'video') return '<video class="rd-vid" data-mid="' + m.id + '"' + ok + ' controls playsinline preload="metadata"' + (u ? ' src="' + u + '"' : '') + '></video>';
    if (k === 'audio') return '<audio class="rd-aud" data-mid="' + m.id + '"' + ok + ' controls preload="metadata"' + (u ? ' src="' + u + '"' : '') + '></audio>';
    return '<a class="rd-file" data-mid="' + m.id + '"' + ok + ' download="' + esc(md.name) + '"' + (u ? ' href="' + u + '"' : '') + '>' + ic('file', 20) + '<span>' + esc(md.name) + '<br><small>' + fmtSize(md.size) + '</small></span></a>';
}
function msgHTML(m) {
    if (m.system) return '<div class="rd-sys' + (m.sk === 'call' ? ' call' : '') + '">' + (m.sk === 'call' ? '📞 ' : '') + esc(m.text) + '</div>';
    const out = m.from === 'me';
    let inner = '';
    if (m.deleted) inner = '<span class="rd-del">🚫 ' + (out ? 'You deleted this message' : 'This message was deleted') + '</span>';
    else {
        if (m.rx) inner += '<div class="rd-prog" data-prog="' + m.id + '"><span>Receiving ' + (m.prog || 0) + '%</span><div class="rd-pbar"><i style="width:' + (m.prog || 0) + '%"></i></div></div><div style="font-size:14px">' + esc(m.media.name) + ' • ' + fmtSize(m.media.size) + '</div>';
        else {
            if (m.media) inner += mediaHTML(m);
            if (m.prog != null) inner += '<div class="rd-prog" data-prog="' + m.id + '"><span>Sending ' + m.prog + '%</span><div class="rd-pbar"><i style="width:' + m.prog + '%"></i></div></div>';
        }
        if (m.text) inner += '<div class="rd-txt">' + esc(m.text) + '</div>';
    }
    const st = out && !m.deleted && m.chat !== 'saved' ? (TICK[m.status] || TICK.sent) : '';
    const meta = '<span class="rd-meta">' + (m.edited && !m.deleted ? 'edited ' : '') + fmtTime(m.ts) + st + '</span>';
    const r = m.reactions || {};
    const re = [r.me, r.peer].filter(Boolean);
    const rhtml = re.length ? '<div class="rd-react">' + Array.from(new Set(re)).join('') + (re.length > 1 && r.me !== r.peer ? '' : (re.length > 1 ? '2' : '')) + '</div>' : '';
    return '<div class="rd-row ' + (out ? 'out' : 'in') + (sel.has(m.id) ? ' sel' : '') + '" data-id="' + m.id + '"><div class="rd-bub">' + inner + meta + rhtml + '</div></div>';
}
function renderMessages(force) {
    if (!curChat) return;
    const box = $('rdMsgs');
    const toBottom = force || stick;
    const all = msgs.filter(m => m.chat === curChat);
    const list = all.slice(-renderLimit);
    let html = all.length > list.length ? '<div class="rd-more" data-more="1">Load earlier messages</div>' : '';
    let last = '';
    for (const m of list) {
        const k = dayKey(m.ts);
        if (k !== last) { html += '<div class="rd-day">' + esc(dayLabel(m.ts)) + '</div>'; last = k; }
        html += msgHTML(m);
    }
    box.innerHTML = html;
    hydrate();
    if (toBottom) box.scrollTop = box.scrollHeight;
}
async function getURL(id) {
    if (urlCache[id]) return urlCache[id];
    const b = memBlobs[id] || await dbGet('blobs', id);
    if (b) return (urlCache[id] = URL.createObjectURL(b));
    const m = getMsg(id);
    return (m && m.media && m.media.url) || null;
}
function hydrate() {
    document.querySelectorAll('#rdMsgs [data-mid]').forEach(el => {
        if (el.dataset.ok) return;
        getURL(el.dataset.mid).then(u => {
            if (!u) return;
            el.dataset.ok = '1';
            if (el.tagName === 'A') el.href = u; else el.src = u;
        });
    });
}
function previewOf(m) {
    if (!m) return '';
    let t;
    if (m.deleted) t = '🚫 Deleted message';
    else if (m.system) t = m.text;
    else if (m.media) { const k = mediaKind(m.media.type); t = m.voice ? '🎤 Voice message' : k === 'image' ? '📷 Photo' : k === 'video' ? '🎥 Video' : k === 'audio' ? '🎵 Audio' : '📄 ' + m.media.name; if (m.text) t += ' ' + m.text; }
    else t = m.text;
    return (m.from === 'me' && !m.system && m.chat !== 'saved' ? 'You: ' : '') + t;
}
function renderList() {
    const el = $('rdChatList');
    if (!el || !PEER) return;
    const rows = [
        { id: 'p2p', name: peerName() },
        { id: 'tg', name: 'Telegram' },
        { id: 'saved', name: 'Saved' }
    ];
    el.innerHTML = rows.map(r => {
        let last = null, unread = 0;
        for (let i = msgs.length - 1; i >= 0; i--) { if (msgs[i].chat === r.id) { if (!last) last = msgs[i]; } }
        msgs.forEach(m => { if (m.chat === r.id && m.from === 'peer' && !m.read) unread++; });
        const sub = last ? previewOf(last) : (r.id === 'p2p' ? (dcOpen() ? 'connected' : peerOnline ? 'online' : 'Tap to chat') : r.id === 'saved' ? 'Save anything here' : 'Tap to chat');
        return '<div class="rd-item" data-chat="' + r.id + '">' + avHTML(r.id) + '<div class="rd-it-mid"><b>' + esc(r.name) + '</b><span>' + esc(sub) + '</span></div><div class="rd-it-r">' + (last ? fmtTime(last.ts) : '') + (unread ? '<br><span class="rd-badge">' + unread + '</span>' : '') + '</div></div>';
    }).join('');
}
function updateSub() {
    const el = $('rdSub');
    if (!el || !curChat) return;
    if (curChat === 'tg') { el.textContent = 'Telegram bot'; return; }
    if (curChat === 'saved') { el.textContent = 'Only on this device'; return; }
    el.textContent = peerTyping ? 'typing…' : dcOpen() ? 'connected' : peerOnline ? 'online' : lastSeenText();
    const ps = $('rdProfSt');
    if (ps) ps.textContent = dcOpen() ? 'connected' : peerOnline ? 'online' : lastSeenText();
}

/* ------------------------------ CHAT OPEN / CLOSE ------------------------------ */
function openChat(which) {
    curChat = which; renderLimit = 150; stick = true;
    const p = which === 'p2p';
    paintAv($('rdAv'), which);
    $('rdName').textContent = p ? peerName() : which === 'tg' ? 'Telegram' : 'Saved';
    $('rdVid').hidden = !p; $('rdAud').hidden = !p;
    pushLayer('chat');
    showScreen('rdChat');
    exitSel(); cancelEdit();
    $('rdInput').value = ''; syncSendBtn();
    updateSub();
    renderMessages(true);
    markRead();
    if (p) fetchPending(); else tgPoll();
}
function leaveChat() {
    sendTyping(false);
    curChat = null;
    exitSel(); cancelEdit(); closeLayerUI();
    if (rec) cancelRec();
    showScreen('rdList');
    renderList();
}
function markRead() {
    if (!curChat || document.hidden) return;
    const ids = [];
    msgs.forEach(m => {
        if (m.chat === curChat && m.from === 'peer' && !m.read) {
            m.read = true; saveMsg(m);
            if (curChat === 'p2p' && !m.system) ids.push(m.id);
        }
    });
    if (ids.length) queueEvt({ t: 'ack', id: uid(), ids, s: 'seen' });
    renderList();
}

/* ------------------------------ SELECTION / MENUS ------------------------------ */
function exitSel() {
    selMode = false; sel.clear();
    $('rdHead').hidden = false; $('rdSelBar').hidden = true;
    if (curChat) redraw();
}
function updateSel() {
    selMode = true;
    $('rdHead').hidden = true; $('rdSelBar').hidden = false;
    $('rdSelCount').textContent = sel.size + ' selected';
    redraw();
}
function toggleSel(id) {
    if (sel.has(id)) sel.delete(id); else sel.add(id);
    if (!sel.size) exitSel(); else updateSel();
}
function openLayerUI(html) {
    const L = $('rdLayer');
    L.innerHTML = '<div class="rd-back" data-close="1"></div>' + html;
    L.hidden = false;
}
function closeLayerUI() {
    const L = $('rdLayer');
    L.hidden = true; L.innerHTML = '';
}
function openCtx(id, row) {
    const m = getMsg(id);
    if (!m || m.system) return;
    ctxId = id;
    const r = row.getBoundingClientRect(), vh = window.innerHeight;
    const side = m.from === 'me' ? 'right' : 'left';
    const canReact = m.chat === 'p2p' && !m.deleted;
    const mine = (m.reactions && m.reactions.me) || '';
    const top = Math.max(70, Math.min(r.top - 62, vh - 330));
    let html = '';
    if (canReact) html += '<div class="rd-reacts" style="top:' + top + 'px;' + side + ':12px">' + REACTS.map(x => '<button data-react="' + x + '" class="' + (x === mine ? 'on' : '') + '">' + x + '</button>').join('') + '<button data-react-more="1" style="font-size:22px;font-weight:700;color:var(--sub)">＋</button></div>';
    const acts = [];
    if (m.from === 'me' && !m.deleted && m.text && !m.media && !m.voice) acts.push(['edit', ic('edit', 20) + 'Edit']);
    if (m.from === 'me' && !m.deleted && m.chat !== 'saved') acts.push(['unsend', ic('undo', 20) + 'Unsend']);
    acts.push(['del', ic('trash', 20) + 'Delete for me']);
    const ptop = Math.min(top + (canReact ? 62 : 0), vh - 60 - acts.length * 50);
    html += '<div class="rd-pop" style="top:' + ptop + 'px;' + side + ':12px">' + acts.map(a => '<button data-act="' + a[0] + '">' + a[1] + '</button>').join('') + '</div>';
    openLayerUI(html);
}
function openMenu() {
    openLayerUI('<div class="rd-pop" style="top:56px;right:10px"><button data-menu="select">' + ic('list', 20) + 'Select messages</button><button data-menu="clear">' + ic('trash', 20) + 'Clear chat</button></div>');
}
function openSheet() {
    const it = (k, color, icon, label) => '<button data-sheet="' + k + '"><i style="background:' + color + '">' + ic(icon, 24) + '</i>' + label + '</button>';
    openLayerUI('<div class="rd-sheet">' + it('media', '#7f66ff', 'image', 'Photos & Videos') + it('cam', '#ff2e74', 'camera', 'Camera') + it('audio', '#ff7a00', 'music', 'Audio') + it('doc', '#5157ae', 'file', 'Document') + '</div>');
}
function openEmoji() {
    openLayerUI('<div class="rd-emoji">' + EMOJIS.map(e => '<button data-emoji="' + e + '">' + e + '</button>').join('') + '</div>');
}
function openViewer(src) {
    $('rdViewerImg').src = src;
    $('rdViewerImg').hidden = false;
    $('rdViewerLetter').hidden = true;
    $('rdViewer').hidden = false;
    pushLayer('viewer');
}
function openAvatarViewer(which) {
    if (which === 'p2p' && photoURL) { openViewer(photoURL); return; }
    const L = $('rdViewerLetter');
    paintAv(L, which, 'big');
    L.hidden = false;
    $('rdViewerImg').hidden = true;
    $('rdViewer').hidden = false;
    pushLayer('viewer');
}
function openProfile() {
    if (curChat !== 'p2p') return;
    applyNames(); updateSub();
    pushLayer('profile');
    showScreen('rdProfile');
}
function setNickRow(editing) {
    const row = $('rdNickRow');
    if (editing) {
        row.innerHTML = '<input id="rdNickIn" type="text" maxlength="40" placeholder="Nickname" autocomplete="off"><button id="rdNickOk">' + ic('check', 24) + '</button>';
        const inp = $('rdNickIn'); inp.value = nick; inp.focus();
        $('rdNickOk').onclick = saveNick;
        inp.onkeydown = e => { if (e.key === 'Enter') saveNick(); };
    } else {
        row.innerHTML = '<b id="rdNickTxt"></b><button id="rdNickEdit">' + ic('edit', 22) + '</button>';
        $('rdNickEdit').onclick = () => setNickRow(true);
        applyNames();
    }
}
function saveNick() {
    nick = ($('rdNickIn').value || '').trim();
    dbPut('kv', nick, 'nick_' + PEER);
    setNickRow(false); renderList();
}
function cancelNick() { if ($('rdNickIn')) setNickRow(false); }
async function setPhoto(file) {
    if (!file) return;
    try {
        const bmp = await createImageBitmap(file);
        const k = Math.min(1, 640 / Math.max(bmp.width, bmp.height));
        const c = document.createElement('canvas');
        c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
        c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
        const blob = await new Promise(r => c.toBlob(r, 'image/jpeg', 0.9));
        await dbPut('blobs', blob, 'photo_' + PEER);
        await loadProfile();
        toast('Profile photo set ✓');
    } catch (e) { toast('Photo set nahi hui'); }
}
function startEdit(id) {
    const m = getMsg(id);
    if (!m) return;
    editingId = id;
    $('rdEditTxt').textContent = 'Editing: ' + m.text;
    $('rdEditBar').hidden = false;
    $('rdInput').value = m.text;
    syncSendBtn();
    $('rdInput').focus();
}
function cancelEdit() {
    if (!editingId) return;
    editingId = null;
    $('rdEditBar').hidden = true;
    $('rdInput').value = '';
    syncSendBtn();
}

/* ------------------------------ COMPOSER ------------------------------ */
function syncSendBtn() {
    const inp = $('rdInput');
    const has = inp.value.trim().length > 0 || !!editingId;
    const b = $('rdSendBtn');
    b.innerHTML = ic(has ? 'send' : 'mic', 22);
    b.dataset.mode = has ? 'send' : 'mic';
    inp.style.height = 'auto';
    inp.style.height = Math.min(inp.scrollHeight, 130) + 'px';
}
function doSend() {
    const inp = $('rdInput');
    const t = inp.value.replace(/\s+$/, '');
    if (!t.trim()) return;
    if (editingId) commitEdit(t);
    else if (curChat === 'tg') tgSendText(t);
    else if (curChat === 'saved') savedAdd({ text: t });
    else p2pSend({ text: t });
    inp.value = '';
    syncSendBtn();
    clearTimeout(typingOffTimer); typingSentAt = 0; sendTyping(false);
    inp.focus();
}
async function startRec() {
    if (rec) return;
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder)) { toast('Voice recording support nahi hai'); return; }
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { toast('Microphone permission allow karo'); return; }
    const mime = ['audio/mp4', 'audio/ogg;codecs=opus', 'audio/webm;codecs=opus', 'audio/webm'].find(t => MediaRecorder.isTypeSupported(t)) || '';
    let mr;
    try { mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined); }
    catch (e) { stream.getTracks().forEach(t => t.stop()); toast('Voice record start nahi hua'); return; }
    const r = { mr, stream, chunks: [], t0: Date.now(), discard: false, timer: null };
    rec = r;
    mr.ondataavailable = e => { if (e.data && e.data.size) r.chunks.push(e.data); };
    mr.onstop = () => {
        clearInterval(r.timer);
        r.stream.getTracks().forEach(t => t.stop());
        if (rec === r) rec = null;
        $('rdComp').hidden = false; $('rdRecComp').hidden = true;
        if (r.discard) return;
        const type = (mr.mimeType || mime || 'audio/webm').split(';')[0];
        const blob = new Blob(r.chunks, { type });
        if (blob.size < 400) return;
        sendFile(new File([blob], 'voice_' + Date.now() + '.' + extOf(type), { type }), true);
    };
    mr.start(500);
    $('rdComp').hidden = true; $('rdRecComp').hidden = false; $('rdRecTime').textContent = '0:00';
    r.timer = setInterval(() => {
        const s = Math.floor((Date.now() - r.t0) / 1000);
        $('rdRecTime').textContent = Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
    }, 500);
}
function stopRec() { if (rec && rec.mr.state === 'recording') rec.mr.stop(); }
function cancelRec() { if (rec) { rec.discard = true; if (rec.mr.state === 'recording') rec.mr.stop(); } }

/* ------------------------------ CALLS (HD audio / adaptive video up to 4K / screen share) ------------------------------ */
// Har tier: capture size, fps, max bitrate, aur kitni bandwidth chahiye
const TIERS = [
    { n: '240p', w: 426, h: 240, f: 15, br: 250e3, need: 330e3 },
    { n: '360p', w: 640, h: 360, f: 20, br: 600e3, need: 760e3 },
    { n: '480p', w: 854, h: 480, f: 24, br: 1.1e6, need: 1.4e6 },
    { n: '720p HD', w: 1280, h: 720, f: 30, br: 2.8e6, need: 3.5e6 },
    { n: '1080p Full HD', w: 1920, h: 1080, f: 30, br: 6e6, need: 7.5e6 },
    { n: '4K Ultra HD', w: 3840, h: 2160, f: 30, br: 14e6, need: 18e6 }
];
const START_TIER = 3;

function tuneSDP(sdp) {
    // Opus ko HD voice mode me: high bitrate, FEC on, DTX off, 48 kHz
    const m = sdp.match(/a=rtpmap:(\d+) opus\/48000\/2/i);
    if (!m) return sdp;
    const pt = m[1];
    const want = { useinbandfec: '1', usedtx: '0', stereo: '0', maxaveragebitrate: '128000', maxplaybackrate: '48000', minptime: '10', cbr: '0' };
    const re = new RegExp('a=fmtp:' + pt + ' ([^\\r\\n]*)');
    if (re.test(sdp)) {
        return sdp.replace(re, (all, params) => {
            const o = {};
            params.split(';').forEach(kv => { const i = kv.indexOf('='); if (i > 0) o[kv.slice(0, i).trim()] = kv.slice(i + 1).trim(); });
            Object.assign(o, want);
            return 'a=fmtp:' + pt + ' ' + Object.keys(o).map(k => k + '=' + o[k]).join(';');
        });
    }
    return sdp.replace(new RegExp('(a=rtpmap:' + pt + ' opus/48000/2\\r?\\n)'), '$1a=fmtp:' + pt + ' ' + Object.keys(want).map(k => k + '=' + want[k]).join(';') + '\r\n');
}
function preferCodecs(sender) {
    try {
        const tr = pc.getTransceivers().find(t => t.sender === sender);
        if (!tr || !tr.setCodecPreferences || !window.RTCRtpReceiver) return;
        const caps = RTCRtpReceiver.getCapabilities('video');
        if (!caps) return;
        const rank = c => { const mt = c.mimeType.toLowerCase(); return mt === 'video/vp9' ? 0 : mt === 'video/h264' ? 1 : mt === 'video/vp8' ? 2 : mt === 'video/av1' ? 4 : 3; };
        tr.setCodecPreferences(caps.codecs.slice().sort((x, y) => rank(x) - rank(y)));
    } catch (e) {}
}
async function setParams(sender, mod) {
    if (!sender) return;
    try {
        const p = sender.getParameters();
        if (!p.encodings || !p.encodings.length) return;
        mod(p);
        await sender.setParameters(p);
    } catch (e) {}
}
function tuneSenders() {
    if (!call || !pc) return;
    setParams(call.aSender, p => { p.encodings[0].maxBitrate = 128000; p.encodings[0].priority = 'high'; p.encodings[0].networkPriority = 'high'; });
    if (call.vSender) {
        if (call.share) setParams(call.vSender, p => { p.encodings[0].maxBitrate = 8e6; p.encodings[0].maxFramerate = 30; p.degradationPreference = 'maintain-resolution'; });
        else { const T = TIERS[call.tier]; setParams(call.vSender, p => { p.encodings[0].maxBitrate = T.br; p.encodings[0].maxFramerate = T.f; p.degradationPreference = 'balanced'; }); }
    }
}

function setCallStatus(t) { $('rdCallStatus').textContent = t; }
function banner(t) {
    const b = $('rdBanner');
    if (!t) { b.hidden = true; return; }
    b.firstChild.textContent = t; b.hidden = false;
}
function refreshCallUI() {
    if (!call) return;
    const el = $('rdCall');
    el.classList.toggle('aud', call.kind !== 'video' && !call.remoteShare);
    el.classList.toggle('share', !!call.remoteShare);
    $('rdCallMute').className = 'rd-cbtn big' + (call.muted ? ' on' : '');
    $('rdCallMute').innerHTML = ic(call.muted ? 'mic-off' : 'mic', 36);
    $('rdCallCam').className = 'rd-cbtn' + (call.camOff ? ' on' : '');
    $('rdCallCam').innerHTML = ic(call.camOff ? 'video-off' : 'video', 26);
    $('rdCallFlip').innerHTML = ic('flip', 26);
    $('rdCallShare').className = 'rd-cbtn' + (call.share ? ' on' : '');
    $('rdCallShare').innerHTML = ic('screen', 26);
    $('rdInMute').className = 'rd-cbtn' + (call.muted ? ' on' : '');
    $('rdInMute').innerHTML = ic(call.muted ? 'mic-off' : 'mic', 28);
}
function showCall(status) {
    applyNames();
    refreshCallUI();
    setCallStatus(status);
    $('rdLocal').dataset.size = '1';
    $('rdQual').hidden = true; banner('');
    $('rdCall').hidden = false;
}
function showIncoming() {
    applyNames();
    $('rdInKind').textContent = 'Incoming ' + (call.kind === 'video' ? 'video' : 'voice') + ' call…';
    refreshCallUI();
    $('rdIncoming').hidden = false;
}
function hideIncoming() { $('rdIncoming').hidden = true; }

function newCall(kind, dir, state) {
    return { kind, dir, state, stream: null, camTrack: null, vSender: null, aSender: null, muted: false, camOff: false, facing: 'user', tier: START_TIER, share: null, remoteShare: false, gotTrack: false };
}
function startCall(kind) {
    if (curChat !== 'p2p' || call) return;
    if (!peerOnline || !chanReady) {
        sysLocal('Call not connected — ' + peerName() + ' is offline');
        queueEvt({ t: 'msg', id: uid(), ts: Date.now(), system: true, sk: 'call', text: NAMES[ME] + ' tried to ' + (kind === 'video' ? 'video ' : '') + 'call you but you are offline' });
        toast(peerName() + ' offline hai — unko message mil jayega');
        return;
    }
    call = newCall(kind, 'out', 'calling');
    showCall('Calling…');
    call.ready = acquireLocal(); // mic/camera pehle hi ready (preview + permission), tracks accept ke baad hi jaate hain
    call.ready.then(ok => { if (!ok && call) endCall(true, true); });
    bsend('call', { a: 'invite', kind });
    callTimer = setTimeout(() => {
        if (call && call.state === 'calling') {
            bsend('call', { a: 'end' });
            sysLocal('Call not answered');
            queueEvt({ t: 'msg', id: uid(), ts: Date.now(), system: true, sk: 'call', text: NAMES[ME] + ' tried to ' + (kind === 'video' ? 'video ' : '') + 'call you' });
            endCall(false, true);
        }
    }, 40000);
}
function vconstraints(T) {
    return { facingMode: { ideal: call.facing }, width: { ideal: T.w }, height: { ideal: T.h }, frameRate: { ideal: T.f } };
}
async function acquireLocal() {
    const video = call.kind === 'video';
    const audio = { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1, sampleRate: 48000 };
    try {
        let s;
        try { s = await navigator.mediaDevices.getUserMedia({ audio, video: video ? vconstraints(TIERS[call.tier]) : false }); }
        catch (e) {
            if (!video) throw e;
            s = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        }
        if (!call) { s.getTracks().forEach(t => t.stop()); return false; }
        call.stream = s;
        call.camTrack = s.getVideoTracks()[0] || null;
        s.getAudioTracks().forEach(t => { t.enabled = !call.muted; try { t.contentHint = 'speech'; } catch (e) {} });
        if (call.camTrack) {
            call.camTrack.enabled = !call.camOff;
            try { call.camTrack.contentHint = 'motion'; } catch (e) {}
            try { const c = call.camTrack.getCapabilities(); call.maxW = (c.width && c.width.max) || 1280; } catch (e) { call.maxW = 1280; }
        }
        const lv = $('rdLocal');
        lv.srcObject = s; lv.muted = true;
        lv.classList.toggle('noflip', call.facing === 'environment');
        lv.play().catch(() => {});
        return true;
    } catch (e) { toast('Mic / Camera permission allow karo'); return false; }
}
function attachTracks() {
    if (!call || !call.stream || call.attached) return !!call && call.attached;
    ensurePC();
    if (!pc) { toast('Is browser me call support nahi hai'); return false; }
    call.attached = true;
    call.stream.getTracks().forEach(t => {
        const sender = pc.addTrack(t, call.stream);
        if (t.kind === 'video') { call.vSender = sender; preferCodecs(sender); } else call.aSender = sender;
    });
    clearTimeout(call.watch);
    call.watch = setTimeout(() => {
        if (call && call.state !== 'live') { toast('Call connect nahi hui — network check karo'); endCall(true); }
    }, 25000);
    return true;
}
function onCallMsg(p) {
    if (!p || !appOpen) return;
    if (p.a === 'invite') {
        if (call) { bsend('call', { a: 'busy' }); return; }
        call = newCall(p.kind === 'video' ? 'video' : 'audio', 'in', 'ringing');
        showIncoming();
        if (navigator.vibrate) navigator.vibrate([300, 150, 300]);
        callTimer = setTimeout(() => {
            if (call && call.state === 'ringing') { hideIncoming(); sysLocal('Missed ' + call.kind + ' call'); call = null; }
        }, 42000);
    } else if (p.a === 'accept') {
        if (call && call.dir === 'out' && call.state === 'calling') {
            clearTimeout(callTimer);
            call.state = 'connecting';
            setCallStatus('Connecting…');
            call.ready.then(ok => { if (!ok) { endCall(true, true); return; } if (call) attachTracks(); });
        }
    } else if (p.a === 'reject') {
        if (call && call.dir === 'out') { sysLocal('Call declined'); endCall(false, true); }
    } else if (p.a === 'busy') {
        if (call && call.dir === 'out') { sysLocal(peerName() + ' is busy'); endCall(false, true); }
    } else if (p.a === 'screen') {
        if (call) {
            call.remoteShare = !!p.on;
            refreshCallUI();
            banner(p.on ? peerName() + ' is sharing screen' : '');
            if (p.on) setTimeout(() => banner(''), 3500);
        }
    } else if (p.a === 'end') {
        if (!call) return;
        if (call.state === 'ringing') { clearTimeout(callTimer); hideIncoming(); sysLocal('Missed ' + call.kind + ' call'); call = null; }
        else endCall(false);
    }
}
async function acceptCall() {
    if (!call || call.state !== 'ringing') return;
    clearTimeout(callTimer);
    hideIncoming();
    call.state = 'connecting';
    showCall('Connecting…');
    ensurePC();
    call.ready = acquireLocal();
    const ok = await call.ready;
    if (!ok) { bsend('call', { a: 'end' }); endCall(false, true); return; }
    if (!attachTracks()) { bsend('call', { a: 'end' }); endCall(false, true); return; }
    bsend('call', { a: 'accept' });
}
function rejectCall() {
    if (!call || call.state !== 'ringing') return;
    clearTimeout(callTimer);
    bsend('call', { a: 'reject' });
    hideIncoming();
    sysLocal('Declined ' + call.kind + ' call');
    call = null;
}
function playRemote() {
    const v = $('rdRemote');
    const pr = v.play();
    if (pr && pr.catch) pr.catch(() => {
        toast('Awaaz ke liye screen par ek baar tap karo');
        $('rdCall').addEventListener('click', () => v.play().catch(() => {}), { once: true });
    });
}
function maybeLive() {
    if (call && call.state !== 'live' && call.gotTrack && pc && pc.connectionState === 'connected') callLive();
}
function callLive() {
    if (!call || call.state === 'live') return;
    clearTimeout(call.watch);
    playRemote();
    call.state = 'live';
    call.t0 = Date.now();
    setCallStatus('00:00');
    clearInterval(callTick);
    callTick = setInterval(() => { if (call && call.t0) setCallStatus(fmtDur(Date.now() - call.t0)); }, 1000);
    tuneSenders();
    setTimeout(tuneSenders, 1500);
    $('rdQual').hidden = false;
    $('rdQual').textContent = call.kind === 'video' ? TIERS[call.tier].n : 'HD Voice';
    clearInterval(call.qt);
    call.qt = setInterval(qualityTick, 2000);
}
function maxTierByCamera() {
    const w = call.maxW || 1280;
    let m = 0;
    for (let i = 0; i < TIERS.length; i++) if (TIERS[i].w <= w * 1.05) m = i;
    return m;
}
async function setTier(i) {
    if (!call || !call.camTrack) return;
    call.tier = i;
    const T = TIERS[i];
    try { await call.camTrack.applyConstraints({ width: { ideal: T.w }, height: { ideal: T.h }, frameRate: { ideal: T.f } }); } catch (e) {}
    setParams(call.vSender, p => { p.encodings[0].maxBitrate = T.br; p.encodings[0].maxFramerate = T.f; p.degradationPreference = 'balanced'; });
}
// Har 2 second: network dekho. Achha net = quality upar (4K tak), kamzor net = quality neeche, bahut kamzor = video pause, voice chalti rahe.
async function qualityTick() {
    if (!call || call.state !== 'live' || !pc) return;
    let st;
    try { st = await pc.getStats(); } catch (e) { return; }
    let sel = null;
    st.forEach(r => { if (r.type === 'transport' && r.selectedCandidatePairId) sel = r.selectedCandidatePairId; });
    const pair = sel ? st.get(sel) : null;
    const avail = (pair && pair.availableOutgoingBitrate) || 0;
    const rtt = (pair && pair.currentRoundTripTime) || 0;
    let loss = 0, vBytes = 0;
    st.forEach(r => {
        if (r.type === 'remote-inbound-rtp' && typeof r.fractionLost === 'number') loss = Math.max(loss, r.fractionLost);
        if (r.type === 'outbound-rtp' && r.kind === 'video') vBytes += r.bytesSent || 0;
    });
    const now = Date.now();
    const rate = call.lastT ? (vBytes - call.lastBytes) * 8 / ((now - call.lastT) / 1000) : 0;
    call.lastBytes = vBytes; call.lastT = now;
    const weak = loss > 0.25 || rtt > 0.9;
    const veryWeak = loss > 0.45 || rtt > 1.6 || (avail > 0 && avail < 150e3);
    call.weakN = weak ? (call.weakN || 0) + 1 : 0;
    call.vweakN = veryWeak ? (call.vweakN || 0) + 1 : 0;
    let label = 'HD Voice';
    if (call.kind === 'video' && call.camTrack && !call.share) {
        if (call.vweakN >= 2 && !call.autoPaused && !call.camOff) {
            call.autoPaused = true; call.camTrack.enabled = false;
            banner('Weak network — video pause, voice chal rahi hai');
        } else if (call.autoPaused && call.weakN === 0) {
            call.recov = (call.recov || 0) + 1;
            if (call.recov >= 3) { call.autoPaused = false; call.recov = 0; call.camTrack.enabled = !call.camOff; banner(''); }
        }
        let target = call.tier;
        if (avail > 0) {
            target = 0;
            for (let i = 0; i < TIERS.length; i++) if (TIERS[i].need <= avail * 0.75) target = i;
            if (weak) target = Math.max(0, target - 2);
        }
        target = Math.min(target, maxTierByCamera());
        if (target < call.tier) { call.up = 0; await setTier(target); }
        else if (target > call.tier) { call.up = (call.up || 0) + 1; if (call.up >= 2) { call.up = 0; await setTier(Math.min(target, call.tier + 2)); } }
        label = call.autoPaused ? 'Audio only' : TIERS[call.tier].n;
    } else if (call.share) {
        label = 'Screen share';
        if (weak) setParams(call.vSender, p => { p.encodings[0].maxBitrate = 1.5e6; });
        else setParams(call.vSender, p => { p.encodings[0].maxBitrate = 8e6; });
    }
    const q = $('rdQual');
    q.textContent = label + (rate > 20e3 ? ' • ' + (rate / 1e6).toFixed(1) + ' Mbps' : '') + (weak ? ' • weak net' : '');
}
function endCall(sendEnd, silent) {
    if (!call) return;
    const c = call;
    call = null;
    clearTimeout(callTimer); clearInterval(callTick); clearTimeout(c.watch); clearInterval(c.qt);
    if (sendEnd) bsend('call', { a: 'end' });
    if (c.share) { try { c.share.track.onended = null; c.share.track.stop(); } catch (e) {} }
    if (c.stream) c.stream.getTracks().forEach(t => t.stop());
    try { if (pc) pc.getSenders().forEach(s => { if (s.track) { try { pc.removeTrack(s); } catch (e) {} } }); } catch (e) {}
    remoteStream = null;
    $('rdRemote').srcObject = null; $('rdLocal').srcObject = null;
    $('rdCall').hidden = true; $('rdQual').hidden = true; banner(''); hideIncoming();
    if (c.t0 && !silent) sysLocal((c.kind === 'video' ? 'Video' : 'Voice') + ' call • ' + fmtDur(Date.now() - c.t0));
}
function toggleMute() {
    if (!call) return;
    call.muted = !call.muted; // connect se pehle bhi kaam karta hai
    if (call.stream) call.stream.getAudioTracks().forEach(t => { t.enabled = !call.muted; });
    refreshCallUI();
}
function toggleCam() {
    if (!call || call.kind !== 'video') return;
    call.camOff = !call.camOff;
    if (call.camTrack && !call.autoPaused) call.camTrack.enabled = !call.camOff;
    refreshCallUI();
}
async function flipCamera() {
    if (!call || call.kind !== 'video' || !call.stream) return;
    const next = call.facing === 'user' ? 'environment' : 'user';
    try {
        const T = TIERS[call.tier];
        const ns = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: next }, width: { ideal: T.w }, height: { ideal: T.h }, frameRate: { ideal: T.f } } });
        const nt = ns.getVideoTracks()[0];
        nt.enabled = !call.camOff && !call.autoPaused;
        try { nt.contentHint = 'motion'; } catch (e) {}
        const old = call.camTrack;
        if (call.vSender && !call.share) await call.vSender.replaceTrack(nt);
        if (old) { call.stream.removeTrack(old); old.stop(); }
        call.stream.addTrack(nt);
        call.camTrack = nt; call.facing = next;
        try { const c = nt.getCapabilities(); call.maxW = (c.width && c.width.max) || call.maxW; } catch (e) {}
        const lv = $('rdLocal');
        lv.srcObject = call.stream; lv.classList.toggle('noflip', next === 'environment');
        lv.play().catch(() => {});
    } catch (e) { toast('Camera switch nahi hui'); }
}
async function toggleShare() {
    if (!call) return;
    if (call.share) { stopShare(); return; }
    if (call.state !== 'live') { toast('Pehle call connect hone do'); return; }
    if (!(navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia)) {
        toast('Is device/browser me screen share support nahi hai (Android Chrome me nahi hota, laptop par hota hai)');
        return;
    }
    let ds;
    try { ds = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: { ideal: 30 }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false }); }
    catch (e) { return; }
    const track = ds.getVideoTracks()[0];
    try { track.contentHint = 'detail'; } catch (e) {}
    call.share = { stream: ds, track };
    if (call.vSender) { try { await call.vSender.replaceTrack(track); } catch (e) {} }
    else { call.vSender = pc.addTrack(track, ds); preferCodecs(call.vSender); call.shareAdded = true; }
    track.onended = () => stopShare();
    bsend('call', { a: 'screen', on: true });
    refreshCallUI();
    banner('Screen share chal rahi hai');
    setTimeout(() => banner(''), 3000);
    setTimeout(tuneSenders, 1200);
    setTimeout(tuneSenders, 3000);
}
async function stopShare() {
    if (!call || !call.share) return;
    const sh = call.share;
    call.share = null;
    try { sh.track.onended = null; sh.track.stop(); } catch (e) {}
    if (call.shareAdded) { try { pc.removeTrack(call.vSender); } catch (e) {} call.vSender = null; call.shareAdded = false; }
    else if (call.vSender && call.camTrack) { try { await call.vSender.replaceTrack(call.camTrack); } catch (e) {} }
    bsend('call', { a: 'screen', on: false });
    refreshCallUI();
    banner('');
    tuneSenders();
}

/* ------------------------------ TELEGRAM CHAT (bot) ------------------------------ */
function tgStart() { tgStop(); tgPoll(); tgTimer = setInterval(tgPoll, 3500); tgFlush(); }
function tgStop() { clearInterval(tgTimer); tgTimer = null; }
function tgFlush() { msgs.forEach(m => { if (m.chat === 'tg' && m.from === 'me' && m.status === 'pending') tgDeliver(m); }); }
async function tgPoll() {
    if (tgBusy || !appOpen || document.hidden || !navigator.onLine) return;
    tgBusy = true;
    try {
        const r = await (await fetch(TG_API + 'getUpdates?timeout=0&offset=' + tgOffset)).json();
        if (r.ok && r.result.length) {
            for (const u of r.result) {
                try { await tgHandle(u); } catch (e) {}
                tgOffset = u.update_id + 1;
            }
            dbPut('kv', tgOffset, 'tg_offset');
        }
    } catch (e) {}
    tgBusy = false;
}
async function tgHandle(u) {
    const em = u.edited_message;
    if (em && String(em.chat.id) === TG_CHAT) {
        const old = getMsg('tg_in_' + em.message_id);
        if (old) { old.text = em.text || em.caption || ''; old.edited = true; saveMsg(old); redraw(); renderList(); }
        return;
    }
    const t = u.message;
    if (!t || String(t.chat.id) !== TG_CHAT) return;
    const id = 'tg_in_' + t.message_id;
    if (getMsg(id)) return;
    const m = { id, chat: 'tg', from: 'peer', ts: (t.date || Date.now() / 1000) * 1000, text: t.text || t.caption || '', status: 'received', read: false, tgId: t.message_id, reactions: {} };
    let fid = null, type = '', name = 'file';
    if (t.photo) { fid = t.photo[t.photo.length - 1].file_id; type = 'image/jpeg'; name = 'photo.jpg'; }
    else if (t.video) { fid = t.video.file_id; type = t.video.mime_type || 'video/mp4'; name = t.video.file_name || 'video.mp4'; }
    else if (t.animation) { fid = t.animation.file_id; type = t.animation.mime_type || 'video/mp4'; name = t.animation.file_name || 'animation.mp4'; }
    else if (t.video_note) { fid = t.video_note.file_id; type = 'video/mp4'; name = 'video_note.mp4'; }
    else if (t.voice) { fid = t.voice.file_id; type = t.voice.mime_type || 'audio/ogg'; name = 'voice.ogg'; m.voice = true; }
    else if (t.audio) { fid = t.audio.file_id; type = t.audio.mime_type || 'audio/mpeg'; name = t.audio.file_name || 'audio.mp3'; }
    else if (t.document) { fid = t.document.file_id; type = t.document.mime_type || 'application/octet-stream'; name = t.document.file_name || 'file'; }
    else if (t.sticker) {
        if (t.sticker.is_animated) m.text = t.sticker.emoji || '🙂';
        else { fid = t.sticker.file_id; type = t.sticker.is_video ? 'video/webm' : 'image/webp'; name = 'sticker'; }
    }
    if (fid) m.media = { name, type, size: 0, fid, loading: true };
    if (!m.text && !m.media) return;
    addMsg(m);
    if (curChat === 'tg' && !document.hidden) { m.read = true; saveMsg(m); }
    redraw(true); renderList();
    if (m.media) tgFetchMedia(m); // background me, polling ko nahi rokta
}
// Photo/video download: pehle blob (local save). CORS rok de to direct link se dikhao (<img src> ko CORS nahi chahiye).
async function tgFetchMedia(m) {
    const md = m.media;
    md.loading = true; md.failed = false; redraw();
    try {
        const g = await (await fetch(TG_API + 'getFile?file_id=' + md.fid)).json();
        if (!g.ok) { md.failed = true; md.reason = 'File badi hai (20 MB se zyada) — Telegram me dekho'; throw new Error('getFile'); }
        const url = 'https://api.telegram.org/file/bot' + TG_TOKEN + '/' + g.result.file_path;
        md.url = url;
        if (g.result.file_size) md.size = g.result.file_size;
        try {
            const f = await fetch(url);
            if (!f.ok) throw new Error('http');
            const blob = await f.blob();
            md.size = blob.size;
            await dbPut('blobs', new Blob([blob], { type: md.type }), m.id);
            delete urlCache[m.id];
        } catch (e) { /* CORS: blob nahi mila, link se chalega */ }
        md.failed = false;
    } catch (e) { if (!md.failed) { md.failed = true; md.reason = 'Load nahi hua'; } }
    md.loading = false;
    saveMsg(m); redraw(); renderList();
}
async function tgSendText(text) {
    const m = { id: 'tg_' + uid(), chat: 'tg', from: 'me', ts: Date.now(), text, status: 'pending', reactions: {} };
    addMsg(m); redraw(true); renderList();
    tgDeliver(m);
}
async function tgSendFile(file, voice) {
    if (file.size > MAX_DB_FILE) { toast('Telegram bot 50 MB tak hi leta hai'); return; }
    const m = { id: 'tg_' + uid(), chat: 'tg', from: 'me', ts: Date.now(), text: '', status: 'pending', reactions: {}, voice: !!voice };
    m.media = { name: file.name || ('file_' + Date.now()), type: file.type || 'application/octet-stream', size: file.size };
    memBlobs[m.id] = file;
    await dbPut('blobs', file, m.id);
    addMsg(m); redraw(true); renderList();
    tgDeliver(m);
}
async function tgDeliver(m) {
    if (busy.has(m.id) || m.deleted || !navigator.onLine) return;
    busy.add(m.id);
    try {
        let r;
        if (m.media) {
            const blob = memBlobs[m.id] || await dbGet('blobs', m.id);
            if (!blob) throw new Error('no blob');
            r = await tgUpload(m, blob);
        } else {
            r = await (await fetch(TG_API + 'sendMessage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TG_CHAT, text: m.text }) })).json();
        }
        if (r && r.ok) { m.tgId = r.result.message_id; m.status = 'sent'; delete memBlobs[m.id]; saveMsg(m); }
    } catch (e) {}
    busy.delete(m.id);
    redraw(); renderList();
}
async function tgUpload(m, blob) {
    const t = (m.media.type || '').split(';')[0];
    let method = 'sendDocument', field = 'document';
    if (t === 'image/gif') { method = 'sendAnimation'; field = 'animation'; }
    else if (t.startsWith('image/') && blob.size <= 10485760) { method = 'sendPhoto'; field = 'photo'; }
    else if (t.startsWith('video/')) { method = 'sendVideo'; field = 'video'; }
    else if (m.voice && /mp4|ogg|mpeg/.test(t)) { method = 'sendVoice'; field = 'voice'; }
    else if (!m.voice && /^audio\/(mp4|mpeg|mp3|ogg)/.test(t)) { method = 'sendAudio'; field = 'audio'; }
    const go = async (meth, f) => {
        const fd = new FormData();
        fd.append('chat_id', TG_CHAT);
        fd.append(f, blob, m.media.name);
        return (await fetch(TG_API + meth, { method: 'POST', body: fd })).json();
    };
    let r = await go(method, field);
    if (!(r && r.ok) && method !== 'sendDocument') r = await go('sendDocument', 'document');
    return r;
}
async function tgEdit(m, text) {
    if (!m.tgId) { toast('Edit nahi ho sakta'); return; }
    try {
        const r = await (await fetch(TG_API + 'editMessageText', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TG_CHAT, message_id: m.tgId, text }) })).json();
        if (r.ok) { m.text = text; m.edited = true; saveMsg(m); redraw(); renderList(); }
        else toast('Edit nahi hua');
    } catch (e) { toast('Edit nahi hua'); }
}
async function tgDelete(m) {
    if (!m.tgId) { toast('Unsend nahi ho sakta'); return; }
    try {
        const r = await (await fetch(TG_API + 'deleteMessage', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: TG_CHAT, message_id: m.tgId }) })).json();
        if (r.ok) wipe(m);
        else toast('Unsend nahi hua (48 ghante se purana ho sakta hai)');
    } catch (e) { toast('Unsend nahi hua'); }
}

/* ------------------------------ WIRING ------------------------------ */
function wire() {
    // icons
    const set = (id, n, s) => { const el = $(id); if (el) el.innerHTML = ic(n, s); };
    ['cBack', 'rdListBack', 'rdBack'].forEach(i => set(i, 'back', 24));
    set('rdVid', 'video', 22); set('rdAud', 'phone', 21); set('rdMore', 'more', 22);
    set('rdSelCancel', 'x', 22); set('rdSelDel', 'trash', 22); set('rdEditX', 'x', 18);
    set('rdEmojiBtn', 'smile', 24); set('rdAttachBtn', 'plus', 24);
    set('rdRecCancel', 'trash', 22); set('rdRecSend', 'send', 22);
    set('rdCallEnd', 'phone', 38); set('rdInReject', 'phone', 38); set('rdInAccept', 'phone', 38);
    set('rdCallMute', 'mic', 36); set('rdCallCam', 'video', 26); set('rdCallFlip', 'flip', 26); set('rdCallShare', 'screen', 26); set('rdInMute', 'mic', 28);
    set('rdViewerX', 'x', 24); set('rdProfBack', 'back', 24); set('rdNickEdit', 'edit', 22);
    syncSendBtn();

    // contact page
    $('rdContactRow').addEventListener('click', openContact);
    $('cBack').addEventListener('click', goBack);
    $('cForm').addEventListener('submit', onContactSubmit);

    // who are you
    document.querySelectorAll('#rdWho [data-me]').forEach(b => b.addEventListener('click', () => {
        localStorage.setItem('rd_me', b.dataset.me);
        enterApp(b.dataset.me);
    }));
    $('rdListBack').addEventListener('click', goBack);
    $('rdChatList').addEventListener('click', e => {
        const av = e.target.closest('[data-avof]');
        if (av) { e.stopPropagation(); openAvatarViewer(av.dataset.avof); return; } // profile pic tap = full screen
        const it = e.target.closest('[data-chat]'); if (it) openChat(it.dataset.chat);
    });
    // header: avatar = full screen photo, naam = profile page
    $('rdAv').addEventListener('click', () => { if (curChat) openAvatarViewer(curChat); });
    document.querySelector('#rdHead .rd-title').addEventListener('click', openProfile);
    $('rdProfBack').addEventListener('click', goBack);
    $('rdProfAv').addEventListener('click', () => openAvatarViewer('p2p'));
    $('rdProfPhotoBtn').addEventListener('click', () => $('rdFilePhoto').click());
    $('rdFilePhoto').addEventListener('change', e => { setPhoto(e.target.files && e.target.files[0]); e.target.value = ''; });
    $('rdNickEdit').addEventListener('click', () => setNickRow(true));

    // chat header
    $('rdBack').addEventListener('click', goBack);
    $('rdMore').addEventListener('click', openMenu);
    $('rdVid').addEventListener('click', () => startCall('video'));
    $('rdAud').addEventListener('click', () => startCall('audio'));
    $('rdSelCancel').addEventListener('click', exitSel);
    $('rdSelDel').addEventListener('click', () => { const ids = Array.from(sel); exitSel(); deleteForMe(ids); });
    $('rdEditX').addEventListener('click', cancelEdit);

    // composer
    const inp = $('rdInput');
    inp.addEventListener('input', () => { syncSendBtn(); if (curChat === 'p2p') typingPing(); });
    inp.addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey && window.matchMedia('(pointer:fine)').matches) { e.preventDefault(); doSend(); }
    });
    $('rdSendBtn').addEventListener('click', () => { if ($('rdSendBtn').dataset.mode === 'mic') startRec(); else doSend(); });
    $('rdAttachBtn').addEventListener('click', openSheet);
    $('rdEmojiBtn').addEventListener('click', openEmoji);
    $('rdRecCancel').addEventListener('click', cancelRec);
    $('rdRecSend').addEventListener('click', stopRec);
    ['rdFileMedia', 'rdFileCam', 'rdFileAudio', 'rdFileDoc'].forEach(id => {
        $(id).addEventListener('change', e => {
            Array.from(e.target.files || []).forEach(f => sendFile(f, false));
            e.target.value = '';
        });
    });

    // layer (context menus / sheets)
    $('rdLayer').addEventListener('click', e => {
        const t = e.target;
        if (t.dataset && t.dataset.close) { closeLayerUI(); return; }
        if (t.closest('[data-react-more]')) {
            openLayerUI('<div class="rd-emoji">' + EMOJIS.map(e => '<button data-rpick="' + e + '">' + e + '</button>').join('') + '</div>');
            return;
        }
        const rp = t.closest('[data-rpick]');
        if (rp) { const m = getMsg(ctxId); closeLayerUI(); if (m) sendReact(m, rp.dataset.rpick); return; }
        const r = t.closest('[data-react]');
        if (r) { const m = getMsg(ctxId); closeLayerUI(); if (m) sendReact(m, (m.reactions && m.reactions.me === r.dataset.react) ? null : r.dataset.react); return; }
        const a = t.closest('[data-act]');
        if (a) {
            const m = getMsg(ctxId); closeLayerUI();
            if (!m) return;
            if (a.dataset.act === 'edit') startEdit(m.id);
            else if (a.dataset.act === 'unsend') unsend(m);
            else if (a.dataset.act === 'del') deleteForMe([m.id]);
            return;
        }
        const mn = t.closest('[data-menu]');
        if (mn) {
            closeLayerUI();
            if (mn.dataset.menu === 'select') { sel = new Set(); updateSel(); toast('Message tap karke select karo'); }
            else if (mn.dataset.menu === 'clear') { if (confirm('Poori chat clear kar de?')) clearChat(); }
            return;
        }
        const sh = t.closest('[data-sheet]');
        if (sh) {
            closeLayerUI();
            const map = { media: 'rdFileMedia', cam: 'rdFileCam', audio: 'rdFileAudio', doc: 'rdFileDoc' };
            $(map[sh.dataset.sheet]).click();
            return;
        }
        const em = t.closest('[data-emoji]');
        if (em) { inp.value += em.dataset.emoji; syncSendBtn(); return; }
    });

    // messages: long press / tap / scroll
    const box = $('rdMsgs');
    let lp = null, lpStart = null, lpFired = false;
    const longPress = (id, row) => { if (selMode) toggleSel(id); else openCtx(id, row); };
    box.addEventListener('pointerdown', e => {
        const row = e.target.closest('.rd-row');
        if (!row || e.target.closest('audio,video,a')) return;
        lpFired = false; lpStart = { x: e.clientX, y: e.clientY };
        lp = setTimeout(() => { lpFired = true; lp = null; longPress(row.dataset.id, row); }, 450);
    });
    box.addEventListener('pointermove', e => {
        if (lp && lpStart && (Math.abs(e.clientX - lpStart.x) > 10 || Math.abs(e.clientY - lpStart.y) > 10)) { clearTimeout(lp); lp = null; }
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(t => box.addEventListener(t, () => { clearTimeout(lp); lp = null; }));
    box.addEventListener('click', e => {
        if (lpFired) { lpFired = false; return; }
        const rt = e.target.closest('[data-retry]');
        if (rt) { const mm = getMsg(rt.dataset.retry); if (mm && mm.media) { if (mm.media.fid) tgFetchMedia(mm); } return; }
        if (e.target.closest('[data-more]')) { renderLimit += 150; renderMessages(false); return; }
        const row = e.target.closest('.rd-row');
        if (!row) return;
        if (selMode) { toggleSel(row.dataset.id); return; }
        const img = e.target.closest('img.rd-img');
        if (img && img.src) openViewer(img.src);
    });
    box.addEventListener('contextmenu', e => {
        const row = e.target.closest('.rd-row');
        if (row) { e.preventDefault(); longPress(row.dataset.id, row); }
    });
    box.addEventListener('scroll', () => { stick = box.scrollHeight - box.scrollTop - box.clientHeight < 140; });
    box.addEventListener('load', () => { if (stick) box.scrollTop = box.scrollHeight; }, true);
    box.addEventListener('loadedmetadata', () => { if (stick) box.scrollTop = box.scrollHeight; }, true);

    // calls
    $('rdCallEnd').addEventListener('click', () => endCall(true));
    $('rdCallFlip').addEventListener('click', flipCamera);
    $('rdCallShare').addEventListener('click', toggleShare);
    $('rdInMute').addEventListener('click', toggleMute);
    $('rdLocal').addEventListener('click', () => { const l = $('rdLocal'); l.dataset.size = String((Number(l.dataset.size) % 3) + 1); }); // apna face chhota/bada
    $('rdCallMute').addEventListener('click', toggleMute);
    $('rdCallCam').addEventListener('click', toggleCam);
    $('rdInAccept').addEventListener('click', acceptCall);
    $('rdInReject').addEventListener('click', rejectCall);
    $('rdViewerX').addEventListener('click', goBack);

    // page / network events
    window.addEventListener('online', () => {
        if (!appOpen) return;
        fetchPending(); flushAll(); touchLastSeen(); tgPoll();
        if (pc && pc.connectionState !== 'connected') { try { pc.restartIce(); } catch (e) {} }
    });
    if (navigator.connection && navigator.connection.addEventListener) {
        navigator.connection.addEventListener('change', () => { if (appOpen && pc && pc.connectionState === 'connected') { try { pc.restartIce(); } catch (e) {} } }); // wifi <-> mobile data switch
    }
    document.addEventListener('visibilitychange', () => {
        if (!appOpen || !ME) return;
        if (document.hidden) {
            if (channel && chanReady) { try { channel.untrack(); } catch (e) {} }
            touchLastSeen();
        } else {
            if (channel && chanReady) { try { channel.track({ at: Date.now() }); } catch (e) {} }
            fetchPending(); markRead(); flushAll(); tgPoll();
        }
    });
    window.addEventListener('pagehide', () => { if (appOpen) touchLastSeen(); });
}

document.addEventListener('DOMContentLoaded', wire);
})();
