import '../../App.css';
import PropTypes from "prop-types";
import {useState} from "react";

ToDoStatus.propTypes = {
    statuses: PropTypes.array,
    onSelectStatus: PropTypes.func
}

ToDoStatus.defaultProps = {
    statuses: [],
    onSelectStatus: (value) => {}
}

function ToDoStatus(props) {

    const [status, setStatus] = useState("")

    function onSelect(e) {
        setStatus(e.target.value)
        props.onSelectStatus(e.target.value)
    }

    return (
        <div className="input-group">
            <select className="form-select"
                    value={status}
                    onChange={onSelect}>
                {
                    props.statuses.map((element, index) => {
                        return <option key={index} value={index}>{element.title}</option>
                    })
                }
            </select>
        </div>
    );
}

export default ToDoStatus;
