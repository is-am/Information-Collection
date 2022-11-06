<template>
  <div>
    <el-alert :title="title" show-icon type="warning" :closable="false">
    </el-alert>
    <div class="Contact">
      <div class="el-icon-tickets">联系方式</div>
      <el-divider></el-divider>
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="125px"
        label-position="left"
      >
        <el-form-item label="家庭通讯地址" prop="HomeAddress">
          <el-input
            v-model="formData.HomeAddress"
            placeholder="请输入家庭通讯地址"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="QQ号" prop="qq">
          <el-input
            v-model="formData.qq"
            placeholder="请输入QQ号"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wx">
          <el-input
            v-model="formData.wx"
            placeholder="请输入微信号"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input
            v-model="formData.phone"
            placeholder="请输入联系电话"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input
            v-model="formData.email"
            placeholder="请输入电子邮箱"
            clearable
            :style="{ width: '100%' }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="紧急联系人" prop="emergencyContact">
          <el-input
            v-model="formData.emergencyContact"
            placeholder="请输入紧急联系人"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人电话" prop="contactNumber">
          <el-input
            v-model="formData.contactNumber"
            placeholder="请输入紧急联系人电话"
            clearable
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input
            v-model="formData.Remark"
            placeholder="请输入备注"
            clearable
            :style="{ width: '100%' }"
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
import { queryStudentContact, studentContact } from "@/api/data";
export default {
  components: {},
  props: [],
  data() {
    return {
      title: "",
      formData: {
        sno: "",
        Class: "",
        HomeAddress: undefined,
        qq: undefined,
        wx: undefined,
        phone: undefined,
        email: undefined,
        emergencyContact: undefined,
        contactNumber: undefined,
        Remark: undefined,
      },
      rules: {
        HomeAddress: [
          {
            required: true,
            message: "请输入家庭通讯地址",
            trigger: "blur",
          },
        ],
        qq: [
          {
            min: 5,
            required: true,
            message: "请输入正确的QQ号",
            trigger: "blur",
          },
          {
            pattern: /^\d{5,}$/,
            message: "请输入正确的QQ号",
            trigger: "change",
          },
        ],
        wx: [
          {
            pattern: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/,
            required: true,
            message: "请输入微信号",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z][-_a-zA-Z0-9]{5,19}$/,
            message: "请输入正确的微信号",
            trigger: "change",
          },
        ],
        phone: [
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
        email: [
          {
            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            required: true,
            message: "请输入电子邮箱",
            trigger: "blur",
          },
          {
            pattern: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
            message: "请输入正确的电子邮箱",
            trigger: "change",
          },
        ],
        emergencyContact: [
          {
            pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            required: true,
            message: "请输入紧急联系人",
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
            message: "请输入紧急联系人电话",
            trigger: "blur",
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/,
            message: "请输入正确的紧急联系人电话",
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

  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        studentContact(this.formData).then((res) => {
          console.log(res);
          if (res.data.code === "001") {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            let sno = { sno: this.formData.sno };
            queryStudentContact(sno).then((res) => {
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
  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    if (User) {
      this.formData.sno = User.sno;
      this.formData.Class = User.Class;
      let sno = { sno: User.sno };
      queryStudentContact(sno).then((res) => {
        console.log(res);
        this.title = res.data.msg;
        // if (res.data.code === "002") {
        //   this.formData = { ...res.data.user[0] };
        // }
      });
    }
  },
};
</script>
<style scopeed>
.Contact {
  border: 1px solid rgb(195, 190, 190);
  padding: 50px 200px;
}
</style>
