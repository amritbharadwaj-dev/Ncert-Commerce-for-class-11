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
const CHUNK = 16 * 1024;
const MAX_DB_FILE = 50 * 1024 * 1024;
const MAX_P2P_FILE = 200 * 1024 * 1024;
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
    music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/>',
    smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    undo: '<polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
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
let rec = null, call = null, callTimer = null, callTick = null, typingTimer = null, typingSentAt = 0, typingOffTimer = null;
let rafId = 0, rafForce = false, ctxId = null;
const busy = new Set(), urlCache = {}, memBlobs = {}, incoming = { cur: null };
const RANK = { pending: 0, sent: 1, delivered: 2, seen: 3 };

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
    else if (n === 'viewer') { $('rdViewer').hidden = true; $('rdViewerImg').src = ''; }
}
function showScreen(id) { ['rdWho', 'rdList', 'rdChat'].forEach(s => $(s).classList.toggle('active', s === id)); }

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
            await mypc.setLocalDescription();
            if (mypc !== pc) return;
            bsend('signal', { desc: { type: mypc.localDescription.type, sdp: mypc.localDescription.sdp } });
        } catch (e) {} finally { makingOffer = false; }
    };
    mypc.ontrack = e => {
        const v = $('rdRemote');
        v.srcObject = (e.streams && e.streams[0]) || new MediaStream([e.track]);
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
    dc = null; pendingCand = []; makingOffer = false; incoming.cur = null;
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
                await pc.setLocalDescription();
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
    ch.onclose = () => { if (dc === ch) { updateSub(); renderList(); } };
    ch.onmessage = ev => onDC(ev.data);
}
function onDC(d) {
    if (typeof d !== 'string') {
        if (incoming.cur) { incoming.cur.parts.push(d); incoming.cur.got += d.byteLength; }
        return;
    }
    let e;
    try { e = JSON.parse(d); } catch (x) { return; }
    if (e.t === 'media-start') incoming.cur = { evt: e, parts: [], got: 0 };
    else if (e.t === 'media-end') {
        const c = incoming.cur;
        incoming.cur = null;
        if (c && c.evt.id === e.id) {
            const blob = new Blob(c.parts, { type: (c.evt.media && c.evt.media.type) || 'application/octet-stream' });
            handleEvt(Object.assign({}, c.evt, { t: 'msg' }), blob).catch(() => {});
        }
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
    const m = { id: e.id, chat: 'p2p', from: 'peer', ts: e.ts || Date.now(), text: e.text || '', system: !!e.system, voice: !!e.voice, status: 'received', read: false, reactions: {} };
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
    if (file && file.size > MAX_P2P_FILE) { toast('File bahut badi hai (200 MB limit)'); return; }
    if (file && file.size > MAX_DB_FILE && !dcOpen()) { toast('Peer offline hai — 50 MB se badi file abhi nahi ja sakti'); return; }
    const m = { id: uid(), chat: 'p2p', from: 'me', ts: Date.now(), text: o.text || '', status: 'pending', reactions: {}, voice: !!o.voice };
    if (file) {
        m.media = { name: file.name || ('file_' + Date.now()), type: file.type || 'application/octet-stream', size: file.size };
        memBlobs[m.id] = file;
        await dbPut('blobs', file, m.id);
    }
    addMsg(m);
    redraw(true); renderList();
    deliver(m);
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
                for (let o = 0; o < blob.size; o += CHUNK) {
                    while (dcOpen() && dc.bufferedAmount > 4 * 1024 * 1024) await sleep(40);
                    if (!dcOpen()) throw new Error('closed');
                    dc.send(await blob.slice(o, o + CHUNK).arrayBuffer());
                }
                dc.send(JSON.stringify({ t: 'media-end', id: m.id }));
            } else dc.send(JSON.stringify(evt));
            setStatus(m, 'sent');
            return;
        } catch (e) { /* fall back to DB route */ }
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
function sysLocal(text) {
    const m = { id: uid(), chat: 'p2p', from: 'me', ts: Date.now(), text, system: true, local: true, status: 'sent', read: true, reactions: {} };
    addMsg(m); redraw(true); renderList();
}
function sendFile(file, voice) {
    if (curChat === 'tg') tgSendFile(file, voice);
    else p2pSend({ file, voice });
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
    if (md.failed) return '<div class="rd-file">📎 ' + esc(md.name) + ' (load nahi hua)</div>';
    const u = urlCache[m.id];
    const k = mediaKind(md.type);
    const ok = u ? ' data-ok="1"' : '';
    if (k === 'image') return '<img class="rd-img" data-mid="' + m.id + '"' + ok + (u ? ' src="' + u + '"' : '') + ' alt="">';
    if (k === 'video') return '<video class="rd-vid" data-mid="' + m.id + '"' + ok + ' controls playsinline preload="metadata"' + (u ? ' src="' + u + '"' : '') + '></video>';
    if (k === 'audio') return '<audio class="rd-aud" data-mid="' + m.id + '"' + ok + ' controls preload="metadata"' + (u ? ' src="' + u + '"' : '') + '></audio>';
    return '<a class="rd-file" data-mid="' + m.id + '"' + ok + ' download="' + esc(md.name) + '"' + (u ? ' href="' + u + '"' : '') + '>' + ic('file', 20) + '<span>' + esc(md.name) + '<br><small>' + fmtSize(md.size) + '</small></span></a>';
}
function msgHTML(m) {
    if (m.system) return '<div class="rd-sys">' + esc(m.text) + '</div>';
    const out = m.from === 'me';
    let inner = '';
    if (m.deleted) inner = '<span class="rd-del">🚫 ' + (out ? 'You deleted this message' : 'This message was deleted') + '</span>';
    else {
        if (m.media) inner += mediaHTML(m);
        if (m.text) inner += '<div class="rd-txt">' + esc(m.text) + '</div>';
    }
    const st = out && !m.deleted ? (TICK[m.status] || TICK.sent) : '';
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
    if (!b) return null;
    return (urlCache[id] = URL.createObjectURL(b));
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
    return (m.from === 'me' && !m.system ? 'You: ' : '') + t;
}
function renderList() {
    const el = $('rdChatList');
    if (!el || !PEER) return;
    const rows = [
        { id: 'p2p', name: NAMES[PEER], letter: NAMES[PEER][0], cls: PEER === 'radhe' ? 'r' : 'a' },
        { id: 'tg', name: 'Telegram', letter: 'T', cls: 't' }
    ];
    el.innerHTML = rows.map(r => {
        let last = null, unread = 0;
        for (let i = msgs.length - 1; i >= 0; i--) { if (msgs[i].chat === r.id) { if (!last) last = msgs[i]; } }
        msgs.forEach(m => { if (m.chat === r.id && m.from === 'peer' && !m.read) unread++; });
        const sub = last ? previewOf(last) : (r.id === 'p2p' ? (dcOpen() ? 'connected' : peerOnline ? 'online' : 'Tap to chat') : 'Tap to chat');
        return '<div class="rd-item" data-chat="' + r.id + '"><span class="rd-av ' + r.cls + '">' + r.letter + '</span><div class="rd-it-mid"><b>' + esc(r.name) + '</b><span>' + esc(sub) + '</span></div><div class="rd-it-r">' + (last ? fmtTime(last.ts) : '') + (unread ? '<br><span class="rd-badge">' + unread + '</span>' : '') + '</div></div>';
    }).join('');
}
function updateSub() {
    const el = $('rdSub');
    if (!el || !curChat) return;
    if (curChat === 'tg') { el.textContent = 'Telegram bot'; return; }
    el.textContent = peerTyping ? 'typing…' : dcOpen() ? 'connected' : peerOnline ? 'online' : lastSeenText();
}

