var gulp 		= require('gulp'),
	browserSync = require('browser-sync'),
	sass 		= require('gulp-sass'),
	cleanCSS 	= require('gulp-clean-css'),
	pug 		= require('gulp-pug'),
	plumber 	= require('gulp-plumber'),
	uglify 		= require('gulp-uglify'),
	concat 		= require('gulp-concat'),
	notify 		= require('gulp-notify'),
	del 		= require('del'),
	inject 		= require('gulp-inject'),
	imagemin 		= require('gulp-imagemin'),
	mainBowerFiles = require('gulp-main-bower-files'),
	series = require('stream-series'),
	gulpFilter = require('gulp-filter'),
	reload      = browserSync.reload;

gulp.task('bower', function() {
	var filterJS = gulpFilter('**/*.js', { restore: true });
	var filterCSS = gulpFilter('**/*.css', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        // './dist/js/*.min.*',
                        './dist/css/*.min.css',
                        // './dist/fonts/*.*'
                    ]
                },
                // jquery: { main: [ './dist/*.min.*' ] },
                angular: { main: [ './*.min.js' ] },
                'angular-ui-router': { main: [ './release/*.min.js' ] }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(filterCSS)
        .pipe(concat('vendor.min.css'))
        .pipe(filterCSS.restore)
        .pipe(gulp.dest('./public/vendor'));
});

// browserSync
gulp.task('browser-sync', ['inject'], function(){
	browserSync.init(["./public/assets/css/*.css" , "./public/assets/js/*.js" , "./**/*.html"],{
		open: true,
		server: {
			baseDir: "./"
		},
		browser: 'chrome'
	});
});

gulp.task('templates',['views'], function() {

  gulp.src('./dev/pug/index.pug')
  	.pipe(notify({
			title: 'Pug',
			message: 'Todo ok con el html',
			icon: __dirname + '/gulp/pug.png'
		}))									
    .pipe(plumber({ 
		handleError: function (err) {
			console.log(err);
			this.emit('end');
		}
	}))	
	.pipe(pug({
		pretty : false 
	}))

	.pipe(gulp.dest('./'));

});

gulp.task('clean-img', function(cb) {
	return del('img',cb);
});

gulp.task('images', ['clean-img'], function() {
	gulp.src('./dev/img/*.*')
	.pipe(imagemin())
	.pipe(gulp.dest('./public/assets/img')); 
});

gulp.task('inject',['bower','templates', 'scripts', 'estilos', 'images'], function(){
	var target = gulp.src('./index.html');
	var vendor = gulp.src(['./public/vendor/**/*.js', './public/vendor/**/*.css'], {read: false});
	var app = gulp.src(['./public/assets/**/*.js', './public/assets/**/*.css'], {read: false});
	return target.pipe( inject(series(vendor, app), {relative: true})  )
	.pipe(gulp.dest('./'));
});

gulp.task('views', function() {

	gulp.src('./dev/pug/views/*.pug')											
    .pipe(plumber({ 
		handleError: function (err) {
			console.log(err);
			this.emit('end');
		}
	}))	
	.pipe(pug({
		pretty : false 
	}))	

	.pipe(gulp.dest('./public/views')); 
});

gulp.task('scripts', function(){
	gulp.src('./dev/js/*.js')
	.pipe(notify({
			title: 'Js',
			message: 'Todo ok con el JS',
			icon: __dirname + '/gulp/js.png'
		}))
	.pipe(plumber({ 
		handleError: function (err) {
			console.log(err);
			this.emit('end');
		}
	}))
	.pipe(uglify({
		mangle: false
	}))
	.pipe(concat('app.min.js'))
	.pipe(gulp.dest('./public/assets/js'));
});

gulp.task('estilos', function(){
	gulp.src('./dev/sass/estilos.scss')
		.pipe(notify({
			title: 'Sass',
			message: 'Todo ok con los estilos',
			icon: __dirname + '/gulp/sass.png'
		}))	
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('./public/assets/css')); 
});

gulp.task('copy-fonts', function(){
	gulp.src('./dev/fonts/*.*')
	.pipe(gulp.dest('./public/assets/fonts')); 
});

// Watching for changes
gulp.task('watch',['estilos', 'templates', 'scripts', 'copy-fonts', 'images', 'browser-sync'], function(){
	gulp.watch('./dev/sass/*.scss', ['estilos']);
	gulp.watch('./dev/js/*.js', ['scripts']);
	gulp.watch('./dev/pug/**/*.pug', ['inject']);
});


// Default task
 gulp.task('default', ['inject','watch'], function() {});