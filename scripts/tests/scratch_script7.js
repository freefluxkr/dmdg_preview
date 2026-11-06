
    // ── Search & Filter Logic ────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
      const searchInput = document.getElementById('liveSearchInput');
      const allCards = document.querySelectorAll('.app-item-card, .sim-item-card, .book-card-item');

      if (searchInput) {
        searchInput.addEventListener('input', () => {
          const q = searchInput.value.trim().toLowerCase();
          allCards.forEach(card => {
            const keyword = (card.dataset.keyword || '').toLowerCase();
            const text = card.textContent.toLowerCase();
            if (!q) {
              // 검색어 비어있을 시: 기본 5개 표시 상태로 복원 (dmdg-hidden-card는 다시 숨김)
              card.style.display = '';
            } else if (keyword.includes(q) || text.includes(q)) {
              // 검색어 일치 시: 숨김 카드라도 검색 결과로 노출
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          });
        });

        window.addEventListener('keydown', (e) => {
          if (e.key === '/' && document.activeElement !== searchInput) {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
          }
          if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            searchInput.blur();
          }
        });
      }

      // Initialize Live Applicant Count
      refreshLiveApplicantCount();
      initFirestoreLiveApplicantListener();

      // URL에 openApply 등이 남아있을 경우 깔끔히 제거 (언제나 소개 화면이 1순위로 열리도록 보장)
      if (window.location.search.includes('openApply')) {
        try {
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch (e) {}
      }

      // 항상 소개 화면(STEP 1)을 기본값으로 초기화
      switchToCourseIntro();

      // Auto Popup: 모집 마감으로 인해 자동 팝업 오픈 비활성화 (버튼 클릭 시에만 확인 가능)
      // const dismissedUntil = localStorage.getItem('dmdg_course_modal_dismissed_until');
      // if (!dismissedUntil || Date.now() > Number(dismissedUntil)) {
      //   setTimeout(openCourseModal, 600);
      // }
    });

    // ── Course Modal Control Functions ────────────────────────────────────────

    // ── Career Recommender Modal Functions ─────────────────────────────────────
    function openCareerModal() {
      const modal = document.getElementById('career-recommender-modal-backdrop');
      if (!modal) return;
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }

    function closeCareerModal() {
      const modal = document.getElementById('career-recommender-modal-backdrop');
      if (!modal) return;
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    function openCourseModal() {
      const modal = document.getElementById('rea-course-modal-backdrop');
      if (!modal) return;
      switchToCourseIntro();
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
      refreshLiveApplicantCount();
      initFirestoreLiveApplicantListener();
    }

    function closeCourseModal() {
      const modal = document.getElementById('rea-course-modal-backdrop');
      if (!modal) return;
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }

    function dismissCourseModalToday() {
      // Dismiss for 24 hours
      const nextDay = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem('dmdg_course_modal_dismissed_until', String(nextDay));
      closeCourseModal();
    }

    function switchToCourseIntro() {
      document.getElementById('course-intro-view').style.display = 'block';
      document.getElementById('course-apply-view').style.display = 'none';
      document.getElementById('course-success-view').style.display = 'none';
    }

    function switchToCourseApply() {
      document.getElementById('course-intro-view').style.display = 'none';
      document.getElementById('course-apply-view').style.display = 'block';
      document.getElementById('course-success-view').style.display = 'none';
      setTimeout(() => {
        const nameInput = document.getElementById('reaApplicantName');
        if (nameInput) nameInput.focus();
      }, 100);
    }

    // ── Phone Input Auto-Formatter (010-XXXX-XXXX) ───────────────────────────
    function formatPhoneNumber(input) {
      let val = input.value.replace(/[^0-9]/g, '');
      if (val.length > 3 && val.length <= 7) {
        val = val.substring(0, 3) + '-' + val.substring(3);
      } else if (val.length > 7) {
        val = val.substring(0, 3) + '-' + val.substring(3, 7) + '-' + val.substring(7, 11);
      }
      input.value = val;
    }

    // ── Dynamic Hourly Course Applicants & Waitlist Engine (11/30 마감 & 매시간 +1 자동 증가) ──
    const COURSE_CONFIG = {
      capacity: 10, // 정원 10명 (10명 초과 시 대기자 전환)
      deadline: new Date('2026-11-30T23:59:59+09:00').getTime(), // 11월 30일 자정 마감
      baseTime: new Date('2026-10-22T00:00:00+09:00').getTime(), // 오늘 00:00 기준점
      baseCount: 0 // 오늘 00:00 기준 0명에서 매시간 1명씩 증가 -> 14시 현재 14명
    };

    function calculateDynamicApplicants(realDbCount = 0) {
      const now = Date.now();
      const isClosed = now > COURSE_CONFIG.deadline;
      
      // 마감 시점까지 경과된 시간(시 단위)
      const effectiveTime = isClosed ? COURSE_CONFIG.deadline : now;
      const elapsedHours = Math.max(0, Math.floor((effectiveTime - COURSE_CONFIG.baseTime) / (1000 * 60 * 60)));
      
      // 총 누적 신청자 = 기준 인원 + 경과 시간(매시간 1명) + 실제 DB 접수자
      const totalApplicants = COURSE_CONFIG.baseCount + elapsedHours + realDbCount;
      
      // 정원(10명) 대비 대기자 수 계산
      const capacity = COURSE_CONFIG.capacity;
      const enrolledCount = Math.min(capacity, totalApplicants);
      const isCapacityFull = totalApplicants >= capacity;
      const waitlistCount = Math.max(0, totalApplicants - capacity);
      const nextWaitlistNo = waitlistCount + 1; // 다음 신청자에게 배정될 대기 순번

      return {
        isClosed,
        capacity,
        totalApplicants,
        enrolledCount,
        isCapacityFull,
        waitlistCount,
        nextWaitlistNo
      };
    }

    function renderApplicantUI(realCount = 0) {
      const stats = calculateDynamicApplicants(realCount);

      const modalCountEl = document.getElementById('modal-applicant-count-text');
      const modalBarEl = document.getElementById('modal-applicant-progress-bar');
      const formCountEl = document.getElementById('form-applicant-count-text');
      const heroBadgeEl = document.getElementById('hero-live-applicant-badge');
      const noticeTitleEl = document.getElementById('course-notice-main-title');
      const formNoticeTitleEl = document.getElementById('course-form-notice-title');
      const submitBtnTextEl = document.getElementById('btnSubmitApplicationText');

      if (stats.isClosed) {
        if (heroBadgeEl) heroBadgeEl.textContent = `11월 30일 접수 마감 [마감 완료]`;
        if (modalCountEl) modalCountEl.textContent = `접수 마감 (정원 10명 마감 + 대기자 ${stats.waitlistCount}명 접수됨)`;
        if (formCountEl) formCountEl.textContent = `11월 30일부로 모든 수강 접수가 마감되었습니다.`;
        return;
      }

      if (stats.isCapacityFull) {
        // 정원 10명 초과 -> 대기자 모드
        if (heroBadgeEl) {
          heroBadgeEl.style.background = 'linear-gradient(135deg, #ef4444, #f59e0b)';
          heroBadgeEl.textContent = `정원 10명 조기마감! · 실시간 대기 ${stats.waitlistCount}명 접수 중 (11/30 마감) ➔`;
        }
        if (modalCountEl) {
          modalCountEl.innerHTML = `<span style="color:#10b981; font-weight:900;">정원 10명 마감 (100%)</span> · <span style="color:#fbbf24; font-weight:900;">대기자 ${stats.waitlistCount}명 접수 중</span> (11/30 마감)`;
        }
        if (modalBarEl) {
          modalBarEl.style.width = '100%';
          modalBarEl.style.background = 'linear-gradient(90deg, #10b981, #f59e0b)';
        }
        if (formCountEl) {
          formCountEl.innerHTML = `정원 10명 조기마감 완료! 현재 <strong style="color:#fbbf24;">대기자 ${stats.waitlistCount}명</strong> 접수 중 (지금 신청 시 <strong style="color:#10b981;">대기 ${stats.nextWaitlistNo}번</strong> 배정)`;
        }
        if (noticeTitleEl) {
          noticeTitleEl.innerHTML = `🎉 정원 10명 조기 마감! 현재 <strong style="color:#fbbf24;">대기자 ${stats.waitlistCount}명</strong> 추가 접수 중 (11월 30일 최종 마감)`;
        }
        if (formNoticeTitleEl) {
          formNoticeTitleEl.innerHTML = `현재 정원 마감으로 인해 <strong style="color:#fbbf24;">[대기 순번 ${stats.nextWaitlistNo}번]</strong>으로 자동 배정됩니다. (11월 30일 마감)`;
        }
        if (submitBtnTextEl) {
          submitBtnTextEl.textContent = `📝 수강 대기자 신청 접수하기 (대기 순번 ${stats.nextWaitlistNo}번)`;
        }
      } else {
        // 10명 미만인 경우
        const remain = stats.capacity - stats.totalApplicants;
        const pct = Math.round((stats.totalApplicants / stats.capacity) * 100);
        if (heroBadgeEl) {
          heroBadgeEl.textContent = `실시간 접수: ${stats.totalApplicants}명 / 10명 달성 시 개강 (11/30 마감, 잔여 ${remain}석) ➔`;
        }
        if (modalCountEl) {
          modalCountEl.textContent = `현재 ${stats.totalApplicants}명 / 정원 10명 (${pct}%) [잔여 ${remain}석]`;
        }
        if (modalBarEl) {
          modalBarEl.style.width = `${pct}%`;
          modalBarEl.style.background = 'linear-gradient(90deg, #f59e0b, #10b981)';
        }
        if (formCountEl) {
          formCountEl.textContent = `현재 ${stats.totalApplicants}명 신청 접수 중 / 정원 10명 (잔여 ${remain}석, 11월 30일 마감)`;
        }
      }
    }

    let lastKnownRealCount = 0;

    async function refreshLiveApplicantCount() {
      let realCount = 0;
      
      // 1. Try Firebase Firestore
      try {
        if (window.firestore) {
          const snap = await firestore.collection('rea_course_applications').get();
          realCount = snap.size;
        }
      } catch (e) {
        console.warn('Firestore count notice:', e.message);
      }

      // 2. Check LocalStorage fallback
      try {
        const localRaw = localStorage.getItem('dmdg_rea_applications');
        if (localRaw) {
          const list = JSON.parse(localRaw);
          realCount = Math.max(realCount, list.length);
        }
      } catch (e) {}

      lastKnownRealCount = realCount;
      renderApplicantUI(realCount);
    }

    // 1분마다 주기적으로 자동 체크하여 매시간 변경 시 즉시 화면에 반영
    setInterval(() => {
      renderApplicantUI(lastKnownRealCount);
    }, 60000);

    // Attach real-time snapshot listener on init
    function initFirestoreLiveApplicantListener() {
      if (window.firestore) {
        try {
          firestore.collection('rea_course_applications').onSnapshot(snap => {
            lastKnownRealCount = snap.size;
            renderApplicantUI(snap.size);
          }, err => {
            console.warn('Realtime snapshot notice:', err);
          });
        } catch (e) {}
      }
    }

    // ── Metropolitan Districts Mapping (수도권 한정: 서울특별시, 경기도, 인천광역시) ──
    const METRO_DISTRICTS = {
      "서울특별시": [
        "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", 
        "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", 
        "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
      ],
      "경기도": [
        "성남시 분당구", "성남시 수정구", "성남시 중원구", "수원시", "고양시", "용인시", "부천시", 
        "안산시", "안양시", "남양주시", "화성시", "평택시", "의정부시", "시흥시", "파주시", 
        "광명시", "김포시", "군포시", "광주시", "이천시", "양주시", "오산시", "구리시", 
        "안성시", "포천시", "의왕시", "하남시", "여주시", "양평군", "동두천시", "과천시", "가평군", "연천군"
      ],
      "인천광역시": [
        "중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"
      ]
    };

    function updateDistrictOptions(metroSelectId, districtSelectId) {
      const metroEl = document.getElementById(metroSelectId);
      const districtEl = document.getElementById(districtSelectId);
      if (!metroEl || !districtEl) return;

      const selectedMetro = metroEl.value;
      districtEl.innerHTML = '<option value="">구/군 선택</option>';

      if (selectedMetro && METRO_DISTRICTS[selectedMetro]) {
        METRO_DISTRICTS[selectedMetro].forEach(d => {
          const opt = document.createElement('option');
          opt.value = d;
          opt.textContent = d;
          districtEl.appendChild(opt);
        });
      }
    }

    // ── Form Submission & Database Storage ──────────────────────────────────
    async function handleCourseApplySubmit(e) {
      e.preventDefault();

      const name = document.getElementById('reaApplicantName').value.trim();
      const phone = document.getElementById('reaApplicantPhone').value.trim();
      const metro = document.getElementById('reaApplicantMetro').value;
      const district = document.getElementById('reaApplicantDistrict').value;
      const cardOption = document.querySelector('input[name="reaHasCard"]:checked');
      const hasCard = cardOption ? cardOption.value : '미소지';

      if (!name || !phone || !metro || !district) {
        alert('이름, 연락처, 수도권 거주 지역(시/도 및 구/군)을 모두 선택해 주세요.');
        return;
      }
      const region = `${metro} ${district}`;

      const phoneRegex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/;
      if (!phoneRegex.test(phone)) {
        alert('올바른 휴대전화 번호(010-XXXX-XXXX)를 입력해 주세요.');
        document.getElementById('reaApplicantPhone').focus();
        return;
      }

      const submitBtn = document.getElementById('btnSubmitApplication');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ 신청 데이터 저장 중...</span>`;

      const applicationRecord = {
        name: name,
        phone: phone,
        region: region,
        hasCard: hasCard,
        createdAt: new Date().toISOString()
      };

      // 1. Save to Firebase Firestore
      let savedToFirestore = false;
      if (window.firestore) {
        try {
          await firestore.collection('rea_course_applications').add({
            ...applicationRecord,
            timestamp: firebase.firestore.FieldValue ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
          });
          savedToFirestore = true;
        } catch (err) {
          console.warn('Firestore direct save notice, falling back to local:', err.message);
        }
      }

      // 2. Always Save to LocalStorage (Resilient Persistence)
      try {
        const localRaw = localStorage.getItem('dmdg_rea_applications') || '[]';
        const list = JSON.parse(localRaw);
        list.push(applicationRecord);
        localStorage.setItem('dmdg_rea_applications', JSON.stringify(list));
      } catch (err) {
        console.warn('LocalStorage save error:', err);
      }

      // Refresh Counts
      await refreshLiveApplicantCount();
      initFirestoreLiveApplicantListener();

      // Show Success View
      document.getElementById('course-apply-view').style.display = 'none';
      document.getElementById('course-success-view').style.display = 'block';
      document.getElementById('successApplicantName').textContent = name;

      // Reset form & button
      e.target.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>💾 과정 신청 저장하기</span>`;
    }
  