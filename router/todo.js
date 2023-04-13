const express = require("express");
// 创建 路由对象
const router = express.Router();
// 导入路由处理函数
const todo_handler = require("../router_handler/todo");

// 获取 TODO list
router.get("/getTodo", todo_handler.getToDoList);

// 新增 TODO list
router.post("/insertTodo", todo_handler.insertToDoList);

// 将路由共享出去
module.exports = router;
