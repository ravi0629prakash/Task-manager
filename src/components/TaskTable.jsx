// TaskTable.jsx
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, FormControl, Select, MenuItem, Button, Box, Checkbox, Tooltip } from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTask, updateTaskText, updateTaskPriority, updateTaskDate } from "../redux/tasksSlice";
import { toast } from "react-toastify";
import { useMediaQuery, useTheme } from '@mui/material';

const TaskTable = ({ tasks, markedTasks, setMarkedTasks }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedPriority, setEditedPriority] = useState("Normal");
  const [editedDate, setEditedDate] = useState(new Date().toLocaleDateString());

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
    toast.success("Task deleted successfully!");
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setEditedText(task.text);
    setEditedPriority(task.priority);
    setEditedDate(task.date);
  };

  const handleSaveEdit = (taskId) => {
    dispatch(updateTaskText({ taskId, text: editedText }));
    dispatch(updateTaskPriority({ taskId, priority: editedPriority }));
    dispatch(updateTaskDate({ taskId, date: editedDate }));
    setEditTaskId(null);
    toast.success("Task updated successfully!");
  };

  const handleMarkTask = (taskId) => {
    if (markedTasks.includes(taskId)) {
      setMarkedTasks(markedTasks.filter((id) => id !== taskId));
    } else {
      setMarkedTasks([...markedTasks, taskId]);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const formatDateFull = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <TableContainer component={Paper} style={{ maxHeight: "400px", overflow: "auto" }}>
      <Table sx={{ minWidth: isMobile ? 300 : 650, tableLayout: "fixed" }} aria-label="simple table">
        <TableHead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}>
          <TableRow style={{ backgroundColor: "white" }}>
            <TableCell style={{ fontWeight: "bold" }}>Task</TableCell>
            <TableCell align="left" style={{ fontWeight: "bold", width: "20%" }}>Priority</TableCell>
            <TableCell align="left" style={{ fontWeight: "bold", width: "20%" }}>Date</TableCell>
            <TableCell align="left" style={{ fontWeight: "bold", width: "20%" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task, index) => {
            if (!task || !task.id || !task.text || !task.priority || !task.date) {
              console.error("Invalid task data:", task);
              return null;
            }
            return (
              <TableRow key={task.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, backgroundColor: index % 2 === 0 ? "#e3f2fd" : "#bbdefb", transition: "background-color 0.3s ease-in-out", "&:hover": { backgroundColor: index % 2 === 0 ? "#cce0f5" : "#a8cbe3" } }}>
                <TableCell component="th" scope="row">
                  {editTaskId === task.id ? <TextField value={editedText} onChange={(e) => setEditedText(e.target.value)} /> : task.text}
                </TableCell>
                <TableCell align="left">
                  {editTaskId === task.id ? (
                    <FormControl>
                      <Select value={editedPriority} label="Priority" onChange={(e) => setEditedPriority(e.target.value)}>
                        <MenuItem value={"Low"}>Low</MenuItem>
                        <MenuItem value={"Normal"}>Normal</MenuItem>
                        <MenuItem value={"High"}>High</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    task.priority
                  )}
                </TableCell>
                <TableCell align="left">
                  {editTaskId === task.id ? (
                    <TextField type="date" value={editedDate} onChange={(e) => setEditedDate(e.target.value)} InputLabelProps={{ shrink: true }} />
                  ) : (
                    <Tooltip title={formatDateFull(task.date)}>
                      <span style={{ fontSize: "inherit" }}>{formatDate(task.date)}</span>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell align="left">
                  {editTaskId === task.id ? (
                    <Button style={{ backgroundColor: "green", color: "white", padding: "8px 16px" }} onClick={() => handleSaveEdit(task.id)}>
                      Save
                    </Button>
                  ) : (
                    <Box display="flex" gap={1}>
                      <Checkbox checked={markedTasks.includes(task.id)} onChange={() => handleMarkTask(task.id)} />
                      <IconButton
                        sx={{
                          transition: "background-color 0.3s ease-in-out",
                          "&:hover": { backgroundColor: "lightyellow" },
                        }}
                        onClick={() => handleEditTask(task)}
                      >
                        <FaEdit />
                      </IconButton>
                      <IconButton
                        sx={{
                          transition: "background-color 0.3s ease-in-out",
                          "&:hover": { backgroundColor: "#f56989" },
                        }}
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <FaTrashAlt />
                      </IconButton>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;