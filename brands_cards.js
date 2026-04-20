/* ============================================================
   brands_cards.js
   * 브랜드 카드 렌더링 + 국가 필터 + 검색
   * 의존성: brands_data.js — allBrands, countryInfo
============================================================ */

let currentFilter = "ALL";

function cardHTML(brand) {
  return `
    <a class="card brand-card brand-card-link"
       href="${brand.url}"
       target="_blank"
       rel="noopener noreferrer"
       title="${brand.nameEn} 공식 홈페이지로 이동">
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
      <div class="brand-keyword">${brand.keywords}</div>
      <div class="brand-visit-hint">공식 홈페이지 방문 →</div>
    </a>
  `;
}

function renderBrands() {
  const query = (document.getElementById("brandSearch")?.value || "").trim().toLowerCase();
  const grid  = document.getElementById("brandGrid");
  const noResult = document.getElementById("brandNoResult");

  const filtered = allBrands.filter((b) => {
    const matchCountry = currentFilter === "ALL" || b.country === currentFilter;
    const matchSearch  = !query ||
      b.name.toLowerCase().includes(query) ||
      b.nameEn.toLowerCase().includes(query);
    return matchCountry && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = "";
    noResult.style.display = "block";
  } else {
    grid.innerHTML = filtered.map(cardHTML).join("");
    noResult.style.display = "none";
  }
}

function setFilter(code, btn) {
  currentFilter = code;
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderBrands();
}

function filterBrands() {
  renderBrands();
}

function renderAllCountrySections() {
  renderBrands();
}
