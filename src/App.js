import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Admin, Dashboard, Move } from "./views/index.js";
import NavBar from "./components/layout/NavBar.js";

function App() {
  // Routes
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
          <Route exact path="/move" element={<Move />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
