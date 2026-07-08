const bm=document.getElementById('bm'),ml=document.getElementById('ml'),cc=document.getElementById('cc'),vp=document.getElementById('vp'),lk=document.getElementById('lk'),secs=document.querySelectorAll('.sc');
let usuarioRegistrado=false;
bm.addEventListener('click',(e)=>{e.stopPropagation();ml.classList.toggle('a');cc.style.display=ml.classList.contains('a')?'block':'none';});
cc.addEventListener('click',()=>{ml.classList.remove('a');cc.style.display='none';});
ml.querySelectorAll('.nav-links a:not(#lk)').forEach(en=>{en.addEventListener('click',(ev)=>{document.getElementById('bg').value='';ml.classList.remove('a');cc.style.display='none';vp.style.display='none';secs.forEach(s=>s.style.display='none');document.getElementById('s-'+ev.target.getAttribute('data-t')).style.display='block';window.scrollTo({top:0,behavior:'smooth'});});});
lk.addEventListener('click',()=>{document.getElementById('bg').value='';ml.classList.remove('a');cc.style.display='none';secs.forEach(s=>s.style.display='none');vp.style.display='flex';window.scrollTo({top:0,behavior:'smooth'});});
document.getElementById('card-delivero').addEventListener('click',verificarAccesoMenu);
document.getElementById('card-pickup').addEventListener('click',verificarAccesoMenu);
document.querySelectorAll('.to-menu-btn').forEach(btn=>btn.addEventListener('click',verificarAccesoMenu));
document.querySelectorAll('.to-map-btn').forEach(btn=>btn.addEventListener('click',()=>document.querySelector('[data-t="terkep"]').click()));
function verificarAccesoMenu(){if(!usuarioRegistrado){vp.style.display='none';secs.forEach(s=>s.style.display='none');document.getElementById('s-reg').style.display='block';}else{vp.style.display='none';secs.forEach(s=>s.style.display='none');document.getElementById('s-menu').style.display='block';}}
document.getElementById('btnGuardarRegistro').addEventListener('click',()=>{
const n=document.getElementById('regNev').value.trim(),c=document.getElementById('regCim').value.trim(),t=document.getElementById('regTel').value.trim();
if(n===""||c===""||t===""){alert('Kérjük, töltsön ki minden kötelező mezőt!');return;}
document.getElementById('inpNev').value=n;document.getElementById('inpCim').value=c;document.getElementById('inpTel').value=t;
usuarioRegistrado=true;alert('Sikeres regisztráció! Jó étvágyat kívánunk.');
document.getElementById('s-reg').style.display='none';document.getElementById('s-menu').style.display='block';
});
document.getElementById('bg').addEventListener('input',(e)=>{
const cad=e.target.value.toLowerCase().trim();
if(cad===""){secs.forEach(s=>s.style.display='none');vp.style.display='flex';document.querySelectorAll('.platillo').forEach(p=>p.style.display='flex');return;}
let enc=false;
document.querySelectorAll('.platillo').forEach(platillo=>{
const h3=platillo.querySelector('h3'),p=platillo.querySelector('p'),n=h3?h3.innerText.toLowerCase():'',d=p?p.innerText.toLowerCase():'';
if(n.includes(cad)||d.includes(cad)){platillo.style.display='flex';enc=true;}else{platillo.style.display='none';}
});
if(enc){vp.style.display='none';secs.forEach(s=>{s.style.display=(s.id==='s-menu')?'block':'none';});}
else{secs.forEach(s=>{if(s.id=='s-kosar'||s.id=='s-menu'||s.id=='s-reg')return;if(s.innerText.toLowerCase().includes(cad)&&!enc){vp.style.display='none';secs.forEach(sub=>sub.style.display='none');s.style.display='block';enc=true;}});}
if(!enc){secs.forEach(s=>s.style.display='none');vp.style.display='flex';document.querySelectorAll('.contenedor-carrusel,.grid-uzletek-top,.cp h2,.cp .title-uzletek').forEach(l=>l.style.display='none');}
else{document.querySelectorAll('.contenedor-carrusel,.grid-uzletek-top,.cp h2,.cp .title-uzletek').forEach(l=>l.style.display='');}
});
let car=[],descuento=0;
function upC(){
document.getElementById('lkl').innerHTML='🛒 Kosár ('+car.length+')';const cont=document.getElementById('itCar');cont.innerHTML='';let t=0;
if(car.length===0){cont.innerHTML='<p style="opacity:0.5;padding:2rem;text-align:center;color:#fff;font-size:0.9rem;">A kosár üres.</p>';}
else{car.forEach((item,idx)=>{t+=item.p;cont.innerHTML+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:0.8rem 0;border-bottom:1px solid rgba(255,255,255,0.08);gap:0.5rem;"><div style="display:flex;align-items:center;gap:0.8rem;"><img src="${item.i}" alt="${item.n}" style="width:44px;height:44px;object-fit:cover;border-radius:8px;border:1px solid rgba(255,255,255,0.1);flex-shrink:0;"><span style="color:#ffffff;font-size:0.9rem;text-align:left;line-height:1.2;">${item.n}</span></div><div style="display:flex;align-items:center;gap:0.6rem;flex-shrink:0;"><span style="color:var(--o);font-weight:700;font-size:0.9rem;">${item.p} Ft</span><button onclick="borrarItem(${idx})" style="background:rgba(255,0,0,0.2);color:#ff4444;border:none;padding:4px 8px;border-radius:4px;cursor:pointer;font-weight:bold;font-size:0.8rem;">X</button></div></div>`;});}
if(descuento>0&&t>0){t=Math.round(t*(1-descuento));}document.getElementById('tp').innerText=t;
}
function borrarItem(idx){car.splice(idx,1);upC();}
document.addEventListener('click',(e)=>{
const boton=e.target.closest('.ba');if(!boton)return;
const n=boton.getAttribute('data-n'),p=parseInt(boton.getAttribute('data-p'),10),i=boton.getAttribute('data-i');
car.push({n:n,p:p,i:i});upC();alert(n+' hozzáadva a kosárhoz!');
});
document.getElementById('btnAplicarKupon').addEventListener('click',()=>{const c=document.getElementById('inpKupon').value.trim().toUpperCase();if(c==="PESTA10"||c==="NIGHT10"){descuento=0.10;alert('Kupon sikeresen alkalmazva!');upC();}else{alert('Érvénytelen kuponkód!');}});
document.getElementById('be').addEventListener('click',(e)=>{
if(car.length===0){alert('A kosár üres!');return;}
const nev=document.getElementById('inpNev').value.trim(),cim=document.getElementById('inpCim').value.trim(),tel=document.getElementById('inpTel').value.trim();
if(nev===""||cim===""||tel===""){alert('Kérjük, töltsön ki minden mezőt a szállításhoz!');return;}
let txt="🍕 *PIZZA TÚ NIGHT - ÚJ RENDELÉS* 🍕\n\n👤 *Név:* "+nev+"\n🏠 *Cím:* "+cim+"\n📞 *Tel:* "+tel+"\n\n📌 *Részletek:*\n";
car.forEach(item=>{txt+=`🍕 *${item.n}* (${item.p} Ft)\n`;});txt+=`\n💰 *Végösszeg:* ${document.getElementById('tp').innerText} Ft\n`;
window.location.href="https://wa.me"+encodeURIComponent(txt);
car=[];descuento=0;document.getElementById('inpNev').value='';document.getElementById('inpCim').value='';document.getElementById('inpTel').value='';
upC();secs.forEach(s=>s.style.display='none');vp.style.display='flex';
});
document.getElementById('box-pizza-gourmet').addEventListener('click',(e)=>{if(e.target.id==='close-promo'){e.stopPropagation();document.getElementById('box-pizza-gourmet').style.setProperty('display','none','important');}else{document.querySelector('[data-t="kosar"]').click();}});

// >>> PROTECCIÓN INDUSTRIAL TÁCTIL CONTRA RECARGA EN SMARTPHONES <<<
let inicioY=0;
document.addEventListener('touchstart',(e)=>{inicioY=e.touches[0].pageY;},{passive:true});
document.addEventListener('touchmove',(e)=>{
    let desplY=e.touches[0].pageY-inicioY;
    // Si el usuario desliza hacia abajo y está arriba de todo de la página, frena la recarga
    if(document.documentElement.scrollTop===0&&desplY>0){e.preventDefault();}
},{passive:false});
