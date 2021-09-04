import Login from "../components/Login";
import {connect} from "react-redux";

const {login} = require("../reducers/auth");

const mapActionToProps = {login}

export default connect(null, mapActionToProps)(Login)