import React from 'react';
import './App.css';

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import Container from 'react-bootstrap/Container';

function App() {
  return (
    <div className="App">
      <>
        <Container className="my-5">
          <InputTodo />
          <ListTodos />
        </Container>
      </>
    </div>
  );
}

export default App;
