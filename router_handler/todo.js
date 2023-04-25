// 导入数据库操作模块
const db = require("../db/index");
// 导入工具函数
const {
  changeTime,
  isSameDay,
  isSameWeek,
  isSameMonth,
} = require("../util/index");

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

// 获取每日list的处理函数
exports.getDayList = (req, res) => {
  const getStr = "select * from list";
  db.query(getStr, [], (err, results) => {
    if (err) return res.cc(err);

    if (res.length === 0) {
      return res.send({
        status: 503,
        msg: "未查询 TODO list 数据",
      });
    }

    // 获取当天时间
    let date = changeTime(new Date());
    console.log("date", date);
    // 构造SQL语句 若是'每日一次'且非当日 或 '每周一次'且非本周 或 '每月一次'且非本月，将已完成改为false;
    const sql = `UPDATE list SET isFinish = 'false' 
    WHERE
     times = '1'
     AND isFinish = 'true'
     AND gmtModify != '${date}' 
    OR
     times = '2'
     AND isFinish = 'true'
     AND YEARWEEK(gmtModify) != YEARWEEK('${date}')
    OR
     times = '1'
     AND isFinish = 'true'
     AND YEAR(gmtModify) = YEAR('${date}')&&MONTH(gmtModify) != MONTH('${date}');`;

    // TODO：设置gmtModify
    db.query(sql, [], (err, dailRes) => {
      if (err) return res.cc(err);
      res.send({
        status: 200,
        msg: "查询每日TODO成功",
        data: results,
      });
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

// 更新TODO list的处理函数
exports.updateToDoList = (req, res) => {
  const listInfo = req.body;
  console.log("listInfo", listInfo);

  if (!listInfo.id || !listInfo.isFinish) {
    return res.cc("id或者完成值不得为空");
  }

  // 定义 SQL 语句查询 listName 是否被占用
  const sqlStr = "update list set isFinish=? where id=?";
  db.query(sqlStr, [listInfo.isFinish, listInfo.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    console.log("results", results);
    if (results.affectedRows !== 1) return res.cc("更新失败");

    // 更新成功
    res.send({
      status: 200,
      msg: "更新成功",
    });
  });
};

// 删除TODO list的处理函数
exports.deleteToDoList = (req, res) => {
  // 定义 SQL 语句查询 listName 是否被占用
  const sqlStr = "delete from list where id=?";
  db.query(sqlStr, [req.params.id], (err, results) => {
    // 执行 SQL 语句失败
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc("删除失败");

    // 删除成功
    res.send({
      status: 200,
      msg: "删除成功",
    });
  });
};
