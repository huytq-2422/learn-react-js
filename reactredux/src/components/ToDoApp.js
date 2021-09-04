import React, {useEffect, useState} from 'react';
import {Button, Container, Input, InputGroup, InputGroupAddon, ListGroup, ListGroupItem} from "reactstrap";
import PropTypes from "prop-types";
import axios from "axios";
import {setTodos} from "../reducers/todo";

ToDoApp.propTypes = {
    todos: PropTypes.array,
    addTodo: PropTypes.func,
    fetchTodos: PropTypes.func
};

function ToDoApp(props) {
    const [text, setText] = useState("")

    useEffect(() => {
        props.fetchTodos()
    }, [])

    return (
        <Container className="mt-5 mx-5">
            <InputGroup>
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <InputGroupAddon addonType="prepend">
                    <Button onClick={() => props.addTodo(text)}>Add</Button>
                </InputGroupAddon>
            </InputGroup>
            <ListGroup className="mt-5">
                {
                    props.todos.map(item => (
                        <ListGroupItem key={item.id} className="justify-content-between">
                            {item.title}
                        </ListGroupItem>
                    ))

                }
            </ListGroup>
        </Container>
    );
}

export default ToDoApp;