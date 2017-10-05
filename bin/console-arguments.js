import yargs from 'yargs';

const argv = yargs.argv;

export const ARGUMENTS = {
    PRODUCTION: !!(argv.production),
    LANG: argv.lang,
    TEST: argv.test
}

console.log(ARGUMENTS);
