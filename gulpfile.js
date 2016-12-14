var gulp 		= require('gulp'),
	browserSync = require('browser-sync'),
	stylus 		= require('gulp-stylus'),
	pug 		= require('gulp-pug'),
	plumber 	= require('gulp-plumber'),
	nib 		= require('nib'),
	reload      = browserSync.reload;

// browserSync
gulp.task('browser-sync', function(){
	browserSync.init(["./public/css/*.css" , "./public/js/*.js" , "./public/**/*.html"],{
		open: true,
		server: {
			baseDir: "./public"
		}
	});
});

gulp.task('templates',['partials', 'views'], function() {

  gulp.src('./dev/pug/index.pug')											
    .pipe(plumber({ 
		handleError: function (err) {
			console.log(err);
			this.emit('end');
		}
	}))	
	.pipe(pug({
		pretty : true 
	}))	

	.pipe(gulp.dest('./public')); 

});

gulp.task('partials', function() {

	gulp.src('./dev/pug/partials/*.pug')											
    .pipe(plumber({ 
		handleError: function (err) {
			console.log(err);
			this.emit('end');
		}
	}))	
	.pipe(pug({
		pretty : true 
	}))	

	.pipe(gulp.dest('./public/partials')); 
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
		pretty : true 
	}))	

	.pipe(gulp.dest('./public/views')); 
});



gulp.task('estilos', function(){
	gulp.src('./dev/stylus/estilos.styl')
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(stylus({
			compress: true, 
			use: nib()
	    }))
		.pipe(gulp.dest('./public/css')); 
});



// Watching for changes
gulp.task('watch',['estilos', 'templates', 'browser-sync'], function(){
	gulp.watch('./dev/stylus/*.styl', ['estilos']);
	gulp.watch('./dev/pug/**/*.pug', ['templates']);
});


// Default task
 gulp.task('default', ['watch'], function() {});