if (screen.width > 1024) {
	$(document).ready(function(){
		var windowScrollTop = $(window).scrollTop();
		if(windowScrollTop>=200){
			$("header").addClass("TopHeader");
		}else{
			$("header").removeClass("TopHeader");
		};
		$(window).scroll(function(){
			var windowScrollTop = $(window).scrollTop();
			if(windowScrollTop>=200){
				$("header").addClass("TopHeader");
			}else{
				$("header").removeClass("TopHeader");
			};
		});




		
	
			var lastScrollTop = 0;
			$(window).on("scroll", function() {

				
					
					var scrollTop = $(this).scrollTop();
					if(scrollTop >=600){
						if (scrollTop > lastScrollTop) {
						// 向下滑动
						// 在这里执行向下滑动时的操作
						$("header").addClass("mouseHeader"); 
						
						} else {
						// 向上滑动
						// 在这里执行向上滑动时的操作
						$("header").removeClass("mouseHeader");
						}
			
						lastScrollTop = scrollTop;
					}
				
			});
		
	});
};



// var w = $(window).width();
if (screen.width < 1025) {
	$(".nav_menu").click(function () {
		//        event.stopPropagation();
		$(this).toggleClass("on");
		$(".i_nav").stop().slideToggle();
	});
	$('.i_nav>li').each(function() {
		if($(this).find("ul").has('li').length>0){
			$(this).append("<i class='fal'></i>");
		};

	});
	$('.i_nav>li').each(function() {
		$(this).find("i").click(function () {
			$(this).parent().find("ul").slideToggle(300);
			if($(this).hasClass("on")){
				$(this).removeClass("on") ;
			}else{
				$(this).addClass("on") ;
			}
		});
	});
};



// pc端 导航下拉
if(screen.width > 1024){

	$('.i_nav .menu-item-has-children').hover(function() {
		$(this).find('.sub-menu').stop().slideToggle(300);
	});

};


// 搜索 + 语言
$(document).ready(function(){
	$(".top_search_ico").click(function(){
		$(this).toggleClass("on")
		$(".top_search").toggleClass("on");
	});
	$(".top_language").click(function(){
		$(this).toggleClass("on")
		$(".top_language_list").toggleClass("on");
	});
	$(document).click(function(event){
		if(!$(event.target).closest('.top_search_ico, .top_search').length){
			$(".top_search_ico").removeClass("on");
			$(".top_search").removeClass("on");
		}
		if(!$(event.target).closest('.top_language, .top_language_list').length){
			$(".top_language").removeClass("on");
			$(".top_language_list").removeClass("on");
		}
	});
});


$(document).ready(function() {
	$('.about_img').css('transform','translate(-50%,-50%) scale(1)')

});