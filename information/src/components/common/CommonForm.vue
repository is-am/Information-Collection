<template>
  <div>
    <el-form
      :rules="rules"
      ref="form"
      label-width="100px"
      :model="form"
      :inline="inline"
    >
      <el-form-item
        v-for="item in formLabel"
        :key="item.label"
        :label="item.label"
        prop="sno"
      >
        <el-input
          v-if="item.type === 'input'"
          :placeholder="`请输入${item.label}`"
          v-model="form[item.model]"
        ></el-input>
        <el-input
          v-if="item.type === 'password'"
          :placeholder="`请输入${item.label}`"
          type="password"
          v-model="form[item.model]"
          autocomplete="off"
          show-password
        ></el-input>
        <el-input
          v-if="item.type === 'textarea'"
          type="textarea"
          :rows="4"
          :cols="24"
          :placeholder="`请输入${item.label}`"
          v-model="form[item.model]"
        ></el-input>
        <el-switch
          v-if="item.type === 'switch'"
          v-model="form[item.model]"
        ></el-switch>
        <el-date-picker
          v-if="item.type === 'date'"
          type="date"
          value-format="yyyy-MM-dd"
          :placeholder="`请输入${item.label}`"
          v-model="form[item.model]"
        ></el-date-picker>
        <el-input
          v-if="item.type === 'disabled'"
          :placeholder="`${form[item.model]}`"
          v-model="form[item.model]"
          :disabled="true"
        >
        </el-input>
        <el-select
          v-if="item.type === 'select'"
          placeholder="请选择"
          v-model="form[item.model]"
        >
          <el-option
            v-for="opt in item.opts"
            :key="opt.value"
            :label="opt.label"
            :value="opt.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 如果当前组件不能满足，可自定义组件 -->
      <el-form-item><slot></slot></el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelForm">取消</el-button>
      <el-button type="primary" @click="childInputChange">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonForm",

  props: {
    //   接收form相关配置
    formLabel: Array,
    // 表单的布局
    inline: Boolean,
  },
  data() {
    return {
      form: {},
      rules: {
        sno: [
          {
            required: true, // 必填
            message: "请输入正确的数据", //如果校验不通过的提示
            trigger: "blur", //触发方式 在input失去焦点时触发
          },
        ],
      },
    };
  },

  methods: {
    childInputChange() {
      // 通过$emit触发childValueChange（model内定义）事件，将内部值传递给给父组件
      this.$emit("child-value-change", this.form);
    },
    cancelForm() {
      this.$emit("cancelForm");
    },
  },
};
</script>

<style scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
