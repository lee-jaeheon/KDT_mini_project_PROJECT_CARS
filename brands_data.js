/* ============================================================
   brands_data.js
   * 40개 자동차 브랜드 정보와 국가 매핑 데이터를 담은 파일
   * 이 파일은 다른 JS 파일들(map, cards, quiz)이 읽어서 사용
   * 브랜드 추가/수정 시 이 파일만 고치면 됨
   *
   * ★ 국가 분류 기준: "창업(설립)한 나라" 기준 (본사 위치 X)
   *   예) 부가티 → 프랑스 알자스에서 창업 → FR
============================================================ */


/* ==========================================================
   [1] 국가 정보 (ISO 2자리 코드 → 한글명 / ISO 3자리 코드)
============================================================ */
const countryInfo = {
  KR: { iso3: "KOR", nameKo: "대한민국" },
  DE: { iso3: "DEU", nameKo: "독일" },
  IT: { iso3: "ITA", nameKo: "이탈리아" },
  GB: { iso3: "GBR", nameKo: "영국" },
  US: { iso3: "USA", nameKo: "미국" },
  JP: { iso3: "JPN", nameKo: "일본" },
  SE: { iso3: "SWE", nameKo: "스웨덴" },
  FR: { iso3: "FRA", nameKo: "프랑스" },
  CN: { iso3: "CHN", nameKo: "중국" }
};


/* ==========================================================
   [2] 국가 표시 순서 — 지도·카드 섹션 양쪽에서 참조
============================================================ */
const countryOrder = ["KR", "JP", "CN", "DE", "IT", "FR", "SE", "GB", "US"];


/* ==========================================================
   [3] Natural Earth 숫자 ID → ISO 3자리 코드 매핑
   * world-atlas countries-110m.json이 feature.id에 숫자 코드(M49)를 사용
   * 8개국만 매핑 (나머지 국가는 지도 하이라이트 안 함)
============================================================ */
const NUMERIC_TO_ISO3 = {
  "410": "KOR",
  "276": "DEU",
  "380": "ITA",
  "826": "GBR",
  "840": "USA",
  "392": "JPN",
  "752": "SWE",
  "250": "FRA",
  "156": "CHN"
};


