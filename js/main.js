const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

navToggle?.addEventListener("click", () => {
  nav.classList.toggle("is-open");
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
  });
});

// OS '동작 줄이기' 설정과 무관하게 항상 애니메이션 작동 (원래: window.matchMedia("(prefers-reduced-motion: reduce)").matches)
const reduceMotion = false;

function setupAutoplay(name, start, stop) {
  const button = document.querySelector(`[data-autoplay="${name}"]`);
  let playing = false;

  const update = () => {
    if (!button) return;
    button.textContent = playing ? "⏸" : "▶";
    button.setAttribute("aria-label", playing ? "자동 전환 일시정지" : "자동 전환 재생");
    button.setAttribute("title", playing ? "일시정지" : "재생");
  };

  const play = () => {
    start();
    playing = true;
    update();
  };

  const pause = () => {
    stop();
    playing = false;
    update();
  };

  button?.addEventListener("click", () => (playing ? pause() : play()));

  if (reduceMotion) {
    update();
  } else {
    play();
  }

  return { play, pause, isPlaying: () => playing };
}

const characters = {
  panam: {
    name: "팬앰 팔머",
    role: "노마드 / 드라이버",
    image: "assets/character-panam.webp",
    desc: "나이트 시티 외곽을 누비는 알데칼도스 출신 노마드.\n거친 황야에서도 동료와 신념을 위해 끝까지 달린다.",
    quote: "내 가족을 건드리면, 그게 누구든 끝장이야.",
    en: "NOMAD",
    stats: { combat: 84, tech: 68, speed: 95 },
  },
  judy: {
    name: "주디 알바레스",
    role: "브레인댄스 / 테크니션",
    image: "assets/character-judy.webp",
    desc: "브레인댄스 기술에 능한 감각적인 테크 전문가.\n화려한 도시의 이면에서 진실과 자유를 찾는다.",
    quote: "이 도시에서 진짜인 건 브레인댄스뿐이야... 슬프게도.",
    en: "TECHIE",
    stats: { combat: 58, tech: 96, speed: 72 },
  },
  jackie: {
    name: "재키 웰즈",
    role: "솔로 / 파트너",
    image: "assets/character-jackie.webp",
    desc: "나이트 시티의 전설을 꿈꾸는 든든한 파트너.\n강한 힘과 뜨거운 의리로 위험한 의뢰를 함께한다.",
    quote: "메이저 리그로 가는 거야, 초옴바!",
    en: "SOLO",
    stats: { combat: 90, tech: 54, speed: 76 },
  },
  v: {
    name: "V",
    role: "머서너리 / 레전드",
    image: "assets/character-v.webp",
    desc: "나이트 시티에서 살아남기 위해 모든 것을 걸었다.\n사이버웨어로 한계를 넘어, 전설이 될 기회를 쟁취하라.",
    quote: "전설이 된다는 건, 어떻게 죽느냐의 문제지.",
    en: "MERCENARY",
    stats: { combat: 92, tech: 78, speed: 85 },
  },
  johnny: {
    name: "조니 실버핸드",
    role: "락커보이 / 반역자",
    image: "assets/character-johnny.webp",
    desc: "기업이 지배하는 세상에 저항한 전설적인 락커보이.\n그의 목소리는 죽어서도 나이트 시티를 뒤흔든다.",
    quote: "도시는 안 바뀌어. 불태워야 바뀌지.",
    en: "ROCKERBOY",
    stats: { combat: 88, tech: 74, speed: 82 },
  },
  adam: {
    name: "아담 스매셔",
    role: "사이보그 / 병기",
    image: "assets/character-adam.webp",
    desc: "인간성을 버리고 전투 병기가 된 아라사카의 괴물.\n압도적인 힘과 공포로 적을 완전히 짓밟는다.",
    quote: "넌 고철 덩어리가 될 거다.",
    en: "CYBORG",
    stats: { combat: 100, tech: 80, speed: 58 },
  },
};

const characterImage = document.querySelector("#characterImage");
const characterPanel = document.querySelector(".character-image");
const characterNameMain = document.querySelector("#characterNameMain");
const characterRole = document.querySelector("#characterRole");
const characterDesc = document.querySelector("#characterDesc");
const characterQuote = document.querySelector("#characterQuote");
const characterGhost = document.querySelector("#characterGhost");
const characterButtons = document.querySelectorAll("[data-character]");
const statFills = document.querySelectorAll("[data-stat]");
const statValues = document.querySelectorAll("[data-stat-value]");
const statBars = document.querySelector(".stat-bars");
const selectHint = document.querySelector("#selectHint");

