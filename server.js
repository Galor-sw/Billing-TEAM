// const port = 8080; // AND FROM ENV FILE!!!!!!!!!!!!!!!
// const fs = require('fs');


//
//
// const server = http.createServer((req, res) => {
//     let body = '';
//     let pathname = url.parse(req.url).pathname;
//     let ext = path.extname(pathname);
//     // for css,js files
//     if (ext) {
//         if (ext === '.css') {
//             res.writeHead(200, {'Content-Type': 'text/css'});
//         } else if (ext === '.js') {
//             res.writeHead(200, {'Content-Type': 'text/javascript'});
//         }
//         let file = fs.createReadStream(__dirname + pathname);
//         file.pipe(res);
//
//     }
//     // for html files
//     else if (pathname == "/") {
//         serLogger.info("New connection to feedback form established");
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         let file = fs.createReadStream('./loginAndForm/log_in_form.html');
//         file.pipe(res);
//     }
//
//     req.on('data', (chunk) => {
//         body += chunk.toString();
//     });
//
//     req.on('end', () => {
//         if (pathname == "/emailCheck" && req.method == "POST") {
//             if (!json.isExists(body)) {
//                 res.end("The email does not exist, try again");
//             } else {
//                 res.end("The email exists");
//             }
//         } else  else
//             if (pathname == "/contactSupport/" && req.method == "GET") {
//
//             if (chatServerFlag == false) {
//                 chatServer.turnOnServerChat();
//                 chatServerFlag = true;
//             }
//             let queryObject = url.parse(req.url, true).query;
//             let name = queryObject.mail.split('@')[0];
//             res.end("http://localhost:3000?username=" + name);
//
//         } else {
//             if (!pathname == "/") {
//                 res.writeHeader(404);
//                 res.write('Bad request');
//                 res.end();
//             }
//         }
//     });
// });
//
// const start = () => server.listen(port, () => serLogger.info(`Feedback server listening on port ${port}`));
// module.exports = server;
// module.exports.start = start
