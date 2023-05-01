const path = require('node:path');
const talkback = require("talkback");

function nameGenerator(tapeNumber, tape) {
    return path.join(`${tape.req.url}`, `${tape.req.method}`, `tape-${tapeNumber}`);
}

function requestDecorator(req, context) {
    // make sure headers to prevent caching are always present,
    // as automated tests always use these.
    req.headers['pragma'] = 'no-cache';
    req.headers['cache-control'] = 'no-cache';

    // remove headers that are not needed for testing, and may be different from browser to browser/automation engine
    const headersToRemove = [
        'user-agent',
        'connection',
        'sec-ch-ua',
        'sec-ch-ua-mobile',
        'sec-ch-ua-platform',
        'sec-fetch-site',
        'sec-fetch-mode',
        'sec-fetch-dest',
        'accept-language',
    ];
    headersToRemove.forEach(header => {delete req.headers[header]});
    return req;
}


const opts = {
    host: "http://localhost:8001",
    record: talkback.Options.RecordMode.NEW,
    port: 8000,
    path: "./tapes",
    tapeNameGenerator: nameGenerator,
    requestDecorator: requestDecorator,
}

const server = talkback(opts);
server.start(() => console.log("Talkback started"));
