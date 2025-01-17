import { useContext } from "react";
import { TaskContext } from "../context/Context";

const SavedTasks = () => {
  const { tasks, lightTheme } = useContext(TaskContext);

  return (
    <div className={`${lightTheme ? "":"bg-gray-900"} w-full p-6 mx-auto min-h-screen`}>
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">All Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-white shadow rounded-lg p-4 flex justify-between items-center"
            >
              <div>
                <strong className="block text-lg text-gray-800">{task.content}</strong>
                <span className="text-sm text-gray-600">{task.description}</span>
              </div>
              {task.completed && <span className="text-green-500 text-xl">✅</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedTasks;
