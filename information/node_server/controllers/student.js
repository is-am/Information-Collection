const path = require("path");
//数据库连接
const studentModel = require("../models/student");
// 处理上传的学生账户信息
function optUpload(ctx) {
  let { sno, name, password } = ctx.request.body;
  let { photo } = ctx.request.files;
  saveStudentsInfo = {
    sno,
    name,
    password,
  };
  //头像不能为空
  if (!photo) {
    ctx.throw("头像必须上传真实照片");
    return;
  }
  saveStudentsInfo.photo = path.basename(photo.filepath);
  saveStudentsInfo.priviege = "学生用户";
  return saveStudentsInfo;
}

module.exports = {
  /*判断用户是否存在*/
  checkSno: async (ctx, next) => {
    let { sno } = ctx.request.body;
    let users = await studentModel.findname(sno);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "可以注册" };
      return;
    }
    ctx.body = { code: "002", msg: "不可以注册" };
  },
  // 返回所有的学生用户账号信息
  // allUser: async (ctx, next) => {
  //   let users = await studentModel.getStudent();
  //   if (users.length !== 0) {
  //     ctx.body = { code: "001", msg: users };
  //     return;
  //   }
  //   ctx.body = { code: "002", msg: "暂无数据" };
  // },
  // 获取通知，分页处理
  allStudentUser: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    let start = (page - 1) * pageSize;
    let pageInfo = await studentModel.StudentUser(start, pageSize); //分页数据
    let total = await studentModel.studentPages(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 更新用户账号
  updateAccount: async (ctx) => {
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
  },
  updatePhoto: async (ctx) => {
    console.log(ctx.request);
    // let saveStudentsInfo = optUpload(ctx);
    // // console.log(saveStudentsInfo);
    // let result = await studentModel.addStudentUsers(saveStudentsInfo);
    // // console.log(result);
    // ctx.body = {
    //   //ajax接收到的状态信息
    //   code: "001",
    //   msg: "用户注册成功" + result.message,
    // };
  },
  // 查询用户
  queryingStudent: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await studentModel.queryingStudent(keyword);
    let total = result.length;
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

  // 个人信息收录
  personalInfo: async (ctx, next) => {
    let Info = ctx.request.body;
    let Sno = Info.sno;
    let isExist = await studentModel.queryPersonalInfo(Sno);
    if (isExist.length !== 1) {
      let result = await studentModel.personalInfo(Info);
      if (result.affectedRows !== 1) {
        ctx.body = {
          code: "002",
          msg: "个人信息添加失败",
        };
        return;
      }
      ctx.body = {
        code: "001",
        msg: "个人信息添加成功",
      };
      return;
    }
    // 用户信息已存在，进行修改
    Object.assign(Info, { Sno });
    let result = await studentModel.updateInfo(Info);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "个人信息更新失败",
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "个人信息更新成功",
    };
  },
  // 个人信息查询
  queryPersonalInfo: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(ctx.request.body);
    let users = await studentModel.queryPersonalInfo(sno);
    console.log(users);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "还未填写信息，请尽快填写" };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "信息填写已完成，如若需要修改，请再次填写提交",
      user: users,
    };
  },

  // 学生联系方式收录
  studentContact: async (ctx, next) => {
    let Info = ctx.request.body;
    let Sno = Info.sno;
    let isExist = await studentModel.queryStudentContact(Sno);
    if (isExist.length !== 1) {
      let result = await studentModel.studentContact(Info);
      if (result.affectedRows !== 1) {
        ctx.body = {
          code: "002",
          msg: "学生联系方式填写失败",
        };
        return;
      }
      ctx.body = {
        code: "001",
        msg: "学生联系方式填写成功",
      };
      return;
    }
    // 用户信息已存在，进行修改
    Object.assign(Info, { Sno });
    let result = await studentModel.updateContact(Info);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "学生联系方式更新失败",
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "学生联系方式更新失败",
    };
  },
  // 学生联系方式查询
  queryStudentContact: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(ctx.request.body);
    let users = await studentModel.queryStudentContact(sno);
    console.log(users);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "还未填写信息，请尽快填写" };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "信息填写已完成，如若需要修改，请再次填写提交",
      user: users,
    };
  },

  // 户口档案转移信息收录
  studentRecord: async (ctx, next) => {
    let Info = ctx.request.body;
    let Sno = Info.sno;
    let isExist = await studentModel.queryStudentRecord(Sno);
    // 判断是否已存在，进行修改
    if (isExist.length !== 1) {
      let result = await studentModel.studentRecord(Info);
      if (result.affectedRows !== 1) {
        ctx.body = {
          code: "002",
          msg: "户口档案转移信息提交失败",
        };
        return;
      }
      ctx.body = {
        code: "001",
        msg: "户口档案转移信息提交成功",
      };
      return;
    }
    // 用户信息已存在，进行修改
    Object.assign(Info, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    let result = await studentModel.updateRecord(Info);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "户口档案转移信息更新失败",
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "户口档案转移信息更新成功",
    };
  },
  // 户口档案转移信息查询
  queryStudentRecord: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(ctx.request.body);
    let users = await studentModel.queryStudentRecord(sno);
    console.log(users);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "还未填写信息，请尽快填写" };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "信息填写已完成，如若需要修改，请再次填写提交",
      user: users,
    };
  },

  // 实习单位信息收录
  internshipUnits: async (ctx, next) => {
    let Info = ctx.request.body;
    let Sno = Info.sno;
    let isExist = await studentModel.queryInternshipUnits(Sno);
    if (isExist.length !== 1) {
      let result = await studentModel.internshipUnits(Info);
      if (result.affectedRows !== 1) {
        ctx.body = {
          code: "002",
          msg: "实习单位信息提交失败",
        };
        return;
      }
      ctx.body = {
        code: "001",
        msg: "实习单位信息提交成功",
      };
      return;
    }
    // 用户信息已存在，进行修改
    Object.assign(Info, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    let result = await studentModel.updateInternshipUnits(Info);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "实习单位信息更新失败",
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "实习单位信息更新成功",
    };
  },
  // 实习单位信息查询
  queryInternshipUnits: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(ctx.request.body);
    let users = await studentModel.queryInternshipUnits(sno);
    console.log(users);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "还未填写信息，请尽快填写" };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "信息填写已完成，如若需要修改，请再次填写提交",
      user: users,
    };
  },

  // 就业信息收录
  studentsEmployment: async (ctx, next) => {
    let {
      sno,
      Class,
      Whereabouts,
      EnterpriseName,
      AddressOfEmployer,
      EnterpriseNature,
      InstitutionCode,
      Industry,
      TypeOfJob,
      EnterpriseIocality,
      EnterprisePerson,
      EnterprisePhone,
      EnterpriseCredentialTime,
      Work,
      Remuneration,
      Counterparts,
      FileType,
      FileReceivingUnit,
      InternshipPosition,
      Remark,
    } = ctx.request.body;
    let { Accessory } = ctx.request.files;

    Employment = {
      sno,
      Class,
      Whereabouts,
      EnterpriseName,
      AddressOfEmployer,
      EnterpriseNature,
      InstitutionCode,
      Industry,
      TypeOfJob,
      EnterpriseIocality,
      EnterprisePerson,
      EnterprisePhone,
      EnterpriseCredentialTime,
      Work,
      Remuneration,
      Counterparts,
      FileType,
      Accessory,
      FileReceivingUnit,
      InternshipPosition,
      Remark,
    };

    if (Accessory) {
      Employment.Accessory = path.basename(Accessory.filepath);
    } else {
      Employment.Accessory = "无";
    }
    console.log(Employment);
    let Sno = sno;
    let isExist = await studentModel.queryStuEmployment(Sno);
    if (isExist.length !== 1) {
      let result = await studentModel.studentsEmployment(Employment);
      if (result.affectedRows !== 1) {
        ctx.body = {
          code: "002",
          msg: "就业信息收录失败",
        };
        return;
      }
      ctx.body = {
        code: "001",
        msg: "就业信息收录成功",
      };
      return;
    }
    // 用户信息已存在，进行修改
    Object.assign(Employment, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    let result = await studentModel.updateEmployment(Employment);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "就业信息更新失败",
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "就业信息更新成功",
    };
  },
  // 就业信息查询
  queryStuEmployment: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(ctx.request.body);
    let users = await studentModel.queryStuEmployment(sno);
    console.log(users);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "还未填写信息，请尽快填写" };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "信息填写已完成，如若需要修改，请再次填写提交",
      user: users,
    };
  },

  // 报道证信息收录
  credential: async (ctx, next) => {
    let {
      sno,
      Class,
      RegistrationCategory,
      EnterpriseName,
      AddressOfEmployer,
      Deadline,
      Remark,
    } = ctx.request.body;
    let { Materials } = ctx.request.files;

    credentials = {
      sno,
      Class,
      RegistrationCategory,
      EnterpriseName,
      AddressOfEmployer,
      Deadline,
      Materials,
      Remark,
    };

    if (Materials) {
      credentials.Materials = path.basename(Materials.filepath);
    } else {
      credentials.Materials = "无";
    }
    // 查询用户信息是否已存在
    let Sno = sno;
    let isExist = await studentModel.queryCredential(Sno);
    if (isExist.length !== 1) {
      let result = await studentModel.credential(credentials);
      if (result.affectedRows !== 1) {
        ctx.body = {
          code: "002",
          msg: "报道证信息收录失败",
        };
        return;
      }
      ctx.body = {
        code: "001",
        msg: "报道证信息收录成功",
      };
      return;
    }
    // 用户信息已存在，进行修改
    Object.assign(credentials, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    let result = await studentModel.updatecredential(credentials);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "报道证信息更新失败",
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "报道证信息更新成功",
    };
  },
  // 报道证信息查询
  queryCredential: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(ctx.request.body);
    let users = await studentModel.queryCredential(sno);
    console.log(users);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "还未填写信息，请尽快填写" };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "信息填写已完成，如若需要修改，请再次填写提交",
      user: users,
    };
  },

  // 就业意向收录
  studentsIntention: async (ctx, next) => {
    let Info = ctx.request.body;
    let Sno = Info.sno;
    let isExist = await studentModel.queryStudentsIntention(Sno);
    if (isExist.length !== 1) {
      let result = await studentModel.studentsIntention(Info);
      if (result.affectedRows !== 1) {
        ctx.body = {
          code: "002",
          msg: "就业意向填写失败",
        };
        return;
      }
      ctx.body = {
        code: "001",
        msg: "就业意向填写成功",
      };
      return;
    }
    // 用户信息已存在，进行修改
    Object.assign(Info, { Sno }); //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象
    let result = await studentModel.updateIntention(Info);
    if (result.affectedRows !== 1) {
      ctx.body = {
        code: "002",
        msg: "就业意向更新失败",
      };
      return;
    }
    ctx.body = {
      code: "001",
      msg: "就业意向更新成功",
    };
  },
  // 就业意向查询
  queryStudentsIntention: async (ctx, next) => {
    let { sno } = ctx.request.body;
    console.log(ctx.request.body);
    let users = await studentModel.queryStudentsIntention(sno);
    console.log(users);
    if (users.length === 0) {
      ctx.body = { code: "001", msg: "还未填写信息，请尽快填写" };
      return;
    }
    ctx.body = {
      code: "002",
      msg: "信息填写已完成，如若需要修改，请再次填写提交",
      user: users,
    };
  },
};
