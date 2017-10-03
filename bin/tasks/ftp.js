import gulp from 'gulp';
import ftp from 'vinyl-ftp';

export default function createDeployImagesTask({src = undefined, serverConfig = undefined, dest = undefined}) {
    return function deployImages() {
        const connect = ftp.create(serverConfig);
        const globs = [
            'img/**'
        ]

        return gulp.src(globs, { cwd: src, buffer: false})
            .pipe(connect.newer(dest))
            .pipe(connect.dest(dest));
    };
}
