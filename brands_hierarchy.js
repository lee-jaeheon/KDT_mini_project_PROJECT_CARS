/* ============================================================
   brands_hierarchy.js
   * 브랜드 그룹 구조도 — 트리 형태 렌더링
   * 의존성: brands_data.js — brandGroups, allBrands
============================================================ */

function renderBrandHierarchy() {
  const container = document.getElementById("hierarchySections");
  if (!container) return;

  const brandMap = {};
  allBrands.forEach((b) => { brandMap[b.logoFile] = b; });

  brandGroups.forEach((group) => {
    const isIndependent = group.nameEn === "Independent";
    const brands = group.brands.map((key) => brandMap[key]).filter(Boolean);

    const groupEl = document.createElement("div");
    groupEl.className = isIndependent ? "hrc-group hrc-independent" : "hrc-group";

    groupEl.innerHTML = `
      <!-- 루트 노드 -->
      <div class="hrc-root">
        <div class="hrc-root-name">${group.nameKo}</div>
        <div class="hrc-root-en">${group.nameEn}</div>
        ${!isIndependent ? `<div class="hrc-root-count">${brands.length}개 브랜드</div>` : ""}
      </div>

      <!-- 루트 → 브랜드 연결선 -->
      <div class="hrc-connector">
        <div class="hrc-connector-v"></div>
        <div class="hrc-connector-h"></div>
      </div>

      <!-- 브랜드 카드 행 -->
      <div class="hrc-brands">
        ${brands.map((b) => `
          <div class="hrc-brand">
            <div class="hrc-brand-tick"></div>
            <div class="hrc-brand-box">
              <img
                src="logos/${b.logoFile}_logo.png"
                alt="${b.nameEn}"
                class="hrc-logo"
                onerror="this.style.opacity='0'"
              >
            </div>
            <div class="hrc-brand-name">${b.name}</div>
          </div>
        `).join("")}
      </div>
    `;

    container.appendChild(groupEl);
  });
}
