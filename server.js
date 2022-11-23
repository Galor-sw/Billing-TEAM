const http =require('http');
const port = 8080;
const fs = require('fs');
const url = require('url');
const path = require('path');
const json =require('./saveFeedback/json_save.js');

//create server
const server = http.createServer(  (req,res) => {
        let body = '';
        let pathname = url.parse(req.url).pathname;
        let ext = path.extname(pathname);

        // for css,js files
        if (ext)
        {
                if (ext === '.css'){
                        res.writeHead(200, {'Content-Type': 'text/css'});
                }
                else if(ext === '.js'){
                        res.writeHead(200, {'Content-Type': 'text/javascript'});
                }
                let file = fs.createReadStream(__dirname + pathname);
                file.pipe(res);

        }
        // for html files
        else
        {
                res.writeHead(200, {'Content-Type': 'text/html'});
                let file = fs.createReadStream('./loginAndForm/log_in_form.html');
                file.pipe(res);
        }

        req.on('data', (chunk) => {
                body+=chunk.toString();
        });
        req.on('end',()=>
        {
                console.log(req.method);
                console.log(pathname);
                if(pathname== "/" && req.method=="POST") {
                         if (!json.isExists(body)) {
                                res.end("The email not exists, try again");
                        }
                        else
                        {
                                res.end("The email exist");
                        }
                }
                if(pathname== "/emailCheck" && req.method=="POST") {
                        let feedBack = json.isHaveFeedBack(body);
                        if (feedBack != '') {
                                res.end(JSON.stringify(feedBack));
                        } else {
                                res.end("This user didnt give feedback already");
                        }
                }
                if(pathname== "/sendJson" && req.method=="POST") {
                        if(json.writeFeedBack(JSON.parse(body)))
                                res.end("The feedback was added");
                        else
                                res.end("The feedback wasnt added");

                }

        });

});
const start = () => server.listen(port, () => console.log(`listening on port ${port}`));

module.exports.createServer = http.createServer;
module.exports.start = start;
