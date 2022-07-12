import React from "react"
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import PropTypes from 'prop-types';


function Todo({ todo, index, markTodo, removeTodo, updateTodo}) {
    return (
      <div className="todo">
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

  Todo.propTypes = {
    todo: PropTypes.object.isRequired,
    index:PropTypes.number.isRequired, 
    markTodo: PropTypes.func.isRequired, 
    removeTodo: PropTypes.func.isRequired, 
    updateTodo: PropTypes.func.isRequired,
  }

  Todo.defaultProps= {
    todo: [{text:'',date: '2022-07-21', isDone:false}],

  }


  export default Todo