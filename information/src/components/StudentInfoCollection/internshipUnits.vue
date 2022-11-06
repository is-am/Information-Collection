<template>
  <div>
    <el-alert :title="title" show-icon type="warning" :closable="false">
    </el-alert>
    <div class="Units">
      <div class="el-icon-tickets">实习单位信息</div>
      <el-divider></el-divider>
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="110px"
          label-position="left"
        >
          <el-col :span="21">
            <el-form-item label="实习单位" prop="InternshipUnit">
              <el-input
                v-model="formData.InternshipUnit"
                placeholder="请输入实习单位"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="实习时间" prop="duration">
              <el-date-picker
                type="monthrange"
                v-model="formData.duration"
                format="yyyy-MM"
                value-format="yyyy-MM"
                :style="{ width: '100%' }"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                range-separator="至"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="单位地址" prop="Location">
              <el-input
                v-model="formData.Location"
                placeholder="请输入单位地址"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="邮政编码" prop="Postcode">
              <el-input
                v-model="formData.Postcode"
                placeholder="请输入邮政编码"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="单位联系人" prop="EnterprisePerson">
              <el-input
                v-model="formData.EnterprisePerson"
                placeholder="请输入单位联系人"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="单位联系电话" prop="EnterprisePhone">
              <el-input
                v-model="formData.EnterprisePhone"
                placeholder="请输入单位联系电话"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="备注" prop="Remark">
              <el-input
                v-model="formData.Remark"
                placeholder="请输入备注"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
    </div>
  </div>
</template>
<script>
import { internshipUnits, queryInternshipUnits } from "@/api/data";
export default {
  components: {},
  props: [],
  data() {
    return {
      title: "",
      formData: {
        sno: "",
        Class: "",
        InternshipUnit: undefined,
        duration: [""],
        Location: undefined,
        Postcode: undefined,
        EnterprisePerson: undefined,
        EnterprisePhone: undefined,
        Remark: undefined,
      },
      rules: {
        InternshipUnit: [
          {
            required: true,
            message: "请输入实习单位",
            trigger: "blur",
          },
        ],
        duration: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个实习时间",
            trigger: "change",
          },
        ],
        Location: [
          {
            required: true,
            message: "请输入单位地址",
            trigger: "blur",
          },
        ],
        Postcode: [
          {
            pattern: /^[0-9]\d{5}$/,
            required: true,
            message: "请输入邮政编码",
            trigger: "blur",
          },
          {
            pattern: /^[0-9]\d{5}$/,
            message: "请输入正确的邮政编码",
            trigger: "change",
          },
        ],
        EnterprisePerson: [
          {
            pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            required: true,
            message: "请输入单位联系人",
            trigger: "blur",
          },
          {
            pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            message: "请输入正确的单位联系人姓名",
            trigger: "change",
          },
        ],
        EnterprisePhone: [
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            required: true,
            message: "请输入单位联系电话",
            trigger: "blur",
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            message: "请输入正确的单位联系电话",
            trigger: "change",
          },
        ],
        Remark: [
          {
            required: true,
            message: "请输入备注",
            trigger: "blur",
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
    if (User) {
      this.formData.sno = User.sno;
      this.formData.Class = User.Class;
      let sno = { sno: User.sno };
      queryInternshipUnits(sno).then((res) => {
        console.log(res);
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
        let formData = this.formData;
        formData.endTime = this.formData.duration[0];
        formData.startTime = this.formData.duration[1];
        delete formData.duration;
        console.log(formData);
        internshipUnits(formData).then((res) => {
          console.log(res);
          if (res.data.code === "001") {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            let sno = { sno: this.formData.sno };
            queryInternshipUnits(sno).then((res) => {
              console.log(res);
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
<style scopeed>
.Units {
  border: 1px solid rgb(195, 190, 190);
  padding: 50px 200px;
}
</style>
