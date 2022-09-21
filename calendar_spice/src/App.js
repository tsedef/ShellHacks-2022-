import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calendar from "./Calendar";
import Landing from "./pages/Landing";
import "./main.css";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/home" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
