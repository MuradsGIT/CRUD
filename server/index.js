 
const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors') 
  const TodoModel = require('./models/TodoModel')
const app = express(); 
app.use(cors()); 
app.use(express.json()); 
  
mongoose.connect("mongodb+srv://murad:murad123@cluster0.shxziqo.mongodb.net/crud"); 
  
mongoose.connection.on("error", (error) => { 
    console.error("MongoDB connection error:", error); 
}); 


app.get("/", (req, res) => { 
    TodoModel.find({}) 
        .then((todoList) => res.json(todoList)) 
        .catch((err) => res.json(err)) 
}); 


  
app.post("/createTodo", (req, res) => { 
    TodoModel.create({ 
        todo: req.body.todo, 
        status: req.body.status, 
    }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
  
app.put("/editTodo/:id", (req, res) => { 
    const id = req.params.id; 
    const updateData = { 
        todo: req.body.chosenTodo, 
    }; 
    TodoModel.findByIdAndUpdate(id, updateData) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 


app.put("/handleStatus/:id", (req, res) => { 
    const id = req.params.id; 
  
    TodoModel.findByIdAndUpdate(id, req.body) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 
  
app.delete("/deleteTodo/:id", (req, res) => { 
    const id = req.params.id; 
    TodoModel.findByIdAndDelete({ _id: id }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)); 
}); 

  
app.listen(3001, () => { 
    console.log('Server running on 3001'); 
}); 