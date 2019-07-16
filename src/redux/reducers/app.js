import { ADD, REMOVE, TOGGLE, TOGGLE_ALL, CHANGE_TITLE } from '../actions/app'

const initState = {
	isAllTaggled: false,
	nextId: 3,
	todos: [
    { id: 0, title: 'one', isDone: false },
    { id: 1, title: 'two', isDone: true },
    { id: 2, title: 'three', isDone: false },
  ]
}

export const app = (state = initState, action) => {
	switch (action.type) {
		case ADD:
			return {
        ...state,
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

		case TOGGLE_ALL:
      if(state.todos.length > 0){
        return {
          ...state,
          isAllTaggled: !state.isAllTaggled,
          todos: [...state.todos.map(todo => ({ ...todo, isDone: !state.isAllTaggled }))]
        }
      }else{
        return state
      }

		default:
			return state
	}
}
