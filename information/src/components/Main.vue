<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <Common-aside></Common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <Common-header />
      </el-header>
      <Common-tag />
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "./common/CommonAside.vue";
import CommonHeader from "./common/CommonHeader.vue";
import CommonTag from "./common/CommonTag.vue";
export default {
  name: "Main",
  components: { CommonAside, CommonHeader, CommonTag },
};
</script>

<style scoped>
.el-header {
  background-color: #333;
}
el-main {
  padding: 0;
}
</style>
