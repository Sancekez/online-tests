const jwt = require('jsonwebtoken')

function generateToken(user) {
	const payload = {
		id: user._id,
		email: user.username
	};
	return jwt.sign(payload, 'secret123', {
		expiresIn: '1h'
	});
}

function checkAuthToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.status(401).json({ message: 'Требуется авторизация' });
 
	jwt.verify(token, 'secret123', (err, user) => {
	  if (err) return res.status(403).json({ message: 'invalid token' });
	  req.user = user;
	  next();
	});
 }

 module.exports.checkAuthToken = checkAuthToken;
 module.exports.generateToken = generateToken;