const http = require('http');
const port = 8080;
const fs = require('fs');
const url = require('url');
const path = require('path');
const json = require('./saveFeedback/json_save.js');
const {addRow} = require("./googleSheets/googleSheets");
const logger = require(`./logger.js`);
const chatServer = require('./LiveChat/server');

let serLogger = logger.log;
let chatServerFlag = false;

//create server
const server = http.createServer((req, res) => {
    let body = '';
    let pathname = url.parse(req.url).pathname;
    let ext = path.extname(pathname);
    // for css,js files
    if (ext) {
        if (ext === '.css') {
            res.writeHead(200, {'Content-Type': 'text/css'});
        } else if (ext === '.js') {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
        }
        let file = fs.createReadStream(__dirname + pathname);
        file.pipe(res);

    }
    // for html files
    else if (pathname == "/") {
        serLogger.info("New connection to feedback form established");
        res.writeHead(200, {'Content-Type': 'text/html'});
        let file = fs.createReadStream('./loginAndForm/log_in_form.html');
        file.pipe(res);
    }

    req.on('data', (chunk) => {
        body += chunk.toString();
    });

    req.on('end', () => {
        if (pathname == "/emailCheck" && req.method == "POST") {
            if (!json.isExists(body)) {
                res.end("The email does not exist, try again");
            } else {
                res.end("The email exists");
            }
        } else if (pathname.startsWith("/users/") && pathname.endsWith("/feedback") && (req.method === "POST" || req.method === "PUT")) {
            let feedback = JSON.parse(body);

            if (json.writeFeedBack(JSON.parse(body)) === 'success') {
                addRow(feedback).then(r => (serLogger.info('Row added to google sheet successfully')));
                res.end("The feedback was added");
            } else {
                res.end("The feedback wasn't added");
            }


        } else if (pathname == "/users/" && req.method == "GET") {
            let queryObject = url.parse(req.url, true).query;
            let feedBack = json.isHaveFeedBack(queryObject.mail);
            if (feedBack != '') {
                res.end(JSON.stringify(feedBack));
            } else {
                res.end("The user hasn't given a feedback yet");
            }
        } else if (pathname == "/contactSupport/" && req.method == "GET") {

            if (chatServerFlag == false) {
                chatServer.turnOnServerChat();
                chatServerFlag = true;
            }
            let queryObject = url.parse(req.url, true).query;
            let name = queryObject.mail.split('@')[0];
            res.end("http://localhost:3000?username=" + name);
            
        } else {
            if (!pathname == "/") {
                res.writeHeader(404);
                res.write('Bad request');
                res.end();
            }
        }
    });
});

const start = () => server.listen(port, () => serLogger.info(`Feedback server listening on port ${port}`));

module.exports.createServer = http.createServer;
module.exports.start = start;
