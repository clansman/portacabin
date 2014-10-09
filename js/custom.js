'use strict';

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
            $('.first-nav').removeClass('w--current');
        }
    });

    $('.first-nav').click(function() {});
});
