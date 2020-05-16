const gulp = require("gulp");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();




gulp.task('sass' , ()=>{
    return gulp
        .src('./dev/scss/style.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'compact'
        }))
        .pipe(autoprefixer({
            browsers:['last 3 versions']
        }))
        .pipe(gulp.dest('./public/css'))
        
})

gulp.task('pug',()=>{
    return gulp
        .src('./dev/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
})

gulp.task('babel',()=>{
    return gulp
        .src('./dev/js/*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('scripts-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
})

gulp.task('default', ()=>{
    browserSync.init({
        server: './public' 
    })

    gulp.watch('./dev/scss/style.scss',gulp.series('sass')).on('change',browserSync.reload)
    gulp.watch('./dev/pug/index.pug',gulp.series('pug')).on('change',browserSync.reload)
    gulp.watch('./dev/js/*.js',gulp.series('babel')).on('change',browserSync.reload)

})





