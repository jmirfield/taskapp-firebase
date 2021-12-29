import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useRequest from './hooks/useRequest';

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest } = useRequest()
  // console.log(tasks)
  // console.log(process.env.REACT_APP_FIREBASE)
  const fetchTasks = useCallback(() => {
    const loadedTasks = [];
    sendRequest((data) => {
      for (const key in data) loadedTasks.push({ id: key, text: data[key].text })
    })
    setTasks(loadedTasks);
  }, [sendRequest])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks]);

  const addTaskHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const deleteTaskHandler = (id) => {
    sendRequest(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => {
        return task.id !== id
      }));
    }, { 
      method: 'DELETE' 
    }, `${process.env.REACT_APP_FIREBASE}${id}.json`)
  }

  return (
    <React.Fragment>
      <NewTask onAddTask={addTaskHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDeleteTask={deleteTaskHandler}
      />
    </React.Fragment>
  );
}

export default App;
