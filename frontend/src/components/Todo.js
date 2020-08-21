import React from 'react';
import './Todo.css';

class Todo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			done: false,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		this.setState({
			done: this.props.task.done,
		});
	}

	async handleChange(event) {
		this.setState({
			done: !this.state.done,
		});
		await this.updateTask({
			done: !this.state.done,
		});
	}

	async updateTask(task) {
		const response = await fetch(
			`http://localhost:5000/todo/${this.props.task._id}`,
			{
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(task),
			}
		);
	}

	render() {
		return (
			<div className="todo">
				<p
					style={
						this.state.done
							? { textDecorationLine: 'line-through' }
							: { textDecorationLine: 'none' }
					}
				>
					{this.props.task.task}
				</p>
				<input
					type="checkbox"
					checked={this.state.done}
					onChange={this.handleChange}
				></input>
			</div>
		);
	}
}

export default Todo;
