import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const InputTodo = () => {

    const [description, setDescription] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (description !== "") {
            try {
                const body = { description };
                await fetch("http://localhost:5000/todos", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                });
                window.location = '/';
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    return (
        <>
            <h1 className="mb-5 p-3 text-center">Todo List</h1>
            <Form className="d-flex justify-content-center m-5" inline onSubmit={onSubmitForm}>
                <Form.Control
                    className="mr-2 w-75"
                    type="text"
                    placeholder="Enter your todo..."
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
                <Button variant="success" type="submit">Add Todo</Button>
            </Form>
        </>
    )
}

export default InputTodo;
