import React from 'react'
import { connect } from 'react-redux'
import { TODO_STAUSES } from './redux/reducers/app'
import {
	add,
	remove,
	toggle,
	toggleAll,
	changeTitle,
	changeFilter,
	FILTER_TYPES,
	clearDoneTodos,
	fetchTodos
} from './redux/actions/app'
import './App.css'

const App = ({
	todos,
	add,
	remove,
	toggle,
	toggleAll,
	changeTitle,
	isAllTaggled,
	changeFilter,
	activeFilter,
	clearDoneTodos,
	initTodos
}) => {

	React.useEffect(() => {
    initTodos()
  }, []);

	const handleSubmit = e => {
		if (e.key == 'Enter') {
			add(e.currentTarget.value)
			e.currentTarget.value = ''
		}
	}

	console.log(todos);
	
	return (
		<section>
			<div id="app">
				<h1 id="title">todos</h1>
				<div>
					<div id="header">
						{todos.length <= 0 ? null : (
							<span
								id="toggleAll"
								onClick={toggleAll}
								className={isAllTaggled == true ? 'active' : ''}
							>
								V
							</span>
						)}
						<input type="text" onKeyPress={handleSubmit} />
					</div>
					<div id="body">
						<ul id="todos">
							{todos
								.filter(todo => {
									if (activeFilter == FILTER_TYPES.ALL) {
										return true
									} else if (activeFilter == FILTER_TYPES.ACTIVE) {
										return todo.status == TODO_STAUSES.ACTIVE

									} else if (activeFilter == FILTER_TYPES.COMPLETE) {

										return todo.status == TODO_STAUSES.COMPLETE
									}
								})
								.map(todo => {
									return (
										<li
											className={'todo ' + (todo.status == TODO_STAUSES.COMPLETE ? 'done' : '')}
											key={todo.id}
										>
											<input
												type="checkbox"
												checked={todo.status == TODO_STAUSES.COMPLETE}
												onClick={() => toggle(todo.id, todo.status)}
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
								<button
									className={activeFilter == FILTER_TYPES.ALL ? 'active' : ''}
									onClick={() => changeFilter(FILTER_TYPES.ALL)}
								>
									All
								</button>
								<button
									className={activeFilter == FILTER_TYPES.ACTIVE ? 'active' : ''}
									onClick={() => changeFilter(FILTER_TYPES.ACTIVE)}
								>
									Active
								</button>
								<button
									className={activeFilter == FILTER_TYPES.COMPLETE ? 'active' : ''}
									onClick={() => changeFilter(FILTER_TYPES.COMPLETE)}
								>
									Completed
								</button>
							</div>
							<button onClick={() => clearDoneTodos()}>Clear completed</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

const mapStateToProps = state => {
	return {
		activeFilter: state.app.activeFilter,
		isAllTaggled: state.app.isAllTaggled,
		todos: state.app.todos
	}
}

const mapDispatchToProps = dispatch => {
	return {
		add: title => dispatch(add(title)),
		remove: id => dispatch(remove(id)),
		toggle: (id, status) => dispatch(toggle(id, status)),
		changeTitle: (id, title) => dispatch(changeTitle(id, title)),
		toggleAll: () => dispatch(toggleAll()),
		changeFilter: type => dispatch(changeFilter(type)),
		clearDoneTodos: () => dispatch(clearDoneTodos()),
		initTodos: () => dispatch(fetchTodos()),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
