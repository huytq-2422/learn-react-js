import '../../App.css';
import PropTypes from "prop-types";
import {useState} from "react";
import ToDoStatus from "../ToDoStatus";

ToDoList.propTypes = {
    tasks: PropTypes.array,
    statuses: PropTypes.array,
    formVisible: PropTypes.bool,
    handleShowForm: PropTypes.func,
    handleDeleteTask: PropTypes.func,
    handleEditTask: PropTypes.func,
}

ToDoList.defaultProps = {
    tasks: [],
    statuses: [],
    formVisible: false,
    handleShowForm: () => {
    },
    handleDeleteTask: () => {
    },
    handleEditTask: () => {
    },
}

function ToDoList(props) {

    const [name, setName] = useState("")
    const [status, setStatus] = useState("")


    function onSubmit(e) {
        e.preventDefault()
        const task = {
            name,
            status
        }
        props.onCreateTask(task)
    }

    function onInputNameChange(e) {
        setName(e.target.value)
    }

    function getTaskItems() {
        return props.tasks.map((element, index) => {
            const className = element.status === 0 ? "" : `badge ${ props.statuses[element.status].color}`
            return <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{element.name}</td>
                <td className="text-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className={className}>
                            {props.statuses[element.status].title}
                        </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex justify-content-center flex-wrap">
                        <button
                            className="btn btn-warning text-white m-1"
                            onClick={() => props.handleEditTask(element)}>

                            <a href="#" className="bi bi-pencil text-white me-2"/>
                            Edit
                        </button>
                        <button
                            className="btn btn-danger text-white m-1"
                            onClick={() => props.handleDeleteTask(element)}>
                            <a href="#" className="bi bi-trash-fill text-white me-2"/>

                            Delete
                        </button>
                    </div>
                </td>
            </tr>
        })
    }

    return (
        <div className={`${props.formVisible ? "col-8" : "col-12"}`}>
            <button
                className="btn btn-primary my-2"
                type="button"
                onClick={props.handleShowForm}>
                <a href="" className="bi bi-plus-lg text-white me-2"/>
                New Task
            </button>

            <div className="row my-3">
                <div className="col-6">
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Enter keyword ... "
                               aria-label="Task's name"/>

                        <button className="btn btn-primary" type="button">
                            <a href="" className="bi bi-search text-white me-2"/>
                            Search
                        </button>
                    </div>
                </div>
                <div className="col-6">
                    <button className="btn btn-primary" type="button">
                        Sort
                        <a href="" className="bi bi-filter-square text-white ms-2"/>
                    </button>
                </div>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col" className="text-center">STT</th>
                    <th scope="col" className="text-center">Name</th>
                    <th scope="col" className="text-center">Status</th>
                    <th scope="col" className="text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td scope="row"/>
                    <td>
                        <input type="text"
                               className="form-control"
                               placeholder=""/>
                    </td>
                    <td>
                        <ToDoStatus
                            statuses={props.statuses}
                            onSelectStatus={(value) => {
                                console.log(value)
                            }}
                        />
                    </td>
                    <td/>
                </tr>
                {
                    getTaskItems()
                }
                </tbody>
            </table>
        </div>
    );
}

export default ToDoList;
