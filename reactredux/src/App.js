import './App.css';
import ToDoApp from "./containers/ToDoApp";
import {Provider} from "react-redux";
import store from "./reducers/store";

function App() {


    return (
        <div>
            <Provider store={store}>
                <ToDoApp />
            </Provider>,

        </div>
    );
}

export default App;