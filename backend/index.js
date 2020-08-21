const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const todo = require('./API/todo');

require('dotenv').config();
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

mongoose
	.connect(process.env.MONGOURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB Connected');
	})
	.catch((err) => console.log(err));

app.use('/todo', todo);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`App is litening in port ${PORT}`);
});
