export const ADD = 'ADD'
export const REMOVE = 'REMOVE'
export const TOGGLE = 'TOGGLE'
export const TOGGLE_ALL = 'TOGGLE_ALL'
export const CHANGE_TITLE = 'CHANGE_TITLE'

export const add = title => ({ type: ADD, payload: title })

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