function applyStats(stats) {
  statFills.forEach((fill) => {
    fill.style.width = `${stats[fill.dataset.stat] ?? 0}%`;
  });
  statValues.forEach((value) => {
    value.textContent = stats[value.dataset.statValue] ?? 0;
  });
}

function swapCharacter(character) {
  characterImage.src = character.image;
  characterImage.alt = character.name;
  characterNameMain.textContent = character.name;
  characterRole.textContent = character.role;
  characterDesc.textContent = character.desc;
  characterQuote.textContent = `"${character.quote}"`;
  characterGhost.textContent = character.en;
  applyStats(character.stats);
}

characterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const key = button.dataset.character;
    const character = characters[key];
    if (!character) return;

    characterButtons.forEach((item) => item.classList.remove("is-active"));
    document.querySelectorAll(`.character-tabs [data-character="${key}"]`).forEach((item) => {
      item.classList.add("is-active");
    });

    characterPanel.classList.add("has-selection");
    selectHint?.classList.add("is-hidden");
    statBars?.classList.remove("is-hidden");

    if (reduceMotion) {
      swapCharacter(character);
      return;
    }

    characterPanel.classList.remove("is-glitching");
    void characterPanel.offsetWidth;
    characterPanel.classList.add("is-glitching");

    window.setTimeout(() => swapCharacter(character), 180);
    window.setTimeout(() => characterPanel.classList.remove("is-glitching"), 520);
  });
});

const cursorPing = document.querySelector(".cursor-ping");

if (characterPanel && cursorPing && !reduceMotion) {
  characterPanel.addEventListener("mousemove", (event) => {
    const onButton = event.target.closest(".group-map button");
    if (!onButton || characterPanel.classList.contains("has-selection")) {
      cursorPing.classList.remove("is-on");
      return;
    }
    const rect = characterPanel.getBoundingClientRect();
    cursorPing.style.left = `${event.clientX - rect.left}px`;
    cursorPing.style.top = `${event.clientY - rect.top}px`;
    cursorPing.classList.add("is-on");
  });

  characterPanel.addEventListener("mouseleave", () => {
    cursorPing.classList.remove("is-on");
  });
}

const groupView = {
  name: "나이트 시티의 전설들",
  image: "assets/characters-group.webp",
  desc: "노마드, 테크니션, 솔로, 락커보이까지 —\n나이트 시티를 뒤흔든 전설들을 만나보라.",
  quote: "이 도시에서, 전설은 혼자 만들어지지 않는다.",
  en: "LEGENDS",
};

function resetToGroupView() {
  if (!characterPanel || !characterPanel.classList.contains("has-selection")) return;

  characterButtons.forEach((item) => item.classList.remove("is-active"));
  characterPanel.classList.remove("has-selection");
  selectHint?.classList.remove("is-hidden");
  statBars?.classList.add("is-hidden");

  const applyGroupView = () => {
    characterImage.src = groupView.image;
    characterImage.alt = groupView.name;
    characterNameMain.textContent = groupView.name;
    characterRole.textContent = "";
    characterDesc.textContent = groupView.desc;
    characterQuote.textContent = `"${groupView.quote}"`;
    characterGhost.textContent = groupView.en;
  };

  if (reduceMotion) {
    applyGroupView();
    return;
  }

  characterPanel.classList.remove("is-glitching");
  void characterPanel.offsetWidth;
  characterPanel.classList.add("is-glitching");

  window.setTimeout(applyGroupView, 180);
  window.setTimeout(() => characterPanel.classList.remove("is-glitching"), 520);
}

// "← 전체" back button
const charBackButton = document.querySelector("#charBack");
charBackButton?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  resetToGroupView();
});

// Click empty area of the character panel returns to the group view
characterPanel?.addEventListener("click", (event) => {
  if (!characterPanel.classList.contains("has-selection")) return;
  if (event.target.closest(".group-map button") || event.target.closest("#charBack")) return;
  resetToGroupView();
});

// Esc key returns to the group view
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") resetToGroupView();
});

