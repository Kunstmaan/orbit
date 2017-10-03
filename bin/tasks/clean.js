import rimraf from 'rimraf';

export default function createCleanTask({target = undefined}) {
    return function clean(done) {
        return rimraf(target, done);
    };
}
