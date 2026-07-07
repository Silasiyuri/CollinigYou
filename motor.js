// ==========================================
// 1. ELEMENTOS DE LA INTERFAZ Y NAVEGACIÓN
// ==========================================
const bm=document.getElementById('bm'),ml=document.getElementById('ml'),cc=document.getElementById('cc'),vp=document.getElementById('vp'),lk=document.getElementById('lk'),secs=document.querySelectorAll('.sc');

bm.addEventListener('click',(e)=>{e.stopPropagation();ml.classList.toggle('a');cc.style.display=ml.classList.contains('a')?'block':'none';});
cc.addEventListener('click',()=>{ml.classList.remove('a');cc.style.display='none';});

ml.querySelectorAll('.nav-links a:not(#lk)').forEach(en=>{en.addEventListener('click',(ev)=>{document.getElementById('bg').value='';ml.classList.remove('a');cc.style.display='none';vp.style.display='none';secs.forEach(s=>s.style.display='none');document.getElementById('s-'+ev.target.getAttribute('data-t')).style.display='block';});});
lk.addEventListener('click',()=>{document.getElementById('bg').value='';ml.classList.remove('a');cc.style.display='none';secs.forEach(s=>s.style.display='none');vp.style.display='flex';});

document.getElementById('card-delivero').addEventListener('click',()=>{document.querySelector('[data-t="menu"]').click();});
document.getElementById('card-pickup').addEventListener('click',()=>{document.querySelector('[data-t="menu"]').click();});
document.querySelectorAll('.to-menu-btn').forEach(btn=>{btn.addEventListener('click',()=>document.querySelector('[data-t="menu"]').click());});
document.querySelectorAll('.to-map-btn').forEach(btn=>{btn.addEventListener('click',()=>document.querySelector('[data-t="terkep"]').click());});

// ==========================================
// MOTOR DE BÚSQUEDA INTELIGENTE EN TIEMPO REAL
// ==========================================
document.getElementById('bg').addEventListener('input',(e)=>{
    const cad=e.target.value.toLowerCase().trim();
    if(cad===""){secs.forEach(s=>s.style.display='none');vp.style.display='flex';document.querySelectorAll('.platillo').forEach(p=>p.style.display='flex');return;}
    let enc=false;
    document.querySelectorAll('.platillo').forEach(platillo=>{
        const h3=platillo.querySelector('h3'),p=platillo.querySelector('p'),n=h3?h3.innerText.toLowerCase():'',d=p?p.innerText.toLowerCase():'';
        if(n.includes(cad)||d.includes(cad)){platillo.style.display='flex';enc=true;}else{platillo.style.display='none';}
    });
    if(enc){vp.style.display='none';secs.forEach(s=>{s.style.display=(s.id==='s-menu')?'block':'none';});}
    else{secs.forEach(s=>{if(s.id=='s-kosar'||s.id=='s-menu')return;if(s.innerText.toLowerCase().includes(cad)&&!enc){vp.style.display='none';secs.forEach(sub=>sub.style.display='none');s.style.display='block';enc=true;}});}
    if(!enc){secs.forEach(s=>s.style.display='none');vp.style.display='flex';document.querySelectorAll('.grid-uzletek,.grid-uzletek-top,.cp h2,.cp .title-uzletek').forEach(l=>l.style.display='none');}
    else{document.querySelectorAll('.grid-uzletek,.grid-uzletek-top,.cp h2,.cp .title-uzletek').forEach(l=>l.style.display='');}
});

// ==========================================
// 2. LÓGICA DEL CARRITO DE COMPRAS
// ==========================================
let car=[],descuento=0;

function upC(){
    document.getElementById('lkl').innerHTML='🛒 Kosár ('+car.length+')';
    const cont=document.getElementById('itCar');cont.innerHTML='';let t=0;
    if(car.length===0){cont.innerHTML='<p style="opacity:0.5;padding:2rem;text-align:center;color:#fff;">A kosár üres.</p>';}
    else{car.forEach((item,idx)=>{t+=item.p;cont.innerHTML+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:1rem 0;border-bottom:1px solid rgba(255,255,255,0.08);"><div style="display:flex;align-items:center;gap:1rem;"><img src="${item.i}" alt="${item.n}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;border:1px solid rgba(255,255,255,0.1);flex-shrink:0;"><span style="color:#ffffff;font-size:0.95rem;">${item.n}</span></div><div style="display:flex;align-items:center;gap:0.8rem;"><span style="color:var(--o);font-weight:700;">${item.p} Ft</span><button onclick="borrarItem(${idx})" style="background:rgba(255,0,0,0.2);color:#ff4444;border:none;padding:5px 10px;border-radius:4px;cursor:pointer;font-weight:bold;">X</button></div></div>`;});}
    if(descuento>0&&t>0){t=Math.round(t*(1-descuento));}
    document.getElementById('tp').innerText=t;
}

function borrarItem(idx){car.splice(idx,1);upC();}

// >>> NUEVO CAPTURADOR GLOBAL E INMUNE PARA BOTONES DE COMPRA <<<
document.addEventListener('click', (e) => {
    const boton = e.target.closest('.ba');
    if (!boton) return;

    const n = boton.getAttribute('data-n');
    const p = parseInt(boton.getAttribute('data-p'), 10);
    const i = boton.getAttribute('data-i');

    car.push({ n: n, p: p, i: i });
    upC();
    alert(n + ' hozzáadva a kosárhoz!');
});

// ==========================================
// 3. ACTIVACIÓN DE CUPONES
// ==========================================
document.getElementById('btnAplicarKupon').addEventListener('click',()=> {
    const c=document.getElementById('inpKupon').value.trim().toUpperCase();
    if(c==="PESTA10"||c==="NIGHT10"){descuento=0.10;alert('Kupon sikeresen alkalmazva!');upC();}
    else{alert('Érvénytelen kuponkód!');}
});

// ==========================================
// 4. PROCESAMIENTO DEL PEDIDO Y ENVÍO A WHATSAPP
// ==========================================
document.getElementById('be').addEventListener('click',(e)=>{
    if(car.length===0){e.preventDefault();alert('A kosár üres!');return;}
    const cim=document.getElementById('inpCim').value.trim(),tel=document.getElementById('inpTel').value.trim();
    if(cim===""||tel===""){e.preventDefault();alert('Kérjük, tölse ki a mezőket!');return;}
    
    let txt="🍕 *PIZZA TÚ NIGHT - ÚJ RENDELÉS* 🍕\n\n📌 *Részletek:*\n";
    car.forEach(item=>{txt+=`🍕 *${item.n}* (${item.p} Ft)\n`;});
    txt+=`\n💰 *Végösszeg:* ${document.getElementById('tp').innerText} Ft\n🏠 *Cím:* ${cim}\n📞 *Tel:* ${tel}\n`;
    
    // >>> CONFIGURACIÓN DE TU TELÉFONO DE NEGOCIO <<<
    // IMPORTANTE: Pon aquí tu número con el 36 por delante, entre comillas y sin espacios.
    const numeroTelefonoNegocio = "36203906539"; 
    
    // Enlace reparado con la barra "/" y el número de destino integrado
    const url="https://wa.me" + numeroTelefonoNegocio + "/?text=" + encodeURIComponent(txt);
    
    document.getElementById('wa-direct-link').setAttribute('href',url);
    car=[];descuento=0;document.getElementById('inpCim').value='';document.getElementById('inpTel').value='';
    upC();secs.forEach(s=>s.style.display='none');vp.style.display='flex';
});
