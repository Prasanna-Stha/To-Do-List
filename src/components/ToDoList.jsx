import { useState } from "react";
import SearchBox from "./SearchBox.jsx";

const ToDoList = () => {
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [lightTheme, setLightTheme] = useState(true);

  const displayForm = () => {
    setShowInput(!showInput);
  };

  const handleTitleChange = (event) => {
    setContent(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const setTask = () => {
    if (content.trim() === "") return alert("Task title is required!");
    setTasks((prevTasks) => [
      ...prevTasks,
      { content, description, show: false, completed: false },
    ]);
    setContent("");
    setDescription("");
    setShowInput(false);
  };

  const toggleDescription = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i === index) {
          return { ...task, show: !task.show };
        }
        return task;
      })
    );
  };

  const markAsCompleted = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if (i === index) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }
  };

  const changeTheme = () => {
    setLightTheme(!lightTheme);
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className={`w-screen h-screen ${lightTheme ? "bg-[#f9fafb]" : "bg-[#1e1e1e]"} overflow-x-hidden`}>

      {/* main box */}
      <div className="w-full sm:w-[50vw] mx-auto p-6 rounded-lg flex flex-col gap-6">
      <div className="flex justify-end p-4">
        <button className={`px-4 py-2 rounded-md ${lightTheme ? "bg-[#e0e7ff] text-[#1e3a8a]" : "bg-[#333] text-white"}`} onClick={changeTheme}>
          {lightTheme ? "Dark Theme" : "Light Theme"}
        </button>
      </div>

      <div className="mx-auto w-fit">
      <SearchBox tasks={tasks} />
      </div>
      <div className="w-full mx-auto p-6 rounded-lg" style={{ boxShadow: lightTheme ? "0 4px 10px rgba(1px, 1px, 10px, 10px, 0.1)" : "0 4px 10px rgba(0, 0, 0, 0.4)", background: lightTheme ? "#f5f5f5" : "#1f1f1f" }}>
        <div className="flex justify-between items-center">
          <h1 className={`text-2xl font-semibold ${lightTheme ? "text-[#1e3a8a]" : "text-white"}`}>To-Do List</h1>
          <button className={`px-4 py-2 rounded-md ${lightTheme ? "bg-[#e0e7ff] text-[#1e3a8a]" : "bg-[#4caf50] text-white"}`} onClick={displayForm}>+ Add Task</button>
        </div>

        {showInput && (
          <div className="mt-4">
            <input type="text" placeholder="Task Title" className={`w-full p-2 border rounded-md mb-3 outline-none bg-transparent ${lightTheme ? "text-black" : "text-white"}`} value={content} onChange={handleTitleChange} />

            <textarea placeholder="Task Description" className={`w-full p-2 border rounded-md mb-3 outline-none text-black bg-transparent ${lightTheme ? "text-black" : "text-white"}`} value={description} onChange={handleDescriptionChange}></textarea>
            <button className="px-4 py-2 bg-[#4caf50] text-white rounded-md bg-tra" onClick={setTask}>Save Task</button>
          </div>
        )}

        <div className="mt-6">
          <h2 className={`text-lg font-medium ${lightTheme ? "text-gray-800" : "text-white"}`}>Pending Tasks</h2>
          {pendingTasks.map((task, index) => (
            <div key={index} className="mt-4 flex justify-between items-center border-b pb-2">
              <div>
                <div className={`font-semibold cursor-pointer ${task.completed ?? "line-through"} ${lightTheme ? "text-gray-700" : "text-gray-300"} hover:underline`} onClick={() => toggleDescription(index)}>{task.content}</div>
                {task.show && (
                  <p className={`mt-1 ${lightTheme ? "text-gray-700" : "text-gray-300"}`}>
                    {task.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[#4caf50] text-white rounded-md" onClick={() => markAsCompleted(index)}>
                  {task.completed ? "Undo" : "Completed"}
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-6 px-4 py-2 bg-[#007bff] text-white rounded-md" onClick={() => setShowCompleted(!showCompleted)}>
          {showCompleted ? "Hide Completed Tasks" : "Show Completed Tasks"}
        </button>

        {showCompleted && completedTasks.length > 0 && (
          <div className="mt-6">
            <h2 className={`text-lg font-medium ${lightTheme ? "text-gray-800" : "text-white"}`}>
              Completed Tasks
            </h2>
            {completedTasks.map((task, index) => (
              <div key={index} className="mt-4 flex justify-between items-center border-b pb-2">
                <div className={`font-semibold ${lightTheme ? "text-gray-700" : "text-gray-300"}`}>
                  {task.content}
                </div>
                <button className="px-4 py-2 bg-[#4caf50] text-white rounded-md" onClick={() => markAsCompleted(index)}>Undo</button>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default ToDoList;
