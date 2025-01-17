import { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [lightTheme, setLightTheme] = useState(true);

  const addTask = (content, description) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { content, description, show: false, completed: false },
    ]);
  };

  const toggleComplete = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const toggleTheme = () => setLightTheme((prev) => !prev);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        toggleComplete,
        deleteTask,
        lightTheme,
        toggleTheme,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
