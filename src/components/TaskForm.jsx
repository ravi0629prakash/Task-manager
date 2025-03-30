// TaskForm.jsx
import React from "react";
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import { toast } from "react-toastify";
import { useMediaQuery, useTheme } from '@mui/material';

const TaskForm = ({ taskText, setTaskText, taskPriority, setTaskPriority, taskDate, setTaskDate }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddTask = () => {
    if (taskText.trim()) {
      dispatch(
        addTask({
          text: taskText.trim(),
          priority: taskPriority,
          date: taskDate,
        })
      );
      setTaskText("");
      toast.success("Task added successfully!");
    }
  };

  return (
    <Grid container spacing={2} justifyContent={isMobile ? "flex-start" : "center"}>
      <Grid item xs={12} md={6}>
        <TextField label="Enter Task" variant="outlined" value={taskText} onChange={(e) => setTaskText(e.target.value)} fullWidth style={{ marginBottom: "10px" }} />
      </Grid>
      <Grid item xs={12} md={2}>
        <FormControl fullWidth style={{ marginBottom: "10px" }}>
          <InputLabel id="priority-select-label">Priority</InputLabel>
          <Select labelId="priority-select-label" id="priority-select" value={taskPriority} label="Priority" onChange={(e) => setTaskPriority(e.target.value)}>
            <MenuItem value={"Low"}>Low</MenuItem>
            <MenuItem value={"Normal"}>Normal</MenuItem>
            <MenuItem value={"High"}>High</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={2}>
        <TextField label="Date" type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} InputLabelProps={{ shrink: true }} fullWidth style={{ marginBottom: "10px" }} />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button variant="contained" color="primary" onClick={handleAddTask} fullWidth>
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default TaskForm;