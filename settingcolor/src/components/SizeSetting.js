import '../App.css';
import React, {Component} from "react";

class SizeSetting extends Component {

    render() {
        return (
            <div className="col-12 col-lg-6 mb-3">
                <div className="card border-secondary">
                    <div className="card-header bg-light text-secondary">
                        Size : 12px
                    </div>
                    <div className="card-body container pt-2">
                        <button type="button" className="btn btn-success me-3">Decrease</button>
                        <button type="button" className="btn btn-success">Increase</button>
                    </div>
                </div>

                <button type="button" className="btn btn-info mt-3">Reset</button>
            </div>
        )
    }
}

export default SizeSetting;
