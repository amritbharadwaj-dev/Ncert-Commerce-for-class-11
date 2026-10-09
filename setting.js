// Commerce Hub Settings + private chat. Existing theme functions are preserved below.
const SUPABASE_URL = 'https://dvbbcfntfzkvepzertte.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_skOK2qGKqEnP9-6qpNC5nA_crr-FZR3';
const MSG_TABLE = 'private_messages';
const SIGNAL_TABLE = 'call_signals';
const MEDIA_BUCKET = 'private-chat-media';
const CHAT_LOCAL_KEY = 'ch11_chat_messages_v2';
const PROFILE_KEY = 'ch11_chat_profile_v2';
const PEER_KEY = 'ch11_chat_peer_v2';
let supabaseClient = null, authUser = null, activeProfile = localStorage.getItem(PROFILE_KEY) || '';
let presenceChannel = null, remoteTypingTimer = null, localTypingTimer = null;
let peerId = localStorage.getItem(PEER_KEY) || '', channel = null, signalChannel = null;
let activeCall = null, localStream = null, remoteStream = null, callMuted = false, pendingIce = [];
let messageFetchBusy = false;
let selectedMessageId = null, editingId = null, replyToId = null;
const $ = id => document.getElementById(id);
const uuid = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const localMessages = () => { try { return JSON.parse(localStorage.getItem(CHAT_LOCAL_KEY) || '[]'); } catch { return []; } };
const saveLocalMessages = rows => { try { localStorage.setItem(CHAT_LOCAL_KEY, JSON.stringify(rows)); } catch { alert('Local storage is full. Remove large attachments or clear some chat history.'); } };
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function openOverlay(el) { el.classList.add('active'); el.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeOverlay(el) { el.classList.remove('active'); el.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
function openChat() { openOverlay($('chatPage')); updateChatHeader(); renderMessages(); markReceivedSeen(); }
async function markReceivedSeen() {
  if(!supabaseClient||!authUser||!navigator.onLine)return;
  try { await supabaseClient.from(MSG_TABLE).update({delivered_at:new Date().toISOString(),seen_at:new Date().toISOString()}).eq('recipient_id',authUser.id).is('seen_at',null); } catch {}
}
function updateChatHeader() {
  if (!$('chatTitle')) return;
  $('profileChooser').style.display = activeProfile ? 'none' : 'block';
  $('chatTitle').textContent = activeProfile ? (activeProfile === 'Radhe' ? 'Amrit' : 'Radhe') : 'Private chat';
  $('chatAvatar').textContent = activeProfile === 'Radhe' ? 'A' : activeProfile === 'Amrit' ? 'R' : 'A';
  const connected = !!(authUser && peerId && navigator.onLine && supabaseClient);
  const pstate=presenceChannel?.presenceState?.()||{};
  const peerOnline=!!peerId && Object.keys(pstate).some(id=>id!==authUser?.id && (pstate[id]||[]).length>0);
  $('chatPresence').textContent = !navigator.onLine ? 'offline' : peerOnline ? 'online' : connected ? 'Ready to chat' : authUser ? 'Waiting for connection' : 'Starting…';
  $('connectionNotice').textContent = !navigator.onLine ? 'Offline: messages stay on this device and will queue for sync when back online.' :
    !peerId ? 'Choose your profile, then use ⋮ → Connect device and exchange device IDs to enable private sync.' :
    'Messages are saved locally first. Supabase sync is attempted while online.';
}
function renderMessages() {
  const box = $('messageList'); if (!box) return;
  const rows = localMessages().filter(m => !m.deletedForMe);
  box.innerHTML = rows.map(m => {
    const mine = m.sender === activeProfile;
    let body = m.kind === 'image' ? `<img src="${escapeHtml(m.dataUrl || m.signedUrl || '')}" alt="Image attachment">` :
      m.kind === 'video' ? `<video src="${escapeHtml(m.dataUrl || m.signedUrl || '')}" controls playsinline></video>` : escapeHtml(m.text);
    const quote = m.replyText ? `<div class="reply-quote">${escapeHtml(m.replyText)}</div>` : '';
    return `<article class="bubble ${mine?'mine':''}" data-message-id="${escapeHtml(m.id)}" tabindex="0">${quote}${body}${m.reaction?`<span>${escapeHtml(m.reaction)}</span>`:''}<div class="meta"><span>${m.edited?'edited · ':''}${new Date(m.createdAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span><span class="ticks ${m.seen?'seen':''}">${mine?(m.seen?'✓✓':m.delivered?'✓✓':'✓'):''}</span></div></article>`;
  }).join('');
  box.scrollTop = box.scrollHeight;
}
function mergeMessage(message) {
  const rows = localMessages(); const index = rows.findIndex(x => x.id === message.id);
  if (index >= 0) rows[index] = {...rows[index], ...message}; else rows.push(message);
  rows.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt)); saveLocalMessages(rows); renderMessages();
}
async function initBackend() {
  if (!navigator.onLine || !window.supabase?.createClient) return;
  try {
    if (!supabaseClient) supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    });
    let {data:{session}} = await supabaseClient.auth.getSession();
    if (!session) {
      const result = await supabaseClient.auth.signInAnonymously();
      if (result.error) throw result.error;
      session = result.data.session;
    }
    authUser = session?.user || null;
    if (authUser) {
      $('myPeerId').value = authUser.id;
      subscribeMessages();
      subscribeSignals();
      initPresenceChannel();
      if(peerId) await syncQueuedMessages(); else await loadRemoteHistory();
    }
    updateChatHeader();
  } catch (error) {
    console.warn('Backend not configured or unavailable:', error.message);
    if ($('chatPresence')) $('chatPresence').textContent = navigator.onLine ? 'Local mode' : 'offline';
  }
}
function mapServerMessage(row, signedUrl='') {
  return {
    id: row.id, serverId: row.id,
    sender: row.sender_name,
    recipient: row.sender_id === authUser?.id ? (activeProfile === 'Radhe' ? 'Amrit' : 'Radhe') : activeProfile,
    text: row.body || '', kind: row.kind || 'text',
    storagePath: row.storage_path || null, signedUrl: signedUrl || '',
    createdAt: row.created_at, delivered: !!row.delivered_at,
    seen: !!row.seen_at, edited: !!row.edited,
    reaction: row.reaction || '', replyText: row.reply_text || '',
    deletedForMe: false
  };
}
async function signedMediaUrl(path) {
  if (!path || !supabaseClient) return '';
  const {data,error}=await supabaseClient.storage.from(MEDIA_BUCKET).createSignedUrl(path, 3600);
  if (error) { console.warn('Could not open attachment:',error.message); return ''; }
  return data?.signedUrl || '';
}
async function hydrateServerMessage(row) {
  const url = row.storage_path ? await signedMediaUrl(row.storage_path) : '';
  mergeMessage(mapServerMessage(row,url));
}
async function loadRemoteHistory() {
  if (!supabaseClient || !authUser || messageFetchBusy || !navigator.onLine) return;
  messageFetchBusy=true;
  try {
    const {data,error}=await supabaseClient.from(MSG_TABLE).select('*').order('created_at',{ascending:true}).limit(500);
    if (error) throw error;
    for (const row of (data||[])) await hydrateServerMessage(row);
    // Mark received messages as delivered; when the chat is open, mark them seen too.
    const received=(data||[]).filter(r=>r.recipient_id===authUser.id && !r.seen_at);
    for (const row of received) {
      const patch={delivered_at:row.delivered_at || new Date().toISOString()};
      if ($('chatPage')?.classList.contains('active')) patch.seen_at=new Date().toISOString();
      await supabaseClient.from(MSG_TABLE).update(patch).eq('id',row.id);
    }
  } catch(e) { console.warn('History sync unavailable:',e.message); }
  finally { messageFetchBusy=false; }
}
function subscribeMessages() {
  if (!supabaseClient || !authUser) return;
  if (channel) supabaseClient.removeChannel(channel);
  channel = supabaseClient.channel(`messages-${authUser.id}`)
    .on('postgres_changes',{event:'INSERT',schema:'public',table:MSG_TABLE,filter:`recipient_id=eq.${authUser.id}`},async payload=>{
      const row=payload.new;
      await hydrateServerMessage(row);
      const patch={delivered_at:row.delivered_at || new Date().toISOString()};
      if ($('chatPage')?.classList.contains('active')) patch.seen_at=new Date().toISOString();
      await supabaseClient.from(MSG_TABLE).update(patch).eq('id',row.id);
    })
    .on('postgres_changes',{event:'UPDATE',schema:'public',table:MSG_TABLE,filter:`sender_id=eq.${authUser.id}`},async payload=>{
      const row=payload.new, url=row.storage_path?await signedMediaUrl(row.storage_path):'';
      const rows=localMessages().map(m=>m.serverId===row.id?{...m, text:row.body||'', reaction:row.reaction||'', edited:!!row.edited, delivered:!!row.delivered_at, seen:!!row.seen_at, signedUrl:url}:m);
      saveLocalMessages(rows);renderMessages();
    })
    .on('postgres_changes',{event:'UPDATE',schema:'public',table:MSG_TABLE,filter:`recipient_id=eq.${authUser.id}`},async payload=>{
      const row=payload.new, url=row.storage_path?await signedMediaUrl(row.storage_path):'';
      const rows=localMessages().map(m=>m.serverId===row.id?{...m, text:row.body||'', reaction:row.reaction||'', edited:!!row.edited, delivered:!!row.delivered_at, seen:!!row.seen_at, signedUrl:url}:m);
      saveLocalMessages(rows);renderMessages();
    }).subscribe();
}
function initPresenceChannel() {
  if (!supabaseClient || !authUser) return;
  if (presenceChannel) supabaseClient.removeChannel(presenceChannel);
  const pairKey=[authUser.id,peerId||'unpaired'].sort().join('-');
  presenceChannel=supabaseClient.channel(`private-presence-${pairKey}`,{config:{presence:{key:authUser.id},broadcast:{self:false}}})
    .on('presence',{event:'sync'},()=>{
      const state=presenceChannel.presenceState();
      const otherOnline=Object.keys(state).some(id=>id!==authUser.id && (state[id]||[]).length>0);
      if ($('chatPresence') && !remoteTypingTimer) $('chatPresence').textContent=otherOnline?'online':(navigator.onLine?'offline':'offline');
    })
    .on('broadcast',{event:'typing'},payload=>{
      if (!$('chatPresence')) return;
      if (payload.payload?.typing) {
        $('chatPresence').textContent='typing…';
        if (remoteTypingTimer) clearTimeout(remoteTypingTimer);
        remoteTypingTimer=setTimeout(()=>{remoteTypingTimer=null;updateChatHeader();},1800);
      } else if (remoteTypingTimer) {
        clearTimeout(remoteTypingTimer);remoteTypingTimer=null;updateChatHeader();
      }
    })
    .subscribe(async status=>{
      if(status==='SUBSCRIBED') {
        try { await presenceChannel.track({name:activeProfile||'Guest',online_at:new Date().toISOString()}); } catch {}
      }
    });
}
function broadcastTyping(typing) {
  if (!presenceChannel || !authUser) return;
  presenceChannel.send({type:'broadcast',event:'typing',payload:{name:activeProfile,typing:!!typing}}).catch(()=>{});
}
function subscribeSignals() {
  if (!supabaseClient || !authUser) return;
  if (signalChannel) supabaseClient.removeChannel(signalChannel);
  signalChannel=supabaseClient.channel(`signals-${authUser.id}`)
    .on('postgres_changes',{event:'INSERT',schema:'public',table:SIGNAL_TABLE,filter:`recipient_id=eq.${authUser.id}`},payload=>handleSignal(payload.new))
    .subscribe();
}
async function syncQueuedMessages() {
  if (!supabaseClient || !authUser || !peerId || !navigator.onLine) return;
  const pending=localMessages().filter(m=>m.sender===activeProfile&&!m.serverId&&!m.deletedForMe&&((m.kind==='text'&&m.text)||m.dataUrl));
  for (const m of pending) await sendToServer(m);
  await loadRemoteHistory();
}
async function sendToServer(m) {
  if (!supabaseClient || !authUser || !peerId || !navigator.onLine || m.serverId) return false;
  let storagePath=null;
  try {
    if (m.dataUrl && (m.kind==='image'||m.kind==='video')) {
      const blob=await (await fetch(m.dataUrl)).blob();
      const ext=(blob.type.split('/')[1]|| (m.kind==='video'?'mp4':'jpg')).replace(/[^a-z0-9]/gi,'').slice(0,8)||'bin';
      storagePath=`${authUser.id}/${peerId}/${m.id}.${ext}`;
      const {error:uploadError}=await supabaseClient.storage.from(MEDIA_BUCKET).upload(storagePath,blob,{contentType:blob.type,upsert:true});
      if(uploadError) throw uploadError;
    }
    const {data,error}=await supabaseClient.from(MSG_TABLE).insert({
      sender_id:authUser.id,recipient_id:peerId,sender_name:activeProfile,body:m.text||'',kind:m.kind||'text',storage_path:storagePath,reply_text:m.replyText||'',reaction:m.reaction||'',created_at:m.createdAt
    }).select('*').single();
    if(error) throw error;
    const url=storagePath?await signedMediaUrl(storagePath):'';
    const rows=localMessages().map(x=>x.id===m.id?{...x,serverId:data.id,storagePath,signedUrl:url}:x);saveLocalMessages(rows);renderMessages();return true;
  } catch(error) { console.warn('Message remains queued locally:',error.message); return false; }
}
async function updateServerMessage(m, patch) {
  if (!supabaseClient || !authUser || !m?.serverId || !navigator.onLine) return;
  const safe={};
  for (const k of ['body','reaction','edited']) if (k in patch) safe[k]=patch[k];
  let query=supabaseClient.from(MSG_TABLE).update(safe).eq('id',m.serverId);
  if ('body' in safe || 'edited' in safe) query=query.eq('sender_id',authUser.id);
  const {error}=await query;
  if(error) console.warn('Message update stayed local:',error.message);
}
async function sendMessage(text, attachment=null, replyText='') {
  if (!activeProfile) { alert('Please choose who you are first.'); return; }
  const m={id:uuid(),sender:activeProfile,recipient:activeProfile==='Radhe'?'Amrit':'Radhe',text:text||'',kind:attachment?.kind||'text',dataUrl:attachment?.dataUrl||null,createdAt:new Date().toISOString(),delivered:false,seen:false,edited:false,replyText};
  mergeMessage(m);
  if ((m.kind==='text' && m.text) || m.dataUrl) await sendToServer(m);
}
function openActions(id) { selectedMessageId=id; $('actionSheet').hidden=false; }
function closeActions() { $('actionSheet').hidden=true; selectedMessageId=null; }
async function startCall(video) {
  if (!activeProfile) return alert('Choose your profile first.');
  if (!navigator.onLine || !peerId || !authUser || !supabaseClient) return alert(`${activeProfile} tried to call you, but you are offline or not connected.`);
  try {
    localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:!!video});
    remoteStream=new MediaStream(); $('localVideo').srcObject=localStream; $('remoteVideo').srcObject=remoteStream;
    pendingIce=[];activeCall=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});
    localStream.getTracks().forEach(track=>activeCall.addTrack(track,localStream));
    activeCall.ontrack=e=>e.streams[0].getTracks().forEach(t=>remoteStream.addTrack(t));
    activeCall.onicecandidate=e=>{if(e.candidate) sendSignal('ice',{candidate:e.candidate.toJSON()});};
    const offer=await activeCall.createOffer();await activeCall.setLocalDescription(offer);
    await sendSignal('offer',{sdp:offer.sdp,video:!!video});
    $('callPanel').hidden=false;
  } catch(e) { endCall(); alert('Call could not start: '+e.message); }
}
async function sendSignal(type,payload) {
  if(!supabaseClient||!authUser||!peerId)return;
  const {error}=await supabaseClient.from(SIGNAL_TABLE).insert({sender_id:authUser.id,recipient_id:peerId,signal_type:type,payload});
  if(error) console.warn('Call signaling failed:',error.message);
}
async function handleSignal(signal) {
  if(!supabaseClient||!authUser)return;
  // Ignore signaling from an unexpected peer.
  if(peerId && signal.sender_id!==peerId)return;
  try {
    if(signal.signal_type==='offer') {
      if(!activeProfile)return;
      if(!activeCall && !confirm(`${activeProfile==='Radhe'?'Amrit':'Radhe'} is calling. Accept ${signal.payload.video?'video':'audio'} call?`)){await sendSignal('hangup',{});return;}
      if(!activeCall) {
        localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:!!signal.payload.video});
        remoteStream=new MediaStream();$('localVideo').srcObject=localStream;$('remoteVideo').srcObject=remoteStream;
        activeCall=new RTCPeerConnection({iceServers:[{urls:'stun:stun.l.google.com:19302'}]});
        localStream.getTracks().forEach(t=>activeCall.addTrack(t,localStream));
        activeCall.ontrack=e=>e.streams[0].getTracks().forEach(t=>remoteStream.addTrack(t));
        activeCall.onicecandidate=e=>{if(e.candidate)sendSignal('ice',{candidate:e.candidate.toJSON()});};
      }
      await activeCall.setRemoteDescription({type:'offer',sdp:signal.payload.sdp});
      for(const candidate of pendingIce.splice(0)) { try { await activeCall.addIceCandidate(candidate); } catch {} }
      const answer=await activeCall.createAnswer();await activeCall.setLocalDescription(answer);await sendSignal('answer',{sdp:answer.sdp});$('callPanel').hidden=false;
    } else if(signal.signal_type==='answer' && activeCall) {
      await activeCall.setRemoteDescription({type:'answer',sdp:signal.payload.sdp});
      for(const candidate of pendingIce.splice(0)) { try { await activeCall.addIceCandidate(candidate); } catch {} }
    } else if(signal.signal_type==='ice' && signal.payload.candidate) {
      if(activeCall?.remoteDescription) await activeCall.addIceCandidate(signal.payload.candidate); else pendingIce.push(signal.payload.candidate);
    } else if(signal.signal_type==='hangup') endCall();
  } catch(e) { console.warn('Call signal processing failed:',e); }
}
function endCall() {
  if(activeCall) { try { activeCall.close(); } catch {} activeCall=null; }
  if(localStream) { localStream.getTracks().forEach(t=>t.stop());localStream=null; }
  remoteStream=null;if($('localVideo'))$('localVideo').srcObject=null;if($('remoteVideo'))$('remoteVideo').srcObject=null;
  if($('callPanel'))$('callPanel').hidden=true;
}
document.addEventListener('DOMContentLoaded',()=>{
  if(typeof lucide!=='undefined')lucide.createIcons();
  loadCurrentThemeState();
  const lib=document.createElement('script');lib.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';lib.onload=initBackend;document.head.appendChild(lib);
  $('openContact')?.addEventListener('click',()=>openOverlay($('contactPage')));
  $('closeContact')?.addEventListener('click',()=>closeOverlay($('contactPage')));
  $('contactForm')?.addEventListener('submit',e=>{
    e.preventDefault();const form=e.currentTarget,data=new FormData(form);
    if(String(data.get('subject')||'').trim().toLowerCase()==='ramdiri'){form.reset();$('contactStatus').textContent='';closeOverlay($('contactPage'));openChat();return;}
    const values=[...data.values()].map(v=>String(v).trim());
    if(!values.some(Boolean)){ $('contactStatus').textContent='Please write something before sending.';return; }
    $('contactStatus').textContent='This personal build does not send support tickets. To open the private Radhe–Amrit chat, enter ramdiri in Subject.';
  });
  $('chatBack')?.addEventListener('click',()=>{broadcastTyping(false);closeOverlay($('chatPage'));});
  document.querySelectorAll('[data-profile]').forEach(b=>b.addEventListener('click',()=>{activeProfile=b.dataset.profile;localStorage.setItem(PROFILE_KEY,activeProfile);updateChatHeader();renderMessages();if(peerId)syncQueuedMessages();}));
  $('sendMessage')?.addEventListener('click',async()=>{
    const text=$('chatInput').value.trim();if(!text)return;
    if(editingId){const target=localMessages().find(m=>m.id===editingId);const rows=localMessages().map(m=>m.id===editingId?{...m,text,edited:true}:m);saveLocalMessages(rows);if(target)updateServerMessage(target,{body:text,edited:true});editingId=null;renderMessages();$('chatInput').value='';$('chatInput').placeholder='Message';return;}
    const quote=replyToId?localMessages().find(m=>m.id===replyToId)?.text||'Message':'';replyToId=null;
    $('chatInput').value='';$('chatInput').style.height='auto';await sendMessage(text,null,quote);
  });
  $('chatInput')?.addEventListener('input',e=>{e.target.style.height='auto';e.target.style.height=Math.min(e.target.scrollHeight,130)+'px';broadcastTyping(true);clearTimeout(localTypingTimer);localTypingTimer=setTimeout(()=>{broadcastTyping(false);localTypingTimer=null;},900);});
  $('chatInput')?.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();$('sendMessage').click();}});
  $('messageList')?.addEventListener('click',e=>{const b=e.target.closest('[data-message-id]');if(b)openActions(b.dataset.messageId);});
  $('reactionChoices').innerHTML=['❤️','😃','😠','😢','😔','😂','👍'].map(x=>`<span role="button" tabindex="0" data-emoji="${x}">${x}</span>`).join('');
  $('reactionChoices')?.addEventListener('click',e=>{const emoji=e.target.closest('[data-emoji]')?.dataset.emoji;if(!emoji||!selectedMessageId)return;const target=localMessages().find(m=>m.id===selectedMessageId);saveLocalMessages(localMessages().map(m=>m.id===selectedMessageId?{...m,reaction:emoji}:m));if(target)updateServerMessage(target,{reaction:emoji});closeActions();renderMessages();});
  $('actionSheet')?.addEventListener('click',e=>{
    const action=e.target.dataset.action;if(!action||!selectedMessageId)return;const id=selectedMessageId,rows=localMessages(),m=rows.find(x=>x.id===id);
    if(action==='edit'&&m?.sender===activeProfile&&m.kind==='text'){$('chatInput').value=m.text;editingId=id;$('chatInput').focus();}
    if(action==='reply'){replyToId=id;$('chatInput').placeholder='Reply to message…';$('chatInput').focus();}
    if(action==='delete')saveLocalMessages(rows.map(x=>x.id===id?{...x,deletedForMe:true}:x));
    closeActions();renderMessages();
  });
  $('clearChat')?.addEventListener('click',()=>{if(confirm('Clear this chat on this device?')){saveLocalMessages([]);renderMessages();}});
  $('deleteChat')?.addEventListener('click',()=>{if(confirm('Delete local chat history on this device?')){saveLocalMessages([]);renderMessages();}});
  $('connectPeer')?.addEventListener('click',()=>{if(authUser)$('myPeerId').value=authUser.id;$('peerIdInput').value=peerId;$('peerDialogStatus').textContent='';$('peerDialog').showModal();});
  $('copyPeerId')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText($('myPeerId').value);$('peerDialogStatus').textContent='Device ID copied.';}catch{$('peerDialogStatus').textContent='Copy unavailable; select and copy the ID.';}});
  $('savePeerId')?.addEventListener('click',()=>{const v=$('peerIdInput').value.trim();if(!/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(v)){ $('peerDialogStatus').textContent='Enter a valid Supabase Auth user UUID.';return;}if(v===authUser?.id){$('peerDialogStatus').textContent='Use the other person’s device ID, not your own.';return;}peerId=v;localStorage.setItem(PEER_KEY,v);$('peerDialog').close();updateChatHeader();initPresenceChannel();syncQueuedMessages();});
  $('exportChat')?.addEventListener('click',()=>{const blob=new Blob([JSON.stringify(localMessages(),null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='chat-export.json';a.click();URL.revokeObjectURL(a.href);});
  $('audioCall')?.addEventListener('click',()=>startCall(false));$('videoCall')?.addEventListener('click',()=>startCall(true));
  $('muteCall')?.addEventListener('click',()=>{callMuted=!callMuted;localStream?.getAudioTracks().forEach(t=>t.enabled=!callMuted);$('muteCall').textContent=callMuted?'Unmute':'Mute';});
  $('endCall')?.addEventListener('click',()=>{sendSignal('hangup',{});endCall();});
  $('chatFile')?.addEventListener('change',async e=>{
    const file=e.target.files?.[0];if(!file)return;
    if(file.size>5*1024*1024){alert('Choose a file under 5 MB in this browser-local version.');e.target.value='';return;}
    const dataUrl=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);});
    await sendMessage('',{kind:file.type.startsWith('video/')?'video':'image',dataUrl});e.target.value='';
  });
  window.addEventListener('online',()=>{updateChatHeader();initBackend();});window.addEventListener('offline',updateChatHeader);
});

// Original theme switcher logic.
function setTheme(mode) {
  const htmlEl=document.documentElement;localStorage.setItem('app_theme_mode',mode);
  ['light','dark','auto'].forEach(m=>{const btn=document.getElementById(`btn-${m}`);if(btn)btn.className="ripple-btn py-2.5 px-3 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 transition shadow-xs flex items-center justify-center space-x-1.5";});
  const activeBtn=document.getElementById(`btn-${mode}`);if(activeBtn)activeBtn.className="ripple-btn py-2.5 px-3 rounded-xl text-xs font-bold border border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900 transition shadow-sm flex items-center justify-center space-x-1.5";
  if(mode==='dark'){htmlEl.classList.add('dark');htmlEl.classList.remove('light');}
  else if(mode==='light'){htmlEl.classList.remove('dark');htmlEl.classList.add('light');}
  else if(mode==='auto'){const d=window.matchMedia('(prefers-color-scheme: dark)').matches;htmlEl.classList.toggle('dark',d);htmlEl.classList.toggle('light',!d);}
}
function loadCurrentThemeState(){setTheme(localStorage.getItem('app_theme_mode')||'light');}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(localStorage.getItem('app_theme_mode')==='auto')setTheme('auto');});
