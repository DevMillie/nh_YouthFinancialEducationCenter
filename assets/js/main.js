(function ($) {
  'use strict';

  /**
   * 교육 유형명 → 컬러 키 매핑.
   * 카드 클래스(education-card--green 등)를 만들 때 사용하며,
   * 동일 컬러 키가 지역센터 교육리스트(US030301)의 edu-card--{color}와 매칭된다.
   * 컬러 팔레트는 base.css(--edu-{color}-*)에서 단일 관리한다.
   */
  var EDUCATION_TYPE_MAP = {
    '상시교육': 'green',
    '테마교육': 'teal',
    'N키즈': 'blue',
    '진로교육': 'yellow',
    'N썸머': 'orange',
    'N윈터': 'gray',
    'N주니어': 'purple',
    '기타': 'pink',
    '교육 추가 1': 'red',
    '교육 추가 2': 'navy',
    '교육 추가 3': 'skyblue',
    '교육 추가 4': 'lime',
    '교육 추가 5': 'brown',
    '교육 추가 6': 'coral',
    '교육 추가 7': 'olive'
  };

  // 지역 탭 노출 순서 (기획 고정)
  var REGIONS = [
    '서울(본부)', '서울(강남)', '강원', '세종', '대전',
    '광주', '대구', '울산', '경남', '경북',
    '부산', '제주', '경기', '전남', '전북',
    '충남', '충북'
  ];

  /**
   * 운영 데이터 소스(샘플).
   * 구조:
   *  - 1depth key: 지역명
   *  - 2depth key: 날짜(YYYY-M-D)
   *  - value: 해당 날짜 교육 배열
   */
  var EDUCATION_BY_REGION = {
    '서울(본부)': {
      '2026-5-10': [{ type: '상시교육', region: '서울(본부)', title: '5월 금융 기초 (지난 일정)', date: '2026.05.10 오전 10시', target: '초등학생 (1-3학년)', format: '대면(센터) 교육' }],
      '2026-5-20': [{ type: '테마교육', region: '서울(본부)', title: '디지털 결제 이해하기 (지난 일정)', date: '2026.05.20 오후 2시', target: '중학생', format: '대면(센터) 교육' }],
      '2026-5-26': [{ type: '상시교육', region: '서울(본부)', title: '오늘의 금융 교육', date: '2026.05.26 오전 11시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }],
      '2026-5-30': [{ type: 'N키즈', region: '서울(본부)', title: 'N키즈 체험 교육 두줄이 되면 어떻게 보일까요 알아맞춰봐요', date: '2026.05.30 오후 1시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }],
      '2026-6-6': [{ type: '상시교육', region: '서울(본부)', title: '6월 가계부 만들기', date: '2026.06.06 오전 10시', target: '초등학생 (1-3학년)', format: '대면(센터) 교육' }],
      '2026-6-18': [
        { type: '상시교육', region: '서울(본부)', title: '여름방학 금융 특강 A', date: '2026.06.18 오전 10시', target: '중학생', format: '대면(센터) 교육' },
        { type: '테마교육', region: '서울(본부)', title: '여름방학 금융 특강 B', date: '2026.06.18 오후 2시', target: '고등학생', format: '대면(센터) 교육' }
      ],
      '2026-7-9': [{ type: '진로교육', region: '서울(본부)', title: '진로와 금융 이해', date: '2026.07.09 오후 2시', target: '고등학생', format: '대면(센터) 교육' }],
      '2026-7-24': [{ type: '테마교육', region: '서울(본부)', title: '7월 금융 사기 예방', date: '2026.07.24 오전 11시', target: '중학생', format: '대면(센터) 교육' }]
    },
    '서울(강남)': {
      '2026-5-8': [{ type: '상시교육', region: '서울(강남)', title: '용돈 관리 기초 (지난 일정)', date: '2026.05.08 오전 10시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }],
      '2026-5-26': [
        { type: '상시교육', region: '서울(강남)', title: '강남 오늘의 금융교육 A', date: '2026.05.26 오전 10시', target: '초등학생 (1-3학년)', format: '대면(센터) 교육' },
        { type: '테마교육', region: '서울(강남)', title: '강남 오늘의 금융교육 B', date: '2026.05.26 오후 3시', target: '중학생', format: '대면(센터) 교육' }
      ],
      '2026-6-4': [{ type: 'N키즈', region: '서울(강남)', title: 'N키즈 6월 프로그램', date: '2026.06.04 오전 10시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }],
      '2026-6-22': [{ type: '진로교육', region: '서울(강남)', title: '미래 직업과 금융', date: '2026.06.22 오후 2시', target: '중학생', format: '대면(센터) 교육' }],
      '2026-7-14': [{ type: '상시교육', region: '서울(강남)', title: '7월 상시 금융교육', date: '2026.07.14 오후 1시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }]
    },
    '경기': {
      '2026-5-15': [{ type: '상시교육', region: '경기', title: '경기 5월 금융 기초 (지난 일정)', date: '2026.05.15 오후 2시', target: '초등학생 (1-3학년)', format: '대면(센터) 교육' }],
      '2026-5-28': [{ type: '테마교육', region: '경기', title: '경기 디지털 금융 체험', date: '2026.05.28 오전 11시', target: '중학생', format: '대면(센터) 교육' }],
      '2026-6-12': [{ type: '상시교육', region: '경기', title: '경기 6월 금융교육', date: '2026.06.12 오후 2시', target: '초등학생 (1-3학년)', format: '대면(센터) 교육' }],
      '2026-7-3': [{ type: 'N키즈', region: '경기', title: '경기 N키즈 여름 특강', date: '2026.07.03 오전 10시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }]
    },
    '부산': {
      '2026-5-22': [{ type: '상시교육', region: '부산', title: '부산 5월 금융교육 (지난 일정)', date: '2026.05.22 오전 10시', target: '초등학생 (1-3학년)', format: '대면(센터) 교육' }],
      '2026-6-8': [{ type: '테마교육', region: '부산', title: '부산 6월 테마교육', date: '2026.06.08 오후 2시', target: '중학생', format: '대면(센터) 교육' }],
      '2026-7-17': [{ type: '진로교육', region: '부산', title: '부산 7월 진로교육', date: '2026.07.17 오후 1시', target: '고등학생', format: '대면(센터) 교육' }]
    },
    '대전': {
      '2026-5-19': [{ type: '상시교육', region: '대전', title: '대전 5월 교육 (지난 일정)', date: '2026.05.19 오후 2시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }],
      '2026-6-15': [{ type: 'N키즈', region: '대전', title: '대전 N키즈 프로그램', date: '2026.06.15 오전 10시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }],
      '2026-7-10': [{ type: '상시교육', region: '대전', title: '대전 7월 상시교육', date: '2026.07.10 오후 2시', target: '중학생', format: '대면(센터) 교육' }]
    },
    '광주': {
      '2026-5-27': [{ type: '테마교육', region: '광주', title: '광주 5월 테마교육', date: '2026.05.27 오전 11시', target: '중학생', format: '대면(센터) 교육' }],
      '2026-6-25': [{ type: '상시교육', region: '광주', title: '광주 6월 금융교육', date: '2026.06.25 오후 2시', target: '초등학생 (1-3학년)', format: '대면(센터) 교육' }],
      '2026-7-21': [{ type: '진로교육', region: '광주', title: '광주 7월 진로교육', date: '2026.07.21 오후 1시', target: '고등학생', format: '대면(센터) 교육' }]
    },
    '강원': {
      '2026-5-12': [{ type: '상시교육', region: '강원', title: '강원 5월 교육 (지난 일정)', date: '2026.05.12 오전 10시', target: '초등학생 (1-3학년)', format: '대면(센터) 교육' }],
      '2026-6-11': [{ type: '테마교육', region: '강원', title: '강원 6월 테마교육', date: '2026.06.11 오후 2시', target: '중학생', format: '대면(센터) 교육' }],
      '2026-7-7': [{ type: 'N키즈', region: '강원', title: '강원 N키즈 체험', date: '2026.07.07 오전 10시', target: '초등학생 (4-6학년)', format: '대면(센터) 교육' }]
    }
  };

  /** 메인 비주얼 슬라이드 데이터 */
  var MAIN_VISUAL_SLIDES = [
    { image: 'https://www.figma.com/api/mcp/asset/5c53c0c3-91f4-4e25-a102-b452c4bcac3e' },
    { image: 'https://www.figma.com/api/mcp/asset/5c53c0c3-91f4-4e25-a102-b452c4bcac3e' },
    { image: 'https://www.figma.com/api/mcp/asset/5c53c0c3-91f4-4e25-a102-b452c4bcac3e' },
    { image: 'https://www.figma.com/api/mcp/asset/5c53c0c3-91f4-4e25-a102-b452c4bcac3e' }
  ];

  /** 프로그램 섹션 카드 슬라이드 데이터 */
  var PROGRAM_SLIDES = [
    { image: 'https://www.figma.com/api/mcp/asset/8b86db9f-ea96-4ab0-8b2c-0e98fe485982', title: '상시교육 · 테마교육', desc: '금융 기초를 쉽고 재미있게<br>배우는 교육' },
    { image: 'https://www.figma.com/api/mcp/asset/7b32d4d8-dc34-4bf2-af82-adf334bf1774', title: 'N키즈 금융학기제', desc: '한 학기 동안 체계적으로<br>배우는 금융교육' },
    { image: 'https://www.figma.com/api/mcp/asset/3e4157ef-b0ae-4e79-81d6-f50cf54a7cfd', title: 'N썸머 · N윈터', desc: '방학 동안 집중적으로<br>배우는 금융 프로그램' },
    { image: 'https://www.figma.com/api/mcp/asset/d4f1e036-3863-4805-bfb2-27eee9804e60', title: 'N주니어', desc: '청소년을 위한<br>실전 금융 이해 교육' },
    { image: 'https://www.figma.com/api/mcp/asset/7b32d4d8-dc34-4bf2-af82-adf334bf1774', title: 'N키즈 금융학기제', desc: '한 학기 동안 체계적으로<br>배우는 금융교육' }
  ];

  var todayDate = new Date();
  var state = {
    region: '서울(본부)',
    year: todayDate.getFullYear(),
    month: todayDate.getMonth() + 1,
    selectedKey: null
  };

  // Swiper 인스턴스 캐시 (재렌더 시 destroy 후 재생성)
  var mainVisualSwiper, regionTabsSwiper, educationCardSwiper, programSwiper;

  /** 날짜를 내부 key 포맷(YYYY-M-D)으로 변환 */
  function dateKey(y, m, d) {
    return y + '-' + m + '-' + d;
  }

  /** 교육 유형 문자열을 카드 컬러 키로 변환 (미정의 시 green) */
  function getEducationTypeKey(type) {
    return EDUCATION_TYPE_MAP[type] || 'green';
  }

  /** 현재 선택 지역의 일정 객체를 반환 */
  function getRegionSchedule() {
    return EDUCATION_BY_REGION[state.region] || {};
  }

  /** 해당 날짜에 일정이 1건 이상 존재하는지 여부 */
  function hasEducationOnDay(y, m, d) {
    return !!getRegionSchedule()[dateKey(y, m, d)];
  }

  /** 전달받은 날짜가 오늘인지 비교 */
  function isToday(y, m, d) {
    var now = new Date();
    return now.getFullYear() === y && now.getMonth() + 1 === m && now.getDate() === d;
  }

  /** 전달받은 날짜가 오늘보다 과거인지 비교(시분초 제거) */
  function isPastDate(y, m, d) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var target = new Date(y, m - 1, d);
    target.setHours(0, 0, 0, 0);
    return target < today;
  }

  /** 선택 가능한 날짜인지 판단(일정 존재 + 과거 아님) */
  function isSelectableDay(y, m, d) {
    return hasEducationOnDay(y, m, d) && !isPastDate(y, m, d);
  }

  /** 해당 월에서 가장 빠른 선택 가능 날짜(day number) 반환 */
  function getFirstSelectableDay(y, m) {
    var schedule = getRegionSchedule();
    var days = Object.keys(schedule)
      .map(function (k) {
        var p = k.split('-');
        if (+p[0] === y && +p[1] === m && !isPastDate(y, m, +p[2])) return +p[2];
        return null;
      })
      .filter(Boolean)
      .sort(function (a, b) { return a - b; });
    return days[0] || null;
  }

  // 현재 월에서 선택 가능한 날짜를 자동 보정한다.
  // 우선순위: 기존 선택값 -> 오늘 -> 해당 월 첫 가능 일정
  function resolveSelectedKey() {
    var schedule = getRegionSchedule();
    var y = state.year;
    var m = state.month;

    if (state.selectedKey) {
      var parts = state.selectedKey.split('-');
      if (+parts[0] === y && +parts[1] === m && schedule[state.selectedKey] && !isPastDate(y, m, +parts[2])) {
        return state.selectedKey;
      }
    }

    if (y === todayDate.getFullYear() && m === todayDate.getMonth() + 1) {
      if (isSelectableDay(y, m, todayDate.getDate())) {
        state.selectedKey = dateKey(y, m, todayDate.getDate());
        return state.selectedKey;
      }
      state.selectedKey = null;
      return null;
    }

    var firstDay = getFirstSelectableDay(y, m);
    state.selectedKey = firstDay ? dateKey(y, m, firstDay) : null;
    return state.selectedKey;
  }

  /**
   * 메인 비주얼 렌더링.
   * 기존 Swiper 인스턴스가 있으면 파기 후 재생성한다.
   */
  function renderMainVisual() {
    var html = MAIN_VISUAL_SLIDES.map(function (s) {
      return '<div class="swiper-slide">' +
        '<img class="slide-bg" src="' + s.image + '" alt=""></div>';
    }).join('');
    $('#mainVisualWrapper').html(html);
    if (mainVisualSwiper) mainVisualSwiper.destroy(true, true);
    mainVisualSwiper = new Swiper('.main-visual-swiper', {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.main-visual-swiper .swiper-pagination', clickable: true }
    });
  }

  /**
   * 지역 탭 렌더링.
   * state.region 기준으로 활성 탭(is-active) 처리한다.
   */
  function renderRegionTabs() {
    var html = REGIONS.map(function (r) {
      var cls = r === state.region ? ' region-tab is-active' : ' region-tab';
      return '<div class="swiper-slide"><button type="button" class="' + cls.trim() + '" data-region="' + r + '">' + r + '</button></div>';
    }).join('');
    $('#regionTabsWrapper').html(html);
    if (regionTabsSwiper) regionTabsSwiper.destroy(true, true);
    regionTabsSwiper = new Swiper('.region-tabs-swiper', {
      slidesPerView: 'auto',
      spaceBetween: 28,
      freeMode: true,
      breakpoints: {
        0: { spaceBetween: 8 },
        1024: { spaceBetween: 28 }
      }
    });
  }

  // 캘린더 UI 렌더 + 선택 상태 동기화
  function renderCalendar() {
    var y = state.year;
    var m = state.month;
    resolveSelectedKey();

    $('#calendarMonth').text(y + '년 ' + String(m).padStart(2, '0') + '월');

    var first = new Date(y, m - 1, 1);
    var last = new Date(y, m, 0);
    var startPad = (first.getDay() + 6) % 7;
    var daysInMonth = last.getDate();
    var prevLast = new Date(y, m - 1, 0).getDate();

    var html = '';
    var i, dayNum, cellClass, key;

    for (i = 0; i < startPad; i++) {
      dayNum = prevLast - startPad + i + 1;
      html += '<span class="calendar__day calendar__day--other">' + dayNum + '</span>';
    }

    for (dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      key = dateKey(y, m, dayNum);
      cellClass = 'calendar__day';
      if (hasEducationOnDay(y, m, dayNum)) {
        cellClass += ' calendar__day--has';
        if (isPastDate(y, m, dayNum)) {
          cellClass += ' calendar__day--past';
        }
      }
      if (isToday(y, m, dayNum)) {
        cellClass += ' calendar__day--today';
      }
      if (state.selectedKey === key && isSelectableDay(y, m, dayNum)) {
        cellClass += ' calendar__day--selected';
      }
      html += '<button type="button" class="' + cellClass + '" data-key="' + key + '" data-day="' + dayNum + '">' + dayNum + '</button>';
    }

    var total = startPad + daysInMonth;
    var remain = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (i = 1; i <= remain; i++) {
      html += '<span class="calendar__day calendar__day--other">' + i + '</span>';
    }

    $('#calendarGrid').html(html);
    syncEducationPanel();
  }

  /** 선택 날짜(state.selectedKey)에 맞춰 우측 패널 상태를 동기화 */
  function syncEducationPanel() {
    var schedule = getRegionSchedule();
    var items = state.selectedKey ? schedule[state.selectedKey] : null;

    if (items && items.length) {
      showEducationCards(items);
    } else {
      showEmptyPanel();
    }
  }

  /**
   * 빈 상태 패널 표시.
   * 선택 가능한 일정이 없을 때 호출된다.
   */
  function showEmptyPanel() {
    $('#educationEmpty').removeClass('is-hidden');
    $('#educationEmpty .tag--gray').text(state.region);
    $('#educationCards').addClass('is-hidden').removeClass('is-multi');
    if (educationCardSwiper) {
      educationCardSwiper.destroy(true, true);
      educationCardSwiper = null;
    }
  }

  /** 카드 메타 정보 라벨(일정/대상/형태) 아이콘 경로 */
  var META_ICONS = {
    date: 'assets/images/page/DateRangeSharp.svg',
    target: 'assets/images/page/PersonSearchSharp.svg',
    format: 'assets/images/page/CategorySharp.svg'
  };

  /** 메타 항목 라벨 마크업 생성 */
  function buildMetaLabel(iconKey, text) {
    return '<span class="label"><img src="' + META_ICONS[iconKey] + '" alt="" class="meta-icon" width="26" height="26">' + text + '</span>';
  }

  /** 교육 카드 1건 마크업 생성 */
  function buildEducationCard(item) {
    var typeKey = getEducationTypeKey(item.type);
    return '<div class="swiper-slide"><article class="education-card education-card--' + typeKey + '">' +
      '<div class="education-card__tags">' +
      '<span class="tag tag--type">' + item.type + '</span>' +
      '<span class="tag tag--gray">' + item.region + '</span></div>' +
      '<h4 class="education-card__title">' + '<span>' + item.title + '</span></h4>' +
      '<ul class="education-card__meta">' +
      '<li>' + buildMetaLabel('date', '교육일정') + '<span>' + item.date + '</span></li>' +
      '<li>' + buildMetaLabel('target', '교육대상') + '<span>' + item.target + '</span></li>' +
      '<li>' + buildMetaLabel('format', '교육형태') + '<span>' + item.format + '</span></li></ul>' +
      '<button type="button" class="btn-apply">신청하기</button></article></div>';
  }

  /**
   * 교육 카드 영역 렌더링.
   * 2건 이상이면 loop/pagination을 활성화한다.
   */
  function showEducationCards(items) {
    var $cards = $('#educationCards');
    var multi = items.length > 1;

    $('#educationEmpty').addClass('is-hidden');
    $cards.removeClass('is-hidden').toggleClass('is-multi', multi);
    $('#educationCardWrapper').html(items.map(buildEducationCard).join(''));
    $('#educationPrev, #educationNext').addClass('is-hidden');

    if (educationCardSwiper) {
      educationCardSwiper.destroy(true, true);
      educationCardSwiper = null;
    }

    educationCardSwiper = new Swiper('.education-card-swiper', {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: false,
      loop: multi,
      observer: true,
      observeParents: true,
      watchOverflow: true,
      pagination: multi ? {
        el: '.education-card-swiper .swiper-pagination',
        clickable: true
      } : false
    });
  }

  /** 프로그램 소개 카드 슬라이더 렌더링 */
  function renderPrograms() {
    var html = PROGRAM_SLIDES.map(function (p) {
      return '<div class="swiper-slide"><div class="program-card">' +
        '<img class="program-card__img" src="' + p.image + '" alt="">' +
        '<h3 class="program-card__title">' + p.title + '</h3>' +
        '<p class="program-card__desc">' + p.desc + '</p></div></div>';
    }).join('');
    $('#programWrapper').html(html);
    if (programSwiper) programSwiper.destroy(true, true);
    programSwiper = new Swiper('.program-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: '#programNext',
        prevEl: '#programPrev'
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4, spaceBetween: 32 }
      }
    });
  }

  /**
   * 지역 변경 핸들러.
   * 선택 날짜를 초기화하고 탭/캘린더를 재렌더링한다.
   */
  function changeRegion(region) {
    state.region = region;
    state.selectedKey = null;
    renderRegionTabs();
    renderCalendar();
  }

  /**
   * 캘린더 날짜 선택 처리.
   * 과거 날짜는 무시하고 선택 class 및 패널을 갱신한다.
   */
  function selectCalendarDay(key) {
    var parts = key.split('-');
    if (isPastDate(+parts[0], +parts[1], +parts[2])) return;

    state.selectedKey = key;
    $('.calendar__day--selected').removeClass('calendar__day--selected');
    $('.calendar__day[data-key="' + key + '"]').addClass('calendar__day--selected');
    syncEducationPanel();
  }

  /** 모바일 GNB 브레이크포인트 판정 */
  function isMobileNav() {
    return window.innerWidth <= 1023;
  }

  /** 모바일 GNB 닫기 + 접근성 속성 복원 */
  function closeMobileNav() {
    $('#headerNav').removeClass('is-open');
    $('body').removeClass('is-gnb-open');
    $('#menuBtn').attr({ 'aria-expanded': 'false', 'aria-label': '메뉴 열기' });
  }

  /** 모바일 GNB 열기 + 접근성 속성 갱신 */
  function openMobileNav() {
    $('#headerNav').addClass('is-open');
    $('body').addClass('is-gnb-open');
    $('#menuBtn').attr({ 'aria-expanded': 'true', 'aria-label': '메뉴 닫기' });
  }

  // NOTE: 아래 3개 함수는 기존 구조 유지 목적의 중복 선언이며 동작은 동일하다.
  function isMobileNav() {
    return window.innerWidth <= 1023;
  }

  function closeMobileNav() {
    $('#headerNav').removeClass('is-open');
    $('body').removeClass('is-gnb-open');
    $('#menuBtn').attr({ 'aria-expanded': 'false', 'aria-label': '메뉴 열기' });
  }

  function openMobileNav() {
    $('#headerNav').addClass('is-open');
    $('body').addClass('is-gnb-open');
    $('#menuBtn').attr({ 'aria-expanded': 'true', 'aria-label': '메뉴 닫기' });
  }

  // 헤더 상호작용 초기화 (hover/dropdown/mobile/scroll shadow)
  function initHeader() {
    var $gnbItems = $('.gnb__item');
    var $gnb = $('#headerNav');
    var $header = $('.header');

    function updateHeaderShadow() {
      if (!$header.length) return;
      // 서브 페이지(.wrap .body 존재)는 1px부터, 메인은 헤더 높이 이후 그림자 적용
      var isSubPage = $('.wrap .body').length > 0;
      var threshold = isSubPage ? 1 : ($header.outerHeight() || 0);
      $header.toggleClass('is-scrolled', window.scrollY >= threshold);
    }

    $gnbItems.on('mouseenter', function () {
      if (isMobileNav()) return;
      $gnbItems.removeClass('is-hover');
      $(this).addClass('is-hover');
    });

    $gnbItems.on('mouseleave', function () {
      if (isMobileNav()) return;
      $(this).removeClass('is-hover');
    });

    $('#menuBtn').on('click', function () {
      if ($gnb.hasClass('is-open')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });

    $('.gnb__link').on('click', function (e) {
      if (!isMobileNav()) return;

      e.preventDefault();
      var $item = $(this).closest('.gnb__item');
      var willExpand = !$item.hasClass('is-expanded');

      $gnbItems.not($item).removeClass('is-expanded');
      $item.toggleClass('is-expanded', willExpand);
    });

    $(window).on('resize', function () {
      if (!isMobileNav()) {
        closeMobileNav();
        $gnbItems.removeClass('is-expanded');
        $gnbItems.first().addClass('is-expanded');
        $gnbItems.removeClass('is-hover');
      }
      updateHeaderShadow();
    });

    $(window).on('scroll', updateHeaderShadow);
    updateHeaderShadow();
  }

  // 사용자 이벤트 바인딩 (지역/캘린더/월 이동)
  function bindEvents() {
    $(document).on('click', '.region-tab', function () {
      changeRegion($(this).data('region'));
    });

    $('#regionPrev').on('click', function () {
      if (regionTabsSwiper) regionTabsSwiper.slidePrev();
    });
    $('#regionNext').on('click', function () {
      if (regionTabsSwiper) regionTabsSwiper.slideNext();
    });

    $('#calendarGrid').on('click', '.calendar__day--has:not(.calendar__day--past)', function () {
      selectCalendarDay($(this).data('key'));
    });

    $('#calendarPrev').on('click', function () {
      state.month--;
      if (state.month < 1) { state.month = 12; state.year--; }
      state.selectedKey = null;
      renderCalendar();
    });

    $('#calendarNext').on('click', function () {
      state.month++;
      if (state.month > 12) { state.month = 1; state.year++; }
      state.selectedKey = null;
      renderCalendar();
    });
  }

  // 엔트리 포인트
  $(function () {
    renderMainVisual();
    renderRegionTabs();
    renderCalendar();
    renderPrograms();
    initHeader();
    bindEvents();
  });
})(jQuery);
