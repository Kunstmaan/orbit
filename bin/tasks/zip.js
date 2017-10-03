import gulp from 'gulp';
import zip from 'gulp-zip';
import fs from 'fs';
import rename from 'gulp-rename';
import htmlSrc from 'gulp-html-src';
import path from 'path';
import merge from 'merge-stream';


export default function createZipTask({src = undefined}) {
    return function createZip() {
        const extension = '.html';
        const htmlFiles = getHtmlFiles(src);

        const moveTasks = htmlFiles.map(function(file) {
            const sourcePath = path.join(src, file);
            const fileName = path.basename(sourcePath, extension);

            const moveHTML = gulp.src(sourcePath)
                .pipe(rename(function(path) {
                    path.dirname = fileName;

                    return path;
                }));

            const MoveImages = gulp.src(sourcePath)
                .pipe(htmlSrc({ selector: 'img'}))
                .pipe(rename(function(path) {
                    path.dirname = fileName + path.dirname.replace('dist', '');

                    return path;
                }));

            return merge(moveHTML, MoveImages)
                .pipe(zip(`${fileName}.zip`))
                .pipe(gulp.dest(src));
        })

        function getHtmlFiles(dir) {
            return fs.readdirSync(dir)
                .filter(function(file) {
                    const fileExt = path.join(dir, file);
                    const isHtml = path.extname(fileExt) == extension;

                    return fs.statSync(fileExt).isFile() && isHtml;
                })
        };

        return merge(moveTasks);
    };

}
