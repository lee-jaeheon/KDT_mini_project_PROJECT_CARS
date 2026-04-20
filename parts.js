/* ================================================
   parts.js — 부위별 명칭 페이지 스크립트
   핫스팟 툴팁 / 스크롤 진행바 / reveal 애니메이션
================================================ */

// ── 스크롤 진행 바 ───────────────────────────
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (scrolled / total * 100) + '%';
});


// ── 스크롤 reveal 애니메이션 ─────────────────
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── 핫스팟 툴팁 패널 ─────────────────────────
const panel    = document.getElementById('tooltip-panel');
const backdrop = document.getElementById('tooltip-backdrop');
const closeBtn = document.getElementById('tooltip-close');

function openTooltip(btn) {
  const name   = btn.dataset.name   || '';
  const en     = btn.dataset.en     || '';
  const desc   = btn.dataset.desc   || '';
  const isSambo = btn.dataset.sambo === 'true';

  document.getElementById('tooltip-tag').textContent  = 'Part Info';
  document.getElementById('tooltip-name').textContent = name;
  document.getElementById('tooltip-en').textContent   = en;
  document.getElementById('tooltip-desc').textContent = desc;

  const badgeEl = document.getElementById('tooltip-badge');
  if (isSambo) {
    badgeEl.innerHTML = '<div class="sambo-badge">삼보모터스 생산 부품</div>';
  } else {
    badgeEl.innerHTML = '';
  }

  panel.classList.add('active');
  backdrop.classList.add('active');
}

function closeTooltip() {
  panel.classList.remove('active');
  backdrop.classList.remove('active');
}

document.querySelectorAll('.hs-dot').forEach(btn => {
  btn.addEventListener('click', () => openTooltip(btn));
});

closeBtn.addEventListener('click', closeTooltip);
backdrop.addEventListener('click', closeTooltip);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeTooltip();
});
