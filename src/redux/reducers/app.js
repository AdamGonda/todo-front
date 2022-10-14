import {
  FILTER_TYPES,
  SET_TODOS,
  CHANGE_TITLE_ON_TYPEING,
  CHANGE_USERNAME_ON_TYPING,
  CHANGE_PASSWORD_ON_TYPING,
  TOGGLE_ALL,
  CHANGE_FILTER,
} from "../actions/app";
export const TODO_STAUSES = { ACTIVE: "ACTIVE", COMPLETE: "COMPLETE" };

const initState = {
  activeFilter: FILTER_TYPES.ALL,
  isAllTaggled: false,
  todos: [],
  password: "",
  username: "",
};

export const app = (state = initState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case CHANGE_USERNAME_ON_TYPING:
      return {
        ...state,
        username: action.payload,
      };

    case CHANGE_PASSWORD_ON_TYPING:
      return {
        ...state,
        password: action.payload,
      };

    case CHANGE_FILTER:
      return {
        ...state,
        activeFilter: action.payload,
      };

    case TOGGLE_ALL:
      return {
        ...state,
        isAllTaggled: !state.isAllTaggled,
      };

    case CHANGE_TITLE_ON_TYPEING:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id == action.payload.id) {
            return {
              id: todo.id,
              title: action.payload.title,
              status: todo.status,
            };
          } else {
            return todo;
          }
        }),
      };

    default:
      return state;
  }
};
