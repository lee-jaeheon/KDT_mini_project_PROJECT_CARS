/* ============================================================
   brands_game.js
   * 초성 퀴즈 & 국가 퀴즈 게임 로직
   *
   * 의존성:
   *   brands_data.js — allBrands, countryInfo, countryOrder, brandsByCountry
============================================================ */


/* ==========================================================
   [1] 상수 & 국가 이모지
============================================================ */

const ROUNDS_CHO     = 10;
const ROUNDS_COUNTRY = 9;
function getTotalRounds() {
  return state.game === "country" ? ROUNDS_COUNTRY : ROUNDS_CHO;
}

const COUNTRY_FLAGS = {
  KR: "🇰🇷",
  DE: "🇩🇪",
  IT: "🇮🇹",
  GB: "🇬🇧",
  US: "🇺🇸",
  JP: "🇯🇵",
  SE: "🇸🇪",
  FR: "🇫🇷",
  CN: "🇨🇳"
};

/* 한글 초성 19개 */
const CHOSUNG = [
  "ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ",
  "ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"
];


/* ==========================================================
   [2] 한글 초성 추출 함수
   * 한글 음절(가~힣)이면 초성을 반환
   * 영문·하이픈·숫자 등 비한글 문자는 그대로 유지
   * 예) 롤스로이스 → ㄹㅅㄹㅇㅅ
   *     메르세데스-벤츠 → ㅁㄹㅅㄷㅅ-ㅂㅊ
============================================================ */

function getChosung(str) {
  return str.split("").map((char) => {
    const code = char.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) {
      // 한글 음절: (code - 0xAC00) / (21 * 28) 의 몫이 초성 인덱스
      return CHOSUNG[Math.floor((code - 0xAC00) / (21 * 28))];
    }
    return char; // 비한글 문자 그대로
  }).join("");
}


/* ==========================================================
   [3] 게임 상태
============================================================ */

const state = {
  game: null,               // 'cho' | 'country'
  round: 0,
  score: 0,
  answered: false,
  correctChoiceIndex: null,
  correctBrand: null,
  correctAnswer: null,      // 초성 퀴즈 정답 문자열 (namePronunciation 우선)

  // 초성 퀴즈: 이미 출제된 브랜드 인덱스 (중복 방지)
  usedBrandIndices: [],

  // 국가 퀴즈: 셔플된 국가 배열 + 포인터
  shuffledCountries: [],
  countryPointer: 0,
};


/* ==========================================================
   [4] 유틸 함수
============================================================ */

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id) {
  document.querySelectorAll(".game-screen").forEach((el) =>
    el.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}


/* ==========================================================
   [5] 게임 시작
============================================================ */

function startGame(type) {
  state.game = type;
  state.round = 0;
  state.score = 0;
  state.answered = false;
  state.usedBrandIndices = [];
  state.shuffledCountries = shuffle([...countryOrder]);
  state.countryPointer = 0;

  document.getElementById("gameTitle").textContent =
    type === "cho" ? "초성 퀴즈" : "국가 퀴즈";

  showScreen("gameScreen");
  nextQuestion();
}


/* ==========================================================
   [6] 다음 문제
============================================================ */

function nextQuestion() {
  state.round++;
  state.answered = false;

  document.getElementById("roundDisplay").textContent =
    `${state.round} / ${getTotalRounds()}`;
  document.getElementById("scoreDisplay").textContent =
    `${state.score}점`;

  const pct = ((state.round - 1) / getTotalRounds()) * 100;
  document.getElementById("progressFill").style.width = pct + "%";

  document.getElementById("feedbackArea").innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("choicesArea").classList.remove("answered");

  if (state.game === "cho") renderChoQuestion();
  else renderCountryQuestion();
}


/* ==========================================================
   [7] 초성 퀴즈 문제 렌더링 — 서술형 (직접 입력)
   * 브랜드 한글 이름을 초성으로 변환해서 표시
   * 입력창에 직접 타이핑 → 확인 버튼 또는 Enter로 제출
   * 힌트 버튼 클릭 시 국가 · 설립연도 · 키워드 공개
============================================================ */

function renderChoQuestion() {
  const available = allBrands
    .map((b, i) => ({ b, i }))
    .filter(({ i }) => !state.usedBrandIndices.includes(i));

  const pick = available[Math.floor(Math.random() * available.length)];
  state.correctBrand = pick.b;
  state.usedBrandIndices.push(pick.i);

  // 한국어 발음이 별도로 있는 브랜드(BMW, BYD 등)는 그 발음으로 초성 표시 & 정답 처리
  const answerName = pick.b.namePronunciation || pick.b.name;
  state.correctAnswer = answerName;

  const cho = getChosung(answerName);
  const hint =
    `${countryInfo[pick.b.country].nameKo} · ${pick.b.founded}년 설립 · ${pick.b.keywords}`;

  // ── 질문 영역 ──
  document.getElementById("questionArea").innerHTML = `
    <div class="cho-question">
      <div class="cho-display">${cho}</div>
      <p class="question-label">이 브랜드의 이름은?</p>
      <div class="hint-area">
        <button class="hint-btn" onclick="toggleHint(this)">힌트 보기</button>
        <div class="hint-text" style="display:none;">${hint}</div>
      </div>
    </div>
  `;

  // ── 입력창 + 확인 버튼 ──
  document.getElementById("choicesArea").innerHTML = `
    <div class="cho-input-area">
      <input
        type="text"
        id="choInput"
        class="cho-input"
        placeholder="브랜드 이름을 입력하세요"
        autocomplete="off"
        maxlength="20"
      >
      <button class="cho-submit-btn" onclick="submitChoAnswer()">확인</button>
    </div>
  `;

  // Enter 키로도 제출 가능
  document.getElementById("choInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitChoAnswer();
  });

  // 입력창에 자동 포커스
  setTimeout(() => document.getElementById("choInput")?.focus(), 50);
}


