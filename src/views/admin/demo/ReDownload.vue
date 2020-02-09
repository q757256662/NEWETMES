<template>
  <div style="min-width:1300px;" class="app-container calendar-list-container">
    <!-- <div class="header">
          <el-button class="filter-item" type="primary" v-waves icon="import" @click="handleFilter">申请任务</el-button>
          <div class="editor-slide-upload">
          </div>
        </div> -->
    <el-table :data="tableData" border :key='tableKey' ref="multipleTable" v-loading.body="listLoading" fit highlight-current-row style="max-width: 1300px">
      <!-- <el-table-column  width="65px" label="选择">
     <template scope="scope">
            <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;</el-radio>
</template>
      </el-table-column> -->
      <el-table-column prop="path" align="center" label="订单名称" width="180">
      </el-table-column>
      <el-table-column prop="pc_id" align="center" label="流程ID" width="180">
      </el-table-column>
      <el-table-column prop="name" align="center" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="type" align="center" label="类型" width="180">
        <template scope="scope">
   {{scope.row.type | changetype}}
</template>
      </el-table-column>
      <el-table-column prop="step" align="center" label="工序">
<template scope="scope">
   {{scope.row | changeProcessName}}
</template>
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作"
      align="center"
      >
<template scope="scope">
  <el-button type="primary" @click="handleOpen(scope.row)">
    打开</el-button>
  <el-button type="primary" @click="handleSave(scope.row)"> 保存</el-button>
</template>
    </el-table-column>
  </el-table>
  
  </div>
</template>

<script>
  import {
    getList,
    Postapply,
    finishapply,
    finishCodey
  } from 'api/admin/CDorder'
  export default {
    data() {
      return {
        tableData: '',
        tableKey: 0,
        listLoading: false,
        listQuery: {}
      }
    },
    created() {
      this.lsit()
    },
    methods: {
      lsit() {
        getList().then(res => {
          //  console.log(res);
          this.listLoading = true;
          if (res.Success) {
            this.tableData = res.Data.Rows;
            this.listLoading = false;
          } else {
            this.listLoading = false;
            this.$message({
              message: res.ErrMes,
              type: "success",
              duration: 2000,
            });
          }
        })
      },
      handleOpen(row) {
        let form = {};
        form.id = row.pc_id;
        form.code = row.step;
        Postapply(form).then(res => {
          console.log(res);
          if (res.Success) {
            this.$message({
              message: "成功！",
              type: "success",
              duration: 2000,
            });
          } else {
            this.$message({
              message: res.ErrMes,
              type: "success",
              duration: 2000,
            });
          }
        })
      },
      handleSave(row) {
        let form = {};
        form.id = row.pc_id;
        form.code = row.step;
        finishapply(form).then(res => {
          console.log(res);
          if (res.Success) {
            this.finish(form);
          } else {
            this.$message({
              message: res.ErrMes,
              type: "success",
              duration: 2000,
            });
          }
        })
      },
      finish(form) {
        finishCodey(form).then(res => {
          console.log(res);
           if (res.Success) {
            this.$message({
              message: "成功！",
              type: "success",
              duration: 2000,
            });
          } else {
            this.$message({
              message: res.ErrMes,
              type: "success",
              duration: 2000,
            });
          }
        })
      },
   
    },
    filters:{
         changetype(val){
            return val == "TD" ? "团订" : val == 'CD' ? "成衣" : val == 'GD' ? "个订" : "未知";
         }
    },
  }
</script>
<style lang="scss" scoped>
  .header {
    border: 1px solid #e0e0e0;
    padding: 5px;
    margin: 5px 0px;
    background: #eef1f6;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: start;
  }
</style>
