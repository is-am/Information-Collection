<template>
  <div>
    <el-alert :title="title" show-icon type="warning" :closable="false">
    </el-alert>
    <div class="employment">
      <div class="el-icon-tickets">就业信息</div>
      <el-divider></el-divider>
      <el-row :gutter="10">
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          label-width="140px"
          label-position="left"
        >
          <el-col :span="9">
            <el-form-item label="毕业去向" prop="Whereabouts">
              <el-select
                v-model="formData.Whereabouts"
                placeholder="请输入毕业去向"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in WhereaboutsOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="单位名称" prop="EnterpriseName">
              <el-input
                v-model="formData.EnterpriseName"
                placeholder="请输入单位名称"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="就业单位地址" prop="AddressOfEmployer">
              <el-input
                v-model="formData.AddressOfEmployer"
                placeholder="请输入就业单位地址"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="单位性质" prop="EnterpriseNature">
              <el-select
                v-model="formData.EnterpriseNature"
                placeholder="请输入单位性质"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in EnterpriseNatureOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="组织机构代码" prop="InstitutionCode">
              <el-input
                v-model="formData.InstitutionCode"
                placeholder="请输入组织机构代码"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="单位行业" prop="Industry">
              <el-select
                v-model="formData.Industry"
                placeholder="请输入单位行业"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in IndustryOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="工作职位类型" prop="TypeOfJob">
              <el-select
                v-model="formData.TypeOfJob"
                placeholder="请输入工作职位类型"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in TypeOfJobOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="单位所在地" prop="EnterpriseIocality">
              <el-input
                v-model="formData.EnterpriseIocality"
                placeholder="请输入单位所在地"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="单位联系人姓名" prop="EnterprisePerson">
              <el-input
                v-model="formData.EnterprisePerson"
                placeholder="请输入单位联系人姓名"
                clearable
                prefix-icon="el-icon-user-solid"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="单位联系电话" prop="EnterprisePhone">
              <el-input
                v-model="formData.EnterprisePhone"
                placeholder="请输入单位联系电话"
                show-word-limit
                prefix-icon="el-icon-phone-outline"
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item
              label="单位开具证明时间"
              prop="EnterpriseCredentialTime"
            >
              <el-date-picker
                v-model="formData.EnterpriseCredentialTime"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :style="{ width: '100%' }"
                placeholder="请输入单位开具证明时间"
                clearable
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="所在岗位" prop="Work">
              <el-input
                v-model="formData.Work"
                placeholder="请输入所在岗位"
                clearable
                :style="{ width: '100%' }"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="岗位月度薪酬" prop="Remuneration">
              <el-input
                v-model="formData.Remuneration"
                placeholder="请输入岗位月度薪酬"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="是否对口" prop="Counterparts">
              <el-select
                v-model="formData.Counterparts"
                placeholder="请输入是否对口"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in CounterpartsOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="档案去向类型" prop="FileType">
              <el-select
                v-model="formData.FileType"
                placeholder="请输入档案去向类型"
                clearable
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="(item, index) in FileTypeOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="附件证明" prop="Accessory">
              <el-upload
                ref="Accessory"
                :file-list="AccessoryfileList"
                :action="AccessoryAction"
                :auto-upload="false"
                multiple
                :before-upload="AccessoryBeforeUpload"
              >
                <el-button size="small" type="primary" icon="el-icon-upload"
                  >点击上传</el-button
                >
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="档案接收单位" prop="FileReceivingUnit">
              <el-input
                v-model="formData.FileReceivingUnit"
                placeholder="请输入档案接收单位"
                clearable
                :style="{ width: '100%' }"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="21">
            <el-form-item label="顶岗实习单位" prop="InternshipPosition">
              <el-input
                v-model="formData.InternshipPosition"
                placeholder="请输入顶岗实习单位"
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
                show-word-limit
                clearable
                :style="{ width: '100%' }"
              ></el-input>
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
import { studentsEmployment, queryStuEmployment } from "@/api/data";
export default {
  data() {
    return {
      title: "",
      formData: {
        sno: "",
        Class: "",
        Whereabouts: undefined,
        EnterpriseName: undefined,
        AddressOfEmployer: undefined,
        EnterpriseNature: "私营企业",
        InstitutionCode: undefined,
        Industry: undefined,
        TypeOfJob: undefined,
        EnterpriseIocality: undefined,
        EnterprisePerson: undefined,
        EnterprisePhone: undefined,
        EnterpriseCredentialTime: null,
        Work: undefined,
        Remuneration: undefined,
        Counterparts: "是",
        FileType: undefined,
        //
        Accessory: null,
        FileReceivingUnit: undefined,
        InternshipPosition: undefined,
        Remark: undefined,
      },
      rules: {
        Whereabouts: [
          {
            required: true,
            message: "请输入毕业去向",
            trigger: "change",
          },
        ],
        EnterpriseName: [
          {
            required: true,
            message: "请输入单位名称",
            trigger: "blur",
          },
        ],
        AddressOfEmployer: [
          {
            required: true,
            message: "请输入就业单位地址",
            trigger: "blur",
          },
        ],
        EnterpriseNature: [
          {
            required: true,
            message: "请输入单位性质",
            trigger: "change",
          },
        ],
        InstitutionCode: [
          {
            required: true,
            message: "请输入组织机构代码",
            trigger: "blur",
          },
        ],
        Industry: [
          {
            required: true,
            message: "请输入单位行业",
            trigger: "change",
          },
        ],
        TypeOfJob: [
          {
            required: true,
            message: "请输入工作职位类型",
            trigger: "change",
          },
        ],
        EnterpriseIocality: [
          {
            required: true,
            message: "请输入单位所在地",
            trigger: "blur",
          },
        ],
        EnterprisePerson: [
          {
            pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
            required: true,
            message: "请输入单位联系人姓名",
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
        EnterpriseCredentialTime: [
          {
            required: true,
            message: "请输入单位开具证明时间",
            trigger: "change",
          },
        ],
        Work: [
          {
            required: true,
            message: "请输入所在岗位",
            trigger: "blur",
          },
        ],
        Remuneration: [
          {
            max: 5,
            required: true,
            message: "请输入岗位月度薪酬",
            trigger: "blur",
          },
          {
            pattern: /^[1-9]\d*$/,
            message: "请输入正确的薪资数",
            trigger: "change",
          },
        ],
        Counterparts: [
          {
            required: true,
            message: "请输入是否对口",
            trigger: "change",
          },
        ],
        FileType: [
          {
            required: true,
            message: "请输入档案去向类型",
            trigger: "change",
          },
        ],
        FileReceivingUnit: [
          {
            required: true,
            message: "请输入档案接收单位",
            trigger: "blur",
          },
        ],
        InternshipPosition: [
          {
            required: true,
            message: "请输入顶岗实习单位",
            trigger: "blur",
          },
        ],
        Remark: [],
      },
      AccessoryAction: "https://jsonplaceholder.typicode.com/posts/",
      AccessoryfileList: [],
      WhereaboutsOptions: [
        {
          label: "公务员",
          value: "公务员",
        },
        {
          label: "考研",
          value: "考研",
        },
        {
          label: "签就业协议形式就业",
          value: "签就业协议形式就业",
        },
        {
          label: "签劳动合同形式就业",
          value: "签劳动合同形式就业",
        },
        {
          label: "其他录用形式就业",
          value: "其他录用形式就业",
        },
        {
          label: "创业",
          value: "创业",
        },
        {
          label: "自由职业",
          value: "自由职业",
        },
      ],
      EnterpriseNatureOptions: [
        {
          label: "国家行政机关",
          value: "国家行政机关",
        },
        {
          label: "事业单位",
          value: "事业单位",
        },
        {
          label: "参公管理事业单位",
          value: "参公管理事业单位",
        },
        {
          label: "国有企业",
          value: "国有企业",
        },
        {
          label: "私营企业",
          value: "私营企业 ",
        },
        {
          label: "股份制企业",
          value: "股份制企业",
        },
        {
          label: "外资企业",
          value: "外资企业",
        },
        {
          label: "合资企业",
          value: "合资企业",
        },
      ],
      IndustryOptions: [
        {
          label: "农、林、牧、渔业",
          value: "农、林、牧、渔业",
        },
        {
          label: "采矿业",
          value: "采矿业",
        },
        {
          label: "制造业",
          value: "制造业",
        },
        {
          label: "电力、燃气及水的生产和供应业",
          value: "电力、燃气及水的生产和供应业",
        },
        {
          label: "建筑业",
          value: "建筑业",
        },
        {
          label: "交通运输、仓储和邮政业",
          value: "交通运输、仓储和邮政业",
        },
        {
          label: "信息传输、计算机服务和软件业",
          value: "信息传输、计算机服务和软件业",
        },
        {
          label: "批发和零售业 ",
          value: "批发和零售业 ",
        },
        {
          label: "住宿和餐饮业 ",
          value: "住宿和餐饮业 ",
        },
        {
          label: "金融业 ",
          value: "金融业 ",
        },
        {
          label: "房地产业 ",
          value: "房地产业 ",
        },
        {
          label: "租赁和商务服务业",
          value: "租赁和商务服务业",
        },
        {
          label: "科学研究、技术服务和地质勘查业",
          value: "科学研究、技术服务和地质勘查业",
        },
        {
          label: "水利、环境和公共设施管理业 ",
          value: "水利、环境和公共设施管理业 ",
        },
        {
          label: "居民服务和其他服务业 ",
          value: "居民服务和其他服务业 ",
        },
        {
          label: "教育 ",
          value: "教育 ",
        },
        {
          label: "卫生、社会保障和社会福利业",
          value: "卫生、社会保障和社会福利业",
        },
        {
          label: "文化、体育和娱乐业。",
          value: "文化、体育和娱乐业。",
        },
      ],
      TypeOfJobOptions: [
        {
          label: "管理岗位",
          value: "管理岗位",
        },
        {
          label: "专业技术岗位",
          value: "专业技术岗位",
        },
        {
          label: " 技术工人",
          value: " 技术工人",
        },
        {
          label: "普通工人",
          value: "普通工人",
        },
      ],
      CounterpartsOptions: [
        {
          label: "是",
          value: "是",
        },
        {
          label: "否",
          value: "否",
        },
      ],
      FileTypeOptions: [
        {
          label: "单位接收",
          value: "单位接收",
        },
        {
          label: "回生源地",
          value: "回生源地",
        },
        {
          label: "其他情况",
          value: "其他情况",
        },
      ],
    };
  },
  mounted() {
    // 判断登录状态
    let User = JSON.parse(localStorage.getItem("User"));
    if (null === User) return;
    if (User) {
      this.formData.sno = User.sno;
      this.formData.Class = User.Class;
      let sno = { sno: User.sno };
      queryStuEmployment(sno).then((res) => {
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
        const file = this.$refs.Accessory.uploadFiles[0];
        console.log(file);
        formData.append("sno", this.formData.sno);
        formData.append("Class", this.formData.Class);
        formData.append("Whereabouts", this.formData.Whereabouts);
        formData.append("EnterpriseName", this.formData.EnterpriseName);
        formData.append("AddressOfEmployer", this.formData.AddressOfEmployer);
        formData.append("EnterpriseNature", this.formData.EnterpriseNature);
        formData.append("InstitutionCode", this.formData.InstitutionCode);
        formData.append("Industry", this.formData.Industry);
        formData.append("TypeOfJob", this.formData.TypeOfJob);
        formData.append("EnterpriseIocality", this.formData.EnterpriseIocality);
        formData.append("EnterprisePerson", this.formData.EnterprisePerson);
        formData.append("EnterprisePhone", this.formData.EnterprisePhone);
        formData.append(
          "EnterpriseCredentialTime",
          this.formData.EnterpriseCredentialTime
        );
        formData.append("Work", this.formData.Work);
        formData.append("Remuneration", this.formData.Remuneration);
        formData.append("Counterparts", this.formData.Counterparts);
        formData.append("FileType", this.formData.FileType);
        formData.append("Accessory", file.raw);
        formData.append("FileReceivingUnit", this.formData.FileReceivingUnit);
        formData.append("InternshipPosition", this.formData.InternshipPosition);
        formData.append("Remark", this.formData.Remark);

        studentsEmployment(formData).then((res) => {
          console.log(res);
          if (res.data.code === "001") {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
            let sno = { sno: this.formData.sno };
            queryStuEmployment(sno).then((res) => {
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
    AccessoryBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 5;
      if (!isRightSize) {
        this.$message.error("文件大小超过 5MB");
      }
      return isRightSize;
    },
    submitUpload() {
      this.$refs["Accessory"].submit();
    },
  },
};
</script>
<style scoped>
.el-upload__tip {
  line-height: 1.2;
}
.employment {
  border: 1px solid rgb(195, 190, 190);
  padding: 50px 200px;
}
</style>
