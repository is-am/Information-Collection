<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff !important;
}
.el-breadcrumb__item .el-breadcrumb__inner {
  color: #606266 !important;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-card__body {
  padding: 0 !important;
}
.el-table__fixed-right-patch,
.gutter {
  background-color: rgb(200 205 216) !important;
}
</style>
