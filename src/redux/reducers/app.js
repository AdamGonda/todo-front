import {
	FILTER_TYPES,
	SET_TODOS
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

		default:
			return state
	}
}
