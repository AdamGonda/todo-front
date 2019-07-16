import React from 'react'
import { connect } from 'react-redux'
import { add, remove, toggle, toggleAll, changeTitle } from './redux/actions/app'
import './App.css'

const App = ({ todos, add, remove, toggle, toggleAll, changeTitle, isAllTaggled }) => {
	const handleSubmit = e => {
		if (e.key == 'Enter') {
			add(e.currentTarget.value)
			e.currentTarget.value = ''
		}
	}

	return (
		<section>
			<div id="app">
				<h1 id="title">todos</h1>
				<div>
					<div id="header">
						<span id="toggleAll" onClick={toggleAll} className={(isAllTaggled == true ? 'active' : '')} >V</span>
						<input type="text" onKeyPress={handleSubmit} />
					</div>
					<div id="body">
						<ul id="todos">
							{todos.map(todo => {
								return (
									<li
										className={'todo ' + (todo.isDone ? 'done' : '')}
										key={todo.id}
									>
										<input
											type="checkbox"
											checked={todo.isDone}
											onClick={() => toggle(todo.id)}
										/>
										<input
											type="text"
											value={todo.title}
											onChange={e =>
												changeTitle(todo.id, e.currentTarget.value)
											}
										/>
										<button onClick={() => remove(todo.id)}>X</button>
									</li>
								)
							})}
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

const mapStateToProps = state => {
	return {
		isAllTaggled: state.app.isAllTaggled,
		todos: state.app.todos
	}
}

const mapDispatchToProps = dispatch => {
	return {
		add: title => dispatch(add(title)),
		remove: id => dispatch(remove(id)),
		toggle: id => dispatch(toggle(id)),
		changeTitle: (id, title) => dispatch(changeTitle(id, title)),
		toggleAll: () => dispatch(toggleAll())
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
