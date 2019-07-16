import { ADD, REMOVE, TOGGLE, TOGGLE_ALL, CHANGE_TITLE } from '../actions/app'

const initState = {
	nextId: 0,
	todos: [{ id: 0, title: 'one', isDone: false }]
}

export const app = (state = initState, action) => {
	switch (action.type) {
		case ADD:
			return {
				nextId: state.nextId + 1,
				todos: [
					{ id: state.nextId + 1, title: action.payload, isDone: false },
					...state.todos
				]
			}

		case REMOVE:
			return {
				...state,
				todos: [...state.todos.filter(todo => todo.id != action.payload)]
			}

		case TOGGLE:
			return {
				...state,
				todos: [
					...state.todos.map(todo =>
						todo.id == action.payload
							? { id: todo.id, title: todo.title, isDone: !todo.isDone }
							: todo
					)
				]
      }
      
		case CHANGE_TITLE:
			return {
				...state,
				todos: [
          ...state.todos.map(todo =>
            todo.id == action.payload.id
              ? { id: todo.id, title: action.payload.title, isDone: todo.isDone }
              : todo
          )
        ]
			}

		default:
			return state
	}
}
