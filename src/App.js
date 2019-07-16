import React from 'react'
import './App.css'

export default () => {
  const [uid, setUid] = React.useState(0)
	const [todos, setTodos] = React.useState([])

  console.log(todos);
  
	return (
		<section>
			<div id="app">
				<h1 id="title">todos</h1>
				<div>
					<div id="header">
						<input type="checkbox" />
						<input type="text" onKeyPress={handleSubmit(uid, setUid, todos, setTodos)} />
					</div>
					<div id="body">
						<ul id="todos">
							{todos.map(todo => (
								<li className={"todo " + (todo.isDone ? "done" : '')} key={todo.id}>
									<input type="checkbox" defaultChecked={todo.isDone} onClick={handleItemToggle(todo.id, todos, setTodos)}/>
									<input
										type="text"
										value={todo.title}
										onChange={handleItemTitleChange(todo.id, todos, setTodos)}
									/>
									<button onClick={hadleItemDelete(todo.id, todos, setTodos)}>X</button>
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

const handleSubmit = (uid, setUid, todos, setTodos) => e => {
	if (e.key == 'Enter') {
		setTodos([{ id: uid, title: e.currentTarget.value, isDone: false }, ...todos])
		e.currentTarget.value = ''
  }
  setUid(uid + 1)
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

const handleItemToggle = (id, todos, setTodos) => e => {
  setTodos([
		...todos.map(todo =>
			todo.id == id
				? { id: todo.id, title: todo.title, isDone: !todo.isDone }
				: todo
		)
	])
}

const hadleItemDelete = (id, todos, setTodos) => e => {
  setTodos([
		...todos.filter(todo => todo.id != id)])
}
