// ========================= THEME =========================

const THEME_KEY = 'jb-theme';

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
    document.getElementById('theme-btn').innerHTML = '☀️ <span class="btn-label">Tema</span>';
  } else {
    document.body.classList.remove('light');
    document.getElementById('theme-btn').innerHTML = '🌙 <span class="btn-label">Tema</span>';
  }
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light');
  const next = isLight ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

// On load: apply saved theme or system preference
(function () {
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved || 'dark');
})();

// ========================= REVEAL =========================

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('active');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ========================= DESCRIÇÕES TRUNCADAS =========================

document.querySelectorAll('.cert-desc').forEach(desc => {
  if (desc.scrollHeight <= desc.clientHeight + 1) return;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'cert-desc-toggle';
  toggle.textContent = 'Ler mais';
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    const expanded = desc.classList.toggle('expanded');
    toggle.textContent = expanded ? 'Ler menos' : 'Ler mais';
    toggle.setAttribute('aria-expanded', String(expanded));
  });

  desc.insertAdjacentElement('afterend', toggle);
});

// ========================= GALLERY =========================

let currentGallery = [];
let currentIndex = 0;

function openGallery(images, startIndex, title) {
  currentGallery = images;
  currentIndex = startIndex;

  document.getElementById('lightbox-img').src =
    currentGallery[currentIndex];

  document.getElementById('lightbox-title').textContent =
    title;

  document.getElementById('lightbox').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function nextImage() {
  if (!currentGallery.length) return;

  currentIndex = (currentIndex + 1) % currentGallery.length;

  document.getElementById('lightbox-img').src =
    currentGallery[currentIndex];
}

function prevImage() {
  if (!currentGallery.length) return;

  currentIndex =
    (currentIndex - 1 + currentGallery.length) %
    currentGallery.length;

  document.getElementById('lightbox-img').src =
    currentGallery[currentIndex];
}

document.addEventListener('keydown', function(e) {

  const lightbox =
    document.getElementById('lightbox');

  if (!lightbox.classList.contains('active'))
    return;

  if (e.key === 'ArrowRight')
    nextImage();

  if (e.key === 'ArrowLeft')
    prevImage();

});

const bananinhaImages = [
  'img/projetos/printsbananinha/tela_home.png',
  'img/projetos/printsbananinha/tela_produtos.png',
  'img/projetos/printsbananinha/tela_sobre.png'
];

const batmanImages = [
  'img/projetos/printsbatman/tela_principal.png',
  'img/projetos/printsbatman/tela_digitando.png',
  'img/projetos/printsbatman/tela_datepicker.png',
  'img/projetos/printsbatman/tela_concluidas.png'
];

const agendaImages = [
  'img/projetos/printsagendamento/agenda.png',
  'img/projetos/printsagendamento/login.png',
  'img/projetos/printsagendamento/novoagendamento.png',
  'img/projetos/printsagendamento/clientes.png'
];

const weLogicImages = [
  'img/projetos/printswelogic/print_dashboard.png',
  'img/projetos/printswelogic/print_funcionarios.png',
  'img/projetos/printswelogic/print_fornecedores.png',
  'img/projetos/printswelogic/print_pedidos.png'
];