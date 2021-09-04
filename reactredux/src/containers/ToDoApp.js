import {connect} from "react-redux";
import ToDoApp from "../components/ToDoApp";
import {addTodo, fetchTodos, setTodos} from "../reducers/todo";
import axios from "axios";

const mapStateToProps = (state) => {
    return {
        todos: state.todo.items
    }
}

const mapActionToProps = dispatch => ({
    addTodo: (text) => dispatch(addTodo(text)),
    setTodos : (items) => dispatch(setTodos(items)),
    fetchTodos : () => dispatch(fetchTodos())
})

export default connect(mapStateToProps, mapActionToProps)(ToDoApp)