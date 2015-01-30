'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  watchify    = require('watchify'),
  browserify  = require('browserify'),
  reactify    = require('reactify'),
  buffer      = require('vinyl-buffer'),
  source      = require('vinyl-source-stream'),
  to5 = require('gulp-6to5');

var handleError = function handleError(err) {
  var args = Array.prototype.slice.call(arguments);

  $.notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
};

/*==========  JAVASCRIPT  ==========*/

gulp.task('test:js', function() {
  return gulp.src('__tests__')
    .pipe($.jest({
      scriptPreprocessor: "./preprocessor.js",
      unmockedModulePathPatterns: [
          "node_modules/react"
      ],
      testPathIgnorePatterns: [
        "node_modules",
        "spec/support"
      ],
      moduleFileExtensions: [
        "js",
        "json",
        "react"
      ]
    }))
    .on('error', handleError);
});

gulp.task('demo:css', function() {
  return gulp.src(['demo/css/screen.scss', 'demo/styles/main.scss'])
    .pipe($.sass({
        outputStyle: 'compressed'
      }))
    .on('error', handleError)
    .pipe(gulp.dest('./dist/css/'))
  });

gulp.task('demo:html', function() {
  return gulp.src('demo/**.html')
    .pipe($.minifyHtml())
    .pipe(gulp.dest('./dist/'));
  });

gulp.task('demo:js', function() {
  return bundle(mainBundle, 'bundle.js');
});


var production = process.env.NODE_ENV === 'production';

/*==========  MainJS Handling  ==========*/

var mainBundle = watchify(browserify({
    basedir: __dirname,
    debug: !production,
    entries: './demo/js/index.js',
    cache: {},
    packageCache: {},
    fullPaths: true,
    extensions: ['.jsx']
  }, watchify.args));

mainBundle.transform(reactify);
mainBundle.external('react');
mainBundle.on('update', function() {
  return bundle(mainBundle, 'bundle.js');
});

/*==========  BUNDLE FUNCTION  ==========*/

function bundle(src, filename) {
  var startTime = Date.now();
  return src.bundle()
    .on('error', handleError)
    .pipe(source(filename))
      .pipe(buffer())
      .pipe($.sourcemaps.init({loadMaps: true}))
      .pipe($.uglify())
      .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe($.size({
      showFiles: true
    }));
}


/*==========  BUILD  ==========*/


gulp.task('build', function() {
  return gulp.src('./src/react-state-progress-bar.js')
    .pipe(to5({
      modules: 'common'
    }))
    .on('error', handleError)
    .pipe($.rename('react-state-progress-bar.js'))
    .pipe(gulp.dest('./'))
    .pipe($.uglify())
    .pipe($.rename('react-state-progress-bar.min.js'))
    .pipe(gulp.dest('./'));
});

/*==========  TASKS  ==========*/


gulp.task('demo', ['demo:html', 'demo:js', 'demo:css']);

gulp.task('watch', ['demo', 'build'], function() {
  gulp.watch(['./src/**.*'], ['build']);
  gulp.watch(['./demo/**'], ['demo']);
});

gulp.task('test', function() {
  gulp.watch('./react-state-progress-bar.js', ['test:js']);
});
