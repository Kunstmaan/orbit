import gulp from 'gulp';
import imagemin from 'gulp-imagemin';

export default function imagesTask({src = undefined, dest = undefined}) {
    return function images() {
        return gulp.src(src)
            .pipe(imagemin())
            .pipe(gulp.dest(dest));
    };
}
