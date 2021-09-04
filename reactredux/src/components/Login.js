import React, {useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

function Login({login}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Label><h2>Login</h2></Label>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email"
                       name="email"
                       id="exampleEmail"
                       placeholder="with a placeholder"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                />
            </FormGroup>
            <FormGroup className="mt-2">
                <Label for="examplePassword">Password</Label>
                <Input type="password"
                       name="password"
                       id="examplePassword"
                       placeholder="password placeholder"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                />
            </FormGroup>
            <Button className="mt-5">Submit</Button>
        </Form>
    );
}

export default Login;