import axios from "./axios";

// 登录
export const publicLogin = (param) => {
  return axios.request({
    //传入相关的配置
    url: "/public/login",
    //请求类型
    method: "post",
    //传入的参数
    data: param,
  });
};

// 获取用户
export const getUser = () => {
  return axios.request({
    url: "http://127.0.0.1:8880/public/getUser",
    method: "get",
  });
};

// 请求全部学生用户账号信息
export const StudentAllUser = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/student/allStudentUser",
    method: "post",
    data: param,
  });
};

// 请求更新学生用户信息
export const StudentupdateAccount = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/student/update-Account",
    method: "put",
    data: param,
  });
};

// 请求添加学生用户
export const StudentRegister = (param) => {
  return axios.request({
    url: "/public/register",
    method: "post",
    data: param,
  });
};
// 管理员请求添加学生用户
export const admstudentregister = (param) => {
  return axios.request({
    url: "/admin/admstudentregister",
    method: "post",
    data: param,
  });
};

// 管理员请求添加教师用户
export const admteacherregister = (param) => {
  return axios.request({
    url: "/admin/admteacherregister",
    method: "post",
    data: param,
  });
};
// 删除教师用户
export const deleteTeacher = (param) => {
  return axios.request({
    url: "/admin/deleteTeacher",
    method: "delete",
    data: param,
  });
};
// 返回教师用户，分页
export const allTeacher = (param) => {
  return axios.request({
    url: "/admin/allTeacher",
    method: "post",
    data: param,
  });
};
// 查询教师用户
export const queryTeacher = (param) => {
  return axios.request({
    url: "/admin/queryTeacher",
    method: "post",
    data: param,
  });
};
// 更新教师用户
export const updateTeacher = (param) => {
  return axios.request({
    url: "/admin/updateTeacher",
    method: "put",
    data: param,
  });
};

// 用户个人修改信息
export const ModifyInfo = (param) => {
  return axios.request({
    url: "/public/ModifyInfo",
    method: "put",
    data: param,
  });
};
// 删除通知信息
export const deleteStudent = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/deleteStudent",
    method: "delete",
    data: param,
  });
};

// 获取所有学生用户
export const studyAdd = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/add",
    method: "post",
    data: param,
  });
};

// 添加通知信息
export const noticeAdd = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/addNotification",
    method: "post",
    data: param,
  });
};

// 请求首页通知
export const Notification = () => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/Notification",
    method: "get",
  });
};

// 获取所有通知信息数量，分页数据
export const allNotification = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/allNotification",
    method: "post",
    data: param,
  });
};

// 更新通知信息
export const updateNotification = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/updateNotification",
    method: "put",
    data: param,
  });
};

// 删除通知信息
export const deleteNotification = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/deleteNotification",
    method: "delete",
    data: param,
  });
};

// 查询通知
export const queryNotifications = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/queryNotifications",
    method: "post",
    data: param,
  });
};

// 添加公告信息
export const addAffiche = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/addAffiche",
    method: "post",
    data: param,
  });
};

// 获取所有公告信息
export const Affichen = () => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/Affiche",
    method: "get",
  });
};

// 获取所有公告信息数量，分页数据
export const allAffichen = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/allAffiche",
    method: "post",
    data: param,
  });
};

// 更新公告信息
export const updateAffiche = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/updateAffiche",
    method: "put",
    data: param,
  });
};

// 删除公告信息
export const deleteAffiche = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/deleteAffiche",
    method: "delete",
    data: param,
  });
};

// 获取所有公告信息数量，分页数据
export const queryAffiches = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/admin/queryAffiches",
    method: "post",
    data: param,
  });
};

// 获取搜索学生用户数据
export const queryingStudent = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/student/queryingStudent",
    method: "post",
    data: param,
  });
};

// 学生个人信息收录
export const personalInfo = (param) => {
  return axios.request({
    url: "/student/personalInfo",
    method: "post",
    data: param,
  });
};
// 学生个人信息查询是否存在
export const queryPersonalInfo = (param) => {
  return axios.request({
    url: "/student/queryPersonalInfo",
    method: "post",
    data: param,
  });
};

// 学生联系方式收录
export const studentContact = (param) => {
  return axios.request({
    url: "/student/studentContact",
    method: "post",
    data: param,
  });
};
// 学生联系方式查询是否存在
export const queryStudentContact = (param) => {
  return axios.request({
    url: "/student/queryStudentContact",
    method: "post",
    data: param,
  });
};

// 户口档案转移信息收录
export const studentRecord = (param) => {
  return axios.request({
    url: "/student/studentRecord",
    method: "post",
    data: param,
  });
};
// 户口档案转移信息查询是否存在
export const queryStudentRecord = (param) => {
  return axios.request({
    url: "/student/queryStudentRecord",
    method: "post",
    data: param,
  });
};

