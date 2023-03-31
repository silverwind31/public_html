$(document).ready(function(e) {
	jQuery('.site-preloader').fadeOut('slow', function () {
		$(this).remove();
	});
	window.onscroll = function() {
		myFunction()
	};

	var header = document.querySelector("header");
	var sticky = header.offsetTop;

	function myFunction() {
		if (window.pageYOffset > sticky) {
			header.classList.add("fixed");
		} else {
			header.classList.remove("fixed");
		}
	};
	myFunction();
	// MODAL
	$('.wrapper .order_btn').on('click', function(e) {
		$('.modal').addClass('active');
		$('.modal_overlay').addClass('active');
	});
	$('.modal .close_btn').on('click', function(e) {
		$('.modal').removeClass('active');
		$('.modal_overlay').removeClass('active');
	});
	$('.modal_overlay').on('click', function(e) {
		$('.modal').removeClass('active');
		$('.hamburger_menu').removeClass('active');
		$(this).removeClass('active');
	});
	$('header .hamburger').on('click', function(e) {
		$('.hamburger_menu').addClass('active');
		$('.modal_overlay').addClass('active');
	});
	$('.hamburger_menu .close_icon').on('click', function(e) {
		$('.hamburger_menu').removeClass('active');
		$('.modal_overlay').removeClass('active');
	});
	var swiper_services = new Swiper(".services .services_swiper", {
		slidesPerView: 3,
		spaceBetween: 36,
		mousewheel: false,
		autoplay: {
			delay: 7000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".next",
			prevEl: ".prev",
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
				spaceBetween: 36,
				slideToClickedSlide: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 36,
				slideToClickedSlide: true,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 36,
				slideToClickedSlide: true,
			},
			1200: {
				slidesPerView: 3,
				spaceBetween: 36,
				slideToClickedSlide: true,
			},
		},
	});
	var partners_swiper = new Swiper(".partners .mySwiper", {
		slidesPerView: 3,
		loop: true,
		spaceBetween: 0,
		autoplay: {
		  delay: 2000,
		  disableOnInteraction: false
		},
		
		pagination: {
		  el: ".partners .swiper-pagination",
		  clickable: true,
		},
		breakpoints: {
            0:{
                slidesPerView: 2,
                spaceBetween: 0,
            },
            576:{
                slidesPerView: 3,
                spaceBetween: 0,
            },
          }
	});
	var testimonial_swiper = new Swiper(".testimonial_swiper", {
		slidesPerView: 1,
		spaceBetween: 36,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	$('.service .select').niceSelect();

	swiperTabsNav = new Swiper('.tabs_buttons', {
		allowTouchMove: false,
	});

	// Swiper Content
	var swiper = new Swiper('.swiper-container.tabs_content', {
		allowTouchMove: false,
		slidesPerView: 1,
		spaceBetween: 32,
		loop: false,
		thumbs: {
			swiper: swiperTabsNav,
		},
		mousewheel: false,
		autoplay: {
			delay: 7000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".next",
			prevEl: ".prev",
		},
	});

	$('.option').on('click', function() {
		let data_value = $(this).data('value')
		swiper.slideTo(data_value);
	});

	function isInCenter(elem) {
		var docViewTop = $(window).scrollTop() + (60);
		var docViewBottom = docViewTop + $(window).height();
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();
		var elemCenter = (elemTop + elemBottom) / 2;
		return (elemCenter >= docViewTop && elemCenter <= docViewBottom);
	}
	$(window).scroll(function() {
		$(".count").each(function() {
			if (isInCenter(this)) {
				$(this).addClass("visible");
			} else {
				$(this).removeClass("visible");
			}
		});
	});

	// AJAX
	$(".wrapper #order_form").on('submit', function(e){
		e.preventDefault();
		let form = $(this);
		let formData = $(this).serialize();
		let formButton = $(this).find('button');
		formButton.attr('disabled',true).addClass('disabled');
		$.ajax({
		  url: '/send.php',
		  method: 'post',
		  data: formData,
		  success: function(data){
			formButton.removeAttr("disabled").removeClass('disabled');
			form[0].reset();
			$(".modal").removeClass("active");
			$('.modal_overlay').removeClass('active');
			iziToast.success({
				position: 'bottomRight',
				timeout: 5000, 
				iconUrl: '../assets/images/index/circle.svg', 
				title: 'Success!',
				
			});
		  }
		});
	  });
})