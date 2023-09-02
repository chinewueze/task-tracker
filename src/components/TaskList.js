import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/tasksSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
export default function TaskList({ tasks }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [taskToDelete, setTaskToDelete] = useState(null); 
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();

  // Use useCallback to memoize the handleDelete function
  const handleDelete = useCallback((taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  }, []);

  const confirmDelete = () => {
    setIsLoading(true); // Show loading spinner
    setTimeout(() => {
      // Simulate an API request delay
      dispatch(deleteTask(taskToDelete));
      setIsLoading(false);
      setShowDeleteModal(false);
    }, 1000);
  };

  return (
    <div>
      <ul className='flex flex-wrap '>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {showDeleteModal && (
        <div>
          <p>Are you sure you want to delete this task?</p>
          <button onClick={confirmDelete}>
            {isLoading ? (
              <div>
                <FontAwesomeIcon icon={faSpinner} spin /> Deleting
              </div>
            ) : (
              'Delete'
            )}
          </button>
          <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
