// tasksSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
  try {
    const storedState = localStorage.getItem("tasks");
    return storedState ? JSON.parse(storedState) : [];
  } catch (error) {
    console.error("Error loading tasks from localStorage:", error);
    return [];
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving tasks to localStorage:", error);
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: loadState(),
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: String(action.payload.text),
        completed: false,
        priority: action.payload.priority || "Normal",
        date: action.payload.date || new Date().toLocaleDateString(),
      };
      const newState = [...state, newTask];
      saveState(newState);
      return newState;
    },
    toggleTask: (state, action) => {
      const newState = state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      saveState(newState);
      return newState;
    },
    deleteTask: (state, action) => {
      const newState = state.filter((task) => task.id !== action.payload);
      saveState(newState);
      return newState;
    },
    reorderTasks: (state, action) => {
      const newOrder = action.payload;
      const reorderedState = [];
      newOrder.forEach((id) => {
        const task = state.find((task) => task.id === id);
        if (task) {
          reorderedState.push(task);
        }
      });
      saveState(reorderedState);
      return reorderedState;
    },
    updateTaskPriority: (state, action) => {
      const { taskId, priority } = action.payload;
      const newState = state.map((task) =>
        task.id === taskId ? { ...task, priority: priority } : task
      );
      saveState(newState);
      return newState;
    },
    updateTaskText: (state, action) => {
      const { taskId, text } = action.payload;
      const newState = state.map((task) =>
        task.id === taskId ? { ...task, text: String(text) } : task
      );
      saveState(newState);
      return newState;
    },
    updateTaskDate: (state, action) => {
      const { taskId, date } = action.payload;
      const newState = state.map((task) =>
        task.id === taskId ? { ...task, date: date } : task
      );
      saveState(newState);
      return newState;
    },
  },
});

export const {
  addTask,
  toggleTask,
  deleteTask,
  reorderTasks,
  updateTaskPriority,
  updateTaskText,
  updateTaskDate,
} = tasksSlice.actions;
export default tasksSlice.reducer;