const worldSlides = [
  {
    title: "나이트 시티",
    subtitle: "기회와 폭력이\n공존하는 도시",
    desc: "거대 기업의 탐욕과 지하 세계의 욕망,\n사이버 네트워크가 얽힌 거대한 미로.\n당신의 선택이 이 도시의 미래를 바꾼다.",
    image: "assets/world-night-city.webp",
  },
  {
    title: "기업 지배 사회",
    subtitle: "권력이 법이\n되는 세계",
    desc: "도시의 질서는 기업의 손에서 다시 쓰인다.\n돈과 데이터, 무력으로 움직이는 세계 속에서\n진실은 언제나 가장 비싼 대가를 요구한다.",
    image: "assets/world-corporate.webp",
  },
  {
    title: "사이버웨어",
    subtitle: "인간의 한계를\n넘어서는 기술",
    desc: "신체는 더 이상 타고난 조건이 아니다.\n팔, 눈, 신경, 기억까지 개조하며\n새로운 힘과 또 다른 위험을 마주한다.",
    image: "assets/world-cyberware.webp",
  },
  {
    title: "배드랜드",
    subtitle: "네온 밖에\n펼쳐진 황무지",
    desc: "도시의 빛이 닿지 않는 끝없는 사막.\n법도 보호도 없는 땅에서 살아남기 위해\n속도와 동료, 그리고 선택만이 길이 된다.",
    image: "assets/world-badlands.webp",
  },
];

const worldCopy = document.querySelector(".world-copy");
const worldVisual = document.querySelector(".district-visual");
const worldTitle = document.querySelector("#worldTitle");
const worldSubtitle = document.querySelector("#worldSubtitle");
const worldDesc = document.querySelector("#worldDesc");
const worldImage = document.querySelector("#worldImage");
let worldIndex = 0;

const worldSection = document.querySelector(".world");
const worldTabs = document.querySelectorAll("[data-world]");

function showWorldSlide(index) {
  const slide = worldSlides[index];
  if (!slide || !worldCopy || !worldVisual || !worldTitle || !worldSubtitle || !worldDesc || !worldImage) return;

  worldIndex = index;
  worldTabs.forEach((button) => {
    const tabIndex = Number(button.dataset.world);
    button.classList.toggle("is-active", tabIndex === index);
    button.classList.toggle("is-filled", tabIndex < index);
  });

  worldCopy.classList.add("is-changing");
  worldVisual.classList.add("is-changing");

  window.setTimeout(() => {
    worldTitle.textContent = slide.title;
    worldSubtitle.textContent = slide.subtitle;
    worldDesc.textContent = slide.desc;
    worldImage.src = slide.image;
    worldImage.alt = slide.title;
    worldCopy.classList.remove("is-changing");
    worldVisual.classList.remove("is-changing");

    if (!reduceMotion) {
      worldVisual.classList.add("is-entering");
      worldCopy.classList.add("is-entering");
      window.setTimeout(() => {
        worldVisual.classList.remove("is-entering");
        worldCopy.classList.remove("is-entering");
      }, 600);
    }
  }, 280);
}

let worldTimer;

const worldAutoplay =
  worldSlides.length > 1
    ? setupAutoplay(
        "world",
        () => {
          window.clearInterval(worldTimer);
          worldSection?.classList.remove("is-paused");
          worldTimer = window.setInterval(() => {
            showWorldSlide((worldIndex + 1) % worldSlides.length);
          }, 3000);
        },
        () => {
          window.clearInterval(worldTimer);
          worldSection?.classList.add("is-paused");
        }
      )
    : null;

worldTabs.forEach((button) => {
  button.addEventListener("click", () => {
    showWorldSlide(Number(button.dataset.world));
    if (worldAutoplay?.isPlaying()) worldAutoplay.play();
  });
});

if (worldVisual && worldAutoplay && !reduceMotion) {
  worldVisual.addEventListener("mouseenter", () => worldAutoplay.pause());
  worldVisual.addEventListener("mouseleave", () => worldAutoplay.play());
}

const districtSlides = [
  "assets/district-01.webp",
  "assets/district-02.webp",
  "assets/district-03.webp",
  "assets/district-04.webp",
  "assets/district-05.webp",
  "assets/district-06.webp",
];

