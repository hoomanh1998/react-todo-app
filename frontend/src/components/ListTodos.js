import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';


import EditTodo from './EditTodo';

const ListTodos = () => {

    const [todos, setTodos] = useState([]);

    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.t_id !== id))
        } catch (error) {
            console.log(error.message);
        }
    }

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:5000/todos");
            const jsonData = await response.json()
            setTodos(jsonData)
        } catch (error) {
            console.log(error.message);
        }
    }

    const filterTodos = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/filter/${id}`);
            const jsonData = await response.json()
            setTodos(jsonData)
        } catch (error) {
            console.log(error.message);
        }
    }

    const toggleTodoHandler = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/toggletodo/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });
            getTodos();
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return (
        <>
            <>
                <Button className="mx-1" onClick={() => filterTodos(0)} variant="secondary">All</Button>
                <Button className="mx-1" onClick={() => filterTodos(1)} variant="secondary">Completed</Button>
                <Button className="mx-1" onClick={() => filterTodos(2)} variant="secondary">Not Completed</Button>
            </>
            {todos.length !== 0 ?
                <>
                    <h5 className="my-5">There are {todos.length} todos.</h5>
                    <Table
                        striped bordered style={{ fontSize: "1.2rem" }}>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Check</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(todos.length)}
                            {todos.map(todo => (
                                <tr key={todo.t_id}>
                                    <td
                                        className="w-80"
                                        style={{ width: "80%", maxWidth: "100px", textOverflow: "ellipsis", overflow: "hidden", verticalAlign: "middle" }}>
                                        {todo.t_description}
                                    </td>
                                    <td>
                                        <input
                                            onChange={() => toggleTodoHandler(todo.t_id)}
                                            checked={todo.t_complete ? true : false}
                                            style={{ width: "25px", height: "25px", cursor: "pointer", verticalAlign: "middle" }}
                                            type="checkbox" />
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <EditTodo todo={todo} />
                                    </td>
                                    <td style={{ width: "10%" }}>
                                        <Button
                                            variant="danger"
                                            onClick={() => deleteTodo(todo.t_id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>

                : <h3>There is nothing to show</h3>}
        </>
    )
}

export default ListTodos;
