const db = require("./db");
module.exports = {
  // 删除学生用户
  deleteStudent: async (sno) =>
    await db.q("DELETE FROM student_account WHERE sno=? ", sno),
  // 注册学生 传入是对象，使用Object.values转变成数组
  addStudentUsers: async (saveStudentsInfo) =>
    await db.q(
      "insert into student_account (sno,name,Class,password,photo,priviege) values (?,?,?,?,?,?)",
      Object.values(saveStudentsInfo)
    ),
  // 学生用户是否存在
  findname: async (sno) =>
    await db.q("select * from student_account  where sno = ?", sno),

  // 删除教师用户
  deleteTeacher: async (sno) =>
    await db.q("DELETE FROM teacher WHERE sno=? ", sno),
  // 注册教师 传入是对象，使用Object.values转变成数组
  addTeacherUsers: async (saveTeachersInfo) =>
    await db.q(
      "insert into teacher (sno,name,password,college,specialty,photo,priviege) values (?,?,?,?,?,?,?)",
      Object.values(saveTeachersInfo)
    ),
  // 教师用户是否存在
  findTeacher: async (sno) =>
    await db.q("select * from teacher  where sno = ?", sno),
  // 获取所有教师用户页数
  TeacherPages: async () =>
    await db.q("SELECT COUNT(*) AS id FROM teacher", []),
  // 分页教师用户信息
  allTeacher: async (page, pageSize) =>
    await db.q(`SELECT * FROM teacher LIMIT ${page},${pageSize}`),
  // 查询教师用户
  queryTeacher: async (keyword) =>
    await db.q(
      "SELECT * FROM teacher WHERE CONCAT(`id`,`sno`,`name`,`college`,`specialty`,`photo`,`priviege`) LIKE '%" +
        keyword +
        "%'"
    ),
  // 更新用户账号信息
  updateTeacher: async (saveStudentsInfo) =>
    await db.q(
      "update teacher set sno=?,name=?,password=?,college=?,specialty=?,photo=?,priviege=? where sno=? ",
      Object.values(saveStudentsInfo)
    ),
  // 添加通知
  addNotification: async (notificationMessage) =>
    await db.q(
      "insert into admin_notice (type,issuer,content,sno,time,accessory) values (?,?,?,?,?,?)",
      Object.values(notificationMessage)
    ),
  Notification: async () => await db.q("select * from admin_notice", []),
  // 获取所有通知页数
  NotifyPages: async () =>
    await db.q("SELECT COUNT(*) AS id FROM admin_notice", []),
  // 分页通知
  allNotification: async (page, pageSize) =>
    await db.q(`SELECT * FROM admin_notice LIMIT ${page},${pageSize}`),
  // 更新通知
  updateNotification: async (saveStudentsInfo) =>
    await db.q(
      "update admin_notice set type=?,issuer=?,content=?,sno=?,time=?,accessory=? where id=? ",
      Object.values(saveStudentsInfo)
    ),
  // 删除通知
  deleteNotification: async (id) =>
    await db.q("DELETE FROM admin_notice WHERE id=? ", id),
  // 查询通知
  queryNotifications: async (keyword) =>
    await db.q(
      "SELECT * FROM admin_notice WHERE CONCAT(`id`,`type`,`issuer`,`content`,`sno`,`time`,`accessory`) LIKE '%" +
        keyword +
        "%'"
    ),

  Affiche: async () => await db.q("select * from admin_affiche", []),
  // 添加公告
  addAffiche: async (notificationMessage) =>
    await db.q(
      "insert into admin_affiche (type,issuer,content,sno,time,accessory) values (?,?,?,?,?,?)",
      Object.values(notificationMessage)
    ),
  // 获取所有公告页数
  affichePages: async () =>
    await db.q("SELECT COUNT(*) AS id FROM admin_affiche", []),

  // 分页公告
  allAffiche: async (page, pageSize) =>
    await db.q(`SELECT * FROM admin_affiche LIMIT ${page},${pageSize}`),

  // 更新公告
  updateAffiche: async (saveStudentsInfo) =>
    await db.q(
      "update admin_affiche set type=?,issuer=?,content=?,sno=?,time=?,accessory=? where id=? ",
      Object.values(saveStudentsInfo)
    ),

  // 删除公告
  deleteAffiche: async (id) =>
    await db.q("DELETE FROM admin_affiche WHERE id=? ", id),

  // 查询公告
  queryAffiches: async (keyword) =>
    await db.q(
      "SELECT * FROM admin_affiche WHERE CONCAT(`id`,`type`,`issuer`,`content`,`sno`,`time`,`accessory`) LIKE '%" +
        keyword +
        "%'"
    ),
};
