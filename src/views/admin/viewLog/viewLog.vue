<template>
  <div style="min-width:1300px;" class="app-container calendar-list-container">
    <!-- viewLog -->
    <p style="float:left">工序查询：
      <el-select v-model="showselectProcess" @change="changeSelected" placeholder="请选择工序">
        <el-option v-for="(item,index) in selectedOptions4" :key="index" :label="item.name" :value="item.code">
        </el-option>
      </el-select>
    </p>
    <el-table :data="tableData">
      <el-table-column prop="Pc_Name" label="流程名">
      </el-table-column>
      <!-- <el-table-column  v-if="showselectProcess != 35" prop="Code" label="工序名" :formatter="changeProcessName">
        </el-table-column> -->
      <el-table-column v-if="showselectProcess == 35" prop="Pod" label="Pod值">
      </el-table-column>
      <el-table-column prop="UserName" label="员工名">
      </el-table-column>
      <el-table-column  label="状态">
        <template scope="scope">
                {{scope.row.State  | StyleIquiryStatus}}
</template>
      </el-table-column>
      <el-table-column prop="time" label="时间" :formatter="this.ChangeDateFormat">
      </el-table-column>
    </el-table>
    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30,60]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script>
import { page, getPod } from "api/admin/viewLog/viewLog";
import { getPersonal, showProcess } from "api/admin/user/index";
import { getRole } from "utils/auth";
export default {
  data() {
    return {
      tableData: [],
      listLoading: false,
      isgetrole: getRole(),
      selectedOptions4: "",
      showselectProcess: "",
      selcode: "",
      user: "",
      listQuery: {
        page: 1,
        limit: Number(localStorage.getItem('totalPage') || 10)
      },
      listQuerypod: {
        page: 1,
        limit: Number(localStorage.getItem('totalPage') || 10)
      },
      total: null
    };
  },
  created() {
    this.getPer();
  },
  computed: {},
  methods: {
    getList(code) {
      // console.log('caxuan')
      this.listQuery.code = parseInt(code);
      this.listLoading = true;
      page(this.listQuery).then(response => {
        // console.log(response)
        if (response.status == 200) {
          this.tableData = response.data.rows;
          // console.log( this.tableData)
          this.total = response.data.total;
          this.listLoading = false;
        } else {
          this.listLoading = false;
          this.tableData = [];
          this.total = 0;
          this.$message({
            message: response.tip,
            type: "warning",
            duration: 2000,
            offset: 700
          });
        }
      });
    },
    handleSizeChange(val) {
      // console.log(val)
      this.listQuery.page = 1;
      this.listQuery.limit = val;
      if (this.selcode == 35) {
        this.getPods(this.listQuery);
      } else {
        this.getList(this.selcode);
      }
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      if (this.selcode == 35) {
        this.getPods(this.listQuery);
      } else {
        this.getList(this.selcode);
      }
    },
    getPer() {
      // if (getRole() == '1') {
      getPersonal().then(res => {
        this.user = res.data.PLID;
        //将获取到的process添加到数组中
        this.showProcessArr(res.data.PLID);
        this.selcode = res.data.code;
        this.showselectProcess = res.data.code;
      });
    },
    changeSelected(val) {
      // console.log(val);
      if (val == 35) {
        this.listQuery.code = 35;
        this.selcode = 35;
        this.getPods(this.listQuery);
      } else {
        this.selcode = val;
        this.getList(val);
      }
    },
    getPods() {
      getPod(this.listQuery).then(res => {
        this.listLoading = true;
        if (res.status == 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
          this.listLoading = false;
        } else {
          this.listLoading = false;
          this.$message({
            message: res.tip,
            type: "warning",
            duration: 2000,
            offset: 700
          });
        }
      });
    },
    showProcessArr(plid) {
      showProcess(plid).then(res => {
        var array = res.data.rows;
        this.selectedOptions4 = array;
        var children = [];
      });
    }
  },
  filters: {
    StyleIquiryStatus: function(val) {
      return val == "0" ? "未完成" : val == "1" ? "完成" : "未知";
    }
  }
};
</script>
