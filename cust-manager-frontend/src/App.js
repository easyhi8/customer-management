// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm";
import CustPage from "./pages/CustPage";
import CustDetail from "./components/CustDetail";
import CustEdit from "./components/CustEdit";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthForm />} />{" "}
        {/* ルートパスにAuthFormコンポーネントを表示 */}
        <Route path="/custs" element={<CustPage />} />{" "}
        {/* /custsにCustPageコンポーネントを表示 */}
        <Route path="/custs/:id" element={<CustDetail />} />{" "}
        {/* /custs/:idにCustDetailコンポーネントを表示 */}
        <Route path="/custs/edit/:id" element={<CustEdit />} />{" "}
        {/* /custs/edit/:idにCustEditコンポーネントを表示 */}
      </Routes>
    </div>
  );
}

export default App;
