'use strict';

var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    sass      = require('gulp-sass'),
    cleanCSS  = require('gulp-clean-css'),
    uglify    = require('gulp-uglify'),
    concat    = require('gulp-concat'),
    pug       = require('gulp-pug'),
    data      = require('gulp-data'),
    path      = require('path'),
    fs        = require('fs'),
    src       = './src',
    dist      = './dist';

// Server task
gulp.task('connect', function() {
  connect.server({
    root: dist,
    livereload: true
  });
});

// Compile sass and minify css
gulp.task('sass', function() {
  return gulp.src(src + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(dist));
});

// Minify JS & Compress JS
gulp.task('minify-js', function() {
  return gulp.src(src + '/**/*.js')
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(dist));
});

// Compile Pug template
gulp.task('pug', function() {
  return gulp
    .src([
      src + '/**/*.pug',
      '!' + src + '/**/_*.pug'
    ])
    .pipe(data(function (file) {
      return {
        'socialNetworks': JSON.parse(fs.readFileSync('./src/data/social-networks.json')),
        'techStacks': JSON.parse(fs.readFileSync('./src/data/techs.json')),
        'projects': JSON.parse(fs.readFileSync('./src/data/projects.json'))
      }
    }))
    .pipe(pug({}))
    .pipe(gulp.dest(dist))
})

// Copy static files
gulp.task('copy', function() {
  return gulp.src(src + '/static/**/*.*')
    .pipe(gulp.dest(dist))
})

gulp.task('watch', function () {
  gulp.watch([src + '/**/*.scss'], ['sass']);
  gulp.watch([src + '/**/*.pug'], ['pug']);
});

gulp.task('default', ['watch']);