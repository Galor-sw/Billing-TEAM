const {GoogleSpreadsheet} = require('google-spreadsheet');
const fs = require('fs'); //for reading credentials

GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID
let rowAddFormat = {
    email: "",
    free_text: "",
    rate: "",
    recommend: "",
    choose_again: "",
    improvement: "",
    customer_support: "",
    age: "",
    gender: "",
    occupation: ""
};

const rowToSheetFormat = (row) => {
    rowAddFormat.email = row.email;
    rowAddFormat.free_text = row.free_text;
    rowAddFormat.rate = row.rate;
    rowAddFormat.recommend = row.answers.recommend;
    rowAddFormat.choose_again = row.answers.choose_again;
    rowAddFormat.improvement = row.answers.improvement;
    rowAddFormat.customer_support = row.answers.customer_support;
    rowAddFormat.age = row.metaData.age;
    rowAddFormat.gender = row.metaData.gender;
    rowAddFormat.occupation = row.metaData.occupation;
}


const RESPONSES_SHEET_ID = GOOGLE_SHEET_ID;

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

const deleteRow = async (mail) => {
    await doc.useServiceAccountAuth({
        client_email: CREDENTIALS.client_email,
        private_key: CREDENTIALS.private_key
    });

    await doc.loadInfo();
    let sheet = doc.sheetsByIndex[0];

    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length; index++) {
        const rowIndex = rows[index];
        if (mail === rowIndex.email) {
            await rows[index].delete();
            return 'success';
        }
    }
    return 'failed';
}

module.exports = {getRow, addRow, deleteRow};