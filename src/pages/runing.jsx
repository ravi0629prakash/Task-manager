// Dashboard.jsx
import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  addTask,
  deleteTask,
  updateTaskText,
  updateTaskPriority,
  updateTaskDate,
} from "../redux/tasksSlice";
import {
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  useMediaQuery,
  useTheme,
  Checkbox,
  FormControlLabel,
  Tooltip, // Import Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#f9f9f9",
}));

const Dashboard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks) || [];
  const [taskText, setTaskText] = useState("");
  const [taskPriority, setTaskPriority] = useState("Normal");
  const [taskDate, setTaskDate] = useState(new Date().toLocaleDateString());
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedPriority, setEditedPriority] = useState("Normal");
  const [editedDate, setEditedDate] = useState(new Date().toLocaleDateString());
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [markedTasks, setMarkedTasks] = useState([]);
  const [filterMarked, setFilterMarked] = useState(false);
  const [sortMarked, setSortMarked] = useState(false);

  // State to hold filter values temporarily during dialog
  const [tempFilterPriority, setTempFilterPriority] = useState("");
  const [tempFilterDate, setTempFilterDate] = useState("");
  const [tempSortField, setTempSortField] = useState("");
  const [tempSortOrder, setTempSortOrder] = useState("asc");
  const [tempFilterMarked, setTempFilterMarked] = useState(false);
  const [tempSortMarked, setTempSortMarked] = useState(false);

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

  const handleMarkTask = (taskId) => {
    if (markedTasks.includes(taskId)) {
      setMarkedTasks(markedTasks.filter((id) => id !== taskId));
    } else {
      setMarkedTasks([...markedTasks, taskId]);
    }
  };

  const filteredAndSortedTasks = useMemo(() => {
    let filteredTasks = [...tasks];

    if (filterMarked) {
      filteredTasks = filteredTasks.filter((task) =>
        markedTasks.includes(task.id)
      );
    }

    if (filterPriority) {
      filteredTasks = filteredTasks.filter(
        (task) => task.priority === filterPriority
      );
    }

    if (filterDate) {
      filteredTasks = filteredTasks.filter((task) => task.date === filterDate);
    }

    if (sortMarked) {
      filteredTasks.sort((a, b) => {
        const aMarked = markedTasks.includes(a.id);
        const bMarked = markedTasks.includes(b.id);

        if (aMarked && !bMarked) return -1;
        if (!aMarked && bMarked) return 1;

        if (sortField) {
          let aValue = a[sortField];
          let bValue = b[sortField];

          if (sortField === "date") {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
          }

          if (aValue < bValue) {
            return sortOrder === "asc" ? -1 : 1;
          }
          if (aValue > bValue) {
            return sortOrder === "asc" ? 1 : -1;
          }
          return 0;
        }

        return 0;
      });
    } else if (sortField) {
      filteredTasks.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === "date") {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }

        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredTasks;
  }, [
    tasks,
    filterPriority,
    filterDate,
    sortField,
    sortOrder,
    markedTasks,
    filterMarked,
    sortMarked,
  ]);

  const handleFilterSubmit = () => {
    setFilterPriority(tempFilterPriority);
    setFilterDate(tempFilterDate);
    setSortField(tempSortField);
    setSortOrder(tempSortOrder);
    setFilterMarked(tempFilterMarked);
    setSortMarked(tempSortMarked);
    setOpenFilterDialog(false);
  };

  const handleOpenFilterDialog = () => {
    setTempFilterPriority(filterPriority);
    setTempFilterDate(filterDate);
    setTempSortField(sortField);
    setTempSortOrder(sortOrder);
    setTempFilterMarked(filterMarked);
    setTempSortMarked(sortMarked);
    setOpenFilterDialog(true);
  };

  const handleClearFilters = () => {
    setFilterPriority("");
    setFilterDate("");
    setSortField("");
    setSortOrder("asc");
    setFilterMarked(false);
    setSortMarked(false);
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
    <React.Fragment>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Container maxWidth="md" style={{ marginTop: "30px" }}>
            <StyledPaper elevation={3} style={{ marginBottom: "30px" }}>
              <Grid
                container
                spacing={2}
                justifyContent={isMobile ? "flex-start" : "center"}
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Enter Task"
                    variant="outlined"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel id="priority-select-label">Priority</InputLabel>
                    <Select
                      labelId="priority-select-label"
                      id="priority-select"
                      value={taskPriority}
                      label="Priority"
                      onChange={(e) => setTaskPriority(e.target.value)}
                    >
                      <MenuItem value={"Low"}>Low</MenuItem>
                      <MenuItem value={"Normal"}>Normal</MenuItem>
                      <MenuItem value={"High"}>High</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Date"
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    style={{ marginBottom: "10px" }}
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddTask}
                    fullWidth
                  >
                    Add Task
                  </Button>
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="center" gap={2} marginTop={2} marginBottom={2}>
                <Button
                  variant="outlined"
                  onClick={handleOpenFilterDialog}
                  fullWidth={isMobile}
                >
                  Filter Tasks
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClearFilters}
                  fullWidth={isMobile}
                >
                  Clear Filters
                </Button>
              </Box>

              <Dialog
                open={openFilterDialog}
                onClose={() => setOpenFilterDialog(false)}
                fullWidth={isMobile}
              >
                <DialogTitle>Filter Tasks</DialogTitle>
                <DialogContent>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Filter Priority</InputLabel>
                    <Select
                      value={tempFilterPriority}
                      onChange={(e) => setTempFilterPriority(e.target.value)}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Normal">Normal</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    type="date"
                    label="Filter Date"
                    value={tempFilterDate}
                    onChange={(e) => setTempFilterDate(e.target.value)}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={tempSortField}
                      onChange={(e) => setTempSortField(e.target.value)}
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="priority">Priority</MenuItem>
                      <MenuItem value="date">Date</MenuItem>
                    </Select>
                  </FormControl>

                  <Button
                    onClick={() =>
                      setTempSortOrder(tempSortOrder === "asc" ? "desc" : "asc")
                    }
                    style={{ marginTop: "10px" }}
                    fullWidth={isMobile}
                  >
                    {tempSortOrder === "asc" ? "Ascending" : "Descending"}
                  </Button>
                  <FormControl fullWidth margin="normal">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tempFilterMarked}
                          onChange={(e) => setTempFilterMarked(e.target.checked)}
                        />
                      }
                      label="Filter Marked Tasks"
                    />
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={tempSortMarked}
                          onChange={(e) => setTempSortMarked(e.target.checked)}
                        />
                      }
                      label="Sort by Marked Tasks"
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpenFilterDialog(false)}>Cancel</Button>
                  <Button
                    onClick={handleFilterSubmit}
                    variant="contained"
                    color="primary"
                  >
                    Apply Filters
                  </Button>
                </DialogActions>
              </Dialog>

              <TableContainer
                component={Paper}
                style={{ maxHeight: "400px", overflow: "auto" }}
              >
                <Table
                  sx={{ minWidth: isMobile ? 300 : 650, tableLayout: "fixed" }}
                  aria-label="simple table"
                >
                  <TableHead style={{ position: "sticky", top: 0, backgroundColor: "white", zIndex: 1 }}>
                    <TableRow style={{ backgroundColor: "white" }}>
                      <TableCell style={{ fontWeight: "bold" }}>Task</TableCell>
                      <TableCell align="left" style={{ fontWeight: "bold", width: "20%" }}>
                        Priority
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bold", width: "20%" }}>
                        Date
                      </TableCell>
                      <TableCell align="left" style={{ fontWeight: "bold", width: "20%" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAndSortedTasks.map((task, index) => {
                      if (
                        !task ||
                        !task.id ||
                        !task.text ||
                        !task.priority ||
                        !task.date
                      ) {
                        console.error("Invalid task data:", task);
                        return null;
                      }
                      return (
                        <TableRow
                          key={task.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            backgroundColor:
                              index % 2 === 0 ? "#e3f2fd" : "#bbdefb",
                            transition: "background-color 0.3s ease-in-out",
                            "&:hover": {
                              backgroundColor:
                                index % 2 === 0 ? "#cce0f5" : "#a8cbe3",
                            },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {editTaskId === task.id ? (
                              <TextField
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                              />
                            ) : (
                              task.text
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editTaskId === task.id ? (
                              <FormControl>
                                <Select
                                  value={editedPriority}
                                  label="Priority"
                                  onChange={(e) =>
                                    setEditedPriority(e.target.value)
                                  }
                                >
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
                              <TextField
                                type="date"
                                value={editedDate}
                                onChange={(e) => setEditedDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                              />
                            ) : (
                              <Tooltip title={formatDateFull(task.date)}>
                                {/* <span>{formatDate(task.date)}</span> */}
                                <span style={{ fontSize: "inherit" }}>{formatDate(task.date)}</span>
                              </Tooltip>
                            )}
                          </TableCell>
                          <TableCell align="left">
                            {editTaskId === task.id ? (
                              <Button
                                style={{
                                  backgroundColor: "green",
                                  color: "white",
                                  padding: "8px 16px",
                                }}
                                onClick={() => handleSaveEdit(task.id)}
                              >
                                Save
                              </Button>
                            ) : (
                              <Box display="flex" gap={1}>
                                <Checkbox
                                  checked={markedTasks.includes(task.id)}
                                  onChange={() => handleMarkTask(task.id)}
                                />
                                <IconButton
                                  style={{
                                    backgroundColor: "lightyellow",
                                    transition: "all 1s ease-in-out",
                                  }}
                                  onClick={() => handleEditTask(task)}
                                >
                                  <FaEdit />
                                </IconButton>
                                <IconButton
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
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
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </StyledPaper>
          </Container>
        </Box>
        <Footer />
      </Box>
    </React.Fragment>
  );
};

export default Dashboard;