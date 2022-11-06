var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 10,
  host: "127.0.0.1", //数据库的 IP地址
  user: "root", //登录数据库的账号
  password: "123456", //登录数据库的密码
  database: "graduateproject", //指定要操作哪个数据库
});

var db = {};

// express中
// db.q('select..',[],function(err,data) {
//    if(err) {

//    }
//    console.log(data);
// })

// koa中
// try{
//    let data await db.q('select..',[]);
// }catch(err){}

db.q = function (sql, params) {
  return new Promise((resolve, reject) => {
    // 取出链接
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, function (error, results, fields) {
        //   输出sql语句
        console.log(`${sql}=>${params}`);
        // 释放连接
        connection.release();
        if (error) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  });
};

// 导出对象
module.exports = db;