/* ==========================================================
   [7-1] 초성 퀴즈 정답 체크
   * 하이픈·공백을 제거한 뒤 비교 (예: "메르세데스 벤츠" = "메르세데스-벤츠" 허용)
============================================================ */

function normalize(str) {
  return str.trim().replace(/[\s\-·]/g, "");
}

function submitChoAnswer() {
  if (state.answered) return;

  const input = document.getElementById("choInput");
  if (!input) return;

  const userAnswer = input.value;
  if (!userAnswer.trim()) return; // 빈 입력 무시

  state.answered = true;

  // 입력창·확인 버튼 비활성화
  input.disabled = true;
  const submitBtn = document.querySelector(".cho-submit-btn");
  if (submitBtn) submitBtn.disabled = true;

  const correctName = state.correctAnswer || state.correctBrand.name;
  const isCorrect = normalize(userAnswer) === normalize(correctName);

  if (isCorrect) {
    state.score++;
    input.classList.add("cho-input-correct");
    document.getElementById("feedbackArea").innerHTML =
      `<span class="feedback-correct">정답입니다!</span>`;
  } else {
    input.classList.add("cho-input-wrong");
    document.getElementById("feedbackArea").innerHTML =
      `<span class="feedback-wrong">아쉽게도 틀렸습니다. 정답은 <strong>${correctName}</strong>이었습니다!</span>`;
  }

  document.getElementById("scoreDisplay").textContent = `${state.score}점`;

  const nextBtn = document.getElementById("nextBtn");
  nextBtn.style.display = "block";
  nextBtn.textContent =
    state.round >= getTotalRounds() ? "결과 보기 →" : "다음 문제 →";
}


/* ==========================================================
   [8] 힌트 토글
============================================================ */

function toggleHint(btn) {
  const hintText = btn.nextElementSibling;
  const isHidden = hintText.style.display === "none";
  hintText.style.display = isHidden ? "block" : "none";
  btn.textContent = isHidden ? "힌트 숨기기" : "힌트 보기";
}


/* ==========================================================
   [9] 국가 퀴즈 문제 렌더링
============================================================ */

function renderCountryQuestion() {
  if (state.countryPointer >= state.shuffledCountries.length) {
    state.shuffledCountries = shuffle([...countryOrder]);
    state.countryPointer = 0;
  }
  const country = state.shuffledCountries[state.countryPointer++];
  const info = countryInfo[country];

  const countryBrands = brandsByCountry[country];
  const correct = countryBrands[Math.floor(Math.random() * countryBrands.length)];
  state.correctBrand = correct;

  const wrong = shuffle(allBrands.filter((b) => b.country !== country)).slice(0, 4);
  const choices = shuffle([correct, ...wrong]);
  state.correctChoiceIndex = choices.indexOf(correct);

  // ── 질문 영역 ──
  document.getElementById("questionArea").innerHTML = `
    <div class="country-question">
      <div class="country-name">${info.nameKo}</div>
      <p class="question-label">이 나라의 자동차 브랜드는?</p>
    </div>
  `;

  // ── 보기 (5개 — 2열, 5번째 전체 너비) ──
  document.getElementById("choicesArea").innerHTML = `
    <div class="choices-grid">
      ${choices.map((b, i) => `
        <button class="choice-btn choice-btn-with-logo" onclick="selectChoice(${i})">
          <img
            src="logos/${b.logoFile}_logo.png"
            alt="${b.nameEn}"
            class="choice-mini-logo"
            onerror="this.style.display='none';"
          >
          <span>${b.name}</span>
        </button>
      `).join("")}
    </div>
  `;
}


