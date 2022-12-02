const fs = require('fs');
const path = require("path");
const url = require("url");
const express = require("express");
const app = require("express/lib/router");
require("dotenv").config({path: '../config/.env'});
let pathValidator;
process.env.STATUS === 'production'
    ? (pathValidator = process.env.PROD_URL)
    : (pathValidator = process.env.DEV_URL);


module.exports = {

    loadLoginFile: (req, res) => {
        // console.log("heyyyyy");
        res.sendFile(path.join('https://billing-team-repo.onrender.com/Billing-TEAM/loginAndForm/log_in_form.html'));

    },
    loadFormFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/form.html'));
    },
    loadMessageFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/message.html'));
    }
}



