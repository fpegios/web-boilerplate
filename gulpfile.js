'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
var del = require('del');
var bulkSass = require('gulp-sass-bulk-import');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

// project files' paths
var paths = {
  styles: {
    src: 'src/styles/**/*.scss',
    dest: 'dist/css/'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dest: 'dist/js/'
  },
  views: {
    src: 'src/views/**/*.html'
  }
};

// restart express server
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    // nodemon our expressjs server
    script: 'app.js',
    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', function () {
  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',
    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,
  });
});

//  clean dist folder
gulp.task('clean', function () {
  return del([ 'dist' ]);
});

// convert .scss to .css and uglify it
gulp.task('styles', function () {
  return gulp.src("src/styles/app.scss", { sourcemaps: true })
    .pipe(bulkSass())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
});

// concatenate all .js files and uglify it
gulp.task('scripts', function () {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
});

// update style file (watch)
gulp.task('update-styles', function () {
  return gulp.src("src/styles/app.scss", { sourcemaps: true })
    .pipe(bulkSass())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.reload({ stream: true }));
});

// update script file (watch)
gulp.task('update-scripts', function () {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
});

// watch all files
gulp.task('watch', function () {
  gulp.watch(paths.scripts.src, gulp.parallel('update-scripts'));
  gulp.watch(paths.styles.src,  gulp.parallel('update-styles'));
  gulp.watch(paths.views.src).on('change', browserSync.reload);
  gulp.watch('index.html').on('change', browserSync.reload);
});

// start nodemon and browser-sync
gulp.task('start',
  gulp.series('nodemon', gulp.parallel('browser-sync', 'watch'))
);

// clean dist folder and build scripts and style files
gulp.task('default', 
  gulp.series('clean', gulp.parallel('styles', 'scripts'), 'start')
);