import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {getFirestore,doc,getDoc,setDoc,addDoc,collection,serverTimestamp,arrayUnion,arrayRemove,getDocs} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const app=initializeApp({
  apiKey:"AIzaSyAk3eUzXSS6MIm_UAfY-VYE0bQnK36771w",
  authDomain:"ilmusli.firebaseapp.com",
  projectId:"ilmusli",
  storageBucket:"ilmusli.firebasestorage.app",
  messagingSenderId:"107954044527",
  appId:"1:107954044527:web:f0c4ae170ca492da31979a"
});
const auth=getAuth(app);
const db=getFirestore(app);
const $=id=>__el(id);
const lf=__el('lf'),lo=__el('lo');
const msg=t=>{lo.style.display='block';lo.textContent=t};
lf.onsubmit=async e=>{
  e.preventDefault();
  const f=lf.elements;
  try{
    if(window.reg){
      const c=await createUserWithEmailAndPassword(auth,f.e.value,f.p.value);
      if(f.n.value) await updateProfile(c.user,{displayName:f.n.value});
      window.user=f.n.value||f.e.value.split('@')[0];hd();
      try{await setDoc(doc(db,'users',c.user.uid),{name:window.user,createdAt:serverTimestamp()},{merge:true})}catch(x){}
      if(window.reg)__el('lm').click();
    }else{
      await signInWithEmailAndPassword(auth,f.e.value,f.p.value);
    }
    lf.reset();lo.style.display='none';location.hash='profile';
    if(window.renderProfile)window.renderProfile();
  }catch(err){
    msg(({
      'auth/invalid-credential':'Wrong email or password.',
      'auth/email-already-in-use':'This email is already registered.',
      'auth/weak-password':'Password must be at least 6 characters.',
      'auth/invalid-email':'Invalid email address.',
      'auth/too-many-requests':'Too many attempts. Try again later.'
    })[err.code]||err.message);
  }
};
window.authReady=false;
onAuthStateChanged(auth,u=>{
  window.user=u?(u.displayName||u.email.split('@')[0]):'';
  try{localStorage.setItem('ilm-user',window.user)}catch(x){}
  window.authReady=true;
  if(u){if(window.loadUD)window.loadUD(u)}else{window.ud={};window.wish=[]}
  hd();route();
});
const mk=x=>'data:image/svg+xml,'+encodeURIComponent(x);
const DEF=mk("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='#d6d6d6'/><circle cx='50' cy='40' r='17' fill='#fff'/><circle cx='50' cy='98' r='36' fill='#fff'/></svg>");
let photo='',av='default';
window.ud={};window.wish=[];window.pTab='col';
const STEPS=['Pending','Confirmed','Shipped','Delivered'];
const ADMINS=['spiderleil@gmail.com'];
window.isAdmin=()=>{const u=auth.currentUser;return !!u&&ADMINS.indexOf((u.email||'').toLowerCase())>=0};
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pm=(t,bad)=>{const o=$('pm');o.textContent=t||'';o.classList.toggle('err',!!bad)};
const ps=(t,bad)=>{const o=$('ps');o.style.display='block';o.textContent=t;o.classList.toggle('bad',!!bad)};
$('atd').src=DEF;
const setAv=()=>{
  if(av==='photo'&&!photo)av='default';
  const ltr=(($('dn').textContent||(auth.currentUser&&auth.currentUser.email)||'?')[0]||'?').toUpperCase();
  const src=av==='photo'?photo:av==='default'?DEF:'';
  const i=$('avimg');i.style.display=src?'block':'none';if(src)i.src=src;
  $('avi').textContent=src?'':ltr;
  $('at-l').textContent=ltr;
  $('atp').style.display=photo?'block':'none';if(photo)$('atp').src=photo;
  $('atx').style.display=photo?'none':'block';
  document.querySelectorAll('#avp .avr').forEach(b=>b.classList.toggle('on',b.dataset.a===av));
};
const showTab=t=>{
  window.pTab=t;
  document.querySelectorAll('#ptabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));
  ['col','ord','wl'].forEach(k=>{$('t'+k).style.display=k===t?'block':'none'});
};
const gridOf=(gid,eid,ids,msg)=>{
  const g=$(gid),e=$(eid);ids=ids.filter(i=>P[i]);
  if(ids.length){fill(g,ids);g.style.display='';e.style.display='none'}
  else{g.innerHTML='';g.style.display='none';e.textContent=msg;e.style.display='block'}
};
const renderLists=()=>{
  const d=window.ud||{},os=(d.orders||[]).slice().sort((a,b)=>b.createdAt-a.createdAt),owned=[];
  os.forEach(o=>o.items.forEach(i=>{if(owned.indexOf(i.id)<0)owned.push(i.id)}));
  gridOf('pcol','pce',owned,'Pieces you order will collect here.');
  gridOf('pwl','pwe',window.wish||[],'Tap ADD TO WISHLIST on any piece to keep it here.');
  $('tord').innerHTML=os.length?os.map(o=>'<div class="ord"><div class="ordh"><span>'+esc(o.id)+'</span><span>'+esc(o.status).toUpperCase()+'</span></div><div class="trk">'+STEPS.map((x,i)=>'<i class="'+(i<=STEPS.indexOf(o.status)?'on':'')+'">'+x.toUpperCase()+'</i>').join('')+'</div><div class="ordl">'+o.items.map(i=>esc(i.q)+' \u00d7 '+esc(i.name)+' \u00b7 '+esc(i.color)+' \u00b7 '+esc(i.size)).join('<br>')+'</div><div class="ordt"><span>'+new Date(o.createdAt).toLocaleDateString('en-GB')+'</span><b>'+F(o.total)+'</b></div></div>').join(''):'<div class="emp">No orders yet.</div>';
};
const fillView=u=>{
  const d=window.ud||{};
  $('dn').textContent=d.name||u.displayName||u.email.split('@')[0];
  $('pe').textContent=u.email;
  if(!$('de').value)$('de').value=u.email||'';
  $('s-h').innerHTML=d.height?esc(d.height)+'<small>cm</small>':'\u2014';
  $('s-w').innerHTML=d.weight?esc(d.weight)+'<small>kg</small>':'\u2014';
  $('s-s').textContent=d.size||'\u2014';
  $('s-p').textContent=d.pants||'\u2014';
  $('da').textContent=d.address||'No address yet';
  photo=d.photo||'';
  av=d.avatar||(photo?'photo':'default');
  if(av!=='letter'&&av!=='photo')av='default';
  setAv();renderLists();showTab(window.pTab||'col');$('padm').style.display=window.isAdmin()?'':'none';
};
window.loadUD=async u=>{
  try{const sn=await getDoc(doc(db,'users',u.uid));window.ud=sn.exists()?sn.data():{}}catch(x){window.ud={}}
  window.wish=window.ud.wish||[];
  try{if(/^#p-/.test(location.hash))draw()}catch(x){}
};
window.renderProfile=async()=>{
  const u=auth.currentUser;if(!u)return;
  fillView(u);$('ps').style.display='none';$('avp').classList.remove('open');pm('');
  await window.loadUD(u);
  if(auth.currentUser!==u)return;
  fillView(u);
};
const tg=e=>{e.stopPropagation();$('avp').classList.toggle('open')};
$('avc').onclick=tg;$('pen').onclick=tg;
document.addEventListener('click',e=>{if(!e.target.closest('.avw'))$('avp').classList.remove('open')});
const saveAv=async()=>{
  const u=auth.currentUser;if(!u)return;
  try{
    await setDoc(doc(db,'users',u.uid),{avatar:av,photo:photo},{merge:true});
    window.ud=Object.assign({},window.ud,{avatar:av,photo:photo});pm('');
  }catch(err){pm('Could not save: '+(err.code||err.message),1)}
};
$('avp').onclick=e=>{
  const b=e.target.closest('.avr');if(!b)return;const a=b.dataset.a;
  $('avp').classList.remove('open');
  if(a==='photo'){$('pp').click();return}
  av=a;setAv();saveAv();
};
$('pp').onchange=e=>{
  const f=e.target.files[0];if(!f)return;
  const img=new Image(),url=URL.createObjectURL(f);
  img.onload=()=>{
    const n=256,c=document.createElement('canvas');c.width=c.height=n;
    const m=Math.min(img.width,img.height);
    c.getContext('2d').drawImage(img,(img.width-m)/2,(img.height-m)/2,m,m,0,0,n,n);
    photo=c.toDataURL('image/jpeg',.8);av='photo';URL.revokeObjectURL(url);setAv();saveAv();
  };
  img.onerror=()=>pm('Could not read this image.',1);
  img.src=url;e.target.value='';
};
$('ptabs').onclick=e=>{const b=e.target.closest('button');if(b)showTab(b.dataset.t)};
$('pedit').onclick=()=>{
  const f=$('pf'),d=window.ud||{};
  if(f.classList.contains('open')){f.classList.remove('open');return}
  $('pnm').value=d.name||$('dn').textContent;$('psz').value=d.size||'';$('ppt').value=d.pants||'';
  $('pht').value=d.height||'';$('pwt').value=d.weight||'';$('pad').value=d.address||'';
  $('ps').style.display='none';f.classList.add('open');
};
$('pcx').onclick=()=>$('pf').classList.remove('open');
$('pf').onsubmit=async e=>{
  e.preventDefault();
  const u=auth.currentUser;if(!u)return;
  const b=$('psb');b.disabled=true;
  const data={name:$('pnm').value.trim(),size:$('psz').value,pants:$('ppt').value,height:$('pht').value?Number($('pht').value):null,weight:$('pwt').value?Number($('pwt').value):null,address:$('pad').value.trim()};
  try{
    if(data.name&&data.name!==u.displayName)await updateProfile(u,{displayName:data.name});
    await setDoc(doc(db,'users',u.uid),Object.assign({updatedAt:serverTimestamp()},data),{merge:true});
    window.ud=Object.assign({},window.ud,data);
    window.user=data.name||u.email.split('@')[0];hd();
    fillView(u);$('pf').classList.remove('open');pm('Saved.');
  }catch(err){ps('Could not save: '+(err.code||err.message),1)}
  b.disabled=false;
};
window.toggleWish=async id=>{
  const u=auth.currentUser;if(!u){location.hash='login';return}
  const had=(window.wish||[]).indexOf(id)>=0,prev=window.wish||[];
  window.wish=had?prev.filter(x=>x!==id):prev.concat(id);
  draw();
  try{await setDoc(doc(db,'users',u.uid),{wish:had?arrayRemove(id):arrayUnion(id)},{merge:true});window.ud=Object.assign({},window.ud,{wish:window.wish})}
  catch(err){window.wish=prev;draw()}
};
window.placeOrder=async()=>{
  const u=auth.currentUser,items0=window.cart||[];
  if(!u||!items0.length)return false;
  let total=0;
  const items=items0.map(c=>{const p=P[c.id],pr=sale(c.id);total+=pr*c.q;return{id:c.id,name:p[0],color:p[3][c.c],size:p[4][c.s],q:c.q,price:pr}});
  const disc=window.code?Math.round(total*(window.pct||0)/100):0,ship=window.free?0:(SHIP[window.gov]||0);
  const order={id:'ILM-'+Date.now().toString(36).toUpperCase(),createdAt:Date.now(),status:'Pending',items:items,sub:total,discount:disc,shipping:ship,gov:window.gov,code:window.code||'',payment:'Cash on delivery',total:total-disc+ship,address:(window.ud&&window.ud.address)||''};
  try{await setDoc(doc(db,'users',u.uid),{orders:arrayUnion(order)},{merge:true})}catch(err){return false}
  try{await addDoc(collection(db,'orders'),Object.assign({uid:u.uid,email:u.email},order))}catch(x){}
  window.ud=Object.assign({},window.ud,{orders:((window.ud&&window.ud.orders)||[]).concat([order])});
  if(window.free){try{await setDoc(doc(db,'subscribers',window.code),{used:true,usedAt:Date.now()},{merge:true})}catch(x){}}
  window.cart=[];window.code='';window.pct=0;window.free=0;save();window.pTab='ord';location.hash='profile';
  return true;
};

window.renderAdmin=async()=>{
  const A=$('adm');A.innerHTML='<div class="emp">Loading...</div>';
  try{
    const r=await Promise.all(['orders','messages','subscribers'].map(n=>getDocs(collection(db,n))));
    const L=x=>x.docs.map(d=>Object.assign({_id:d.id},d.data()));
    const os=L(r[0]).sort((a,b)=>b.createdAt-a.createdAt),ms=L(r[1]),ss=L(r[2]);
    A.innerHTML='<h3 class="fh">ORDERS ('+os.length+')</h3>'+(os.map(o=>'<div class="ord"><div class="ordh"><span>'+esc(o.id)+'</span><span>'+esc(o.email)+'</span></div><div class="ordl">'+o.items.map(i=>esc(i.q)+' \u00d7 '+esc(i.name)+' \u00b7 '+esc(i.color)+' \u00b7 '+esc(i.size)).join('<br>')+'<br><span style="color:var(--muted)">'+esc(o.gov||'')+' \u00b7 '+esc(o.address||'')+'</span></div><div class="ordt"><select data-oid="'+o._id+'" data-uid="'+esc(o.uid)+'" data-id="'+esc(o.id)+'">'+STEPS.map(x=>'<option'+(x===o.status?' selected':'')+'>'+x+'</option>').join('')+'</select><b>'+F(o.total)+'</b></div></div>').join('')||'<div class="emp">No orders yet.</div>')+'<h3 class="fh">MESSAGES ('+ms.length+')</h3>'+ms.map(x=>'<div class="ord"><div class="ordh"><span>'+esc(x.name)+'</span><span>'+esc(x.email)+'</span></div><div class="ordl">'+esc(x.message)+'</div></div>').join('')+'<h3 class="fh">SUBSCRIBERS ('+ss.length+')</h3><div class="ordl">'+ss.map(x=>esc(x.email)+' \u00b7 '+esc(x.code||'')+(x.used?' (used)':'')).join('<br>')+'</div>';
  }catch(err){A.innerHTML='<div class="emp">Could not load: '+esc(err.code||err.message)+'</div>'}
};
$('adm').onchange=async e=>{
  const t=e.target;if(!t.dataset.oid)return;
  try{
    await setDoc(doc(db,'orders',t.dataset.oid),{status:t.value},{merge:true});
    const sn=await getDoc(doc(db,'users',t.dataset.uid));
    const arr=((sn.exists()&&sn.data().orders)||[]).map(x=>x.id===t.dataset.id?Object.assign({},x,{status:t.value}):x);
    await setDoc(doc(db,'users',t.dataset.uid),{orders:arr},{merge:true});
    t.style.outline='';
  }catch(err){t.style.outline='2px solid #c62828';t.title=err.code||err.message}
};
$('df').onsubmit=async e=>{
  e.preventDefault();const m=$('dm'),em=$('de').value.trim();
  const r=new Uint8Array(6);crypto.getRandomValues(r);
  const code='OPEN-'+Array.from(r,x=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[x%32]).join('');
  try{await setDoc(doc(db,'subscribers',code),{email:em,code:code,used:false,createdAt:serverTimestamp()});
    m.innerHTML='You are on the list. Your code: <b>'+code+'</b><br>20% off + free delivery. Enter it in your cart.';e.target.reset()}
  catch(err){m.textContent='Could not subscribe: '+(err.code||err.message)}
};
window.checkSub=async c=>{try{const sn=await getDoc(doc(db,'subscribers',c));return sn.exists()&&sn.data().used===false}catch(x){return false}};
$('lout').onclick=async()=>{await signOut(auth);location.hash='home'};
$('cf').onsubmit=async e=>{
  e.preventDefault();
  const fm=e.target,g=n=>fm.elements.namedItem(n).value.trim(),b=fm.querySelector('button[type=submit]'),o=$('ok');
  b.disabled=true;
  try{
    await addDoc(collection(db,'messages'),{name:g('name'),email:g('email'),message:g('message'),createdAt:serverTimestamp()});
    o.textContent='Message sent. We will reply by email.';o.classList.remove('bad');o.style.display='block';fm.reset();
  }catch(err){o.textContent='Could not send: '+(err.code||err.message);o.classList.add('bad');o.style.display='block'}
  b.disabled=false;
};
