import gulp from 'gulp';
import gulptwig from 'gulp-twig';
import inky from 'inky';
import yaml from 'js-yaml';
import fs from 'fs';
import rename from 'gulp-rename';
import path from 'path';
import {get} from 'lodash';

export default function createTwigTask({src = undefined, dest = undefined, transPath = undefined, buildSpecific = undefined, toTest = undefined, ftpPath = undefined}) {
    return function twig(done) {
        let translations = getTranslations(transPath);
        const overViewPageSrc = src[0];
        const mailsSrc = src[1];

        if (buildSpecific) {
            if (translations.indexOf(buildSpecific) > -1) {
                buildTemplate(mailsSrc, dest, `${transPath}${buildSpecific}.yaml`, buildSpecific, toTest, ftpPath);
            } else {
                console.log(`No translations found for: ${buildSpecific}`);
            }
        } else {
            for (let lang of translations) {
                buildTemplate(mailsSrc, dest, `${transPath}${lang}.yaml`, lang, toTest, ftpPath);
            }
        }

        buildOverview(overViewPageSrc, dest); //@todo: refactor this

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

function buildTemplate(mails, dest, langFile, lang, hostImages, ftpPath) {
    const doc = yaml.safeLoad(fs.readFileSync(langFile, 'utf8'));
    const baseImagePath = `img/${lang}/`;

    return gulp.src(mails)
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
            basename: 'mail',
            suffix: `-${lang}`,
            extname: '.html'
        }))
        .pipe(inky())
        .pipe(gulp.dest(dest));
}

function buildOverview(src, dest) {
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
        .pipe(gulp.dest(dest));
}
