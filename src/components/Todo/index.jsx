import React from "react"
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";


function Todo({ todo, index, markTodo, removeTodo, updateTodo}) {
    return (
      <div
        className="todo"
      >
        <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.date}</span>
        <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
        <div>
          <Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
          <Button variant="outline-primary" onClick={() => updateTodo(index)}>Update</Button>{' '}
          <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button>
        </div>
      </div>
    );
  }

  export default Todo