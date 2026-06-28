const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRoutes");
const { todosRouter } = require("./routes/todoRoutes");
require('dotenv').config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)

app.get("/", (req, res) => res.send("Backend running!"));
app.use("/api/auth", userRouter)
app.use("/api/todo", todosRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`server running on ${PORT}`))