const express = require("express");
// 创建 路由对象
const router = express.Router();

// 导入路由处理函数
const todo_handler = require("../router_handler/todo");

// 导入验证表单的中间件
const expressJoi = require("@escook/express-joi");
// 导入删除校验规则对象 
const { delete_schema } = require("../schema/todo");

// 获取 TODO list
router.get("/getTodo", todo_handler.getToDoList);

// 新增 TODO list
router.post("/insertTodo", todo_handler.insertToDoList);

// 删除 TODO list
router.get(
  "/deleteTodo/:id",
  expressJoi(delete_schema),
  todo_handler.deleteToDoList
);

// 将路由共享出去
module.exports = router;
