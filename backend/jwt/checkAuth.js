const jwt = require("jsonwebtoken");
const { TokenModel } = require("../Schemas/TokenSchema");

// const createToken = async (payload) => {
//    const accessToken = jwt.sign(payload, "secret123", { expiresIn: "30m" });
//    const refreshToken = jwt.sign(payload, "secret123", { expiresIn: "30d" });

//    return {
//       refreshToken,
//       accessToken,
//    };

//    const tokenData = await TokenModel.findOne({ user: user._id });

//    if (tokenData) {
//       tokenData.refreshToken = refreshToken;
//       return tokenData.save();
//    }

//    const token = await TokenModel.create({
//       user: user._id,
//       refreshToken,
//    });
//    return token;
// };

function checkAuthToken(req, res, next) {
   const authHeader = req.headers["authorization"];
   const token = authHeader && authHeader.split(" ")[1];
   if (token == null)
      return res.status(401).json({ message: "Требуется авторизация" });

   jwt.verify(token, "secret123", (err, user) => {
      if (err) return res.status(403).json({ message: "invalid token" });
      req.user = user;
      next();
   });
}

module.exports.checkAuthToken = checkAuthToken;
// module.exports.createToken = createToken;
