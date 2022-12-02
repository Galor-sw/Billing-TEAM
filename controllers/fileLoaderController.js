// const fs = require('fs');
const path = require("path");
// const url = require("url");
// const express = re/quire("express");
// const app = require("express/lib/router");

require("dotenv").config();
let pathValidator;
process.env.STATUS === 'production'
    ? (pathValidator = process.env.PROD_URL)
    : (pathValidator = process.env.DEV_URL);


const loadLoginFile=(req, res) => {
    res.sendFile('https://billing-team-repo.onrender.com/loginAndForm/log_in_form.html');

};
const loadFormFile= (req, res) => {
    res.sendFile(path.join(__dirname, '../loginAndForm/form.html'));
};
const loadMessageFile= (req, res) => {
    res.sendFile(path.join(__dirname, '../loginAndForm/message.html'));
};

module.exports = {loadFormFile,loadLoginFile,loadMessageFile};



