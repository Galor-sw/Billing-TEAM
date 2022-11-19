const { GoogleSpreadsheet }= require('google-spreadsheet');
const fs = require('fs');

const RESPONSES_SHEET_ID = '1Ktk1cyaazh-jz1KpSgM03_Ldi8ta9Qlq774YVKsjL6M';

const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);


const CREDENTIALS= JSON.parse(fs.readFileSync('credentials.json'));


//this function can provide data by any parameter, in its null it will provide the whole table
const getRow = async (anyParam) => {
    //use service account creds
    await doc.useServiceAccountAuth({
        client_email : CREDENTIALS.client_email,
        private_key : CREDENTIALS.private_key
    });

    //load the documents info
    await doc.loadInfo();

    //Index of the sheet
    let sheet = doc.sheetsByIndex[0];

    //get all the rows
    let rows = await sheet.getRows();

    for (let index = 0; index < rows.length;index++ ){
        const row = rows[index];
        if(anyParam){
            console.log(anyParam,': ', row[anyParam]);
        }else {
            console.log('user_name: ', row.user_name);
            console.log('password: ', row.password);
        }
    }
};


const addRow = async (rows) =>{
    //use service account creds
    await doc.useServiceAccountAuth({
        client_email : CREDENTIALS.client_email,
        private_key : CREDENTIALS.private_key
    });

    await doc.loadInfo();
    let sheet = doc.sheetsByIndex[0];

    for (let index = 0; index < rows.length;index++ ) {
        const row = rows[index];
        await sheet.addRow(row);
    }
};

module.exports = {getRow, addRow};