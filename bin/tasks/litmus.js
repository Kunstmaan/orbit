import gulp from 'gulp';
import litmus from 'gulp-litmus';

export default function createLitmusTask({litmusConfig = undefined, src = undefined, dest = undefined}) {
    return function sendToLitmus(done) {
        return gulp.src(src)
            .pipe(litmus(litmusConfig))
            .pipe(gulp.dest(dest));

        done();
    };
}
