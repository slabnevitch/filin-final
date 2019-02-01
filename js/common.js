
$(function() {
	// alert('putnik');

	var isMobile = {
				Android:        function() { return navigator.userAgent.match(/Android/i) ? true : false; },
				BlackBerry:     function() { return navigator.userAgent.match(/BlackBerry/i) ? true : false; },
				iOS:            function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false; },
				Windows:        function() { return navigator.userAgent.match(/IEMobile/i) ? true : false; },
				any:            function() { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());  }
			};

			if ( !isMobile.any() ) {
		    // Код не для телефонов
		    // split letters

	}
	$(window).scroll(function() {
		var hHeight = $('.header-top').height(),
			$mHeader = $('.float-menu');

		if($(this).scrollTop() > hHeight ){
			// $mHeader.removeClass('bounceOutUp');
			$mHeader.addClass('active');
		}else{
			// $mHeader.addClass('bounceOutUp');
			$mHeader.removeClass('active');
		}
	});

	$(document).ready(function() {
		// $('#fullpage').fullpage({
		// 	// fixedElements: '.footer',
		// 	// normalScrollElements: ".footer",
		// 	scrollOverflow:true,
		// 	// fitToSection: false,
		// 	verticalCentered: false,
		// 	fitToSection: false
		// });	

		// scroll to calculaator
			if($('.calculator').length > 0){
				var calcLocation = $('.calculator').offset().top;
				$('html, body').animate({scrollTop: calcLocation - 100 }, 800);
				
			}

		// end scroll to calculaator

		// Custom placeholder transform
			var customInps = document.querySelectorAll('.custom-placeholdered');

			[].forEach.call(customInps, function(elem){
				
				elem.addEventListener('focus', inpFocus);
				elem.addEventListener('blur', inpBlur);
			});

			function inpFocus(e){

				e.target.parentElement.classList.add('focused');
			}

			function inpBlur(e){
				if(this.value == "")
					e.target.parentElement.classList.remove('focused');

			}
		// end Custom placeholder transform

		$('.header-order, .to-popup').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#name',

			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
				}
			}
		});

		$('.translators-form-trigger').magnificPopup({
			type: 'inline',
			preloader: false,
			focus: '#name',
			mainClass: 'translators-popup-cover',

			// When elemened is focused, some mobile browsers in some cases zoom in
			// It looks not nice, so we disable it:
			callbacks: {
				beforeOpen: function() {
					if($(window).width() < 700) {
						this.st.focus = false;
					} else {
						this.st.focus = '#name';
					}
				}
			}
		});

		// $('.reviews-filter__expand').magnificPopup({
		// 	type: 'image',
		// 	closeOnContentClick: true,
		// 	mainClass: 'mfp-img-mobile',
		// 	image: {
		// 		verticalFit: true
		// 	}

		// });

		// Tabs
			var $tabs = $('.tabs__link');

			$tabs.on('click', function(e) {
				e.preventDefault();
				var $th = $(this),
				$href = $th.attr('href'),
				$parent = $th.parent();
				$parent.addClass('tabs__item--active')
				.siblings()
				.removeClass('tabs__item--active');
				
				$($href).removeClass('hidden')
				.siblings()
				.addClass('hidden');
			});
		// end of Tabs

		// nouisliders
		if($('#slider-sale').length > 0 && $('#slider-pages').length > 0){

			var saleSlider = document.getElementById('slider-sale');
			var pagesSlider = document.getElementById('slider-pages');
			noUiSlider.create(saleSlider, {
				start: 0 ,
				connect: [true, false],
				margin: 30,
				range: {
					'min': 0,
					'max': 100
				}
			});

			noUiSlider.create(pagesSlider, {
				start: 0 ,
				connect: [true, false],
				margin: 10,
				range: {
					'min': 0,
					'max': 100
				}
			});
		}
		// end nouisliders

		// ikSelect
			var $selects = $('.custom-select--theme, .custom-select--lang-start, .custom-select--lang-end')
			$selects.each(function(ind, elem) {
					$(elem).ikSelect({
						autoWidth: false,
						onShow: function (inst) {

							var currWidth = $('.ik_select').eq(ind).width();
							$('.ik_select_dropdown').width(currWidth);
						}
					});
			})

		 $('.payment-form__valute').each(function(ind, elem) {
		 	$(elem).ikSelect({
				autoWidth: false,
				customClass: 'ik-payment',
				ddCustomClass: 'dd-payment',
				onShow: function (inst) {

					var currWidth = $('.ik_select').eq(ind).width();
					
					$('.ik_select_dropdown').width(currWidth + 10);
					$('.ik_select_dropdown').css('left', $('.ik_select').eq(ind).offset().left);
				}
			});
		 });
		
	// end ikSelect

		// kviz
			function Kviz() {
				var $steps = $('.calculator-top__displ'),
						$screens = $('.calculator-screen'),
						count = 0,
						overalCount = $screens.length;
						_self = this;
				
				this.init = function() {

					this.events();
				},

				this.events = function() {
					$('.calculator-prev').on('click', this.goPrev);
					$('.calculator-next').on('click', this.goNext);
				},

				this.goPrev = function(e) {
					count--;
					if(count < 0){
						count = 0;
					}

					_self.render();
					
				},

				this.goNext = function(e) {
					count++;
					if(count  > overalCount){
						count = overalCount;
					}

					_self.render();
			
				},

				this.render = function() {
					
					$screens.eq(count)
							.show()
							.siblings()
							.not('.calculator-top')
							.hide();

					this.stepsRender();
					
					$('.payment-form__valute').each(function(ind, elem) {
						$(elem).ikSelect('redraw');
					});
				},

				this.stepsRender = function() {
					$steps.eq(count)
									.addClass('active')
									.siblings()
									.removeClass('active');
				}
			}

			if($('.calculator').length > 0){
				var kviz = new Kviz();

				kviz.init();
				
			}

		// end of kviz

		// tooltipster
			var calcTooltipsterHeight;
			$('.pare-select__ques').tooltipster({
				side: ['right', 'top'],
				trigger: 'custom',
				interactive: true,
				arrow: false,
				 triggerOpen: {
				 	mouseenter: true,
				 	tap: true
				 },
				 triggerClose: {
				 	click: true,
				 	// scroll: true,
				 	mouseleave: true,
				 	tap: true
				 },
				maxWidth: 372,
				// contentAsHTML: true,
				contentCloning: true,

				functionReady: function(instance, helper) {
					
					helper.tooltip.classList.add('calculator-tip');
					
					if(screen.width > 980){
					
						calcTooltipsterHeight = $('.calculator-tip').find('.tooltipster-content').outerHeight();
						
						$('.tooltipster-base').css('height', calcTooltipsterHeight);
						$('.tooltipster-box').css('height', calcTooltipsterHeight);
						
						 var container = helper.origin,
					        	containerTop = $(container).offset().top;
			        				        	
			        	$(helper.tooltip).css('top', containerTop - calcTooltipsterHeight - 25);
					}
					
				},
				functionAfter: function(instance, helper) {
					calcTooltipsterHeight = 0;
				},
				functionPosition: function(instance, helper, position) {
					if(screen.width > 980){
					   var container = helper.origin,
				        	containerTop = container.getBoundingClientRect().top,
				        	containerLeft = container.getBoundingClientRect().left;

		        		var leftSumm = containerLeft + helper.geo.origin.size.width / 2;

				        position.coord.left = leftSumm;
						
					}

				        return position;
				}
			});
		// end of tooltipster

	});/*document ready*/

	// scrollify
		 // $.scrollify({
   //          section : "section",
   //          setHeights: false,
   //          overflowScroll: false,
   //          interstitialSection: "header, footer"
   //        });