/* ==========================================================
   [4] 40개 브랜드 전체 데이터
   * name        : 한글 브랜드명
   * nameEn      : 영문 브랜드명
   * logoFile    : 로고 이미지 파일 키 → 경로: "logos/{logoFile}_logo.png"
   * country     : ISO 국가 코드 (창업한 나라 기준 — 본사 국가와 동일)
   * hqCity      : 현재 본사 도시명
   * hqLat/hqLng : 현재 본사 위도/경도 (지도 마커 좌표)
   * founded     : 설립연도
   * tier        : 'hyper' | 'luxury' | 'premium' | 'mass' (데이터 보존용, 카드에는 미표시)
   * keywords    : 핵심 키워드 2~3개 (카드 하단 태그로 표시)
   * url         : 공식 홈페이지 URL (카드 클릭 시 새 탭으로 이동)
   * desc        : 브랜드 소개 문구
============================================================ */
const allBrands = [

  // ================================================================
  // 대한민국 (3)
  // ================================================================
  {
    name: "현대",
    nameEn: "HYUNDAI",
    logoFile: "hyundai",
    country: "KR",
    hqCity: "서울",
    hqLat: 37.51, hqLng: 127.04,
    founded: 1967,
    tier: "mass",
    keywords: "전기차 · 수소차 · 글로벌 3위",
    url: "https://www.hyundai.com/kr/ko",
    desc: "국내 최대 완성차 브랜드. 아이오닉 시리즈로 EV 시장을 선도하며 수소차(넥쏘)에서도 경쟁력 보유. 글로벌 판매량 기준 세계 3위권의 완성차 그룹으로 성장."
  },
  {
    name: "기아",
    nameEn: "KIA",
    logoFile: "kia",
    country: "KR",
    hqCity: "서울",
    hqLat: 37.56, hqLng: 126.97,
    founded: 1944,
    tier: "mass",
    keywords: "EV · SUV · 디자인 혁신",
    url: "https://www.kia.com/kr/",
    desc: "1944년 자전거 부품 제조사로 출발한 역사적 브랜드. 2021년 로고와 BI를 전면 리뉴얼했으며, EV6·EV9로 디자인 혁신을 이끌며 미래 모빌리티 시장 공략 중."
  },
  {
    name: "제네시스",
    nameEn: "GENESIS",
    logoFile: "genesis",
    country: "KR",
    hqCity: "서울",
    hqLat: 37.53, hqLng: 127.02,
    founded: 2015,
    tier: "luxury",
    keywords: "프리미엄 EV · 럭셔리 · 현대그룹",
    url: "https://www.genesis.com/kr/ko/",
    desc: "현대자동차그룹이 2015년 출범시킨 럭셔리 브랜드. G80·GV80 등으로 벤츠·BMW에 도전하며 빠른 성장세. 전기차 GV60·G80 EV로 프리미엄 EV 시장도 공략 중."
  },
  {
    name: "KG모빌리티",
    namePronunciation: "케이지모빌리티",
    nameEn: "KG MOBILITY",
    logoFile: "kgmobility",
    country: "KR",
    hqCity: "서울",
    hqLat: 37.55, hqLng: 127.00,
    founded: 1954,
    tier: "mass",
    keywords: "토레스 · 구 쌍용 · SUV",
    url: "https://www.kgmobility.co.kr/",
    desc: "1954년 동아자동차로 출발해 쌍용자동차로 성장, 2023년 KG그룹이 인수 후 KG모빌리티로 사명 변경. 토레스·코란도·렉스턴 등 SUV 전문 브랜드로, 국내 독자 완성차 브랜드 중 하나."
  },

  // ================================================================
  // 독일 (7)
  // ================================================================
  {
    name: "포르쉐",
    nameEn: "PORSCHE",
    logoFile: "porsche",
    country: "DE",
    hqCity: "슈투트가르트",
    hqLat: 48.77, hqLng: 9.17,
    founded: 1931,
    tier: "luxury",
    keywords: "스포츠카 · 타이칸 EV · 911",
    url: "https://www.porsche.com/korea/",
    desc: "911을 중심으로 한 정통 스포츠카 브랜드. 타이칸으로 전기 스포츠카 영역도 성공적으로 확장. '엔지니어링의 정점'이라는 평가를 받으며 수익성이 가장 높은 자동차 브랜드 중 하나."
  },
  {
    name: "메르세데스-벤츠",
    nameEn: "MERCEDES",
    logoFile: "mercedes",
    country: "DE",
    hqCity: "슈투트가르트",
    hqLat: 48.78, hqLng: 9.18,
    founded: 1886,
    tier: "luxury",
    keywords: "세계 최초 · AMG · S-Class",
    url: "https://www.mercedes-benz.co.kr/",
    desc: "1886년 카를 벤츠가 세계 최초의 자동차를 발명한 정통 럭셔리 브랜드. S-Class·G-Class 등 상징적 모델을 보유하며, AMG 고성능 라인업으로 스포츠 세그먼트까지 커버."
  },
  {
    name: "BMW",
    namePronunciation: "비엠더블유",
    nameEn: "BMW",
    logoFile: "bmw",
    country: "DE",
    hqCity: "뮌헨",
    hqLat: 48.17, hqLng: 11.56,
    founded: 1916,
    tier: "premium",
    keywords: "주행의 즐거움 · M 디비전 · 전기차 i",
    url: "https://www.bmw.co.kr/",
    desc: "'주행의 즐거움(Freude am Fahren)'이 철학인 프리미엄 브랜드. 3·5시리즈, M 디비전으로 유명하며 MINI·롤스로이스도 그룹 산하에 보유. i 시리즈로 전동화 전환 추진 중."
  },
  {
    name: "마이바흐",
    nameEn: "MAYBACH",
    logoFile: "maybach",
    country: "DE",
    hqCity: "슈투트가르트",
    hqLat: 48.80, hqLng: 9.20,
    founded: 1909,
    tier: "hyper",
    keywords: "초럭셔리 · 쇼퍼드리븐 · 벤츠 산하",
    url: "https://www.mercedes-benz.com/en/maybach/",
    desc: "벤츠 산하의 초럭셔리 서브 브랜드. 롤스로이스와 경쟁하는 쇼퍼드리븐 세단을 제작하며, 메르세데스-마이바흐 S580이 대표 모델. 가격은 수억 원대부터 시작."
  },
  {
    name: "아우디",
    nameEn: "AUDI",
    logoFile: "audi",
    country: "DE",
    hqCity: "잉골슈타트",
    hqLat: 48.77, hqLng: 11.42,
    founded: 1909,
    tier: "premium",
    keywords: "콰트로 4WD · 기술 혁신 · e-tron",
    url: "https://www.audi.co.kr/ko.html",
    desc: "'Vorsprung durch Technik(기술을 통한 진보)'이 슬로건. 콰트로 상시사륜구동과 미래적 인테리어 디자인으로 유명. e-tron 시리즈로 전기차 시장을 공략 중."
  },
  {
    name: "폭스바겐",
    nameEn: "VW",
    logoFile: "volkswagen",
    country: "DE",
    hqCity: "볼프스부르크",
    hqLat: 52.42, hqLng: 10.79,
    founded: 1937,
    tier: "mass",
    keywords: "국민차 · 세계 1위 그룹 · ID 전기차",
    url: "https://www.volkswagen.co.kr/",
    desc: "'국민차'라는 뜻의 독일 대중 브랜드. 골프·폴로 등 스테디셀러와 ID 전기차 라인업 보유. 포르쉐·아우디·벤틀리·람보르기니 등 수십 개 브랜드를 거느린 세계 최대 자동차 그룹."
  },
  {
    name: "오펠",
    nameEn: "OPEL",
    logoFile: "opel",
    country: "DE",
    hqCity: "뤼셀스하임",
    hqLat: 50.00, hqLng: 8.41,
    founded: 1862,
    tier: "mass",
    keywords: "독일 대중차 · 스텔란티스 · 복스홀",
    url: "https://www.opel.com/",
    desc: "1862년 재봉틀 제조사로 출발한 독일의 오래된 대중 브랜드. 현재 스텔란티스 그룹 소속이며 합리적 가격대의 실용차를 생산. 영국에서는 복스홀(Vauxhall)이라는 이름으로 판매."
  },

  // ================================================================
  // 이탈리아 (6)
  // ================================================================
  {
    name: "람보르기니",
    nameEn: "LAMBORGHINI",
    logoFile: "lamborghini",
    country: "IT",
    hqCity: "산타가타 볼로녜세",
    hqLat: 44.66, hqLng: 11.13,
    founded: 1963,
    tier: "hyper",
    keywords: "하이퍼카 · V10·V12 · 공격적 디자인",
    url: "https://www.lamborghini.com/",
    desc: "페루치오 람보르기니가 페라리에 맞서기 위해 창업. 레부엘토·우라칸으로 대표되는 공격적 디자인이 시그니처. 현재 폭스바겐 그룹 산하에서 슈퍼카를 생산."
  },
  {
    name: "페라리",
    nameEn: "FERRARI",
    logoFile: "ferrari",
    country: "IT",
    hqCity: "마라넬로",
    hqLat: 44.53, hqLng: 10.86,
    founded: 1939,
    tier: "hyper",
    keywords: "F1 · 슈퍼카 · 희소성",
    url: "https://www.ferrari.com/",
    desc: "F1에서 가장 오래된 팀이자 이탈리안 슈퍼카의 상징. 도약하는 종마(Prancing Horse) 엠블럼이 시그니처. 연간 생산량을 제한해 희소성을 유지하는 전략으로 높은 브랜드 가치를 보유."
  },
  {
    name: "마세라티",
    nameEn: "MASERATI",
    logoFile: "maserati",
    country: "IT",
    hqCity: "모데나",
    hqLat: 44.65, hqLng: 10.93,
    founded: 1914,
    tier: "luxury",
    keywords: "삼지창 · 럭셔리 GT · 이탈리안",
    url: "https://www.maserati.com/",
    desc: "삼지창(트라이덴트) 엠블럼의 이탈리아 럭셔리 브랜드. 그란투리스모·콰트로포르테 등 우아한 GT와 세단으로 유명. 현재 스텔란티스 그룹 산하에서 전동화 라인업을 확장 중."
  },
  {
    name: "파가니",
    nameEn: "PAGANI",
    logoFile: "pagani",
    country: "IT",
    hqCity: "산 체사리오 술 파나로",
    hqLat: 44.57, hqLng: 11.02,
    founded: 1992,
    tier: "hyper",
    keywords: "수제 하이퍼카 · 카본파이버 · 소량 생산",
    url: "https://www.pagani.com/",
    desc: "호라시오 파가니가 창업한 하이퍼카 전문 브랜드. 존다·후아이라 등 예술품에 가까운 수제 슈퍼카를 연간 수십 대 소량 생산. 카본파이버 기술의 최전선에 있는 브랜드."
  },
  {
    name: "알파로메오",
    nameEn: "ALFA ROMEO",
    logoFile: "alfaromeo",
    country: "IT",
    hqCity: "토리노",
    hqLat: 45.07, hqLng: 7.69,
    founded: 1910,
    tier: "premium",
    keywords: "이탈리안 감성 · 스포티 · 줄리아",
    url: "https://www.alfaromeo.com/",
    desc: "감성적 디자인과 스포티한 주행감이 특징인 이탈리아 브랜드. 줄리아·스텔비오가 대표 모델. 뱀을 삼키는 뱀 엠블럼이 시그니처이며, 밀라노에서 시작된 100년 이상의 역사를 보유."
  },
  {
    name: "피아트",
    nameEn: "FIAT",
    logoFile: "fiat",
    country: "IT",
    hqCity: "토리노",
    hqLat: 45.05, hqLng: 7.67,
    founded: 1899,
    tier: "mass",
    keywords: "500 · 이탈리아 국민차 · 스텔란티스",
    url: "https://www.fiat.com/",
    desc: "1899년 토리노에서 설립된 이탈리아 최대 대중 브랜드. 500(친퀘첸토)은 도심형 소형차의 아이콘으로 전 세계에서 사랑받음. 현재 스텔란티스 그룹의 핵심 브랜드 중 하나."
  },

  // ================================================================
  // 영국 (6)
  // ================================================================
  {
    name: "롤스로이스",
    nameEn: "ROLLS-ROYCE",
    logoFile: "rollsroyce",
    country: "GB",
    hqCity: "굿우드",
    hqLat: 50.86, hqLng: -0.75,
    founded: 1904,
    tier: "hyper",
    keywords: "최고 럭셔리 · 수제 생산 · 스펙터 EV",
    url: "https://www.rolls-roycemotorcars.com/",
    desc: "영국 왕실과도 연관된 세계 최고의 쇼퍼드리븐 럭셔리 브랜드. 현재 BMW 그룹 소속. '세계 최고의 차'라는 자부심 아래 모든 차를 수제 생산하며, 스펙터로 전기차 시대를 선언."
  },
  {
    name: "벤틀리",
    nameEn: "BENTLEY",
    logoFile: "bentley",
    country: "GB",
    hqCity: "크루",
    hqLat: 53.09, hqLng: -2.44,
    founded: 1919,
    tier: "luxury",
    keywords: "그랜드 투어러 · W12 · 르망",
    url: "https://www.bentleymotors.com/",
    desc: "W12/V8 엔진의 그랜드 투어러로 유명한 영국 럭셔리 브랜드. 현재 폭스바겐 그룹 소속. 컨티넨탈 GT가 대표 모델이며, 르망 24시간 레이스에서 쌓은 모터스포츠 유산이 브랜드 핵심."
  },
  {
    name: "맥라렌",
    nameEn: "MCLAREN",
    logoFile: "mclaren",
    country: "GB",
    hqCity: "워킹",
    hqLat: 51.32, hqLng: -0.56,
    founded: 1985,
    tier: "hyper",
    keywords: "F1 기술 · 카본 모노코크 · 750S",
    url: "https://www.mclaren.com/",
    desc: "F1 레이싱 팀으로 시작한 브랜드. 750S·아르투라 등 카본 모노코크 기반 슈퍼카 전문. 모든 차에 F1 기술을 직접 이전한다는 철학으로, 경량화와 공기역학에서 독보적인 위치."
  },
  {
    name: "애스턴마틴",
    nameEn: "ASTON MARTIN",
    logoFile: "astonmartin",
    country: "GB",
    hqCity: "게이던",
    hqLat: 52.17, hqLng: -1.49,
    founded: 1913,
    tier: "luxury",
    keywords: "007 · GT · DB 시리즈",
    url: "https://www.astonmartin.com/",
    desc: "007 제임스 본드의 차로 유명한 영국 GT 브랜드. DB 시리즈가 대표 모델. 우아한 영국 신사 이미지와 고성능의 이중적 매력을 내세우며, 발할라·발키리 등 하이퍼카 라인업도 보유."
  },
  {
    name: "재규어",
    nameEn: "JAGUAR",
    logoFile: "jaguar",
    country: "GB",
    hqCity: "코번트리",
    hqLat: 52.41, hqLng: -1.51,
    founded: 1922,
    tier: "premium",
    keywords: "영국 프리미엄 · 전기차 전환 · 재탄생",
    url: "https://www.jaguar.com/",
    desc: "우아한 영국 프리미엄 브랜드. 최근 전면 전기차 브랜드로 재탄생을 선언하며 업계의 주목을 받음. 새 로고와 브랜드 아이덴티티로 2026년부터 순수 전기차만 출시 예정."
  },
  {
    name: "랜드로버",
    nameEn: "LAND ROVER",
    logoFile: "landrover",
    country: "GB",
    hqCity: "솔리헐",
    hqLat: 52.41, hqLng: -1.78,
    founded: 1948,
    tier: "premium",
    keywords: "오프로드 · 레인지로버 · 디펜더",
    url: "https://www.landrover.com/",
    desc: "정통 오프로더 SUV의 대명사. 디펜더·디스커버리·레인지로버 등 각 세그먼트를 대표하는 모델 보유. 재규어와 함께 JLR(재규어랜드로버) 그룹을 구성하며 인도 타타모터스 소속."
  },
  {
    name: "MINI",
    namePronunciation: "미니",
    nameEn: "MINI",
    logoFile: "mini",
    country: "GB",
    hqCity: "옥스퍼드",
    hqLat: 51.75, hqLng: -1.25,
    founded: 1959,
    tier: "premium",
    keywords: "도심형 · BMW그룹 · 쿠퍼",
    url: "https://www.mini.com/",
    desc: "1959년 알렉 이시고니스가 설계한 소형차의 아이콘. 현재 BMW 그룹 소속이며 독특한 개성과 도심 주행 특화 설계로 세계적인 팬덤 보유. 전기차 MINI Electric·에이스먼으로 전동화 전환 중."
  },
  {
    name: "로터스",
    nameEn: "LOTUS",
    logoFile: "lotus",
    country: "GB",
    hqCity: "헤델",
    hqLat: 52.53, hqLng: 1.00,
    founded: 1948,
    tier: "luxury",
    keywords: "경량 스포츠카 · 엘리스 · 지리그룹",
    url: "https://www.lotuscars.com/",
    desc: "1948년 콜린 채프먼이 창업한 영국 경량 스포츠카 브랜드. '단순화하고 더해라(Simplify, then add lightness)'가 철학. 현재 중국 지리자동차 그룹 소속으로 전동화 전환 중."
  },

  // ================================================================
  // 미국 (6)
  // ================================================================
  {
    name: "테슬라",
    nameEn: "TESLA",
    logoFile: "tesla",
    country: "US",
    hqCity: "오스틴",
    hqLat: 30.22, hqLng: -97.77,
    founded: 2003,
    tier: "premium",
    keywords: "순수 EV · 오토파일럿 · 슈퍼차저",
    url: "https://www.tesla.com/",
    desc: "Model S/3/X/Y로 전기차 시장을 재편한 순수 EV 브랜드. 오토파일럿 자율주행 기술 선도. 슈퍼차저 충전 네트워크라는 강력한 인프라와 OTA 소프트웨어 업데이트로 차별화."
  },
  {
    name: "포드",
    nameEn: "FORD",
    logoFile: "ford",
    country: "US",
    hqCity: "디어본",
    hqLat: 42.32, hqLng: -83.18,
    founded: 1903,
    tier: "mass",
    keywords: "대량생산 · 머스탱 · F-150",
    url: "https://www.ford.com/",
    desc: "컨베이어 벨트 대량생산을 도입한 자동차 대중화의 주역. 머스탱·F-150 등 상징적 모델 보유. F-150 라이트닝으로 픽업트럭 전동화에 도전하며 미국 자동차 문화의 상징으로 자리매김."
  },
  {
    name: "쉐보레",
    nameEn: "CHEVROLET",
    logoFile: "chevrolet",
    country: "US",
    hqCity: "디트로이트",
    hqLat: 42.33, hqLng: -83.04,
    founded: 1911,
    tier: "mass",
    keywords: "콜벳 · 카마로 · 머슬카",
    url: "https://www.chevrolet.com/",
    desc: "GM 그룹의 대표 대중 브랜드. 콜벳·카마로 등 머슬카부터 실버라도 픽업까지 폭넓은 라인업. 나비 넥타이(보타이) 엠블럼이 트레이드마크이며 남미 시장에서도 강한 입지를 보유."
  },
  {
    name: "캐딜락",
    nameEn: "CADILLAC",
    logoFile: "cadillac",
    country: "US",
    hqCity: "디트로이트",
    hqLat: 42.36, hqLng: -83.07,
    founded: 1902,
    tier: "luxury",
    keywords: "미국 럭셔리 · 에스컬레이드 · 리릭 EV",
    url: "https://www.cadillac.com/",
    desc: "미국을 대표하는 럭셔리 브랜드. 에스컬레이드 대형 SUV와 CT 세단 시리즈로 유명. '미국 명품차의 기준'이라는 슬로건 아래, 리릭 EV로 전기 럭셔리 시장에 도전 중."
  },
  {
    name: "지프",
    nameEn: "JEEP",
    logoFile: "jeep",
    country: "US",
    hqCity: "톨레도",
    hqLat: 41.66, hqLng: -83.56,
    founded: 1941,
    tier: "mass",
    keywords: "오프로드 · 랭글러 · 군용차 기원",
    url: "https://www.jeep.com/",
    desc: "2차 세계대전 군용차에서 출발한 오프로드 SUV 전문 브랜드. 랭글러·그랜드 체로키가 상징. 7개의 슬롯 그릴이 세계 어디서든 인식되는 아이콘이며, 현재 스텔란티스 그룹 소속."
  },
  {
    name: "닷지",
    nameEn: "DODGE",
    logoFile: "dodge",
    country: "US",
    hqCity: "디트로이트",
    hqLat: 42.31, hqLng: -83.10,
    founded: 1900,
    tier: "mass",
    keywords: "머슬카 · 챌린저 · 전기 머슬카",
    url: "https://www.dodge.com/",
    desc: "미국 머슬카 문화의 상징. 챌린저·차저 등 강력한 V8 엔진 라인업으로 유명하며 현재 스텔란티스 그룹 소속. 차저 데이토나 EV로 '전기 머슬카' 시대를 선언하며 새 챕터를 열고 있음."
  },
  {
    name: "링컨",
    nameEn: "LINCOLN",
    logoFile: "lincoln",
    country: "US",
    hqCity: "디어본",
    hqLat: 42.30, hqLng: -83.19,
    founded: 1917,
    tier: "luxury",
    keywords: "미국 럭셔리 · 에비에이터 · 포드그룹",
    url: "https://www.lincoln.com/",
    desc: "포드의 럭셔리 서브 브랜드. 에이브러햄 링컨 대통령의 이름을 딴 브랜드로 미국 대통령 전용차 전통을 보유. 네비게이터·에비에이터로 미국형 럭셔리 SUV 시장을 공략."
  },
  {
    name: "뷰익",
    nameEn: "BUICK",
    logoFile: "buick",
    country: "US",
    hqCity: "디트로이트",
    hqLat: 42.35, hqLng: -83.06,
    founded: 1899,
    tier: "premium",
    keywords: "GM 프리미엄 · 중국 인기 · 엔클레이브",
    url: "https://www.buick.com/",
    desc: "GM 그룹의 프리미엄 브랜드로 캐딜락 아래 포지셔닝. 미국보다 중국에서 더 큰 인기를 누리며 중국 시장 주요 브랜드로 자리매김. 엔클레이브·앙코르 등 SUV가 주력."
  },

  // ================================================================
  // 일본 (6)
  // ================================================================
  {
    name: "토요타",
    nameEn: "TOYOTA",
    logoFile: "toyota",
    country: "JP",
    hqCity: "토요타시",
    hqLat: 35.08, hqLng: 137.16,
    founded: 1937,
    tier: "mass",
    keywords: "세계 판매 1위 · 하이브리드 · 수소차",
    url: "https://www.toyota.com/",
    desc: "세계 판매량 1위의 일본 대표 브랜드. 프리우스로 하이브리드 시장을 개척했으며 TPS(도요타 생산 방식)는 제조업의 교과서로 불림. GR 고성능 라인업과 수소차 미라이도 보유."
  },
  {
    name: "혼다",
    nameEn: "HONDA",
    logoFile: "honda",
    country: "JP",
    hqCity: "도쿄",
    hqLat: 35.67, hqLng: 139.76,
    founded: 1948,
    tier: "mass",
    keywords: "VTEC · NSX · F1 엔진",
    url: "https://www.honda.com/",
    desc: "오토바이에서 출발한 엔지니어링 강점의 브랜드. 시빅·어코드 등 글로벌 베스트셀러 보유. VTEC 엔진 기술과 NSX 슈퍼카로 성능에 대한 열정을 증명하며 F1에도 엔진 공급 중."
  },
  {
    name: "닛산",
    nameEn: "NISSAN",
    logoFile: "nissan",
    country: "JP",
    hqCity: "요코하마",
    hqLat: 35.45, hqLng: 139.63,
    founded: 1933,
    tier: "mass",
    keywords: "GT-R · 리프 EV · 르노 얼라이언스",
    url: "https://www.nissan-global.com/",
    desc: "GT-R(닛산의 슈퍼카)로 유명한 일본 대중 브랜드. 리프로 양산형 전기차 시장을 세계 최초로 개척. 르노·미쓰비시와 얼라이언스를 구성하며 글로벌 시장에서 협력 관계 유지."
  },
  {
    name: "렉서스",
    nameEn: "LEXUS",
    logoFile: "lexus",
    country: "JP",
    hqCity: "나고야",
    hqLat: 35.18, hqLng: 136.91,
    founded: 1989,
    tier: "luxury",
    keywords: "일본 럭셔리 · LFA · 정숙성",
    url: "https://www.lexus.com/",
    desc: "토요타가 북미 럭셔리 시장 공략을 위해 1989년 출범시킨 프리미엄 브랜드. LS 세단으로 데뷔해 뛰어난 품질과 정숙성으로 일본 럭셔리의 기준을 제시. LFA 슈퍼카와 LC 쿠페도 보유."
  },
  {
    name: "마쓰다",
    nameEn: "MAZDA",
    logoFile: "mazda",
    country: "JP",
    hqCity: "히로시마",
    hqLat: 34.39, hqLng: 132.46,
    founded: 1920,
    tier: "premium",
    keywords: "로터리 엔진 · 魂動 디자인 · RX-7",
    url: "https://www.mazda.com/",
    desc: "1920년 히로시마에서 창업한 독립 브랜드. 로터리 엔진 RX-7·RX-8로 유명하며, '魂動(Soul of Motion)' 디자인 철학과 운전의 즐거움(Jinba Ittai)을 중시하는 프리미엄 대중 브랜드."
  },
  {
    name: "아큐라",
    nameEn: "ACURA",
    logoFile: "acura",
    country: "JP",
    hqCity: "도쿄",
    hqLat: 35.66, hqLng: 139.75,
    founded: 1986,
    tier: "premium",
    keywords: "NSX · 북미 전용 · 혼다 프리미엄",
    url: "https://www.acura.com/",
    desc: "혼다가 북미 시장을 겨냥해 만든 프리미엄 브랜드. NSX 슈퍼카로 유명하며, MDX·RDX 등 SUV 라인업으로 북미 럭셔리 시장에서 안정적인 위치 유지. 일본 외 지역 전용 브랜드."
  },
  {
    name: "미쓰비시",
    nameEn: "MITSUBISHI",
    logoFile: "mitsubishi",
    country: "JP",
    hqCity: "도쿄",
    hqLat: 35.69, hqLng: 139.75,
    founded: 1917,
    tier: "mass",
    keywords: "삼릉 · SUV · 르노닛산 얼라이언스",
    url: "https://www.mitsubishi-motors.com/",
    desc: "세 개의 마름모(삼릉) 엠블럼의 일본 브랜드. 파제로·아웃랜더 등 SUV와 플러그인 하이브리드로 유명. 르노-닛산-미쓰비시 얼라이언스 소속이며, 과거 현대자동차와 기술 협력 이력도 보유."
  },

  // ================================================================
  // 스웨덴 (2)
  // ================================================================
  {
    name: "볼보",
    nameEn: "VOLVO",
    logoFile: "volvo",
    country: "SE",
    hqCity: "예테보리",
    hqLat: 57.71, hqLng: 11.97,
    founded: 1927,
    tier: "premium",
    keywords: "안전 · 3점 벨트 · 전동화",
    url: "https://www.volvocars.com/ko/",
    desc: "안전의 대명사인 스웨덴 프리미엄 브랜드. 3점식 안전벨트를 세계 최초로 도입해 특허를 무료 공개하는 선택을 했음. 현재 중국 지리자동차 산하에서 전 라인업 전동화를 추진 중."
  },
  {
    name: "코닉세그",
    nameEn: "KOENIGSEGG",
    logoFile: "koenigsegg",
    country: "SE",
    hqCity: "앵엘홀름",
    hqLat: 56.24, hqLng: 12.86,
    founded: 1994,
    tier: "hyper",
    keywords: "하이퍼카 · 제스코 · 세계 최고속",
    url: "https://www.koenigsegg.com/",
    desc: "스웨덴의 하이퍼카 전문 브랜드. 제스코·레게라 등 혁신적 기술을 탑재한 극소량 생산 슈퍼카로 유명. 독자 개발한 '캠리스(Camless)' 엔진과 하이브리드 기술로 세계 최고속 기록에 도전 중."
  },
  {
    name: "폴스타",
    nameEn: "POLESTAR",
    logoFile: "polestar",
    country: "SE",
    hqCity: "예테보리",
    hqLat: 57.72, hqLng: 11.98,
    founded: 2017,
    tier: "premium",
    keywords: "순수 EV · 볼보 · 지리 합작",
    url: "https://www.polestar.com/",
    desc: "볼보와 지리자동차의 합작으로 2017년 출범한 순수 전기차 브랜드. 폴스타2·폴스타3 등 미니멀한 스칸디나비아 디자인과 고성능을 결합. 직영 온라인 판매 방식으로 새로운 구매 경험 제시."
  },

  // ================================================================
  // 프랑스 (4)
  // ================================================================
  {
    name: "부가티",
    nameEn: "BUGATTI",
    logoFile: "bugatti",
    country: "FR",
    hqCity: "몰스하임",
    hqLat: 48.54, hqLng: 7.50,
    founded: 1909,
    tier: "hyper",
    keywords: "하이퍼카 · 시론 · 세계 최고속",
    url: "https://www.bugatti.com/",
    desc: "1909년 프랑스 알자스 몰스하임에서 에토레 부가티가 창업한 하이퍼카 브랜드. 시론·베이런 등 세계 최고속 양산차 기록을 보유. 현재 포르쉐와 합작으로 새로운 미래를 준비 중."
  },
  {
    name: "푸조",
    nameEn: "PEUGEOT",
    logoFile: "peugeot",
    country: "FR",
    hqCity: "파리",
    hqLat: 48.85, hqLng: 2.35,
    founded: 1810,
    tier: "mass",
    keywords: "사자 엠블럼 · 208 · 유럽 베스트셀러",
    url: "https://www.peugeot.com/",
    desc: "사자 엠블럼의 프랑스 대표 대중 브랜드. 1810년 철제품 회사로 시작한 세계에서 가장 오래된 자동차 브랜드 중 하나. 208·3008 등 세련된 디자인의 실용차로 유럽 시장을 주도."
  },
  {
    name: "르노",
    nameEn: "RENAULT",
    logoFile: "renault",
    country: "FR",
    hqCity: "불로뉴비양쿠르",
    hqLat: 48.83, hqLng: 2.24,
    founded: 1899,
    tier: "mass",
    keywords: "F1 · 클리오 · 닛산 얼라이언스",
    url: "https://www.renault.com/",
    desc: "1899년 창업한 프랑스 대표 대중 브랜드. F1 팀 운영 경험을 바탕으로 한 기술력이 특징. 클리오·메간이 유럽 베스트셀러이며, 닛산·미쓰비시와 얼라이언스를 구성해 글로벌 3위권 그룹 운영."
  },
  {
    name: "시트로엥",
    nameEn: "CITROËN",
    logoFile: "citroen",
    country: "FR",
    hqCity: "파리",
    hqLat: 48.84, hqLng: 2.33,
    founded: 1919,
    tier: "mass",
    keywords: "DS · 2CV · 혁신 서스펜션",
    url: "https://www.citroen.com/",
    desc: "1919년 앙드레 시트로엥이 창업한 혁신적 프랑스 브랜드. 유압식 서스펜션(하이드로뉴매틱)을 탑재한 DS, '못생긴 오리'로 불린 2CV 등 시대를 앞선 독창적 기술로 유명. 현재 스텔란티스 그룹 소속."
  },
  {
    name: "DS 오토모빌",
    namePronunciation: "디에스 오토모빌",
    nameEn: "DS AUTOMOBILES",
    logoFile: "ds",
    country: "FR",
    hqCity: "생투앙",
    hqLat: 48.90, hqLng: 2.33,
    founded: 2014,
    tier: "premium",
    keywords: "프렌치 럭셔리 · 스텔란티스 · DS7",
    url: "https://www.dsautomobiles.com/",
    desc: "시트로엥의 프리미엄 라인에서 2014년 독립 브랜드로 분리. 프랑스 엘리제궁 공식 차량 납품 브랜드로, 독창적인 파리지앵 럭셔리 감성이 특징. DS7·DS9 등 고급 SUV와 세단 라인업 보유."
  },

  // ================================================================
  // 중국 (3)
  // ================================================================
  {
    name: "BYD",
    namePronunciation: "비와이디",
    nameEn: "BYD",
    logoFile: "byd",
    country: "CN",
    hqCity: "선전",
    hqLat: 22.54, hqLng: 114.06,
    founded: 1995,
    tier: "mass",
    keywords: "세계 EV 1위 · 배터리 · 수직계열화",
    url: "https://www.byd.com/",
    desc: "1995년 배터리 제조사로 출발해 세계 최대 전기차 브랜드로 성장. 2023년 테슬라를 제치고 전기차 판매 세계 1위 달성. 배터리부터 완성차까지 수직계열화된 독자 기술력이 핵심 경쟁력."
  },
  {
    name: "니오",
    nameEn: "NIO",
    logoFile: "nio",
    country: "CN",
    hqCity: "상하이",
    hqLat: 31.23, hqLng: 121.47,
    founded: 2014,
    tier: "premium",
    keywords: "프리미엄 EV · 배터리 교환 · ET7",
    url: "https://www.nio.com/",
    desc: "2014년 상하이에서 창업한 중국 프리미엄 EV 브랜드. 수 분 만에 배터리를 교체하는 Battery Swap 방식으로 충전 문제를 해결한 혁신적 접근이 특징. ET7·ES8 등 고급 라인업으로 테슬라에 도전 중."
  },
  {
    name: "지리",
    nameEn: "GEELY",
    logoFile: "geely",
    country: "CN",
    hqCity: "항저우",
    hqLat: 30.27, hqLng: 120.15,
    founded: 1986,
    tier: "mass",
    keywords: "볼보 인수 · 글로벌 그룹 · 전동화",
    url: "https://www.geely.com/",
    desc: "1986년 창업한 중국 대표 민영 자동차 그룹. 2010년 볼보 인수를 시작으로 로터스·스마트 등 글로벌 브랜드를 적극 인수하며 국제적 입지를 구축. 현재 전 세계 10개 이상의 브랜드를 거느린 대형 자동차 그룹."
  }

];


