import {combineReducers} from "redux";
import todoReducer from "./todo";
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./auth";

const reducer = combineReducers({
    todo: todoReducer,
    auth: authReducer
})

// const asyncMiddleware = store => next => action => {
//     if(typeof action === 'function') {
//         return action(next)
//     }
//     return next(action)
// }

// const store = createStore(
//     reducer,
//     //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     applyMiddleware(thunk)
// )
export default configureStore({reducer})