const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
	name : String,
	question : String,
	answer : String,
	created : {type: Date, default: Date.now}
})


const Question = mongoose.model('Question',QuestionSchema);
module.exports = Question;