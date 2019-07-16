import { makeGetRequest, makeRequest } from '../../network'

export const ADD = 'ADD'
export const REMOVE = 'REMOVE'
export const TOGGLE = 'TOGGLE'
export const TOGGLE_ALL = 'TOGGLE_ALL'
export const SET_TODOS = 'FETCH_TODOS'
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const CHANGE_FILTER = 'CHANGE_FILTER'
export const CLEAR_DONE_TODOS = 'CLEAR_DONE_TODOS'
export const FILTER_TYPES = { ALL: 'ALL', ACTIVE: 'ACTIVE', COMPLETE: 'COMPLETE' }

const _fetchTodos = dispatch => {
	makeGetRequest(
		'list',
		res => {
			res.sort((a,b) => a.id - b.id)
			dispatch({ type: SET_TODOS, payload: res })
		},
		err => console.log(err)
	)
}

export const fetchTodos = () => (dispatch, getState) => {
	_fetchTodos(dispatch)
}

export const add = title => (dispatch, getState) => {
	makeRequest('POST' ,'addTodo', { title }, () => _fetchTodos(dispatch), err => console.log(err))
}

export const remove = id => (dispatch, getState) => {
	makeRequest('DELETE', 'delete/' + id, null, () => _fetchTodos(dispatch), err => console.log(err))
}

export const toggle = (id, status) => (dispatch, getState) => {
	makeRequest('PUT', `todos/${id}/toggle_status?status=${status}`, null, () => _fetchTodos(dispatch), err => console.log(err))
}

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
