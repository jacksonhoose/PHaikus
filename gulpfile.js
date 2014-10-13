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
		'assets/js/app.js'
	])
	.pipe(concat('app.min.js'))
	.pipe(uglify())
	.on('error', handleError)
	.pipe(gulp.dest('assets/js'));
});

gulp.task('lint', function() {
    gulp.src('assets/js/app.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('image', function() {
	gulp.src('assets/img/src/*')
	.pipe(image())
	.on('error', handleError)
	.pipe(gulp.dest('assets/img/dest'));
});

gulp.task('compass', function() {
	gulp.src([
		'assets/scss/app.scss'
	])
	.pipe(compass({
		css: 'assets/css',
		sass: 'assets/scss',
		image: 'assets/img/dist',
		require: ['breakpoint']
	}))
	.on('error', handleError)
	.pipe(minifyCSS())
	.pipe(gulp.dest('assets/css'));
});

gulp.task('watch', function() {
	gulp.watch('assets/img/src/*', ['image']);
	gulp.watch('assets/scss/**/*.scss', ['compass']);
	gulp.watch('assets/js/**/*.js', ['lint', 'javascript']);
});

gulp.task('default', ['compass', 'image', 'lint', 'javascript', 'watch']);