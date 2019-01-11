var gulp = require('gulp');
var sass = require('gulp-sass');
var server = require('gulp-server-livereload');

gulp.task('sass', function () {
    return gulp.src('./src/style/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
});

gulp.task('watch:scss', function () {
    gulp.watch('./src/style/*.scss', ['sass']);
});

gulp.task('webserver', ['sass'], function () {
    gulp.src('./src')
        .pipe(server({
            livereload: true,
            open: true,
        }));
});

gulp.task('default', ['watch:scss', 'webserver']);
