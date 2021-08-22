import '../../App.css';
import PropTypes from "prop-types";
import {useState} from "react";
import ToDoStatus from "../ToDoStatus";

ToDoForm.propTypes = {
    statuses: PropTypes.array,
    isVisible: PropTypes.bool,
    onCloseForm: PropTypes.func,
    onCreateTask: PropTypes.func
}

ToDoForm.defaultProps = {
    statuses: [],
    isVisible: false,
    onCloseForm: () => {
    },
    onCreateTask: () => {
    }
}

function ToDoForm(props) {

    const [name, setName] = useState("")
    const [status, setStatus] = useState("")


    function onSubmit(e) {
        e.preventDefault()
        const task = {
            id: new Date().getMilliseconds(),
            name,
            status
        }
        props.onCreateTask(task)
    }

    function onInputNameChange(e) {
        setName(e.target.value)
    }

    return (
        <div className={`col-4 mt-5 ${props.isVisible ? "visible" : "d-none"}`}>
            <div className={`card border border-warning `}>
                <div className="card-header d-flex justify-content-between bg-warning">
                    New task
                    <a className="bi bi-x-circle-fill text-dark"
                       role="button"
                       onClick={props.onCloseForm}/>
                </div>
                <div className="card-body">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label"><b>Name</b></label>
                            <input type="text"
                                   className="form-control"
                                   value={name}
                                   onChange={onInputNameChange}
                                   placeholder="Name ..."
                                   aria-describedby="Input name"/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><b>Status</b></label>
                            <ToDoStatus
                                statuses={props.statuses}
                                onSelectStatus={(value) => setStatus(value)}
                            />
                        </div>
                        <div className="d-flex justify-content-center flex-wrap">
                            <button type="button"
                                    className="btn btn-secondary mx-2"
                                    onClick={props.onCloseForm}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary mx-2">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ToDoForm;
