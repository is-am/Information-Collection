<template>
  <div>
    <div class="el-icon-s-data">意向薪资与毕业去向</div>
    <el-divider></el-divider>
    <div class="echarts">
      <div
        ref="rate"
        style="margin: 100px auto; width: 900px; height: 600px"
      ></div>
      <div
        ref="rate2"
        style="margin: 100px auto; width: 900px; height: 600px"
      ></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { chartData } from "@/api/data";
export default {
  name: "page2",
  data() {
    return {
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
      console.log(res);
      var rate = echarts.init(this.$refs.rate);
      var rate2 = echarts.init(this.$refs.rate2);
      if (res.data.code == "001") {
        let object = res.data.msg;
        var pay = object.map((item) => item.Remuneration);
        let payarr = [0, 0, 0, 0, 0, 0];
        pay.forEach((item) => {
          if (item < 2000) {
            payarr[0]++;
          } else if (item >= 2000 && item < 3000) {
            payarr[1]++;
          } else if (item >= 3000 && item < 4000) {
            payarr[2]++;
          } else if (item >= 4000 && item < 5000) {
            payarr[3]++;
          } else if (item >= 5000 && item < 6000) {
            payarr[4]++;
          } else if (item >= 6000) {
            payarr[5]++;
          }
        });
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "期望最低薪资",
          },
          tooltip: {},
          legend: {
            data: ["薪资"],
          },
          xAxis: {
            data: ["2k以下", "2k-3k", "3k-4k", "4k-5k", "5k-6k", "6k以上"],
          },
          yAxis: {},
          series: [
            {
              name: "薪资",
              type: "bar",
              data: payarr,
            },
          ],
        };

        let Whereabouts = res.data.chartWhereabouts;
        var wher = Whereabouts.map((item) => item.Whereabouts);

        let wherarr = [0, 0, 0, 0, 0, 0, 0];
        wher.forEach((item) => {
          if (item == "公务员") {
            wherarr[0]++;
          } else if (item == "考研") {
            wherarr[1]++;
          } else if (item == "签就业协议形式就业") {
            wherarr[2]++;
          } else if (item == "签劳动合同形式就业") {
            wherarr[3]++;
          } else if (item == "其他录用形式就业") {
            wherarr[4]++;
          } else if (item == "创业") {
            wherarr[5]++;
          } else if (item == "自由职业") {
            wherarr[6]++;
          }
        });
        var option2 = {
          title: {
            text: "毕业去向",
          },
          tooltip: {},
          legend: {
            data: ["人数"],
          },
          xAxis: {
            data: [
              "公务员",
              "考研",
              "就业协议",
              "劳动合同",
              "其他录用",
              "创业",
              "自由职业",
            ],
          },
          yAxis: {},
          series: [
            {
              name: "人数",
              type: "bar",
              data: wherarr,
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        rate.setOption(option);
        rate2.setOption(option2);
        return;
      }
    });
  },
};
</script>

<style>
.echarts {
  display: flex;
}
</style>
