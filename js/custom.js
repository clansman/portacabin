'use strict';
window.location.hash = '';
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
        // if ($(window).scrollTop() >= 1240) {
        //     $('.products-section').addClass('fixed-products');
        //     $('.process-section').addClass('mt-process');
        // } else {
        //     if ($('.products-section').is('.fixed-products')) {
        //         $('.products-section').removeClass('fixed-products');
        //     }
        //     if ($('.process-section').is('.mt-process')) {
        //         $('.process-section').removeClass('mt-process');
        //     }
        // }

        if ($(window).scrollTop() >= 720) {
            $('.slider-section').hide();
        } else {
            $('.slider-section').show();
        }
    });

    $('.first-nav').click(function() {});
});
