const db = require("./db");
module.exports = {
  // 检查该学生用户是否存在
  getStudent: async () => await db.q("select * from student_account", []),
  // 学生登录
  findname: async (sno) =>
    await db.q("select * from student_account  where sno = ?", sno),
  // 管理员登录
  adminname: async (sno) =>
    await db.q("select * from admin  where sno = ?", sno),
  // 教师登录
  teachername: async (sno) =>
    await db.q("select * from teacher  where sno = ?", sno),
  // 注册学生 传入是对象，使用Object.values转变成数组
  addStudentUsers: async (saveStudentsInfo) =>
    await db.q(
      "insert into student_account (sno,name,Class,password,photo,priviege) values (?,?,?,?,?,?)",
      Object.values(saveStudentsInfo)
    ),
  // 更新教师用户账号信息
  updateteacher: async (saveTeacherInfo) =>
    await db.q(
      "update teacher set name=?,password=?,photo=? where sno=? ",
      Object.values(saveTeacherInfo)
    ),

  // 更新管理员用户账号信息
  updateAdmin: async (saveAdminInfo) =>
    await db.q(
      "update admin set sno=?,name=?,password=?,photo=? where sno=? ",
      Object.values(saveAdminInfo)
    ),
};
