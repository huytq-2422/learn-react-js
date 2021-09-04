import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    token: null
}

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess(state, action) {
            state.token = action.payload.token;
        }
    }
});

const {loginSuccess} = auth.actions

export const login = ({email, password}) => async dispatch => {
    const response = await axios.post("https://reqres.in/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
    })
    console.log(response.data, email, password)
    dispatch(loginSuccess(response.data))
}

export default auth.reducer