<template>
  <div>
    <div class="el-icon-s-data">学生意向城市</div>
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
  name: "page2",
  data() {
    return {
      payOneData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      payTwoData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      Class: "",
    };
  },
  methods: {
    data(DataName, ArrData) {
      switch (DataName) {
        case "北京":
          ArrData[0]++;
          break;
        case "深圳":
          ArrData[1]++;
          break;
        case "广州":
          ArrData[2]++;
          break;
        case "上海":
          ArrData[3]++;
          break;
        case "成都":
          ArrData[4]++;
          break;
        case "重庆":
          ArrData[5]++;
          break;
        case "杭州":
          ArrData[6]++;
          break;
        case "西安":
          ArrData[7]++;
          break;
        case "武汉":
          ArrData[8]++;
          break;
        case "苏州":
          ArrData[9]++;
          break;
        case "郑州":
          ArrData[10]++;
          break;
        case "南京":
          ArrData[11]++;
          break;
        case "天津":
          ArrData[12]++;
          break;
        case "长沙":
          ArrData[13]++;
          break;
        case "东莞":
          ArrData[14]++;
          break;
        case "宁波":
          ArrData[15]++;
          break;
        case "佛山":
          ArrData[16]++;
          break;
        case "合肥":
          ArrData[14]++;
          break;
        case "青岛":
          ArrData[18]++;
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    if (User) {
      this.Class = User.sno;
    }
    chartData(this.Class).then((res) => {
      if (res.data.code === "001") {
        let object = res.data.chartCity;
        var payOne = object.map((item) => item);
        payOne.forEach((item) => {
          this.data(item.DistrictOne, this.payOneData);
          this.data(item.DistrictTwo, this.payTwoData);
          console.log(this.payOneData);
          console.log(this.payTwoData);
        });

        var rate = echarts.init(this.$refs.rate);
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "意向城市",
          },
          legend: {
            data: ["第一意向", "第二意向"],
          },
          xAxis: {
            data: [
              "北京",
              "深圳",
              "广州",
              "上海",
              "成都",
              "重庆",
              "杭州",
              "西安",
              "武汉",
              "苏州",
              "郑州",
              "南京",
              "天津",
              "长沙",
              "东莞",
              "宁波",
              "佛山",
              "合肥",
              "青岛",
            ],
          },
          yAxis: {},
          series: [
            {
              name: "第一意向",
              data: this.payOneData,
              type: "line",
              stack: "y",
            },
            {
              name: "第二意向",
              data: this.payTwoData,
              type: "line",
              stack: "x",
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
