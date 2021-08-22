import './App.css';
import ToDoForm from "./Components/ToDoForm";
import {useState} from "react";
import ToDoStatus from "./Components/ToDoStatus";
import ToDoList from "./Components/ToDoList";

function App() {

    const [formVisible, setFormVisible] = useState(false)
    const STATUSES = [
        {title: "Choose ...", color: "bg-white"},
        {title: "Active", color: "bg-danger"},
        {title: "Hide", color: "bg-info"},
    ]
    const [tasks, updateTasks] = useState(() => {
        return [
            {
                id: 1,
                name: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
                status: 1
            },
            {
                id: 2,
                name: "At vero eos et accusamus et iusto odio dignissimost quas molestias excepturi sint",
                status: 2
            },
        ]
    })

    function handleVisibleForm(isVisible) {
        setFormVisible(isVisible)
    }

    function handleCreateNewTask(task) {
        updateTasks([...tasks, task])
    }

    function handleDeleteTask(task) {
        updateTasks(tasks.filter(element => element.id !== task.id))
    }

    return (
        <div className="container">
            <h1 className="text-center p-2 border-bottom">To Do List</h1>

            <div className="row">
                <ToDoForm
                    statuses={STATUSES}
                    isVisible={formVisible}
                    onCloseForm={() => handleVisibleForm(false)}
                    onCreateTask={handleCreateNewTask}
                />

                <ToDoList
                    tasks={tasks}
                    statuses={STATUSES}
                    formVisible={formVisible}
                    handleShowForm={() => handleVisibleForm(true)}
                    handleDeleteTask={handleDeleteTask}
                    handleEditTask={(task) => console.log(task)}
                />
            </div>
        </div>
    );
}

export default App;
