import '../App.css';
import {Component} from "react";

class Result extends Component {

    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="text-dark p-2">Color: red</div>
                    <div className="text-dark p-2">Font: 12px</div>
                </div>
                <div className="input-group mb-3">
                    <input type="text"
                           className="form-control"
                           placeholder="Content setting"
                           aria-label="Content setting"
                           aria-describedby="basic-addon1"
                    />
                </div>
            </div>
        )
    }

    export
    default
    App;


}

export default Result;