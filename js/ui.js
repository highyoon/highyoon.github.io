//Document ready
$(function () {
    //Include
    $(".header-include").load("/publish/include/header.html");
    $(".footer-include").load("/publish/include/footer.html");          

    //Resize
    $(window).resize(function(){
        var winW = $(window).width();
        
        if (winW >= 992) {
            $("body").removeClass().addClass("pc");
        } else if (winW >= 768 && winW <= 992) {
            $("body").removeClass().addClass("tablet");
        } else if (winW <= 767) {
            $("body").removeClass().addClass("mobile");
        }    
    }).resize();
    //Functions
    gnb();
    all_menu();
    lnb_menu();
    tabs();
    layer_Pop();
    acco_list(); 
    family_site();
    gnb_search();

    top_scroll_func();
});

//GNB
var gnb = function() {
    var $dep1Trigger = $('#gnb > ul > li');
    var $hasClass = $('body').hasClass('pc');
    if ($hasClass) {
        $dep1Trigger.bind({
            'mouseenter focusin': function(e){
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('#gnb .depth2').stop().show();
                $('#header .bg-gnb').addClass('down');
                $('#header .gnb-search').removeClass('active');
                $('#header .search-box').removeClass('on');
                $('#header .bg-gnb').removeClass('search');
                e.stopImmediatePropagation(); 
            },
            'mouseleave': function(){
                $(this).removeClass('active');
                $('#gnb .depth2').hide();
                $('#header .bg-gnb').removeClass('down');
            },
            'focusout': function(){
                $(this).removeClass('active');
                $('#gnb .depth2').slideUp(300);
                $('#header .bg-gnb').removeClass('down');
            }
        });
    } else {
        $dep1Trigger.bind({
            'click' :function(e){
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $('#gnb .depth2').stop().show();
                $('#header .bg-gnb').addClass('down');
                $('#header .gnb-search').removeClass('active');
                $('#header .search-box').removeClass('on');
                $('#header .bg-gnb').removeClass('search');
                e.stopImmediatePropagation(); 
            }
        });
    }
}

//GNB Search
var gnb_search = function (){
    $(document).on("click", ".gnb-search", function() {
        $(this).toggleClass('active');
        $('#header .search-box').toggleClass('on');
        $('#header .bg-gnb').toggleClass('search');
        if($(this).hasClass('active')){
            $(this).text('검색닫기');
        } else {
            $(this).text('검색열기');
        }
    });
}

//All Menu 
var all_menu = function () {
    $(document).on("click", ".nav-action", function() {
        if ($('.nav-action').hasClass('close')) {
            $(this).removeClass('close');
            $('#gnb').hide();
            $('.dim').hide();
        } else {
            $(this).addClass('close')
            $('#gnb').show(300);
            $('.dim').show();
        }
    });
}

// Lnb menu
var lnb_menu = function() {
    $(document).on('click','.lnb-menu > li > a', function() {
        $(this).parent().siblings().find('a').removeClass('on').next(".sub-depth").stop().slideUp(400);
        $(this).toggleClass('on').next(".sub-depth").stop().slideToggle(400);
    });
}

// btn_top
var top_scroll_func = function() {
    $('body').scroll(function() {
        try {
            var topScrollPos = $(this).scrollTop();
            var chkkkk = ($(this).height() / 2);

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



var family_site = function (){
    $(document).on("click", ".family-site", function (e) {
        $(this).toggleClass('active');
        $('#footer .link-wrap').toggle();
    });
}

//Tabs
var tabs = function () {
   $(".tab-cont > div").hide(); 
   $(".tab-nav li:first").addClass("active").show();
   $(".tab-cont > div:first").show(); 

   $(".tab-nav li").each(function() {
       $(this).on('click', function() {
        var this_target = $($(this).attr("data-target"));
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        this_target.show();
        this_target.siblings().hide();
     
        
        return false;
        //    $(".tab-nav li").removeClass("active"); 
        //    $(this).addClass("active"); 
        //    $(".tab-cont > div").hide(); 

        //    var activeTab = $(this).find("a").attr("href"); 
        //    $(activeTab).fadeIn(); 
        //    return false;
       });
   });

   //접근성 포커스 이벤트
    $(".faq-tab .nav-item li a").blur(function(){
        if($(this).parent().hasClass("active")){
            var trg = $(this).parent().attr("data-target");
            $(trg).find("div > .tab-detail").eq(0).focus();
        }
    });
    $(".news-tab  .nav-item li a").blur(function(){
        if($(this).parent().hasClass("active")){
            var trg = $(this).parent().attr("data-target");
            $(trg).find(".news-list").eq(0).find("a").focus();
        }
    });
    $(".tab-cont > div:not(:last-child) .tab-detail:last-child").blur(function(){
        $(".tab-nav .nav-item li.active").next().find("a").focus();
    });
    $(".tab-cont > div:not(:last-child) .news-list:last-child a").blur(function(){
        $(".tab-nav .nav-item li.active").next().find("a").focus();
    });

    //main 새로운 소식 알려드립니다 탭 접근성
    $(".news-tab .nav-item li:last-child a").on("focusout", function(){
        $(".center-act .main-more").focus();
    });
    
    //faq 탭 접근성
    $(".faq-tab .nav-item li:last-child a").on("focusout", function(){
        $(".footer-util .center-intro").focus();
    });

}


//Layer Popup 
var layer_Pop = function() {
    $(document).on('click','.pop-open', function() {
        var $href = $(this).attr('href');
        var $open_btn = $(this);
        layer_popup($href);

        function layer_popup(el){
            var $el = $(el);

            $('body').append($("<div id='dimmd'></div>"));
            $el.attr("tabindex", "0").fadeIn().focus();

            var $elWidth = $el.outerWidth(),
                $elHeight = $el.outerHeight(),
                docWidth = $(document).width(),
                docHeight = $(document).height();

            if ($elHeight < docHeight || $elWidth < docWidth) {
                $el.css({
                    marginTop: -$elHeight /2,
                    marginLeft: -$elWidth/2
                })
            } else {
                $el.css({top: 0, left: 0});
            }

            $el.find('.pop-close').click(function(){
                $("#dimmd").remove();
                $el.fadeOut().removeAttr("tabindex"); 
                $open_btn.focus();
                return false;
            });            
        }
    })
}

//Accodion
var acco_list = function() {       
    $(document).on('click','.faq-list dl', function() {
        if($(this).attr("class") == "active"){
            $(this).parent().parent().removeClass("active");
            $(this).find('dd').slideUp(200);
        }else{
            $(this).addClass("active");
            $(this).siblings().removeClass('active');
            $(this).siblings().find('dd').slideUp(200);
            $(this).children().next().slideDown(200);
        }
        return false;
    });
    $(document).on('keyup','.faq-list dl', function(key) {
        if(key.keyCode==13) {
            if($(this).attr("class") == "active"){
                $(this).parent().parent().removeClass("active");
                $(this).find('dd').slideUp(200);
            }else{
                $(this).addClass("active");
                $(this).siblings().removeClass('active');
                $(this).siblings().find('dd').slideUp(200);
                $(this).children().next().slideDown(200);
            }
        }
        return false;
    });
}

							


