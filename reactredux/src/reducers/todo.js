import axios from "axios";

const initialTodoState = {
    items: []
}

export const ADD_TODO = "ADD_TODO"
export const SET_TODOS = "SET_TODOS"

const createTodo = (text) => ({
    id: new Date().getMilliseconds(),
    title: text
})
export const addTodo = (text) => ({
        type: ADD_TODO,
        payload: createTodo(text)
    }
)
export const setTodos = (items) => (
    {
        type: SET_TODOS,
        payload: items
    }
)

export const fetchTodos = () => async (dispatch) => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
    dispatch(setTodos(response.data))
}

const todoReducer = (state = initialTodoState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case SET_TODOS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state
    }
}
export default todoReducer;