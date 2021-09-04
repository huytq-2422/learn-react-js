import {applyMiddleware, combineReducers, createStore} from "redux";
import todoReducer, {ADD_TODO} from "./todo";

const reducer = combineReducers({
    todo: todoReducer
})

const asyncMiddleware = store => next => action => {
    if(typeof action === 'function') {
        return action(next)
    }
    return next(action)
}

const store = createStore(
    reducer,
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(asyncMiddleware)
)
export default store