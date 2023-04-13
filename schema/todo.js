// 导入定义规则的模块
const joi = require("joi");

// 定义接口入参校验规则
const id = joi.number().integer().min(1).required();
exports.delete_schema = {
  params: { id },
};
