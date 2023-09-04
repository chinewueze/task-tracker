import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

export default function TaskForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') {
      return;
    }
    const newTask = {
      text,
      id: Date.now(), 
    };
    dispatch(addTask(newTask));
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className='sm:mx-[20%] lg:mx-[35%]'>
      <input
        type="text"
        placeholder="Add a task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className='outline-none border-2 border-solid border-black rounded-md'

      />
      <button className='m-2 w-11 h-6 rounded bg-blue-500 text-white'>Add</button>
    </form>
  );
}
