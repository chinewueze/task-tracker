import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/tasks/tasksSlice';

// Configure the Redux store
const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

export default store; // Configure the Redux store