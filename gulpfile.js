var gulp       	 = require('gulp');
var sass       	 = require('gulp-sass');
var browserSync 	 = require('browser-sync').create();
var autoprefixer 	 = require('gulp-autoprefixer');
var plumber 		 = require('gulp-plumber');

gulp.task('browser-sync', function(done) {
    browserSync.init({
        server: {
            baseDir: './app'
        },
        notify: false
    });

    browserSync.watch('app/').on('change', browserSync.reload);

    done()
});

gulp.task('sass', function(done){
    gulp.src('app/sass/*.scss')
        .pipe(plumber({
            errorHandler : function(err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass({errLogToConsole: true}))
        .pipe(sass({appputStyle: 'compact'}))
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));

    done()
});

gulp.task('watch', gulp.series('sass', 'browser-sync', function(done) {
    gulp.watch('app/sass/*.*', gulp.series('sass'));
    gulp.watch('app/index.html');
    done()
}));
