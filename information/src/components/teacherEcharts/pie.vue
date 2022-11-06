<template>
  <div>
    <div class="el-icon-s-data">学生工作职位类别图</div>
    <el-divider></el-divider>
    <div
      ref="rate"
      style="margin: 100px auto; width: 1050px; height: 550px"
    ></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { chartData } from "@/api/data";
export default {
  name: "pie",
  data() {
    return {
      jobs: [0, 0, 0, 0],
      Class: "",
    };
  },
  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    if (User) {
      this.Class = User.sno;
    }
    chartData(this.Class).then((res) => {
      var rate = echarts.init(this.$refs.rate);
      if (res.data.code === "001") {
        console.log(res.data.chartTypeOfJob);
        let TypeOfJob = res.data.chartTypeOfJob;
        TypeOfJob.forEach((item) => {
          switch (item.TypeOfJob) {
            case "普通工人":
              this.jobs[0]++;
              break;
            case "专业技术岗位":
              this.jobs[1]++;
              break;
            case "技术工人":
              this.jobs[2]++;
              break;
            case "管理岗位":
              this.jobs[3]++;
              break;
          }
        });
        // 指定图表的配置项和数据
        console.log(this.jobs);
        var option = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            orient: "vertical",
            left: "left",
          },
          series: [
            {
              name: "人数",
              type: "pie",
              radius: "50%",
              data: [
                { value: this.jobs[0], name: "普通工人" },
                { value: this.jobs[1], name: "专业技术岗位" },
                { value: this.jobs[2], name: "技术工人" },
                { value: this.jobs[3], name: "管理岗位" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        rate.setOption(option);
      }
    });
  },
};
</script>

<style></style>
