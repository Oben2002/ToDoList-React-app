import App from '../App';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";


export default {
    title: 'Todo',
    component: App,
    parameters: {
        layout: 'fullscreen',
    },

}

const Template = () => <App  />;

export const Default= Template.bind({});
Default.args={
    todos: [
        {
        text: "This is a sampe todo",
        date:"2022-07-21",
        isDone: false
      },
      {
        text: "This is a sampe todo",
        date:"2022-07-21",
        isDone: false
      },
    ]
}

export const listWithItems= Template.bind({});
listWithItems.args={
    todo: 
    {
        text:'go to the pharmacy',
        date: '2022-07-21', 
        isDone:false
    },
    index:0, 
}
