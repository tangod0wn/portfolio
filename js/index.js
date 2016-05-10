;(function (document, window){
	'use strict';
  var elSelector = '#banner',
      elClassNarrow	= 'banner--narrow',
			elNarrowOffset = 100,
			element	= document.querySelector( elSelector );
  if(!element) { return true; }
  var elHeight = 0,
      elTop = 0,
			dHeight	= 0,
			wHeight	= 0,
			wScrollCurrent = 0,
			wScrollBefore	= 0,
			wScrollDiff	= 0,
			hasElementClass	= function (element, className){
        return element.classList? element.classList.contains(className) : 
           new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);},
			addElementClass	= function (element, className){
        element.classList? element.classList.add(className) :
          element.className += ' ' + className;},
			removeElementClass = function (element, className){
        element.classList? element.classList.remove(className) :
          element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');};

  window.addEventListener('scroll', function () {
	  elHeight = element.offsetHeight;
    dHeight = document.body.offsetHeight;
    wHeight = window.innerHeight;
    wScrollCurrent = window.pageYOffset;
		wScrollDiff = wScrollBefore - wScrollCurrent;
		elTop = parseInt(window.getComputedStyle(element).getPropertyValue('top')) + wScrollDiff;
		
    // toggle "narrow" classname	
    if(wScrollCurrent > elNarrowOffset) {
			if(!hasElementClass(element, elClassNarrow)) {
					addElementClass(element, elClassNarrow); }
		} else { removeElementClass(element, elClassNarrow); }
    
    // scrolled to the very top; element sticks to the top
    if(wScrollCurrent <= 0) {
				element.style.top = '0px';
    } // scrolled up; element slides in
      else if(wScrollDiff > 0) {
				element.style.top = (elTop > 0? 0 : elTop) + 'px'; 
    } // scrolled down
      else if(wScrollDiff < 0) {
				// scrolled to the very bottom; element slides in
        if(wScrollCurrent + wHeight >= dHeight - elHeight) {  
					element.style.top = ( ( elTop = wScrollCurrent + wHeight - dHeight ) < 0 ? elTop : 0 ) + 'px';
        } // scrolled down; element slides out
          else { element.style.top = ( Math.abs( elTop ) > elHeight ? -elHeight : elTop ) + 'px'; }
			}
		wScrollBefore = wScrollCurrent;
	});
}( document, window, 0 ));


// Floating label headings for the contact form
$(function() {$("body")
 .on("input propertychange", ".form-item",function(e) {
  $(this).toggleClass("form-item-filled",!! $(e.target).val());})
 .on("focus", ".form-item",function() {
  $(this).addClass("form-item-focused");})
 .on("blur", ".form-item",function() {
  $(this).removeClass("form-item-focused");});
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({target: '.navbar-fixed-top'})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  $(".navbar-collapse").collapse('hide');});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {$('body').on('click', 'a.scrollable', function(event) {
  var $anchor = $(this);
  $('html, body').stop().animate({scrollTop: $($anchor.attr('href')).offset().top},1500,'easeInOutExpo');
  event.preventDefault();
  });
});