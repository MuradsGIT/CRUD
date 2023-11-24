/* eslint-disable no-unused-vars */

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Todo.scss";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

const Todo = () => {
  const [todos, setTodos] = new useState([]);
  const [todo, setTodo] = useState("");
  const [amountDone, setAmountDone] = useState(0);
  const [amount, setAmount] = useState(0);
  const handleStatus = (e) => {
    console.log(e);
    if (e.status) {
      axios
        .put("http://localhost:3001/handleStatus/" + e._id, { status: false })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put("http://localhost:3001/handleStatus/" + e._id, { status: true })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const addTodo = (e) => {
    e.preventDefault();
    setTodo("");
    if (todo.length >= 1) {
      axios.post("http://localhost:3001/createTodo", {
        todo: todo,
        status: false,
      });
    }
  };
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3001/deleteTodo/${id}`)
      .then(() => {
        return null;
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((res) => {
        setTodos(res.data);
        // Count the number of completed todos
        const completedTodos = res.data.filter((todo) => todo.status);
        setAmountDone(completedTodos.length);

        setAmount(todos.length);
      })
      .catch((err) => console.log(err));
  }, [todos]);
  return (
    <div className="todo-container">
      <div className="todo-info">
        <div className="todo-info-text">
          <h1>Todo Done</h1>
          <p>keep it up</p>
        </div>

        <div className="todo-info-bubble">
          <p>
            {amountDone}/{amount}
          </p>
        </div>
      </div>
      <form className="create-todo" onSubmit={(e) => addTodo(e)}>
        <input
          type="text"
          value={todo}
          placeholder="Write your todo.."
          onChange={(e) => setTodo(e.target.value)}
        />
        <button>+</button>
      </form>

      <div className="todo-list">
        {todos.toReversed().map((todo) => {
          if (todo.status) {
            return (
              <div className="todo" key={todo._id}>
                <div className="action">
                  {" "}
                  <button
                    className="true"
                    onClick={() => handleStatus(todo)}
                  ></button>{" "}
                  <p>{todo.todo}</p>
                </div>

                <div className="todo-actions">
                  <Link to={`/update/${todo._id}`}>
                    <h1>{<FaRegEdit />}</h1>
                  </Link>
                    <h1 onClick={() => deleteTodo(todo._id) }>{<MdOutlineDelete />}</h1>
                </div>
              </div>
            );
          } else {
            return (
              <div className="todo" key={todo._id}>
                <div className="action">
                  {" "}
                  <button
                    className="false"
                    onClick={() => handleStatus(todo)}
                  ></button>{" "}
                  <p>{todo.todo}</p>
                </div>

                <div className="todo-actions">
                  <Link to={`/update/${todo._id}`}>
                    <h1>{<FaRegEdit />}</h1>
                  </Link>
                  <h1 onClick={() => deleteTodo(todo._id) }>{<MdOutlineDelete />}</h1>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Todo;

