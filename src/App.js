import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadTasks } from './features/tasks/tasksSlice';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

export default function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    // Simulate fetching tasks from a fake API (db.json)
    fetch('http://localhost:3003/tasks')
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadTasks(data));
      });
  }, [dispatch]);

  return (
    <div className="font-cantrell">
      <h1 className="text-center text-3xl font-semibold ">Task Tracker</h1>
      <div className="bg-neutral-coolgray w-screen h-15 my-11">
        <TaskForm />
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}


