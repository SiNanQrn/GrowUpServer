// 导入数据库操作模块
const db = require("../db/index");

// 获取TODO list的处理函数
exports.getToDoList = (req, res) => {
  const getStr = "select * from list";
  db.query(getStr, [], (err, results) => {
    if (err) return res.cc(err);

    if (res.length === 0) {
      return res.send({
        status: 503,
        msg: "未查询 TODO list 数据",
      });
    }

    res.send({
      status: 200,
      msg: "查询 TODO list 成功",
      data: results,
    });
  });
};

// 新增TODO list的处理函数
exports.insertToDoList = (req, res) => {
  const listInfo = req.body;
  console.log("listInfo", listInfo);

  if (!listInfo.listName || !listInfo.times) {
    return res.cc("项目名称或者周期名称不得为空");
  }

  // 定义 SQL 语句查询 listName 是否被占用
  const sqlStr = "select * from list where listName=?";
  db.query(sqlStr, [listInfo.listName], (err, results) => {
    // 执行 SQL 语句失败
    if (err) {
      return res.cc(err);
    }

    // 判断 listName 是否被占用
    if (results.length > 0) {
      return res.send({
        status: 503,
        msg: "listName 已被占用，请更换其他名称",
      });
    }

    // 定义插入 list 项目的语句
    const insertSql = "INSERT INTO list set ?";
    db.query(
      insertSql,
      {
        listName: listInfo.listName,
        times: listInfo.times,
        timesName: listInfo.timesName,
        type: listInfo.type,
        typeName: listInfo.typeName,
        classificationCode: listInfo.classificationCode,
        classificationName: listInfo.classificationName,
      },
      (err, results) => {
        // 执行 SQL 语句失败
        if (err) {
          return res.cc(err);
        }

        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          return res.cc("插入项目失败");
        }

        // 注册成功
        res.send({ status: 200, msg: "新增项目成功" });
      }
    );
  });
};

// 删除TODO list的处理函数
exports.deleteToDoList = (req, res) => {
  res.send({ status: 200, msg: "删除 TODO list 成功" });
  // const listInfo = req.body;
  // console.log("listInfo", listInfo);

  // if (!listInfo.listName || !listInfo.times) {
  //   return res.cc("项目名称或者周期名称不得为空");
  // }

  // // 定义 SQL 语句查询 listName 是否被占用
  // const sqlStr = "delete * from list where id=?";
  // db.query(sqlStr, [listInfo.listName], (err, results) => {
  //   // 执行 SQL 语句失败
  //   if (err) {
  //     return res.cc(err);
  //   }

  //   // 判断 listName 是否被占用
  //   if (results.length > 0) {
  //     return res.send({
  //       status: 503,
  //       msg: "listName 已被占用，请更换其他名称",
  //     });
  //   }

  //   // 定义插入 list 项目的语句
  //   const insertSql = "INSERT INTO list set ?";
  //   db.query(
  //     insertSql,
  //     {
  //       listName: listInfo.listName,
  //       times: listInfo.times,
  //       timesName: listInfo.timesName,
  //       type: listInfo.type,
  //       typeName: listInfo.typeName,
  //       classificationCode: listInfo.classificationCode,
  //       classificationName: listInfo.classificationName,
  //     },
  //     (err, results) => {
  //       // 执行 SQL 语句失败
  //       if (err) {
  //         return res.cc(err);
  //       }

  //       // SQL 语句执行成功，但影响行数不为 1
  //       if (results.affectedRows !== 1) {
  //         return res.cc("插入项目失败");
  //       }

  //       // 注册成功
  //       res.send({ status: 200, msg: "新增项目成功" });
  //     }
  //   );
  // });
};
