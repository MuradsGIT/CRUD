/* eslint-disable no-unused-vars */
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Todo from "./components/Todo";
import UpdateTodo from "./components/UpdateTodo";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/update/:id" element={<UpdateTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
