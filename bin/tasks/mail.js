import gulp from 'gulp';
import mail from 'gulp-mail';

export default function createMailTask({src = undefined, subject = undefined,to = undefined, from = undefined, mailConfig = undefined}) {
    return function sendMail(done) {
        return gulp.src(src)
           .pipe(mail({
               subject: subject,
               to: to,
               from: from,
               smtp: mailConfig
           }));

        done();
    };
}
