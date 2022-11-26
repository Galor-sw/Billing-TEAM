const {GoogleSpreadsheet} = require('google-spreadsheet');
const fs = require('fs'); //for reading credentials
let rowAddFormat = {
    email: "",
    free_text: "",
    rate: "",
    recommend: "",
    choose_again: "",
    improvement: "",
    customer_support: ""
};

function rowToSheetFormat(row) {
    rowAddFormat.email = row.email;
    rowAddFormat.free_text = row.free_text;
    rowAddFormat.rate = row.rate;
    rowAddFormat.recommend = row.answers.recommend;
    rowAddFormat.choose_again = row.answers.choose_again;
    rowAddFormat.improvement = row.answers.improvement;
    rowAddFormat.customer_support = row.answers.customer_support;
};


const RESPONSES_SHEET_ID = '1Ktk1cyaazh-jz1KpSgM03_Ldi8ta9Qlq774YVKsjL6M';

const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);

// Credentials for the service account
const CREDENTIALS = JSON.parse(fs.readFileSync('credentials.json'));


//this function can provide data by any parameter, in its null it will provide the whole table
const getRow = async (anyParam) => {
    //use service account creds
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    //load the documents info
    await doc.loadInfo();

    //Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    //get all the rows
    let rows = await sheet.getRows();


    for (let index = 0; index < rows.length; index++) {
        const row = rows[index];
        console.log(row[anyParam]);
    }
};

const addRow = async (row) => {
    //use service account creds
    rowToSheetFormat(row);
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();
    let sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const rowIndex = rows[index];
        if (row.email === rowIndex.email) {
            await rows[index].delete();
            break;
        }
    }
    await sheet.addRow(rowAddFormat);

};


module.exports = {getRow, addRow};