/* ==========================================================
   [10] 보기 선택 처리
============================================================ */

function selectChoice(selectedIdx) {
  if (state.answered) return;
  state.answered = true;

  const buttons = document.querySelectorAll(".choice-btn");
  const isCorrect = selectedIdx === state.correctChoiceIndex;

  if (isCorrect) {
    state.score++;
    buttons[selectedIdx].classList.add("correct");
    document.getElementById("feedbackArea").innerHTML =
      `<span class="feedback-correct">정답입니다!</span>`;
  } else {
    buttons[selectedIdx].classList.add("wrong");
    buttons[state.correctChoiceIndex].classList.add("correct");
    document.getElementById("feedbackArea").innerHTML =
      `<span class="feedback-wrong">아쉽게도 틀렸습니다. 정답은 <strong>${state.correctBrand.name}</strong>이었습니다!</span>`;
  }

  document.getElementById("scoreDisplay").textContent = `${state.score}점`;
  document.getElementById("choicesArea").classList.add("answered");

  const nextBtn = document.getElementById("nextBtn");
  nextBtn.style.display = "block";
  nextBtn.textContent =
    state.round >= getTotalRounds() ? "결과 보기 →" : "다음 문제 →";
}


/* ==========================================================
   [11] 다음 버튼
============================================================ */

function handleNext() {
  if (state.round >= getTotalRounds()) showResult();
  else nextQuestion();
}


/* ==========================================================
   [12] 결과 화면
============================================================ */

function showResult() {
  showScreen("resultScreen");
  document.getElementById("progressFill").style.width = "100%";

  const pct = state.score / getTotalRounds();
  const R = 90;
  const CIRC = 2 * Math.PI * R; // ≈ 565.49

  document.getElementById("resultContent").innerHTML = `
    <div class="result-ring-wrap">
      <svg class="result-ring-svg" viewBox="0 0 220 220">
        <circle class="ring-bg" cx="110" cy="110" r="${R}"/>
        <circle class="ring-fill" cx="110" cy="110" r="${R}"
          stroke-dasharray="${CIRC.toFixed(2)}"
          stroke-dashoffset="${CIRC.toFixed(2)}"/>
      </svg>
      <div class="result-ring-text">
        <span class="result-num">${state.score}</span><span class="result-sep">/${getTotalRounds()}</span>
      </div>
    </div>
  `;

  // 링 채우기 애니메이션 — 두 프레임 뒤에 적용해야 transition이 동작
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const ring = document.querySelector(".ring-fill");
      if (ring) ring.style.strokeDashoffset = CIRC * (1 - pct);
    });
  });

  // 반대 게임 버튼 텍스트 설정
  const otherBtn = document.getElementById("otherGameBtn");
  if (otherBtn) {
    otherBtn.textContent = state.game === "cho" ? "국가별 브랜드 퀴즈" : "초성 퀴즈";
  }
}


/* ==========================================================
   [13] 버튼 이벤트
============================================================ */

function restartGame()    { startGame(state.game); }
function goToOtherGame()  { startGame(state.game === "cho" ? "country" : "cho"); }

// 게임 진행 중 나가기 — 확인 후 브랜드 페이지로 이동
function confirmExit() {
  if (confirm("게임을 종료하고 브랜드 페이지로 돌아갈까요?")) {
    window.location.href = "brands.html";
  }
}


/* ==========================================================
   [14] 페이지 로드 시 URL 파라미터 확인
   * ?mode=cho   → 초성 퀴즈 바로 시작
   * ?mode=country → 국가 퀴즈 바로 시작
   * 파라미터 없음 → 선택 화면
============================================================ */

window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");

  if (mode === "cho" || mode === "country") {
    startGame(mode);
  } else {
    showScreen("selectionScreen");
  }
});
