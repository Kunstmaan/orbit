import gulp from 'gulp';
import gulptwig from 'gulp-twig';
import inky from 'inky';
import yaml from 'js-yaml';
import fs from 'fs';
import rename from 'gulp-rename';
import yargs from 'yargs';
import path from 'path';
import {get} from 'lodash';

export default function createTwigTask({src = undefined, dest = undefined, transPath = undefined, buildSpecific = undefined, toTest = undefined, ftpPath = undefined}) {
    return function twig(done) {
        let translations = getTranslations(transPath);

        if (buildSpecific) {
            if (translations.indexOf(buildSpecific) > -1) {
                buildTemplate(src, dest, `${transPath}${buildSpecific}.yaml`, lang, toTest, ftpPath);
            } else {
                console.log(`No translations found for: ${buildSpecific}`);
            }
        } else {
            for (let lang of translations) {
                buildTemplate(src, dest, `${transPath}${lang}.yaml`, lang, toTest, ftpPath);
            }
        }

        done();
    };
}

function getTranslations(srcpath) {
    let translations = [];

    fs.readdirSync(srcpath).filter(function(file) {
        translations.push(path.basename(file, '.yaml'));
    });

    return translations;
}

function buildTemplate(src, dest, langFile, lang, hostImages, ftpPath) {
    const doc = yaml.safeLoad(fs.readFileSync(langFile, 'utf8'));
    const baseImagePath = `img/${lang}/`;

    return gulp.src(src)
        .pipe(gulptwig({
            filters: [
                {
                    name: "trans",
                    func: function(value) {
                        return get(doc, value, value);
                    }
                }
            ],
            functions: [
                {
                    name: "asset",
                    func: function (value) {
                        if (hostImages) {
                            return `${ftpPath}/${lang}/${value}`;
                        } else {
                            return `${baseImagePath}/${value}`;
                        }
                        
                    }
                }
            ]
        }))
        .pipe(rename({
            suffix: `-${lang}`,
            extname: '.html'
        }))
        .pipe(inky())
        .pipe(gulp.dest(dest));
}
