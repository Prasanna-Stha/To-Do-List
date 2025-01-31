import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../context/Context";

const ToDoList = () => {
  const { lightTheme } = useContext(TaskContext);
  const [tasks, setTasks] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [editTaskIndex, setEditTaskIndex] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null); // To hold the task for deletion

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Ensure each task has an editHistory property initialized as an array
    const tasksWithEditHistory = savedTasks.map(task => ({
      ...task,
      editHistory: task.editHistory || [] // Make sure it's an array
    }));

    setTasks(tasksWithEditHistory);
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const displayForm = () => setShowInput(!showInput);

  const handleSubmit = () => {
    if (content.trim() === "") return alert("Task title is required!");

    const newTask = {
      id: new Date().toISOString(),
      content,
      description,
      createdAt: new Date().toISOString(),
      edited: false,
      editHistory: []
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setContent("");
    setDescription("");
    setShowInput(false);
  };

  const handleEdit = (index) => {
    const taskToEdit = tasks[index];
    setContent(taskToEdit.content);
    setDescription(taskToEdit.description);
    setEditTaskIndex(index);
    setShowInput(true);
  };

  const handleSaveEdit = () => {
    const updatedTasks = tasks.map((task, index) =>
      index === editTaskIndex
        ? {
          ...task,
          content,
          description,
          edited: true,
          editHistory: [
            ...task.editHistory, // Keep the old edit history
            {
              editedAt: new Date().toISOString(),
              content,
              description,
            },
          ], // Add the new edit history entry
        }
        : task
    );

    setTasks(updatedTasks)
    setContent("")
    setDescription("")
    setEditTaskIndex(null)
    setShowInput(false)
  };

  // popup box before deleting task
  const handleDeleteConfirmation = (index) => {
    setTaskToDelete(index)
  };

  // Confirm deletion
  const handleDelete = () => {
    const updatedTasks = tasks.filter((_, i) => i !== taskToDelete);
    setTasks(updatedTasks)
    setTaskToDelete(null)
  };

  // Cancel deletion
  const handleCancelDelete = () => {
    setTaskToDelete(null)
  };

  return (
    <div
      className={`w-full h-full p-6 ${lightTheme ? "bg-white text-gray-900" : "bg-gray-800 text-white"}`}
    >
      <div className="w-[50%] mx-auto max-w-[600px] bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-medium mb-6 text-center text-gray-700">To-Do List</h1>

        <button
          className="w-full py-2 mb-4 text-white bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none"
          onClick={displayForm}
        >
          + Add Task
        </button>

        {showInput && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Task Title"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-[gray]"
            />
            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:border-2 focus:border-[gray]"
            />
            {editTaskIndex !== null ? (
              <button
                className="w-full py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
                onClick={handleSaveEdit}
              >
                Save Edit
              </button>
            ) : (
              <button
                className="w-full py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
                onClick={handleSubmit}
              >
                Save Task
              </button>
            )}
          </div>
        )}

        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm"
            >
              <div>
                <h3 className="font-medium text-gray-800">{task.content}</h3>
                <p className="text-gray-600 text-sm">{task.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteConfirmation(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Confirmation Modal for Deletion */}
        {taskToDelete !== null && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full">
              <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to delete this task?</h3>
              <div className="mt-4 flex justify-between">
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="py-2 px-4 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDoList;
