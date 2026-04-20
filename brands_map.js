/* ============================================================
   brands_map.js
   * D3.js와 TopoJSON을 사용한 세계지도 렌더링
   * 브랜드 본사 마커 + 호버 툴팁 + 줌/팬 기능 포함
   *
   * 의존성:
   *   - 전역: d3, topojson (brands.html에서 CDN으로 로드)
   *   - brands_data.js: countryInfo, allBrands, brandCountryISO3, NUMERIC_TO_ISO3
============================================================ */


/* ==========================================================
   [1] 지도 SVG의 기본 크기 (viewBox 기준)
============================================================ */
const MAP_WIDTH = 960;
const MAP_HEIGHT = 500;


/* ==========================================================
   [2] 같은 위치의 브랜드들을 하나의 마커로 묶는 함수
   * 거리 임계값(약 0.15도)보다 가까우면 같은 그룹으로 판단
   * 예) 슈투트가르트의 벤츠+포르쉐+마이바흐 → 마커 1개에 3개 브랜드
============================================================ */
function groupBrandsByLocation() {
  const groups = [];
  const THRESHOLD = 0.15;  // 위/경도 차이 허용치(도 단위)

  allBrands.forEach((brand) => {
    const existing = groups.find((g) =>
      Math.abs(g.lat - brand.hqLat) < THRESHOLD &&
      Math.abs(g.lng - brand.hqLng) < THRESHOLD
    );

    if (existing) {
      existing.brands.push(brand);
    } else {
      groups.push({
        lat: brand.hqLat,
        lng: brand.hqLng,
        country: brand.country,
        city: brand.hqCity,
        brands: [brand]
      });
    }
  });

  return groups;
}


