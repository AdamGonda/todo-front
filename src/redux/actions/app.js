import { makeGetRequest, makeRequest } from "../../network";

export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const TOGGLE = "TOGGLE";
export const TOGGLE_ALL = "TOGGLE_ALL";
export const SET_TODOS = "FETCH_TODOS";
export const CHANGE_TITLE = "CHANGE_TITLE";
export const CHANGE_FILTER = "CHANGE_FILTER";
export const CLEAR_DONE_TODOS = "CLEAR_DONE_TODOS";
export const CHANGE_USERNAME_ON_TYPING = "CHANGE_USERNAME_ON_TYPING";
export const CHANGE_PASSWORD_ON_TYPING = "CHANGE_PASSWORD_ON_TYPING";
export const CHANGE_TITLE_ON_TYPEING = "CHANGE_TITLE_ON_TYPEING";
export const FILTER_TYPES = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  COMPLETE: "COMPLETE",
};

export const changeTitleOnTyping = (id, title) => ({
  type: CHANGE_TITLE_ON_TYPEING,
  payload: { id, title },
});

export const changeUsernameOnTyping = (value) => ({
  type: CHANGE_USERNAME_ON_TYPING,
  payload: value,
});

export const changePasswordOnTyping = (value) => ({
  type: CHANGE_PASSWORD_ON_TYPING,
  payload: value,
});

export const changeFilter = (filter) => ({
  type: CHANGE_FILTER,
  payload: filter,
});

const _fetchTodos = (dispatch) => {
  fetch("http://localhost:8080/list", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((json) => {
      json.sort((a, b) => a.id - b.id);
      dispatch({ type: SET_TODOS, payload: json });
    })
    .catch((err) => console.log(err));
};

export const fetchTodos = () => (dispatch, getState) => {
  _fetchTodos(dispatch);
};

export const add = (title) => (dispatch, getState) => {
  makeRequest(
    "POST",
    "addTodo",
    { title },
    () => _fetchTodos(dispatch),
    (err) => console.log(err)
  );
};

export const remove = (id) => (dispatch, getState) => {
  makeRequest(
    "DELETE",
    "delete/" + id,
    null,
    () => _fetchTodos(dispatch),
    (err) => console.log(err)
  );
};

export const toggle = (id, status) => (dispatch, getState) => {
  makeRequest(
    "PUT",
    `todos/${id}/toggle_status?status=${status}`,
    null,
    () => _fetchTodos(dispatch),
    (err) => console.log(err)
  );
};

export const changeTitle = (id, title) => (dispatch, getState) => {
  makeRequest(
    "PUT",
    `todos/${id}?todo-title=${title}`,
    null,
    () => _fetchTodos(dispatch),
    (err) => console.log(err)
  );
};

export const clearCompletedTodos = () => (dispatch, getState) => {
  makeRequest(
    "DELETE",
    `todos/completed`,
    null,
    () => _fetchTodos(dispatch),
    (err) => console.log(err)
  );
};

export const toggleAll = () => (dispatch, getState) => {
  makeRequest(
    "PUT",
    `todos/toggle_all?toggle-all=${!getState().app.isAllTaggled}`,
    null,
    () => {
      _fetchTodos(dispatch);
      dispatch({ type: TOGGLE_ALL });
    },
    (err) => console.log(err)
  );
};

export const signin = (username, password) => (dispatch, getState) => {
  makeRequest(
    "POST",
    "auth/signin",
    { username, password },
    (res) => {
      res.json().then((json) => {
        localStorage.setItem("token", json.token);
        _fetchTodos(dispatch);
      });
    },
    (err) => console.log(err)
  );
};
