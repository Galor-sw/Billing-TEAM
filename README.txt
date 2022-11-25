initialize project setting:

1) clone repository - https://github.com/Galor-sw/Billing-TEAM.git
2) open terminal
3) npm init -f
5) npm i nodemon --save--dev
7) npm i google-spreadsheet --save
8) npm i socket.io
9) npm i moment


go to package.json script and write:
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "nodemon index.js",
    "start": "node index.js"}

create json file : credentials.json, ask gal or to send you the details - its included password, so it cant be uploaded to the git

how to handle git:
1) create new branch with your own branch name
2) after the change push + commit your branch to the git
3) update gal or so he can merge your branch
4) check out back to remote/main
5) after main checkout -> right click on remote/main, -> pull into 'main' using merge



google sheets email address API - billing-sheets@student-billing-team.iam.gserviceaccount.com