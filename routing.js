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
