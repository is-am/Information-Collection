export default {
  state: {
    isCollapse: false,
    // 面包屑的初始数据
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    //面包屑高亮显示的标识
    currentMenu: null,
    menu: [],
  },
  mutations: {
    // 改变isCollapse，实现侧边栏的切换
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    //改变tabsList，实现面包屑功能
    selectMenu(state, val) {
      // 判断是否为首页
      if (val.name !== "home") {
        state.currentMenu = val;
        //获取选中项的数据，判断tabsList里是否存在，不存在就进行添加
        // findIndex，寻找匹配的元素，返回第一个元素的下标，没有就返回-1
        const result = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        // 等于 -1 证明不存在，需要进行添加
        if (result === -1) {
          state.tabsList.push(val);
        }
      } else {
        // 标识重置
        state.currentMenu = null;
      }
    },
    //删除Tag
    closeTag(state, val) {
      // 获取需要的下标
      const result = state.tabsList.findIndex((item) => item.name === val.name);
      // 根据下标进行删除
      state.tabsList.splice(result, 1);
    },
    // 设置menu
    setMenu(state, val) {
      state.menu = val;
    },
    // 动态注册路由
    addMenu(state, router) {
      // 判断缓存中是否有数据
      if (!localStorage.getItem("menu")) return;
      let menu = JSON.parse(localStorage.getItem("menu"));
      // console.log(localStorage.getItem("menu"));
      // console.log(JSON.parse(localStorage.getItem("menu")));

      state.menu = menu;
      // 组装动态路由数据
      const menuArray = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`@/components/${item.url}`);
            return item;
          });
          menuArray.push(...item.children);
        } else {
          item.component = () => import(`@/components/${item.url}`);
          menuArray.push(item);
        }
      });
      // console.log(menuArray, "menuArray");
      // 路由的动态添加
      menuArray.forEach((item) => {
        router.addRoute("Main", item);
      });
    },
  },
};
