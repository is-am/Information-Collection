<template>
  <div>
    <el-alert :title="title" show-icon type="warning" :closable="false">
    </el-alert>
    <div class="credential">
      <div class="el-icon-tickets">报到证信息</div>
      <el-divider></el-divider>
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="125px"
        label-position="left"
      >
        <el-form-item label="报到去向类型" prop="RegistrationCategory">
          <el-input
            v-model="formData.RegistrationCategory"
            placeholder="请输入报到去向类型"
            clearable
            :style="{ width: '60%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="报到单位名称" prop="EnterpriseName">
          <el-input
            v-model="formData.EnterpriseName"
            placeholder="请输入报到单位名称"
            clearable
            :style="{ width: '60%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="报到单位所在地" prop="AddressOfEmployer">
          <el-input
            v-model="formData.AddressOfEmployer"
            placeholder="请输入报到单位所在地"
            clearable
            :style="{ width: '60%' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="报到期限" prop="Deadline">
          <el-date-picker
            v-model="formData.Deadline"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :style="{ width: '60%' }"
            placeholder="请输入报到期限"
            clearable
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="报到证材料上传" prop="Materials">
          <el-upload
            ref="Materials"
            :file-list="MaterialsfileList"
            :action="MaterialsAction"
            :auto-upload="false"
            :before-upload="MaterialsBeforeUpload"
          >
            <el-button size="small" type="primary" icon="el-icon-upload"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
          <el-input
            v-model="formData.Remark"
            placeholder="请输入备注"
            clearable
            :style="{ width: '60%' }"
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
import { credential, queryCredential } from "../../api/data";
export default {
  components: {},
  props: [],
  data() {
    return {
      title: "",
      formData: {
        sno: "",
        Class: "",
        RegistrationCategory: undefined,
        EnterpriseName: undefined,
        AddressOfEmployer: undefined,
        Deadline: undefined,
        Materials: null,
        Remark: undefined,
      },
      rules: {
        RegistrationCategory: [
          {
            required: true,
            message: "请输入报到去向类型",
            trigger: "blur",
          },
        ],
        EnterpriseName: [
          {
            required: true,
            message: "请输入报到单位名称",
            trigger: "blur",
          },
        ],
        AddressOfEmployer: [
          {
            required: true,
            message: "请输入报到单位所在地",
            trigger: "blur",
          },
        ],
        Deadline: [
          {
            required: true,
            message: "请输入报到期限",
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
      MaterialsAction: "https://jsonplaceholder.typicode.com/posts/",
      MaterialsfileList: [],
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
      queryCredential(sno).then((res) => {
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
        const formData = new FormData();
        //上传
        const file = this.$refs.Materials.uploadFiles[0];
        formData.append("sno", this.formData.sno);
        formData.append("Class", this.formData.Class);
        formData.append(
          "RegistrationCategory",
          this.formData.RegistrationCategory
        );
        formData.append("EnterpriseName", this.formData.EnterpriseName);
        formData.append("AddressOfEmployer", this.formData.AddressOfEmployer);
        formData.append("Deadline", this.formData.Deadline);
        formData.append("Materials", file.raw);
        formData.append("Remark", this.formData.Remark);

        credential(formData).then((res) => {
          console.log(res);
          if (res.data.code === "001") {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            let sno = { sno: this.formData.sno };
            queryCredential(sno).then((res) => {
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
    MaterialsBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 5;
      if (!isRightSize) {
        this.$message.error("文件大小超过 5MB");
      }
      return isRightSize;
    },
    submitUpload() {
      this.$refs["Materials"].submit();
    },
  },
};
</script>
<style scoped>
.el-upload__tip {
  line-height: 1.2;
}
.credential {
  border: 1px solid rgb(195, 190, 190);
  padding: 60px 200px;
}
</style>
