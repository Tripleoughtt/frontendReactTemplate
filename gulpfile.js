var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var gulp_jspm = require('gulp-jspm');
var addsrc = require('gulp-add-src');
var rimraf = require('rimraf');

gulp.task('serve', function(cb){  
  browserSync.init({
    server: "./"
  })

  gulp.watch('./styles/**/*').on('change', browserSync.reload)
  gulp.watch('./**/*.html').on('change', browserSync.reload)
  gulp.watch('./build/main.bundle.js').on('change', browserSync.reload)
});

gulp.task('jspm-build', function(cb){
  return gulp.src('lib/main.js')
    .pipe(gulp_jspm({selfExecutingBundle : true}))
    .pipe(gulp.dest('build/', cb))
});

gulp.task('clean', function(cb){
  rimraf('/build', cb)
});

gulp.task('watch', function() {
  gulp.watch('lib/**/*', ['clean','jspm-build', 'serve'])
});

gulp.task('default', ['clean', 'jspm-build', 'serve','watch'])
