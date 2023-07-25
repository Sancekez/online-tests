"use strict";

var _require = require("../jwt/checkAuth"),
    generateToken = _require.generateToken;

var bcrypt = require('bcrypt');

var _require2 = require('../Schemas/QuizSchema'),
    QuizModel = _require2.QuizModel;

var _require3 = require("../Schemas/UserSchema"),
    UserModel = _require3.UserModel;

var userRegister = function userRegister(req, res) {
  var passwordHash = bcrypt.hashSync(req.body.password, 10);
  var user = new UserModel({
    email: req.body.email,
    password: passwordHash,
    name: req.body.name,
    surName: req.body.surName
  });

  try {
    user.save().then(function () {
      res.send("user added");
    })["catch"](function (err) {
      res.send("User with this email already registered ");
    });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

var userAuth = function userAuth(req, res) {
  var user, passwordIncrypt, token;
  return regeneratorRuntime.async(function userAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(UserModel.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context.sent;

          if (user) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(401).json({
            message: 'Email or password incorect'
          }));

        case 5:
          passwordIncrypt = bcrypt.compareSync(req.body.password, user.password);

          if (user && passwordIncrypt) {
            token = generateToken(user);
            res.json({
              token: token
            });
          } else {
            res.status(401).json({
              message: 'Email or password incorect'
            });
          }

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

var createQuiz = function createQuiz(req, res) {
  var _req$body, title, subtitle, Class, questions, quiz;

  return regeneratorRuntime.async(function createQuiz$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, subtitle = _req$body.subtitle, Class = _req$body.Class, questions = _req$body.questions;

          try {
            quiz = new QuizModel({
              title: title,
              subtitle: subtitle,
              Class: Class,
              questions: questions,
              accessCode: Math.floor(Math.random() * (9999 - 1000) + 1000)
            });
            quiz.save()["catch"](function (err) {
              return res.status(400).send("Error: " + err);
            });
            res.json("quiz added");
          } catch (error) {
            res.status(400).json(error);
            console.log(error);
          }

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.userRegister = userRegister;
module.exports.createQuiz = createQuiz;
module.exports.userAuth = userAuth;