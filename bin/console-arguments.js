import yargs from 'yargs';
import chalk from 'chalk';

const argv = yargs.argv;

export const ARGUMENTS = {
    PRODUCTION: !!(argv.production),
    EMAIL: argv.to,
    LANG: argv.lang,
    TEST: argv.test
}

console.log(ARGUMENTS);


