import React from "react";
import "./App.css";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTodo from "./components/FormTodo";
import Todo from "./components/Todo"

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "This is a sampe todo",
      date:"2022-07-21",
      isDone: false
    }
  ]);
  const addTodo = (text,date )=> {
    const newTodos = [...todos, { text ,date}];
    setTodos(newTodos);
  };
  
  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone
    setTodos(newTodos);
  };
  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const updateTodo = index => {
    const newTodos = [...todos];
    const item = newTodos[index];
    let newText = prompt(`Update ${item.text}?`, item.text);
    let todoObj = { text: newText, date:item.date };
    newTodos.splice(index, 1, todoObj);
    if (newText === null || newText === "") {
      return;
      } else {
      item.text = newText;
      }
    setTodos(newTodos);

  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">My Agenda</h1>
        <FormTodo addTodo={addTodo} />
        <div>
          <Card>
            <Card.Header>
              <div className="todo">
                <span>Date</span>
                <span>Task</span>
                <span>Actions</span>
              </div>
            
            </Card.Header>
          </Card>
          {todos.map((todo, index) => (
            <Card>
              <Card.Body>
                <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
