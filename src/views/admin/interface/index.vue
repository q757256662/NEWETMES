<template>
<div class="app-container calendar-list-container">
  <!-- interface 查看接口 -->
  <div style="margin-bottom:10px;height:36px ">
      <el-form :inline="true" :model="queryCriteria" class="demo-form-inline" >
        <el-form-item label="" prop="apiName">
          <el-select v-model="queryCriteria.apiName" placeholder="API名称" @change="handleQuery(queryCriteria)">
            <el-option-group label="接口名称">
              <el-option label="全部" value="" key="0"></el-option>
              <el-option :label="item.Name" :value="item.Name" v-for="item in apiOptions" :key="item.Id"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="orderName">
          <el-input v-model="queryCriteria.orderName" placeholder="生产单名" @keyup.enter.native="handleQuery(queryCriteria)"></el-input>
        </el-form-item>
        <el-form-item label="" prop="time">
          <el-date-picker
            v-model="queryCriteria.time"
            type="daterange"
            placeholder="选择时间范围"
            :picker-options="pickerOptions2"
            @change="handleQuery(queryCriteria)"
            align="right">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery(queryCriteria)">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
  <el-table border v-loading="loading" :data="tableData" style="width: 100%" @cell-click="handleRowClick"
      @select="handleSelectOrder" @select-all="handleSelectAll" :row-key="getRowKeys" :expand-row-keys="expandRow"
      :row-class-name="getRowClass">
      <el-table-column prop="Name" label="接口名称" >
      </el-table-column>
      <el-table-column prop="OrderName" label="生产单名称">
      </el-table-column>
      <el-table-column prop="Erp_id" label="外部id">
      </el-table-column>
      <el-table-column prop="RequestData" label="请求数据" class-name="RequestData">
        <template scope="scope">
          <div class="shengelue">
            {{scope.row.RequestData}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="ResponseData" label="返回数据" class-name="ResponseData">
        <template scope="scope">
          <div class="shengelue">
            {{scope.row.ResponseData}}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="RequestTime" :formatter="crtTimeFtt" label="请求时间" >
      </el-table-column>
      <el-table-column prop="State" label="状态" class-name="StateClass" >
        <template scope="scope">
          <!-- <div :style="scope.row.State==3?'color:#13ce66':''"> -->
          <div>
            {{scope.row | orderStateFilter}}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="300">
        <template scope="scope">
          <el-button @click="handleEditFabric(scope.row,scope.$index)" type="primary">编辑物料名称</el-button>
          <el-button @click="()=>{dispatchLineDialogVisible=true;onGetLine(scope.row,scope.$index)}" type="primary">
            分配流水线
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <el-dialog v-dialogDrag title="JSON详情" :visible.sync="jsonDialogVisible" size="small">
      <jsonEditor :value="currentJSONData"> </jsonEditor>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="jsonDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="jsonDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <Pagination :listQuery="queryCriteria" @PageChange="handleQuery" :total="total"></Pagination>
</div>
</template>
<script>
import { getRequestInfoAll, getRequests } from "./interface";
import { getyyyyMMdd } from "@/utils";
import { crtTimeFtt } from "@/utils";
import Pagination from "@/components/Pagination";
import jsonEditor from "@/components/jsonEditor";
export default {
  components: {
    Pagination,
    jsonEditor
  },
  filters: {
    orderStateFilter(row) {
      switch (row.State) {
        case 0:
          return "失败";
        case 1:
          return "正在调用";
        case 2:
          return "请求成功";
        case 3:
          return "请求成功，数据已完整";
        default:
          return row.State;
      }
    }
  },
  data() {
    return {
      //查询条件
      queryCriteria: {
        time: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()],
        apiName: "",
        orderName: "",
        limit: Number(localStorage.getItem("totalPage") || 10),
        page: 1
      },
      //当前总页数
      total: 0,
      //表格数据
      tableData: [],
      //API选项
      apiOptions: [],
      //加载
      loading: false,
      //当前展开的行
      expandRow: [],
      //JSON模态框
      jsonDialogVisible: false,
      //当前JSON数据
      currentJSONData: "",
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    getRequestInfoAll().then(res => {
      if (res.status == 200) {
        this.apiOptions = res.data.rows;
        this.handleQuery(this.queryCriteria);
      } else {
        // this.$message.warning('API请求出错')
        this.apiOptions = [];
      }
    });
  },
  methods: {
    getRowClass: function(row, rowIndex) {
      if (row.Count == 1) {
        return "row-expand-cover";
      }
    },
    getRowKeys(row) {
      // console.log(row)
      return row.Id;
    },
    /**格式化时间 */
    crtTimeFtt(rowData) {
      return crtTimeFtt(rowData.RequestTime.substring(6, 19), true);
    },
    /**提交表单 */
    handleQuery(queryCriteria) {
      let obj = { ...queryCriteria };
      if(!!!obj.time||obj.time[0]==null){
        this.$message.warning('请选择时间')
        return false
      }
      // obj.startTime = new Date(obj.time[0])
      //   .toLocaleDateString()
      //   .replace(/\//g, "/");
      obj.startTime = new Date(obj.time[0]).getFullYear()+'-'+(new Date(obj.time[0]).getMonth()+1)+'-'+new Date(obj.time[0]).getDate()
      obj.endTime = new Date(obj.time[1]).getFullYear()+'-'+(new Date(obj.time[1]).getMonth()+1)+'-'+new Date(obj.time[1]).getDate()+" 23:59:59"
      // obj.endTime = new Date(obj.time[1].getTime() + 60 * 60 * 24 * 1000)
      //   .toLocaleDateString()
      //   .replace(/\//g, "/");
      delete obj["time"];
      this.loading = true
      getRequests(obj).then(res => {
        this.loading = false
        if (res.status == 200) {
          this.tableData = res.data.rows;
          this.total = res.data.total;
        }
      }).catch(err=>{
        this.loading = false
      })
    },
    /**选择生产单 */
    handleSelectOrder(selection, row) {
      /**判断是移除还是添加生产单 */
      if (selection.find(item => item.Id == row.Id)) {
        /**添加生产单 */
        this.tableData
          .filter(item => item.OrderName == row.OrderName && item.Id != row.Id)
          .map(el => {
            selection.push(el);
          });
      } else {
        /**移除生产单 */
        for (let i = 0; i < selection.length; i++) {
          if (selection[i].OrderName == row.OrderName) {
            selection.splice(i, 1);
            i--;
          }
        }
      }
      this.selection = selection;
    },
    /**行点击 */
    handleRowClick(rowData, column) {
      // console.log(rowData)
      //点击请求数据
      if (column.property == "RequestData" && rowData.RequestData != "") {
        this.currentJSONData =
          typeof rowData.RequestData == "string"
            ? JSON.parse(rowData.RequestData)
            : rowData.RequestData;
        this.jsonDialogVisible = true;
      } else if (
        column.property == "ResponseData" &&
        rowData.ResponseData != ""
      ) {
        this.currentJSONData =
          typeof rowData.ResponseData == "string"
            ? JSON.parse(rowData.ResponseData)
            : rowData.ResponseData;
        this.jsonDialogVisible = true;
      }
    },
    handleSelectAll(selection) {
      // console.log(selection.length)
      this.selection = selection;
    }
  }
};
</script>
<style lang="scss">
.shengelue {
  overflow: hidden;
  /*超出部分隐藏*/
  text-overflow: ellipsis;
  /* 超出部分显示省略号 */
  white-space: nowrap;
  /*规定段落中的文本不进行换行 */
  width: 100%;
  /*需要配合宽度来使用*/
}
tbody .RequestData:hover {
  cursor: pointer;
}
tbody .ResponseData {
  cursor: pointer;
}
</style>