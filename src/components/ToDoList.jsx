import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/Context";
import SearchBox from "./SearchBox";

const ToDoList = () => {
  const { tasks, addTask, lightTheme } = useContext(TaskContext);

  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [taskOption, setTaskOption] = useState(false)

  const displayForm = () => setShowInput(!showInput);

  const handleSubmit = () => {
    if (content.trim() === "") return alert("Task title is required!");
    addTask(content, description);
    setContent("");
    setDescription("");
    setShowInput(false);
  };

  const showTaskOptions = ()=>{
    setTaskOption(true)
  }
  const hideTaskOptions = ()=>{
    setTaskOption(false)
  }
  
  return (
    <div className={`w-full h-full p-6 ${lightTheme ? "bg-gray-50 text-black" : "bg-gray-900 text-white"}`}>
      <div className="w-[40%] border border-gray-200 rounded-lg p-3 absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] shadow-xl">
        <h1 className="text-2xl font-semibold mb-4 text-center">To-Do List</h1>
        <div className="mb-6 w-fit mx-auto">
          <SearchBox tasks={tasks} />
        </div>
        <div className="flex justify-between mb-4">
          <button className={`px-4 py-2 rounded-md ${lightTheme ? "bg-blue-200 text-blue-800" : "bg-green-500 text-white"}`}
            onClick={displayForm} >+ Add Task</button>
        </div>
        {showInput && (
          <div>
            <input
              type="text"
              placeholder="Task Title"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-2 rounded-md mb-3 ${lightTheme ? "bg-white text-black" : "bg-gray-700 text-white"
                } outline-none focus:border-2`}
            />
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 rounded-md mb-3 ${lightTheme ? "bg-white text-black" : "bg-gray-700 text-white"
                } outline-none focus:border-2`}
            />
            <button className={`px-4 py-2 rounded-md ${lightTheme ? "bg-blue-600 text-white" : "bg-green-600 text-white"}`} onClick={handleSubmit}>Save Task</button>
          </div>
        )}

        {/* added task shown from this */}
        <ul onMouseOver={showTaskOptions} onMouseLeave={hideTaskOptions}  className="w-full" >
          {tasks.map((task, index) => (
            <div className={`w-full flex justify-between items-center cursor-pointer hover:shadow-md ${lightTheme ? "bg-gray-200" : "bg-gray-800"
            }`}>
            <li
              key={index}
              className={`p-2 rounded-md mb-2`} >
              {task.content}
            </li>
              {taskOption &&(
                <Link to="/saved-tasks">
                  <button className="px-4 w-fit py-2 hover:underline">More info..</button>
                </Link>)}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
