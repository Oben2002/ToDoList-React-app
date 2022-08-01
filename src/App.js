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
      id:uuidv4(),
      text: "This is a sampe todo",
      date:"2022-07-21",
      isDone: false
    }
  ]);
  /* const itemsFromBackend =[
    {id:uuidv4(), content:'First task'},
    {id:uuidv4(), content:'Second task'},
    {id:uuidv4(), content:'Third task'},
    {id:uuidv4(), content:'Fourth task'},
  
  ]; */
  console.log(todos);
  const [itemsFromBackend, setItems]=useState(todos);
    
  console.log("before itemsFromBackend:", itemsFromBackend);

  
  const columnsFromBackend = [
    {
      name: "Requested",
      items: itemsFromBackend,
      id:uuidv4()
    },
     {
      name: "To do",
      items: [],
      id:uuidv4()
    },
     {
      name: "In Progress",
      items: [],
      id:uuidv4()
    },
    {
      name: "Done",
      items: [],
      id:uuidv4()
    }
  ];
  const [columns, setColumns]=useState(columnsFromBackend);
  console.log("columns:" ,columnsFromBackend);

  console.log("type::" ,typeof columnsFromBackend);
  




  const currentRequestedId= columnsFromBackend.findIndex(e=>e.name==="Requested");
  console.log(currentRequestedId);
 
  
  
  
  
  
  
  const addTodo = (text,date,id)=> {
    const newTodos = [...todos, { id,text ,date}];
    console.log("newTodos",newTodos);

    setTodos(newTodos);

    const news = [...columns[0].items, { id,text ,date}];
    
    setItems(newTodos);
    
    
    console.log("itemsFromBackend:", itemsFromBackend);
    
    setColumns({
      ...columns,
      0: {
        ...columns,
        name:"Requested",
        items: news
      }
    });
    console.log("columns when added:",columns);
   
    /* setColumns({
      ...columns,
      [id]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    }); */
  };
  
  const markTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isDone = !newTodos[index].isDone
    setTodos(newTodos);
  };
  const removeTodo = (index, text) => {
    const newTodos = [...todos];
    const itemsCol1 = [...columns[0].items];
    const itemsCol2 = [...columns[1].items];
    const itemsCol3 = [...columns[2].items];
    const itemsCol4 = [...columns[3].items];


    for (var i in itemsCol1){
      if (itemsCol1[i].text===text){
        itemsCol1.splice(i,1);
        console.log(itemsCol1);
      }  
    }
    for (var j in itemsCol2){
      if (itemsCol2[j].text===text){
        itemsCol2.splice(j,1);
        console.log(itemsCol2);
      }  
    }
    for (var k in itemsCol3){
      if (itemsCol3[k].text===text){
        itemsCol3.splice(k,1);
        console.log(itemsCol3);
      }  
    }
    for (var l in itemsCol4){
      if (itemsCol4[l].text===text){
        itemsCol4.splice(l,1);
        console.log(itemsCol4);
      }  
    }


    newTodos.splice(index, 1);

    setTodos(newTodos);
    setColumns({
      ...columns,
      0: {
        ...columns,
        name:"Requested",
        items: itemsCol1
      },
      1: {
        ...columns,
        name:"To do",
        items: itemsCol2
      },
      2: {
        ...columns,
        name:"In Progress",
        items: itemsCol3
      },
      3: {
        ...columns,
        name:"Done",
        items: itemsCol4
      }
    });
  };
  const updateTodo = (index,texts,dates) => {
    var newTodos = [...todos];
    var item = newTodos[index];
    const chText=item.text;
    const chDate=item.date;

      
      if (texts ==="") {
        texts= chText;
      } 
      if (dates===""){
        dates= chDate;
      }
      
        item.text = texts;
        item.date = dates;
        //let todoObj = { text: texts, date:dates };
        newTodos.splice(index, 1, item);
        console.log(newTodos);

        const itemsCol1 = [...columns[0].items];
    const itemsCol2 = [...columns[1].items];
    const itemsCol3 = [...columns[2].items];
    const itemsCol4 = [...columns[3].items];


    for (var i in itemsCol1){
      if (itemsCol1[i].text===texts && itemsCol1[i].date===dates){
        itemsCol1.splice(i,1,item);
        console.log("itemsCol1:",itemsCol1);
      }  
    }
    for (var j in itemsCol2){
      if (itemsCol2[j].text===texts && itemsCol2[j].date===dates){
        itemsCol2.splice(j,1,item);
        console.log(itemsCol2);
      }  
    }
    for (var k in itemsCol3){
      if (itemsCol3[k].text===texts && itemsCol3[k].date===dates){
        itemsCol3.splice(k,1,item);
        console.log(itemsCol3);
      }  
    }
    for (var l in itemsCol3){
      if (itemsCol3[l].text===texts && itemsCol3[l].date===dates){
        itemsCol3.splice(l,1,item);
        console.log(itemsCol4);
      }  
    }



    setTodos(newTodos);
    setColumns({
      ...columns,
      0: {
        ...columns,
        name:"Requested",
        items: itemsCol1
      },
      1: {
        ...columns,
        name:"To do",
        items: itemsCol2
      },
      2: {
        ...columns,
        name:"In Progress",
        items: itemsCol3
      },
      3: {
        ...columns,
        name:"Done",
        items: itemsCol4
      }
    });

      };
  
  

  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">My Agenda</h1>
        <FormTodo addTodo={addTodo} />
        <div style={{ margin: 15 }}>
            <Card >
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
              <Card.Body style={{ display: "flex", justifyContent: "center", height: "100%",margin:0}}>
              
              
            
                </Card.Body>

                </Card>
      <Card>
        <Card.Body>
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
                                    {item.text}
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
        </Card.Body>
              

            </Card>
          
        </div>
      </div>
      </div>
  );
}

export default App;
