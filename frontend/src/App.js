import React from 'react';
import Input from './components/Input';
import Todo from './components/Todo';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
		};
		this.syncData = this.syncData.bind(this);
	}

	async componentDidMount() {
		this.setState({
			tasks: await this.fetchData(),
		});
	}

	async fetchData() {
		const response = await fetch('http://localhost:5000/todo');
		return response.json();
	}

	async syncData() {
		const data = await this.fetchData();
		this.setState({
			tasks: data,
		});
	}

	render() {
		return (
			<div className="app">
				<Input sync={this.syncData} />
				{this.state.tasks.map((task) => (
					<Todo task={task} key={task._id} />
				))}
			</div>
		);
	}
}
//function App() {
//return <h1>Hello World!</h1>;
//}

export default App;
