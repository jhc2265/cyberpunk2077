# 사이버펑크 2077 홈페이지 리디자인 <br> (cyberpunk 2077 redesign) 🌃

> 사이버펑크 2077을 모티프로 한 비공식 한국어 리디자인 콘셉트 사이트
> <br> ⚠️ 팬 제작 학습용 프로젝트입니다.
> <br> ⚠️ *Cyberpunk 2077* 및 관련 IP의 모든 권리는 **CD PROJEKT RED**에 있으며, 본 저장소는 상업적 목적이 아닙니다.

<br>
나이트 시티의 세계관, 도시 구역, 전설적 캐릭터들을 인터랙티브하게 탐험하는 정적(static) 랜딩 페이지입니다. 
<br> 프레임워크 없이 순수 HTML / CSS / JavaScript로만 만들었습니다.

<br> 🔗 **데모**
- GitHub Pages: https://jhc2265.github.io/cyberpunk2077/

---

## ✨ 주요 기능

- **히어로 영상** — 데스크톱은 버튼 hover 시, 모바일은 화면에 보일 때 자동재생 (벗어나면 일시정지)
- **캐릭터 스포트라이트** — 전설적 캐릭터를 클릭해 스탯·소개 전환, ESC로 전체 보기 복귀
- **세계관 캐러셀** — 코퍼레이트 · 사이버웨어 · 배드랜드 등을 자동 전환으로 소개
- **인터랙티브 도시 지도** — 도시 구역 선택 시 지도 핫스팟이 연동
- **스크롤 등장 애니메이션** — `IntersectionObserver` 기반 섹션 등장 효과
- **뉴스 로테이터** — 최신 업데이트 카드 자동 순환
- **완전 반응형** — Grid/Flexbox · `aspect-ratio` · 미디어쿼리로 모바일까지 대응

---

## 🛠 기술 스택

- **Frontend** — HTML / CSS / JavaScript (단일 페이지, 빌드 도구 없음)
- **인터랙션** — Vanilla JS · `IntersectionObserver` · 슬라이더 / 자동 전환
- **스타일** — CSS3 Grid · Flexbox · 마스크 · 그라데이션 · 반응형
- **호스팅** — GitHub Pages
- **의존성 없음** — 외부 라이브러리 · npm install 불필요

---

## 🚀 실행 방법

### 로컬에서 보기
```
index.html 파일을 브라우저로 열기
```
> ⚠️ 일부 브라우저는 `file://`(더블클릭)에서 비디오/일부 기능이 제한될 수 있어요. 아래 로컬 서버를 권장합니다.

### 로컬 서버로 보기 (권장)
```bash
node server.mjs
# → http://127.0.0.1:4173   (Node.js v22 테스트)
```

---

## 🌐 배포 (GitHub Pages)

정적 사이트라 GitHub Pages로 바로 배포할 수 있습니다.

1. 저장소를 GitHub에 푸시
2. **Settings → Pages → Build and deployment**
3. Source를 **Deploy from a branch**, 브랜치를 `main` / 루트(`/`)로 지정
4. 발급된 URL로 접속

> 배포 후 `index.html`의 Open Graph 태그(`og:url`, `og:image`)를 실제 절대 URL로 바꾸면 소셜 공유 미리보기가 정상 표시됩니다.

---

## 📁 폴더 구조

```
cyberpunk2077/
├── index.html        # 페이지 본문 (마크업)
├── css/
│   └── style.css     # 전체 스타일 · 반응형 레이아웃
├── js/
│   └── main.js       # 인터랙션 (슬라이더 · 자동재생 · 스크롤 등장)
├── assets/           # 이미지 · 영상 · 아이콘
└── server.mjs        # 로컬 미리보기용 서버 (배포엔 불필요)
```

---

## 📝 라이선스 / 권리

비공식 팬 콘셉트 학습 프로젝트입니다. *Cyberpunk 2077*, 로고, 캐릭터, 세계관 등 모든 지식재산권은 **CD PROJEKT RED**에 있습니다. 코드는 학습 목적이며, 포함된 이미지·영상 자산을 상업적으로 사용하지 마세요.
