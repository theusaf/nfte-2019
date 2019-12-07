const request = require('request');
const fs = require('fs');
const path = require('path');
const ws = require('ws');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
//const firebase = require('firebase');
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

/*const firebaseConfig = {
  apiKey: "AIzaSyDyAxEc43oDpJms036wVOeKdjvNsQLszvU",
  authDomain: "bepreparedness.firebaseapp.com",
  databaseURL: "https://bepreparedness.firebaseio.com",
  projectId: "bepreparedness",
  storageBucket: "bepreparedness.appspot.com",
  messagingSenderId: "106107649883",
  appId: "1:106107649883:web:fece6ab1530c3ee3e8647e",
  measurementId: "G-16NGQBRXK7"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);*/