/* ==========================================================
   [3] 메인 함수 — TopoJSON 로드 & 지도 렌더링
============================================================ */
async function initWorldMap() {

  // ---------- [3-1] TopoJSON 데이터 비동기 로드 ----------
  // world-atlas v2의 countries-110m.json (Natural Earth 1:110m 기반)
  const worldDataUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

  let topoData;
  try {
    topoData = await d3.json(worldDataUrl);
  } catch (err) {
    console.error("지도 데이터 로드 실패:", err);
    document.getElementById("mapLoading").textContent =
      "지도를 불러올 수 없습니다. 네트워크 상태를 확인해주세요.";
    return;
  }

  // TopoJSON → GeoJSON 변환 (국가별 feature 배열)
  const countriesGeo = topojson.feature(topoData, topoData.objects.countries);


  // ---------- [3-2] SVG 기본 설정 ----------
  const svg = d3.select("#worldMap")
    .attr("viewBox", `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  // 로딩 화면 숨기고 SVG 표시
  document.getElementById("mapLoading").style.display = "none";
  document.getElementById("worldMap").style.display = "block";


  // ---------- [3-3] 투영(projection) & path 생성기 ----------
  // geoNaturalEarth1 : 자연스러운 곡선 투영
  //   (메르카토르보다 고위도 왜곡이 덜함, 세계지도에 적합)
  const projection = d3.geoNaturalEarth1()
    .fitSize([MAP_WIDTH, MAP_HEIGHT], countriesGeo);

  const pathGenerator = d3.geoPath().projection(projection);


  // ---------- [3-4] 줌 처리용 그룹 <g> ----------
  // 줌은 이 그룹에 transform을 걸어서 구현
  //  (국가 path와 마커가 한꺼번에 변환됨)
  const zoomGroup = svg.append("g").attr("class", "zoom-group");


  // ---------- [3-5] 국가 path 렌더링 ----------
  zoomGroup.selectAll(".country")
    .data(countriesGeo.features)
    .enter()
    .append("path")
    .attr("class", (d) => {
      // Natural Earth는 feature.id에 ISO 숫자 코드를 저장
      // NUMERIC_TO_ISO3로 문자 코드 변환 후, 브랜드 보유국이면 하이라이트
      const iso3 = NUMERIC_TO_ISO3[d.id];
      return brandCountryISO3.has(iso3) ? "country has-brand" : "country";
    })
    .attr("d", pathGenerator);


  // ---------- [3-6] 브랜드 마커 렌더링 + 툴팁 이벤트 ----------
  const tooltip = document.getElementById("mapTooltip");
  const tooltipCountry = document.getElementById("tooltipCountry");
  const tooltipBrands = document.getElementById("tooltipBrands");
  const mapContainer = document.querySelector(".map-container");

  const markerGroups = groupBrandsByLocation();

  // 마커 반지름 헬퍼 — 브랜드 수에 따라 크기 조정
  const outerR = (d) => 5 + Math.min(d.brands.length - 1, 3) * 1.2;  // 외부 링 반지름
  const innerR = (d) => outerR(d) * 0.42;                             // 내부 점 반지름

  // ---------- [3-6] 마커 그룹 렌더링 ----------
  // 각 마커는 <g> 그룹 안에 세 개의 circle로 구성
  //   ① marker-pulse  : 바깥으로 퍼지는 pulse 링 (CSS animation)
  //   ② marker-ring   : 항상 보이는 외부 링 (fill 없음, stroke만)
  //   ③ marker-dot    : 중심 채워진 점
  const markerG = zoomGroup.selectAll(".marker-group")
    .data(markerGroups)
    .enter()
    .append("g")
    .attr("class", "marker-group")
    // <g>를 좌표로 이동 — 자식 circle들은 cx=0, cy=0 기준
    .attr("transform", (d) => {
      const [x, y] = projection([d.lng, d.lat]);
      return `translate(${x}, ${y})`;
    })
    // 호버 진입 — 툴팁에 국가/도시/브랜드 목록 세팅
    .on("mouseenter", (event, d) => {
      const info = countryInfo[d.country];
      tooltipCountry.textContent = `${info.nameKo} · ${d.city}`;
      tooltipBrands.textContent = d.brands.map((b) => b.name).join(", ");
      tooltip.classList.add("show");
    })
    // 호버 중 마우스 이동 — 툴팁 위치를 map-container 기준으로 갱신
    .on("mousemove", (event) => {
      const rect = mapContainer.getBoundingClientRect();
      tooltip.style.left = (event.clientX - rect.left) + "px";
      tooltip.style.top = (event.clientY - rect.top) + "px";
    })
    // 호버 이탈 — 툴팁 숨김
    .on("mouseleave", () => {
      tooltip.classList.remove("show");
    });

  // ① pulse 링 — 각 마커마다 애니메이션 딜레이를 다르게 줘서 동시에 튀지 않도록
  markerG.append("circle")
    .attr("class", "marker-pulse")
    .attr("r", (d) => outerR(d))
    .style("animation-delay", (d, i) => `${(i * 0.35) % 2.4}s`);

  // ② 외부 링
  markerG.append("circle")
    .attr("class", "marker-ring")
    .attr("r", (d) => outerR(d));

  // ③ 내부 점
  markerG.append("circle")
    .attr("class", "marker-dot")
    .attr("r", (d) => innerR(d));


  // ---------- [3-7] 줌 동작 정의 (d3.zoom) ----------
  // 마우스 휠, 드래그, 더블클릭을 자동으로 처리
  const zoomBehavior = d3.zoom()
    .scaleExtent([1, 8])  // 최소 1배(초기) ~ 최대 8배
    .translateExtent([[0, 0], [MAP_WIDTH, MAP_HEIGHT]])  // 지도 경계 밖으로 못 나가게
    .on("zoom", (event) => {
      // 지도 본체에 transform 적용
      zoomGroup.attr("transform", event.transform);

      // 줌 시 마커 크기 보정 — sqrt(k)로 나눠서 줌인해도 너무 커지지 않도록
      const scale = Math.sqrt(event.transform.k);
      zoomGroup.selectAll(".marker-ring")
        .attr("r", (d) => outerR(d) / scale);
      zoomGroup.selectAll(".marker-dot")
        .attr("r", (d) => innerR(d) / scale);
      zoomGroup.selectAll(".marker-pulse")
        .attr("r", (d) => outerR(d) / scale);
    });

  svg.call(zoomBehavior);


  // ---------- [3-8] 줌 버튼 이벤트 바인딩 ----------
  // 확대 버튼 — 현재 배율에서 1.6배 더 확대
  document.getElementById("zoomIn").addEventListener("click", () => {
    svg.transition().duration(300).call(zoomBehavior.scaleBy, 1.6);
  });

  // 축소 버튼
  document.getElementById("zoomOut").addEventListener("click", () => {
    svg.transition().duration(300).call(zoomBehavior.scaleBy, 1 / 1.6);
  });

  // 리셋 버튼 — 초기 상태로 복귀
  document.getElementById("zoomReset").addEventListener("click", () => {
    svg.transition().duration(400).call(zoomBehavior.transform, d3.zoomIdentity);
  });
}
