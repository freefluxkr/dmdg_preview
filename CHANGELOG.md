# 📋 DMDG LIVE (dmdg-live.com) 전체 수정 및 변경 이력 (CHANGELOG)

> **공식 도메인**: [https://dmdg-live.com/](https://dmdg-live.com/)  
> **미러 저장소**: [`freefluxkr/dmdg_potal`](https://github.com/freefluxkr/dmdg_potal)  
> **배포 저장소**: [`freefluxkr/dmdg_live`](https://github.com/freefluxkr/dmdg_live)  
> **기록 책임자**: Peggy (Secretariat Lead) & Craig (Lead Systems Engineer)

---

## 📅 [2026-11-06] [Book 22036 & 22037] 위키독스 2권 전수 5대 파트 - 20개 정규 챕터 계층 트리 완결 개편

### 1. 도서 구조 계층 트리(Parent-Child Hierarchy) 전면 보강
* **배경**: 기존 5개 대분류 파트만 노출되던 구조에서 독자가 한눈에 목차를 보고 단계별로 학습할 수 있도록 파트 하위 20개 정규 챕터를 전수 개별 페이지로 생성 및 트리 바인딩 완료.
* **Book 22036 (`https://wikidocs.net/book/22036`)**:
  - `Part 1 (478083)`: Ch 01 ~ 04 (리눅스 인프라, 쉘 스크립팅, Docker 배포, 보안 터널링)
  - `Part 2 (478084)`: Ch 05 ~ 08 (사내규정·특허 온톨로지, Cypher 질의, 다중 홉 인과관계)
  - `Part 3 (478085)`: Ch 09 ~ 12 (GraphRAG 파이프라인, 트리플 자동 파서, 하이브리드 RAG)
  - `Part 4 (478086)`: Ch 13 ~ 16 (Python FastMCP 표준, 사규·특허 툴 3종 구현, systemd 데몬)
  - `Part 5 (478087)`: Ch 17 ~ 20 (Antigravity IDE 연동, 침해/위반 자동 감지, 지속 메모리 확장)
  - 총 6개 파트/개요 + 20개 정규 챕터 (총 26개 페이지 구성 완결)
* **Book 22037 (`https://wikidocs.net/book/22037`)**:
  - `Part 1 (478125)`: Ch 01 ~ 04 (LLM 건망증, 인간 뇌 2단계 기억 응고화, 망각 극복, 로컬 환경)
  - `Part 2 (478126)`: Ch 05 ~ 08 (에피소드 파싱, 시간축 지식 그래프, FastMCP 회상, 메모리 감쇠)
  - `Part 3 (478127)`: Ch 09 ~ 12 (트리플 데이터셋 변환, CoT 프롬프트, 리플레이 버퍼, Pydantic 검증)
  - `Part 4 (478128)`: Ch 13 ~ 16 (SLM 선정, Unsloth QLoRA 1시간 튜닝, DPO 성향 정렬, Crontab 배치)
  - `Part 5 (478129)`: Ch 17 ~ 20 (LoRA 어댑터 핫스왑, Antigravity IDE 연동, 영구 자아 실전, Lifelong Learning)
  - 총 6개 파트/개요 + 20개 정규 챕터 (총 26개 페이지 구성 완결)

---

## 📅 [2026-11-06] [Book 22037] 《나를 기억하는 영구 두뇌 AI》 위키독스 정식 출간 & 블로그 런칭

### 1. 위키독스 공식 신규 도서 Book 22037 전 챕터 배포
* **공식 도서 등록**: 《나를 기억하는 영구 두뇌 AI: 지속 메모리(Continual Memory)와 지식 주입형 모델 정렬》 ([https://wikidocs.net/book/22037](https://wikidocs.net/book/22037))
* **전체 6대 챕터 배포 완결**:
  - `Page 478124`: 도서 개요 및 5부 20챕터 마스터 로드맵
  - `Page 478125`: [ 제1부 ] 지속 메모리(Continual Memory) 패러다임과 로컬 인프라
  - `Page 478126`: [ 제2부 ] Tier 1: 지식 그래프 기반 실시간 에피소딕 외장 메모리
  - `Page 478127`: [ 제3부 ] 지식 합성: 그래프에서 LoRA 학습용 데이터셋 자동 생성
  - `Page 478128`: [ 제4부 ] Tier 2: Unsloth QLoRA 야간 무인 파인튜닝 & DPO 정렬
  - `Page 478129`: [ 제5부 ] 실전 통합: Antigravity IDE & 영구 자아(Alter-Ego) AI 완성

### 2. 위키독스 공식 기술 블로그 런칭 포스팅 발행 (Blog 36007)
* **포스팅 URL**: [https://wikidocs.net/blog/36007](https://wikidocs.net/blog/36007)
* **포스팅 제목**: `🧠 [인간 뇌 모사 AI] 대화가 끝나도 사라지지 않는 기억! 지속 메모리(Continual Memory) & 모델 정렬 출간`
* **주요 내용**: 2-Tier 메모리 아키텍처, 29번째 인터랙티브 시뮬레이터 및 Book 22037 직결 링크 수록.

---

## 📅 [2026-11-06] [Book 25] 지속 메모리(Continual Memory) & 지식 주입형 모델 정렬 원고 집필 완결

### 1. 《나를 기억하는 영구 두뇌 AI: 지속 메모리와 모델 정렬》 5부작 실무 원고 집필
* **원고 보관 디렉터리**: `DMDG_PRJ/DMDG_WIKIDOCS/25_continual_memory_model_alignment/`
* **마스터 원고 6종 완비**:
  - `BOOK_25_MASTER_ROADMAP.md`: 전체 5부 20챕터 마스터 목차 및 인간 뇌 모사 2-Tier 기억 체계
  - `PART_01_CONTINUAL_MEMORY_PARADIGM.md`: 제1부 LLM 건망증 분석, 파괴적 망각 수학적 원리 & 로컬 인프라(Ollama/vLLM)
  - `PART_02_TEMPORAL_KNOWLEDGE_GRAPH_MEMORY.md`: 제2부 Tier 1 - 시간축 결합 Neo4j 지식 그래프 외장 기억 & FastMCP 즉각 회상
  - `PART_03_GRAPH_TO_DATASET_SYNTHESIS.md`: 제3부 에피소드 트리플 기반 사고사슬(CoT) Instruction 데이터셋 자동 합성 & 리플레이 버퍼
  - `PART_04_UNSLOTH_QLORA_NIGHTLY_PIPELINE.md`: 제4부 Tier 2 - Unsloth 4-bit QLoRA 1시간 야간 무인 학습 & Crontab 자동화
  - `PART_05_ANTIGRAVITY_LIFELONG_AGENT.md`: 제5부 Antigravity IDE 2.0 연동, LoRA 어댑터 핫스왑 & 영구 자아(Alter-Ego) AI 완성

---

## 📅 [2026-11-06] [Book 22036] 위키독스 정식 전자책 & 공식 블로그 전격 출간 완료

### 1. 위키독스 공식 신규 도서 Book 22036 전 챕터 배포
* **공식 도서 등록**: 《차세대 AI 에이전트의 두뇌: 리눅스 · FastMCP · GraphRAG 완벽 바이블》 ([https://wikidocs.net/book/22036](https://wikidocs.net/book/22036))
* **전체 6대 챕터 배포 완결**:
  - `Page 478082`: 도서 개요 및 5부 20챕터 마스터 로드맵
  - `Page 478083`: [ 제1부 ] 탄탄한 리눅스 기반 엔지니어링 & 인프라 셋업
  - `Page 478084`: [ 제2부 ] 사내 규정 & 법률·특허 지식 그래프 온톨로지 모델링
  - `Page 478085`: [ 제3부 ] GraphRAG 파이프라인: 비정형 텍스트에서 지식 그래프 자동 추출
  - `Page 478086`: [ 제4부 ] Python FastMCP로 사내 규정 전용 MCP 서버 제작
  - `Page 478087`: [ 제5부 ] Antigravity IDE 실전 연동 & 엔터프라이즈 솔루션

### 2. 위키독스 공식 기술 블로그 런칭 포스팅 발행 (Blog 35973)
* **포스팅 URL**: [https://wikidocs.net/blog/35973](https://wikidocs.net/blog/35973)
* **포스팅 제목**: `🔥 [차세대 AI 엔지니어링] 단순 벡터 RAG의 종말! 리눅스 · FastMCP · GraphRAG 완벽 바이블 출간`
* **주요 내용**: 29번째 인터랙티브 웹 시뮬레이터(`sim_graphrag.html`) 및 Book 22036 도서관 직결 링크 수록.

---

## 📅 [2026-11-06] [Book 24] 리눅스 × FastMCP × GraphRAG 신간 원고 집필 & 29번째 인터랙티브 시뮬레이터 런칭

### 1. 29번째 공식 인터랙티브 시뮬레이터 배포 (`sim_graphrag.html`)
* **사내규정 & 법률/특허 지식 그래프 RAG 실전 시뮬레이터 신규 제작**:
  - HTML5 Canvas 기반 물리 엔진 탑재: 14개 노드, 18개 관계(인과관계 엣지) 실시간 드래그, 줌, 패닝 지원.
  - 3대 실무 시나리오(오픈소스 라이선스 승인, 직무발명 보상금, 개인정보 유출 방지) 원클릭 다중 홉(Multi-Hop) 추론 시각화.
  - LLM 자동 생성 Neo4j Cypher 쿼리 뷰어 및 기존 단순 벡터 RAG vs GraphRAG 결과 비교 패널 탑재.
  - FastMCP JSON-RPC 2.0 실시간 패킷 트레이서 모니터 내장.

### 2. 위키독스 Book 24 정규 5부작 실무 원고 집필 완결
* **원고 저장 디렉터리 신설**: `DMDG_PRJ/DMDG_WIKIDOCS/24_linux_mcp_graphrag/`
* **집필 원고 5부작**:
  - `BOOK_24_MASTER_ROADMAP.md`: 도서 전체 개요 및 5부 20챕터 마스터 목차
  - `PART_01_LINUX_DOCKER_NEO4J.md`: 제1부 리눅스 인프라 & Docker Compose Neo4j 무중단 배포
  - `PART_02_CORPORATE_IP_GRAPH_MODELING.md`: 제2부 사내규정 & 특허 온톨로지 모델링 및 Cypher 쿼리
  - `PART_03_LLM_GRAPHRAG_PIPELINE.md`: 제3부 Pydantic 기반 트리플 자동 추출 및 하이브리드 RAG 엔진
  - `PART_04_FASTMCP_SERVER_DEVELOPMENT.md`: 제4부 Python FastMCP 도구 개발 및 리눅스 systemd 데몬화
  - `PART_05_ANTIGRAVITY_INTEGRATION.md`: 제5부 Antigravity IDE 2.0 연동 및 사내 컴플라이언스 AI 에이전트 실전 가동

---

## 📅 [2026-11-06] 당목담글 보이스(`voice.html`) 전면 복구 및 루트 디렉터리 정리

### 1. 당목담글 보이스 (`voice.html`) 구문 오류 및 렌더링 먹통 버그 완벽 해결
* **오류 원인 규명**:
  - `js/firebase-config.js`와 `js/app.js` 간의 `emotions` 전역 변수 중복 선언 (`SyntaxError: Identifier 'emotions' has already been declared`).
  - `js/app.js` 내부의 `micAnalyser` 변수 다중 선언 충돌.
  - 이로 인해 자바스크립트 전체 파싱이 중단되어 Lucide 아이콘 미출력, 마이크 녹음 버튼 미작동, 감정 필터 탭 실종 현상 발생.
* **조치 사항**:
  - `js/firebase-config.js`: 보이스 전용 상태 변수 제거 및 Firebase 순수 설정 파일로 정제.
  - `js/app.js`: 전역 스코프 충돌 변수 정리 및 필수 상태 변수(`audioEngine`, `currentFilter`, `isRecording` 등) 안전하게 정립.
  - `lucide.createIcons()` 및 음성 녹음/가상 시뮬레이터 fallback 인터랙션 완전 정상화 검증 완료.

### 2. `c:\DMDG_JOBs` 워크스페이스 루트 폴더 정돈
* **루트 파일 정리 (`WORKSPACE_STRUCTURE.md` 표준 준수)**:
  - `MD_todo_lst/`: `할일들.txt`, `01_DMDG_향후_핵심과제_5대_실행계획서.md`, `00_집에서_확인할 내용.md` 이동
  - `MD_session/`: `00_집에서_이어서_작업하는_방법(README).md`, `00_학원에서_이어서_작업하는_방법(README).md` 이동
  - `MD_dmdg_compl/`: `시작하기 전에.txt`, `실무 프로젝트로 배우는 빅데이터 기술.txt`, `downloads_list.txt` 이동
  - `assets/showcase/`: `00_DMDG_실제컨텐츠_인터랙티브_쇼케이스.html`, 시안 이미지 및 목업 데모 파일 격리 수납
  - `_archive/temp_scripts/`: `temp_check.js`, `temp_script.js` 이동
  - 불필요한 0바이트 로그(`chrome_err.log`, `chrome_test.log`) 삭제

---

## 📅 [2026-10-21] 세션 작업 내역 (최신 업데이트)

### 1. 우상단 [🎓 Antigravity × REA 과정 상세 안내] 링크 및 상세 커리큘럼 페이지(`curriculum.html`) 신설
* **우상단 네비게이션 버튼 갱신**:
  - 기존 팝업 모달 호출 버튼 ➔ `[🎓 Antigravity × REA 과정 상세 안내]` 링크로 승격 및 `./curriculum.html`로 직결.
* **`curriculum.html` 상세 커리큘럼 단독 웹페이지 제작 및 배포**:
  - `projects/CURRICULUM/커리큘럼 마크다운 원본 소스.md`의 전체 내용(1~5장)을 정밀 반영.
  - **오프라인 강의장 위치 안내 공식 명시 (하단 배너)**:
    - **`강의장 위치 : 신청자들의 공통 위치로 선정하여 추후 공지 (현재는 성남시 태평역 부근 예정)`**
    - 20명 모집 확정 시 신청자 거주 지역 분포를 종합 분석하여 최적의 접근성을 갖춘 강의장을 최종 확정·공지하도록 안내.
  - **직결 수강 신청 연동**:
    - `curriculum.html` 내 `[📝 과정 신청하기 (20명 달성 시 개강) ➔]` 클릭 시 `index.html?openApply=true`로 이동하여 수강 신청서가 즉시 자동 팝업되도록 UX 연계.
  - **1주차~8주차 상세 강의계획서 전수 수록**:
    - 오전 이론 해체 쇼, 오후 Hands-on 실습 랩, 포트폴리오 깃허브 빌드, 면접 대비 고난도 Q&A 24선 카드 배치.

### 2. 일일 타임테이블 신규 표준 개편 (커리큘럼 마크다운 및 연계 문서 전수 동기화)
* **신규 일일 타임테이블 확립**:
  - 🌅 **오전 세션 [09:00 ~ 12:50]**: 핵심 이론 & 라이브 해체 쇼 (4시간, 1~4교시)
  - 🍱 **점심 및 네트워킹 [12:50 ~ 13:50]**: 1시간
  - 🌇 **오후 세션 [13:50 ~ 17:40]**: Hands-on 실습 & 포트폴리오화 (4시간, 5~8교시)
  - ⚠️ **금요일 조기 종료 규칙 명시**: **매주 금요일은 7교시(16:40)에 수업 종료**
* **동기화 파일 목록**:
  - `projects/CURRICULUM/커리큘럼 마크다운 원본 소스.md`
  - `projects/CURRICULUM/반응형 웹 인쇄용 HTML.html`
  - `projects/CURRICULUM/웹 뷰어 및 랜딩페이지 삽입용 HTML.html`
  - `projects/CURRICULUM/모집공고 마크다운 원본 소스.md`
  - `projects/12. REA/CURRICULUM_ANTIGRAVITY_MCP_REA_20261207.md`
  - `projects/12. REA/COURSE_RECRUITMENT_NOTICE.md`
  - `curriculum.html`

### 3. 3대 대시보드 컬럼 5개 카드 제한 및 우측 상단 총 컨텐츠 개수 배지 균형 최적화
* **1:1:1 수직 시각 균형 달성 (각 컬럼당 상위 5개 카드만 노출)**:
  - **Column 1 (`LIVE WEB APPS`)**:
    - 노출 (5개): 말쌈, 당목담글 공식 블로그, DMDG 서재, 소담 라이브, 당목담글 보이스
    - 숨김 (1개): 방법 라이브 (`dmdg-hidden-card` 클래스 적용)
    - 우측 배지: `<span class="panel-count-badge">6 Services</span>` 유지
  - **Column 2 (`INTERACTIVE SIMULATORS`)**:
    - 노출 (5개): AI 에이전트 & SCM MLOps, REA × MCP Protocol Inspector, 크롬 공룡 랩, 윈도우 계산기 랩, 클린룸 TDD 검증기
    - 숨김 (3개): K-오피스 생존 연구소, 0원 SaaS 빌더 랩, 수학 시뮬레이터 마스터 허브 (`dmdg-hidden-card` 클래스 적용)
    - 우측 배지: `<a href=".../sim_master_hub.html" class="panel-count-badge">28 Total ➔</a>` (28종 전체 시뮬레이터 마스터 허브 직결)
  - **Column 3 (`WIKIBOOKS`)**:
    - 노출 (5개): Book 21781 REA 완벽 마스터 가이드, Book 21777 Antigravity IDE 완벽 가이드, Book 21755 모던 REA (클린룸), Book 21754 리버스 실전 바이블, Book 21753 남의 앱 뜯어보기
    - 숨김 (6권): Book 21748, Book 21747, Book 21746, Book 21733, Book 21701, Book 21658 (`dmdg-hidden-card` 클래스 적용)
    - 우측 배지: `<a href="https://dmdg.wikidocs.net/book/" class="panel-count-badge">11 Books (전체 ➔)</a>` (위키독스 전체 도서 목록 직결)
* **지능형 실시간 검색 연동 (Live Search)**:
  - 상단 검색창에 검색어 입력 시, 숨겨진 카드라도 검색 키워드에 매칭되면 즉시 노출.
  - 검색어 삭제 시 원래의 기본 5개 노출 상태로 부드럽게 복원.

### 4. 수강생 모집 온보딩 팝업 & Firebase Firestore 실시간 DB & 관리자 콘솔(`admin.html`)
* **온보딩 팝업 모달 (`rea-course-modal-backdrop`)**:
  - 포털 접속 시 《Antigravity IDE × REA 모던 역공학 & 클린룸 재구현 과정》 소개 자동 팝업 (오늘 하루 보지 않기 쿠키 지원).
  - 4대 교육 기둥, 20명 달성 시 개강 안내, 실시간 목표 게이지 바 연동.
  - 하단 오프라인 강의장 안내 명시: `강의장 위치 : 신청자들의 공통 위치로 선정하여 추후 공지 (현재는 성남시 태평역 부근 예정)`.
* **수강 신청 Form 및 데이터베이스 저장**:
  - 수집 필드: 이름, 연락처(010-XXXX-XXXX 자동 하이픈 포맷), 지역(17개 시도), 내일배움카드 소지 여부.
  - Firebase Firestore (`rea_course_applications` 컬렉션) 및 LocalStorage dual-write 회복 탄력성 저장 구조.
* **관리자 전용 대시보드 (`admin.html`)**:
  - 인증: ID `DMDG-LIVE` / SHA-256 보안 해시 인증.
  - 실시간 신청자 집계, 20명 달성 여부 게이지, 전체 명단 테이블, UTF-8 BOM 엑셀 CSV 원클릭 내보내기 지원.

### 5. DMDG 서재(E-Reader) 미래 3부작 연동 및 위키독스 정비
* **우상단 네비게이션**: `🎙️ 발음 교정` ➔ `📖 DMDG 서재 (E-Reader)` (`novels.html`) 교체.
* **`novels.html` 카테고리 승격**:
  - 2027 팩션 스릴러에 더해 **미래 베스트셀러 3부작** ([Book 21746](https://wikidocs.net/book/21746), [Book 21747](https://wikidocs.net/book/21747), [Book 21748](https://wikidocs.net/book/21748)) 총 48개 세부 챕터 원문 텍스트 탑재 및 TTS 음성 낭독 지원.
* **위키북스 정규 링크**: WIKIBOOKS 전체 보기 링크를 `https://dmdg.wikidocs.net/book/` 공식 도서관 주소로 확정.

---

## 📅 [2026-10-20] 세션 작업 내역

### 1. 도메인 분리 및 대표 포털 론칭
* **`malssam.com` 독립 분리**: 말쌈 우리말 사전 & 퀴즈 PWA 서비스 전용 도메인으로 분리 운영.
* **`dmdg-live.com` 대표 포털 구축**:
  - Mockup 1 (3중 유기적 페이퍼컷 웨이브 백드롭, 대형 엠블럼, 볼드 슬로건)과 Mockup 3 (3열 대시보드 구조) 융합 디자인 채택.
  - 사장님 3대 지침 엄수:
    1. Official Channels & GitHub 메뉴 제외
    2. Movie Scenarios 대신 위키북스(WIKIBOOKS) 정규 라인업 탑재
    3. 푸터에 `"대표도메인 : dmdg-live.com & malssam.com"` 명시

### 2. 서비스 복원 및 링크 무결성 검증
* **소담 라이브(Sodam Web)**: Firebase 호스팅 주소(`dmdg-ut.web.app/sodam-web/`) 정상 연결 복원.
* **당목담글 공식 블로그**: 위키독스 공식 기술 블로그(`dmdg.wikidocs.net/blog/`) 라이브 링크 연동.
* **SSL 인증서**: Naver 밴드 등 모바일 `www.` 접두어 호출에 대응하는 Multi-SAN SSL 인증서 적용.

---

## 🏛️ 포털 구성 요소 및 라우팅 맵

| 경로 / URL | 역할 및 기능 | 주요 특징 |
| :--- | :--- | :--- |
| `/index.html` (`/`) | DMDG LIVE 메인 대시보드 | 3열 5개 카드 제한, 실시간 검색, 과정 신청 모달 탑재 |
| `/curriculum.html` | Antigravity × REA 상세 커리큘럼 | 8주차 강의계획서 전문, 시간표, 강의장 위치 안내, 신청 링크 |
| `/admin.html` | 수강 신청자 관리자 콘솔 | 비노출 전용 콘솔, SHA-256 보안 해시 인증(DMDG-LIVE), 실시간 DB 통계, CSV 다운로드 |
| `/novels.html` | DMDG 서재 (E-Reader) | 팩션 소설 및 미래 3부작 48개 챕터 낭독기 + TTS |
| `/sim_mcp_explorer.html`| REA × MCP Protocol Inspector | JSON-RPC 2.0 패킷 트레이서, 3대 AI 스위처, 시뮬레이터 |
| `/sim_master_hub.html` | 28종 수학·AI 시뮬레이터 허브 | 20종 수학 알고리즘 및 8대 프로덕션 시뮬레이터 통합 관제 |
| `/scm_dashboard.html` | SCM MLOps 공급망 관제 대시보드 | LLM Brain 지식 그래프 연계 실시간 리스크 추론 관제 |

---

## 🔐 보안 및 인증 정보 요약
* **관리자 로그인**:
  - URL: `https://dmdg-live.com/admin.html` (공개 상단 네비게이션 버튼 비노출 격리)
  - ID: `DMDG-LIVE`
  - 인증 방식: SHA-256 보안 해시 매칭 및 5회 실패 시 5분 계정 잠금 방어
* **데이터베이스**:
  - Firebase Firestore: `rea_course_applications` 컬렉션
  - LocalStorage 백업: `dmdg_rea_applications` 키로 이중 안전 보관
