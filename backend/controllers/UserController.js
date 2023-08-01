const {
   userRegister,
   userActivate,
   userLogin,
   userRefresh,
} = require("../services/user-service");

const { tokenRemove } = require("../services/token-service");
const { QuizModel } = require("../Schemas/QuizSchema");

const registration = async (req, res, next) => {
   try {
      const userData = await userRegister(req, res);
      res.cookie("refreshtoken", userData.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
      });
      return res.json(userData);
   } catch (error) {
      console.log(error);
   }
};

const activate = async (req, res) => {
   try {
      const activationLink = req.params.link;
      await userActivate(activationLink);

      return res.redirect(process.env.CLIENT_URL);
   } catch (error) {
      console.log(error);
   }
};

const login = async (req, res, next) => {
   try {
      const userData = await userLogin(req, res);

      if (userData) {
         res.cookie("refreshtoken", userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
         });

         return res.json(userData);
      }
   } catch (error) {
      console.log(error);
   }
};

const logout = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshtoken;

      const token = tokenRemove(refreshToken);
      return res.json(token);
   } catch (error) {
      console.log(error);
   }
};

const refresh = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshtoken;

      if (!refreshToken) {
         return res.status(400).json({
            message: "Пользователь не авторизован",
         });
      }

      const userData = await userRefresh(refreshToken);

      res.cookie("refreshtoken", userData.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
      });

      return res.json(userData);
   } catch (error) {
      console.log(error);
   }
};

const getAllquizes = async (req, res) => {
   try {
      const quizes = await QuizModel.find();

      return quizes;
   } catch (error) {
      console.log(error)
   }
};

module.exports.getAllquizes = getAllquizes;
module.exports.registration = registration;
module.exports.activate = activate;
module.exports.login = login;
module.exports.logout = logout;
module.exports.refresh = refresh;
