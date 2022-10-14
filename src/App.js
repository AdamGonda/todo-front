import React from "react";
import { connect } from "react-redux";
import { TODO_STAUSES } from "./redux/reducers/app";
import {
  add,
  remove,
  toggle,
  toggleAll,
  changeTitle,
  changeTitleOnTyping,
  changeFilter,
  FILTER_TYPES,
  clearCompletedTodos,
  fetchTodos,
  changeUsernameOnTyping,
  changePasswordOnTyping,
  signin,
} from "./redux/actions/app";
import "./App.css";

const App = ({
  todos,
  add,
  remove,
  toggle,
  toggleAll,
  changeTitle,
  changeTitleOnTyping,
  isAllTaggled,
  changeFilter,
  activeFilter,
  clearDoneTodos,
  initTodos,
  changeUsernameOnTyping,
  changePasswordOnTyping,
  username,
  password,
  signin,
}) => {
  React.useEffect(() => {
    initTodos();
  }, []);

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      add(e.currentTarget.value);
      e.currentTarget.value = "";
    }
  };

  const handleSignin = (e) => {
    signin(username, password);
  };

  return (
    <section>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => changeUsernameOnTyping(e.currentTarget.value)}
          placeholder="username"
        />
        <input
          type="text"
          value={password}
          onChange={(e) => changePasswordOnTyping(e.currentTarget.value)}
          placeholder="password"
        />
        <button type="submit" onClick={handleSignin}>
          Submit
        </button>
      </div>
      <div id="app">
        <h1 id="title">todos</h1>
        <div>
          <div id="header">
            {todos.length <= 0 ? null : (
              <span
                id="toggleAll"
                onClick={toggleAll}
                className={isAllTaggled == true ? "active" : ""}
              >
                V
              </span>
            )}
            <input type="text" onKeyPress={handleSubmit} />
          </div>
          <div id="body">
            <ul id="todos">
              {todos
                .filter((todo) => {
                  if (activeFilter == FILTER_TYPES.ALL) {
                    return true;
                  } else if (activeFilter == FILTER_TYPES.ACTIVE) {
                    return todo.status == TODO_STAUSES.ACTIVE;
                  } else if (activeFilter == FILTER_TYPES.COMPLETE) {
                    return todo.status == TODO_STAUSES.COMPLETE;
                  }
                })
                .map((todo) => {
                  return (
                    <li
                      className={
                        "todo " +
                        (todo.status == TODO_STAUSES.COMPLETE ? "done" : "")
                      }
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
                        onChange={(e) =>
                          changeTitleOnTyping(todo.id, e.currentTarget.value)
                        }
                        onBlur={(e) =>
                          changeTitle(todo.id, e.currentTarget.value)
                        }
                      />
                      <button onClick={() => remove(todo.id)}>X</button>
                    </li>
                  );
                })}
            </ul>
            <div id="footer">
              <span id="items-left">
                {todos.length} item{todos.length > 1 ? "s" : null} left
              </span>
              <div id="controll-panel">
                <button
                  className={activeFilter == FILTER_TYPES.ALL ? "active" : ""}
                  onClick={() => changeFilter(FILTER_TYPES.ALL)}
                >
                  All
                </button>
                <button
                  className={
                    activeFilter == FILTER_TYPES.ACTIVE ? "active" : ""
                  }
                  onClick={() => changeFilter(FILTER_TYPES.ACTIVE)}
                >
                  Active
                </button>
                <button
                  className={
                    activeFilter == FILTER_TYPES.COMPLETE ? "active" : ""
                  }
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
  );
};

const mapStateToProps = (state) => {
  return {
    activeFilter: state.app.activeFilter,
    isAllTaggled: state.app.isAllTaggled,
    todos: state.app.todos,
    password: state.app.password,
    username: state.app.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: (title) => dispatch(add(title)),
    remove: (id) => dispatch(remove(id)),
    toggle: (id, status) => dispatch(toggle(id, status)),
    changeTitle: (id, title) => dispatch(changeTitle(id, title)),
    toggleAll: () => dispatch(toggleAll()),
    changeFilter: (type) => dispatch(changeFilter(type)),
    clearDoneTodos: () => dispatch(clearCompletedTodos()),
    initTodos: () => dispatch(fetchTodos()),
    changeTitleOnTyping: (id, value) =>
      dispatch(changeTitleOnTyping(id, value)),
    changePasswordOnTyping: (value) => dispatch(changePasswordOnTyping(value)),
    changeUsernameOnTyping: (value) => dispatch(changeUsernameOnTyping(value)),
    signin: (username, password) => dispatch(signin(username, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
