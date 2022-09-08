$(document).ready(function() {
    if ($('body').hasClass('pc')) {
        section_move(); 
    }

})

function section_move() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    var Cheight = $(window).height();
    var beforePosition = document.documentElement.scrollTop

    setTimeout(function(){
        $(window).scrollTop($(this).scrollTop() + 1);
    }, 1000);
    setTimeout(function(){
        $(window).scrollTop($(this).scrollTop() - 1);
    }, 2000);
    setTimeout(function(){
        $(window).scrollTop($(this).scrollTop() + 1);
    }, 3000);
    setTimeout(function(){
        $(window).scrollTop($(this).scrollTop() - 1);
    }, 4000);

    $(window).scroll(function(){
        scTop =$(this).scrollTop();
        calHero(scTop);
        console.log(scTop + " 현재창 높이");
        console.log(Cheight+ " 클라이언트 높이");
    });
    scTop =$(this).scrollTop();
    if(scTop < Cheight){
        $('body').addClass("end");
    }else {
        $('body').addClass("start");
    }

    if(scTop < Cheight*2){
        $('body').addClass("end2");
    }else {
        $('body').addClass("start2");
    }
    calHeight();
    function calHeight(){
        Cheight = $(window).height();
        $('.height').css({'height':Cheight+'px'});
        
    }
    function calHero(scTop){
            var afterPosition = document.documentElement.scrollTop;
            if (afterPosition > 10) {
                if(beforePosition >= afterPosition ){
                    if(!$('body').hasClass('end') && scTop < Cheight && $('body').hasClass("start")){
                        $('html, body').animate({scrollTop : 0}, 1000);
                        $('body').removeClass("start");
                        $('body').addClass("hidden");
                        setTimeout(function(){
                            $('body').removeClass("hidden");
                        },1000);
                        setTimeout(function(){
                            $('body').addClass("end");
                        },1200);
                    }
                } else {
                    if(scTop > 0 && $('body').hasClass('end')){
                        $('html, body').animate({scrollTop : Cheight}, 1000);
                        $('body').removeClass("end");
                        $('body').addClass("hidden");
                        setTimeout(function(){
                            $('body').removeClass("hidden");
                        },1000);
                        setTimeout(function(){
                            $('body').addClass("start");
                        },1200);
                    }
                }
                if($('body').hasClass("start")){
                    if(beforePosition >= afterPosition){
                        if(!$('body').hasClass('end2') && scTop < Cheight*2 && $('body').hasClass("start2")){
                            $('html, body').animate({scrollTop : Cheight}, 1000);
                            $('body').removeClass("start2");
                            $('body').addClass("hidden");
                            setTimeout(function(){
                                $('body').removeClass("hidden");
                            },1000);
                            setTimeout(function(){
                                $('body').addClass("end2");
                            },1200);
                        }
                    } else {
                        if(scTop > 0 && $('body').hasClass('end2')){
                            $('html, body').animate({scrollTop : Cheight*2}, 1000);
                            $('body').removeClass("end2");
                            $('body').addClass("hidden");
                            setTimeout(function(){
                                $('body').removeClass("hidden");
                            },1000);
                            setTimeout(function(){
                                $('body').addClass("start2");
                            },1200);
                        }
                    }
                }
            }
            var decoHeight = scTop - Cheight;
            beforePosition = afterPosition;
        
    }
}