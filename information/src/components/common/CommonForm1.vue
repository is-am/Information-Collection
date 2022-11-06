<template>
  <el-form ref="form" label-width="100px" :model="form" :inline="inline">
    <el-form-item
      v-for="item in formLabel"
      :key="item.label"
      :label="item.label"
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
</template>

<script>
export default {
  name: "CommonForm",
  /*  model: {
    // 定义model
    // 父组件v-model绑定的值传递给props中的form
    prop: "form",
    // 通过emit触发childValueChange将内部值传递给父组件v-model绑定的值
    event: "childValueChange",
  }, */
  props: {
    //   接收form相关配置
    formLabel: Array,
    // 接收父组件传递过来的form数据,并进行双向绑定
    form: Object,
    // 表单的布局
    inline: Boolean,
  },
  /* 
  methods: {
    childInputChange() {
      // 通过$emit触发childValueChange（model内定义）事件，将内部值传递给给父组件
      this.$emit("childValueChange", this.form);
    },
  }, */
};
</script>

<style></style>
