<template>
  <!-- categories -->
  <div class="app-container calendar-list-container">
    <div class="filter-container">
<!-- <el-tooltip class="item" effect="light" content="点击添加品类" placement="top-start"> -->
     <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>
    <!-- </el-tooltip> -->
      

    </div>
    <el-table :data="tableKey" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="品类ID" prop="Id"></el-table-column>
      <el-table-column align="center" label="品类名称" prop="CategoryName"> </el-table-column>
      <el-table-column align="center" label="创建时间" prop="Time" :formatter="ChangeDateFormat"> </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
<!-- <el-tooltip class="item" effect="light" content="点击删除该品类" placement="top-start"> -->
      <el-button size="small" type="success" @click="handleDel(scope.row)">
              删除
          </el-button>
    <!-- </el-tooltip> -->
       

</template>
      </el-table-column>
    </el-table>

    <!-- 模态框 -->
    <el-dialog v-dialogDrag title="添加品类" :visible.sync="dialogFormVisible">
      <el-form ref="Createform" :model="Createform" label-width="80px">
        <el-form-item label="品类名称">
          <el-input v-model="Createform.CategoryName" placeholder="必填,请输入品类名称,2至10个字符" :maxlength="10"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="create()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getList,
    putCategory,
    delCategory,
  } from "api/admin/category/index";
  import {
    getToken,
    setToken,
    getRole,
    setRole,
    setUserId,
    getUserId,
    removeRole,
    removeUserID,
    removeToken
  } from 'utils/auth';
  //这里要俺需要引入，我不是一个对象
  import {
    isvalidPhone
  } from "utils/validate";
  //定义一个全局的变量，谁用谁知道
  export default {
    name: "user",
    data() {
      return {
        dialogFormVisible: false,
        tableKey: [],
        list: [],
        listLoading: false,
        Createform: {},
      };
    },
    created() {
      this.getList();
    },
    computed: {},
    methods: {
      //初始化列表
      getList() {
        this.listLoading = true;
        getList().then(res => {
          if (res.status == 200) {
            this.tableKey = res.data.rows;
          }
          this.listLoading = false;
        })
      },
      handleCreate() {
        this.dialogFormVisible = this.dialogFormVisible ? this.dialogFormVisible = false : this.dialogFormVisible = true;
      },
      cancel() {
        this.dialogFormVisible = false;
        this.Createform = {};
      },
      create() {
        // console.log(this.Createform)
        if(this.Createform.CategoryName == '' || this.Createform.CategoryName == undefined ){
          this.$message({
            message: '请输入品类名称!',
            type: 'warning',
            duration: 2000
          });
        }
      else  if (this.Createform.CategoryName.replace(/(^[\s\n\t]+|[\s\n\t]+$)/g, "") == '') {
         
          this.$message({
            message: '请输入品类名称!',
            type: 'warning',
            duration: 2000
          });
           this.Createform= {};
        } else if (this.Createform.CategoryName.length < 2) {
          this.$message({
            message: '品类名称不能少于2个字符!',  
            type: 'warning',
            duration: 2000
          });
         
        } else {
          putCategory(this.Createform).then(res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                title: "成功",
                message: "添加成功",
                offset: 700
              })
              this.dialogFormVisible = false;
              this.getList();
              this.Createform = {};
            } else {
              this.$message({
                type: "error",
                title: "失败",
                message: res.tip,
                offset: 700
              })
            }
          })
        }
      },
      handleDel(row) {
        this.$confirm("此操作将永久删除, 是否继续?", "删除", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
         delCategory(row).then(res => {
          if (res.status == 200) {
            this.$message({
              type: "success",
              title: "成功",
              message: "删除成功",
              offset: 700
            })
            this.getList();
          } else {
            this.$message({
              type: "error",
              title: "失败",
              message: res.tip,
              offset: 700
            })
          }
        })
        });

      
      }
    },
    filters: {}
  };
</script>
<style>

</style>
