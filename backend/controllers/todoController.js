const Todo = require("../models/Todos");
const { todosSchema } = require("../validation/Schemas");

const addTodo = async (req, res) => {
  try {
    const parseData = todosSchema.safeParse(req.body);

    if (!parseData.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: parseData.error.format(),
      });
    }

    const userId = req.userId;
    const { title, completed, description } = parseData.data;

    const newTodo = await Todo.create({
      title: title,
      description: description,
      completed: completed,
      user: userId,
    });

    res.status(201).json({
      success: true,
      msg: "Todo added succesfully",
      todo: newTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error while adding todo",
      error: error.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const { todoId } = req.params;
    if (!todoId) {
      return res.status(401).json({
        msg: "Please enter a todoId",
      });
    }

    const result = await Todo.deleteOne({
      _id: todoId,
      user: userId,
    });

    if (result.deletedCount == 0) {
      return res.status(404).json({
        success: false,
        msg: "Todo not found or unauthorixed",
      });
    }

    res.status(200).json({
      success: true,
      msg: "Todo deleted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Error deleting todo",
      error: error.message,
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const userId = req.userId;
    const { todoId } = req.params;
    const { title, description, completed } = req.body;

    const updates = {};
    if (title?.trim()) updates.title = title.trim();
    if (description?.trim()) updates.description = description.trim();
    if (completed !== undefined) updates.completed = completed;

    if (Object.keys(updates).length == 0) {
      return res.status(400).json({
        success: false,
        msg: "No update data provided",
      });
    }

    const updatedTodo = await Todo.findOneAndUpdate(
      {
        _id: todoId,
        user: userId,
      },
      updates,
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(404).json({
        success: false,
        msg: "Todo not found or unauthorized",
      });
    }
    res.status(200).json({
      success: true,
      msg: "Todo updated succesfully ",
      todo: updatedTodo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "error while updating todo",
    });
  }
};

const getAllTodos = async (req, res) => {
  try {
    const userId = req.userId;
    const todos = await Todo.find({ user: userId })
      .sort({ createdAt: -1 })
      .select("title description completed createdAt");

    res.status(200).json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching todos",
      error: error.message,
    });
  }
};

module.exports = { addTodo, deleteTodo, updateTodo, getAllTodos };
