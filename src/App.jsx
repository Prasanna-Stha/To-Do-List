import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./context/Context";
import SavedTasks from "./components/SavedTasks";
import Navigation from "./components/Navigation";
import ToDoList from "./components/ToDoList";
import Login from "./components/Login";

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="flex h-screen">
          <Navigation />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<ToDoList />} />
              <Route path="/saved-tasks" element={<SavedTasks />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
