import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { TaskContext } from "../context/Context";

const Navigation = () => {
  const [showNav, setShowNav] = useState(true)
  const { lightTheme, toggleTheme } = useContext(TaskContext);

  const toggleNav = () => {
    setShowNav(!showNav)
  }
  return (
    <div>
      {showNav && (
        <div className={`h-full w-60 p-4 ${lightTheme ? "bg-gray-100 text-black" : "bg-gray-800 text-white"
          }`}>
          <button className={`mb-6 px-4 py-2 rounded-md ${lightTheme ? "bg-blue-200 text-blue-800" : "bg-green-500 text-white"}`} onClick={toggleTheme}>
            {lightTheme ? "Dark Theme" : "Light Theme"}
          </button>
          <nav className="flex flex-col gap-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/saved-tasks" className="hover:underline">Saved Tasks</Link>
            <Link to="/login">Login</Link>
            <button onClick={toggleNav}>{showNav ? "close" : "open"}</button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navigation;