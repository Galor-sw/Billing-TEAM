const fs =require('fs');
const path = require("path");
const url = require("url");
const express = require("express");
const app = require("express/lib/router");

module.exports = {

    loadLoginFile: (req, res) => {
    res.sendFile(path.join(__dirname, '../loginAndForm/log_in_form.html'));

    },
    loadFormFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/form.html'));
    },
    loadMessageFile: (req, res) => {
        res.sendFile(path.join(__dirname, '../loginAndForm/message.html'));
    }
}



