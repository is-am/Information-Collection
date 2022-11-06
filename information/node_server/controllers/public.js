const path = require("path");
//数据库连接
const publicModel = require("../models/public");
const studentModel = require("../models/student");
// 获取验证码
const captchapng = require("captchapng2");

// 获取路由数据
const adminmenu = require("../routeData/admin.json");
const studentmenu = require("../routeData/student.json");
const teachermenu = require("../routeData/teacher.json");

// 处理上传的学生账户信息
function optUpload(ctx) {
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
function optUploadteacher(ctx) {
  let { name, password } = ctx.request.body;
  let { photo } = ctx.request.files;
  saveTeacherInfo = {
    name,
    password,
  };
  //头像不能为空
  if (!photo) {
    ctx.body = { code: "002", msg: "头像必须上传真实照片" };
    return;
  }
  saveTeacherInfo.photo = path.basename(photo.filepath);
  return saveTeacherInfo;
}
// 处理上传的管理员账户信息
function optUploadadmin(ctx) {
  let { sno, name, password } = ctx.request.body;
  let { photo } = ctx.request.files;
  saveAdminInfo = {
    sno,
    name,
    password,
  };
  //头像不能为空
  if (!photo) {
    ctx.body = { code: "002", msg: "头像必须上传真实照片" };
    return;
  }
  saveAdminInfo.photo = path.basename(photo.filepath);
  return saveAdminInfo;
}
module.exports = {
  /*判断用户是否存在*/
  checkSno: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(sno);
    let users = await publicModel.findname(sno);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "可以注册" };
      return;
    }
    ctx.body = { code: "002", msg: "不可以注册" };
  },

  // 登录
  login: async (ctx, next) => {
    let { sno, password, priviege, v_code } = ctx.request.body;
    console.log(ctx.session);
    // v_code和ctx.session.v_code进行比较;
    if (v_code !== ctx.session.v_code) {
      ctx.body = {
        code: "002",
        msg: "验证码不匹配",
      };
      return;
    }

    // 管理员
    if (priviege === "0") {
      let users = await publicModel.adminname(sno);
      console.log(users);
      if (users.length === 0) {
        ctx.body = { code: "002", msg: "用户名或密码不正确" };
        return;
      }
      //2.查询用户名相关的用户
      let user = users[0]; //users返回的是数组，转变成对象

      if (user.password === password) {
        ctx.session.user = user;
        var getUser = ctx.session.user;
        const menu = adminmenu;
        ctx.body = { code: "001", msg: getUser, menu };
        return;
      }
      ctx.body = { code: "002", msg: "用户名或者密码不正确" };
    }
    // 教师
    if (priviege === "1") {
      let users = await publicModel.teachername(sno);
      if (users.length === 0) {
        ctx.body = { code: "002", msg: "用户名或密码不正确" };
        return;
      }
      //2.查询用户名相关的用户
      let user = users[0]; //users返回的是数组，转变成对象

      if (user.password === password) {
        ctx.session.user = user;
        var getUser = ctx.session.user;
        const menu = teachermenu;
        ctx.body = { code: "001", msg: getUser, menu };
        return;
      }
      ctx.body = { code: "002", msg: "用户名或者密码不正确" };
    }
    // 学生
    if (priviege === "2") {
      let users = await publicModel.findname(sno);
      if (users.length === 0) {
        ctx.body = { code: "002", msg: "用户名或密码不正确" };
        return;
      }
      //2.查询用户名相关的用户
      let user = users[0]; //users返回的是数组，转变成对象

      if (user.password === password) {
        ctx.session.user = user;
        var getUser = ctx.session.user;
        const menu = studentmenu;
        ctx.body = { code: "001", msg: getUser, menu };
        return;
      }
      ctx.body = { code: "002", msg: "用户名或者密码不正确" };
    }
  },
  //   注册
  register: async (ctx) => {
    let { sno, v_code } = ctx.request.body;
    let users = await publicModel.findname(sno);
    console.log(users);
    if (users.length !== 0) {
      ctx.body = { code: "002", msg: "不可以注册" };
      return;
    }

    // v_code和ctx.session.v_code进行比较;
    if (v_code !== ctx.session.v_code) {
      ctx.body = {
        code: "002",
        msg: "验证码不匹配",
      };
      return;
    }

    let saveStudentsInfo = optUpload(ctx);
    // console.log(saveStudentsInfo);
    let result = await publicModel.addStudentUsers(saveStudentsInfo);
    // console.log(result);
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "用户注册成功" + result.message,
    };
  },
  // 更新信息
  ModifyInfo: async (ctx) => {
    let { priviege } = ctx.request.body;
    if (priviege === "管理员") {
      let saveAdminInfo = optUploadadmin(ctx);
      let { Sno } = ctx.request.body;
      Object.assign(saveAdminInfo, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
      console.log(saveAdminInfo);
      let result = await publicModel.updateAdmin(saveAdminInfo);
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
    }
    if (priviege === "教师用户") {
      let saveTeacherInfo = optUploadteacher(ctx);
      let { Sno } = ctx.request.body;
      Object.assign(saveTeacherInfo, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
      console.log(saveTeacherInfo);
      let result = await publicModel.updateteacher(saveTeacherInfo);
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
    }
    if (priviege === "学生用户") {
      let saveStudentsInfo = optUpload(ctx);
      let { Sno } = ctx.request.body;
      Object.assign(saveStudentsInfo, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
      console.log(saveStudentsInfo);
      let result = await studentModel.updateAccount(saveStudentsInfo);
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
    }
  },

  //获取验证码
  getPic: (ctx, next) => {
    let rand = parseInt(Math.random() * 9000 + 1000);
    //储存rand,之后进行比较验证码
    ctx.session.v_code = rand + "";
    console.log("验证码" + ctx.session.v_code);
    let png = new captchapng(80, 30, rand);
    ctx.body = png.getBuffer();
  },
};
