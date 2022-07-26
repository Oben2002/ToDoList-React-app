import React,{useState} from "react";
import "./App.css";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTodo from "./components/FormTodo";
import Todo from "./components/Todo"

function App() {
  const [todos, setTodos] = useState([
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
/* 
  const updateTodo = (index,texts,dates) => {
    const newTodos = [...todos];
    const item = newTodos[index];
      
      if (texts === "" || dates === "") {
        return;
        } 
      else {
        let todoObj = { text: texts, date:dates };
        newTodos.splice(index, 1, todoObj);
        item.text = texts;
        item.date = dates;
        }
        setTodos(newTodos);

      }; */
  
  

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">My Agenda</h1>
        <FormTodo addTodo={addTodo} />
        <div>
            <Card>
              <Card.Body>
                <Todo
                todos={todos}
                markTodo={markTodo}
                removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          
        </div>
      </div>
    </div>
  );
}

export default App;