//    $(".main").onepage_scroll({
//    sectionContainer: "section",     // sectionContainer accepts any kind of selector in case you don't want to use section
//    easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
//                                     // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
//    animationTime: 1000,             // AnimationTime let you define how long each section takes to animate
//    pagination: false       
// });
	// end scrollify

	// // mob-menu
		$(".toggle-mnu").click(function() {
			$(this).toggleClass("on");
			$(".header-menu").stop(true, true).fadeToggle();
			return false;
		});
	
	// end mob-menu

	// localisatin-toggle
		$('.localization__tri').click(function() {
			$('.localization-list__dropdown').fadeToggle();
		});
	// end localisatin-toggle

	// hodden-block Toggle
		$('.hidden-blocks__toggle').click(function() {
			var $hiddenParent = $(this).closest('.hidden-blocks');

			$hiddenParent.toggleClass('open');
			$hiddenParent.find('.block-to-hidden').toggleClass('block-to-hidden--hidden');
			// $('.services-descr__item').removeClass('services-descr__item--height')
			// 						.css('display', 'block');
			$hiddenParent.find('.block-to-hidden__masc').fadeToggle();
			$hiddenParent.hasClass('open') ? $(this).text('Скрыть') : $(this).text('Читать полностью');    
			return false;
		});

		$('.vacancy-toggle .hidden-blocks__toggle').click(function() {
			var $hiddenParent = $(this).closest('.vacancy'),
				$vacContent =  $hiddenParent.find('.vacancy-content'),
				$hidenElems = $hiddenParent.find('.decor-slide-up-hiden');

			$hiddenParent.toggleClass('open');
			$vacContent.slideToggle(100);
			$hidenElems.toggleClass('hidden');
			// $hiddenParent.find('.block-to-hidden').toggleClass('block-to-hidden--hidden');
			// $('.services-descr__item').removeClass('services-descr__item--height')
			// 						.css('display', 'block');
			// $hiddenParent.find('.block-to-hidden__masc').fadeToggle();
			$hiddenParent.hasClass('open') ? $(this).text('Скрыть') : $(this).text('Подробнее');    
			return false;
		});


	// end hodden-block Toggle


	// slick
			var $gradSlider = $('.slick-gratitudes').slick({
			dots: false,
			arrows: false,
			draggable: false
			// fade: true 
		});
		
		$('.gratitudes .carousel-nav li').click(function() {
			var $th = $(this),
				slide = $th.index();

			$gradSlider.slick('slickGoTo', slide + 1);
			$th.addClass('active').siblings().removeClass('active');
		});
	// end slick

	// custom scroll
		var cherryCS = $('.scroller').customScroll({
					preventParentScroll: false
			});

		var $track = $('.custom-scroll-advanced_track-y');
		function myScroll(delta) {
				var $inner = myCS.$inner;
				
				$inner.animate({'scrollTop': $inner.scrollTop() + delta + 'px'}, 100);
			}

			$track
			.on('click', function(e) {
				var yPos = e.pageY - $(this).offset().top;
				var barTop = myCS.$bar.position().top;
				var h = myCS.$container.height() - 20;
				myScroll(yPos < barTop ? -h : h);
			})
			.on('click', '.arrow', function(e) {
				e.stopPropagation();
				var isTop = $(this).hasClass('top');
				myScroll(isTop ? -50 : 50);
			});
	// end custom scroll

	// waypoints animation

		$('.header-bg.header-animated, .header-logo.header-animated').animated('fadeInLeft');
		
		$('.header-divider.header-animated, .decor-header-right.header-animated, .decor-header-left.header-animated, .header-bg__wht.header-animated').each(function(index, elem) {
			var $this = $(this);

				setTimeout(function() {
					$this.animated('bounceInDown');

				}, index*300);
		});
		
		// var headerWaypoints = $('.header').waypoint({
		// 	handler: function(down) {
		// 		$('.decor-header-right, .decor-header-left').each(function(ind, elem) {
		// 			var $this = $(this);

		// 			$this.removeClass('animated-hidden');

		// 		});
		// 	},
		// 	offset: '100%'
		// });

		$('.header-text-animation').each(function(index, elem) {
			var $this = $(this);

				setTimeout(function() {
					$this.animated('bounceInLeft');

				}, index*300);
		});
		$('.header-right-animated').each(function(index, elem) {
			var $this = $(this);

				setTimeout(function() {
					$this.animated('fadeInRight');

				}, index*400);
		});

		$('.services__item, .services__false-item').each(function(index, elem){
		  var $th = $(elem);
		  setTimeout(function(){
		      if(index%2 == 0){
		      
		      $th.animated('fadeInLeft');
		     
		    }else{
		     
		      $th.animated('fadeInRight');
		    }
		  }, index*500);
		});

		$('section .decor').animated('bounceInDown');
		
		$('.infigures__top-text').animated('bounceInLeft');
		
		$('.risks-list li, .risks-middle p').each(function(index, elem) {
			var $this = $(this);

				setTimeout(function() {
					$this.animated('fadeIn');

				}, index*600);
		});
		
		$('.workers-person__item').each(function(index, elem) {
			var $this = $(elem);
				setTimeout(function() {
					$this.animated('fadeIn');

				}, index*1000);
		});

		$('.test-translate__inner h1, .test-translate__subtitle, .test-translate__left-bg').animated('fadeInLeft');

		$('.booking-order__item').each(function(index, elem) {
			var $this = $(elem);
				setTimeout(function() {
					$this.find('.booking-order__icon').animated('fadeInUp');
					$this.find('.booking-order__item-number').animated('fadeInUp');
					$this.find('.booking-order__header').animated('fadeInUp');
					$this.find('.booking-order__body').animated('fadeInUp');

				}, index*1000);
		});

		$('.decor-flags').animated('fadeInLeft');

	// end waypoints animation

	// rellax
	$('.decor').removeClass('bounceInDown');
	 var rellax = new Rellax('.rellax', {
	 	// speed: -1.5
	 	center: true
	 });
	// end rellax

	// animate number
		if(screen.width > 780){

			var digitsWaypoints = $('.in-digits').waypoint({
				handler: function(direction) {

					if(direction == 'down'){
						$('.infigures-item__value--desk').each(function(index, elem) {
						var delay = index * 800,
						$this = $(elem);
						
						
						var timer = setTimeout(function(){
							$this.animateNumber({
								number: $this.attr('data-num'),
							    // color: 'green', // require jquery.color
							    // 'font-size': '50px',

							    easing: 'easeInQuad', // require jquery.easing

							    // optional custom step function
							    // using here to keep '%' sign after number
							    numberStep: function(now, tween) {
							    	var floored_number = Math.floor(now),
							    	target = $(tween.elem);

							    	target.text(floored_number);
							    	}

								}, 3000);
						}, delay);
					});
				}
			},
			offset: '100%'
		});

			var langWaypoints =$('.flags-list__content').waypoint({
				handler: function(down) {
					$('.flags-list__content .title-wrapper .langs-to-animate--desk').animateNumber({ number: 70 }, 3000);
				},
				offset: '100%'
			});
		}

	// end animate number

	//Chrome Smooth Scroll

	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});
var footerMapOffset = $('.footer-left').width();
function initMap() {
				var marker = new google.maps.Marker({
      		position: {lat: 49.994339, lng: 36.236628}
			    // title: 'Вне зоны доступа', // "Хинт"
			    // icon: image
			  });
	      var map = new google.maps.Map(document.getElementById('footer-map'), {
	        center: {lat: 49.994581, lng: 36.236521},
	        zoom: 17,
	        disableDefaultUI: true, 
	        zoomControl: true,
	        mapTypeControl: true,
	        fullscreenControl: true
	        // styles: style

	      });
	      marker.setMap(map);
	      map.panBy(-footerMapOffset/2, 0);
  		// }
  	}

$(window).load(function() {


});
