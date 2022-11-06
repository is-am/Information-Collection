<template>
  <header>
    <el-dialog :title="operateType" :visible.sync="isShow">
      <el-upload
        class="el-upload"
        ref="upload"
        action=""
        :auto-upload="false"
        :limit="1"
        list-type="picture-card"
        accept=".jpg,.jpeg,.png"
      >
        <el-dialog>
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-dialog>
      </el-upload>
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="125px"
          label-position="left"
        >
          <el-col :span="12">
            <el-form-item v-if="teachertype" label="学号" prop="sno">
              <el-input
                v-model="formData.sno"
                placeholder="请输入学号"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入姓名"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="admintype" label="班级" prop="Class">
              <el-input
                v-model="formData.Class"
                placeholder="请输入班级编号"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="原密码" prop="originalPassword">
              <el-input
                v-model="formData.originalPassword"
                placeholder="请输入原密码"
                clearable
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="formData.password"
                placeholder="请输入密码"
                clearable
                show-password
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialogFooter">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h3 style="color: #fff">首页</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: item.path }"
          >{{ item.label }}</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" szie="mini" @command="handleClick">
        <span class="el-dropdown-link">
          <img class="user" :src="isUser.photo" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="centre">信息修改</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
//mapState是 vuex中state的辅助函数
import { mapState } from "vuex";
import Cookie from "js-cookie";
import CommonForm from "../common/CommonForm.vue";
import { ModifyInfo } from "@/api/data";
export default {
  name: "CommonHeader",
  components: { CommonForm },
  data() {
    return {
      isShow: false,
      // 判断普通用户与管理员
      admintype: true,
      teachertype: true,
      operateType: "修改个人信息",
      //头像信息
      imageUrl: "",
      // 用户信息
      isUser: "",
      formData: {
        sno: "",
        name: "",
        Class: "",
        originalPassword: "",
        password: "",
      },
      rules: {
        sno: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        Class: [
          {
            required: true,
            message: "请输入班级编号",
            trigger: "blur",
          },
        ],
        originalPassword: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleMenu() {
      //调用Vuex中的collapseMenu方法，改变isCollapse的值
      this.$store.commit("collapseMenu");
    },
    handleClick(command) {
      if (command === "logout") {
        // 清除Cookie中的token
        Cookie.remove("token");
        // 执行clearToken
        this.$store.commit("clearToken");
        // 清除localStorage中的数据
        localStorage.clear();
        this.$message("用户退出成功");
        setTimeout(() => {
          this.$router.push(
            "/login",
            () => {},
            () => {}
          ); //退出登录后100毫秒后跳转至首页
        }, 100);
        //加()=>{},()=>{} 可解决路由重复后台报错问题
        return;
      }
      if (command === "centre") {
        this.isShow = !this.isShow;
      }
    },
    close() {
      this.isShow = !this.isShow;
    },
    handelConfirm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;

        if (this.formData.originalPassword !== this.isUser.password) {
          this.$message.error("原密码不正确");
          return;
        }
        if (this.formData.originalPassword === this.formData.password) {
          this.$message.error("密码不能一致不正确");
          return;
        }
        this.formData.priviege = this.isUser.priviege;
        console.log(this.formData);
        const formData = new FormData();
        const file = this.$refs.upload.uploadFiles[0];
        formData.append("sno", this.formData.sno);
        formData.append("name", this.formData.name);
        formData.append("Class", this.formData.Class);
        formData.append("password", this.formData.password);
        formData.append("photo", file.raw);
        formData.append("priviege", this.formData.priviege);
        formData.append("Sno", this.isUser.sno);

        ModifyInfo(formData).then((res) => {
          console.log(res);
          // this.tableData = res.data.msg;
          if (res.data.code === "002") {
            this.$message.error(res.data.msg);
            return;
          }
          this.close();
          Cookie.remove("token");
          this.$store.commit("clearToken");
          localStorage.clear();
          this.$message("信息更新成功请重新登录");
          setTimeout(() => {
            this.$router.push(
              "/login",
              () => {},
              () => {}
            ); //100毫秒后跳转至首页
          }, 100);
        });
      });
    },
  },
  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    console.log("User", User);
    if (User) {
      // 隐蔽修改班级输入框
      if (User.priviege === "管理员" || User.priviege === "教师用户") {
        this.admintype = false;
      }
      // 隐蔽修改学号输入框
      if (User.priviege === "教师用户") {
        this.teachertype = false;
      }
      this.isUser = User;
      this.formData.sno = User.sno;
      this.formData.name = User.name;
    }
  },
  computed: {
    // mapState获取vuex中state的数据
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style scoped>
.el-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
  margin-bottom: 10px;
}
.dialogFooter {
  display: flex;
  justify-content: flex-end;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content,
.l-content,
.el-button {
  display: flex;
  align-items: center;
}
.el-button {
  margin-right: 20px;
}
.user {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
/* .el-breadcrumb ::v-deep .el-breadcrumb__inner {
  color: #4a4b4d;
} */
</style>
