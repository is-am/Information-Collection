const path = require("path"); //核心模块
const Koa = require("koa"); //导入 koa 模块
const session = require("koa-session");

let app = new Koa(); //创建 Koa 的服务器实例

// 跨域 开始
const cors = require("@koa/cors");
// app.use(cors());
app.use(
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);
// 跨域 结束

// app.use(async (ctx, next) => {
//   // // ctx.set("Access-Control-Allow-Origin", "*");
//   // ctx.set("Access-Control-Allow-Credentials", "true");
//   // ctx.set("Access-Control-Allow-Headers", "Content-Type");
//   // // ctx.set("Access-Control-Allow-Methods", "POST");
//   ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");
//   ctx.set("Access-Control-Allow-Credentials", "true");
//   ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
//   ctx.set("Access-Control-Allow-Headers", "x-dataplus-csrf, Content-Type");
//   await next();
// });

//处理session 开始
// let store = {
//   storage: {},

//   set(key, session) {
//     this.storage[key] = session;
//   },
//   get(key) {
//     return this.storage[key];
//   },
//   destrey(key) {
//     delete this.storage[key];
//   },
// };
app.keys = ["test"]; //基于test字符串进行签名的运算，为的是保证数据不被篡改
// app.use(session(store, app));
const CONFIG = {
  key: "koa:sess", //cookie key (default is koa:sess)
  maxAge: 86400000, // cookie的过期时间 maxAge in ms (default is 1 days)
  overwrite: true, //是否可以overwrite    (默认default true)
  httpOnly: true, //cookie是否只有服务器端可以访问 httpOnly or not (default true)
  signed: true, //签名默认true
  rolling: false, //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
  renew: false, //(boolean) renew session when session is nearly expired,
};
app.use(session(CONFIG, app));
//处理session 结束

//引入路由 开始
// 学生路由
const studentRouter = require("./routers/student");
// 教师路由
const teacherRouter = require("./routers/teacher");
// 管理员路由
const adminRouter = require("./routers/admin");
// 公共路由
const publicRouter = require("./routers/public");
//引入路由 结束

// 请求体数据 处理文件及字符串 开始
const KoaBody = require("koa-body");
// console.log(process.cwd());打印地址
app.use(
  KoaBody({
    multipart: true,
    strict: false, //默认true，不解析HEAD，DELETE等请求
    formidable: {
      //设置上传目录，path.resolve返回一个以相对于当前的工作目录的绝对路径。
      uploadDir: path.resolve("./upload"),
      //默认根据文件算法生成hash字符串(文件名)，无后缀
      keepExtensions: true, //保持后缀名
    },
  })
);
// 请求体数据 处理文件及字符串 结束

// 静态资源处理 开始
const koaStatic = require("koa-static");
app.use(koaStatic(path.resolve("./upload")));
// 静态资源处理 结束

app.use(studentRouter.routes());
app.use(teacherRouter.routes());
app.use(adminRouter.routes());
app.use(publicRouter.routes());

//调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8880, () => {
  console.log("koa server running at http://127.0.0.1:8880");
});
