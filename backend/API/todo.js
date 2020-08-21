const router = require('express')();

const Todo = require('../models/Todo');

router.get('/', (req, res) => {
	Todo.find().then((todo) => res.status(200).json(todo));
});

router.post('/', (req, res) => {
	console.log(req.body);

	const newTodo = new Todo({
		task: req.body.task,
		done: false,
	});

	console.log(newTodo);

	newTodo
		.save()
		.then((user) => res.status(201).json(user))
		.catch((err) => {
			console.error(err);
			res.send('Unable to save to database');
		});
});

router.put('/:id', (req, res) => {
	console.log(req.body);
	console.log(req.params.id);
	Todo.findByIdAndUpdate(
		req.params.id,
		req.body,
		{
			new: true,
		},
		(err, updated) => {
			if (err) {
				console.error(err);
				res.send(err);
			} else {
				res.json({
					msg: 'Task updated',
					updated,
				});
			}
		}
	);
});

module.exports = router;
