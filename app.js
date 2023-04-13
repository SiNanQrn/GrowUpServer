// 导入 epress 模块
const express = require("express");
// 创建服务实例
const app = express();

// 导入并配置 cors 中间件
const cors = require("cors");
app.use(cors());

// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));

// 封装 res.cc 函数
app.use((req, res, next) => {
  res.cc = function (err, status = 501) {
    res.send({ status, message: err instanceof Error ? err.message : err });
  };
  next();
});

// 导入并注册todo路由模块
const todoRouter = require("./router/todo");
app.use("/api", todoRouter);

// 调用app.listen 方法，制定端口并启动web服务器
app.listen(3007, () => {
  console.log("api server running at http://127.0.0.1:3007");
});
