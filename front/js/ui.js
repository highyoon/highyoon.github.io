//Document ready
$(function () {
    //Resize
    $(window).resize(function(){
        var winW = $(window).width();
        
        if (winW >= 1280) {
            $("body").removeClass().addClass("pc");     
            header_chk();
        } else if (winW >= 768 && winW <= 1280) {
            $("body").removeClass().addClass("tablet");
        } else if (winW <= 767) {
            $("body").removeClass().addClass("mobile");
            mobile_menu();
        }
    }).resize();
    //scroll

    //section check scroll value
    $(window).scroll(function(){
        scroll_chk();
    });
    

    //Functions
    gnb();
    mo_gnb();
    js_relate();
    // sc_move();
    
});

//scroll motion
// motion
function scroll_chk() {
    var reveals = document.querySelectorAll(".sc-chk");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 80;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

//GNB
var gnb = function() {
    var $dep1Trigger = $('#gnb > ul');
    var $depthMobile = $('#gnb > ul > li');
    var $dep1Active = $('.sub-box');
    var $hasClass = $('body').hasClass('pc');
    if ($hasClass) {
        $dep1Trigger.bind({
            'mouseenter focusin': function(e){
                $('#wrap-top').addClass('on');
                $('#gnb .sub-box').stop().slideDown(400);
                e.stopImmediatePropagation(); 
            },
            'mouseleave': function(){
                $('#wrap-top').removeClass('on');
                $(this).removeClass('active');
                $('#gnb .sub-box').hide();
            },
            'focusout': function(){
                $('#wrap-top').removeClass('on');
                $(this).removeClass('active');
                $('#gnb .sub-box').stop().slideUp(300); 
            }
        });
        $dep1Active.bind({
            'mouseenter focusin': function(e){
                $(this).parents().addClass('active');
                $(this).parents().siblings().removeClass('active');
            },
            'mouseleave': function(){
                $(this).parents().removeClass('active');
            },
            'focusout': function(){
                $(this).parents().removeClass('active');
            }
        })
    } else {
        $depthMobile.bind({
            'click' :function(e){
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
            }
        })
    }
    // else {
    //     $dep1Trigger.bind({
    //         'click' :function(e){
    //             $(this).addClass('active');
    //             $(this).siblings().removeClass('active');
    //             $('#gnb .depth2').stop().show();
    //             $('#header .bg-gnb').addClass('down');
    //             $('#header .gnb-search').removeClass('active');
    //             $('#header .search-box').removeClass('on');
    //             $('#header .bg-gnb').removeClass('search');
    //             e.stopImmediatePropagation(); 
    //         }
    //     });
    // }
}

function mo_gnb(){
    var $mo_menu = $('.ctrl-menu > a');
    var $mo_gnb = $('#gnb');
    var $hasClass = $('body').hasClass('pc');
    if (!$hasClass) {
        $mo_menu.bind({
            'click' :function(e){
                $(this).toggleClass('show');
                $mo_gnb.toggleClass('open ');
                console.log('click m gnb');
            }
        });
    }
}

function header_chk(){
    $(window).scroll(function(){
        if ($(window).scrollTop() >= 90 ) {
            $('#wrap-top').addClass('wht');
        }
        else {
            $('#wrap-top').removeClass('wht');
        }
    });
}

// mobile menu
function mobile_menu(){
    $('.m-menu').click(function(){
        $('body').toggleClass('hold');
        $(this).toggleClass('on');
        $('.gnb').toggleClass('on');
    });
    $('.gnb li a').click(function(){
        if ($('body').hasClass('hold')) {
            $('body').removeClass('hold');
            $('.gnb').removeClass('on');
            $('.m-menu').removeClass('on');
        }
    });
}
// footer select
function js_relate (){
	var obj = $(".select-box >li"); 
	
	obj.each(function() {
        obj.addClass('bbb');
		var tgt = $(this);
            tgt.btn = tgt.find(">a"); 
			tgt.sel_cont = tgt.find(".sel-cont"); 
			tgt.sel_cont.li = tgt.sel_cont.find(">li"); 
		$("<em class='hidden'>열기</em>").appendTo(tgt.btn);		
			
		tgt.btn.on("click",function() {
            console.log('aaa');
			if(tgt.sel_cont.is(":animated")) return false;
			$(this).toggleClass("on").siblings(".sel-cont").slideToggle(300);
			if($(this).hasClass("on")){
				$(this).find(">em").text("닫기");
			} else {
				$(this).find(">em").text("열기");
			}
			return false;
		});
		
		tgt.on("mouseleave",function() {
			$(this).find(">a").removeAttr("class");
			$(this).find(">.sel-cont").slideUp(300);
			tgt.btn.find(">em").text("열기");
			return false;
		});
		
		tgt.sel_cont.li.last().find(">a").on("focusout",function() {
			$(this).parent().parent().siblings("a").removeAttr("class");
			$(this).parent().parent().slideUp(300);
			tgt.btn.find(">em").text("열기");
			return false;
		});		
	});
}

//scroll moving
// function sc_move(){
//     $(document).on('click', 'a[href^="#"]', function (e) {
//         e.preventDefault();
    
//         if ($('body').hasClass('pc')) {
//             $('html, body').animate({
//                 scrollTop: $($.attr(this, 'href')).offset().top
//             }, 1000);
//         } else {
//             $('html, body').animate({
//                 scrollTop: $($.attr(this, 'href')).offset().top - 55
//             }, 1000);
//         }

//     });
// }


// btn_top
var top_scroll_func = function() {
    $('body').scroll(function() {
        try {
            var topScrollPos = $(this).scrollTop();

            if (topScrollPos > ($(this).height() / 2)) {
                $('.btn-top').fadeIn('fast');
            } else {
                $('.btn-top').fadeOut('fast');
            }
        } catch(e) { }
    });
};
//Top move
var btn_top = function () {
    $(document).on('click', '.btn-top a', function(ev){
        ev.preventDefault();
		var targetHash = $(this).attr('href'),
			$targetObj = $(targetHash),
			scroll_to = $targetObj.offset().top -100

		$('html, body').stop(true,false).animate({scrollTop: scroll_to},700, 'easeInOutQuart', function(){ });
    });
}
				


