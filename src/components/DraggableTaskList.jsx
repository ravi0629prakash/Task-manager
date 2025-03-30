// DraggableTaskList.jsx
import React from 'react';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const DraggableTaskList = ({
  tasks,
  onDragEnd,
  editTaskId,
  editedText,
  editedPriority,
  editedDate,
  setEditedText,
  setEditedPriority,
  setEditedDate,
  handleSaveEdit,
  handleEditTask,
  handleDeleteTask,
  isMobile,
}) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <TableContainer component={Paper} style={{ maxHeight: '400px', overflow: 'auto' }} {...provided.droppableProps} ref={provided.innerRef}>
            <Table sx={{ minWidth: isMobile ? 300 : 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell align="left">Priority</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody {...provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                    {(provided) => (
                      <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TableCell component="th" scope="row">
                          {editTaskId === task.id ? (
                            <TextField value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                          ) : (
                            task.text
                          )}
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
                            task.date
                          )}
                        </TableCell>
                        <TableCell align="left">
                          {editTaskId === task.id ? (
                            <Button onClick={() => handleSaveEdit(task.id)}>Save</Button>
                          ) : (
                            <Box display="flex">
                              <IconButton onClick={() => handleEditTask(task)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteTask(task.id)}>
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          )}
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableTaskList;