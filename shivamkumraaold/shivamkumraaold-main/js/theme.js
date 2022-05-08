
(function ($) {
	"use strict";

// Preloader
$(window).on('load', function () {
	$('.lds-ellipsis').fadeOut(); // will first fade out the loading animation
	$('.preloader').delay(333).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(333);
});


// Header Sticky
$(window).on('scroll',function() {
	var stickytop = $('#header.sticky-top .bg-transparent');
	var stickytopslide = $('#header.sticky-top-slide');
	
	if ($(this).scrollTop() > 1){  
		stickytop.addClass("sticky-on-top");
		stickytop.find(".logo img").attr('src',stickytop.find('.logo img').data('sticky-logo'));
	}
	else {
		stickytop.removeClass("sticky-on-top");
		stickytop.find(".logo img").attr('src',stickytop.find('.logo img').data('default-logo'));
	}
	
	if ($(this).scrollTop() > 180){  
		stickytopslide.find(".primary-menu").addClass("sticky-on");
		stickytopslide.find(".logo img").attr('src',stickytopslide.find('.logo img').data('sticky-logo'));
	}
	else{
		stickytopslide.find(".primary-menu").removeClass("sticky-on");
		stickytopslide.find(".logo img").attr('src',stickytopslide.find('.logo img').data('default-logo'));
	}
});

// Sections Scroll
if($("body").hasClass("side-header")){
$('.smooth-scroll').on('click', function() {
	event.preventDefault();
    var sectionTo = $(this).attr('href');
	$('html, body').stop().animate({
      scrollTop: $(sectionTo).offset().top}, 1500, 'easeInOutExpo');
});
   }else {
$('.smooth-scroll').on('click', function() {
	event.preventDefault();
    var sectionTo = $(this).attr('href');
	$('html, body').stop().animate({
      scrollTop: $(sectionTo).offset().top - 50}, 1500, 'easeInOutExpo');
});
}

// Mobile Menu
$('.navbar-toggler').on('click', function() {
	$(this).toggleClass('show');
});
$(".navbar-nav a").on('click', function() {
    $(".navbar-collapse, .navbar-toggler").removeClass("show");
});

// Overlay Menu & Side Open Menu
$('.navbar-side-open .collapse, .navbar-overlay .collapse').on('show.bs.collapse hide.bs.collapse', function(e) {
    e.preventDefault();
}),
$('.navbar-side-open [data-toggle="collapse"], .navbar-overlay [data-toggle="collapse"]').on('click', function(e) {
   e.preventDefault();
   $($(this).data('target')).toggleClass('show');
})

/*---------------------------------
   Carousel (Owl Carousel)
----------------------------------- */
$(".owl-carousel").each(function (index) {
    var a = $(this);
	$(this).owlCarousel({
		autoplay: a.data('autoplay'),
		center: a.data('center'),
		autoplayTimeout: a.data('autoplaytimeout'),
		autoplayHoverPause: a.data('autoplayhoverpause'),
		loop: a.data('loop'),
		speed: a.data('speed'),
		nav: a.data('nav'),
		dots: a.data('dots'),
		autoHeight: a.data('autoheight'),
		autoWidth: a.data('autowidth'),
		margin: a.data('margin'),
		stagePadding: a.data('stagepadding'),
		slideBy: a.data('slideby'),
		lazyLoad: a.data('lazyload'),
		navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		animateOut: a.data('animateout'),
		animateIn: a.data('animatein'),
		video: a.data('video'),
		items: a.data('items'),
		responsive:{
        0:{items: a.data('items-xs'),},
        576:{items: a.data('items-sm'),},
		768:{items: a.data('items-md'),},
        992:{items: a.data('items-lg'),}
        }
    });
});

/*------------------------------------
    Magnific Popup
-------------------------------------- */
// Image on Modal
$('.popup-img-gallery').each(function() {
$(this).magnificPopup({
    delegate: '.popup-img:visible',
	type: "image",
	tLoading: '<div class="preloader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>',
    closeOnContentClick: !0,
    mainClass: "mfp-fade",
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
    },
});
});

// Ajax On Modal 
$('.popup-ajax-gallery').each(function() {
$(this).magnificPopup({
	delegate: '.popup-ajax:visible',
    type: "ajax",
	tLoading: '<div class="preloader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>',
	mainClass: "mfp-fade",
	closeBtnInside: true,
	midClick: true,
	gallery: {
      enabled: true,
    },
	callbacks: {
		ajaxContentAdded: function() {
			$(".owl-carousel").each(function (index) {
			  var a = $(this);
			  $(this).owlCarousel({
				autoplay: a.data('autoplay'),
				center: a.data('center'),
				autoplayTimeout: a.data('autoplaytimeout'),
				autoplayHoverPause: a.data('autoplayhoverpause'),
				loop: a.data('loop'),
				speed: a.data('speed'),
				nav: a.data('nav'),
				dots: a.data('dots'),
				autoHeight: a.data('autoheight'),
				autoWidth: a.data('autowidth'),
				margin: a.data('margin'),
				stagePadding: a.data('stagepadding'),
				slideBy: a.data('slideby'),
				lazyLoad: a.data('lazyload'),
				navText:['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
				animateOut: a.data('animateOut'),
				animateIn: a.data('animateIn'),
				video: a.data('video'),
				items: a.data('items'),
				responsive:{
					0:{items: a.data('items-xs'),},
					576:{items: a.data('items-sm'),},
					768:{items: a.data('items-md'),},
					992:{items: a.data('items-lg'),}
				}	
                });
            });
         }
    }
});
});

// YouTube/Viemo Video & Gmaps
$('.popup-youtube, .popup-vimeo, .popup-gmaps').each(function() {
$(this).magnificPopup({
        type: 'iframe',
		mainClass: 'mfp-fade',
});
});



/*------------------------------------
    Parallax Background
-------------------------------------- */
$(".parallax").each(function () {
$(this).parallaxie({
	speed: 0.5,
});
});

/*------------------------------------
    Text Rotator
-------------------------------------- */
$(".text-rotator").each(function () {
    $(this).Morphext({
		speed: 3000, // Overrides default 2000
	});
});

/*------------------------------------
    Typed
-------------------------------------- */

$(".typed").each(function() {
var typed = new Typed('.typed', {
    stringsElement: '.typed-strings',
	loop: true,
	typeSpeed: 100,
    backSpeed: 50,
	backDelay: 1500,
});
});

/*------------------------------------
    WOW animation
-------------------------------------- */

$(".wow").each(function() {
 if ($(window).width() > 767) {
   var wow = new WOW({
     boxClass: 'wow',
     animateClass: 'animated',
     offset: 0,
     mobile: false,
     live: true
   });
  new WOW().init();
 }
});

/*------------------------------------
    YTPlayer YouTube Background
-------------------------------------- */

$(".player").each(function () {
    $(this).mb_YTPlayer();
});

/*------------------------
   tooltips
-------------------------- */
$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

/*------------------------
   Scroll to top
-------------------------- */
$(function () {
		$(window).on('scroll', function(){
			if ($(this).scrollTop() > 400) {
				$('#back-to-top').fadeIn();
			} else {
				$('#back-to-top').fadeOut();
			}
		});
		});
$('#back-to-top').on("click", function() {
	$('html, body').animate({scrollTop:0}, 'slow');
	return false;
});

/*------------------------
   Contact Form
-------------------------- */
var form = $('#contact-form'); // contact form
var submit = $('#submit-btn'); // submit button

// form submit event
form.on('submit', function (e) {
	e.preventDefault(); // prevent default form submit
		$.ajax({
			url: 'https://api.formcake.com/api/form/e71c4df3-0201-40dd-bee4-205fa555f8c5/submission', // form action url
			type: 'POST', // form submit method get/post
			dataType: 'json', // request type html/json/xml
			data: form.serialize(), // serialize form data
			beforeSend: function () {
				submit.attr("disabled", "disabled");
				var loadingText = '<span role="status" aria-hidden="true" class="spinner-border spinner-border-sm align-self-center mr-2"></span>Sending.....'; // change submit button text
				if (submit.html() !== loadingText) {
					submit.data('original-text', submit.html());
					submit.html(loadingText);
				}
			},
			success: function (data) {
				// 		document.querySelector("#submit-btn").innerHTML = 'Sent!'
				submit.before(data.Message).fadeIn("slow"); // fade in response data 
				submit.html(submit.data('original-text'));// reset submit button text
				submit.removeAttr("disabled", "disabled");
				if (data.response == 'success') {
					form.trigger('reset'); // reset form
				}
				$('.alert-dismissible').css("display", "block")
				setTimeout(function () {
					$('.alert-dismissible').fadeOut('slow', function(){
						$(this).css("display", "none")
					});
				}, 5000);
			},
			error: function (e) {
				console.log(e)
			}
		});
});

})(jQuery)


let x = ()=> {

    var youtube = document.querySelectorAll( ".youtube" );
    
    for (var i = 0; i < youtube.length; i++) {
      
      var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";
      
      var image = new Image();
          image.src = source;
          image.addEventListener( "load", function() {
            youtube[ i ].appendChild( image );
          }( i ) );
      
          youtube[i].addEventListener( "click", function() {
  
            var iframe = document.createElement( "iframe" );
  
                iframe.setAttribute( "frameborder", "0" );
                iframe.setAttribute( "allowfullscreen", "" );
                iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&autoplay=1" );
  
                this.innerHTML = "";
                this.appendChild( iframe );
          } );  
    };
    
  }

  x()