/* ==========================================================
   [5] 파생 데이터 — 국가별로 묶은 브랜드 맵
============================================================ */
const brandsByCountry = {};
allBrands.forEach((brand) => {
  if (!brandsByCountry[brand.country]) brandsByCountry[brand.country] = [];
  brandsByCountry[brand.country].push(brand);
});


/* ==========================================================
   [6] 파생 데이터 — 브랜드 창업국의 ISO3 Set
   * 지도에서 해당 국가를 하이라이트할 때 사용
============================================================ */
const brandCountryISO3 = new Set(
  countryOrder.map((code) => countryInfo[code].iso3)
);


/* ==========================================================
   [7] 브랜드 그룹 (계통도용)
   * brands 배열에는 logoFile 값을 사용
============================================================ */
const brandGroups = [
  {
    nameKo: "현대자동차그룹",
    nameEn: "Hyundai Motor Group",
    brands: ["hyundai", "kia", "genesis"]
  },
  {
    nameKo: "폭스바겐그룹",
    nameEn: "Volkswagen Group",
    brands: ["volkswagen", "audi", "porsche", "lamborghini", "bugatti", "bentley"]
  },
  {
    nameKo: "메르세데스-벤츠그룹",
    nameEn: "Mercedes-Benz Group",
    brands: ["mercedes", "maybach"]
  },
  {
    nameKo: "BMW그룹",
    nameEn: "BMW Group",
    brands: ["bmw", "rollsroyce", "mini"]
  },
  {
    nameKo: "스텔란티스",
    nameEn: "Stellantis",
    brands: ["fiat", "alfaromeo", "maserati", "ds", "jeep", "dodge", "peugeot", "citroen", "opel"]
  },
  {
    nameKo: "르노-닛산-미쓰비시 얼라이언스",
    nameEn: "Renault–Nissan–Mitsubishi Alliance",
    brands: ["renault", "nissan", "mitsubishi"]
  },
  {
    nameKo: "토요타그룹",
    nameEn: "Toyota Group",
    brands: ["toyota", "lexus"]
  },
  {
    nameKo: "혼다그룹",
    nameEn: "Honda Group",
    brands: ["honda", "acura"]
  },
  {
    nameKo: "제너럴모터스",
    nameEn: "General Motors",
    brands: ["chevrolet", "cadillac", "buick"]
  },
  {
    nameKo: "포드그룹",
    nameEn: "Ford Motor Company",
    brands: ["ford", "lincoln"]
  },
  {
    nameKo: "지리그룹",
    nameEn: "Geely Holding Group",
    brands: ["geely", "volvo", "polestar", "lotus"]
  },
  {
    nameKo: "JLR · 타타모터스",
    nameEn: "Jaguar Land Rover · Tata Motors",
    brands: ["jaguar", "landrover"]
  },
  {
    nameKo: "독립 브랜드",
    nameEn: "Independent",
    brands: ["tesla", "ferrari", "pagani", "mclaren", "astonmartin", "koenigsegg", "mazda", "byd", "nio", "kgmobility"]
  }
];

