gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

(function ($) {
  'use strict';

  $(function () {
    $(window).load(function () {
      $('body').addClass('finish');
      setTimeout(function () {
        $('body').addClass('loaded');
      }, 500);
    });

    let fullPageCreated = false;
    function createFullpage() {
      if ($(window).width() > 959) {
        fullPageCreated = true;
        $('#fullpage_wrap').fullpage({
          navigation: true,
          anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
          showActiveTooltip: true,
          easing: 'easeInOutCubic',
          easingcss3: 'ease',
          css3: true,
          normalScrollElements: '.scroll',
          scrollOverflow: true,
          navigationTooltips: ['메인', 'ABOUT', 'ABOUT', 'ABOUT', 'WORK', 'WORK', 'LOCATION'],
          onLeave: function (origin, destination, direction) {
            $('#fullpage_wrap').on('scroll touchmove mousewheel', function (e) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            });

            console.log('origin' + direction);
            swiper.mousewheel.disable();
            if (origin == 1 && direction == 'down') {
              $('#fp-nav ul li:eq(1)').addClass('on');
            }
            if (origin == 2 && direction == 'up') {
              $('#fp-nav ul li:eq(1)').removeClass('on');
            }
            if (origin == 4 && direction == 'down') {
              $('#fp-nav ul li:eq(1)').removeClass('on');
            }
            if (origin == 5 && direction == 'up') {
              $('#fp-nav ul li:eq(1)').addClass('on');
              $('#fp-nav ul li:eq(4)').removeClass('on');
            }
            if (origin == 6 && direction == 'down') {
              $('#fp-nav ul li:eq(4)').removeClass('on');
            }
            if (origin == 7 && direction == 'up') {
              $('#fp-nav ul li:eq(4)').addClass('on');
            }
          },
          afterLoad: function (anchorLink, index) {
            setTimeout(function () {
              $('.section .section__wrapper').addClass('on');
            });

            $('#fullpage_wrap').off('scroll mousewheel');
            if (!$('.fp-completely .swiper-wrapper').length > 0) $('#fullpage_wrap').off('touchmove'); // 모바일분기
            if (swiper) swiper.mousewheel.enable();
            if (!$('.n5').hasClass('active')) $.fn.fullpage.setAllowScrolling(true);

            if (index == 1) {
              setTimeout(function () {
                $('.n1 .hero__heading').addClass('on');
              }, 2000);
              $('#fp-nav ul li:eq(1) ').removeClass('on');
              $('#fp-nav ul li:eq(4) ').removeClass('on');
            } else if (index == 2) {
              $('#fp-nav ul li:eq(1)').addClass('on');
              $('#fp-nav ul li:eq(4) ').removeClass('on');
            } else if (index == 3) {
            } else if (index == 4) {
            } else if (index == 5) {
              $('#fp-nav ul li:eq(1) ').removeClass('on');
              $('#fp-nav ul li:eq(4)').addClass('on');
            } else if (index == 6) {
            } else if (index == 7) {
              $('#fp-nav ul li:eq(1) ').removeClass('on');
              $('#fp-nav ul li:eq(4) ').removeClass('on');
            }
          },
        });
      } else {
        fullPageCreated = false;

        $('#fullpage_wrap').fullpage({
          navigation: true,
          anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7'],
          showActiveTooltip: true,
          easing: 'easeInOutCubic',
          easingcss3: 'ease',
          css3: true,
          normalScrollElements: '.scroll',
          scrollOverflow: true,
          navigationTooltips: ['메인', 'ABOUT', 'ABOUT', 'ABOUT', 'WORK', 'WORK', 'LOCATION'],
          onLeave: function (origin, destination, direction) {
            $('#fullpage_wrap').on('scroll touchmove mousewheel', function (e) {
              e.preventDefault();
              e.stopPropagation();
              return false;
            });
            if ($('.section').hasClass('active')) $.fn.fullpage.setAllowScrolling(true);
            //swiper.mousewheel.disable();
            if (origin == 1 && direction == 'down') {
              $('#fp-nav ul li:eq(1)').addClass('on');
            }
            if (origin == 2 && direction == 'up') {
              $('#fp-nav ul li:eq(1)').removeClass('on');
            }
            if (origin == 4 && direction) {
              $('header').removeClass('on');
            }
            if (origin == 4 && direction == 'down') {
              $('#fp-nav ul li:eq(1)').removeClass('on');
            }
            if (origin == 5 && direction == 'up') {
              $('#fp-nav ul li:eq(1)').addClass('on');
              $('#fp-nav ul li:eq(4)').removeClass('on');
            }
            if (origin == 6 && direction == 'down') {
              $('#fp-nav ul li:eq(4)').removeClass('on');
              console.log(direction);
            }
            if (origin == 7 && direction == 'up') {
              $('#fp-nav ul li:eq(4)').addClass('on');
            }
          },
          afterLoad: function (anchorLink, index) {
            setTimeout(function () {
              $('.section .section__wrapper').addClass('on');
            });

            $('#fullpage_wrap').off('scroll mousewheel');
            if (!$('.fp-completely .swiper-wrapper').length > 0) $('#fullpage_wrap').off('touchmove'); // 모바일분기
            if (swiper) swiper.mousewheel.enable();
            //if (!$('.n5').hasClass('active')) $.fn.fullpage.setAllowScrolling(true);
            if ($('.section').hasClass('active')) $.fn.fullpage.setAllowScrolling(true);

            if (index == 1) {
              setTimeout(function () {
                $('.n1 .hero__heading').addClass('on');
              }, 2000);
              $('#fp-nav ul li:eq(1) ').removeClass('on');
              $('#fp-nav ul li:eq(4) ').removeClass('on');
            } else if (index == 2) {
              $('#fp-nav ul li:eq(1)').addClass('on');
              $('#fp-nav ul li:eq(4) ').removeClass('on');
            } else if (index == 3) {
            } else if (index == 4) {
              $('header').addClass('on');
            } else if (index == 5) {
              $('#fp-nav ul li:eq(1) ').removeClass('on');
              $('#fp-nav ul li:eq(4)').addClass('on');
            } else if (index == 6) {
            } else if (index == 7) {
              $('#fp-nav ul li:eq(1) ').removeClass('on');
              $('#fp-nav ul li:eq(4) ').removeClass('on');
            }
          },
        });
      }
      console.log(fullPageCreated);
    }
    createFullpage();

    // swiper
    let length = $('.n5 .swiper-slide').length;
    let swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 120,
      freeMode: false,
      speed: 1000,
      mousewheel: true,
      breakpoints: {
        
        768: {
          slidesPerView: 1,  
          spaceBetween: 40,
        },
        on: {
          slideChange: function () {
            const idx = this.activeIndex;
            if (this.activeIndex != 0 && idx != length) $.fn.fullpage.setAllowScrolling(false);
            if (length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false);
          },
          slideChangeTransitionEnd: function () {
            const idx = this.activeIndex;
            if (idx == 0 || idx >= length - 1) $.fn.fullpage.setAllowScrolling(true);
          },
          touchMove: function (e) {
            const startY = e.touches.startY;
            setTimeout(function () {
              if (startY > e.touches.currentY) swiper.slideNext();
              else swiper.slidePrev();
            }, 100);
          },
        },
      },
      on: {
        slideChange: function () {
          const idx = this.activeIndex;
          const lastIndex = length - 1;
          if (this.activeIndex != 0 && idx != length) $.fn.fullpage.setAllowScrolling(false);
          if (length == 2 && idx == 0) $.fn.fullpage.setAllowScrolling(false);
          console.log('indx = ' + idx);
        },
        slideChangeTransitionEnd: function () {
          const idx = this.activeIndex;
          if (idx == 0 || idx == 2 ) $.fn.fullpage.setAllowScrolling(true);
          console.log('indx = ' + idx);
        },
        // touchMove: function (e) {
        //   const startY = e.touches.startY;
        //   setTimeout(function () {
        //     if (startY > e.touches.currentY) swiper.slideNext();
        //     else swiper.slidePrev();
        //   }, 100);
        // },
      },
    });

    let scrollTimeout;
    let throttle = 500;
    let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;

    jQuery(document).ready(function ($) {
      if (!isMobile) {
        $(window).on('resize', function () {
          if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
              if ($(window).width() > 959) {
                $.fn.fullpage.destroy('all');
                createFullpage();
              } else {
                fullPageCreated = false;
                // $.fn.fullpage.destroy('all');
                // createFullpage();
              }
              scrollTimeout = null;
            }, throttle);
          }
        });
      }
    });
  });
})(window.jQuery);

