export const ADD = 'ADD'
export const REMOVE = 'REMOVE'
export const TOGGLE = 'TOGGLE'
export const TOGGLE_ALL = 'TOGGLE_ALL'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const CLEAR_DONE_TODOS = 'CLEAR_DONE_TODOS'
export const FILTER_TYPES = { ALL: 'ALL', ACTIVE: 'ACTIVE', DONE: 'DONE' }

export const add = title => (dispatch, getState) => {
	fetch('http://localhost:8080/addTodo', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ title })
	})
		.then(() => dispatch({ type: ADD, payload: title }))
		.catch(err => console.log(err))
}

export const remove = id => ({
	type: REMOVE,
	payload: id
})

export const toggle = id => ({
	type: TOGGLE,
	payload: id
})

export const changeTitle = (id, title) => ({
	type: CHANGE_TITLE,
	payload: { title, id }
})

export const toggleAll = () => ({
	type: TOGGLE_ALL
})

export const changeFilter = filter => ({
	type: CHANGE_FILTER,
	payload: filter
})

export const clearDoneTodos = () => ({
	type: CLEAR_DONE_TODOS
})
