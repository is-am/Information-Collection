//引入学生路由 开始
const Router = require("koa-router");
let studentRouter = new Router();

// 控制器，数据操作
let studentController = require("../controllers/student");

studentRouter
  //验证用户是否已存在
  .post("/student/check-Sno", studentController.checkSno)
  //返回所有用户信息,分页
  .post("/student/allStudentUser", studentController.allStudentUser)
  // //注册用户
  // .post("/student/register", studentController.register)
  // 更新用户账号信息
  .put("/student/update-Account", studentController.updateAccount)
  // 用户上传头像
  .post("/student/upload-Photo", studentController.updatePhoto)
  // 查询学生用户
  .post("/student/queryingStudent", studentController.queryingStudent)
  //个人信息收录
  .post("/student/personalInfo", studentController.personalInfo)
  //个人信息查询
  .post("/student/queryPersonalInfo", studentController.queryPersonalInfo)
  //学生联系方式收录
  .post("/student/studentContact", studentController.studentContact)
  //学生联系方式查询
  .post("/student/queryStudentContact", studentController.queryStudentContact)
  //户口档案转移信息收录
  .post("/student/studentRecord", studentController.studentRecord)
  //户口档案转移信息查询
  .post("/student/queryStudentRecord", studentController.queryStudentRecord)
  //实习单位信息收录
  .post("/student/internshipUnits", studentController.internshipUnits)
  //实习单位信息查询
  .post("/student/queryInternshipUnits", studentController.queryInternshipUnits)
  // 就业信息收录
  .post("/student/studentsEmployment", studentController.studentsEmployment)
  //就业信息查询
  .post("/student/queryStuEmployment", studentController.queryStuEmployment)
  // 报道证信息收录
  .post("/student/credential", studentController.credential)
  //报道证信息查询
  .post("/student/queryCredential", studentController.queryCredential)
  // 就业意向收录
  .post("/student/studentsIntention", studentController.studentsIntention)
  //就业意向查询
  .post(
    "/student/queryStudentsIntention",
    studentController.queryStudentsIntention
  );
//引入路由 结束
module.exports = studentRouter;
