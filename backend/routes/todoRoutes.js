const express = require("express")
const router = express.Router
const { userauth } = require("../middleware/userauth")
const { addTodo, deleteTodo, updateTodo, getAllTodos } = require("../controllers/todoController")
const todosRouter = router()

todosRouter.post('/add', userauth, addTodo)
todosRouter.delete("/delete/:todoId", userauth, deleteTodo);
todosRouter.patch("/update/:todoId", userauth, updateTodo );
todosRouter.get("/getalltodos", userauth, getAllTodos);

module.exports = {
    todosRouter
}

// controllers in detail middlewares-