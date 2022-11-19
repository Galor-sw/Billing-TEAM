const { GoogleSpreadsheet }= require('google-spreadsheet');
const fs = require('fs');

const RESPONSES_SHEET_ID = '1Ktk1cyaazh-jz1KpSgM03_Ldi8ta9Qlq774YVKsjL6M';

const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID);


const CREDENTIALS= JSON.parse(fs.readFileSync('credentials.json'));

const getRow = async () => {
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
        console.log('user_name: ', row.user_name);
        console.log('password: ', row.password);
    }
};

getRow('email@gmail.com');

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

let rows = [{
    email: 'test1@gmail.com',
    user_name: 'test1',
    phone: '0512344121',
    password: '!@$$!@E'
},{
    email: 'test2@gmail.com',
    user_name: 'test2',
    phone: '0513453242',
    password: '!&^%$^##'
}];

addRow(rows);