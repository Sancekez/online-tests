"use strict";

var express = require('express');

var mongoose = require("mongoose");

var bodyParser = require('body-parser');

var cors = require('cors');

var _require = require("./jwt/checkAuth"),
    checkAuthToken = _require.checkAuthToken;

var userRegister = require("./routes/routes.js").userRegister;

var userAuth = require("./routes/routes.js").userAuth;

var createQuiz = require("./routes/routes.js").createQuiz;

var DB_URL = "mongodb+srv://Nik:211212@cluster0.x4obgxq.mongodb.net/test-app?retryWrites=true&w=majority";
var app = express();
var db = mongoose.connection;
mongoose.connect(DB_URL);
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
db.on('error', function (err) {
  console.log('connection error:', err.message);
});
db.once('open', function callback() {
  console.log("DB is connected!");
});
app.listen(4444, function () {
  console.log('Express server listening on port 4444');
});
app.post('/register', userRegister);
app.post('/auth', userAuth);
app.post('/quiz', checkAuthToken, createQuiz);