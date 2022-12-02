const fs = require('fs');
const path = require("path");
const url = require("url");
const express = require("express");
const app = require("express/lib/router");
require("dotenv").config({path: '../config/.env'});
let pathValidator;
process.env.STATUS === 'production'
    ? (pathValidator = process.env.PROD_PORT)
    : (pathValidator = process.env.DEV_PORT);


module.exports = {

    loadLoginFile: (req, res) => {
        process.env.STATUS === 'production'
            ? res.sendFile('../loginAndForm/log_in_form.html')
            : res.sendFile(path.join(__dirname, '../loginAndForm/log_in_form.html'));
        // res.sendFile(path.join(__dirname, '../loginAndForm/log_in_form.html'));

    },
    loadFormFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/form.html'));
    },
    loadMessageFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/message.html'));
    }
}



