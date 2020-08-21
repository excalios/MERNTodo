const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema(
	{
		task: {
			type: String,
			required: true,
		},
		done: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: false,
	}
);

const todo = mongoose.model('Todo', TodoSchema);
module.exports = todo;
