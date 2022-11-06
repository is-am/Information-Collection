<template>
  <div>
    <el-alert :title="title" show-icon type="warning" :closable="false">
    </el-alert>
    <div class="account">
      <div class="el-icon-tickets">户口档案信息</div>
      <el-divider></el-divider>
      <el-row :gutter="15">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="125px"
          label-position="left"
        >
          <el-col :span="19">
            <el-form-item label="户口转往地址" prop="AccountTransfer">
              <el-input
                v-model="formData.AccountTransfer"
                placeholder="请输入户口转往地址"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="19">
            <el-form-item label="档案转往地址" prop="AddressTransfer">
              <el-input
                v-model="formData.AddressTransfer"
                placeholder="请输入档案转往地址"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
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
            <el-form-item label="联系人" prop="Contacts">
              <el-input
                v-model="formData.Contacts"
                placeholder="请输入联系人"
                clearable
                prefix-icon="el-icon-user-solid"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input
                v-model="formData.contactNumber"
                placeholder="请输入联系电话"
                clearable
                prefix-icon="el-icon-phone-outline"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="19">
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
          <el-col :span="19">
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
import { studentRecord, queryStudentRecord } from "../../api/data";
export default {
  components: {},
  props: [],
  data() {
    return {
      title: "",
      formData: {
        sno: "",
        Class: "",
        AccountTransfer: undefined,
        AddressTransfer: undefined,
        Postcode: undefined,
        Contacts: undefined,
        contactNumber: undefined,
        Remark: undefined,
      },
      rules: {
        AccountTransfer: [
          {
            required: true,
            message: "请输入户口转往地址",
            trigger: "blur",
          },
        ],
        AddressTransfer: [
          {
            required: true,
            message: "请输入档案转往地址",
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
        Contacts: [
          {
            pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            required: true,
            message: "请输入联系人",
            trigger: "blur",
          },
          {
            pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            message: "请输入正确的联系人姓名",
            trigger: "change",
          },
        ],
        contactNumber: [
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            required: true,
            message: "请输入联系电话",
            trigger: "blur",
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            message: "请输入正确的联系电话",
            trigger: "change",
          },
        ],
        Remark: [],
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
      queryStudentRecord(sno).then((res) => {
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
        studentRecord(this.formData).then((res) => {
          console.log(res);
          if (res.data.code === "001") {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            let sno = { sno: this.formData.sno };
            console.log(sno);
            queryStudentRecord(sno).then((res) => {
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
<style scoped>
.account {
  border: 1px solid rgb(195, 190, 190);
  padding: 50px 200px;
}
</style>
