import React from 'react'
import './App.css'

export default () => {
	const [todos, setTodos] = React.useState([
		{ id: 1, title: 'one', isDone: false },
		{ id: 2, title: 'two', isDone: true },
		{ id: 3, title: 'three', isDone: false },
		{ id: 4, title: 'four', isDone: true }
	])

	return (
		<section>
			<div id="app">
				<h1 id="title">todos</h1>
				<div>
					<div id="header">
						<input type="checkbox" />
						<input type="text" onKeyPress={handleSubmit(todos, setTodos)} />
					</div>
					<div id="body">
						<ul id="todos">
							{todos.map(todo => (
								<li className="todo" key={todo.id}>
									<input type="checkbox" />
									<input
										type="text"
										value={todo.title}
										onChange={handleItemTitleChange(todo.id, todos, setTodos)}
									/>
									<button>X</button>
								</li>
							))}
						</ul>
						<div id="footer">
							<span id="items-left">
								{todos.length} item{todos.length > 1 ? 's' : null} left
							</span>
							<div id="controll-panel">
								<button>All</button>
								<button>Active</button>
								<button>Completed</button>
							</div>
							<button>Clear completed</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const handleSubmit = (todos, setTodos) => e => {
	if (e.key == 'Enter') {
		setTodos([{ id: todos.length + 1, title: e.currentTarget.value, isDone: false }, ...todos])
		e.currentTarget.value = ''
	}
}

const handleItemTitleChange = (id, todos, setTodos) => e => {
	setTodos([
		...todos.map(todo =>
			todo.id == id
				? { id: todo.id, title: e.currentTarget.value, isDone: todo.isDone }
				: todo
		)
	])
}
