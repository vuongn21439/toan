/* ===== Firebase v13.1.0 (SDK qua CDN gstatic) ===== */
import{initializeApp}from"https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import{getAuth,onAuthStateChanged,signInAnonymously,signInWithPopup,signInWithRedirect,linkWithPopup,linkWithRedirect,signInWithCredential,getRedirectResult,GoogleAuthProvider,signOut}from"https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
import{getFirestore,doc,getDoc,updateDoc,runTransaction,collection,query,orderBy,limit,getDocs,increment,serverTimestamp}from"https://www.gstatic.com/firebasejs/13.1.0/firebase-firestore.js";
const app=initializeApp({apiKey:"AIzaSyDirdbod5vGM_brfFFTggfLMGSwnOo_8_s",authDomain:"toan-b44f0.firebaseapp.com",projectId:"toan-b44f0",storageBucket:"toan-b44f0.firebasestorage.app",messagingSenderId:"343263091046",appId:"1:343263091046:web:440418ea6d1155a8e090a7"}),
auth=getAuth(app),db=getFirestore(app),UI=window.T6_UI,
gp=()=>new GoogleAuthProvider(),
linked=async u=>{try{await updateDoc(doc(db,'players',u.uid),{guest:false,updatedAt:serverTimestamp()})}catch(e){}UI.linked()};
window.FB={
 /* Google: thử popup, trình duyệt chặn popup thì chuyển sang redirect */
 login:k=>k=='guest'?signInAnonymously(auth):signInWithPopup(auth,gp()).catch(e=>['auth/popup-blocked','auth/operation-not-supported-in-this-environment'].includes(e.code)?signInWithRedirect(auth,gp()):Promise.reject(e)),
 logout:()=>signOut(auth),
 /* Liên kết khách -> Google (popup, bị chặn thì chuyển redirect). Giữ nguyên uid nên không mất dữ liệu. */
 link:async()=>{const u=auth.currentUser;if(!u||!u.isAnonymous)return'';
  try{await linkWithPopup(u,gp())}catch(e){if(['auth/popup-blocked','auth/operation-not-supported-in-this-environment'].includes(e.code)){await linkWithRedirect(u,gp());return'redirect'}throw e}
  await linked(u);return'ok'},
 /* Google đó đã có tài khoản riêng: đăng nhập thẳng vào tài khoản đó (tiến độ khách không gộp được) */
 switchTo:e=>{const c=GoogleAuthProvider.credentialFromError(e);return c?signInWithCredential(auth,c):signInWithPopup(auth,gp())},
 /* Gộp tiến độ (sao, độ chính xác, thử thách ngày, chuỗi ngày) với bản trên server rồi ghi lại — transaction nên 2 máy chơi cùng lúc không đè nhau */
 push:async(uid,p)=>{const r=doc(db,'progress',uid);let m=p;
  await runTransaction(db,async t=>{const s=await t.get(r);m=UI.merge(p,s.exists()?s.data():null);t.set(r,{...m,updatedAt:serverTimestamp()})});
  UI.apply(m)},
 free:async k=>!(await getDoc(doc(db,'names',k))).exists(),
 /* names/{tênChuẩnHoá} giữ chỗ tên; players/{uid} là hồ sơ + điểm. Ghi cùng một transaction. */
 claim:async(name,k)=>{const u=auth.currentUser,pr={uid:u.uid,name,nk:k,guest:u.isAnonymous,xp:0,stars:0,streak:0,updatedAt:serverTimestamp()};
  await runTransaction(db,async t=>{const n=doc(db,'names',k),s=await t.get(n);if(s.exists())throw new Error('taken');t.set(n,{uid:u.uid});t.set(doc(db,'players',u.uid),pr)});
  UI.in({...pr,xp:0})},
 top:async(n=20)=>(await getDocs(query(collection(db,'players'),orderBy('xp','desc'),limit(n)))).docs.map(d=>({id:d.id,...d.data()}))
};
/* Hook game gọi sau mỗi lượt chơi: chỉ cộng dồn XP (increment) thay vì ghi đè tổng, Rules chặn cộng quá 250 XP/lượt */
window.T6_SYNC=d=>{const u=auth.currentUser;if(!u)return;
 if(d.gain>0)updateDoc(doc(db,'players',u.uid),{xp:increment(Math.min(d.gain|0,250)),stars:Math.min(d.stars|0,300),streak:Math.min(d.streak|0,3650),updatedAt:serverTimestamp()}).catch(()=>{});
 if(d.prog)FB.push(u.uid,d.prog).catch(()=>{})};
/* Quay lại từ trang Google (đường redirect): hoàn tất liên kết, hoặc báo nếu Google đó đã có tài khoản riêng */
getRedirectResult(auth).then(r=>{if(r&&r.user&&!r.user.isAnonymous&&r.operationType=='link')return linked(r.user)}).catch(e=>UI.linkErr(e,true));
onAuthStateChanged(auth,async u=>{if(!u)return UI.out();
 try{const[s,g]=await Promise.all([getDoc(doc(db,'players',u.uid)),getDoc(doc(db,'progress',u.uid)).catch(()=>null)]);
  if(!s.exists())return UI.name();
  /* guest lấy theo trạng thái đăng nhập thật; hồ sơ lệch thì sửa lại */
  if(s.data().guest!==u.isAnonymous)updateDoc(doc(db,'players',u.uid),{guest:u.isAnonymous,updatedAt:serverTimestamp()}).catch(()=>{});
  UI.in({...s.data(),uid:u.uid,guest:u.isAnonymous,prog:g&&g.exists()?g.data():null})}
 catch(e){UI.fail(e)}});
