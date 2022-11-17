initialize project setting:

1) clone repository
2) open teminal
3) npm init -f
4) npm i express --save
5) npm i nodemon --save--dev

go to package.json script and write:
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "nodemon index.js",
    "start": "node index.js"}
