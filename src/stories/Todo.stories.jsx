import Todo from '../components/Todo';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
//import {markTodo, addTodo,updateTodo, removeTodo} from '../App';


export default {
    title: 'Todo',
    component: Todo,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: { markTodo: { action: "markTodo" } }


}

const Template = (args) => <Todo {...args} />;

export const Default= Template.bind({})
Default.args={
    todo: {
        text: "This is a sampe todo",
        date:"2022-07-21",
        isDone: false
      },
    index:0, 
    markTodo: ()=> {

        }

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
