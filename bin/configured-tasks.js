import gulp from 'gulp';
import gutil from 'gulp-util';

import {ARGUMENTS} from './console-arguments';
import fs from 'fs';

import createCleanTask from './tasks/clean';
import createTwigTask from './tasks/twig';
import createCssTask from './tasks/css';
import createImagesTask from './tasks/images';
import createInlineTask from './tasks/inline';
import createServerTask from './tasks/server';
import createZipTask from './tasks/zip';
import createDeployImagesTask from './tasks/ftp';
import createLitmusTask from './tasks/litmus';
import createMailTask from './tasks/mail';

const projectConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

export const clean = createCleanTask({target: './dist/'});

export const twig = createTwigTask({
    src: ['./src/views/index.twig', './src/views/mail/*.twig'],
    dest: './dist/',
    transPath: './src/translations/',
    buildSpecific: ARGUMENTS.LANG,
    toTest: ARGUMENTS.TEST,
    ftpPath: projectConfig.ftp.baseUrl
});

export const css = createCssTask({
    src: './src/scss/*.scss',
    dest: './dist/css/',
    isProduction: ARGUMENTS.PRODUCTION
});

export const images = createImagesTask({
    src: ['./src/img/**/*'],
    dest: './dist/img/'
});

export const inline = createInlineTask({
    src: './dist/*.html',
    dest: './dist',
    isProduction: ARGUMENTS.PRODUCTION,
    toInline: './dist/css/style.css',
    inlineConfig : {
        applyStyleTags: false,
        removeStyleTags: true,
        preserveMediaQueries: true,
        removeLinkTags: false
    },
    htmlminConfig: {
        collapseWhitespace: false,
        minifyCSS: true
    }
});

export const server = createServerTask({
    config: {
        server: {
            baseDir: './dist/'
        },
        files: [
            './dist/*.html',
            './dist/css/*.css',
            './dist/img/**/*'
        ]
    }
});

export const zip = createZipTask({src: './dist/'});

export const ftp = createDeployImagesTask({
    src: './dist/',
    serverConfig: {
        host: projectConfig.ftp.host,
        user: projectConfig.ftp.user,
        password: projectConfig.ftp.pass,
        parallel: 10,
        log: gutil.log
    },
    dest: projectConfig.ftp.dest
});

export const litmus = createLitmusTask({
    src: './dist/*.html',
    litmusConfig: {
        username: projectConfig.litmus.username,
        password: projectConfig.litmus.password,
        url: projectConfig.litmus.url,
        applications: projectConfig.litmus.applications
    },
    dest: './dist'
});

export const mail = createMailTask({
    src: './dist/*.html',
    subject: 'test',
    to: projectConfig.mail.to,
    from: projectConfig.mail.from,
    mailConfig: projectConfig.mail.smtp
})

export function buildOnChange() {
    gulp.watch('./src/scss/**/*.scss', css, inline);
    gulp.watch('./src/views/**/*.twig', twig, inline);
};
