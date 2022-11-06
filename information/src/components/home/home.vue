<template>
  <div>
    <el-dialog title="详情" :visible.sync="isShow">
      <div>
        <el-row :gutter="15">
          <el-form
            ref="elForm"
            :model="formData"
            size="medium"
            label-width="100px"
          >
            <el-col :span="12">
              <el-form-item label="编号">
                <el-input
                  v-model="formData.id"
                  readonly
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="公告类型">
                <el-input
                  v-model="formData.type"
                  readonly
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="发布人">
                <el-input
                  v-model="formData.issuer"
                  readonly
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="时间">
                <el-input
                  v-model="formData.time"
                  readonly
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="附件">
                <a
                  v-if="this.ifAccessory"
                  :href="`http://127.0.0.1:8880/${accessory}`"
                  >{{ accessory }}</a
                >
                <p v-else>无</p>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="公告内容">
                <el-input
                  v-model="formData.content"
                  type="textarea"
                  readonly
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-dialog>
    <el-row :gutter="20" style="min-width: 1350px">
      <el-col :span="9" style="margin-top: 20px; min-width: 500px">
        <el-card shadow="hover" style="height: 280px">
          <div class="user">
            <div class="userimg">
              <img :src="isUser.photo" />
            </div>

            <div class="userinfo">
              <p class="name">{{ isUser.name }}</p>
              <p class="access">{{ isUser.priviege }}</p>
            </div>
          </div>
          <div class="logininfo">
            <p>
              我的id：<span> {{ isUser.id }}</span>
            </p>
            <p>
              我的学号：<span>{{ isUser.sno }}</span>
            </p>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px; height: 460px">
          <el-table
            empty-text="暂无数据"
            :data="afficheData"
            height="460"
            :header-cell-style="{
              background: 'rgb(200 205 216)',
              color: '#606266',
            }"
          >
            <el-table-column
              v-for="(val, key) in afficheLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>

            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="afficheClick(scope.row)"
                  type="text"
                  size="small"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="14" style="margin-top: 20px; min-width: 700px">
        <el-card
          shadow="hover"
          style="background-color: rgb(255 232 232); height: 280px"
        >
          <div class="hint">
            <div>系统操作提示：</div>
            <div>
              1.用户头像上传
              <b>必须</b>
              是证件照，教师需
              <b>严格审核</b>
            </div>
            <div>
              2.学生所填写的信息
              <b>必须</b>
              保证其真实性，否则其
              <b>后果自负</b>
            </div>
            <div>
              3.如果近期有更换联系方式，请
              <b>及时更改</b>
              学生联系方式表，避免失联
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-top: 20px; height: 460px">
          <el-table
            empty-text="暂无数据"
            :data="noticeData"
            height="460"
            :header-cell-style="{
              background: 'rgb(200 205 216)',
              color: '#606266',
            }"
          >
            <el-table-column
              v-for="(val, key) in noticeLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>

            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="noticeClick(scope.row)"
                  type="text"
                  size="small"
                  >详情</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Affichen, Notification } from "../../api/data";
export default {
  name: "Home",
  data() {
    return {
      isUser: "",
      isShow: false,
      afficheData: [],
      noticeData: [],
      formData: {
        id: undefined,
        type: undefined,
        issuer: undefined,
        time: undefined,
        content: undefined,
      },
      ifAccessory: true,
      accessory: "",
      afficheLabel: {
        id: "编号",
        type: "公告类型",
        issuer: "发布人",
        time: "时间",
      },
      noticeLabel: {
        id: "编号",
        type: "通知类型",
        issuer: "发布人",
        time: "时间",
      },
    };
  },
  methods: {
    afficheClick(row) {
      // console.log(row);
      this.formData = row;
      this.ifAccessory = true;
      if (row.accessory === "无") {
        this.ifAccessory = false;
      }
      this.accessory = row.accessory;
      this.isShow = true;
    },
    noticeClick(row) {
      this.formData = row;
      this.ifAccessory = true;
      if (row.accessory === "无") {
        this.ifAccessory = false;
      }
      this.accessory = row.accessory;
      this.isShow = true;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
  mounted() {
    //调用封装好的Affichen方法，发送请求
    Affichen().then((res) => {
      let Affdata = res.data.msg;
      Affdata.reverse();
      if (this.isUser.priviege === "管理员") {
        this.afficheData = Affdata;
        return;
      }
      if (this.isUser.priviege === "教师用户") {
        let aff = Affdata.filter((el) => {
          return el.sno == this.isUser.sno || el.sno === "0";
        });

        this.afficheData = aff;
        return;
      }
      let aff = Affdata.filter((el) => {
        return el.sno == this.isUser.Class || el.sno === "0";
      });
      this.afficheData = aff;
    });
    Notification().then((res) => {
      let Notdata = res.data.msg;
      Notdata.reverse();
      if (this.isUser.priviege === "管理员") {
        this.noticeData = Notdata;
        return;
      }
      if (this.isUser.priviege === "教师用户") {
        let not = Notdata.filter((el) => {
          return el.sno.slice(0, 8) == this.isUser.sno;
        });
        this.noticeData = not;
        return;
      }

      let not = Notdata.filter((el) => {
        return el.sno == this.isUser.sno;
      });
      this.noticeData = not;
    });
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    if (User) {
      this.isUser = User;
    }
  },
};
</script>

<style scoped>
.user {
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid darkgrey;
}
.userimg {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-right: 25px;
  background-size: 100% 100%;
}
.userimg img {
  width: 140px;
  height: 140px;
}
.name {
  font-weight: bolder;
  font-size: 30px;
  margin: 0;
}
.access {
  margin: 0;
  color: rgb(144, 140, 140);
}
.logininfo > p {
  color: rgb(63, 60, 60);
}
.logininfo {
  height: 218px;
  padding: 20px;
  background-color: rgb(203, 224, 218);
}
.logininfo span {
  margin-left: 50px;
  color: rgb(119, 118, 118);
}
.hint {
  height: 278px;
  /* border: 1px solid rgb(240, 78, 78); */

  border-radius: 4px;
}
.hint div {
  margin-left: 10px;
  margin-top: 20px;
  color: #000;
  line-height: 40px;
  white-space: nowrap;
  text-align: left;
  font-weight: 300;
  font-size: 24px;
}
.hint b {
  color: red;
}
</style>
