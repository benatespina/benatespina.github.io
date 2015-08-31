/*
 * This file is part of the benatespina.com.
 *
 * Copyright (c) 2015 Beñat Espiña <benatespina@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Beñat Espiña <benatespina@gmail.com>
 */

'use strict';

(function ($) {
  var didScroll = false,
    icon = $('.main__me, .go-down, .language-selector--fixed'),
    $window = $(window),
    distance = $('.wrapper').offset().top,
    $menu = $('.menu');

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
}(jQuery));
