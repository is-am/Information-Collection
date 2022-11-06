<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增公告' : '更新公告'"
      :visible.sync="isShow"
    >
      <div>
        <el-row :gutter="15">
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="100px"
          >
            <el-col :span="24">
              <el-form-item label="附件" prop="accessory">
                <el-upload
                  ref="upload"
                  :file-list="AccessoryfileList"
                  action=""
                  :auto-upload="false"
                  multiple
                  :before-upload="AccessoryBeforeUpload"
                  name="Accessory"
                >
                  <el-button size="small" type="primary" icon="el-icon-upload"
                    >点击选择</el-button
                  >
                  <div slot="tip" class="el-upload__tip">
                    只能上传不超过 5MB 的文件
                  </div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公告类型" prop="type">
                <el-select
                  v-model="formData.type"
                  placeholder="请选择公告类型"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in TypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发布人" prop="issuer">
                <el-select
                  v-model="formData.issuer"
                  placeholder="请选择发布人"
                  filterable
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in IssuerOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="接收班级" prop="sno">
                <el-input
                  v-model="formData.sno"
                  placeholder="请输入接收班级编号，输入0代表所有班级"
                  clearable
                  prefix-icon="el-icon-user-solid"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="公告内容" prop="Content">
                <el-input
                  v-model="formData.content"
                  type="textarea"
                  placeholder="请输入公告内容"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+ 新增公告</el-button>
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
import CommonTable from "../common/CommonTable.vue";
import {
  addAffiche,
  allAffichen,
  updateAffiche,
  deleteAffiche,
  queryAffiches,
} from "../../api/data";
export default {
  name: "studentsUser",
  components: { CommonTable },
  data() {
    return {
      operateType: "add",
      isShow: false,
      isUser: "",
      formData: {
        accessory: null,
        type: "修改公告",
        issuer: "教师",
        sno: undefined,
        content: "",
      },
      rules: {
        type: [
          {
            required: true,
            message: "请选择公告类型",
            trigger: "blur",
          },
        ],
        issuer: [
          {
            required: true,
            message: "请选择发布人",
            trigger: "blur",
          },
        ],
        sno: [
          {
            required: true,
            message: "请输入接收班级学号，输入0代表所以人",
            trigger: "blur",
          },
        ],
        Content: [],
      },
      AccessoryAction: "",
      AccessoryfileList: [],
      TypeOptions: [
        {
          label: "修改公告",
          value: "修改公告",
        },
        {
          label: "格式公告",
          value: "格式公告",
        },
        {
          label: "文件公告",
          value: "文件公告",
        },
      ],
      IssuerOptions: [
        {
          label: "教师",
          value: "教师",
        },
        {
          label: "管理员",
          value: "管理员",
        },
      ],
      // 搜索框双向绑定数据
      search: {
        keyword: "",
      },

      tableData: [],
      tableLabel: [
        {
          prop: "id",
          label: "编号",
        },
        {
          prop: "type",
          label: "公告类型",
        },
        {
          prop: "issuer",
          label: "发布人",
        },
        {
          prop: "time",
          label: "发布时间",
        },
        {
          prop: "accessory",
          label: "附件",
        },
        {
          prop: "sno",
          label: "接收班级",
        },
        {
          prop: "content",
          label: "公告内容",
          width: 200,
        },
      ],
      uid: "",
      config: {
        page: 1, //第几页
        total: 0, //总数
        pageSize: 10, //一页展现的数据
      },
    };
  },

  methods: {
    // 点击新增按钮
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      // 初始化数据
      this.formData = {
        accessory: null,
        type: "修改公告",
        issuer: "教师",
        sno: undefined,
        content: "",
      };
    },
    // 初始化分页
    initConfig() {
      this.config = {
        page: 1, //第几页
        total: 0, //总数
        pageSize: 10, //一页展现的数据
      };
    },
    // 获取当前时间
    format() {
      const nowDate = new Date();
      const date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      };
      const newmonth = date.month > 9 ? date.month : "0" + date.month;
      const day = date.date > 9 ? date.date : "0" + date.date;
      const sendTime = date.year + "." + newmonth + "." + day;
      return sendTime;
    },

    // 提交
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        const time = this.format();
        const formData = new FormData();
        //上传图片
        const file = this.$refs.upload.uploadFiles[0];
        formData.append("id", this.uid);
        formData.append("sno", this.formData.sno);
        formData.append("type", this.formData.type);
        formData.append("issuer", this.formData.issuer);
        formData.append("content", this.formData.content);
        formData.append("time", time);
        if (file) {
          formData.append("accessory", file.raw);
        } else {
          formData.append("accessory", "无");
        }

        // 判断是新增还是编辑，进行ajax请求，
        if (this.operateType === "add") {
          // console.log(this.operateForm);
          addAffiche(formData).then((res) => {
            console.log(res);
            // this.tableData = res.data.msg;
            this.isShow = false;
            this.getList();
            if (res.data.code === "002") {
              this.$message.error("公告发布失败");
            }
            this.$message({
              message: "公告更新成功",
              type: "success",
            });
          });
        } else {
          // 更新信息
          updateAffiche(formData).then((res) => {
            console.log(res);
            this.isShow = false;
            this.getList();
            if (res.data.code === "002") {
              this.$message.error("公告更新失败");
            }
            this.$message({
              message: "公告更新成功",
              type: "success",
            });
          });
        }
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    AccessoryBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 5;
      if (!isRightSize) {
        this.$message.error("文件大小超过 5MB");
      }
      return isRightSize;
    },
    submitUpload() {
      this.$refs["upload"].submit();
    },

    // 列表编辑事件
    editUser(row) {
      if (this.isUser.name !== "admin") {
        this.$alert("此列表无法编辑", "编辑", {
          confirmButtonText: "确定",
        });
        return;
      }
      this.operateType = "edit";
      this.isShow = true;
      this.formData = row;
      this.uid = row.id;
    },
    // 列表删除
    delUser(row) {
      if (this.isUser.name !== "admin") {
        this.$alert("此列表无法编辑", "编辑", {
          confirmButtonText: "确定",
        });
        return;
      }
      this.$confirm("此操作将永久删除该用户，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.uid = row.id;
        console.log(this.uid);
        // 发起请求,删除操作

        deleteAffiche(this.uid).then((res) => {
          if (res.data.code === "002") {
            this.$message.error("公告删除失败");
            return;
          }
          this.$message({
            message: "公告删除成功",
            type: "success",
          });
        });
        this.getList();
      });
    },
    // 获取列表数据
    getList() {
      allAffichen(this.config).then((res) => {
        console.log(res.data.msg.pageInfo);
        this.config.total = res.data.msg.total[0].id;
        this.tableData = res.data.msg.pageInfo;
      });
    },
    // 搜索
    filtrationList() {
      if (this.search.keyword === "") {
        this.initConfig();
        this.getList();
        return;
      }
      queryAffiches(this.search).then((res) => {
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
  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    if (User) {
      this.isUser = User;
      if (User.priviege === "教师用户") {
        this.IssuerOptions = [
          {
            label: "教师",
            value: "教师",
          },
        ];
      }
    }
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
