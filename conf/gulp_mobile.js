/*
author:guoying
endTime:3/2/2016
description:用于M版网页的工具配置，分别为开发目录和产出目录，使用自动添加版本名称。
*/

function gulp_mobile(_root) {
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var util = require('gulp-util');
var clean = require('gulp-clean');
var webpack = require('gulp-webpack');
var tinypng = require('gulp-tinypng');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var gulpSequence = require('gulp-sequence');
var webpackConfig = require('./gulp.webpack.js');


/**
 * 开发模式
 * mobile_src_sass
 * mobile_src_js
 * mobile_src_img
 * mobile_src_html
 */

/*var flow = [
	'mobile_clean_css',
	'mobile_clean_js',
	'mobile_clean_img',
	'mobile_clean_html',
	'mobile_src_sass',
	'mobile_src_js',
	'mobile_src_img',
	'mobile_src_html'
]*/

gulp.task('mobile_src', gulpSequence('mobile_clean_css', 'mobile_clean_js', 'mobile_clean_img','mobile_clean_html', 'mobile_src_sass', 'mobile_src_js','mobile_src_img','mobile_src_html'));

/*dist模式
-------------------------------------------------------------------------------------------*/
var flow = [
	'mobile_clean_css', //清理开发时产出的内容
	'mobile_clean_js',
	'mobile_clean_img',
	'mobile_clean_html',
	'mobile_clean_rev_css', //清理rev生成的文件
	'mobile_clean_rev_js',
	'mobile_dist_sass', //dist模式的编译
	'mobile_dist_rev_sass',
	'mobile_dist_js',
	'mobile_dist_rev_js',
	'mobile_dist_img_fun',
	'mobile_dist_html'
];

gulp.task('mobile_dist', gulpSequence(
	'mobile_clean_css',
	'mobile_clean_js',
	'mobile_clean_html',
	'mobile_clean_rev_css',
	'mobile_clean_rev_js',
	'mobile_dist_sass',
	'mobile_dist_rev_sass',
	'mobile_dist_js',
	'mobile_dist_rev_js',
	'mobile_dist_html'
));


/*清理目录
----------------------------------------------------------------------------------------------*/
gulp.task('mobile_clean_html', function() {
	return gulp.src([_root + '/template/mobile'])
	.pipe(clean())
});

gulp.task('mobile_clean_rev_css', function() {
	return gulp.src([_root + '/src/mobile/rev/css/pages/*.*'])
	.pipe(clean())
})

gulp.task('mobile_clean_css', function() {
	return gulp.src([_root + '/dist/mobile/css/pages/*.*'])
	.pipe(clean())
});

gulp.task('mobile_clean_rev_js', function() {
	return gulp.src([_root + '/src/mobile/rev/js/*.*'])
	.pipe(clean())
});

gulp.task('mobile_clean_js', function() {
	return gulp.src([_root + '/dist/mobile/js'])
	.pipe(clean())
});

gulp.task('mobile_clean_img', function() {
	return gulp.src([_root + '/dist/mobile/images'])
	.pipe(clean())
});

/*编译
----------------------------------------------------------------------------------------------*/

gulp.task('mobile_dist_sass', function() {
	return gulp.src([_root + '/src/mobile/styles/pages/**/*.scss'])
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest(_root + '/src/mobile/rev/css/pages'))
});

gulp.task('mobile_src_sass', function() {
	return gulp.src([_root + '/src/mobile/styles/pages/**/*.scss'])
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest(_root + '/dist/mobile/css/pages'))
});

gulp.task('mobile_dist_rev_sass', function() {
	return gulp.src([_root + '/src/mobile/rev/css/pages/*.css'])
	.pipe(rev())
	.pipe(gulp.dest(_root + '/dist/mobile/css/pages'))  // 添加hash值后产出的目录 
	.pipe(rev.manifest())
	.pipe(gulp.dest(_root + '/src/mobile/rev/css/pages')); //生成配置的JSON文件存放目录
});

gulp.task('mobile_src_js', function() {
	return gulp.src([_root + '/src/mobile/script/pages/**/*.js'])
	.pipe(webpack(webpackConfig('mobile', _root)))
	.pipe(uglify())
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest(_root + '/dist/mobile/js'))
});

gulp.task('mobile_dist_js', function() {
	return gulp.src([_root + '/src/mobile/script/pages/**/*.js'])
	.pipe(webpack(webpackConfig('mobile', _root)))
	.pipe(uglify())
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest(_root + '/src/mobile/rev/js'))
});

gulp.task('mobile_dist_rev_js',  function(){
	return gulp.src([_root + '/src/mobile/rev/js/*.js'])
	.pipe(rev())
	.pipe(gulp.dest(_root + '/dist/mobile/js'))  // 添加hash值后产出的目录
	.pipe(rev.manifest())
	.pipe(gulp.dest(_root + '/src/mobile/rev/js')); //生成配置的JSON文件存放目录
});



gulp.task('mobile_src_img', function() {
	return gulp.src([_root + '/src/mobile/images/**/*.+(png|jpg|gif)'])
    .pipe(imagemin({
		progressive  : true, //无损压缩jpg
		interlaced : true //无损压缩gif
	}))
    .pipe(gulp.dest(_root + '/dist/mobile/images/'));
});

gulp.task('mobile_dist_img_fun', function() {
	return gulp.src([_root + '/src/mobile/images/**/*.+(png|jpg|gif)'])
    //https://tinypng.com/developers 获取API_KEY
    //https://tinypng.com/developers/subscription 一个月免费500张图片
    .pipe(tinypng('KgE3myCjv_djsluRYGrOvreFVYthks_A'))
    .pipe(gulp.dest(_root + '/dist/mobile/images/'));
});

gulp.task('mobile_dist_img', gulpSequence('mobile_clean_img', 'mobile_dist_img_fun'))

gulp.task('mobile_dist_tmpl', function() {
	return gulp.src([_root + '/src/mobile/rev/**/*.json', _root + '/template/mobile/*.html', _root + '/template/mobile/**/*.html', _root + '/src/template/mobile/**/**/*.html'])
    .pipe( revCollector({
        replaceReved: true
    }))
    .pipe(gulp.dest(_root + '/template/mobile/'));
});

gulp.task('mobile_src_tmpl', function(){
	return gulp.src([_root + '/src/template/mobile/**/*.*',_root + '/src/template/mobile/*', _root + '/src/template/mobile/**/*'])
	.pipe(gulp.dest(_root + '/template/mobile/'))
});


gulp.task('mobile_src_html', gulpSequence('mobile_clean_html', 'mobile_src_tmpl'));
gulp.task('mobile_dist_html', gulpSequence('mobile_dist_tmpl'));


/*自动监听
----------------------------------------------------------------------------------------------*/
gulp.task('mobile_watch', function() {
	gulp.watch(_root + '/src/mobile/styles/**/*.js', ['mobile_src_sass']);
	gulp.watch(_root + '/src/mobile/script/**/*.js', ['mobile_src_js']);
	gulp.watch(_root + '/src/mobile/images/**/*.js', ['mobile_src_img']);
});

};
module.exports = gulp_mobile;