const districtNames = ["왓손", "웨스트브룩", "시티 센터", "헤이우드", "퍼시피카", "산토 도밍고"];
const districtDescs = [
  "한때 아라사카의 투자로 번성했지만 기업이 떠난 뒤 방치된 구역.<br>이민자와 노점상, 타이거 클로와 메일스트롬이 뒤엉킨 나이트 시티의 용광로다.",
  "환락과 사치가 흐르는 유흥의 중심지.<br>재패타운의 네온과 차터힐의 부유층 저택이 공존하는 화려한 무대다.",
  "거대 기업의 마천루가 하늘을 찌르는 권력의 심장부.<br>돈과 정보, 그리고 음모가 가장 빠르게 움직이는 곳이다.",
  "라티노 문화가 짙게 밴 주거 구역.<br>발렌티노스의 자부심과 기업 엘리트의 고급 주택이 묘하게 뒤섞여 있다.",
  "개발이 중단된 채 버려진 리조트, 지금은 무법의 전투 구역.<br>부두 보이즈와 애니멀스가 지배하는 위험천만한 땅이다.",
  "발전소와 공장이 밤낮으로 돌아가는 산업 구역.<br>노동자의 땀과 식스 스트리트 갱의 긴장이 공기를 채운다.",
];
const districtShowcase = document.querySelector(".showcase");
const districtImage = document.querySelector("#districtImage");
const districtNameLabel = document.querySelector("#districtName");
const districtTitle = document.querySelector("#districtTitle");
const districtDesc = document.querySelector("#districtDesc");
const districtMapWrap = document.querySelector(".district-map");
const districtMap = document.querySelector("#districtMap");
const districtSection = document.querySelector(".districts");
const mapLinkLine = document.querySelector("#mapLinkLine");
const mapLinkDot = document.querySelector("#mapLinkDot");

const mapAnchors = [
  { x: 0.42, y: 0.28 },
  { x: 0.68, y: 0.38 },
  { x: 0.45, y: 0.5 },
  { x: 0.47, y: 0.68 },
  { x: 0.22, y: 0.68 },
  { x: 0.72, y: 0.68 },
];

function updateMapLink() {
  if (!districtSection || !mapLinkLine || !mapLinkDot || !districtShowcase || !districtMap) return;
  const anchor = mapAnchors[districtIndex];
  if (!anchor) return;

  const sectionRect = districtSection.getBoundingClientRect();
  const mapRect = districtMap.getBoundingClientRect();
  const photoRect = districtShowcase.getBoundingClientRect();

  const x1 = photoRect.right - sectionRect.left;
  const y1 = photoRect.top - sectionRect.top + 16;
  const x2 = mapRect.left + mapRect.width * anchor.x - sectionRect.left;
  const y2 = mapRect.top + mapRect.height * anchor.y - sectionRect.top;

  const elbowX = x2 - Math.abs(y2 - y1);
  const points =
    elbowX > x1 + 12
      ? `${x1},${y1} ${elbowX},${y1} ${x2},${y2}`
      : `${x1},${y1} ${x2},${y2}`;

  mapLinkLine.setAttribute("points", points);
  mapLinkDot.setAttribute("cx", x2);
  mapLinkDot.setAttribute("cy", y2);
}
const districtButtons = document.querySelectorAll("[data-district]");
let districtIndex = 0;
let districtTimer;

function showDistrict(index) {
  if (!districtImage || !districtShowcase || !districtSlides[index]) return;

  districtIndex = index;
  districtButtons.forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.district) === index);
  });

  districtShowcase.classList.add("is-changing");
  districtMapWrap?.classList.add("is-changing");
  window.setTimeout(() => {
    districtImage.src = districtSlides[index];
    districtImage.alt = `${districtNames[index]} 구역`;
    if (districtNameLabel) districtNameLabel.textContent = districtNames[index];
    if (districtTitle) districtTitle.textContent = districtNames[index];
    if (districtDesc) districtDesc.innerHTML = districtDescs[index];
    if (districtMap) {
      districtMap.src = `assets/map-0${index + 1}.webp`;
      districtMap.alt = `나이트 시티 지도 — ${districtNames[index]}`;
    }
    districtShowcase.classList.remove("is-changing");
    districtMapWrap?.classList.remove("is-changing");
    updateMapLink();
  }, 240);
}

const districtAutoplay =
  districtSlides.length > 1
    ? setupAutoplay(
        "districts",
        () => {
          window.clearInterval(districtTimer);
          districtTimer = window.setInterval(() => {
            showDistrict((districtIndex + 1) % districtSlides.length);
          }, 3500);
        },
        () => window.clearInterval(districtTimer)
      )
    : null;

districtButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showDistrict(Number(button.dataset.district));
    if (districtAutoplay?.isPlaying()) districtAutoplay.play();
  });
});

