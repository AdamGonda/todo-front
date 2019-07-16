import { compose, createStore, combineReducers, applyMiddleware } from 'redux'
import { app } from './reducers/app'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
	app
})

const enhancer = compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default createStore(rootReducer, enhancer)
