const path = require("path");
//数据库连接
const teacherModel = require("../models/teacher");

module.exports = {
  // 获取学生就业信息表，分页处理
  allEmployment: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await teacherModel.allEmployment(start, pageSize); //分页数据

    let total = await teacherModel.Employments(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 查询学生就业信息表
  queryEmployments: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await teacherModel.queryEmployments(keyword);
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

  // 删除学生就业信息
  deleteEmployment: async (ctx, next) => {
    let Sno = ctx.request.body;
    let result = await teacherModel.deleteEmployment(Sno);
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

  // 获取学生联系方式表，分页处理
  allContact: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await teacherModel.allContact(start, pageSize); //分页数据

    let total = await teacherModel.Contacts(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 查询学生联系方式表
  queryContacts: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await teacherModel.queryContacts(keyword);
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

  // 删除学生联系方式
  deleteContact: async (ctx, next) => {
    let sno = ctx.request.body;
    let result = await teacherModel.deleteContact(sno);
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

  // 获取学生报到证信息表，分页处理
  allCredential: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await teacherModel.allCredential(start, pageSize); //分页数据

    let total = await teacherModel.Credentials(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 查询学生报到证信息表
  queryCredential: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await teacherModel.queryCredential(keyword);
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

  // 删除学生报到证信息
  deleteCredential: async (ctx, next) => {
    let sno = ctx.request.body;
    let result = await teacherModel.deleteCredential(sno);
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

  // 获取学生就业意向表，分页处理
  allIntention: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await teacherModel.allIntention(start, pageSize); //分页数据

    let total = await teacherModel.Intentions(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 查询学生就业意向表
  queryIntention: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await teacherModel.queryIntention(keyword);
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

  // 删除学生就业意向
  deleteIntention: async (ctx, next) => {
    let sno = ctx.request.body;
    let result = await teacherModel.deleteIntention(sno);
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

  // 获取户口档案信息表，分页处理
  allRecord: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await teacherModel.allRecord(start, pageSize); //分页数据

    let total = await teacherModel.Records(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 查询户口档案信息表
  queryRecord: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await teacherModel.queryRecord(keyword);
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

  // 删除户口档案信息
  deleteRecord: async (ctx, next) => {
    let sno = ctx.request.body;
    let result = await teacherModel.deleteRecord(sno);
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

  // 获取学生个人信息表，分页处理
  allStudentInfo: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await teacherModel.allStudentInfo(start, pageSize); //分页数据

    let total = await teacherModel.StudentInfos(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 查询学生个人信息表
  queryStudentInfo: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await teacherModel.queryStudentInfo(keyword);
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

  // 删除学生个人信息
  deleteStudentInfo: async (ctx, next) => {
    let sno = ctx.request.body;
    let result = await teacherModel.deleteStudentInfo(sno);
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

  // 获取实习单位信息表，分页处理
  allUnits: async (ctx) => {
    // 获取参数 page: 1, //第几页 total: 30, //总数 pageSize:20,//一页展现的数据
    let { page, pageSize } = ctx.request.body;
    console.log(page, pageSize);
    let start = (page - 1) * pageSize;
    let pageInfo = await teacherModel.allUnits(start, pageSize); //分页数据

    let total = await teacherModel.Units(); // 总数

    ctx.body = { code: "001", msg: { total, pageInfo } };
    if (total.length !== 0) {
      return;
    }
    ctx.body = { code: "002", msg: "暂无数据" };
  },

  // 查询实习单位信息表
  queryUnits: async (ctx, next) => {
    let { keyword } = ctx.request.body;
    console.log(ctx.request.body);
    let result = await teacherModel.queryUnits(keyword);
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

  // 删除实习单位信息
  deleteUnits: async (ctx, next) => {
    let sno = ctx.request.body;
    let result = await teacherModel.deleteUnits(sno);
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
  // 获取表格数量
  Containers: async (ctx, next) => {
    let { sno } = ctx.request.body;
    let student = await teacherModel.students(sno);
    let contactContainers = await teacherModel.contactContainers(sno);
    let informationContainers = await teacherModel.informationContainers(sno);
    let recordContainers = await teacherModel.recordContainers(sno);
    let credentialContainers = await teacherModel.credentialContainers(sno);
    let employmentContainers = await teacherModel.employmentContainers(sno);
    let intentionContainers = await teacherModel.intentionContainers(sno);
    let internshipunitsContainers =
      await teacherModel.internshipunitsContainers(sno);
    // 读取班级总人数
    let headcounts = await teacherModel.headcounts(sno);

    let students = student.length;
    let Containers = {
      学生联系方式表: contactContainers,
      学生个人信息表: informationContainers,
      户口档案信息表: recordContainers,
      报到证信息表: credentialContainers,
      学生就业信息表: employmentContainers,
      就业意向表: intentionContainers,
      实习单位信息表: internshipunitsContainers,
    };

    ctx.body = {
      code: "001",
      msg: Containers,
      headcounts,
      students,
    };
  },
  // 修改学生总人数
  headcount: async (ctx) => {
    let { headcount, sno } = ctx.request.body;
    let count = {
      headcount,
      sno,
    };
    let result = await teacherModel.alterheadcount(count);
    if (result.affectedRows !== 1) {
      ctx.body = {
        //ajax接收到的状态信息
        code: "002",
        msg: "修改总人数失败",
      };
      return;
    }
    ctx.body = {
      //ajax接收到的状态信息
      code: "001",
      msg: "修改成功",
    };
  },
  // 获取图表数据
  chartData: async (ctx, next) => {
    let { Class } = ctx.request.query;
    console.log(Class);
    if (Class == "admin") {
      console.log(Class);
      // 获取学生期待薪资
      let chartintention = await teacherModel.adminintention();
      // 获取学生毕业去向
      let chartWhereabouts = await teacherModel.adminWhereabouts();
      // 获取学生意向城市
      let chartCity = await teacherModel.adminCity();
      // 获取学生工作职位类型
      let chartTypeOfJob = await teacherModel.adminTypeOfJob();
      ctx.body = {
        code: "001",
        msg: chartintention,
        chartWhereabouts,
        chartCity,
        chartTypeOfJob,
      };
      return;
    }
    // 获取学生期待薪资
    let chartintention = await teacherModel.chartintention(Class);
    // 获取学生毕业去向
    let chartWhereabouts = await teacherModel.chartWhereabouts(Class);
    // 获取学生意向城市
    let chartCity = await teacherModel.chartCity(Class);
    // 获取学生工作职位类型
    let chartTypeOfJob = await teacherModel.chartTypeOfJob(Class);
    ctx.body = {
      code: "001",
      msg: chartintention,
      chartWhereabouts,
      chartCity,
      chartTypeOfJob,
    };
  },
};
