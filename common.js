/* ================================================
   common.js — 하위 페이지 공통 네비 동작
   스크롤 내리면 숨기고, 위로 올리면 나타남
================================================ */

let lastY = 0;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;

  if (currentY > lastY && currentY > 80) {
    // 아래로 스크롤 → 숨기기
    document.querySelector('.nav').style.top = '-80px';
  } else {
    // 위로 스크롤 → 나타나기
    document.querySelector('.nav').style.top = '0';
  }

  lastY = currentY;
});
