'use strict';
$(function() {
    // if ($(window).width() > 950) {
    //     // $.stellar({
    //     //     scrollProperty: 'transform',
    //     //     positionProperty: 'transform',
    //     //     parallaxBackgrounds: true,
    //     // });
    // }

    var body = $('html, body');
    $('.load-more').click(function() {
        $('.testimonials-section').addClass('open');
        $(this).hide();
    });
    $('[data-ix="show-modal"]').click(function() {
        $('.overlay').addClass('open');
    });
    $('.close-icon').click(function() {
        $('.overlay').removeClass('open');
    });
    $('.overlay').click(function() {
        $('.close-icon').trigger('click');
    });
    $('.w-nav-link').click(function() {
        if ($(this).is('.first-nav')) {
            body.animate({
                scrollTop: 0
            }, '1000');
            window.location.hash = 'company';
        }
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() < 224) {
            if ($('.first-nav').is('.w--current') === false)
                $('.first-nav').addClass('w--current');
        } else {
            if ($('.first-nav').is('.w--current'))
                $('.first-nav').removeClass('w--current');
        }
        if ($(window).width() > 950) {
            if ($(window).scrollTop() >= 720) {
                $('.slider-section').hide();
            } else {
                $('.slider-section').show();
            }
        }
    });
});

function sendEmail(apikey, username, email, phone) {
    var msg = {
        'html': '<h3>Имя: ' + username + '</h3><br>' + '<h3>Email: ' + email + '</h3><br>' + '<h3>Телефон: ' + phone + '</h3>',
        'subject': 'Заявка с portacabin',
        'from_email': email,
        'from_name': username,
        'to': [{
            'email': 'info@portacabin.ru',
            'name': 'Portacabin',
            'type': 'to'
        }]
    };
    return $.post('https://mandrillapp.com/api/1.0/messages/send.json', {
        'key': apikey,
        'message': msg
    });
}

function validEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function sendForm(event, formId) {
    event.stopPropagation();
    event.preventDefault();

    var $form = $(formId);
    $form.find('[name="username"]').removeClass('error');
    $form.find('[name="email"]').removeClass('error');
    $form.find('[name="phone"]').removeClass('error');
    $('.error-message').hide();
    var username = $form.find('[name="username"]').val();
    var email = $form.find('[name="email"]').val();
    var phone = $form.find('[name="phone"]').val();

    if (!username || !email || !phone) {
        $form.find('.error-message').text('* Заполните все поля.')
        $form.find('.error-message').show();
        if (!username)
            $form.find('[name="username"]').addClass('error');
        if (!email)
            $form.find('[name="email"]').addClass('error');
        if (!phone)
            $form.find('[name="phone"]').addClass('error');
        return false;
    }
    if (!validEmail(email)) {
        $form.find('.error-message').text('* Некорректный email')
        $form.find('.error-message').show();
        $form.find('[name="email"]').addClass('error');
        return false;
    }

    sendEmail('8LERgIxL5ItrPwJUwrSTXg', username, email, phone)
        .done(function(resp) {
            console.log(resp);
            if (resp && resp[0] && resp[0].status === 'rejected') {
                $form.hide();
                $form.parent().find('.w-form-fail').show();
            } else {
                $form.hide();
                $form.parent().find('.w-form-done').show();
            }
        })
        .fail(function(resp) {
            console.log(resp);
            $form.hide();
            $form.parent().find('.w-form-fail').show();
        });
    $form.find('.submit').val('Подождите');
    return false;
}
