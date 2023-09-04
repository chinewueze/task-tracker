import { createSlice } from '@reduxjs/toolkit';

// Create a Redux slice for the tasks feature
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [], 
  reducers: {
    loadTasks: (state, action) => {
      return action.payload;
    },
    addTask: (state, action) => {
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      return state.filter((task) => task.id !== action.payload);
    },
    toggleTaskStatus: (state, action) => {
      const taskToToggle = state.find((task) => task.id === action.payload);
      if (taskToToggle) {
        taskToToggle.completed = !taskToToggle.completed;
      }
    },
    editTask: (state, action) => {
      const taskToEdit = state.find((task) => task.id === action.payload.id);
      if (taskToEdit) {
        taskToEdit.text = action.payload.text;
      }
    },
  },
});

export const { loadTasks, addTask, deleteTask, toggleTaskStatus, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;
