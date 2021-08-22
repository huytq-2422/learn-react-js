import "../App.css";
import React, {useState} from "react";

function ColorPicker(props) {

    const COLORS = ["red", "green", "blue", "#ccc"]

    const [selectedColor, setSelectedColor] = useState("red")

    function handleColorClick(newColor) {
        setSelectedColor(newColor)
    }

    const colorElements = () => {
        return COLORS.map((color) => {
            return <div className="col-sm-2">
                <div
                    className={`square ${selectedColor === color ? "border border-dark border-3" : "border-0"}`}
                    style={{backgroundColor: color}}
                    onClick={() => handleColorClick(color)}
                />
            </div>
        })
    }

    return (
        <div className="col-12 col-lg-6 mb-3">
            <div className="card border-info">
                <div className="card-header bg-info text-white">
                    Color Picker
                </div>
                <div className="card-body container pt-2">
                    <div className="row pb-2 mb-2 border-bottom border-muted d-flex justify-content-center">
                        {
                            colorElements()
                        }
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="col-3 col-lg-6 justify-content-center">
                            <div className="square color-box rounded-3"
                                 style={{backgroundColor: selectedColor}}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ColorPicker;
