<template>
  <div>
    <el-dialog :title="'已注册学生'" :visible.sync="isShow" style="width: 100%">
      <el-table
        :data="student"
        height="60vh"
        stripe
        :header-cell-style="{
          background: 'rgb(200 205 216)',
          color: '#606266',
        }"
      >
        <el-table-column
          show-overflow-tooltip
          v-for="item in tableLabel"
          :key="item.prop"
          :label="item.label"
          :width="item.width ? item.width : 150"
        >
          <template slot-scope="scope">
            <img
              v-if="item.prop === 'photo'"
              :src="scope.row.photo"
              alt=""
              style="width: 100px; height: 100px"
            />
            <span v-else style="margin-left: 10px">{{
              scope.row[item.prop]
            }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pager"
        @current-change="changePage"
        current-page.sync="config.page"
        :page-size="config.pageSize"
        layout="total,  prev, pager, next, jumper"
        :total="config.total"
      >
      </el-pagination>
    </el-dialog>
    <el-table
      :data="tableData"
      :summary-method="getSummaries"
      border
      show-summary
      style="width: 100%"
    >
      <el-table-column align="center" prop="id" label="ID" width="180">
      </el-table-column>
      <el-table-column align="center" prop="name" label="表名">
      </el-table-column>
      <el-table-column align="center" prop="sumTotal" label="总人数">
        <template slot="header">
          <div @click="seeDetail">
            <span>总人数</span>
            <div>点击修改</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="amount2" sortable label="已填写">
      </el-table-column>
      <el-table-column align="center" prop="amount3" sortable label="未填写">
      </el-table-column>
      <el-table-column align="center" prop="amount4" sortable label="填写占比">
      </el-table-column>
    </el-table>
    <el-table :data="peopleData" border style="width: 100%; margin-top: 20px">
      <el-table-column align="center" prop="name" label="表名">
      </el-table-column>
      <el-table-column align="center" prop="headcount" label="总人数">
      </el-table-column>
      <el-table-column align="center" prop="registered" label="已注册">
      </el-table-column>
      <el-table-column align="center" prop="unregistered" label="未注册">
      </el-table-column>
      <el-table-column align="center" prop="proportion" label="注册占比">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template>
          <el-button @click="deleteRow" type="text" size="small">
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { StudentAllUser, Containers, StudentHeadcount } from "@/api/data";
export default {
  data() {
    return {
      tableData: [],
      peopleData: [],
      student: [],
      sno: "",
      isShow: false,
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
          prop: "photo",
          label: "照片",
          width: 200,
        },
      ],
      config: {
        page: 1, //第几页
        total: 0, //总数
        pageSize: 4, //一页展现的数据
      },
    };
  },
  methods: {
    // 分页回调,当前页改变时会触发
    changePage(page) {
      console.log(page);
      this.config.page = page;
      this.deleteRow();
    },
    deleteRow() {
      this.isShow = true;
      // 获取列表数据
      console.log(this.config.page);
      StudentAllUser(this.config).then((res) => {
        this.config.total = res.data.msg.total[0].id;
        this.student = res.data.msg.pageInfo;
      });
    },
    seeDetail() {
      this.$prompt("修改班级总人数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[+]{0,1}(\d+)$/,
        inputErrorMessage: "格式不正确，请输入正整数",
      })
        .then(({ value }) => {
          let headcount = {
            headcount: value,
            sno: this.sno,
          };
          StudentHeadcount(headcount).then((res) => {
            this.Containers();
            this.$message({
              type: "success",
              message: "班级总人数是: " + value,
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总份数";
          return;
        }
        if (index === 4) {
          sums[index] = sums[2] - sums[3];
          return;
        }
        if (index === 5) {
          sums[index] = ((sums[3] / sums[2]) * 100).toFixed(1);
          sums[index] += "%";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },

    Containers() {
      Containers({ sno: this.sno }).then((res) => {
        let data = res.data.msg;
        console.log(res);

        //  获取总人数
        let headcount = res.data.headcounts[0].headcount;
        if (!res.data.headcounts[0].headcount) {
          headcount = 40;
        }
        let people = [];
        // 注册人数
        let peopleData = {
          name: "注册学生人数",
          headcount: headcount,
          registered: res.data.students,
          unregistered: headcount - res.data.students,
          proportion: ((res.data.students / headcount) * 100).toFixed(1) + "%",
        };
        people.push(peopleData);
        this.peopleData = people;
        // 表格填写进程
        let Data = [];
        for (let key in data) {
          const amount4 =
            ((data[key][0].num / headcount) * 100).toFixed(1) + "%";
          const amount3 = headcount - data[key][0].num;
          let obj = {
            id: "19100703 ",
            name: key,
            sumTotal: headcount,
            amount2: data[key][0].num,
            amount3: amount3,
            amount4: amount4,
          };
          Data.push(obj);
        }
        this.tableData = Data;
      });
    },
  },

  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    if (User) {
      this.sno = User.sno;
    }
    this.Containers();
  },
};
</script>
