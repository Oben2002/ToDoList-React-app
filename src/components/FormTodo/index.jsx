import React from "react";
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";



function FormTodo({ addTodo }) {
    const [text, setText] = React.useState("");
    const [date, setDate] = React.useState("");

  
    const handleSubmit = e => {
      e.preventDefault();
      if (!text & !date) return;
      addTodo(text,date);
      setText("");
      setDate("");

    };
  
    return (
      <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Label><b>Add New Task</b></Form.Label>
        <Form.Control type="text" className="input" value={text} onChange={e => setText(e.target.value)} placeholder="Add new todo" />
        <br></br>
        <Form.Label><b>Add Date to task</b></Form.Label>
        <Form.Control type="date" className="input" value={date} onChange={e => setDate(e.target.value)}  />
      </Form.Group>
      <br></br>
      <Button variant="secondary mb-3" type="submit">
        Submit
      </Button>
    </Form>
    );
  }

  export default FormTodo