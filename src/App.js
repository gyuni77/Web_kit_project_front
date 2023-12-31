import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import "./App.css";
import AddTodo from "./AddTodo";
import {
  Paper,
  List,
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { call, signout } from "./service/ApiService";
import Lotto from "./Lotto";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemcomplete, setItemComplete] = useState(0);
  const [time, setTime] = useState("00:00:00");

  const add = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  const updateItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  useEffect(() => {
    call("/todo", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  const CalculateAll = () => {
    if (items.length > 0) {
      console.log(items.length);
      let completedItemsCount = 0;
      items.map((item) => {
        console.log(item.done);
        if (item.done === true) {
          completedItemsCount++;
        }
      });

      const completionPercentage = (completedItemsCount / items.length) * 100;
      setItemComplete(completionPercentage);
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      CalculateAll();
    }
  });

  const currentTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setTime(`${hours}:${minutes}:${seconds}`);
  };

  const startTime = () => {
    setInterval(currentTime, 1000);
  };

  startTime();

  var todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item, idx) => (
          <Todo
            item={item}
            key={item.id}
            delete={deleteItem}
            update={updateItem}
          />
        ))}
      </List>
    </Paper>
  );

  // navigationBar
  var navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // loading 중이 아닐 때
  var todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <Typography component="legend">
          <h3>오늘의 Todo 진행도 : {itemcomplete.toFixed(1)}%</h3>
          {time}
        </Typography>
        <AddTodo add={add} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  // loading 중일 때
  var loadingPage = <h1>로딩중..</h1>;
  var content = loading ? loadingPage : todoListPage;

  return (
    <div className="App">
      {content}
      <Lotto />
    </div>
  );
}

export default App;
