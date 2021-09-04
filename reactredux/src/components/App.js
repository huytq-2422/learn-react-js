import '../App.css';
import {Provider} from "react-redux";
import store from "../reducers/store";
import Login from "../containers/Login";
import ToDoApp from "../containers/ToDoApp";

function App({auth}) {


    return (
        <div className="container mt-5">
            {
                !auth.token ? <Login/> : <ToDoApp/>
            }
        </div>
    );
}

export default App;