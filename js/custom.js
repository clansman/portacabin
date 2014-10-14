'use strict';
var mak = '8LERgIxL5ItrPwJUwrSTXg';
$(function() {
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
        if ($(window).scrollTop() >= 720) {
            $('.slider-section').hide();
        } else {
            $('.slider-section').show();
        }
    });

    $('.first-nav').click(function() {});
});

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill(mak);
console.log(m);
// create a variable for the API call parameters
var params = {
    'message': {
        'from_email': 'user-email@portacabin.ru',
        'to': [{
            'email': 'mail@zulfat.net'
        }],
        'subject': 'Sending a text email from the Mandrill API',
        'text': 'I\'am learning the Mandrill API at Codecademy.'
    }
};

function sendForm(event, formId) {
    event.stopPropagation();
    var $form = $(formId);

    var username = $form.find('[name="username"]').val();
    var email = $form.find('[name="email"]').val();
    var phone = $form.find('[name="phone"]').val();

    var msg = {
        'html': '<h3>Имя: ' + username + '</h3><br>' + '<h3>Email: ' + email + '</h3><br>' + '<h3>Телефон: ' + phone + '</h3>',
        'subject': 'Заявка с portacabin',
        'from_email': email,
        'from_name': username,
        'to': [{
            'email': 'mail@zulfat.net',
            'name': 'Zulfat Ilyasov',
            'type': 'to'
        }]
    };
    $.post('https://mandrillapp.com/api/1.0/messages/send.json', {
            'key': mak,
            'message': msg
        })
        .done(function() {
            console.log(arguments);
        });
}
