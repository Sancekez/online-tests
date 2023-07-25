const {
	generateToken
} = require("../jwt/checkAuth");
const bcrypt = require('bcrypt');
const {
	QuizModel
} = require('../Schemas/QuizSchema');

const {UserModel} = require("../Schemas/UserSchema")

const userRegister = async (req, res) => {
	try {
		const registeredUser = await UserModel.find({email: req.body.email,})
		
		if(registeredUser) {
			return res.send("User already registered")
		}

		const passwordHash = bcrypt.hashSync(req.body.password, 10);

		const user = new UserModel({
			email: req.body.email,
			password: passwordHash,
			name: req.body.name,
			surName: req.body.surName,
		})

		// user.save().then(() => {
		// 	res.send("user added")
		// }).catch((err) => {
		// 	res.send("User with this email already registered ")
		// })

		await user.save();
    	res.send("User added");

	} catch (error) {
		res.status(400).json(error)
		console.log(error)
	}
}

const userAuth = async (req, res) => {

	const user = await UserModel.findOne({
		email: req.body.email,
	})

	if (!user) return res.status(401).json({
		message: 'Email or password incorect'
	});

	const passwordIncrypt = bcrypt.compareSync(req.body.password, user.password)

	if (user && passwordIncrypt) {
		const token = generateToken(user);
		res.json({
			token
		});
	} else {
		res.status(401).json({
			message: 'Email or password incorect'
		});
	}

}

const createQuiz = async (req, res) => {
	const {
		title,
		subtitle,
		Class,
		questions
	} = req.body

	try {

		const quiz = new QuizModel({
			title: title,
			subtitle: subtitle,
			Class: Class,
			questions: questions,
			accessCode: Math.floor(Math.random() * (9999 - 1000) + 1000)
		})

		quiz.save().catch(err => res.status(400).send("Error: " + err))

		res.json("quiz added")
	} catch (error) {
		res.status(400).json(error)
		console.log(error)
	}
}

module.exports.userRegister = userRegister;
module.exports.createQuiz = createQuiz;
module.exports.userAuth = userAuth;