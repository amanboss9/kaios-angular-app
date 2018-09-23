var gulp = require('gulp');

var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var ngAnnotate = require('gulp-ng-annotate');
var clean = require('gulp-rimraf');
var minify = require('gulp-minify');
var babel = require('gulp-babel');
var gutil = require('gulp-util');
var gulpNgConfig = require('gulp-ng-config');

var javascriptObfuscator = require('gulp-javascript-obfuscator');
var buildType;

/*
 * combine and compile SASS files into CSS and combine 
 * into a single file, optimized for production
 */

gulp.task('clean', [], function() {
    console.log("Clean all files in dist folder");
    return gulp.src(["./dist/*", "./js/app/Constants.js"], { read: false }).pipe(clean());
});

gulp.task('constant', function() {
    buildType = gutil.env.env;
    console.log("build type in angular constant file: ", buildType);
    var environment = 'env.' + buildType;
    console.log(environment);
    gulp.src('./data/Constants.json')
        .pipe(gulpNgConfig('appConstants', {
            environment: environment,
            wrap: true,
            pretty:true
        }))
        .pipe(gulp.dest('./js/app/'))
});

var sass_files = [
    './css/app.css',
    './css/toastr.css'
]

gulp.task('sass', function() {
    console.log("Compiling SAAS/CSS...");
    gulp.src(sass_files)
        .pipe(concat("app.min.css"))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist'));
});

/* 
 * Combine all js files into single minified file 
 * optimized for production 
 */

var js_files = [
    './js/app/app.js',
    './js/app/Constants.js',
    './js/app/event-manager.js',
    './components/**/*.js', // include all pages
    './services/*.js' // include all services 
];


var node_files = [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/naviboard/dist/naviboard.min.js'
];


gulp.task('scripts', function() {

    console.log("Gulping JS...");

    gulp.src(js_files)
        .pipe(concat("app.min.js"))
        .pipe(stripDebug())
        .pipe(ngAnnotate())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(minify())
        .pipe(javascriptObfuscator())
        .pipe(gulp.dest("./dist/"));

    /*node_js files for libraries*/

    console.log("Gulping Libs...");

    gulp.src(node_files)
        .pipe(concat("node_modules.lib.js"))
        .pipe(stripDebug())
        // .pipe(uglify())
        .pipe(uglify().on('error', function(e) {
            console.log(e);
        }))
        .pipe(gulp.dest("./dist/"));
});


/* 
 * Combine all Angular files into single minified file to reduce HTTP requests
 */

var ng_files = [
    './node_modules/angular/angular.min.js',
    './node_modules/angular-route/angular-route.min.js'
];

gulp.task('angular', function() {

    console.log("Combining Angular files...");

    gulp.src(ng_files)
        .pipe(concat("lib.min.js"))
        .pipe(stripDebug())
        // .pipe(uglify())
        .pipe(uglify().on('error', function(e) {
            console.log(e);
        }))
        .pipe(gulp.dest("./lib/"));
});


var bundle_files = [
    './lib/lib.min.js',
    './dist/node_modules.lib.js',
    './js/toastr.min.js',
    './dist/app.min.js'
]

gulp.task('bundledJS', function() {
    console.log("Bundling all script files!")
    gulp.src(bundle_files)
        .pipe(concat('bundle.js'))
        // .pipe(stripDebug())
        .pipe(gulp.dest('./dist/'))
});


gulp.task('copy', function() {

    buildType = gutil.env.env;
    console.log("starting copying files-----");
    gulp.src(['./components/**/*.html'])
        .pipe(gulp.dest('./dist/components/'))
    gulp.src(['./assets/**/*.{png,PNG,JPEG,jpeg,jpg}', './assets/*.gif'])
        .pipe(gulp.dest('./dist/assets/'))
    gulp.src(['./data/*.json'])
        .pipe(gulp.dest('./dist/data/'))
    gulp.src(['./css/*.css'])
        .pipe(gulp.dest('./dist/css/'))
    gulp.src('./js/index.html')
        .pipe(gulp.dest('./dist/'))
    gulp.src(['./manifest.webapp'])
        .pipe(gulp.dest('./dist/'))
});


var used_files = [
    './dist/lib.min.js',
    './dist/node_modules.lib.js',
    './dist/app.min.js',
    './dist/app.min-min.js'
]

gulp.task('cleanBundleJS', function() {
    console.log("Clean all files used by bundle JS");
    return gulp.src(used_files, { read: false }).pipe(clean());
});

//Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('components/**/*.js', ['scripts']);
    gulp.watch('services/*.js', ['scripts']);
    gulp.watch('css/*.css', ['sass']);
    gulp.watch('components/**/*.css', ['sass']);
});