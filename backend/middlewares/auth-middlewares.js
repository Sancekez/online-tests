const { validateAccessToken } = require("../services/token-service");

const authMiddleware = (req, res, nex) => {
   try {
      const headerAutharization = req.headers.authorization;

      if (!headerAutharization) {
         return res.json({
            message: "Пользователь не авторизован.",
         });
      }

      const accessToken = headerAutharization.split(" ")[1];

      if (!accessToken) {
         return res.json({
            message: "Пользователь не авторизован.",
         });
      }

      const userData = validateAccessToken(accessToken);

      if (!userData) {
         return res.json({
            message: "Пользователь не авторизован.",
         });
      }

      res.user = userData;
      next();
   } catch (error) {
		console.log(error)
	}
};

module.exports.authMiddleware = authMiddleware;
