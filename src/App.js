import React,{useState,useCallback } from "react";
import "./App.css";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTodo from "./components/FormTodo";
import Todo from "./components/Todo";
import DragAndDrop from "./components/DragAndDrop";
import ImageList from "./components/ImageList";
import cuid from "cuid";
import { DndProvider } from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {TouchBackend }from "react-dnd-touch-backend";
import update from "immutability-helper";
import { isTouchDevice } from "./utils";

import "./App.css";

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;


function App() {
  const [images, setImages] = useState([]);

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    setImages(
      update(images, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };


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

      };
      const onDrop = useCallback(acceptedFiles => {
        // Loop through accepted files
        acceptedFiles.map(file => {
          // Initialize FileReader browser API
          const reader = new FileReader();
          // onload callback gets called after the reader reads the file data
          reader.onload = function(e) {
            // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
            setImages(prevState => [
              ...prevState,
              { id: cuid(), src: e.target.result }
            ]);
          };
          // Read the file as Data URL (since we accept only images)
          reader.readAsDataURL(file);
          return file;
        });
      }, []);
  

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
                updateTodo={updateTodo}
                />
                
              </Card.Body>
            </Card>
            <Card>

              <DragAndDrop onDrop={onDrop} accept={"image/*"}/>
                  {images && images.length > 0 && (
                    <h3 className="text-center">Drag the Images to change positions</h3>
                  )}
              <DndProvider backend={backendForDND}>
                <ImageList images={images} moveImage={moveImage} />
              </DndProvider>

            </Card>
          
        </div>
      </div>
    </div>
  );
}

export default App;
