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

var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat'),
  cssNano = require('gulp-cssnano'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  scsslint = require('gulp-scss-lint'),
  uglify = require('gulp-uglify');

var paths = {
  assets: './assets',
  fonts: './assets/fonts',
  img: './assets/img',
  js: './assets/js',
  sass: './assets/scss',
  build: './public',
  buildJs: './public/js',
  css: './public/css'
};

var watch = {
  sass: './assets/scss/**/*.scss'
};

gulp.task('move', function () {
  return gulp.src([paths.fonts + '/**', paths.img + '/**'], {base: paths.assets})
    .pipe(gulp.dest(paths.build));
});

gulp.task('sass', ['scss-lint'], function () {
  return gulp.src(paths.sass + '/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css));
});

gulp.task('scss-lint', function () {
  return gulp.src([watch.sass, '!' + paths.sass + '/base/_reset.scss'])
    .pipe(scsslint({
      'config': './.scss_lint.yml'
    }));
});

gulp.task('sass:prod', function () {
  return gulp.src(paths.sass + '/app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer())
    .pipe(cssNano({keepSpecialComments: 0}))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.css));

});

gulp.task('js', function () {
  return gulp.src([paths.js + '/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.buildJs));
});

gulp.task('js:prod', function () {
  return gulp.src([paths.js + '/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.buildJs));
});

gulp.task('watch', function () {
  gulp.watch(watch.sass, ['sass']);
});

gulp.task('default', ['move', 'sass', 'js']);

gulp.task('prod', ['move', 'sass:prod', 'js:prod']);
