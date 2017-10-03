import gulp from 'gulp';
import check from 'gulp-if';
import replace from 'gulp-replace';
import inlinecss from 'gulp-inline-css';
import htmlmin from 'gulp-htmlmin';
import fs from 'fs';
import siphon from 'siphon-media-query';
import lazypipe from 'lazypipe';


export default function inlineTask({src = undefined, dest = undefined, isProduction = undefined, toInline = undefined, inlineConfig = undefined, htmlminConfig = undefined}) {
    return function inline() {
        return gulp.src(src)
            .pipe(check(isProduction, inliner(toInline, inlineConfig, htmlminConfig)))        
            .pipe(gulp.dest(dest));
    };
}

function inliner(css, inlineConfig, htmlminConfig) {
    const cssString = fs.readFileSync(css).toString();
    const mq = siphon(cssString);

    const pipe = lazypipe()
        .pipe(inlinecss, inlineConfig)
        .pipe(replace, '<!-- <style> -->', `<style>${mq}</style>`)
        .pipe(replace, '<link rel="stylesheet" type="text/css" href="css/style.css">', '')
        .pipe(htmlmin, htmlminConfig);
    
    return pipe();
}
