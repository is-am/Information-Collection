//引入教师路由 开始
const Router = require("koa-router");

let teacherRouter = new Router();

// 控制器，数据操作
let teacherControllers = require("../controllers/teacher");

teacherRouter

  //返回学生就业信息信息，分页
  .post("/teacher/allEmployment", teacherControllers.allEmployment)
  //删除学生就业信息
  .delete("/teacher/deleteEmployment", teacherControllers.deleteEmployment)
  // 查询学生就业信息
  .post("/teacher/queryEmployments", teacherControllers.queryEmployments)

  //返回学生联系方式信息，分页
  .post("/teacher/allContact", teacherControllers.allContact)
  //删除学生联系方式
  .delete("/teacher/deleteContact", teacherControllers.deleteContact)
  // 查询学生联系方式
  .post("/teacher/queryContacts", teacherControllers.queryContacts)

  //返回学生报到证信息，分页
  .post("/teacher/allCredential", teacherControllers.allCredential)
  //删除学生报到证
  .delete("/teacher/deleteCredential", teacherControllers.deleteCredential)
  // 查询学生报到证
  .post("/teacher/queryCredentials", teacherControllers.queryCredential)

  //返回学生就业意向信息，分页
  .post("/teacher/allIntention", teacherControllers.allIntention)
  //删除学生就业意向
  .delete("/teacher/deleteIntention", teacherControllers.deleteIntention)
  // 查询学生就业意向
  .post("/teacher/queryIntentions", teacherControllers.queryIntention)

  //返回户口档案信息表信息，分页
  .post("/teacher/allRecord", teacherControllers.allRecord)
  //删除户口档案信息表
  .delete("/teacher/deleteRecord", teacherControllers.deleteRecord)
  // 查询户口档案信息表
  .post("/teacher/queryRecords", teacherControllers.queryRecord)

  //返回学生个人信息表信息，分页
  .post("/teacher/allStudentInfo", teacherControllers.allStudentInfo)
  //删除学生个人信息表
  .delete("/teacher/deleteStudentInfo", teacherControllers.deleteStudentInfo)
  // 查询学生个人信息表
  .post("/teacher/queryStudentInfos", teacherControllers.queryStudentInfo)

  //返回实习单位信息表信息，分页
  .post("/teacher/allUnits", teacherControllers.allUnits)
  //删除实习单位信息表
  .delete("/teacher/deleteUnits", teacherControllers.deleteUnits)
  // 查询实习单位信息表
  .post("/teacher/queryUnits", teacherControllers.queryUnits)
  // 修改学生总人数
  .post("/teacher/headcount", teacherControllers.headcount)
  // 查询表格填写数
  .post("/teacher/Containers", teacherControllers.Containers)
  // 获取表列数据
  .get("/teacher/chartData", teacherControllers.chartData);
//引入路由 结束
module.exports = teacherRouter;
