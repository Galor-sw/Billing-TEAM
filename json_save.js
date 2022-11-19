const fs = require("fs");
const {stringify} = require("nodemon/lib/utils");
const json = require("./feedback.json");

// insert new feedback
const email="galor@gmail.com"; //need to get from forms
const rate = 5;
const freeText="I Love them";
const answers =
{
    recommend: "yes",
    choose_again: "yes",
    improvement: "Speed,Safety",
    customer_support: "no"
}


for  ( let i in json.users)
    {
        // find the user
        if (email == json.users[i].email)
        {
            //insert user's feedback to object
            json.users[i].freeText=freeText;
            json.users[i].rate=rate;
            json.users[i].answers=answers;
        }
    }

console.log("sjkj");
fs.writeFileSync('./bec.json', JSON.stringify(json, null, 2));


const http =require('http');
const port = 8080;



console.log(`Listening on port ${port}`);


const winston = require ("winston");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ]
});




http.createServer((req, res) => {
    res.writeHead(200);
    res.end();
}).listen(port);

const express = require('express')
const app = require("express/lib/router");

app.use(express.json())    // <==== parse request body as JSON

app.listen(8080)

app.post('/', (req, res) => {
    res.json({requestBody: req.body})  // <==== req.body will be a parsed JSON object
    console.log(req.body)
})