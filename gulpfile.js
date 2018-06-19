'use strict';

var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    sass      = require('gulp-sass'),
    cleanCSS  = require('gulp-clean-css'),
    uglify    = require('gulp-uglify'),
    concat    = require('gulp-concat');

// Server task
gulp.task('connect', function() {
  connect.server({
    root: './dist',
    livereload: true
  });
});

// Compile sass and minify css
gulp.task('sass', function() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./dist'));
});

// Minify JS
gulp.task('minify-js', function() {
  return gulp.src('./public/src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/src/js/min'));
});

// Compress JS
gulp.task('compress-js', ['minify-js'], function() {
  return gulp.src('./public/src/js/min/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function () {
  gulp.watch(['./src/styles/**/*.scss'], ['sass']);
  gulp.watch(['./public/src/js/*.js'], ['compress-js']);
});

gulp.task('default', ['watch']);