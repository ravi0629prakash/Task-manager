import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTask, deleteTask } from "../redux/store";
import { List, ListItem, ListItemText, IconButton, Checkbox, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  return (
    <Paper sx={{ marginTop: 3, padding: 2 }}>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} secondaryAction={
            <IconButton edge="end" onClick={() => dispatch(deleteTask(task.id))}>
              <DeleteIcon />
            </IconButton>
          }>
            <Checkbox checked={task.completed} onChange={() => dispatch(toggleTask(task.id))} />
            <ListItemText 
              primary={task.text} 
              sx={{ textDecoration: task.completed ? "line-through" : "none" }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
