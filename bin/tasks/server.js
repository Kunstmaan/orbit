import browser from 'browser-sync';

export default function createServerTask({serverName = 'server', config = undefined}) {
    return function server(done) {
        browser.init(config, done);
    };
}
