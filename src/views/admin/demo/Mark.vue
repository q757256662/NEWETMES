<template>
  <div>
    <p style="text-align:center;font-size:19px;font-weight:600;">生产单信息</p>
    <el-table :data="tableData1" border style="width: 100%">
      <el-table-column prop="id" label="生产单ID" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center">
      </el-table-column>
    </el-table>
    <p style="text-align:center;font-size:19px;font-weight:600;">物料信息</p>
    <el-table :data="tableData" border style="width: 100%;margin-bottom:50px;">
      <el-table-column prop="id" label="ID" align="center" width="180">
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center" width="180">
      </el-table-column>
      <el-table-column prop="width" align="center" label="幅宽（CM）">
      </el-table-column>
      <el-table-column prop="details" align="center" label="详细描述">
      </el-table-column>
      <el-table-column prop="len_shrinkage" align="center" label="经纱缩水率">
      </el-table-column>
      <el-table-column prop="width_shrinkage" align="center" label="纬纱缩水率">
      </el-table-column>
      <el-table-column prop="price" align="center" label="价格">
      </el-table-column>
      <el-table-column prop="amount" align="center" label="用量（CM）">
      </el-table-column>
    </el-table>
    <el-button class="sub-button" type="primary" size="large" @click="submitUpload">
      <span> 上 </span>
      <span>  传 </span>
    </el-button>
  </div>
</template>
<script>
  import {
    PostMark
  } from "api/admin/demo"
  import {
    GetUrlParam
  } from "utils/index";
  import {
    getToken
  } from 'utils/auth';
  export default {
    data() {
      return {
        json: '',
        tableData: [],
        tableData1: [],
        routerForm: ''
      }
    },
    created() {
      //  var data = JSON.parse(this.json)
      this.routerForm = JSON.parse(localStorage.getItem('OrderInfo'));
      this.getJson();
      //  this.tableData = data.fabric;
      //  this.tableData1 = data.order;
    },
    methods: {
      getJson() {
        if (this.bowserExplorer == 'ie') {
          this.json = JSON.parse(window.external.getData());
          var data = this.json;
          if (data.id == '' && this.routerForm) {
            let obj = {};
            obj.id = this.routerForm.Id;
            obj.name = this.routerForm.OrderId;
            this.tableData1.push(obj)
          } else {
            let obj = {};
            obj.id = this.json.id;
            obj.name = this.routerForm.OrderId;
            this.tableData1.push(obj)
          }
        } else {
          this.json = JSON.parse(window.buyiGetData());
          var data = this.json;
          if (data.id == '' && this.routerForm) {
            let obj = {};
            obj.id = this.routerForm.Id;
            obj.name = this.routerForm.OrderId;
            this.tableData1.push(obj)
          } else {
            let obj = {};
            obj.id = this.json.id;
            obj.name = this.routerForm.OrderId;
            this.tableData1.push(obj)
          }
        }
        // alert(JSON.stringify(  this.json))
        this.tableData = data.fabric;
      },
      submitUpload() {
        let form = {};
        form.json = JSON.stringify(this.json);
        form.token = getToken();
        // alert(JSON.stringify(form))
        PostMark(form).then(res => {
          if (res.Success == true) {
            if (this.bowserExplorer == 'ie') {
              window.external.closeDialog(0);
            } else {
              window.buyiCloseDialog(0);
            }
          } else {
            alert(res.ErrMes);
          }
        })
      }
    }
  }
</script>
<style>
  .table-containe {
    padding: 30px;
  }
  .sub-button {
    margin: 0 auto;
    display: block;
    width: 300px;
  }
</style>
