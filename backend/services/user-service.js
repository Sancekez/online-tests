const { UserModel } = require("../Schemas/UserSchema");
const bcrypt = require("bcrypt");
const { generateToken } = require("../jwt/checkAuth");
const { TokenModel } = require("../Schemas/TokenSchema");
const uuid = require("uuid");
const { SendActivationMail } = require("./mail-service");
const TokenService = require("./token-service");

const userRegister = async (req, res) => {
   try {
      const registeredUser = await UserModel.find({ email: req.body.email });

      if (!registeredUser) {
         return res.send("User already registered");
      }
      const activationLink = uuid.v4();

      const passwordHash = bcrypt.hashSync(req.body.password, 10);

      const user = new UserModel({
         email: req.body.email,
         password: passwordHash,
         name: req.body.name,
         activationLink: activationLink,
         surName: req.body.surName,
      });

      await SendActivationMail(
         req.body.email,
         `${process.env.API_URL}activate/${activationLink}`
      );
      await user.save();

      const { _id, email, isActivated } = user;
      const tokens = TokenService.createToken({ _id, email, isActivated });
      await TokenService.saveToken(_id, tokens.refreshToken);

      return {
         ...tokens,
         user: { id: _id, email, isActivated },
      };
   } catch (error) {
      res.status(400).json(error);
      console.log(error);
   }
};

const userActivate = async (activationLink) => {
   try {
      const user = await UserModel.findOne({ activationLink });

      if (!user) {
         res.message("Некоректная ссылка активации.");
      }
      console.log("user: " + user);
      user.isActivated = true;
      await user.save();
   } catch (error) {
      console.log(error);
   }
};

const userLogin = async (req, res) => {
   try {
      const user = await UserModel.findOne({
         email: req.body.email,
      });

      if (!user) {
         console.log("err email");
         return res.status(401).json({
            message: "Email or password incorect",
         });
      }

      const passwordIncrypt = bcrypt.compareSync(
         req.body.password,
         user.password
      );

      if (!passwordIncrypt) {
         console.log("err pass");
         return res.status(401).json({
            message: "Email or password incorect",
         });
      }

      if (user && passwordIncrypt) {
         const { _id, email, isActivated } = user;
         const tokens = TokenService.createToken({ _id, email, isActivated });
         await TokenService.saveToken(_id, tokens.refreshToken);

         return {
            ...tokens,
            user: { id: _id, email, isActivated },
         };
      }
   } catch (error) {
      console.log("err");
      return res.status(401).json({
         message: "Email or password incorect",
      });
   }
};

const userRefresh = async (refreshToken) => {
   try {
      const userData = TokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await TokenModel.findOne({ refreshToken });

      if (!userData || !tokenFromDb) {
         return null;
      }

      const user = await UserModel.findById(userData._id);
      const { _id, email, isActivated } = user;
      const tokens = TokenService.createToken({ _id, email, isActivated });
      await TokenService.saveToken(_id, tokens.refreshToken);

      return {
         ...tokens,
         user: { id: _id, email, isActivated },
      };
   } catch (error) {
      console.log(error)
   }
};

module.exports.userRegister = userRegister;
module.exports.userLogin = userLogin;
module.exports.userActivate = userActivate;
module.exports.userRefresh = userRefresh;
