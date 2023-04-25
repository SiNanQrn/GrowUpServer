// 更改时间格式
function changeTime(date) {
  // 获取年、月、日
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 注意月份需要加1
  const day = date.getDate();

  // 将月份和日期转换成两位数的格式，不足两位的在前面补0
  const monthStr = month < 10 ? "0" + month : month;
  const dayStr = day < 10 ? "0" + day : day;

  // 拼接成yyyy-mm-dd的格式
  const dateStr = year + "-" + monthStr + "-" + dayStr + " 00:00:00";
  return dateStr;
}

// 比较时间是否是在同一天
function isSameDay(dateStr1, dateStr2) {
  return dateStr1 === dateStr2;
}

// 比较时间是否是在同一周
function isSameWeek(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  // 定义周的起始日为周一
  const startOfWeek = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate() - date1.getDay() + 1
  );

  // 计算两个日期之间的差值
  const diffInDays = Math.abs(
    Math.floor((date1 - date2) / (1000 * 60 * 60 * 24))
  );

  // 判断两个日期是否在同一周内
  return diffInDays <= 6 && date2 >= startOfWeek;
}

// 比较时间是否是在同一月
function isSameMonth(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1);
  const date2 = new Date(dateStr2);

  // 判断两个日期的年份和月份是否相同
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
}

module.exports = { changeTime, isSameDay, isSameWeek, isSameMonth };
