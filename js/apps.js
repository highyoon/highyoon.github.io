import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper from 'swiper';

/* global $ */
export default {
  variable: { serviceSwiper: null },
  el: {
    $container: null,
    $tab: null,
  },
  selector: {
    tab: '.yearTab',
  },
  setProperty() {
    const { $container } = this.el;
    const { tab } = this.selector;

    this.el.$tab = $container.find(tab);
  },
  bind() {},
  init(el) {
    this.el.$container = $(el);

    console.log('about :: init');

    if (!this.el.$container.length) {
      return;
    }

    this.common = window.mvJs.common;
    this.utils = window.mvJs.utils;

    this.setProperty();
    this.bind();

    this.initVisual();
    this.initCompany();
    this.initServiceSwiper();
    this.initAwards();

    ScrollTrigger.matchMedia({
      '(min-width: 1901px)': this.initAboutBanner.bind(this, 130),
      '(min-width: 800px) and (max-width: 1900px)': this.initAboutBanner.bind(this, 80),
      '(max-width: 799px)': this.initAboutBanner.bind(this, 60),
    });

    this.inited = this.el.$container.length > 0;

    console.log('about :: init - complete');
  },
  breakpointChecker(/* mode */) {
    this.initAwards();
  },
  /**
   * �곷떒 鍮꾩＜�� fixed
   */
  initVisual() {
    gsap.utils.toArray(['.visualItem', '.detailView']).forEach((item, idx) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top top',
        end: !idx ? '100%' : '0',
        pin: true,
        pinSpacing: false,
        onRefresh: (self) => {
          // forEach 以� 1�뚮쭔�� �꾪븳 if臾�
          if ($(self.trigger).hasClass('detailView')) {
            // �댁썙�� �곕룄蹂� scrolltrigger refresh (2以� pin-spacer �닿린 �뚮Ц�� �곕줈 refresh)
            const st = ScrollTrigger.getById('st-awards');
            if (st) {
              setTimeout(() => {
                st.refresh();
              });
            }
          }
        },
      });
    });

    //�먮┛ �명꽣�� > �붾㈃ 由ъ궗�댁쫰 �� .pin-spacer �곸뿭 �믪씠 紐� �〓뒗 �ㅻ쪟 �섏젙
    $('.detailView img').on('load', function () {
      $('.detailView').resize();
    });
  },
  /**
   * �뚯궗�뚭컻 �뱀뀡
   */
  initCompany() {
    // Service User Brand �띿뒪��
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.companyProfile',
          start: 'top 80%',
        },
      })
      .to('.companyProfile .cvTxt strong', {
        y: 0,
        stagger: 0.3,
        ease: 'power1',
        duration: 1,
      });

    // �뚯궗 嫄대Ъ �대�吏�
    gsap.to('.coreValues + .img', {
      width: '100%',
      duration: 1,
      scrollTrigger: {
        trigger: '.coreValues + .img',
        start: 'top 80%',
      },
    });

    const tl = gsap.timeline();
    const imgThreshold = () =>
      parseInt($('.coreValues + .img > img').outerHeight() - $('.coreValues + .img').outerHeight());
    ScrollTrigger.create({
      id: 'st-company-img',
      animation: tl,
      trigger: '.coreValues + .img',
      start: 'top bottom',
      scrub: true,
      onRefresh: () => {
        // �믪씠 �ш퀎�곗쓣 �꾪븳 timeline �ъ젙��
        tl.clear();
        tl.add([
          gsap.to('.coreValues + .img > img', {
            startAt: {
              y: 0,
            },
            y: () => -imgThreshold(),
            duration: 1,
          }),
        ]);
      },
    });

    // �쒕퉬�� 臾멸뎄
    /* gsap.fromTo(
      '.srv > strong, .srv > p',
      {
        y      : 100,
        opacity: 0
      },
      {
        y            : 0,
        opacity      : 1,
        stagger      : 0.3,
        duration     : 1,
        scrollTrigger: {
          trigger: '.srv',
          start  : 'top 80%'
        }
      }
    ); */

    // �쒕퉬�� �ㅼ��댄봽 �깆옣 紐⑥뀡
    gsap.fromTo(
      '.srvSwiper',
      {
        xPercent: 30,
      },
      {
        xPercent: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.srvSwiper',
          start: 'top bottom',
        },
      }
    );
  },
  /**
   * �щ컮瑜� 釉뚮옖�� 寃쏀뿕�� �뚮퉬�먯뿉寃� �꾨떖�섍쿋�듬땲��.
   * @param {*} distance 誘몃뵒�� 荑쇰━ 留ㅼ튂蹂� y �꾩튂 媛�
   */
  initAboutBanner(distance) {
    // txt
    gsap.fromTo(
      '.aboutBanner p',
      {
        zIndex: 1,
        yPercent: distance,
      },
      {
        yPercent: 0,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.aboutBanner',
          start: 'top-=50% bottom',
          end: '50%',
          scrub: true,
        },
      }
    );

    // 踰쎈㈃ ci �뺣� 紐⑥뀡
    gsap.fromTo(
      '.aboutBanner span.img img',
      {
        scale: 1.3,
      },
      {
        zIndex: 0,
        scale: 1,
        duration: 1,
        scrollTrigger: {
          trigger: '.aboutBanner span.img',
          toggleActions: 'restart reverse play reverse',
          start: 'top bottom',
        },
      }
    );
  },
  /**
   * �댁썙�� sticky
   */
  initAwards() {
    const st = ScrollTrigger.getById('st-awards');

    if (st) {
      st.kill();
    }

    const tl = gsap.timeline();

    ScrollTrigger.create({
      id: 'st-awards',
      animation: tl,
      trigger: '.awardsProfile .inner',
      start: () => {
        // �댁썙�� �곕룄蹂� 蹂�寃쎈릺�� 而⑦뀗痢� �대룞 紐⑹쟻 ypos 怨꾩궛�� �꾪빐 timeline �ъ젙��
        const threshold = window.innerHeight - this.el.$tab.outerHeight(true) - this.el.$tab.next().outerHeight(true);

        tl.clear();

        if (threshold < 0) {
          tl.add(
            gsap.to('.yearContainer', {
              y: threshold,
              ease: 'none',
            })
          );
        }

        const topDistance = Math.floor(this.el.$tab.position().top);
        return `top+=${topDistance}px top`;
      },
      endTrigger: '.aboutBanner',
      end: 'top bottom',
      pin: true,
      pinSpacing: false,
      scrub: true,
    });
  },
  /**
   * �쒕퉬�� �ㅼ��댄봽
   */
  initServiceSwiper() {
    // swiper
    this.variable.serviceSwiper = new Swiper('.srvSwiper .swiper-container', {
      slidesPerView: 'auto',
      freeMode: true,
    });
  },
};
