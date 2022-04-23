import React, { useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

function App() {
  const [value, setValue] = useState("");
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const startingValue = localStorage.getItem("toDoList")
    ? JSON.parse(localStorage.getItem("toDoList")!!)
    : [""];
  const [toDoList, setToDoList] = useState<string[]>(startingValue);
  const [doneList, setDoneList] = useState<string[]>([]);
  function addValueToItems(event: React.FormEvent) {
    event.preventDefault();
    let newItems = toDoList;
    newItems.push(value);
    console.log(value);
    setToDoList(newItems);
    setValue("");
    localStorage.setItem("toDoList", JSON.stringify(newItems));
  }
  function moveItem(item: string) {
    let newItems = toDoList;
    const index = newItems.indexOf(item);
    if (index > -1) {
      newItems.splice(index, 1);
    }
    setToDoList(newItems);
    localStorage.setItem("toDoList", JSON.stringify(newItems));
    forceUpdate();
    let newDoneList = doneList;
    newDoneList.push(item);
    setDoneList(newDoneList);
  }
  let isButtonDisabled = !/[a-z]/i.test(value);

  return (
    <Stack gap = {2} alignItems = "center" >
      <Typography variant = "h3">To-Do List</Typography>
      <form onSubmit={addValueToItems}>
        <TextField size = "small"
        label = "Create a New To-Do"
          placeholder="Walk the bed"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></TextField>

        <Button variant="contained" size = "large" type="submit" disabled={isButtonDisabled}>
          Submit
        </Button>
      </form>
      <Typography variant = "h5">Unfinished Items</Typography>
      <List aria-label="primary-list">
        {toDoList.map((item, index) => (
          <ListItem onClick={() => moveItem(item)}>{index + 1}. {item}</ListItem>
        ))}
      </List>
      <Typography variant = "h5">Finished Items</Typography>
      <List aria-label="secondary-list">
        {doneList.map((item, index) => (
          <ListItem>{index + 1}. {item}</ListItem>
        ))}
      </List>
    </Stack>
  );
}

export default App;
