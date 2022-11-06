<template>
  <div>
    <el-alert :title="title" show-icon type="warning" :closable="false">
    </el-alert>
    <div class="intention">
      <div class="el-icon-tickets">就业意向</div>
      <el-divider></el-divider>
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="125px"
        label-position="left"
      >
        <el-form-item label="就业区域意向1" prop="DistrictOne">
          <el-input
            v-model="formData.DistrictOne"
            placeholder="请输入就业区域意向1"
            clearable
            :style="{ width: '50%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="就业区域意向2" prop="DistrictTwo">
          <el-input
            v-model="formData.DistrictTwo"
            placeholder="请输入就业区域意向2"
            clearable
            :style="{ width: '50%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="就业企业意向1" prop="EnterpriseOne">
          <el-input
            v-model="formData.EnterpriseOne"
            placeholder="请输入就业企业意向1"
            clearable
            :style="{ width: '50%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="就业企业意向2" prop="EnterpriseTwo">
          <el-input
            v-model="formData.EnterpriseTwo"
            placeholder="请输入就业企业意向2"
            clearable
            :style="{ width: '50%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="就业岗位意向1" prop="WorkOne">
          <el-input
            v-model="formData.WorkOne"
            placeholder="请输入就业岗位意向1"
            clearable
            :style="{ width: '50%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="就业岗位意向2" prop="WorkTwo">
          <el-input
            v-model="formData.WorkTwo"
            placeholder="请输入就业岗位意向2"
            clearable
            :style="{ width: '50%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="期待待遇薪资" prop="Remuneration">
          <el-input
            v-model="formData.Remuneration"
            placeholder="请输入期待待遇薪资"
            clearable
            :style="{ width: '50%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="formData.Remark"
            placeholder="请输入备注"
            clearable
            :style="{ width: '50%' }"
          ></el-input>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { studentsIntention, queryStudentsIntention } from "../../api/data";
export default {
  components: {},
  props: [],
  data() {
    return {
      title: "",
      formData: {
        sno: "",
        Class: "",
        DistrictOne: undefined,
        DistrictTwo: undefined,
        EnterpriseOne: undefined,
        EnterpriseTwo: undefined,
        WorkOne: undefined,
        WorkTwo: undefined,
        Remuneration: undefined,
        Remark: undefined,
      },
      rules: {
        DistrictOne: [
          {
            required: true,
            message: "请输入就业区域意向1",
            trigger: "blur",
          },
        ],
        DistrictTwo: [
          {
            required: true,
            message: "请输入就业区域意向2",
            trigger: "blur",
          },
        ],
        EnterpriseOne: [
          {
            required: true,
            message: "请输入就业企业意向1",
            trigger: "blur",
          },
        ],
        EnterpriseTwo: [
          {
            required: true,
            message: "请输入就业企业意向2",
            trigger: "blur",
          },
        ],
        WorkOne: [
          {
            required: true,
            message: "请输入就业岗位意向1",
            trigger: "blur",
          },
        ],
        WorkTwo: [
          {
            required: true,
            message: "请输入就业岗位意向2",
            trigger: "blur",
          },
        ],
        Remuneration: [
          {
            max: 5,
            required: true,
            message: "请输入期待待遇薪资",
            trigger: "blur",
          },
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入正确的薪资数",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    console.log("User", User);
    if (User) {
      this.formData.sno = User.sno;
      this.formData.Class = User.Class;
      let sno = { sno: User.sno };
      console.log(sno);
      queryStudentsIntention(sno).then((res) => {
        this.title = res.data.msg;
        // if (res.data.code === "002") {
        //   this.formData = { ...res.data.user[0] };
        // }
      });
    }
  },
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        studentsIntention(this.formData).then((res) => {
          if (res.data.code === "001") {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            let sno = { sno: this.formData.sno };
            console.log(sno);
            queryStudentsIntention(sno).then((res) => {
              this.title = res.data.msg;
              // if (res.data.code === "002") {
              //   this.formData = { ...res.data.user[0] };
              // }
            });
            return;
          }
          this.$message.error(res.data.msg);
        });
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>
<style scoped>
.intention {
  border: 1px solid rgb(195, 190, 190);
  padding: 50px 200px;
}
</style>
