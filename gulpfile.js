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

var
  gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  cssNano = require('gulp-cssnano'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  scsslint = require('gulp-scss-lint');

var
  paths = {
    assets: './assets',
    jade: './views',
    sass: './assets/scss',
    build: './static',
    css: './static/css'
  }, watch = {
    sass: './assets/scss/**/*.scss'
  };

gulp.task('scss-lint', function () {
  return gulp.src([watch.sass, '!' + paths.sass + '/base/_reset.scss'])
    .pipe(scsslint({
      'config': './.scss_lint.yml'
    }));
});

gulp.task('sass', ['scss-lint'], function () {
  return gulp.src(paths.sass + '/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(cssNano({keepSpecialComments: 0}))
    .pipe(gulp.dest(paths.css));

});

gulp.task('jade', function () {
  gulp.src(paths.jade + '/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('.'))
});

gulp.task('watch', function () {
  gulp.watch(watch.sass, ['sass']);
});

gulp.task('default', ['sass', 'jade']);
