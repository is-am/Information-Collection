<template>
  <div class="common-table">
    <el-table
      :data="tableData"
      height="90%"
      stripe
      :header-cell-style="{
        background: 'rgb(200 205 216)',
        color: '#606266',
      }"
    >
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 150"
      >
        <template slot-scope="scope">
          <img
            v-if="item.prop === 'photo'"
            :src="scope.row.photo"
            alt=""
            style="width: 100px; height: 100px"
          />
          <span v-else style="margin-left: 10px">{{
            scope.row[item.prop]
          }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      @size-change="handleSizeChange"
      @current-change="changePage"
      current-page.sync="localConfig.page"
      :page-size="localConfig.pageSize"
      layout="total,  prev, pager, next, jumper"
      :total="localConfig.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {
      localConfig: this.config,
    };
  },
  methods: {
    //   编辑
    handleEdit(row) {
      this.$emit("edit", row);
    },
    // 删除
    handleDelete(row) {
      this.$emit("del", row);
    },
    // 分页回调,当前页改变时会触发
    changePage(page) {
      this.config.page = page;
      this.$emit("changePage", page);
    },
    // 每页显示条目个数 改变时会触发
    handleSizeChange() {},
  },
};
</script>

<style scoped>
.common-table {
  height: 700px;
  /* height: calc(100% - 70px); */
  background-color: #fff;
  position: relative;
}
.pager {
  position: absolute;
  bottom: 0;
  right: 20px;
}
</style>
