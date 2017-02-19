$(document).ready(function(){

	if ($(window).width() > $(window).height() + 599){
		$('.main-banner').height($(window).height());
	}

	$('.main-banner .mouse-down').click(function(){
		$('body').animate({scrollTop: ($('.main-banner').height())}, 'slow');
	});

	$('#partners-company').click(function(){
		$(this).addClass('active');
		$('#partners-stars').removeClass('active');
		$('.stars-tab').fadeOut('fast',function(){
			$('.partner-tab').fadeIn('fast');
		});
	});

	$('#partners-stars').click(function(){
		$(this).addClass('active');
		$('#partners-company').removeClass('active');
		$('.partner-tab').fadeOut('fast',function(){
			$('.stars-tab').fadeIn('fast');
		});
	});

	$('.scroll-anchor').click(function(){
		var target = $( '.' + $(this).attr('tid') );
		$('html, body').animate({ 'scrollTop' : target.offset().top });
	});

	// $('.comments-block .more-btn').click(function(){
	// 	$('.block1').fadeOut('fast',function(){
	// 		$('.block1').addClass('mid').removeClass('block1');
	// 		$('.block2').addClass('mid2').fadeIn('fast',function(){
	// 			$('.mid2').removeClass('block2').removeClass('mid2').addClass('block1');
	// 			$('.mid').addClass('block2').removeClass('mid');
	// 		});
	// 	});
	// });

	$(function () {
        $('#datetimepicker1').datetimepicker({
        	locale : 'ru',
        	minDate : new Date(),
        	icons : {
        		time : 'dtp_time',
        		date : 'dtp_date'
        	}
        });
    });

	var commentsBlock = $('#comments-block').find('.block'),
		commentsBlockActive = 0,
		commentsBlockBusy = false;
	$('.comments-block .more-btn').click(function(){
		if(commentsBlockBusy) return;
		commentsBlockBusy = true;
		var pos = commentsBlockActive + 1;
		if(pos > commentsBlock.length - 1) pos = 0;
		var cur = commentsBlock[commentsBlockActive],
			nxt = commentsBlock[pos];
		$(cur).fadeOut('fast',function(){
			$(nxt).fadeIn('fast',function(){
				$(cur).removeClass('active');
				$(nxt).addClass('active');
				commentsBlockActive = pos;
				commentsBlockBusy = false;
			});
		});
	});

	$('.modal-trigger').click(function(){
		$('.overlay').fadeIn('fast');
		var modal_class = $(this).attr('modal-class') || 'modal';
		$('.' + modal_class).addClass('open');
		$(document).bind('mousewheel', function (e) {
			e.preventDefault();
		});
	});

	function openRepairModal(e,autoopen)
	{
		autoopen = (typeof autoopen == 'undefined' || !autoopen) ? false : true;

		$('.overlay').fadeIn('fast');
		$('.scroll-wrap').fadeIn('fast');
		$('body').addClass('overflow-body').width($(window).width() - 15);
		$('.scroll-wrap').css({"top": $(window).scrollTop()});
		$('.scroll-wrap .close').css('left', $('.repair-modal').offset().left + $('.repair-modal').width() + 'px');
		$('.repair-header .model span').empty().append($('.price-tabs .active').text());
		$('.repair-header .model div').empty().append($('.price-tabs .active').parent().parent().find('span').text());

		var left = $(this).find('.left'),
				right = $(this).find('.right'),
				service_name = left.find('.service_name').text(),
				amount = parseInt(right.attr('amount')) || false,
				sale_amount = parseInt(right.attr('sale_amount')) || false;

		$('.repair-header .text').empty().append(service_name);
		$('.repair-modal .repair-header .price').empty();

		if( amount ){
			if( sale_amount ){
				$('.repair-modal .repair-header .price').append('<div class="sum"><span>'+sale_amount+'</span> <i class="fa fa-rub"></i></div><div class="note">специальное<br /> предложение</div><br />');
				$('.repair-modal .repair-header .price').append('<div class="sum"><span class="strike">'+amount+'</span> <i class="fa fa-rub"></i></div><div class="note">действительно<br /> только сегодня</div>');
			}else{
				$('.repair-modal .repair-header .price').append('<div class="sum"><span>'+amount+'</span> <i class="fa fa-rub"></i></div><div class="note">итоговая цена с учетом<br>выезда и запчастей</div>');
			}
		}else{
			$('.repair-modal .repair-header .price').append('<div class="sum">Под заказ</span>');
		}

		// if(!autoopen) window.history.pushState("", "", "/p/" + $(this).attr('model-alias') + "/" + $(this).attr('price-alias'));
	}

	function card() {
		var autoopened = false, prices = $('.price-content .content-tabs div');
		prices.each(function(i,elm){
			var link = $(elm).find('.price-url-link');
			if( !link.length ) $(elm).click(openRepairModal);
			if( !autoopened ) {
				if( $(elm).hasClass('autoopen-service') ) {
					if( link.length )
						window.location = $(link[0]).attr('href');
					else
						openRepairModal.apply(elm,[false,true]);
					autoopened = true;
				}
			}
		});
	}

	card();


	$('.repair-modal .close, .repair-modal .close-btn').click(function (e) {
		e.preventDefault();
		$('.scroll-wrap').fadeOut('fast',function(){
			$('body').removeClass('overflow-body').width($(window).width());
		});
		$('.overlay').fadeOut('fast');
		$('.repair-modal .thank-msg').fadeOut('fast',function(){
			$('.repair-modal .wrapper').fadeIn('fast');
			$('.repair-modal').css('top','60px').css('transform','translateX(-50%)').css('-webkit-transform','translateX(-50%)');
		});
		$(document).unbind('mousewheel');
	});
	$('.scroll-wrap').click(function (event) {
		if ($(event.target).closest(".repair-modal").length || $(event.target).closest(".price-block").length) {
			return;
		}
		$('.scroll-wrap').fadeOut('fast',function(){
			$('body').removeClass('overflow-body').width($(window).width());
		});
		$('.overlay').fadeOut('fast');
		$('.repair-modal .thank-msg').fadeOut('fast',function(){
			$('.repair-modal .wrapper').fadeIn('fast');
			$('.repair-modal').css('top','60px').css('transform','translateX(-50%)').css('-webkit-transform','translateX(-50%)');
		});
		$(document).unbind('mousewheel');
		event.stopPropagation();
	});

	$('.modal .close, .overlay, .modal .close-btn').click(function (e) {
		e.preventDefault();
		$('.modal').removeClass('open');
		$('.overlay').fadeOut('fast');
		$('.modal .thank-msg').fadeOut('fast',function(){
			$('.modal .block').fadeIn('fast');
		});
		$(document).unbind('mousewheel');
	});

	$('.cost-modal .close, .overlay, .cost-modal .close-btn').click(function (e) {
		e.preventDefault();
		$('.cost-modal').removeClass('open');
		$('.overlay').fadeOut('fast');
		$('.cost-modal .thank-msg').fadeOut('fast',function(){
			$('.cost-modal .block').fadeIn('fast');
		});
		$(document).unbind('mousewheel');
	});

	$('.consult-modal .close, .overlay, .consult-modal .close-btn').click(function (e) {
		e.preventDefault();
		$('.consult-modal').removeClass('open');
		$('.overlay').fadeOut('fast');
		$('.consult-modal .thank-msg').fadeOut('fast',function(){
			$('.consult-modal .block').fadeIn('fast');
		});
		$(document).unbind('mousewheel');
	});

	$('.thank-modal .close, .overlay, .thank-modal .close-btn').click(function (e) {
		e.preventDefault();
		$('.thank-modal').removeClass('open');
		$('.overlay').fadeOut('fast');
		$('.thank-modal .loader').fadeIn('fast');
	});

	var input = $('input');
	var phone = $('.input_phone');

	input.focus(function () {
		$(this).data('placeholder', $(this).attr('placeholder'));
		$(this).attr('placeholder', '');
		$(this).removeClass('error');
	});
	input.blur(function () {
		$(this).attr('placeholder', $(this).data('placeholder'));
	});

	phone.mask('+38 (000) 000-00-00');

	phone.click(function () {
		$(this).removeClass('error');
		if ($(this).val().length == 0) {
			$(this).val('+38 ');
		}
	});
	phone.focusout(function () {
		if ($(this).val().length < 4) {
			$(this).val('');
		}
	});

	var carCont = $('.car-block');

	var lastScrollTop = 0, delta = 5;

	$(window).scroll(function(event){
		if ($(window).width() - $(window).height() > 500){
			$('.car').css('left', $(window).scrollTop() - $(window).height() - $(window).width() / 1);
		} else {
			$('.car').css('left', $(window).scrollTop() - $(window).height() - $(window).width() / 1);
		}

		var st = $(this).scrollTop();

		if(Math.abs(lastScrollTop - st) <= delta)
		return;

		if (st > lastScrollTop){
			$('.wheel').removeClass('move-back').removeClass('move-stop').addClass('move');
		} else {
			$('.wheel').removeClass('move').removeClass('move-stop').addClass('move-back');
		}
		lastScrollTop = st;

		if ($(window).scrollTop() > $('.footer').offset().top - 580){
			$('.bgvideo-footer').get(0).play();
		}
	});

	$.fn.scrollStopped = function(callback) {
	  var that = this, $this = $(that);
	  $this.scroll(function(ev) {
	    clearTimeout($this.data('scrollTimeout'));
	    $this.data('scrollTimeout', setTimeout(callback.bind(that), 30, ev));
	  });
	};

	$(window).scrollStopped(function(ev) {
		$('.wheel').addClass('move-stop');
	});


	$('.price-content').height($('.content-tabs').height());

	var lastModel = [];
	(function(){
		var elm = $('.price-block .price-table .price-tabs ul li.active');
		lastModel[elm.attr('device_alias')] = elm;
	})();
	function openModelElement(elm)
	{
		$('.price-block .price-table .price-tabs ul li.active').removeClass('active');
		$(elm).addClass('active');

		lastModel[$(elm).attr('device_alias')] = $(elm);

		$('.price-content').animate({opacity: 0}, 'fast');
		// window.history.pushState("", "", $(elm).find('a').attr('href'));
		$('.price-content').load($(elm).find('a').attr('href') + ' .content-tabs',function(){
			card();
			$('.price-content').animate({height: ($('.content-tabs').height()),opacity: 1}, 'fast');
		});
	}

	$('.price-block .price-table .price-tabs ul li').click(function(e){
		e.preventDefault();
		console.log(1);
		openModelElement(this);
	});

	$('.js-device-tab').click(function(e){
		e.preventDefault();
		var device_alias = $(this).attr('device_alias');
		$('.js-device-tab').removeClass('active');
		$(this).addClass('active');
		$('.js-model-tab').removeClass('active')
		$('.js-model-tab-'+device_alias).addClass('active');
		var activate = ( typeof lastModel[device_alias] != 'undefined' ) ? lastModel[device_alias] : $('.js-model-tab-'+device_alias+' ul li')[0];
		openModelElement(activate);
	});

	(function(){
		function transitionEndEventName() {
		  var i,
		    undefined,
		    el = document.createElement('div'),
		    eventNames = {
		      'transition':'transitionend',
		      'OTransition':'otransitionend',
		      'MozTransition':'transitionend',
		      'WebkitTransition':'webkitTransitionEnd',
		      'msTransition' : 'MSTransitionEnd'
		    };
		  for (i in eventNames) {
		    if (eventNames.hasOwnProperty(i) && el.style[i] !== undefined) {
		      return eventNames[i];
		    }
		  }
		}
		var tEvt = transitionEndEventName();
			mouseWheel = document.getElementById('mouse-wheel');
			mouseWheelHandler = function(){
				if($(mouseWheel).hasClass('animate'))
					$(mouseWheel).removeClass('animate');
				else
					$(mouseWheel).addClass('animate');
			};
		if( tEvt ){
		    $(mouseWheel).on(tEvt,mouseWheelHandler);
			mouseWheelHandler();
			window.addEventListener('resize',function(){ mouseWheelHandler(); },false);
		}
	})();
});

$(window).resize(function(){
	if ($(window).width() > $(window).height() + 599) {
		$('.main-banner').height($(window).height());
	}
	$('.scroll-wrap .close').css('left',$('.repair-modal').offset().left + $('.repair-modal').width() + 'px');
});

$( document ).ready(function() {
	$(".iphone .active").click();
});
