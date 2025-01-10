import { useState } from "react";

const ToDoList = () => {
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");        // State for the title
  const [description, setDescription] = useState("");   ; // State for the textarea
  const [tasks, setTasks] = useState([]);   // State for the task list
  const [lightTheme, setLightTheme] = useState(true);     //change theme

  const displayForm = () => {
    setShowInput(!showInput);
  };

  const handleTitleChange = (event) => {
    setContent(event.target.value);   // Update title state
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);   // Update description state
  };

  const setTask = () => {
    if (content.trim() === "") return alert("Task title is required!");
    setTasks((prevTasks) => [
      ...prevTasks,
      { content, description, show: false, completed: false },
    ]);
    setContent("");   // Clear title input
    setDescription("");    // Clear description input
    setShowInput(false);
  };

  const toggleDescription = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>{
        if(i === index) {
          return { ...task, show: !task.show }    // Toggling the description visibility
        } 
        return task
      })
    );
  };

  const markAsCompleted = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => {
        if(i === index){
          return { ...task, completed: !task.completed }   // Toggle completed status
        } 
        return task
      }
      )
    );
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));   // Remove task by index
    }
  };

  const changeTheme = () => {
    setLightTheme(!lightTheme);
  };

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className={`w-screen h-screen ${lightTheme ? "bg-white" : "bg-[#121212]"}`}>
      <button className={`px-3 py-2 border ${lightTheme ? "text-black" : "text-white"}`} onClick={changeTheme}>
        {lightTheme ? "Dark Theme" : "Light Theme"}
      </button>

      {/* all the content are here (the box where all contents are present)*/}
      <div className={`w-full sm:w-[70vw] mx-auto border-2 p-4 ${lightTheme ? "bg-white text-black" : "bg-[#121212] text-white"}`}>
        <button className="w-full p-4 border border-[#d9d9d9]" onClick={displayForm}>+ Add new task</button>

        {/* input box for taking notes */}
        {showInput && (
          <div>
            <input type="text" placeholder="Title goes here.." className="w-full p-2 outline-none font-semibold bg-transparent" value={content} onChange={handleTitleChange} />
            <textarea placeholder="I have something to do tomorrow..." className="border w-full p-4 bg-transparent" value={description} onChange={handleDescriptionChange} />
            <button className="border px-4 py-2 bg-[#4267B2] text-white" onClick={setTask}>Add task</button>
          </div>
        )}

        <div className="flex flex-wrap">
          {/* added tasks here */}
          <div className="w-full md:w-1/2 p-2">
            {/* pending tasks  */}
            <h2 className="font-bold text-lg">Pending Tasks</h2>
            {pendingTasks.map((task, index) => (
              <div key={index} className={`border px-4 py-2 my-2 cursor-pointer ${lightTheme ? "hover:bg-slate-100" : "hover:bg-gray-700"} rounded-md flex justify-between items-center`}
                onClick={() => toggleDescription(index)}>
                <div>
                  <h1 className={`font-bold ${task.completed ? "line-through text-gray-400" : ""}`}>{task.content}</h1>
                  {task.show && (
                    <p className={`text-gray-600 ${lightTheme ? "text-black" : "text-white"}`}>
                      {task.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="py-1 px-2 sm:py-1 sm:px-4 bg-green-600 text-white rounded-sm hover:bg-green-700" onClick={(e) => {
                      e.stopPropagation();
                      markAsCompleted(index);
                    }}>
                    {task.completed ? "Undo" : "Completed"}
                  </button>
                  <button className="py-1 px-2 sm:py-1 sm:px-4 bg-red-600 text-white rounded-sm hover:bg-red-700" onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(index);
                    }}>Delete</button>
                </div>
              </div>
            ))}
          </div>


          {/* added tasks here */}
          <div className="w-full md:w-1/2 p-2">
            <h2 className="font-bold text-lg">Completed Tasks</h2>
            {completedTasks.map((task, index) => (
              <div key={index} className={`border px-4 py-2 my-2 ${lightTheme ? "hover:bg-slate-100" : "hover:bg-gray-700"} rounded-md`}>
                <h1 className="font-bold line-through text-gray-400">{task.content}</h1>
                <button className="py-1 px-2 sm:py-1 sm:px-4 bg-green-600 text-white rounded- hover:bg-green-700 mt-2" onClick={() => markAsCompleted(index)}>Undo</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
