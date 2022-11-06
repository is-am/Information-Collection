<template>
  <div>
    <el-alert :title="title" show-icon type="warning" :closable="false">
    </el-alert>
    <div class="personal">
      <div class="el-icon-tickets">个人信息</div>
      <el-divider></el-divider>
      <el-row :gutter="10">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          label-width="110px"
          label-position="left"
        >
          <el-col :span="9">
            <el-form-item label="姓名" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入姓名"
                clearable
                :disabled="disabled"
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="性别" prop="sex">
              <el-select
                v-model="formData.sex"
                placeholder="请输入性别"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in sexOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="学号" prop="sno">
              <el-input
                v-model="formData.sno"
                placeholder="请输入学号"
                :maxlength="10"
                show-word-limit
                clearable
                :disabled="disabled"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="身份证" prop="IdentityCard">
              <el-input
                v-model="formData.IdentityCard"
                placeholder="请输入身份证"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="出入年月" prop="Birth">
              <el-date-picker
                type="month"
                v-model="formData.Birth"
                format="yyyy-MM"
                value-format="yyyy-MM"
                :style="{ width: '100%' }"
                placeholder="请选择出入年月"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="生源地" prop="Source">
              <el-input
                v-model="formData.Source"
                placeholder="请输入生源地，xx省xx市"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="民族" prop="Nation">
              <el-input
                v-model="formData.Nation"
                placeholder="请输入民族,如汉族"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="政治面貌" prop="Ace">
              <el-input
                v-model="formData.Ace"
                placeholder="请输入政治面貌"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="学院" prop="College">
              <el-input
                v-model="formData.College"
                placeholder="请输入学院"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="专业" prop="Specialty">
              <el-input
                v-model="formData.Specialty"
                placeholder="请输入专业"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="班级" prop="ClassName">
              <el-input
                v-model="formData.ClassName"
                placeholder="请输入班级"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="入学年份" prop="EnterYear">
              <el-date-picker
                type="year"
                v-model="formData.EnterYear"
                format="yyyy"
                value-format="yyyy"
                :style="{ width: '100%' }"
                placeholder="请选择入学年份"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="学历" prop="Education">
              <el-select
                v-model="formData.Education"
                placeholder="请输入学历"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in EducationOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="学制" prop="Syesr">
              <el-select
                v-model="formData.Syesr"
                placeholder="请输入学制"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in SyesrOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="培养方式" prop="TrainingMode">
              <el-select
                v-model="formData.TrainingMode"
                placeholder="请输入培养方式"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in TrainingModeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="师范生类别" prop="StudentCategory">
              <el-select
                v-model="formData.StudentCategory"
                placeholder="请输入师范生类别"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in StudentCategoryOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="困难生类别" prop="Difficult">
              <el-select
                v-model="formData.Difficult"
                placeholder="请选择困难生类别"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in DifficultOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item
              label="定向或管培单位"
              prop="OrientationOrTubeTrainingUnit"
            >
              <el-input
                v-model="formData.OrientationOrTubeTrainingUnit"
                placeholder="请输入定向或管培单位"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="户籍" prop="Koseki">
              <el-input
                v-model="formData.Koseki"
                placeholder="请输入户籍"
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
import { personalInfo, queryPersonalInfo } from "@/api/data";
export default {
  data() {
    return {
      title: "",
      disabled: true,
      formData: {
        Class: "",
        name: "",
        sex: "男",
        sno: "",
        IdentityCard: "",
        Birth: "",
        Source: "",
        Nation: "",
        Ace: "",
        College: "",
        Specialty: "",
        ClassName: "",
        EnterYear: "",
        Education: "",
        Syesr: "",
        TrainingMode: "非定向",
        StudentCategory: "",
        Difficult: "非困难生",
        OrientationOrTubeTrainingUnit: "",
        Koseki: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请输入性别",
            trigger: "change",
          },
        ],
        sno: [
          {
            required: true,
            message: "请输入学号",
            trigger: "blur",
          },
        ],
        IdentityCard: [
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            required: true,
            message: "请输入身份证",
            trigger: "blur",
          },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: "请输入正确的身份证",
            trigger: "change",
          },
        ],
        Birth: [
          {
            required: true,
            message: "请选择出入年月",
            trigger: "change",
          },
        ],
        Source: [
          {
            required: true,
            message: "请输入生源地，xx省xx市",
            trigger: "blur",
          },
        ],
        Nation: [
          {
            required: true,
            message: "请输入民族,如汉族",
            trigger: "blur",
          },
        ],
        Ace: [
          {
            required: true,
            message: "请输入政治面貌",
            trigger: "blur",
          },
        ],
        College: [
          {
            required: true,
            message: "请输入学院",
            trigger: "blur",
          },
        ],
        Specialty: [
          {
            required: true,
            message: "请输入专业",
            trigger: "blur",
          },
        ],
        ClassName: [
          {
            required: true,
            message: "请输入班级",
            trigger: "blur",
          },
        ],
        EnterYear: [
          {
            required: true,
            message: "请选择入学年份",
            trigger: "change",
          },
        ],
        Education: [
          {
            required: true,
            message: "请输入学历",
            trigger: "change",
          },
        ],
        Syesr: [
          {
            required: true,
            message: "请输入学制",
            trigger: "change",
          },
        ],
        TrainingMode: [
          {
            required: true,
            message: "请输入培养方式",
            trigger: "change",
          },
        ],
        StudentCategory: [
          {
            required: true,
            message: "请输入师范生类别",
            trigger: "change",
          },
        ],
        Difficult: [
          {
            required: true,
            message: "请选择困难生类别",
            trigger: "change",
          },
        ],
        OrientationOrTubeTrainingUnit: [],
        Koseki: [
          {
            required: true,
            message: "请输入户籍",
            trigger: "blur",
          },
        ],
      },
      sexOptions: [
        {
          label: "男",
          value: "男",
        },
        {
          label: "女",
          value: "女",
        },
      ],
      EducationOptions: [
        {
          label: "专科",
          value: "专科",
        },
        {
          label: "本科",
          value: "本科",
        },
        {
          label: "研究生",
          value: "研究生",
        },
      ],
      SyesrOptions: [
        {
          label: "3",
          value: 3,
        },
        {
          label: "4",
          value: 4,
        },
        {
          label: "5",
          value: 5,
        },
      ],
      TrainingModeOptions: [
        {
          label: "定向生",
          value: "定向生",
        },
        {
          label: "非定向",
          value: "非定向",
        },
      ],
      StudentCategoryOptions: [
        {
          label: "师范生",
          value: "师范生",
        },
        {
          label: "非师范生",
          value: "非师范生",
        },
      ],
      DifficultOptions: [
        {
          label: "非困难生",
          value: "非困难生",
        },
        {
          label: "三档困难",
          value: "三档困难",
        },
        {
          label: "二档困难",
          value: "二档困难",
        },
        {
          label: "一档困难",
          value: "一档困难",
        },
      ],
    };
  },

  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
        personalInfo(this.formData).then((res) => {
          console.log(res);
          if (res.data.code === "001") {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            let sno = { sno: this.formData.sno };
            queryPersonalInfo(sno).then((res) => {
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
    console.log("User", User);
    if (User) {
      if (User.name === "admin") {
        this.disabled = false;
      }
      this.formData.sno = User.sno;
      this.formData.name = User.name;
      this.formData.Class = User.Class;
      let sno = { sno: User.sno };
      queryPersonalInfo(sno).then((res) => {
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
<style scoped>
.personal {
  border: 1px solid rgb(195, 190, 190);
  padding: 50px 200px;
}
</style>
