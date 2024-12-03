"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = require("cors");
var dotenv = require("dotenv");
var pg_1 = require("pg");
var express_1 = require("express");
dotenv.config();
var client = new pg_1.Client({
    connectionString: process.env.PGURI_LOCAL,
});
client.connect();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
var port = 3000;
app.listen(port, function () {
    console.log("Webbtjänsten kan nu ta emot anrop.");
});
