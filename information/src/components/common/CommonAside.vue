<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "管理" : "派遣就业信息收集系统" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.id"
      :index="item.id"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :key="item.id" :index="item.id">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subitem in item.children" :key="subitem.id">
        <el-menu-item @click="clickMenu(subitem)" :index="subitem.id">{{
          subitem.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from "js-cookie";
export default {
  name: "CommonAside",
  data() {
    return {};
  },
  methods: {
    // 点击打开子页面
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    // 点击关闭子页面
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push(
        {
          name: item.name,
        },
        //失败回调,避免重复点击报错
        (err) => {
          err;
        }
      );
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },

    menu() {
      // 判断缓存中是否存在，如果没有就去store中获取
      return (
        JSON.parse(localStorage.getItem("menu")) || this.$store.state.tab.menu
      );
    },
    //读取Vuex中的isCollapse数据，控制el-menu的缩放
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.el-menu {
  height: 100%;
  border: none;
}
.el-menu h3 {
  color: #fff;
  text-align: center;
  line-height: 48px;
}
</style>
