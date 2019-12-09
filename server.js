const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const ip = require('ip');
const app = express();
const hash = require(path.join(__dirname,"lib","hash.js"));
const weather = require('weather-js');
const httpServer = http.createServer(app);
app.use(express.static("public",{
  maxAge: "1y"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/weather",(req,res)=>{
  const body = req.query;
  if(body.loc){
    weather.find({
      search: body.loc,
      degreeType: body.deg || "F"
    },(err,resp)=>{
      if(err){
        return res.send(JSON.stringify({
          code: 500,
          error: "Weather service error"
        }));
      }
      res.send(JSON.stringify(resp,null,1));
    });
  }else{
    res.send(JSON.stringify({
      code: 400,
      error: "No Location Provided"
    }));
  }
});

// 404 Page
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","404.html"));
});

httpServer.listen(process.env.PORT || 1910);

console.log(ip.address());
