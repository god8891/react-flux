/*
author:guoying
endTime:3/2/2016
description:用于app资源的工具配置，分别为开发目录和产出目录，使用自动添加版本名称。
*/

/*
author:guoying
endTime:3/2/2016
description:用于app版网页的工具配置，分别为开发目录和产出目录，暂时不使用自动添加版本名称。
*/

/**
 * app_dist_sass 编译sass
 * app_dist_js 打包js
 * app_dist_img 打包img
 * app_dist_html 产出template
 * app_watch 启动自动监听
 */
function gulp_app(_root){

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


/*清理目录
----------------------------------------------------------------------------------------------*/
//清理html目录
gulp.task('app_clean_html', function() {
	return gulp.src([_root + '/template/app/'], {read : false})
	.pipe(clean());
});



/*编译文件
----------------------------------------------------------------------------------------------*/
gulp.task('app_dist_sass', function() {
	return gulp.src([_root + '/src/app/styles/**/*.scss'])
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest(_root + '/dist/app/css/'))
});

gulp.task('app_dist_js', function() {
	return gulp.src([_root + '/src/app/script/pages/*.js'])
	.pipe(webpack(webpackConfig('app', _root)))
	.pipe(uglify())
	.pipe(rename({suffix : '.min'}))
	.pipe(gulp.dest(_root + '/dist/app/js/'))
});

gulp.task('app_dist_img', function() {
	return gulp.src([_root + '/src/app/images/**/*.+(png|jpg|gif)'])
    //https://tinypng.com/developers 获取API_KEY
    //https://tinypng.com/developers/subscription 一个月免费500张图片
    //.pipe(tinypng('KgE3myCjv_djsluRYGrOvreFVYthks_A'))
    .pipe(imagemin({
		progressive  : true, //无损压缩jpg
		interlaced : true //无损压缩gif
	}))
    .pipe(gulp.dest(_root + '/dist/app/images/'));
});

gulp.task('app_dist_tmpl', function() {
	return gulp.src([_root + '/src/template/app/**/*.*'])
	.pipe(gulp.dest(_root + '/template/app'))
});

gulp.task('app_dist_html', gulpSequence('app_clean_html', 'app_dist_tmpl'));

/*自动监听
----------------------------------------------------------------------------------------------*/
gulp.task('app_watch', function() {
	gulp.watch(_root + '/src/app/styles/**/*.js', ['app_dist_sass']);
	gulp.watch(_root + '/src/app/script/**/*.js', ['app_dist_js']);
	gulp.watch(_root + '/src/app/images/**/*.js', ['app_dist_img']);
});
}

module.exports = gulp_app;