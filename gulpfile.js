var gulp = require('gulp'), 
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	image = require('gulp-image'),
	compass = require('gulp-compass'),
	minifyCSS = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	nodemon = require('gulp-nodemon');


var path = {
	bower: 'assets/components',
	js: 'assets/js',
	scss: 'assets/scss',
	css: 'assets/css',
	img: {
		dest: 'assets/img/dest',
		src: 'assets/img/src'
	}
};

var handleError = function(err) {
	console.log(err.toString());
	this.emit('end');
};

gulp.task('develop', function() {
	nodemon({
		script: 'app.js',
		nodeArgs: ['--harmony']
	});
});

gulp.task('javascript', function() {
	gulp.src([
		path.bower + '/jquery/dist/jquery.js',
		path.bower + '/angular/angular.js',
		path.bower + '/angular-loading-bar/buid/loading-bar.js',
		path.bower + '/angular-ui-router/release/angular-ui-router.js',
		path.js + '/app.js'
	])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.on('error', handleError)
	.pipe(gulp.dest(path.js));
});

gulp.task('lint', function() {
    gulp.src(path.js + '/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('image', function() {
	gulp.src(path.img.src + '*')
	.pipe(image())
	.on('error', handleError)
	.pipe(gulp.dest(path.img.dest));
});

gulp.task('compass', function() {
	gulp.src([
		'assets/scss/app.scss'
	])
	.pipe(compass({
		css: path.css,
		sass: path.scss,
		image: path.img.dest,
		require: ['breakpoint']
	}))
	.on('error', handleError)
	.pipe(minifyCSS())
	.pipe(gulp.dest(path.css));
});

gulp.task('watch', function() {
	gulp.watch(path.img.src + '*', ['image']);
	gulp.watch(path.scss + '**/*.scss', ['compass']);
	gulp.watch(path.js + '**/*.js', ['lint', 'javascript']);
});

gulp.task('default', ['compass', 'image', 'lint', 'javascript', 'watch']);