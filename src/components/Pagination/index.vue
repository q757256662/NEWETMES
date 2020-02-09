<template>
  <div class="pagination-container">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="currentPage" :page-sizes="[10,20,30,50]" :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
  </div>
</template>
<script>
  export default {
    name: "Pagination",
    props: {
      total: {
        type: Number,
        default: 0
      },
      listQuery: {
        type: Object,
        // required: true
      }
    },
    data() {
      return {
        limit: 0,
        currentPage: 0
      }
    },

    methods: {
      /**一页展示多少条数据 */
      handleSizeChange(val) {
        let listQuery = Object.assign({}, this.listQuery)
        listQuery.page = 1;
        listQuery.limit = val;
        this.limit = val
        this.currentPage = 1
        localStorage.setItem('totalPage', this.limit);
        this.$emit("PageChange", listQuery)
      },
      /**当前页数改变 */
      handleCurrentChange(val) {
        let listQuery = Object.assign({}, this.listQuery)
        listQuery.page = val
        this.currentPage = val
        listQuery.limit = this.limit
        this.$emit("PageChange", listQuery)
      },

    },
    created() {
      this.limit = Number(localStorage.getItem('totalPage') || this.listQuery.limit)
      this.currentPage = this.listQuery.page
    }
  }

</script>