var wplatforms = wplatforms || {};
var visualSwiper;

wplatforms.utils = {
  animate: function () {
    function animateFrom(elem, direction) {
      direction = direction || 1;
      var x = 0,
        y = direction * 100;
      if (elem.classList.contains('gs__reveal--left')) {
        x = -100;
        y = 0;
      } else if (elem.classList.contains('gs__reveal--right')) {
        x = 100;
        y = 0;
      } else if (elem.classList.contains('gs__reveal--top')) {
        x = 0;
        y = 100;
      } else if (elem.classList.contains('gs__reveal--bottom')) {
        x = 0;
        y = -100;
      }
      elem.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      elem.style.opacity = '0';
      gsap.fromTo(
        elem,
        {
          x: x,
          y: y,
          autoAlpha: 0,
        },
        {
          duration: 1.25,
          x: 0,
          y: 0,
          autoAlpha: 1,
          ease: 'expo',
          overwrite: 'auto',
        }
      );
    }

    function hide(elem) {
      gsap.set(elem, {
        autoAlpha: 0,
      });
    }

    document.addEventListener('DOMContentLoaded', function () {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.is-animated').forEach(function (elem) {
        hide(elem);

        ScrollTrigger.create({
          trigger: elem,
          onEnter: function () {
            animateFrom(elem);
          },
          onEnterBack: function () {
            animateFrom(elem, -1);
          },
          onLeave: function () {
            hide(elem);
          },
        });
      });
    });
  },
  mainVisual: function () {
    var headerActive;
    visualSwiper = new Swiper('.main_slide', {
      effect: 'fade',
      loop: true,
      speed: 1000,
      touchRatio: 0,
      observer: true,
      observeParents: true,
      initialSlide: 0,
      pagination: {
        el: '.main_slide .pagination',
        clickable: true,
      },
      on: {
        slideChangeTransitionStart: function () {
          progressPagination();
        },
      },
    });

    // ScrollTrigger.matchMedia({
    //   '(min-width: 1025px)': function () {
    //     visual_Motion = gsap.timeline({
    //       scrollTrigger: {
    //         trigger: '.sec_visual',
    //         scrub: 0.5,
    //         pin: true,
    //         start: '30px top',
    //         end: '200% bottom',
    //         invalidateOnRefresh: true,
    //         onEnter: function () {
    //           gsap.to($('.swiper-slide .video_wrap'), 1, {
    //             y: 0,
    //             onStart: function () {
    //               headerActive = setTimeout(function () {
    //                 $('#wrap').addClass('active');
    //               }, 700);
    //             },
    //           });
    //           gsap.to($('.swiper-slide .video_wrap .dim'), 1, {
    //             width: 0,
    //           });
    //           $('.swiper-slide').addClass('active');
    //           $('.sec_visual .control_box').addClass('active');
    //           $('.sec_visual .bottom_box').addClass('active');
    //         },
    //         onLeaveBack: function () {
    //           gsap.to($('.swiper-slide .video_wrap'), 1, {
    //             y: '70vh',
    //           });
    //           gsap.to($('.swiper-slide .video_wrap .dim'), 1, {
    //             width: '12.6%',
    //           });
    //           $('.swiper-slide').removeClass('active');
    //           $('.sec_visual .control_box').removeClass('active');
    //           $('.sec_visual .bottom_box').removeClass('active');
    //           clearTimeout(headerActive);
    //           $('#wrap').removeClass('active');
    //         },
    //       },
    //     });
    //   },
    //   '(max-width: 1024px)': function () {
    //     $('.swiper-slide').removeClass('active');
    //     $('.swiper-slide .txt_box strong').removeAttr('style');
    //     $('.swiper-slide .txt_box span').removeAttr('style');
    //     visual_Motion_pin = gsap.timeline({
    //       scrollTrigger: {
    //         trigger: '.sec_visual',
    //         scrub: 0.5,
    //         pin: true,
    //         start: '20px top',
    //         end: '200% bottom',
    //         invalidateOnRefresh: true,
    //         onLeaveBack: function () {
    //           $('#wrap.header_white').removeClass('active');
    //         },
    //       },
    //     });

    //     visual_Motion1 = gsap
    //       .timeline({
    //         scrollTrigger: {
    //           trigger: '.sec_visual',
    //           scrub: 0.5,
    //           start: '20px top',
    //           end: '150% bottom',
    //           invalidateOnRefresh: true,
    //         },
    //       })
    //       .fromTo(
    //         $('.sec_visual .bottom_box'),
    //         1,
    //         {
    //           bottom: '-100%',
    //         },
    //         {
    //           bottom: '0',
    //         }
    //       );

    //     visual_Motion2 = gsap
    //       .timeline({
    //         scrollTrigger: {
    //           trigger: '.sec_visual',
    //           scrub: 0.5,
    //           start: '20px top',
    //           end: '150% bottom',
    //           invalidateOnRefresh: true,
    //           onUpdate: function (self) {
    //             if (self.progress > 0.05) {
    //               $('.sec_visual .control_box').addClass('active');
    //             } else {
    //               $('.sec_visual .control_box').removeClass('active');
    //             }
    //             if (self.progress > 0.7) {
    //               $('#wrap.header_white').addClass('active');
    //             } else {
    //               $('#wrap.header_white').removeClass('active');
    //             }
    //           },
    //         },
    //       })
    //       .fromTo(
    //         $('.swiper-slide .video_wrap'),
    //         1,
    //         {
    //           y: '71.5vh',
    //         },
    //         {
    //           y: '0',
    //         }
    //       );

    //     visual_Motion3 = gsap
    //       .timeline({
    //         scrollTrigger: {
    //           trigger: '.sec_visual',
    //           scrub: 0.5,
    //           start: '20px top',
    //           end: '150% bottom',
    //           invalidateOnRefresh: true,
    //         },
    //       })
    //       .fromTo(
    //         $('.swiper-slide .video_wrap .dim'),
    //         1,
    //         {
    //           width: '16px',
    //         },
    //         {
    //           width: '0',
    //         }
    //       );

    //     visual_Motion4 = gsap.to($('.swiper-slide .txt_box strong'), 1, {
    //       color: 'white',
    //       scrollTrigger: {
    //         trigger: '.sec_visual',
    //         scrub: 1,
    //         start: '20px top',
    //         end: 'bottom 50%',
    //         invalidateOnRefresh: true,
    //       },
    //     });

    //     visual_Motion5 = gsap.to($('.swiper-slide .txt_box span'), 1, {
    //       color: 'white',
    //       scrollTrigger: {
    //         trigger: '.sec_visual',
    //         scrub: 1,
    //         start: '20px top',
    //         end: 'bottom 50%',
    //         invalidateOnRefresh: true,
    //       },
    //     });
    //   },
    // });
  },
  init: function () {
    wplatforms.utils.mainVisual();
  },
};

wplatforms.utils.init();
