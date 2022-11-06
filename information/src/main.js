import Vue from "vue";
import App from "./App.vue";

//引入VueRouter 开始
import VueRouter from "vue-router";
//引入路由器
import router from "./router";
//应用插件
Vue.use(VueRouter);
//引入VueRouter 结束

//引入Vuex相关组件 开始
import store from "./store";
//引入Vuex相关组件 结束

//引入element-ui 开始
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
//引入element-ui 结束

//定义全局过滤器 开始
import moment from "moment";
// data接收要修改的时间格式，formatStr接收字符串，要修改成的格式
Vue.filter("convertTime", function (data, formatStr) {
  return moment(data).format(formatStr);
});
//全局过滤器 结束

// 导航守卫 开始
router.beforeEach((to, from, next) => {
  // 获取store中的token,调用getToken是为了防止页面刷新后vuex丢失token信息
  store.commit("getToken");
  const token = store.state.userToken.token;
  // 判断如果token不存在并且不是登录页，就不能登录系统
  if (!token && to.name !== "login") {
    // 跳转登录页
    next({ name: "login" });
  } else if (token && to.name === "login") {
    // 判断是否为登录状态，直接进入主页
    next({ name: "home" });
  } else {
    next(); //放行
  }
});
// 导航守卫 结束

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  router,
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