/* ------------------------------ CHAT OPEN / CLOSE ------------------------------ */
function openChat(which) {
    curChat = which; renderLimit = 150; stick = true;
    const p = which === 'p2p';
    $('rdAv').className = 'rd-av ' + (p ? (PEER === 'radhe' ? 'r' : 'a') : 't');
    $('rdAv').textContent = p ? NAMES[PEER][0] : 'T';
    $('rdName').textContent = p ? NAMES[PEER] : 'Telegram';
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
    if (canReact) html += '<div class="rd-reacts" style="top:' + top + 'px;' + side + ':12px">' + REACTS.map(x => '<button data-react="' + x + '" class="' + (x === mine ? 'on' : '') + '">' + x + '</button>').join('') + '</div>';
    const acts = [];
    if (m.from === 'me' && !m.deleted && m.text && !m.media && !m.voice) acts.push(['edit', ic('edit', 20) + 'Edit']);
    if (m.from === 'me' && !m.deleted) acts.push(['unsend', ic('undo', 20) + 'Unsend']);
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
    $('rdViewer').hidden = false;
    pushLayer('viewer');
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

/* ------------------------------ CALLS (WebRTC audio / video) ------------------------------ */
function peerCls() { return PEER === 'radhe' ? 'r' : 'a'; }
function setCallStatus(t) { $('rdCallStatus').textContent = t; }
function showCall(status) {
    $('rdCallAv').className = 'rd-av ' + peerCls();
    $('rdCallAv').textContent = NAMES[PEER][0];
    $('rdCallName').textContent = NAMES[PEER];
    $('rdCall').classList.toggle('aud', call.kind !== 'video');
    $('rdCallMute').className = 'rd-cbtn';
    $('rdCallMute').innerHTML = ic('mic', 26);
    $('rdCallCam').className = 'rd-cbtn';
    $('rdCallCam').innerHTML = ic('video', 26);
    setCallStatus(status);
    $('rdCall').hidden = false;
}
function showIncoming() {
    $('rdInAv').className = 'rd-av ' + peerCls();
    $('rdInAv').textContent = NAMES[PEER][0];
    $('rdInName').textContent = NAMES[PEER];
    $('rdInKind').textContent = 'Incoming ' + (call.kind === 'video' ? 'video' : 'voice') + ' call…';
    $('rdIncoming').hidden = false;
}
function hideIncoming() { $('rdIncoming').hidden = true; }
function startCall(kind) {
    if (curChat !== 'p2p' || call) return;
    if (!peerOnline || !chanReady) {
        sysLocal('Call not connected — ' + NAMES[PEER] + ' is offline');
        queueEvt({ t: 'msg', id: uid(), ts: Date.now(), system: true, text: NAMES[ME] + ' tried to ' + (kind === 'video' ? 'video ' : '') + 'call you but you are offline' });
        toast(NAMES[PEER] + ' offline hai — unko message mil jayega');
        return;
    }
    call = { kind, dir: 'out', state: 'calling', stream: null, muted: false, camOff: false };
    showCall('Calling…');
    bsend('call', { a: 'invite', kind });
    callTimer = setTimeout(() => {
        if (call && call.state === 'calling') {
            bsend('call', { a: 'end' });
            sysLocal('Call not answered');
            queueEvt({ t: 'msg', id: uid(), ts: Date.now(), system: true, text: NAMES[ME] + ' tried to ' + (kind === 'video' ? 'video ' : '') + 'call you' });
            endCall(false, true);
        }
    }, 40000);
}
async function attachLocal() {
    try {
        const s = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
            video: call.kind === 'video' ? { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } : false
        });
        if (!call) { s.getTracks().forEach(t => t.stop()); return false; }
        call.stream = s;
        const lv = $('rdLocal');
        lv.srcObject = s; lv.muted = true;
        lv.play().catch(() => {});
        ensurePC();
        if (!pc) { toast('Is browser me call support nahi hai'); return false; }
        s.getTracks().forEach(t => pc.addTrack(t, s));
        clearTimeout(call.watch);
        call.watch = setTimeout(() => {
            if (call && call.state !== 'live') { toast('Call connect nahi hui — network check karo'); endCall(true); }
        }, 25000);
        return true;
    } catch (e) { toast('Mic / Camera permission allow karo'); return false; }
}
function playRemote() {
    const v = $('rdRemote');
    const p = v.play();
    if (p && p.catch) p.catch(() => {
        toast('Awaaz ke liye screen par ek baar tap karo');
        $('rdCall').addEventListener('click', () => v.play().catch(() => {}), { once: true });
    });
}
function maybeLive() {
    if (call && call.state !== 'live' && call.gotTrack && pc && pc.connectionState === 'connected') callLive();
}
function onCallMsg(p) {
    if (!p || !appOpen) return;
    if (p.a === 'invite') {
        if (call) { bsend('call', { a: 'busy' }); return; }
        call = { kind: p.kind === 'video' ? 'video' : 'audio', dir: 'in', state: 'ringing', stream: null, muted: false, camOff: false };
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
            attachLocal().then(ok => { if (!ok) endCall(true); });
        }
    } else if (p.a === 'reject') {
        if (call && call.dir === 'out') { sysLocal('Call declined'); endCall(false, true); }
    } else if (p.a === 'busy') {
        if (call && call.dir === 'out') { sysLocal(NAMES[PEER] + ' is busy'); endCall(false, true); }
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
    const ok = await attachLocal();
    if (!ok) { bsend('call', { a: 'end' }); endCall(false, true); return; }
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
function callLive() {
    if (!call || call.state === 'live') return;
    clearTimeout(call.watch);
    playRemote();
    call.state = 'live';
    call.t0 = Date.now();
    setCallStatus('00:00');
    clearInterval(callTick);
    callTick = setInterval(() => { if (call && call.t0) setCallStatus(fmtDur(Date.now() - call.t0)); }, 1000);
}
function endCall(sendEnd, silent) {
    if (!call) return;
    const c = call;
    call = null;
    clearTimeout(callTimer); clearInterval(callTick); clearTimeout(c.watch);
    if (sendEnd) bsend('call', { a: 'end' });
    if (c.stream) c.stream.getTracks().forEach(t => t.stop());
    try { if (pc) pc.getSenders().forEach(s => { if (s.track) { try { pc.removeTrack(s); } catch (e) {} } }); } catch (e) {}
    $('rdRemote').srcObject = null; $('rdLocal').srcObject = null;
    $('rdCall').hidden = true; hideIncoming();
    if (c.t0 && !silent) sysLocal((c.kind === 'video' ? 'Video' : 'Voice') + ' call • ' + fmtDur(Date.now() - c.t0));
}
function toggleMute() {
    if (!call || !call.stream) return;
    call.muted = !call.muted;
    call.stream.getAudioTracks().forEach(t => { t.enabled = !call.muted; });
    $('rdCallMute').className = 'rd-cbtn' + (call.muted ? ' on' : '');
    $('rdCallMute').innerHTML = ic(call.muted ? 'mic-off' : 'mic', 26);
}
function toggleCam() {
    if (!call || !call.stream || call.kind !== 'video') return;
    call.camOff = !call.camOff;
    call.stream.getVideoTracks().forEach(t => { t.enabled = !call.camOff; });
    $('rdCallCam').className = 'rd-cbtn' + (call.camOff ? ' on' : '');
    $('rdCallCam').innerHTML = ic(call.camOff ? 'video-off' : 'video', 26);
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
    if (fid) {
        m.media = { name, type, size: 0 };
        try {
            const g = await (await fetch(TG_API + 'getFile?file_id=' + fid)).json();
            if (!g.ok) throw new Error('too big');
            const f = await fetch('https://api.telegram.org/file/bot' + TG_TOKEN + '/' + g.result.file_path);
            const blob = await f.blob();
            m.media.size = blob.size;
            await dbPut('blobs', new Blob([blob], { type }), id);
        } catch (e) { m.media.failed = true; }
    }
    if (!m.text && !m.media) return;
    addMsg(m);
    if (curChat === 'tg' && !document.hidden) { m.read = true; saveMsg(m); }
    redraw(); renderList();
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
    set('rdCallEnd', 'phone', 28); set('rdInReject', 'phone', 28); set('rdInAccept', 'phone', 28);
    set('rdViewerX', 'x', 24);
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
    $('rdChatList').addEventListener('click', e => { const it = e.target.closest('[data-chat]'); if (it) openChat(it.dataset.chat); });

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
    $('rdCallMute').addEventListener('click', toggleMute);
    $('rdCallCam').addEventListener('click', toggleCam);
    $('rdInAccept').addEventListener('click', acceptCall);
    $('rdInReject').addEventListener('click', rejectCall);
    $('rdViewerX').addEventListener('click', goBack);

    // page / network events
    window.addEventListener('online', () => { if (!appOpen) return; fetchPending(); flushAll(); touchLastSeen(); tgPoll(); });
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
