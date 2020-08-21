import React from 'react';
import './input.css';

class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			todo: '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			todo: event.target.value,
		});
	}

	async handleSubmit(event) {
		event.preventDefault();
		await this.createTodo({
			task: this.state.todo,
		});
		this.props.sync();
	}

	async createTodo(todo) {
		const response = await fetch('http://localhost:5000/todo', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(todo),
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<label>Todo</label>
				<div className="todo-input">
					<input
						type="text"
						placeholder="Todo..."
						value={this.state.todo}
						onChange={this.handleChange}
					></input>
					<input
						type="submit"
						value="Tambah Todo"
						className="btn-submit"
					></input>
				</div>
			</form>
		);
	}
}

export default Input;
