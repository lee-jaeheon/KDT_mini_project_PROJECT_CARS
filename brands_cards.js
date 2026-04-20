/* ============================================================
   brands_cards.js
   * 국가별 브랜드 카드 섹션 렌더링
   *
   * 의존성:
   *   - brands_data.js: countryInfo, countryOrder, brandsByCountry
============================================================ */


/* ==========================================================
   [1] 국가 섹션 하나의 HTML을 생성해서 반환
   * 국가 헤더(한글 국가명 + 브랜드 수) + 브랜드 카드 그리드
============================================================ */
function renderCountrySection(countryCode) {
  const info = countryInfo[countryCode];
  const brands = brandsByCountry[countryCode] || [];

  // 각 브랜드 카드 HTML 생성
  const cardsHTML = brands.map((brand) => `
    <a class="card brand-card brand-card-link"
       href="${brand.url}"
       target="_blank"
       rel="noopener noreferrer"
       title="${brand.nameEn} 공식 홈페이지로 이동">

      <!--
        로고 박스: logos/{logoFile}_logo.png 이미지를 표시
        * onerror: 이미지 파일이 없으면 텍스트 폴백(brand-logo-fallback)을 표시
        * 이미지 다운로드 전에는 브랜드 영문명이 자동으로 보임
      -->
      <div class="brand-logo-box">
        <img
          src="logos/${brand.logoFile}_logo.png"
          alt="${brand.nameEn} 로고"
          class="brand-logo-img"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <span class="brand-logo-fallback">${brand.nameEn}</span>
      </div>

      <div>
        <div class="brand-founded">SINCE ${brand.founded}</div>
        <div class="brand-name">${brand.name}</div>
      </div>
      <div class="brand-desc">${brand.desc}</div>

      <!-- 핵심 키워드 태그 — brands_data.js의 keywords 필드에서 가져옴 -->
      <div class="brand-keyword">${brand.keywords}</div>

      <!-- 홈페이지 이동 힌트 -->
      <div class="brand-visit-hint">공식 홈페이지 방문 →</div>

    </a>
  `).join("");

  return `
    <div class="country-header">
      <div class="country-name-ko">${info.nameKo}</div>
      <div class="country-count">${brands.length} BRANDS</div>
    </div>
    <div class="brand-grid">${cardsHTML}</div>
  `;
}


/* ==========================================================
   [3] 국가 섹션 전체를 #countrySections 컨테이너에 채워 넣음
============================================================ */
function renderAllCountrySections() {
  const container = document.getElementById("countrySections");
  container.innerHTML = countryOrder
    .map((code) => renderCountrySection(code))
    .join("");
}
