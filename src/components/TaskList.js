import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskStatus, editTask } from '../features/tasks/tasksSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function TaskList({ tasks }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const dispatch = useDispatch();

  const handleDelete = useCallback((taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch(deleteTask(taskToDelete));
      setIsLoading(false);
      setShowDeleteModal(false);
    }, 1000);
  };

  const handleToggleStatus = (taskId) => {
    dispatch(toggleTaskStatus(taskId));
  };

  const handleEdit = (task) => {
    setEditedTask(task.text);
    setIsEditing(task.id);
  };

  const saveEditedTask = (taskId) => {
    dispatch(editTask({ id: taskId, text: editedTask }));
    setIsEditing(false);
  };

  return (
    <div className='w-screen relative'>
      <div className='border border-blue-500 w-full'>
        <ul className='flex flex-wrap border-black border mx-[4%]'>
          {tasks.map((task) => (
            <li className="mx-5 my-3" key={task.id}>
              {isEditing === task.id ? (
                <div>
                  <input
                    className='border border-black rounded-md'
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button
                    className='mx-2 bg-blue-400 p-1 rounded-lg'
                    onClick={() => saveEditedTask(task.id)}
                  >Save
                  </button>
                </div>
              ) : (
                <div>
                  <span
                    style={{
                      textDecoration: task.completed ? 'line-through' : 'none',
                    }}
                  >
                    {task.text}
                  </span>
                  <button
                    className='bg-green-500 p-1.5 rounded mx-2'
                    onClick={() => handleToggleStatus(task.id)}
                  >
                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                  </button>
                  <button
                    className='bg-gray-400 p-1.5 rounded-lg'
                    onClick={() => handleEdit(task)}
                  >Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className='bg-red-500 p-1.5 rounded mx-2'>
                    Delete Task
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {showDeleteModal && (
          <div className='absolute top-[85%] left-[23%] bg-black text-white h-21 w-2/5 p-3'>
            <p>Are you sure you want to delete this task?</p>
            <button
              className='bg-red-500 p-1.5 rounded mx-2'
              onClick={confirmDelete}
            >
              {isLoading ? (
                <div>
                  <FontAwesomeIcon icon={faSpinner} spin /> Deleting
                </div>
              ) : (
                'Delete'
              )}
            </button>
            <button
              className='bg-gray-400 p-1.5 rounded-lg'
              onClick={() => setShowDeleteModal(false)}
            >Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

