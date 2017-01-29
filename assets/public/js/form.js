// $(function () {
//
// 	$('#index-callback').submit(function (e) {
// 		var phone = $(this).find('[name="phone"]'),
// 			name = $(this).find('[name="name"]');
// 		e.preventDefault();
// 		if (phone.val() != '' && name.val() != ''){
// 			submit_index_form($(this));
// 		} else {
// 			if (name.val() == '' && phone.val() != ''){
// 				name.addClass('error');
// 			} else if (phone.val() == '' && name.val() != ''){
// 				phone.addClass('error');
// 			} else if (phone.val() == '' && name.val() == ''){
// 				phone.addClass('error');
// 				name.addClass('error');
// 			}
// 		}
// 	});
//
// 	$('#datetime-callback').submit(function (e) {
// 		var phone = $(this).find('[name="phone"]'),
// 			name = $(this).find('[name="name"]'),
// 			datetime = $(this).find('[name="datetime"]'),
// 			address = $(this).find('[name="address"]');
// 		e.preventDefault();
// 		if (phone.val() != '' && name.val() != '' && datetime.val() != '' && address.val() != ''){
// 			submit_datetime_form($(this));
// 		} else {
// 			if ( name.val() == '') name.addClass('error');
// 			if ( phone.val() == '') phone.addClass('error');
// 			if ( datetime.val() == '') datetime.addClass('error');
// 			if ( address.val() == '') address.addClass('error');
// 		}
// 	});
//
// 	$('#callback').submit(function (e) {
// 		var phone = $(this).find('[name="phone"]'),
// 			name = $(this).find('[name="name"]');
// 		e.preventDefault();
// 		if (phone.val() != '' && name.val() != ''){
// 			submit_form($(this));
// 		} else {
// 			if (name.val() == '' && phone.val() != ''){
// 				name.addClass('error');
// 			} else if (phone.val() == '' && name.val() != ''){
// 				phone.addClass('error');
// 			} else if (phone.val() == '' && name.val() == ''){
// 				phone.addClass('error');
// 				name.addClass('error');
// 			}
// 		}
// 	});
//
// 	$('#callback_footer').submit(function (e) {
// 		var phone = $(this).find('[name="phone"]'),
// 			name = $(this).find('[name="name"]');
// 		e.preventDefault();
// 		if (phone.val() != '' && name.val() != ''){
// 			submit_form_footer($(this));
// 		} else {
// 			if (name.val() == '' && phone.val() != ''){
// 				name.addClass('error');
// 			} else if (phone.val() == '' && name.val() != ''){
// 				phone.addClass('error');
// 			} else if (phone.val() == '' && name.val() == ''){
// 				phone.addClass('error');
// 				name.addClass('error');
// 			}
// 		}
// 	});
//
// 	$('#repair').submit(function (e) {
// 		var phone = $(this).find('[name="phone"]'),
// 			name = $(this).find('[name="name"]');
// 		e.preventDefault();
// 		if (phone.val() != '' && name.val() != ''){
// 			submit_form_repair($(this));
// 		} else {
// 			if (name.val() == '' && phone.val() != ''){
// 				name.addClass('error');
// 			} else if (phone.val() == '' && name.val() != ''){
// 				phone.addClass('error');
// 			} else if (phone.val() == '' && name.val() == ''){
// 				phone.addClass('error');
// 				name.addClass('error');
// 			}
// 		}
// 	});
//
// 	$('#cost').submit(function (e) {
// 		var phone = $(this).find('[name="phone"]'),
// 			name = $(this).find('[name="name"]');
// 		e.preventDefault();
// 		if (phone.val() != '' && name.val() != ''){
// 			submit_form_cost($(this));
// 		} else {
// 			if (name.val() == '' && phone.val() != ''){
// 				name.addClass('error');
// 			} else if (phone.val() == '' && name.val() != ''){
// 				phone.addClass('error');
// 			} else if (phone.val() == '' && name.val() == ''){
// 				phone.addClass('error');
// 				name.addClass('error');
// 			}
// 		}
// 	});
//
// 	$('#consult').submit(function (e) {
// 		var phone = $(this).find('[name="phone"]'),
// 			message = $(this).find('[name="message"]'),
// 			name = $(this).find('[name="name"]');
// 		e.preventDefault();
// 		if (phone.val() != '' && name.val() != ''){
// 			submit_form_consult($(this));
// 		} else {
// 			if (name.val() == '' && phone.val() != ''){
// 				name.addClass('error');
// 			} else if (phone.val() == '' && name.val() != ''){
// 				phone.addClass('error');
// 			} else if (phone.val() == '' && name.val() == ''){
// 				phone.addClass('error');
// 				name.addClass('error');
// 			}
// 		}
// 	});
//
// });
//
// function submit_form(form) {
// 	$.ajax({
// 		url: form.attr('action'),
// 		method: "POST",
// 		dataType: "json",
// 		async: true,
// 		data: form.serialize(),
// 		beforeSend: function(){
// 			$('.modal .loader').fadeIn('fast');
// 		},
// 		success: function (data, textStatus, xhr) {
// 			if (xhr.status == 200) {
// 				$('.modal .block').fadeOut('fast',function(){
// 					$('.modal .thank-msg').fadeIn('fast',function(){
// 						$('.modal .loader').fadeOut('fast');
// 					});
// 				});
// 				$('input[type="text"]').val('');
//
// 				if( typeof ga != 'undefined' ) ga('send', 'event', 'send_form', 'send', 'send');
// 				if( typeof yaCounter38622470 != 'undefined' ) yaCounter38622470.reachGoal('order');
// 				if( typeof fbq != 'undefined' ) fbq('track', 'Lead');
// 				if( typeof window.console != 'undefined' ) console.log('success');
//
// 				window.location = '/thankyou';
//
// 			}
// 		},
// 		error: function (xhr, ajaxOptions, thrownError) {
// 			if (xhr.status != 200) {
// 				$('.modal .loader').fadeOut('fast');
// 			}
// 		}
// 	});
// }
//
// function submit_index_form(form) {
// 	$.ajax({
// 		url: form.attr('action'),
// 		method: "POST",
// 		dataType: "json",
// 		async: true,
// 		data: form.serialize(),
// 		beforeSend: function(){
// 			$('#index-form-box').addClass('loading');
// 		},
// 		success: function (data, textStatus, xhr) {
// 			if (xhr.status == 200) {
// 				$('input[type="text"]').val('');
//
// 				if( typeof ga != 'undefined' ) ga('send', 'event', 'send_form', 'send', 'send');
// 				if( typeof yaCounter38622470 != 'undefined' ) yaCounter38622470.reachGoal('order');
// 				if( typeof fbq != 'undefined' ) fbq('track', 'Lead');
// 				if( typeof window.console != 'undefined' ) console.log('success');
//
// 				window.location = '/thankyou';
// 			}
// 		},
// 		error: function (xhr, ajaxOptions, thrownError) {
// 			if (xhr.status != 200) {
// 				$('#index-form-box').removeClass('loading');
// 			}
// 		}
// 	});
// }
//
// function submit_datetime_form(form) {
// 	$.ajax({
// 		url: form.attr('action'),
// 		method: "POST",
// 		dataType: "json",
// 		async: true,
// 		data: form.serialize(),
// 		beforeSend: function(){
// 			$('#datetime-form-box').addClass('loading');
// 		},
// 		success: function (data, textStatus, xhr) {
// 			if (xhr.status == 200) {
// 				$('input[type="text"]').val('');
//
// 				if( typeof ga != 'undefined' ) ga('send', 'event', 'send_form', 'send', 'send');
// 				if( typeof yaCounter38622470 != 'undefined' ) yaCounter38622470.reachGoal('order');
// 				if( typeof fbq != 'undefined' ) fbq('track', 'Lead');
// 				if( typeof window.console != 'undefined' ) console.log('success');
//
// 				window.location = '/thankyou';
// 			}
// 		},
// 		error: function (xhr, ajaxOptions, thrownError) {
// 			if (xhr.status != 200) {
// 				$('#datetime-form-box').removeClass('loading');
// 			}
// 		}
// 	});
// }
//
// function submit_form_cost(form) {
// 	$.ajax({
// 		url: form.attr('action'),
// 		method: "POST",
// 		dataType: "json",
// 		async: true,
// 		data: form.serialize(),
// 		beforeSend: function(){
// 			$('.cost-modal .loader').fadeIn('fast');
// 		},
// 		success: function (data, textStatus, xhr) {
// 			if (xhr.status == 200) {
// 				$('.cost-modal .block').fadeOut('fast',function(){
// 					$('.cost-modal .thank-msg').fadeIn('fast',function(){
// 						$('.cost-modal .loader').fadeOut('fast');
// 					});
// 				});
// 				$('input[type="text"]').val('');
//
// 				if( typeof ga != 'undefined' ) ga('send', 'event', 'send_form', 'send', 'send');
// 				if( typeof yaCounter38622470 != 'undefined' ) yaCounter38622470.reachGoal('order');
// 				if( typeof fbq != 'undefined' ) fbq('track', 'Lead');
// 				if( typeof window.console != 'undefined' ) console.log('success');
//
// 				window.location = '/thankyou';
//
// 			}
// 		},
// 		error: function (xhr, ajaxOptions, thrownError) {
// 			if (xhr.status != 200) {
// 				$('.cost-modal .loader').fadeOut('fast');
// 			}
// 		}
// 	});
// }
//
// function submit_form_consult(form) {
// 	$.ajax({
// 		url: form.attr('action'),
// 		method: "POST",
// 		dataType: "json",
// 		async: true,
// 		data: form.serialize(),
// 		beforeSend: function(){
// 			$('.consult-modal .loader').fadeIn('fast');
// 		},
// 		success: function (data, textStatus, xhr) {
// 			if (xhr.status == 200) {
// 				$('.consult-modal .block').fadeOut('fast',function(){
// 					$('.consult-modal .thank-msg').fadeIn('fast',function(){
// 						$('.consult-modal .loader').fadeOut('fast');
// 					});
// 				});
// 				$('input[type="text"]').val('');
//
// 				if( typeof ga != 'undefined' ) ga('send', 'event', 'send_form', 'send', 'send');
// 				if( typeof yaCounter38622470 != 'undefined' ) yaCounter38622470.reachGoal('order');
// 				if( typeof fbq != 'undefined' ) fbq('track', 'Lead');
// 				if( typeof window.console != 'undefined' ) console.log('success');
//
// 				window.location = '/thankyou';
//
// 			}
// 		},
// 		error: function (xhr, ajaxOptions, thrownError) {
// 			if (xhr.status != 200) {
// 				$('.consult-modal .loader').fadeOut('fast');
// 			}
// 		}
// 	});
// }
//
// function submit_form_footer(form) {
// 	$.ajax({
// 		url: form.attr('action'),
// 		method: "POST",
// 		dataType: "json",
// 		async: true,
// 		data: form.serialize(),
// 		beforeSend: function(){
// 			$('.overlay').fadeIn('fast');
// 			$('.thank-modal').addClass('open');
// 		},
// 		success: function (data, textStatus, xhr) {
// 			if (xhr.status == 200) {
// 				$('.thank-modal .loader').fadeOut('fast');
// 				$('input[type="text"]').val('');
//
// 				if( typeof ga != 'undefined' ) ga('send', 'event', 'send_form', 'send', 'send');
// 				if( typeof yaCounter38622470 != 'undefined' ) yaCounter38622470.reachGoal('order');
// 				if( typeof fbq != 'undefined' ) fbq('track', 'Lead');
// 				if( typeof window.console != 'undefined' ) console.log('success');
//
// 				window.location = '/thankyou';
// 			}
// 		},
// 		error: function (xhr, ajaxOptions, thrownError) {
// 			if (xhr.status != 200) {
//
// 			}
// 		}
// 	});
// }
//
// function submit_form_repair(form) {
// 	$.ajax({
// 		url: form.attr('action'),
// 		method: "POST",
// 		dataType: "json",
// 		async: true,
// 		data: form.serialize() + '&model=' + $('.repair-header .model span').text() + '&repair=' + $('.repair-header .text').text(),
// 		beforeSend: function(){
// 			$('.repair-modal .loader').fadeIn('fast');
// 		},
// 		success: function (data, textStatus, xhr) {
// 			if (xhr.status == 200) {
// 				$('.repair-modal .wrapper').fadeOut('fast',function(){
// 					$('.repair-modal .thank-msg').fadeIn('fast',function(){
// 						$('.repair-modal .loader').fadeOut('fast');
// 						$('.repair-modal').css('top','50%').css('transform','translateX(-50%) translateY(-50%)').css('-webkit-transform','translateX(-50%) translateY(-50%)');
// 					});
// 				});
// 				$('input[type="text"]').val('');
//
// 				if( typeof ga != 'undefined' ) ga('send', 'event', 'send_form', 'send', 'send');
// 				if( typeof yaCounter38622470 != 'undefined' ) yaCounter38622470.reachGoal('order');
// 				if( typeof fbq != 'undefined' ) fbq('track', 'Lead');
// 				if( typeof window.console != 'undefined' ) console.log('success');
//
// 				window.location = '/thankyou';
//
// 			}
// 		},
// 		error: function (xhr, ajaxOptions, thrownError) {
// 			if (xhr.status != 200) {
// 				$('.repair-modal .loader').fadeOut('fast');
// 			}
// 		}
// 	});
// }