if (districtShowcase && districtAutoplay && !reduceMotion) {
  districtShowcase.addEventListener("mouseenter", () => districtAutoplay.pause());
  districtShowcase.addEventListener("mouseleave", () => districtAutoplay.play());
}

if (districtMapWrap && districtAutoplay && !reduceMotion) {
  districtMapWrap.addEventListener("mouseenter", () => districtAutoplay.pause());
  districtMapWrap.addEventListener("mouseleave", () => districtAutoplay.play());
}

window.addEventListener("resize", updateMapLink);
window.addEventListener("load", updateMapLink);
updateMapLink();

const newsRotator = document.querySelector(".news-rotator");
const newsTrack = document.querySelector(".news-track");
const NEWS_GAP = 24;
let newsTimer;

function layoutNewsRotator() {
  if (!newsRotator || !newsTrack) return;
  const slot = Math.floor((newsRotator.clientHeight - NEWS_GAP) / 2) - 1;
  newsTrack.querySelectorAll(".news-card").forEach((card) => {
    card.style.height = `${slot}px`;
  });
}

function cycleNews() {
  const first = newsTrack.querySelector(".news-card");
  if (!first) return;
  const step = first.offsetHeight + NEWS_GAP;
  newsTrack.style.transition = "transform 0.6s ease";
  newsTrack.style.transform = `translateY(-${step}px)`;
  window.setTimeout(() => {
    newsTrack.style.transition = "none";
    newsTrack.appendChild(first);
    newsTrack.style.transform = "translateY(0)";
  }, 650);
}

function startNewsTimer() {
  window.clearInterval(newsTimer);
  newsTimer = window.setInterval(cycleNews, 3000);
}

if (newsRotator && newsTrack && !reduceMotion) {
  layoutNewsRotator();
  window.addEventListener("resize", layoutNewsRotator);
  window.addEventListener("load", layoutNewsRotator);
  startNewsTimer();
  newsRotator.addEventListener("mouseenter", () => window.clearInterval(newsTimer));
  newsRotator.addEventListener("mouseleave", startNewsTimer);
}

const heroVideo = document.querySelector(".hero .visual-video");
const heroPrimaryBtn = document.querySelector(".hero .btn-primary");
if (heroVideo) {
  heroVideo.loop = true;
  heroVideo.muted = true; // 자동재생 허용을 위해 항상 음소거
  heroVideo.setAttribute("playsinline", "");

  // hover가 가능한 기기(데스크톱)인지 판별 — 터치 기기는 hover가 없음
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const tryPlay = () => {
    if (reduceMotion) return;
    const p = heroVideo.play();
    if (p && p.catch) p.catch(() => {});
  };

  if (canHover && heroPrimaryBtn) {
    // 데스크톱: 기존대로 "지금 접속" 버튼에 hover/focus 시 재생
    heroVideo.pause();
    const playClip = () => {
      if (reduceMotion) return;
      heroVideo.currentTime = 0;
      tryPlay();
    };
    const resetClip = () => {
      heroVideo.pause();
      heroVideo.currentTime = 0;
    };
    heroPrimaryBtn.addEventListener("mouseenter", playClip);
    heroPrimaryBtn.addEventListener("focus", playClip);
    heroPrimaryBtn.addEventListener("mouseleave", resetClip);
    heroPrimaryBtn.addEventListener("blur", resetClip);
  } else {
    // 모바일/터치: 화면에 보이면 바로 자동재생, 벗어나면 일시정지(배터리 절약)
    if ("IntersectionObserver" in window) {
      const heroIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) tryPlay();
            else heroVideo.pause();
          });
        },
        { threshold: 0.25 }
      );
      heroIo.observe(heroVideo);
    } else {
      tryPlay();
    }
  }
}

if (!reduceMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll("main > section, .footer").forEach((element) => {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });
}

// "트레일러 보기" → 메인 비주얼(#media)로 이동하며 영상 재생
const trailerLink = document.querySelector('a[href="#media"]');
if (trailerLink && heroVideo) {
  trailerLink.addEventListener("click", () => {
    heroVideo.currentTime = 0;
    const p = heroVideo.play();
    if (p && p.catch) p.catch(() => {});
  });
}

// 자리표시용 "#" 링크는 클릭해도 맨 위로 튀지 않도록 처리
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener("click", (event) => event.preventDefault());
});
