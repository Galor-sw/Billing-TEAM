const GoogleSheet = require('./googleSheets');

GoogleSheet.getRow();

let rows = [{
    email: 'test1@gmail.com',
    free_text: 'test1',
    rate: '9',
    recommended: 'no',
    choose_again : 'no',
    improvement: 'pace',
    customer_support: 'no'
},{
    email: 'test1@gmail.com',
    free_text: 'test1',
    rate: '8',
    recommended: 'yes',
    choose_again : 'yes',
    improvement: 'clear',
    customer_support: 'yes'
}];

//GoogleSheet.addRow(rows);
