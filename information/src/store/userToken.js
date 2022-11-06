import Cookie from "js-cookie";
export default {
  state: {
    // 定义token 给一个默认值
    token: "",
  },
  //   mutation用来改变token
  mutations: {
    //   设置token
    setToken(state, val) {
      state.token = val; //将传入的值赋给token
      Cookie.set("token", val); //在cookie中生成数据
    },
    // 清除token
    clearToken(state) {
      state.token = "";
      Cookie.remove("token");
    },
    // 获取token
    getToken(state) {
      // 获取token，判断如果有token就直接就在state.token上获取token，如果没有就Cookie.get("token")获取
      state.token = state.token || Cookie.get("token");
    },
  },
};
