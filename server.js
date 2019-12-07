const request = require('request');
const fs = require('fs');
const path = require('path');
const ws = require('ws');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const ip = require('ip');
const app = express();
const hash = require(path.join(__dirname,"lib","hash.js"));
const httpServer = http.createServer(app);
app.use(express.static("public",{
  maxAge: "1y"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// 404 Page
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","404.html"));
});

httpServer.listen(process.env.PORT || 1910);

console.log(ip.address());
