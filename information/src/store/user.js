export default {
  state: {
    User: "",
  },
  //   mutation用来改变User
  mutations: {
    getUser(state, val) {
      state.User = val; //将传入的值赋给User
    },
  },
};
