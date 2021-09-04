import './App.css';
import {Provider} from "react-redux";
import store from "./reducers/store";
import Login from "./containers/Login";
import ToDoApp from "./containers/ToDoApp";

function App() {


    return (
        <div className="container mt-5">
            <Provider store={store}>
                <Login/>
                <ToDoApp/>
            </Provider>,

        </div>
    );
}

export default App;