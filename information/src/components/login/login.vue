<template>
  <div class="login">
    <div id="app" class="container">
      <img
        class="left-bg"
        src="@/../public/imgs/5d7095d8ea0764c3c7334308674b7542.jpg"
        alt=""
      />
      <div class="panel">
        <div class="content">
          <div class="switch">
            <span :class="{ active: active === 'login' }" @click="go('login')"
              >系统登陆</span
            >
            <span>/</span>
            <span
              :class="{ active: active === 'register' }"
              @click="go('register')"
              >注册用户</span
            >
          </div>
          <div class="form" id="fromLogin">
            <!-- 如果按钮选择的是注册就展示这个里面的内容 -->
            <template v-if="active === 'register'">
              <div id="input">
                <el-form
                  :model="registerForm"
                  status-icon
                  :rules="rules"
                  ref="registerForm"
                  label-width="100px"
                  class="login-container"
                >
                  <h3 class="login-title">注册学生用户</h3>

                  <el-upload
                    class="el-upload"
                    ref="upload"
                    action=""
                    :auto-upload="false"
                    :limit="1"
                    list-type="picture-card"
                    accept=".jpg,.jpeg,.png"
                  >
                    <p>头像上传</p>
                    <el-dialog>
                      <img
                        v-if="registerForm.photo"
                        :src="registerForm.photo"
                        class="avatar"
                      />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-dialog>
                  </el-upload>

                  <el-form-item
                    label="学号"
                    label-width="80px"
                    prop="sno"
                    class="username"
                  >
                    <el-input
                      type="input"
                      v-model="registerForm.sno"
                      autocomplete="off"
                      placeholder="请输入学号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="姓名"
                    label-width="80px"
                    prop="name"
                    class="username"
                  >
                    <el-input
                      type="input"
                      v-model="registerForm.name"
                      autocomplete="off"
                      placeholder="请输入姓名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="班级"
                    label-width="80px"
                    prop="Class"
                    class="class"
                  >
                    <el-input
                      type="input"
                      v-model="registerForm.Class"
                      autocomplete="off"
                      placeholder="请输入班级编号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码" label-width="80px" prop="pass">
                    <el-input
                      type="password"
                      v-model="registerForm.password"
                      autocomplete="off"
                      placeholder="请输入密码"
                    ></el-input>
                  </el-form-item>
                  <div></div>
                  <el-form-item
                    label="确定密码"
                    label-width="80px"
                    prop="checkPass"
                  >
                    <el-input
                      type="password"
                      v-model="registerForm.checkPass"
                      autocomplete="off"
                      placeholder="请再次输入密码"
                    ></el-input>
                  </el-form-item>
                  <div></div>

                  <div class="v_code">
                    <el-form-item
                      label="验证码"
                      label-width="80px"
                      prop="v_code"
                    >
                      <el-input
                        type="input"
                        v-model="registerForm.v_code"
                        autocomplete="off"
                        placeholder="请输入验证码"
                      ></el-input>
                    </el-form-item>
                    <img
                      class="pull-right"
                      width="120"
                      style="border: 1px solid #cac6c6"
                      src="/public/getPic"
                      onclick="this.src = '/public/getPic?' + Date.now()"
                    />
                  </div>

                  <el-form-item class="register-submit">
                    <el-button
                      type="primary"
                      @click="register"
                      class="register-submit"
                      >注册</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </template>
            <!-- 如果按钮选择的是登录就展示这个里面的内容 -->
            <template v-if="active === 'login'">
              <div id="input">
                <el-form
                  :model="loginForm"
                  status-icon
                  :rules="rules"
                  ref="loginForm"
                  label-width="100px"
                  class="login-container"
                >
                  <h3 class="login-title">系统登陆</h3>

                  <el-form-item
                    label="学号"
                    label-width="80px"
                    prop="sno"
                    class="username"
                  >
                    <el-input
                      type="input"
                      v-model="loginForm.sno"
                      autocomplete="off"
                      placeholder="请输入学号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码" label-width="80px" prop="password">
                    <el-input
                      type="password"
                      v-model="loginForm.password"
                      autocomplete="off"
                      placeholder="请输入密码"
                    ></el-input>
                  </el-form-item>

                  <el-form-item label="选择身份">
                    <el-radio-group v-model="loginForm.priviege" size="medium">
                      <el-radio :label="2">学生</el-radio>
                      <el-radio :label="1">老师</el-radio>
                      <el-radio :label="0">管理员</el-radio>
                    </el-radio-group>
                  </el-form-item>

                  <div class="v_code">
                    <el-form-item
                      label="验证码"
                      label-width="80px"
                      prop="v_code"
                    >
                      <el-input
                        type="input"
                        v-model="loginForm.v_code"
                        autocomplete="off"
                        placeholder="请输入验证码"
                      ></el-input>
                    </el-form-item>
                    <img
                      class="pull-right"
                      width="120"
                      style="border: 1px solid #cac6c6"
                      src="/public/getPic"
                      onclick="this.src = '/public/getPic?' + Date.now()"
                    />
                  </div>

                  <el-form-item class="login-submit">
                    <el-button
                      type="primary"
                      :plain="true"
                      @click="login"
                      class="login-submit"
                      >登录</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publicLogin, StudentRegister } from "@/api/data";
