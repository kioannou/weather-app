var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    replace = require("gulp-html-replace"),
    concatCss = require('gulp-concat-css'),
    browserSync = require('browser-sync'),
    rename = require("gulp-rename"),
    cache = require('gulp-cache'),
    gutil = require('gulp-util'),
    del = require('del');

//Cleaning
gulp.task('clean', function () {
    return del.sync(['public/js/*.js', 'public/css/*.css']);
});

//Server
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: 'public',
            open: true,
            notify: false,
            logLevel: "silent"
        }
    })
}).on('error', gutil.log);

gulp.task('serve-debug', ['serve', 'watch']).on('error', gutil.log);

//Building javascript
gulp.task("js-debug", function () {
    return gulp.src('app/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: true
        })).on('error', gutil.log)
        .pipe(gulp.dest('public/js/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});
gulp.task("js", function () {
    return gulp.src('app/js/app.js')
        .pipe(browserify({
            insertGlobals: true,
            debug: false
        })).on('error', gutil.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/js/'));
});

//Building css
gulp.task('bootstrap', function () {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('app/css/'));
});

gulp.task('ngDialog', function () {
    return gulp.src('node_modules/ng-dialog/css/ngDialog.min.css')
        .pipe(gulp.dest('app/css/'));
});

gulp.task('ngDialog-theme-default', function () {
    return gulp.src('node_modules/ng-dialog/css/ngDialog-theme-default.min.css')
        .pipe(gulp.dest('app/css/'));
});

gulp.task('css-debug', ["bootstrap", 'ngDialog', 'ngDialog-theme-default'], function () {
    return gulp.src('app/css/*.css')
        .pipe(concatCss("css/app.css"))
        .on('error', gutil.log)
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

gulp.task('css', ["bootstrap", 'ngDialog', 'ngDialog-theme-default'], function () {
    return gulp.src('app/css/*.css')
        .pipe(cssmin())
        .on('error', gutil.log)
        .pipe(concatCss("css/app.css"))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

//Building html
gulp.task("partials", function () {
    return gulp.src('app/views/*.html')
        .pipe(gulp.dest('public/views/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('public/')).on('error', gutil.log)
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

gulp.task('html-imports-debug', function () {
    return gulp.src('app/index.html')
        .pipe(replace({
            link: {
                src: "css/app.css",
                tpl: '<link rel="stylesheet" href="%s" type="text/css">'
            }
        }, {
            keepUnassigned: true,
            keepBlockTags: true,
            resolvePaths: false
        })).on('error', gutil.log)
        .pipe(replace({
            script: {
                src: "js/app.js",
                tpl: '<script src="%s" type="text/javascript" rel="script"></script>'
            }
        }, {
            keepUnassigned: true,
            keepBlockTags: true,
            resolvePaths: false
        })).on('error', gutil.log)
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

gulp.task('html-imports', function () {
    return gulp.src('app/index.html')
        .pipe(replace({
            link: {
                src: "css/app.min.css",
                tpl: '<link rel="stylesheet" href="%s" type="text/css">'
            }
        }, {
            keepUnassigned: true,
            keepBlockTags: true,
            resolvePaths: false
        })).on('error', gutil.log)
        .pipe(replace({
            script: {
                src: "js/app.min.js",
                tpl: '<script src="%s" type="text/javascript" rel="script"></script>'
            }
        }, {
            keepUnassigned: true,
            keepBlockTags: true,
            resolvePaths: false
        })).on('error', gutil.log)
        .pipe(gulp.dest('public/'))
        .pipe(browserSync.reload({ // Reloading with Browser Sync
            stream: true
        }));
});

//Watch
gulp.task('watch', function () {
    gulp.watch("app/index.html", ['html', 'html-imports-debug']);
    gulp.watch('app/js/*.js', ['js-debug']);
    gulp.watch('app/js/**/*.js', ['js-debug']);
    gulp.watch('app/partials/*.html', ['partials']);
    gulp.watch('app/css/*.css', ['css-debug']);
});

//Tasks
gulp.task('default', [
    'clean',
    'js',
    "css",
    "partials",
    "html",
    "html-imports"]).on('error', gutil.log);

gulp.task('debug', [
    'clean',
    'js-debug',
    "css-debug",
    "partials",
    "html",
    "html-imports-debug"]).on('error', gutil.log);

