import React from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';





function FormTodo({ addTodo }) {
    const [text, setText] = React.useState("");
    const [date, setDate] = React.useState("");

  
    const handleSubmit = e => {
      e.preventDefault();
      if (!text & !date) return;
      const id=uuidv4();
      addTodo(text,date,id);
      setText("");
      setDate("");

    };
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Label htmlFor="text"><b>Add New Task</b></Form.Label>
        <Form.Control id="text" type="text" className="input" value={text} onChange={e => setText(e.target.value)} placeholder="Add new todo" />
        <br></br>
        <Form.Label htmlFor="date"><b>Add Date to task</b></Form.Label>
        <Form.Control id="date" type="date" className="input" value={date} onChange={e => setDate(e.target.value)}  />
      </Form.Group>
      <br></br>
      <Button variant="secondary mb-3" id="button" onClick={e=>handleSubmit(e)}>
        Submit
      </Button>
    </Form>
    );
  }

  FormTodo.propTypes = {
    addTodo: PropTypes.func.isRequired,
    
  }

  export default FormTodo