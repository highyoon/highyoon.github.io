//Document ready
$(function () {
    //Functions
    chkWinW();
    gnb();
    openCheck();
    
    //gnb
    function gnb() {
        var _dep1 = $(".gnb-menu > li.active").index();

        if ($('body').hasClass('is-pc')){
            /* 메뉴 오버,텝 */
            $(".gnb-menu > li").on("mouseenter focusin", function(){
                $("#header").addClass("on");         // subbg
                $(".gnb-menu > li ").removeClass("active on");
                $(this).addClass('active');
                $(this).find(".sub-area").addClass("on");
                if ($(this).index(0)) {
                    $('.bg-depth').removeClass('on');
                } else {
                    $('.bg-depth').addClass('on');
                }
            });
            /* 메뉴 아웃,텝 */
            $(".gnb-menu").on("mouseleave focusout", function(){
                $("#header").removeClass("on");   
                $('.bg-depth').removeClass('on');   // subbg
                $(".gnb-menu li").removeClass("active on");
            });
        } else {
            $(".gnb-menu > li:eq(0)").on('click', function(e){
                $(this).toggleClass("on");
            });
            $('#header .m-menu').on('click', function(){
                $(this).toggleClass('on');
                $('#header .top-util').toggleClass('on');
                $('#header .gnb-area').toggleClass('on');
            })
        }
    };

    //scroll motion
   // $(window).scroll(openCheck);
    function openCheck() {
        $('.main-scroll').each(function() {
            var _t = $(this).offset().top + 650;
            var s_position = $('body').scrollTop();
            if (s_position + $(window).innerHeight() > _t) {
                $(this).addClass('scroll_motion');
            } else {
                $(this).removeClass('scroll_motion');
            }
        });
    }
    

    //window width check
    function chkWinW (){
        var winW = $('.contents').width();
        if (winW > 1080) {
            $('body').removeClass('is-mb');
            $('body').addClass('is-pc');
        } else {
            $('body').removeClass('is-pc');
            $('body').addClass('is-mb');
        }

        console.log(winW);
    }
    //윈도우 resize
    $(window).on('load resize', function () {
        chkWinW();
        gnb();
        openCheck()
    });

    //윈도우 스크롤 이벤트
    $('body').scroll(function() {
        openCheck();
    });



});