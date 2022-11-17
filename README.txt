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


how to handle git:
1) create new branch with your own branch name
2) after the change push + commit your branch to the git
3) update gal or so he can merge your branch
4) check out back to remote/main
5) after main checkout -> right click on remote/main, -> pull into 'main' using merge
