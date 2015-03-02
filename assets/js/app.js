(function ($, window, document, undefined) {
    'use strict';

    $(function () {
        var didScroll = false,
            icon = $(".huge-title, #godown"),
            $window = $(window),
            distance = $('.wrapper').offset().top,
            $menu = $('#menu-bar'),
            $footer = $('footer');

        $window.scroll(function () {
            didScroll = true;
            if ($window.scrollTop() >= distance) {
                $menu.fadeIn();
            } else {
                $menu.fadeOut();
            }
        });

        window.setInterval(function () {
            if (didScroll) {
                if (1 - $window.scrollTop() / 200 > -20) {
                    icon.css({
                        opacity: 1 - $window.scrollTop() / 500
                    });
                }
                didScroll = false;
            }
        }, 50);
    });
})(window.jQuery, this, document);