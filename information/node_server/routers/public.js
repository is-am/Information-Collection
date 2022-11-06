//引入学生路由 开始
const Router = require("koa-router");
let publicRouter = new Router();

// 控制器，数据操作
let publicController = require("../controllers/public");

publicRouter
  //验证用户是否已存在
  .post("/public/checkSno", publicController.checkSno)
  //登录
  .post("/public/login", publicController.login)
  //注册用户
  .post("/public/register", publicController.register)
  // 获取验证码
  .get("/public/getPic", publicController.getPic)
  // 修改账号信息
  .put("/public/ModifyInfo", publicController.ModifyInfo);

//引入路由 结束
module.exports = publicRouter;