export default {
  name: "login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerForm.checkPass !== "") {
          this.$refs.registerForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      active: "login",
      srcPic: "",
      // 登录
      loginForm: {
        sno: "",
        password: "",
        priviege: 2,
        v_code: "",
      },
      // 注册
      registerForm: {
        sno: "",
        name: "",
        Class: "",
        password: "",
        photo: "",
        priviege: 2,
        v_code: "",
      },
      // 表单校验
      rules: {
        sno: [
          {
            required: true, // 必填
            message: "请输入学号", //如果校验不通过的提示
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
          //   限制
          {
            min: 3, //最小长度
            max: 10, //最大长度
            message: "长度在 3 到 10 个字符", //提示信息
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
        ],
        name: [
          {
            required: true, // 必填
            message: "请输入姓名", //如果校验不通过的提示
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
        ],
        Class: [
          {
            required: true, // 必填
            message: "请输入班级编号", //如果校验不通过的提示
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { validator: validatePass2, trigger: "blur" }, //   限制
          {
            min: 6, //最小长度
            message: "长度不能小于6个字符", //提示信息
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
        ],
        password: [
          {
            required: true, // 必填
            message: "请输入密码", //如果校验不通过的提示
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
          //   限制
          {
            min: 6, //最小长度
            message: "长度不能小于6个字符", //提示信息
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
        ],
        v_code: [
          {
            required: true, // 必填
            message: "请输入验证码", //如果校验不通过的提示
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
        ],
      },
    };
  },
  methods: {
    register() {
      console.log(this.registerForm);
      //用formdata传递数据
      const formData = new FormData();
      //上传图片
      const file = this.$refs.upload.uploadFiles[0];
      console.log(file);
      if (file == undefined) {
        this.$message.error("照片不正确");
        return;
      }
      formData.append("sno", this.registerForm.sno);
      formData.append("name", this.registerForm.name);
      formData.append("Class", this.registerForm.Class);
      formData.append("password", this.registerForm.password);
      formData.append("photo", file.raw);
      formData.append("priviege", this.registerForm.priviege);
      formData.append("v_code", this.registerForm.v_code);
      StudentRegister(formData).then((res) => {
        console.log(res);
        if (res.data.code === "002") {
          this.$message.error("该学号已被注册或验证码不正确");
          return;
        }
        this.$message.success("用户注册成功！");
      });
    },
    login() {
      //用formdata传递数据
      const formData = new FormData();
      // sno: "",
      //   password: "",
      //   priviege: 2,
      //   v_code: "",
      formData.append("sno", this.loginForm.sno);
      formData.append("password", this.loginForm.password);
      formData.append("priviege", this.loginForm.priviege);
      formData.append("v_code", this.loginForm.v_code);
      publicLogin(formData).then((res) => {
        console.log(res);
        const token = res.data.code;
        if (res.data.code === "001") {
          this.$message.success("登录成功！");
          let user = res.data.msg;
          localStorage.setItem("User", JSON.stringify(user));
          this.$store.state.user.User = user;
          this.$store.state.userToken.token = token;
          localStorage.setItem("menu", JSON.stringify(res.data.menu));
          // 设置菜单权限数据
          this.$store.commit("setToken", res.data.msg.name); //将用户名存到cookie
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("addMenu", this.$router);

          this.$router.push("/home");
          return;
        }
        this.$message.error(res.data.msg);
      });
    },
    go(type) {
      this.active = type;
    },
    submit() {
      if (type === "login") {
        console.log("login", this.loginForm);
      }
      if (type === "register") {
        console.log("register", this.registerForm);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
/* .login {
  position: relative;
  width: 100%;
  height: 100%;
} */
.judge {
  display: inline-block;
}
.login-container {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  border-radius: 15px;
  background-clip: padding-box;
  margin: 0 auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.register-submit,
.login-submit {
  margin: 10px auto 0px auto;
}
.v_code {
  display: flex;
}

.container {
  /* 相对定位 */
  position: relative;
  width: 70rem;
}

.container .left-bg {
  margin: 100px auto;
  width: 70rem;
}

.switch span {
  color: #959595;
  font-size: 1.4rem;
  /* 鼠标放上变小手 */
  cursor: pointer;
}
.switch span.active {
  color: #9159d8;
}

.panel {
  width: 30%;
  margin: 10rem 0 0;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
}
.pull-right {
  margin-left: 5px;
}

.form {
  width: 12rem;
  margin: 10rem 0 0;
}

.pwd-level {
  margin-top: -15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.pwd-level div {
  height: 5px;
  width: 50px;
  margin-left: 5px;
  border-radius: 20px;
  display: inline-block;
}
.pwd-level span {
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 157px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader {
  text-align: center;
  margin-bottom: 15px;
}
.el-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
  margin-bottom: 10px;
  margin-left: 100px;
}
/* .pwd-level {
  margin-left: 76px;
  display: flex;
  justify-content: center;
}
.pwd-level div {
  width: 70px;
  height: 5px;
  margin-right: 20px;
  background-color: rgb(250, 3, 3);
} */
</style>
