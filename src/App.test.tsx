import React from 'react';
import { render, screen, within } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
afterEach=()=>{
  localStorage.clear()
}
test('Title is Visible', () => {
  render(<App />);
  const title = screen.getByRole ("heading", {name: "To-Do List"});
  expect(title).toBeVisible();
});
test('Basic Element Show-up', () => {
  render(<App/>);
  const inputField = screen.getByPlaceholderText ("Create a new To-Do")
  const submitButton = screen.getByRole ("button", {name: "Submit"})
  expect(inputField).toBeVisible();
  expect(submitButton).toBeDisabled();

});

test('Adding Value to To-Do List', () => {
  render(<App/>);
  const inputField = screen.getByPlaceholderText ("Create a new To-Do")
  const submitButton = screen.getByRole ("button", {name: "Submit"})
  userEvent.type(inputField, "Feed the Shark")
  userEvent.click(submitButton)
  expect(screen.getByText("Feed the Shark")).toBeVisible()
});

test("Completing a To-Do item", ()=> {
  render(<App/>);
  const inputField = screen.getByPlaceholderText ("Create a new To-Do")
  const submitButton = screen.getByRole ("button", {name: "Submit"})
  const toDoList = screen.getByLabelText ("primary-list")
  const doneList = screen.getByLabelText ("secondary-list")
  userEvent.type(inputField, "Test for moving items")
  userEvent.click(submitButton)
  expect(within(toDoList).getByText("Test for moving items"))
  userEvent.click(within(toDoList).getByText("Test for moving items"))
  expect(within(doneList).getByText("Test for moving items"))

})

test('Header for primary and secondary', () => {
  render(<App/>);
  const finishedItems = screen.getByRole ("heading", {name: "Finished Items"});
  const unfinishedItems = screen.getByRole ("heading", {name: "Unfinished Items"});
  expect(finishedItems).toBeVisible();
  expect(unfinishedItems).toBeVisible();


});
// when I come to website 
// and create a to-do item by typing one in
// and then submit it
// and then click it, I expect for it to move to the other list