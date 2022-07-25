import FormTodo from '../components/FormTodo';
import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { screen, userEvent } from '@storybook/testing-library';


export default {
    title: 'FormTodo',
    component: FormTodo,

}

const Template = (args) => <FormTodo {...args} />;

export const staticForm= Template.bind({});

export const FilledForm= Template.bind({});

FilledForm.play = async () => {
    const textInput = screen.getByLabelText('Add New Task', {
      selector: 'input',
    });
  
    await userEvent.type(textInput, 'check the dogs food', {
      delay: 100,
    });
  
    const dateInput = screen.getByLabelText('Add Date to task', {
      selector: 'input',
    });
  
    await userEvent.type(dateInput, '2022-07-21', {
      delay: 100,
    });
    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    const submitButton = screen.getByRole('button');
  
    await userEvent.click(submitButton);
  };
