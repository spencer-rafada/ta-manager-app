import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Admin } from "./views/index.js";

function App() {
  // Routes
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/admin" element={<Admin />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
