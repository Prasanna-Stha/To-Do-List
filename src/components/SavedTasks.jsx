import { useState, useEffect, useContext } from "react";
import { TaskContext } from "../context/Context";

const SavedTasks = () => {
  const { lightTheme } = useContext(TaskContext);
  const [savedTasks, setSavedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    const validTasks = storedTasks.map((task) => ({
      ...task,
      id: task.id || new Date().toISOString(),
      createdAt: task.createdAt || new Date().toISOString(),
      editHistory: task.editHistory || [],
    }));

    setSavedTasks(validTasks);
  }, []);

  const getTimeDifferenceLabel = (date) => {
    const createdAt = new Date(date);
    const now = new Date();
    const daysDiff = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) return "Created at: Today";
    if (daysDiff === 1) return "Created at: Yesterday";
    return `Created at: ${daysDiff} days ago`;
  };

  const formatExactDate = (date) => {
    const createdAt = new Date(date);
    return `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;
  };

  return (
    <div
      className={`${
        lightTheme ? "bg-gray-50 text-gray-900" : "bg-gray-900 text-white"
      } w-full p-6 mx-auto min-h-screen`}
    >
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
        All Tasks
      </h2>
      {savedTasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {savedTasks.map((task) => (
            <li
              key={task.id}
              className={`shadow rounded-lg p-4 flex justify-between items-center relative ${
                task.editHistory.length > 0
                  ? lightTheme
                    ? "bg-blue-100" 
                    : "bg-blue-900" 
                  : lightTheme
                  ? "bg-gray-100" 
                  : "bg-gray-800" 
              }`}
            >
              <div>
                <strong className="block text-lg">{task.content}</strong>
                <span className="text-sm opacity-80">{task.description}</span>
                <p className="text-xs text-gray-500 mt-1">
                  {getTimeDifferenceLabel(task.createdAt)}
                </p>
              </div>

              <button
                className="absolute top-4 right-4 text-blue-500 hover:underline"
                onClick={() => setSelectedTask(task)}
              >
                See Details
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Task Details */}
      {selectedTask && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div
            className={`w-96 max-w-full p-6 rounded-lg shadow-lg ${
              lightTheme ? "bg-white text-gray-900" : "bg-gray-800 text-white"
            } custom-scrollbar`}
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <h3 className="text-xl font-semibold">{selectedTask.content}</h3>
            <p className="text-sm opacity-80">{selectedTask.description}</p>

            <div className="mt-4">
              <p className="text-gray-500">{getTimeDifferenceLabel(selectedTask.createdAt)}</p>
              <p className="text-gray-400 text-xs">{formatExactDate(selectedTask.createdAt)}</p>
            </div>

            {selectedTask.editHistory.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700">Edit History:</h4>
                <div
                  className="mt-2 space-y-2 p-2 rounded-lg custom-scrollbar"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  {selectedTask.editHistory.map((history, index) => (
                    <div key={index} className="p-2 rounded-lg bg-gray-200 text-gray-700">
                      <p className="font-medium">Edited At: {formatExactDate(history.editedAt)}</p>
                      <p className="text-sm">Content: {history.content}</p>
                      <p className="text-sm">Description: {history.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              className="mt-6 w-full p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => setSelectedTask(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedTasks;
