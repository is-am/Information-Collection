import Vue from "vue";
import Vuex from "vuex";
import tab from "./tab";
import user from "./user";
import userToken from "./userToken";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    tab,
    userToken,
    user,
  },
});
