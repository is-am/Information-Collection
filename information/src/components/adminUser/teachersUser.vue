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
        <el-input v-model="searchForm.keyword"></el-input>
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
  allTeacher,
  updateTeacher,
  admteacherregister,
  queryTeacher,
  deleteTeacher,
} from "@/api/data";
export default {
  name: "teachersUser",
  components: { CommonForm, CommonTable },
  data() {
    return {
      operateType: "add",
      Sno: "",
      isShow: false,
      // 接收form相关配置
      operateFormLabel: [
        {
          model: "sno",
          label: "班级编号",
          type: "input",
        },
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "password",
          label: "密码",
          type: "password",
        },
        {
          model: "college",
          label: "学院",
          type: "select",
          opts: [
            {
              label: "信息工程",
              value: "信息工程",
            },
            {
              label: "智能工程",
              value: "智能工程",
            },
            {
              label: "商学院",
              value: "商学院",
            },
            {
              label: "教育学院",
              value: "教育学院",
            },
            {
              label: "建筑工程",
              value: "建筑工程",
            },
            {
              label: "管理学院",
              value: "管理学院",
            },
            {
              label: "国际学院",
              value: "国际学院",
            },
            {
              label: "健康学院",
              value: "健康学院",
            },
          ],
        },
        {
          model: "specialty",
          label: "专业",
          type: "input",
        },
      ],
      // 接收form数据,进行双向绑定
      operateForm: {
        // prop: "id",
        // label: "ID",
        // prop: "sno",
        // label: "班级",
        // prop: "name",
        // label: "姓名",
        // prop: "password",
        // label: "密码",
        // prop: "college",
        // label: "学院",
        // prop: "specialty",
        // label: "专业",
        // width: 200,
        // prop: "photo",
        // label: "头像",
        // prop: "priviege",
        // label: "权限",
        id: "",
        sno: "",
        name: "",
        password: "",
        college: "",
        specialty: "",
      },
      imageUrl: "",
      // 搜索框双向绑定数据
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "id",
          label: "ID",
        },
        {
          prop: "sno",
          label: "班级",
        },
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "password",
          label: "密码",
        },
        {
          prop: "college",
          label: "学院",
        },
        {
          prop: "specialty",
          label: "专业",
          width: 200,
        },
        {
          prop: "photo",
          label: "头像",
        },
        {
          prop: "priviege",
          label: "权限",
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
        id: "",
        sno: "",
        name: "",
        password: "",
        college: "",
        specialty: "",
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
      this.Sno = e.sno;
      this.operateForm.name = e.name;
      this.operateForm.password = e.password;
      this.operateForm.college = e.college;
      this.operateForm.specialty = e.specialty;
      this.operateForm.priviege = "学生用户";
      console.log(this.operateForm);
      //用formdata传递数据
      const formData = new FormData();
      //上传图片
      const file = this.$refs.upload.uploadFiles[0];
      formData.append("sno", this.operateForm.sno);
      formData.append("name", this.operateForm.name);
      formData.append("password", this.operateForm.password);
      formData.append("college", this.operateForm.college);
      formData.append("specialty", this.operateForm.specialty);
      formData.append("photo", file.raw);
      formData.append("priviege", this.operateForm.priviege);
      formData.append("Sno", this.Sno);

      // 判断是新增还是编辑，进行ajax请求，
      if (this.operateType === "edit") {
        // console.log(this.operateForm);
        updateTeacher(formData).then((res) => {
          // console.log(res);
          // this.tableData = res.data.msg;
          this.isShow = false;
          this.getList();
        });
      } else {
        admteacherregister(formData).then((res) => {
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
        deleteTeacher({ sno: this.sno }).then((res) => {
          if (res.data.code === "002") {
            this.$message.error("教师用户删除失败");
            return;
          }
          this.$message({
            message: "教师用户删除成功",
            type: "success",
          });
        });
        this.getList();
      });
    },
    // 获取列表数据
    getList() {
      allTeacher(this.config).then((res) => {
        this.config.total = res.data.msg.total[0].id;
        this.tableData = res.data.msg.pageInfo;
      });
    },
    // 列表搜索
    filtrationList() {
      if (this.searchForm.keyword === "") {
        this.initConfig();
        this.getList();
        return;
      }
      queryTeacher(this.searchForm).then((res) => {
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
.el-input {
  width: 230px;
  margin-right: 10px;
}
</style>
