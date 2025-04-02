// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm";
import TaskPage from "./pages/TaskPage";
import TaskDetail from "./components/TaskDetail";
import TaskEdit from "./components/TaskEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthForm />} />{" "}
        {/* ルートパスにAuthFormコンポーネントを表示 */}
        <Route path="/tasks" element={<TaskPage />} />{" "}
        {/* /tasksにTaskPageコンポーネントを表示 */}
        <Route path="/tasks/:id" element={<TaskDetail />} />{" "}
        {/* /tasks/:idにTaskDetailコンポーネントを表示 */}
        <Route path="/tasks/edit/:id" element={<TaskEdit />} />{" "}
        {/* /tasks/edit/:idにTaskEditコンポーネントを表示 */}
      </Routes>
    </div>
  );
}

export default App;