// 实习单位信息收录
export const internshipUnits = (param) => {
  return axios.request({
    url: "/student/internshipUnits",
    method: "post",
    data: param,
  });
};
// 实习单位信息查询是否存在
export const queryInternshipUnits = (param) => {
  return axios.request({
    url: "/student/queryInternshipUnits",
    method: "post",
    data: param,
  });
};

// 就业信息收录
export const studentsEmployment = (param) => {
  return axios.request({
    url: "/student/studentsEmployment",
    method: "post",
    data: param,
  });
};

// 就业信息查询
export const queryStuEmployment = (param) => {
  return axios.request({
    url: "/student/queryStuEmployment",
    method: "post",
    data: param,
  });
};

// 报道证信息收录
export const credential = (param) => {
  return axios.request({
    url: "/student/credential",
    method: "post",
    data: param,
  });
};

// 报道证信息查询
export const queryCredential = (param) => {
  return axios.request({
    url: "/student/queryCredential",
    method: "post",
    data: param,
  });
};

// 就业意向收录
export const studentsIntention = (param) => {
  return axios.request({
    url: "/student/studentsIntention",
    method: "post",
    data: param,
  });
};

// 就业意向查询
export const queryStudentsIntention = (param) => {
  return axios.request({
    url: "/student/queryStudentsIntention",
    method: "post",
    data: param,
  });
};

// 获取学生就业信息数量，分页数据
export const allEmployment = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/allEmployment",
    method: "post",
    data: param,
  });
};

// 删除学生就业信息
export const deleteEmployment = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/deleteEmployment",
    method: "delete",
    data: param,
  });
};

// 查询学生就业信息
export const queryEmployments = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/queryEmployments",
    method: "post",
    data: param,
  });
};

// 获取学生就业信息数量，分页数据
export const allContact = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/allContact",
    method: "post",
    data: param,
  });
};

// 删除学生就业信息
export const deleteContact = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/deleteContact",
    method: "delete",
    data: param,
  });
};

// 查询学生就业信息
export const queryContacts = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/queryContacts",
    method: "post",
    data: param,
  });
};

// 获取学生报到证信息数量，分页数据
export const allCredential = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/allCredential",
    method: "post",
    data: param,
  });
};

// 删除学生报到证信息
export const deleteCredential = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/deleteCredential",
    method: "delete",
    data: param,
  });
};

// 查询学生报到证信息
export const queryCredentials = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/queryCredentials",
    method: "post",
    data: param,
  });
};

// 获取学生报到证信息数量，分页数据
export const allIntention = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/allIntention",
    method: "post",
    data: param,
  });
};

// 删除学生报到证信息
export const deleteIntention = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/deleteIntention",
    method: "delete",
    data: param,
  });
};

// 查询学生报到证信息
export const queryIntentions = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/queryIntentions",
    method: "post",
    data: param,
  });
};

// 获取学生户口档案信息数量，分页数据
export const allRecord = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/allRecord",
    method: "post",
    data: param,
  });
};

// 删除学生户口档案信息
export const deleteRecord = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/deleteRecord",
    method: "delete",
    data: param,
  });
};

// 查询学生户口档案信息
export const queryRecords = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/queryRecords",
    method: "post",
    data: param,
  });
};

// 获取学生个人信息数量，分页数据
export const allStudentInfo = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/allStudentInfo",
    method: "post",
    data: param,
  });
};

// 删除学生个人信息
export const deleteStudentInfo = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/deleteStudentInfo",
    method: "delete",
    data: param,
  });
};

// 查询学生个人信息
export const queryStudentInfos = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/queryStudentInfos",
    method: "post",
    data: param,
  });
};

// 获取学生实习单位信息数量，分页数据
export const allUnits = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/allUnits",
    method: "post",
    data: param,
  });
};

// 删除学生实习单位信息
export const deleteUnits = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/deleteUnits",
    method: "delete",
    data: param,
  });
};

// 查询学生实习单位信息
export const queryUnits = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/queryUnits",
    method: "post",
    data: param,
  });
};

// 查询表数
export const Containers = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/Containers",
    method: "post",
    data: param,
  });
};
// 修改学生总人数
export const StudentHeadcount = (param) => {
  return axios.request({
    url: "http://127.0.0.1:8880/teacher/headcount",
    method: "post",
    data: param,
  });
};

// 图表信息
export const chartData = (param) => {
  return axios.request({
    url: `http://127.0.0.1:8880/teacher/chartData?Class=${param}`,
    method: "get",
  });
};
