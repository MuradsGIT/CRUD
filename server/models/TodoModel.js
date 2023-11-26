const mongoose = require('mongoose'); 
  
const todoSchema = new mongoose.Schema({ 
    todo: { 
        type: String, 
    }, 
    status: { 
        type: Boolean, 
    }, 
  
}); 
  
  
const TodoModel = mongoose.model("todos", todoSchema); 
  
module.exports = TodoModel;