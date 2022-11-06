<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
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

      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        @child-value-change="getFormList"
        @cancelForm="cancelForm"
        :inline="true"
        ref="form"
      ></common-form>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <div>
        <el-input v-model="search.keyword"></el-input>
        <el-button type="primary" @click="filtrationList">搜索</el-button>
      </div>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
      style="padding: 30px; margin-top: 10px"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../common/CommonForm.vue";
import CommonTable from "../common/CommonTable.vue";
import {
  StudentAllUser,
  StudentupdateAccount,
  admstudentregister,
  queryingStudent,
  deleteStudent,
} from "@/api/data";
export default {
  name: "studentsUser",
  components: { CommonForm, CommonTable },
  data() {
    return {
      operateType: "add",
      isShow: false,
      sno: "",
      // 接收form相关配置
      operateFormLabel: [
        {
          model: "sno",
          label: "学号",
          type: "input",
        },
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "Class",
          label: "班级",
          type: "input",
        },
        {
          model: "password",
          label: "密码",
          type: "password",
        },
      ],
      // 接收form数据,进行双向绑定
      operateForm: {
        sno: "",
        name: "",
        Class: "",
        password: "",
      },
      imageUrl: "",
      // 搜索框双向绑定数据
      search: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "sno",
          label: "学号",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "Class",
          label: "班级",
        },
        {
          prop: "password",
          label: "密码",
        },
        {
          prop: "photo",
          label: "照片",
          width: 200,
        },
        {
          prop: "priviege",
          label: "权限",
          width: 200,
        },
      ],
      config: {
        page: 1, //第几页
        total: 0, //总数
        pageSize: 7, //一页展现的数据
      },
    };
  },

  methods: {
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      // 初始化数据
      this.operateForm = {
        sno: "",
        name: "",
        Class: "",
        password: "",
      };
    },
    // 初始化分页
    initConfig() {
      this.config = {
        page: 1, //第几页
        total: 0, //总数
        pageSize: 7, //一页展现的数据
      };
    },
    // commonForm点击确定事件，e是获取到的数据，在这里发送ajax请求
    getFormList(e) {
      console.log(e);
      this.operateForm.sno = e.sno;
      this.operateForm.name = e.name;
      this.operateForm.Class = e.Class;
      this.operateForm.password = e.password;
      this.operateForm.priviege = "学生用户";
      console.log(this.operateForm);
      //用formdata传递数据
      const formData = new FormData();
      //上传图片
      const file = this.$refs.upload.uploadFiles[0];
      formData.append("sno", this.operateForm.sno);
      formData.append("name", this.operateForm.name);
      formData.append("Class", this.operateForm.Class);
      formData.append("password", this.operateForm.password);
      formData.append("photo", file.raw);
      formData.append("priviege", this.operateForm.priviege);
      formData.append("Sno", this.Sno);

      // 判断是新增还是编辑，进行ajax请求，
      if (this.operateType === "edit") {
        // console.log(this.operateForm);
        StudentupdateAccount(formData).then((res) => {
          // console.log(res);
          // this.tableData = res.data.msg;
          this.isShow = false;
          this.getList();
        });
      } else {
        admstudentregister(formData).then((res) => {
          // console.log(res);
          this.isShow = false;
          // this.tableData = res.data.msg;
          this.getList();
        });
      }
    },
    // commonForm点击取消事件
    cancelForm() {
      this.isShow = false;
    },
    // 列表编辑事件
    editUser(row) {
      console.log(row);
      this.Sno = row.sno;
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = { ...row };
      console.log(this.operateForm);
    },
    // 列表删除
    delUser(row) {
      this.$confirm("此操作将永久删除该用户，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.sno = row.sno;
        // 发起请求,删除操作

        deleteStudent({ sno: this.sno }).then((res) => {
          if (res.data.code === "002") {
            this.$message.error("学生用户删除失败");
            return;
          }
          this.$message({
            message: "学生用户删除成功",
            type: "success",
          });
        });
        this.getList();
      });
    },
    // 获取列表数据
    getList() {
      StudentAllUser(this.config).then((res) => {
        this.config.total = res.data.msg.total[0].id;
        this.tableData = res.data.msg.pageInfo;
      });
    },
    // 列表搜索
    filtrationList() {
      if (this.search.keyword === "") {
        this.initConfig();
        this.getList();
        return;
      }
      queryingStudent(this.search).then((res) => {
        if (res.data.code == "002") {
          this.tableData = [];
          return;
        }
        this.config.total = res.data.msg.total;
        this.tableData = res.data.msg.result;
      });
    },
  },
  // 初始化获取表单数据
  created() {
    this.getList();
  },
};
</script>

<style scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
  margin-bottom: 10px;
}
.el-input {
  width: 230px;
  margin-right: 10px;
}
</style>
