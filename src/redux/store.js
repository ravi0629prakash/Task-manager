import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice"; // Import the tasks reducer

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
