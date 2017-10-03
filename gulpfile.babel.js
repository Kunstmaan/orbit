import gulp from 'gulp';

import {
    clean,
    twig,
    css,
    images,
    inline,
    server,
    buildOnChange,
    zip,
    ftp,
    litmus,
    mail
} from './bin/configured-tasks';

const build = gulp.series(
    clean,
    twig,
    css,
    images
)

const startLocal = gulp.series(
    build,
    server,
    buildOnChange
)

const buildOptimized = gulp.series(
    build,
    inline
)

const createPackage = gulp.series(
    buildOptimized,
    zip
)

const test = gulp.series(
    buildOptimized,
    ftp,
    litmus
)

const sendMail = gulp.series(
    buildOptimized,
    ftp,    
    mail
)

export {startLocal, buildOptimized, createPackage, test, sendMail};
