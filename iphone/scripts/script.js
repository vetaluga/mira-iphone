$(function(){

	$('input#phone').mask('9(999)999-99-99');

	$('.row7 .btn').click(function(e){
		e.preventDefault();
		$('body').find('.row8').animate({
			height: "toggle"
		}, 100, function() {
			$('html,body').stop().animate({ scrollTop: $('#faq').offset().top }, 100);
		});
	});

	$('div#services').click(function(e){
		e.preventDefault();
		$('body').find('div.services_list').animate({
			height: "toggle"
		}, 200, function() {
			
		});
	});

	$('#datetimepicker2').datetimepicker({
		locale: 'ru'
	});

	$('body').on('click','#chmodel',function(e){
		e.preventDefault();
		$(this).parent().find('ul').animate({
		    height: "toggle"
		}, 300, function() {});
	});

	$('#rtabs a.tab').click(function(e){
		e.preventDefault();
		var id = $(this).attr('href');
		$('#rtabs a.tab.active').removeClass('active');
		$(this).addClass('active');
		$('.row6 .tabs .tab.active').removeClass('active');
		$('.row6 .tabs .tab'+id).addClass('active');
	});
	//AJAX отправка формы
	var message = $('#message').html();
	console.log($('#message').length);
	if (message.length > 10) {
		var html = 	'<div class="mes"><h3>Сообщение</h3><p>'+message+'</p></div>';
		$('body').append('<div class="overlay"></div>'+html);
		setTimeout(function(){
			$('body').find('.mes').fadeOut().remove();
			$('body').find('.overlay').fadeOut().remove();
		},5000);
	}

	function something(event)
	{
		ga('send', 'event', 
		{
			eventCategory: 'send_form',
			eventAction: 'send',
			eventLabel: 'send'
		});
	}
	// $('.fancybox').fancybox(
	// {
	// 	helpers : {
	// 		thumbs : {
	// 			width  : 50,
	// 			height : 50
	// 		},
	// 		overlay: {
	// 			locked: false
	// 		}
	// 	}
	// });

	var wow = new WOW(
		{
			boxClass:     'wow',      // animated element css class (default is wow)
			duration:     0.5,
			delay:        1,
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true,       // act on asynchronously loaded content (default is true)
			callback:     function(box) {
			  // the callback is fired every time an animation is started
			  // the argument that is passed in is the DOM node being animated
			},
			scrollContainer: null // optional scroll container selector, otherwise use window
		}
	);
	wow.init();
	//проверка формы
	$('body').on('submit','form',function(e)
	{
		var error = 0;
		$('.required,.r',this).each(function()
		{
			if($(this).val().length < 1)
			{
				var tagname = $(this).context.tagName;
				$(this).addClass('invalid');
				if(tagname == 'SELECT')
				{
					var select_id = $(this).attr('id') + '_chosen';
					$('#' + select_id + '.chosen-container').addClass('invalid');
				}
				error++;
			}
			else
			{
				var tagname = $(this).context.tagName;
				$(this).removeClass('invalid');
				if(tagname == 'SELECT')
				{
					var select_id = $(this).attr('id') + '_chosen';
					$('#' + select_id + '.chosen-container').removeClass('invalid');
				}
			}
		});
		if(error > 0)
		{
			e.preventDefault();
		}
		else
			something();
	});

});