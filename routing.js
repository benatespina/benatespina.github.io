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

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index');
  });

  app.get('/:locale', function (req, res) {
    res.cookie('locale', req.params.locale);
    res.redirect('/');
  });
};
