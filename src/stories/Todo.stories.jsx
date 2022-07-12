import Todo from '../components/Todo';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";


export default {
    title: 'Todo',
    component: Todo,
    parameters: {
        layout: 'centered',
    },

}

const Template = (args) => <Todo {...args} />;

export const Empty= Template.bind({});
Empty.args={
    todo: [{isDone:false}],
    index:0, 
}

export const listWithItems= Template.bind({});
listWithItems.args={
    todo: [{text:'',date: '2022-07-21', isDone:false},{text:'eat spaghetti',date: '2022-07-23',isDone:false}],
    index:1, 
}
