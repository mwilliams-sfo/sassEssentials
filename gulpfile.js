var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

gulp.task('js', function() {
  return gulp.src('builds/sassEssentials/js/myscript.js')
    .pipe(jshint('./.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
    return gulp.src('process/sass/style.scss')
      .pipe(
        sass({
          sourceMap: true,
          outputStyle: 'expanded'
        })
        .on('error', function (err) {
          console.error('Error!', err.message);
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('builds/sassEssentials/css'));
});

gulp.task('watch', function() {
  gulp.watch('builds/sassEssentials/js/**/*', gulp.series('js'));
  gulp.watch(['process/sass/**/*'], gulp.series('sass'));
});

gulp.task('webserver', function() {
    gulp.src('builds/sassEssentials/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('run', gulp.parallel('watch', 'webserver'));

gulp.task('default', gulp.series('sass', 'run'));
