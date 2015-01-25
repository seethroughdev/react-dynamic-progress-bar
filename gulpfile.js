'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  to5 = require('gulp-6to5');

var handleError = function handleError(err) {
  var args = Array.prototype.slice.call(arguments);

  $.notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
};

gulp.task('build', function() {
  return gulp.src('./src/react-dynamic-progress-bar.js')
    .pipe(to5({
        modules: 'umd'
      }))
    .on('error', handleError)
    .pipe($.rename('react-dynamic-progress-bar.js'))
    .pipe(gulp.dest('./'))
    .pipe($.uglify())
    .pipe($.rename('react-dynamic-progress-bar.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
  gulp.watch('./src/**.*', ['build']);
});
