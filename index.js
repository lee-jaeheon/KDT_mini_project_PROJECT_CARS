/* ================================================
   index.js — 자동 슬라이드쇼
   4.5초마다 자동 전환, 수동 컨트롤 없음
================================================ */

const slides = document.querySelectorAll('.slide');
let current = 0;

function showSlide(n) {
  slides[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
}

setInterval(() => showSlide(current + 1), 4500);

function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVh();
window.addEventListener('resize', setVh);
