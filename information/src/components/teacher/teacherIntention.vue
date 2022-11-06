<template>
  <div class="manage">
    <div class="manage-header">
      <div>
        <el-button
          type="primary"
          style="margin-left: 20px"
          @click="exportExcelSelect"
          >导出Excel</el-button
        >
      </div>
      <div>
        <el-input v-model="search.keyword"></el-input>
        <el-button type="primary" @click="filtrationList">搜索</el-button>
      </div>
    </div>
    <common-table
      id="selectTable"
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
import { allIntention, deleteIntention, queryIntentions } from "@/api/data";
import htmlToExcel from "@/config/toExcel";
export default {
  name: "StudentInfo",
  components: { CommonTable },
  data() {
    return {
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
          prop: "Class",
          label: "班级编号",
        },
        {
          prop: "DistrictOne",
          label: "就业区域意向1",
        },

        {
          prop: "DistrictTwo",
          label: "就业区域意向2",
        },
        {
          prop: "EnterpriseOne",
          label: "就业企业意向1",
        },
        {
          prop: "EnterpriseTwo",
          label: "就业企业意向2",
        },
        {
          prop: "WorkOne",
          label: "就业岗位意向1",
        },
        {
          prop: "WorkTwo",
          label: "就业岗位意向2",
        },
        {
          prop: "Remuneration",
          label: "期望最低薪酬",
        },
        {
          prop: "Remark",
          label: "备注",
        },
      ],
      config: {
        page: 1, //第几页
        total: 0, //总数
        pageSize: 10, //一页展现的数据
      },
    };
  },

  methods: {
    // 初始化分页
    initConfig() {
      this.config = {
        page: 1, //第几页
        total: 0, //总数
        pageSize: 10, //一页展现的数据
      };
    },
    // 列表编辑事件
    editUser() {
      this.$alert("此列表无法编辑", "编辑", {
        confirmButtonText: "确定",
      });
    },
    // 列表删除
    delUser(row) {
      this.$confirm("此操作将永久删除该就业意向，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 发起请求,删除操作
        deleteIntention(row.sno).then((res) => {
          if (res.data.code === "002") {
            this.$message.error("就业意向删除失败");
            return;
          }
          this.$message({
            message: "就业意向删除成功",
            type: "success",
          });
        });
        this.getList();
      });
    },
    // 获取列表数据
    getList() {
      allIntention(this.config).then((res) => {
        console.log(res);
        this.config.total = res.data.msg.total[0].id;
        let Info = res.data.msg.pageInfo;
        if (this.isUser.priviege === "教师用户") {
          let info = Info.filter((el) => {
            return el.Class == this.isUser.sno;
          });
          this.tableData = info;
          return;
        }
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
      queryIntentions(this.search).then((res) => {
        if (res.data.code == "002") {
          this.tableData = [];
          return;
        }
        this.config.total = res.data.msg.total;
        this.tableData = res.data.msg.result;
      });
    },
    exportExcelSelect() {
      htmlToExcel.getExcel("#selectTable", "就业意向表");
    },
  },
  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    if (User) {
      this.isUser = User;
    }
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
