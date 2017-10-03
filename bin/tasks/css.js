import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import check from 'gulp-if';

export default function createCssTask({src = undefined, dest = undefined, isProduction = undefined}) {
    return function css() {        
        return gulp.src(src)
            .pipe(check(!isProduction, sourcemaps.init()))
            .pipe(sass().on('error', sassErrorHandler))
            .pipe(check(!isProduction, sourcemaps.write()))
            .pipe(gulp.dest(dest));
    }
}

function sassErrorHandler(error) {
    console.log(`Sass Error:\n${error.messageFormatted}`);
    notifier.notify({
        title: 'Sass',
        message: `Error in ${error.relativePath} at L${error.line}:C${error.column}`
    });
    this.emit('end');
}
