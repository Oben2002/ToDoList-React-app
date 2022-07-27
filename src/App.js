import React,{useState } from "react";
import "./App.css";
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormTodo from "./components/FormTodo";
import Todo from "./components/Todo";
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import DragAndDrop from "./components/DragAndDrop";
// import ImageList from "./components/ImageList";
//import cuid from "cuid";
//import { DndProvider } from "react-dnd";
//import {HTML5Backend} from "react-dnd-html5-backend";
//import {TouchBackend }from "react-dnd-touch-backend";
//import update from "immutability-helper";
//import { isTouchDevice } from "./utils";

import "./App.css";

//const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;



  const onDragEnd = (result, columns, setColumns) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;
  
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

function App() {
  //const [images, setImages] = useState([]);
  
  const [todos, setTodos] = useState([
    {
      text: "This is a sampe todo",
      date:"2022-07-21",
      isDone: false
    }
  ]);
  const itemsFromBackend =[
    {id:uuidv4(), content:'First task'},
    {id:uuidv4(), content:'Second task'},
    {id:uuidv4(), content:'Third task'},
    {id:uuidv4(), content:'Fourth task'},
  
  ];
  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Requested",
      items: itemsFromBackend
    },
    [uuidv4()]: {
      name: "To do",
      items: []
    },
    [uuidv4()]: {
      name: "In Progress",
      items: []
    },
    [uuidv4()]: {
      name: "Done",
      items: []
    }
  };
  const [columns, setColumns]=useState(columnsFromBackend);
  
  
  
  
  
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
      // const onDrop = useCallback(acceptedFiles => {
      //   // Loop through accepted files
      //   acceptedFiles.map(file => {
      //     // Initialize FileReader browser API
      //     const reader = new FileReader();
      //     // onload callback gets called after the reader reads the file data
      //     reader.onload = function(e) {
      //       // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
      //       setImages(prevState => [
      //         ...prevState,
      //         { id: cuid(), src: e.target.result }
      //       ]);
      //     };
      //     // Read the file as Data URL (since we accept only images)
      //     reader.readAsDataURL(file);
      //     return file;
      //   });
      // }, []);
  

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
            <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
              
              {/* <DragAndDrop onDrop={onDrop} accept={"image/png"}/>
              {images && images.length > 0 && (
                <h3 className="text-center">Drag the Images to change positions</h3>
              )}
              
                <ImageList images={images} /> */}
              

            </Card>
          
        </div>
      </div>
    </div>
  );
}

export default App;
