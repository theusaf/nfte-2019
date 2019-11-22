const request = require('request');
const fs = require('fs');
const path = require('path');
const ws = require('ws');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hash = require(path.join(__dirname,"lib","hash.js"));
const httpServer = http.createServer(app);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

httpServer.listen(process.env.PORT || 1910);
