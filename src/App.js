import React, { useEffect, useState, useCallback } from 'react';
import useFetch from './hooks/use-task';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {

  const [tasks, setTasks] = useState([]);

  const transformTasks = useCallback((taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  },[])

  const httpData = useFetch({url:'https://react-http-83816-default-rtdb.firebaseio.com/tasks.json'},transformTasks)
  const {isLoading,error,sendRequest:fetchTasks} = httpData;

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
