const { QuizModel } = require("../Schemas/QuizSchema");

const createQuiz = async (req, res) => {
   const { title, subtitle, Class, questions } = req.body;

   try {
      const quiz = new QuizModel({
         title: title,
         subtitle: subtitle,
         Class: Class,
         questions: questions,
         accessCode: Math.floor(Math.random() * (9999 - 1000) + 1000),
      });

      quiz.save().catch((err) => res.status(400).send("Error: " + err));

      res.json("quiz added");
   } catch (error) {
      res.status(400).json(error);
      console.log(error);
   }
};

module.exports.createQuiz = createQuiz;