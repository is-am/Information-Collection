//引入管理员路由 开始
const Router = require("koa-router");
let adminRouter = new Router();

// 控制器，数据操作
let adminControllers = require("../controllers/admin");

adminRouter
  //注册教师用户
  .post("/admin/admteacherregister", adminControllers.teacherregister)
  // 更新用户账号信息
  .put("/admin/updateTeacher", adminControllers.updateTeacher)
  //删除教师用户
  .delete("/admin/deleteTeacher", adminControllers.deleteTeacher)
  //返回所有教师用户信息，分页
  .post("/admin/allTeacher", adminControllers.allTeacher)
  // 查询教师用户
  .post("/admin/queryTeacher", adminControllers.queryTeacher)
  //删除学生用户
  .delete("/admin/deleteStudent", adminControllers.deleteStudent)
  //注册学生用户
  .post("/admin/admstudentregister", adminControllers.studentregister)
  //添加通知
  .post("/admin/addNotification", adminControllers.addNotification)
  // 获取所有通知
  .get("/admin/Notification", adminControllers.Notification)
  //返回所有通知信息，分页
  .post("/admin/allNotification", adminControllers.allNotification)
  // 更新通知信息
  .put("/admin/updateNotification", adminControllers.updateNotification)
  //删除通知
  .delete("/admin/deleteNotification", adminControllers.deleteNotification)
  // 查询通知
  .post("/admin/queryNotifications", adminControllers.queryNotifications)
  //添加公告
  .post("/admin/addAffiche", adminControllers.addAffiche)
  // 获取所有公告
  .get("/admin/Affiche", adminControllers.Affiche)
  //返回所有公告信息,分页
  .post("/admin/allAffiche", adminControllers.allAffiche)
  // 更新公告信息
  .put("/admin/updateAffiche", adminControllers.updateAffiche)
  //删除公告
  .delete("/admin/deleteAffiche", adminControllers.deleteAffiche)
  // 查询公告
  .post("/admin/queryAffiches", adminControllers.queryAffiches);

//引入路由 结束
module.exports = adminRouter;
