import React from 'react'
import './App.css'

const App = () => {
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
						<input type="text" />
					</div>
					<div id="body">
						<ul id="todos">
							{todos.map(todo => (
								<li className="todo">
                  <input type="checkbox" />
                  <input type='text' value={todo.title} />
                  <button>X</button>
								</li>
							))}
						</ul>
						<div id="footer">
              <span id='items-left'>{todos.length} item{todos.length > 1 ? 's' : null} left</span>
              <div id='controll-panel'>
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

export default App
