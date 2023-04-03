// 导入 epress 模块
const express = require('express');
// 创建服务实例
const app = express();

// 调用app.listen 方法，制定端口并启动web服务器
app.listen(8080, () => {
  console.log('api server running at http://127.0.0.1:8080')
})