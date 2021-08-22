import './App.css';
import React from "react";
import ColorPicker from "./components/ColorPicker";
import SizeSetting from "./components/SizeSetting";
import Result from "./components/Result";

function App() {

    // const [color, setColor] = useState("red")
    // const [fontSize, setFontSize] = useState(15)

    return (
        <div className="m-5">
            <div className='container'>
                <div className='row'>
                    <ColorPicker/>
                    <SizeSetting/>
                </div>
                <Result/>
            </div>
        </div>
    )
}

export default App;
