import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditTodo = ({ todo }) => {

    const [description, setDescription] = useState(todo.t_description)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setDescription(todo.t_description)
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const updateDescription = async (e, id) => {
        e.preventDefault();
        try {
            const body = { description };
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            window.location = "/";
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea
                        className="form-control"
                        style={{minHeight:"100px"}}
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                </Modal.Body>
                <Modal.Footer className="justify-content-between">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" type="submit" onClick={e => updateDescription(e, todo.t_id)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditTodo;