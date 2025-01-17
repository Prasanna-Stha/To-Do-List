import { useState, useContext } from "react";
import { TaskContext } from "../context/Context";

const SearchBox = ({ tasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const { lightTheme } = useContext(TaskContext);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const results = tasks.filter((task) =>
        task.content.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSuggestionClick = (task) => {
    setSelectedTask(task);
  };

  const closePopup = () => {
    setSelectedTask(null);
  };

  return (
    <div className="relative w-[30vw]">
      <form className="flex items-center border rounded-md px-3 py-1 w-full">
        <input
          type="text"
          placeholder="Search for a task..."
          className="bg-transparent focus:outline-none w-full text-sm pl-2 py-1"
          value={searchQuery}
          onChange={handleSearch}
          autoComplete="off"
        />
      </form>

      {searchResults.length > 0 && (
        <div
          className={`absolute top-10 border border-gray-300 rounded-md shadow-md ${lightTheme ? "bg-gray-100 text-black" : "bg-gray-800 text-white" } mt-2 w-full z-10`}>
          <ul className="divide-y divide-gray-200">
            {searchResults.map((result, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer text-sm"
                onClick={() => handleSuggestionClick(result)}
              >
                <p className="font-semibold">{result.content}</p>
                <p className="text-gray-600">{result.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10">

          {/* Popup for task details */}
          {selectedTask && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
              <div className="bg-white rounded-lg p-6 w-[90%] sm:w-[400px] shadow-lg">
                <h2 className="text-xl font-bold mb-4">{selectedTask.content}</h2>
                <p className="text-gray-700">{selectedTask.description}</p>
                <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md" onClick={closePopup}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
