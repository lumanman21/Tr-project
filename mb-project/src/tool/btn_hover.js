$( ".i_more" ).mouseenter(function(e) {
   var parentOffset = $(this).offset();

   var relX = e.pageX - parentOffset.left;
   var relY = e.pageY - parentOffset.top;
   $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
   $(this).prev(".su_button_circle").removeClass("desplode-circle");
   $(this).prev(".su_button_circle").addClass("explode-circle");

});

$( ".i_more" ).mouseleave(function(e) {

     var parentOffset = $(this).offset();

     var relX = e.pageX - parentOffset.left;
     var relY = e.pageY - parentOffset.top;
     $(this).prev(".su_button_circle").css({"left": relX, "top": relY });
     $(this).prev(".su_button_circle").removeClass("explode-circle");
     $(this).prev(".su_button_circle").addClass("desplode-circle");

});