import {
	FILTER_TYPES,
	SET_TODOS,
	CHANGE_VALUE_ON_TYPEING
} from '../actions/app'
export const TODO_STAUSES = { ACTIVE: 'ACTIVE', COMPLETE: 'COMPLETE' }

const initState = {
	activeFilter: FILTER_TYPES.ALL,
	isAllTaggled: false,
	todos: []
}

export const app = (state = initState, action) => {
	switch (action.type) {
	
		case SET_TODOS:
			return {
				...state,
				todos: action.payload
			}

		case CHANGE_VALUE_ON_TYPEING:
			return {
				...state,
				todos: state.todos.map(todo => {
					if(todo.id == action.payload.id){
						return {id: todo.id, title: action.payload.title, status: todo.status}
					}else{
						return todo
					}
				})
			}

		default:
			return state
	}
}
