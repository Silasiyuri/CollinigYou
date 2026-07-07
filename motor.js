const bm=document.getElementById('bm'),ml=document.getElementById('ml'),cc=document.getElementById('cc');
const vp=document.getElementById('vp'),lk=document.getElementById('lk'),secs=document.querySelectorAll('.sc');

bm.addEventListener('click',(e)=>{e.stopPropagation();ml.classList.toggle('a');cc.style.display=ml.classList.contains('a')?'block':'none';});
cc.addEventListener('click',()=>{ml.classList.remove('a');cc.style.display='none';});

ml.querySelectorAll('.nav-links a:not(#lk)').forEach(en=>{en.addEventListener('click',(ev)=>{document.getElementById('bg').value='';ml.classList.remove('a');cc.style.display='none';vp.style.display='none';secs.forEach(s=>s.style.display='none');document.getElementById('s-'+ev.target.getAttribute('data-t')).style.display='block';});});
lk.addEventListener('click',()=>{document.getElementById('bg').value='';ml.classList.remove('a');cc.style.display='none';secs.forEach(s=>s.style.display='none');vp.style.display='flex';});

document.getElementById('bg').addEventListener('input',(e)=>{
const cad=e.target.value.toLowerCase().trim();if(cad===""){secs.forEach(s=>s.style.display='none');vp.style.display='flex';return;}
let enc=false;secs.forEach(s=>{if(s.id=='s-kosar')return;const enlace=ml.querySelector('[data-t="'+s.id.replace('s-','')+'"]');const txtEnlace=enlace?enlace.innerText.toLowerCase():'';if((s.innerText.toLowerCase().includes(cad)||txtEnlace.includes(cad))&&!enc){vp.style.display='none';secs.forEach(sub=>sub.style.display='none');s.style.display='block';enc=true;}});
if(!enc){secs.forEach(s=>s.style.display='none');vp.style.display='flex';}
});

let car=[];
let descuento = 0;

function upC(){
document.getElementById('lkl').innerHTML='&#128722; Kosár ('+car.length+')';const cont=document.getElementById('itCar');cont.innerHTML='';let t=0;
if(car.length===0){cont.innerHTML='<p style="opacity:0.5;padding:2rem;">A kosár üres.</p>';}
else{car.forEach((i,idx)=>{t+=i.p;cont.innerHTML+='<div style="display:flex;justify-content:space-between;align-items:center;padding:1rem 0;border-bottom:1px solid rgba(245,245,240,0.1);"><span>'+i.n+'</span><div><span style="color:var(--o);font-weight:700;">'+i.p+' Ft</span><button class="btn-del" onclick="borrarItem('+idx+')">X</button></div></div>';});}

if (descuento > 0 && t > 0) {
    t = Math.round(t * (1 - descuento));
}
document.getElementById('tp').innerText=t;
}

function borrarItem(idx){car.splice(idx,1);upC();}

document.querySelectorAll('.ba:not(#be)').forEach(btn=>{btn.addEventListener('click',(e)=>{const n=e.target.getAttribute('data-n'),p=parseInt(e.target.getAttribute('data-p'));car.push({n:n,p:p});upC();alert(n+' hozzáadva!');});});

// PROGRAMACIÓN DEL BOTÓN DE CUPONES DE DESCUENTO
document.getElementById('btnAplicarKupon').addEventListener('click', () => {
    const codigo = document.getElementById('inpKupon').value.trim().toUpperCase();
    if (codigo === "PESTA10" || codigo === "NIGHT10") {
        descuento = 0.10;
        alert('Kupon sikeresen alkalmazva: 10% kedvezmény!');
        upC();
    } else {
        alert('Érvénytelen kuponkód!');
    }
});

// REEMPLAZA ESTE BLOQUE AL FINAL DE TU ARCHIVO MOTOR.JS
document.getElementById('be').addEventListener('click', (e) => {
    e.preventDefault(); // Evita que la página recargue o falle antes de procesar

    if (car.length === 0) {
        alert('A kosár üres!');
        return;
    }
    const cim = document.getElementById('inpCim').value.trim();
    const tel = document.getElementById('inpTel').value.trim();
    
    if (cim === "" || tel === "") {
        alert('Kérjük, töltse ki a szállítási címet és a telefonszámot!');
        return;
    }

    // 1. Estructurar el texto del pedido para WhatsApp
    let textoMensaje = "🍕 *PIZZA TÚ NIGHT - ÚJ RENDELÉS* 🍕\n\n";
    textoMensaje += "📌 *Rendelés részletei:*\n";
    
    car.forEach(item => {
        textoMensaje += `- ${item.n} (${item.p} Ft)\n`;
    });

    // Calcular el precio total final que se muestra en pantalla
    const precioTotalFinal = document.getElementById('tp').innerText;
    textoMensaje += `\n💰 *Végösszeg:* ${precioTotalFinal} Ft\n\n`;
    textoMensaje += `🏠 *Szállítási cím:* ${cim}\n`;
    textoMensaje += `📞 *Telefonszám:* ${tel}\n`;

    // 2. Tu número de teléfono del negocio
    const numeroTelefonoNegocio = "36203906539";

    // 3. Codificar el texto de forma segura (CORREGIDO: Se agregó la barra "/")
    const urlWhatsApp = "https://wa.me" + numeroTelefonoNegocio + "/?text=" + encodeURIComponent(textoMensaje);

    // 4. Abrir WhatsApp e informar al cliente
    alert('Köszönjük! A rendelés részletei összeálltak. Megnyitjuk a WhatsApp-ot a küldéshez.');
    
    // Cambiamos a window.open para que la app de WhatsApp cargue fluidamente en otra pestaña
    window.open(urlWhatsApp, '_blank');

    // 5. Vaciar el carrito y limpiar el formulario
    car = [];
    descuento = 0;
    
    if(document.getElementById('inpCim')) document.getElementById('inpCim').value = '';
    if(document.getElementById('inpTel')) document.getElementById('inpTel').value = '';
    if(document.getElementById('inpKupon')) document.getElementById('inpKupon').value = '';
    
    upC();
    
    // Regresar a la portada principal de forma fluida
    secs.forEach(s => s.style.display = 'none');
    vp.style.display = 'flex';
});
