import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  InputBase,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

function Todo(props) {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const [itemColor, setItemColor] = useState("");

  const deleteEventHandler = () => {
    props.delete(item);
  };

  const offReadOnly = () => {
    setReadOnly(false);
  };

  const editEventHandler = (e) => {
    const thisItem = { ...item };
    thisItem.title = e.target.value;
    setItem(thisItem);
  };

  function checkboxEventHandler() {
    const thisItem = { ...item };
    thisItem.done = thisItem.done ? false : true;
    setItem(thisItem);
    setReadOnly(true);
    props.update(thisItem);
    setItemColor(
      thisItem.done ? "linear-gradient(to right, #a6c0fe, #f68084)" : "white"
    );
  }

  return (
    <ListItem>
      <Checkbox checked={item.done} onChange={checkboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "naked", readOnly: readOnly }}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
          onClick={offReadOnly}
          onChange={editEventHandler}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete" onClick={deleteEventHandler}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Todo;
