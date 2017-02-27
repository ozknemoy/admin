var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),

    injectPartials = require('gulp-inject-partials');

// для инжекта модулей разметки
gulp.task('tmpl-inject', function () {
    return gulp.src('./app/*.html')
        .pipe(injectPartials())
        .pipe(gulp.dest('./app'));
});

gulp.task('browser-sync', ['styles', 'scripts'], function () {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        notify: false
    });
});

gulp.task('styles', function () {
    return gulp.src('sass/*.sass')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        //.pipe(autoprefixer({browsers: ['last 15 versions'], cascade: false}))
        //.pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src([
            './app/libs/modernizr/modernizr.js',
            './app/libs/jquery/jquery-1.11.2.min.js',
            './app/libs/waypoints/waypoints.min.js',
            './app/libs/animate/animate-css.js',
        ])
        .pipe(concat('libs.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
    gulp.watch('sass/*.sass', ['styles']);
    gulp.watch('app/libs/**/*.js', ['scripts']);
    gulp.watch('app/js/*.js').on("change", browserSync.reload);
    gulp.watch('app/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);
