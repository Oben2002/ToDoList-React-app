import React ,{useState} from "react"
import { Button,Modal,Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../App.css";
import PropTypes from 'prop-types';
import {useSortableData} from '../../hooks/useSortableData';


function Todo({ todos, markTodo, removeTodo, updateTodo}) {

  const [show, setShow] = useState(false);
  const [newDate, setDate]=useState("");
  const [newTask, setTask]=useState("");
  const [date, setNewDate]=useState("");
  const [text, setText]=useState("");
  const [index, setIndex]=useState("");
  const {items,requestSort,sortConfig } = useSortableData(todos);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


  const handleClose = () => setShow(false);
  const handleShow = (text,date,index) =>{
                    setShow(true);
                    setNewDate(date);
                    setText(text);
                    setIndex(index);

                     } 
                      
  const handleSubmit = e => {
    e.preventDefault();
    if (!newTask & !newDate) return;
    updateTodo(index,newTask,newDate);
    setTask("");
    setDate("");

  };



    return (


      <div className="todo">
        <table>
      <caption>Tasks</caption>
      <thead>
        <tr>
          <th><button type="button" onClick={() => requestSort('date')} className={getClassNamesFor('date')}
>
              Date
            </button></th>
          <th><button type="button" onClick={() => requestSort('text')} className={getClassNamesFor('text')}
>
              Task
            </button></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((todo, index) => (
          <tr key={index} index={index}>
            <td style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.date}</td>
            <td style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</td>
            <td><Button variant="outline-success" onClick={() => markTodo(index)}>✓</Button>{' '}
          <Button variant="outline-primary" onClick= {() => handleShow(todo.text,todo.date,index)}>Update </Button>{' '}
          <Button variant="outline-danger" onClick={() => removeTodo(index)}>✕</Button></td>
          </tr>
        ))}
      </tbody>
    </table>
{/*         <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.date}</span>
        <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span> */}
        <div>
          
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}> 
      <Form.Group>
        <Form.Label htmlFor="text"><b>Modify Task</b></Form.Label>
        <Form.Control id="text" type="text" className="input" defaultValue={text} onChange={e => setTask(e.target.value)}  />
        <br></br>
        <Form.Label htmlFor="date"><b>Modify Date to task</b></Form.Label>
        <Form.Control id="date" type="date" className="input" defaultValue={date} onChange={e => setDate(e.target.value)}  />
      </Form.Group>
      <br></br>
      <Button variant="secondary mb-3" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }

  Todo.propTypes = {
    todos: PropTypes.array, 
    markTodo: PropTypes.func, 
    removeTodo: PropTypes.func, 
    updateTodo: PropTypes.func,
  }

  Todo.defaultProps= {
    todo: {text:'',date: '2022-07-21', isDone:false},

  }


  export default Todo