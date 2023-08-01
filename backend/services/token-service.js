const jwt = require("jsonwebtoken");
const { TokenModel } = require("../Schemas/TokenSchema");

const createToken = (payload) => {
   const accessToken = jwt.sign(payload, process.env.SECRET_TOKEN_ACCESS, {
      expiresIn: "30m",
   });
   const refreshToken = jwt.sign(
      payload,
      process.env.SECRET_REFRESHTOKEN_ACCESS,
      { expiresIn: "30d" }
   );

   return {
      refreshToken,
      accessToken,
   };
};

const saveToken = async (userId, refreshToken) => {
   const tokenData = await TokenModel.findOne({ user: userId });

   if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
   }

   const token = await TokenModel.create({ user: userId, refreshToken });
   return token;
};

const tokenRemove = async (refreshToken) => {
   const token = await TokenModel.deleteOne({ refreshToken });
   return token;
};

const validateRefreshToken = (refreshToken) => {
   const validateToken = jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESHTOKEN_ACCESS
   );

   return validateToken;
};

const validateAccessToken = (accessToken) => {
   const validateToken = jwt.verify(
      accessToken,
      process.env.SECRET_TOKEN_ACCESS
   );

   return validateToken;
};


const findToken = async (refreshToken) => {
   const tokenFromDb = await TokenModel.findOne({ refreshToken });

   return tokenFromDb;
};

module.exports.createToken = createToken;
module.exports.saveToken = saveToken;
module.exports.tokenRemove = tokenRemove;
module.exports.validateRefreshToken = validateRefreshToken;
module.exports.validateAccessToken = validateAccessToken;
module.exports.findToken = findToken;
