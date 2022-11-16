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
            mo_gnb();
        } else if (winW <= 767) {
            $("body").removeClass().addClass("mobile");
            mo_gnb();
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
    flt_banner();  
    layer_Pop();
    top_scroll_func();
    acco_menu();
    file_upload();
    
    faq_menu();
    // sc_move();
    
});

//scroll motion
// motion
function scroll_chk() {
    var reveals = document.querySelectorAll(".sc-chk");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 90;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
        console.log('height' + windowHeight);
        console.log('now' + elementTop);
        console.log('height' + windowHeight);
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
}

function mo_gnb(){
    var $mo_menu = $('.ctrl-menu > a');
    var $mo_gnb = $('#gnb');
    var $hasClass = $('body').hasClass('pc');
    if (!$hasClass) {
        $mo_menu.off('click');
        $mo_menu.bind({
            'click' :function(e){
                $(this).toggleClass('show');
                if ($(this).hasClass('show')){
                    $('.dim').addClass('on');
                } else {
                    $('.dim').removeClass('on');
                }
                $mo_gnb.toggleClass('open ');

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


//floating banner
function flt_banner (){
    $('.floating-wrap ul li a').on("mouseover focusin", function() {
        $('.floating-wrap').addClass('on');
    });
    $('.floating-wrap ul li a').on('mouseleave focusout', function() {
        $('.floating-wrap').removeClass('on');
    });
}
 //Select box
$('.sel').each(function() {

	var selValue = $("option:selected", this).text();
    $(this).children('select').css('display', 'none');
    
    var $current = $(this);
    
    $(this).find('option').each(function(i) {

        if (i == 0) {
            $current.prepend($('<div>', {
            class: $current.attr('class').replace(/sel/g, 'sel-box')
            }));
        
            if(selValue == "" || selValue == null)
                selValue = $(this).text;
        
            var placeholder = selValue;//$(this).text();
                $current.prepend($('<span>', {
                class: $current.attr('class').replace(/sel/g, 'sel-placeholder'),
                text: placeholder,
                'data-placeholder': placeholder
            }));
        
            return;
        }
        
        $current.children('div').append($('<span>', {
        class: $current.attr('class').replace(/sel/g, 'sel-box-options'),
        text: $(this).text()
        }));
    });
});
// Toggling the .active state on the .sel
$('.sel').click(function() {
    if ($(this).hasClass('disable')) {

    } else {
        $(this).toggleClass('active');
    }
    
});
    
// Toggling the .selected state on the options
$('.sel-box-options').click(function() {
    var txt = $(this).text();
    var index = $(this).index();
    
    $(this).siblings('.sel-box-options').removeClass('selected');
    $(this).addClass('selected');
    
    var $currentSel = $(this).closest('.sel');
    $currentSel.children('.sel-placeholder').text(txt);
    $currentSel.children('select').prop('selectedIndex', index + 1);
});
// footer select
function js_relate (){
	let obj = $(".select-box >li"); 
	
	obj.each(function() {
        obj.addClass('bbb');
		var tgt = $(this);
            tgt.btn = tgt.find(">a"); 
			tgt.sel_cont = tgt.find(".sel-cont"); 
			tgt.sel_cont.li = tgt.sel_cont.find(">li"); 
		$("<em class='hidden'>열기</em>").appendTo(tgt.btn);		
			
		tgt.btn.on("click",function() {
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

// faq menu
var faq_menu = function() {
    var faq_sel = $('.faq-menu li a');
    faq_sel.on('click', function(){
        var current_num = $(this).parent().index();
        $(this).closest('li').addClass('active');
        $(this).closest('li').siblings().removeClass('active');
        var show_faq = $('#faq-detail > div');
        show_faq.siblings().removeClass('on');
        show_faq.eq(current_num).addClass('on');
    });
}

// btn_top
var top_scroll_func = function() {
    $(window).scroll(function() {
        try {
            var topScrollPos = $(this).scrollTop();

            if (topScrollPos > ($(this).height() / 2)) {
                $('.float-banner').fadeIn('fast');
            } else {
                $('.float-banner').fadeOut('fast');
            }
        } catch(e) { }
    });
};
//Top move
var btn_top = function () {
    $(document).on('click', '.btn_top a', function(ev){
        ev.preventDefault();
		var targetHash = $(this).attr('href'),
			$targetObj = $(targetHash),
			scroll_to = $targetObj.offset().top -100

		$('html, body').stop(true,false).animate({scrollTop: scroll_to},700, 'easeInOutQuart', function(){ });
    });
}


// Tabs
let $tabs = $('.tabs'),
$tabsLink = $tabs.find('.tabs-link'),
$tabsCont = $('.tabs-content .tabs-content-item');

$tabsLink.on('click', function(e){
    let hrefHash = $(this).attr('href');
    $(this).parent().addClass('active').siblings().removeClass('active');
    $tabsCont.removeClass('active');
    $(hrefHash).addClass('active');
    e.preventDefault();
})

// accodian menu
var acco_menu = function() {
    $(".faq-list a").click(function (j) {
        var dropDown = $(this).closest("li").find(".expand-box");
        $(this).closest(".faq-list").find(".expand-box").not(dropDown).slideUp();

        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).closest("li").siblings().find("a").removeClass("active");
            $(this).addClass("active");
        }

        dropDown.stop(false, true).slideToggle();
        j.preventDefault();
    });
}
//File Control
var file_upload = function() {
    $(document).on('change',".frm-file input[type='file']",function(e){
        var filename = e.target.files[0].name;
        var filesize = e.target.files[0].size;
        var filetext = $(this).parent().find('.file-txt');

        if ( filetext.length ) {
            $(this).siblings("input[type='text']").val(filename);	
        } 
    });	

    //File Delete
    $(document).on('click','.btn-file-del > button', function() {
        $(this).parent().remove();
    })
}
//Layer Popup
var layer_Pop = function() {
    $(document).on('click','.pop-open', function() {
        const body = document.querySelector('body');
        body.style.overflow = 'hidden'
        var $href = $(this).attr('href');
        var $open_btn = $(this);
        layer_popup($href);

        function layer_popup(el){
            var $el = $(el);

            $('body').append($('<div class="dimmed"></div>'));
            $el.attr('tabindex', '0').fadeIn().focus();

            $el.find('.pop-close, .pop-dismiss').on('click', function() {
                body.style.overflow = 'visible'
                $('.dimmed').remove();
                $el.fadeOut('fast').removeAttr('tabindex'); 
                $open_btn.focus();
                return false;
            })          
        }
    })
}

// $(document).ready(function() {	
//     $(".header-include").load("/front/include/header.html");
//     $(".footer-include").load("/front/include/footer.html");
// });


