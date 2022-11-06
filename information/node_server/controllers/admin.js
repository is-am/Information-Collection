const path = require("path");
//数据库连接
const adminModel = require("../models/admin");
// 处理上传的信息
function optUpload(ctx) {
  let { type, issuer, content, sno, time } = ctx.request.body;
  let { accessory } = ctx.request.files;
  if (!content) {
    content = "无";
  }
  Message = {
    type,
    issuer,
    content,
    sno,
    time,
  };
  Message.accessory = "无";
  if (accessory) {
    Message.accessory = path.basename(accessory.filepath);
  }
  return Message;
}
// 处理上传的学生账户信息
function optUploadStudent(ctx) {
  let { sno, name, Class, password } = ctx.request.body;
  let { photo } = ctx.request.files;
  saveStudentsInfo = {
    sno,
    name,
    Class,
    password,
  };
  //头像不能为空
  if (!photo) {
    ctx.body = { code: "002", msg: "头像必须上传真实照片" };
    return;
  }
  saveStudentsInfo.photo = path.basename(photo.filepath);
  saveStudentsInfo.priviege = "学生用户";
  return saveStudentsInfo;
}
// 处理上传的教师账户信息
function saveTeachers(ctx) {
  let { sno, name, password, college, specialty } = ctx.request.body;
  let { photo } = ctx.request.files;
  saveTeachersInfo = {
    sno,
    name,
    password,
    college,
    specialty,
  };
  //头像不能为空
  if (!photo) {
    ctx.body = { code: "002", msg: "头像必须上传真实照片" };
    return;
  }
  saveTeachersInfo.photo = path.basename(photo.filepath);
  saveTeachersInfo.priviege = "教师用户";
  return saveTeachersInfo;
}
module.exports = {
  //   学生注册
  studentregister: async (ctx) => {
    let { sno } = ctx.request.body;
    let users = await adminModel.findname(sno);
    console.log(users);
    if (users.length !== 0) {
      ctx.body = { code: "002", msg: "用户已存在不可以注册" };
      return;
    }
    let saveStudentsInfo = optUploadStudent(ctx);
    console.log(saveStudentsInfo);
    let result = await adminModel.addStudentUsers(saveStudentsInfo);
    // console.log(result);
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "用户注册成功" + result.message,
    };
  },
  // 删除学生用户
  deleteStudent: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(sno);
    let result = await adminModel.deleteStudent(sno);
    console.log(result);

    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "删除失败" + result.message,
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "删除成功",
    };
  },
  // 注册教师用户
  teacherregister: async (ctx) => {
    let { sno } = ctx.request.body;
    let users = await adminModel.findTeacher(sno);
    console.log(users);
    if (users.length !== 0) {
      ctx.body = { code: "002", msg: "不可以注册" };
      return;
    }
    let saveTeachersInfo = saveTeachers(ctx);
    console.log(saveTeachersInfo);
    let result = await adminModel.addTeacherUsers(saveTeachersInfo);
    // console.log(result);
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "用户注册成功" + result.message,
    };
  },

  // 删除教师用户
  deleteTeacher: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(sno);
    let result = await adminModel.deleteTeacher(sno);
    console.log(result);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "删除失败" + result.message,
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "删除成功",
    };
  },

  // 获取教师用户信息，分页处理
  allTeacher: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await adminModel.allTeacher(start, pageSize); //分页数据
    console.log(pageInfo);
    let total = await adminModel.TeacherPages(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 查询教师用户
  queryTeacher: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await adminModel.queryTeacher(keyword);
    let total = result.length;
    // console.log(keyword);
    // console.log(total);
    if (result.length > 0) {
      ctx.body = {
        code: "001",
        msg: { result, total },
      };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "暂无数据",
    };
  },
  // 更新教师用户账号
  updateTeacher: async (ctx) => {
    let saveStudentsInfo = saveTeachers(ctx);
    let { Sno } = ctx.request.body;
    Object.assign(saveStudentsInfo, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    console.log(saveStudentsInfo);
    let result = await adminModel.updateTeacher(saveStudentsInfo);
    if (result.affectedRows !== 1) {
      ctx.body = {
        //ajax接收到的状态信息
        code: "002",
        msg: "账号信息更新失败" + result.message,
      };
      return;
    }
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "账号信息更新成功" + result.message,
    };
  },
  // 发布通知
  addNotification: async (ctx) => {
    let notificationMessage = optUpload(ctx);
    let result = await adminModel.addNotification(notificationMessage);
    // console.log(result);
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "发布通知成功" + result.message,
    };
  },
  // 获取所有公告
  Notification: async (ctx) => {
    let result = await adminModel.Notification();
    // console.log(result);
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: result,
    };
  },
  // 获取通知，分页处理
  allNotification: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await adminModel.allNotification(start, pageSize); //分页数据

    let total = await adminModel.NotifyPages(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 更新通知
  updateNotification: async (ctx) => {
    let updateNotificationInfo = optUpload(ctx);
    let { id } = ctx.request.body;
    Object.assign(updateNotificationInfo, { id }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    console.log(updateNotificationInfo);
    let result = await adminModel.updateNotification(updateNotificationInfo);
    if (result.affectedRows !== 1) {
      ctx.body = {
        //ajax接收到的状态信息
        code: "002",
        msg: "通知信息更新失败" + result.message,
      };
      return;
    }
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "通知信息更新成功" + result.message,
    };
  },
  // 删除通知
  deleteNotification: async (ctx, next) => {
    let id = ctx.request.body;
    let result = await adminModel.deleteNotification(id);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "删除失败" + result.message,
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "删除成功",
    };
  },

  // 查询通知
  queryNotifications: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await adminModel.queryNotifications(keyword);
    let total = result.length;
    // console.log(keyword);
    // console.log(total);
    if (result.length > 0) {
      ctx.body = {
        code: "001",
        msg: { result, total },
      };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "暂无数据",
    };
  },

  // 获取所有公告
  Affiche: async (ctx) => {
    let result = await adminModel.Affiche();
    // console.log(result);
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: result,
    };
  },

  // 发布公告
  addAffiche: async (ctx) => {
    let AfficheMessage = optUpload(ctx);
    let result = await adminModel.addAffiche(AfficheMessage);
    // console.log(result);
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "发布公告成功" + result.message,
    };
  },
  // 获取公告，分页处理
  allAffiche: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await adminModel.allAffiche(start, pageSize); //分页数据
    console.log(pageInfo);
    let total = await adminModel.affichePages(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 更新公告
  updateAffiche: async (ctx) => {
    let updateAfficheInfo = optUpload(ctx);
    let { id } = ctx.request.body;
    Object.assign(updateAfficheInfo, { id }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    console.log(updateAfficheInfo);
    let result = await adminModel.updateAffiche(updateAfficheInfo);
    if (result.affectedRows !== 1) {
      ctx.body = {
        //ajax接收到的状态信息
        code: "002",
        msg: "公告信息更新失败" + result.message,
      };
      return;
    }
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "公告信息更新成功" + result.message,
    };
  },
  // 删除公告
  deleteAffiche: async (ctx, next) => {
    let id = ctx.request.body;
    let result = await adminModel.deleteAffiche(id);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "删除失败" + result.message,
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "删除成功",
    };
  },

  // 查询公告
  queryAffiches: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await adminModel.queryAffiches(keyword);
    let total = result.length;
    // console.log(keyword);
    // console.log(total);
    if (result.length > 0) {
      ctx.body = {
        code: "001",
        msg: { result, total },
      };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "暂无数据",
    };
  },
};
