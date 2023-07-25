const express = require('express');
const mongoose = require("mongoose")
const bodyParser = require('body-parser');
const cors = require('cors');

const {
	checkAuthToken
} = require("./jwt/checkAuth");

const userRegister = require("./routes/routes.js").userRegister
const userAuth = require("./routes/routes.js").userAuth
const createQuiz = require("./routes/routes.js").createQuiz

const DB_URL = "mongodb+srv://Nik:211212@cluster0.x4obgxq.mongodb.net/test-app?retryWrites=true&w=majority"

const app = express();
const db = mongoose.connection





mongoose.connect(DB_URL)
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