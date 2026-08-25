const sun = document.getElementById('sun');
    const glasses = document.getElementById('glasses');
    const panel = document.getElementById('panel');
    const scrim = document.getElementById('scrim');

    // glasses follow cursor, clamped inside the sun
    document.addEventListener('mousemove', (e) => {
      const r = sun.getBoundingClientRect();
      let dx = e.clientX - (r.left + r.width / 2);
      let dy = e.clientY - (r.top + r.height / 2);
      const maxR = r.width * 0.13;
      const dist = Math.hypot(dx, dy);
      if (dist > maxR) { const k = maxR / dist; dx *= k; dy *= k; }
      glasses.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px)`;
    });

    // click sun to slide panel in/out
    sun.addEventListener('click', (e) => {
      e.preventDefault();
      panel.classList.toggle('open');
      scrim.classList.toggle('open');
    });

    // click backdrop to close
    scrim.addEventListener('click', () => {
      panel.classList.remove('open');
      scrim.classList.remove('open');
    });



// Don't let the browser restore a previous scroll position
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// 👇 Only thing you edit to add / remove products
const PRODUCTS = [
  { thumb:"Assets/kitty-sa-te.PNG",      full:"Assets/logo.PNG", name:"Neko's Surspices Logo",
    desc:"Neko's Surspices is a logo created fora group project back in grade 11, 2024, focused on developing chili sause.",
    x:1480, y:130, w:400, rot:5 },

  { thumb:"Assets/12-icons.PNG",      full:"Assets/choi.png", name:"12 Vietnamese Traditional Games",
    desc:"In this project, we are creating 12 icons representingour favorite Vietnamese traditional games. By using playful colors and whimsical characters full of energy, we strive to make something that feels just as bright, fun, and full of wonder as we felt when we were little kids playing outside.",
    x:680, y:50, w:400, rot:0 },

  { thumb:"Assets/grow-herb.PNG", video:"https://www.youtube.com/embed/0ApVnazKaxw?autoplay=1&rel=0", name:"Grow your own Herb",
    desc:"For this interactive infographic, the user plays a role of a witch’s assistance on their first day of work. The task is to grow a simple herb garden, guided by the professional gardener. Through this ‘gamified experience’, the user is able to explore key gardening requirements, including planting, sowing seeds, water and light conditions. The infographic aims to educate people on the fundamental process of growing herbs and maintaining a small garden.",
    x:180,  y:650, w:400, rot:5 },

  { thumb:"Assets/voucher.PNG",      full:"Assets/good-fortune-voucher.PNG", name:"Voucher",
    desc:"A promotional gift voucher created as a part of a design class.",
    x:130,  y:150, w:450, rot:-3 },

  { thumb:"Assets/prada.PNG",      full:"Assets/prada-poster.PNG", name:"Prada",
    desc:"A Valentine's Day promotional poster created as a part of a design class, a campaign concept for Prada.",
    x:320,  y:1050, w:450, rot:-8 },

  { thumb:"Assets/kazuha.PNG", full:"Assets/kazuha-poster.PNG",      name:"Kaedehara Kazuha - Character Poster",
    desc:"Personal Practice: Photoshop and Illustrator. A fan made character poster as a personal design practice exercise.",
    x:1720, y:1050, w:450, rot:7 },

  { thumb:"Assets/cicada-45.PNG",      video:"https://www.youtube.com/embed/PdFZAKoSq8g?si=dRd9aDquN6nXgg6q", name:"CICADA-45",
    desc:"CICADA-45 is a website for a fictional rock music festival by a band of the same name, set within an oppressive underground city. The event serves as a creative protest—using music and subversive design to challenge a rigid system that demands compliance. Inspired by the raw energy of punk culture, the website embraces a 'ragged beauty' to prove that an interface does not need to look clean to look good. This project aims to inspire young people to reject corporate aesthetics, explore none traditional design, and use their collective voice to express themselves.",
    x:1000,  y:1100, w:450, rot:0 },

  { thumb:"Assets/keqing.PNG", full:"Assets/Keqing-poster.PNG",      name:"Keqing - Character Poster",
    desc:"Personal Practice: Photoshop and Illustrator. A fan made character poster as a personal design practice exercise.",
    x:1800, y:560, w:450, rot:-3 },

];

const wrap    = document.getElementById('products');
const overlay = document.getElementById('overlay');
const ovImg   = document.getElementById('ovImg');
const ovName  = document.getElementById('ovName');
const ovDesc  = document.getElementById('ovDesc');

// Build every product from the array
PRODUCTS.forEach(p => {
  const div = document.createElement('div');
  div.className = 'product';
  div.title = 'Click to view';
  div.style.cssText = `left:${p.x}px; top:${p.y}px; width:${p.w}px; --rot:${p.rot}deg;`;
  div.innerHTML = `<img src="${p.thumb}" alt="${p.name}">`;
  div.addEventListener('click', () => openProduct(p));
  wrap.appendChild(div);
});

function openProduct(p){
  ovImg.innerHTML = p.video
    ? `<iframe class="ov-video" src="${p.video}" title="${p.name}"
         frameborder="0" allowfullscreen
         referrerpolicy="strict-origin-when-cross-origin"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>`
    : `<img class="ov-img" src="${p.full}" alt="${p.name}">`;
  ovName.textContent = p.name;
  ovDesc.textContent = p.desc;
  overlay.classList.add('open');
}

// Close
document.getElementById('backBtn').addEventListener('click', () => overlay.classList.remove('open'));
overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });

// Center on the board every load
window.addEventListener('load', () => {
  const r = document.getElementById('archive-board').getBoundingClientRect();
  const cx = window.scrollX + r.left + r.width  / 2;
  const cy = window.scrollY + r.top  + r.height / 2;
  window.scrollTo(cx - window.innerWidth / 2, cy - window.innerHeight / 2);
});