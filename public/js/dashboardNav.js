$(document).ready(function(){
  // initialize page
  var startPage = $('.nav').find('.active').find('a').html();
  $('.content').append($('#page[for=' + startPage + ']')[0].innerHTML);

  $('.nav').find('li').on("click", function(){
    animationTime = 500;

    thisIndex = $(this).index();
    activeIndex = $('.active').index();

    if( thisIndex == activeIndex )
      return;

    var newScreen;

    if( thisIndex > activeIndex ){
      newScreen = $(".right");
    } else {
      newScreen = $(".left");
    }

    pageName =  $(this).children('a').html();
    page = "#page[for='" + pageName + "']";

    // take page and add it onto the new screen
    pageHtml = $(page)[0].innerHTML;
    $(newScreen).append(pageHtml);

    // fade out our current screen and delete it
    $(".content").animate({
      opacity: 0
    }, animationTime, function(){
      $(".content").remove();
    });

    // animate new screen
    className = newScreen[0].className;
    newScreen.animate({
      left: 0
    }, animationTime, function(){
      // set this screen as the main screen
      newScreen.removeClass(className);
      newScreen.addClass('content');
    });

    // replace the screen we have slid in
    $('#view').append("<div class='" + className + "'></div>");

    // set this as the active li
    $(".active").removeClass("active");
    $(this).addClass("active");
  });
})
