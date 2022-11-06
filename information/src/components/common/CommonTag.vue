<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      size="small"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
// mapMutations是vuex的mutation的辅助函数，用于在组件中映射mutation内的方法，以便在该组件中直接使用mutation里的方法
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    // mapState获取vuex中state的数据
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    // mapMutations是vuex的mutation的辅助函数，用于在组件中映射mutation内的方法，以便在该组件中直接使用mutation里的方法
    ...mapMutations({
      // 解构出vuex中的closeTag方法，可以起别名close
      close: "closeTag",
    }),
    // 进行点击跳转
    changeMenu(tag) {
      this.$router.push({ name: tag.name });
    },
    // 对tag标签进行点击删除
    handleClose(tag, index) {
      const length = this.tags.length - 1; //获取tags的长度
      this.close(tag); //调用方法删除相应的数据
      if (tag.name !== this.$route.name) {
        //判断是否是当前路由，需不需要进行路由与高亮跳转
        return;
      }
      if (index === length) {
        // 如果删除的是最后一个路由，那么就会跳转到上一个路由
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 如果删除的不是最后一个路由，那么就会跳转到占据当前index的路由上
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style scoped>
.tags {
  padding: 20px;
}
.el-tag {
  margin-right: 15px;
  cursor: pointer;
}
</style>
