<template>
  <div style="min-width:1300px;" class="app-container calendar-list-container">
    <!-- 生产单管理 orderManage -->
    <div class="header">
      <el-button class="filter-item" type="primary" v-waves icon="import" @click="handleFilter">导入</el-button>
      <el-upload v-if="showImpOrder" class="editor-slide-upload" ref="upload" action="/bmapi/simulateImport/uploadXml"
        :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-change="handleChange"
        :file-list="fileList" :multiple="true" :headers="header" :auto-upload="false">
        <el-button slot="trigger" type="primary">选择文件</el-button>
        <el-button style="margin-left: 10px;height:36px;" type="success" @click="submitUpload">模拟导入</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传XML文件，且不超过500kb</div> -->
      </el-upload>
    </div>
    <div class="filter-container">
    </div>
    <el-table v-if="!showImpOrder" :key='tableKey' ref="multipleTable" :data="list" v-loading.body="listLoading" border
      fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55px"></el-table-column>
      <!-- <el-table-column prop="BindId" align="center" width="80px" label="绑定号" :formatter="isBind"></el-table-column> -->
      <el-table-column align="center" highlight-current-row=true label="订单ID">
        <template scope="scope">
          {{ scope.row.PRIMARYID }}
        </template>
      </el-table-column>
      <el-table-column prop="PLAN_ID" align="center" label="订单名"> </el-table-column>
      <el-table-column prop="SERIAL" align="center" label="ERP序号">
        <template scope="scope">
          {{scope.row.SERIAL}}
        </template>
      </el-table-column>
      <el-table-column prop="YB_NO" align="center" label="样板号"> </el-table-column>
      <el-table-column align="center" prop="LT" width="113px" label="服装品类">
        <template scope="scope">
          {{scope.row.LT}}
        </template>
      </el-table-column>
      <el-table-column prop="CUSTNAME" width="100px" align="center" label="客户名">
        <template scope="scope">
          <!-- <a style="text-decoration:underline; 	color:#20a0ff">
                                    <router-link :to="{name:'生产单详情',query:{id:scope.row.Id,mode:'material'}}"> {{ scope.row.mCode }}</router-link>
                                           </a> -->
          <!-- <a style="text-decoration:underline; 	color:#20a0ff" @click="routerLink('生产单详情','material',scope.row)"> -->
          {{ scope.row.CUSTNAME }}
          <!-- </a> -->
        </template>
      </el-table-column>
      <el-table-column prop="SEX_NO" width="70px" align="center" label="性别">
        <template scope="scope">
          <!-- <a style="text-decoration:underline; 	color:#20a0ff">
                                            <router-link :to="{name:'生产单详情',query:{id:scope.row.Id,mode:'Yield',type:scope.row.type,status:scope.row.State,modelid:scope.row.OrderId}}"> {{ scope.row.Yield }}</router-link>
                                          </a> -->
          <!-- <a style="text-decoration:underline; 	color:#20a0ff" @click="routerLink('生产单详情','Yield',scope.row)"> -->
          {{ scope.row.SEX_NO }}
          <!-- </a> -->
        </template>
      </el-table-column>
      <el-table-column prop="QTY" width="80px" align="center" label="件数">
        <template scope="scope">
          <!-- <a style="text-decoration:underline; 	color:#20a0ff" @click="routerLink('生产单详情','pod',scope.row)"> -->
          {{ scope.row.QTY }}
          <!-- </a> -->
        </template>
      </el-table-column>
      <el-table-column prop="PEOPLE_QTY" width="70px" align="center" label="人数">
        <template scope="scope">
          {{ scope.row.PEOPLE_QTY }}
        </template>
      </el-table-column>
      <el-table-column prop="SCHEME_TYPE" align="center" label="订单性质"> </el-table-column>
      <!-- <el-table-column prop="Time" align="center"  width="115px" label="创建时间" :formatter="ChangeDateFormat"> </el-table-column> -->
      <el-table-column prop="FACTORY_DELIVERY_DATE" align="center" label="交货时间">
        <template scope="scope">
          {{scope.row.FACTORY_DELIVERY_DATE | TimeChange}}
        </template>
      </el-table-column>
    </el-table>
    <!-- 模拟订单数据格式 -->
    <el-table v-if="showImpOrder" :key='tableKey' ref="multipleTable" :data="list" v-loading.body="listLoading" border
      fit highlight-current-row style="width: 100%" @selection-change="handleSelectionChange1">
      <el-table-column type="selection" width="55px"></el-table-column>
      <!-- <el-table-column prop="BindId" align="center" width="80px" label="绑定号" :formatter="isBind"></el-table-column> -->
      <el-table-column align="center" highlight-current-row=true label="订单ID">
        <template scope="scope">
          {{ scope.row.orderID }}
        </template>
      </el-table-column>
      <el-table-column prop="orderName" align="center" label="订单名"> </el-table-column>
      <el-table-column prop="subName" align="center" label="ERP序号">
        <template scope="scope">
          {{scope.row.subName}}
        </template>
      </el-table-column>
      <el-table-column prop="modelName" align="center" label="样板号"> </el-table-column>
      <el-table-column align="center" prop="LT" width="113px" label="服装品类">
        <template scope="scope">
          <!-- {{scope.row.LT}} -->
          服装
        </template>
      </el-table-column>
      <el-table-column prop="customerName" width="100px" align="center" label="客户名">
        <template scope="scope">
          {{ scope.row.customerName == null ?"保密":scope.row.customerName }}
        </template>
      </el-table-column>
      <el-table-column prop="SEX_NO" width="70px" align="center" label="性别">
        <template scope="scope">
          男
        </template>
      </el-table-column>
      <el-table-column prop="QTY" width="80px" align="center" label="件数">
        <template scope="scope">
          <!-- <a style="text-decoration:underline; 	color:#20a0ff" @click="routerLink('生产单详情','pod',scope.row)"> -->
          <!-- {{ scope.row.QTY }} -->
          未知
          <!-- </a> -->
        </template>
      </el-table-column>
      <el-table-column prop="number" width="70px" align="center" label="人数">
        <template scope="scope">
          {{ scope.row.number }}
        </template>
      </el-table-column>
      <el-table-column prop="SCHEME_TYPE" align="center" label="订单性质">
        <template scope="scope">
          {{ scope.row.schemetype == null ?"订单性质描述":scope.row.schemetype }}
        </template>
      </el-table-column>
      <!-- <el-table-column prop="Time" align="center"  width="115px" label="创建时间" :formatter="ChangeDateFormat"> </el-table-column> -->
      <el-table-column prop="FACTORY_DELIVERY_DATE" align="center" label="交货时间">
        <template scope="scope">
          {{scope.row.timeStamp | changeTime }}
        </template>
      </el-table-column>
    </el-table>
    <!-- 模拟订单数据格式 -->
    <Pagination :listQuery="listQuery" @PageChange="handleSelect" :total="total"></Pagination>
  </div>
</template>

<script>
import {
  page,
  importErp,
  UpLoadXml,
  pageSim,
  importSimErp
} from "api/admin/orderManage";
import { getOrderWay } from "api/admin/synthesize/index";
import Pagination from "@/components/Pagination";

import { getToken, getRole } from "utils/auth";
import { mapGetters } from "vuex";
export default {
  name: "user",
  components: {
    Pagination: Pagination
  },
  data() {
    return {
      defaultShow: false,
      form: {
        Type: null,
        Brand: null,
        Time: "/Date(1530236079340)/",
        Bed: undefined,
        cusName: undefined,
        Id: null,
        ModelName: undefined,
        OrderId: null,
        State: 1,
        sTime: undefined,
        eTime: undefined,
        IsBind: 1,
        bingNum: -1,
        page: 1,
        limit: 10,
        Yield: 0
      },
      isloading: -1,
      indexColor: 1,
      colorIndex: 0,
      list: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      formErp: "",
      formLabelWidth: "80px",
      tableKey: 0,
      rolePower: getRole(),
      flag: 0,
      fileList: [],
      showImpOrder: true,
      imporOrder: [],
      way: "",
      header: {
        Authorization: "Bearer " + getToken()
      }
    };
  },
  created() {
    // this.getList(this.listQuery);
    // this.getMisOrder();
    this.getOrderway();
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    selectColor(row, index) {
      // console.log(row);
      // console.log(this.form)
      if (this.form.bingNum == -1) {
        return "";
      }
      if (row.BindId == 0) {
        return "";
      }
      if (row.BindId) {
        if (row.colorIndex % 2 == 0) {
          return "success-row";
        } else {
          return "warning-row1";
        }
      } else {
        return "";
      }
    },
    changeShow() {
      this.flag = 1;
    },
    // 数据格式转化
    isBind(list) {
      if (list.BindId == 0) {
        return "未绑定";
      } else {
        return list.BindId;
      }
    },
    handleSelectionChange(row) {
      // console.log(row)
      this.formErp = row;
    },
    handleSelectionChange1(row) {
      // console.log(row)
      this.imporOrder = [];
      row.forEach(element => {
        this.imporOrder.push(element.orderName);
      });
      // console.log(this.imporOrder)
    },
    handleSelect(obj) {
      this.listQuery = {
        ...this.listQuery,
        ...obj
      };
      if ((this.way = "y")) {
        this.getList(); // //获取常规导入数据
      } else {
        this.getImpOrder();
      }
    },
    getOrderway() {
      getOrderWay().then(res => {
        // console.log(res)
        if (res.status == 200) {
          if (res.way == "y") {
            this.way = "y";
            this.showImpOrder = false;
            this.getList(); // //获取常规导入数据
          } else {
            this.way = "n";
            //获取模拟导入数据
            this.showImpOrder = true;
            this.getImpOrder();
          }
        }
      });
    },
    getImpOrder() {
      pageSim(this.listQuery).then(res => {
        this.list = [];
        // console.log(res)
        if (res.status == 200) {
          //成功加载
          this.listLoading = false;
          // this.list = res.rows.order.data.data;
          // this.total = res.order.data.totalRow;
          res.data.rows.forEach(element => {
            // console.log(element.order)
            this.list.push(element.order);
          });
        } else {
          //失败提示
          this.list = null;
          this.total = null;
          this.$message({
            message: res.tip,
            type: "warning",
            duration: 2000,
            offset: 700
          });
          this.listLoading = false;
        }
      });
    },
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        // console.log(response)
        if (response.status == 200) {
          //成功加载
          this.listLoading = false;
          this.list = response.order.data.data;
          this.total = response.order.data.totalRow;
          //成功提示
          //  this.$message({
          //   message: response.error,
          //   type: "warning",
          //   duration: 2000
          // });
          //在每个list中加判断
          // this.list.forEach((element, index) => {
          //   if (index == 0) {
          //     element.colorIndex = this.colorIndex;
          //   } else {
          //     if (this.list[index].BindId == this.list[index - 1].BindId) {
          //       element.colorIndex = this.colorIndex;
          //     } else {
          //       this.colorIndex++;
          //       element.colorIndex = this.colorIndex;
          //     }
          //   }
          // });
        } else {
          //失败提示
          this.list = null;
          this.total = null;
          this.$message({
            message: response.tip,
            type: "warning",
            duration: 2000,
            offset: 700
          });
          this.listLoading = false;
        }
      });
    },
    //导入
    handleFilter() {
      if (this.showImpOrder == true) {
        // 模拟输入导入方法
        this.upImportOrder(); // 模拟输入导入方法
      } else {
        // 常规导入方法
        var formErp = {};
        formErp.objs = this.formErp;
        // console.log(this.formErp)
        if (formErp.objs == "") {
          this.$message({
            message: "请先选择订单。",
            type: "warning",
            duration: "2000"
          });
          return false;
        }
        importErp(this.formErp).then(res => {
          if (res.status == 200) {
            this.formErp = "";
            this.$message({
              message: res.tip,
              type: "success",
              duration: 2000,
              offset: 700
            });
            this.getList();
          } else {
            this.$message({
              message: res.tip,
              type: "error",
              duration: 2000,
              offset: 700
            });
          }
          // console.log(res)
        });
      }
      // this.getList(this.form)
    },
    upImportOrder() {
      // console.log(this.imporOrder)
      if (this.imporOrder == "") {
        this.$message({
          message: "请先选择订单。",
          type: "warning",
          duration: "2000"
        });
        return false;
      }
      importSimErp(this.imporOrder).then(res => {
        if (res.status == 200) {
          this.imporOrder = "";
          this.$message({
            message: res.tip,
            type: "success",
            duration: "2000"
          });
          this.getImpOrder();
        } else {
          this.$message({
            message: res.tip,
            type: "error",
            duration: "2000"
          });
        }
        // console.log(res)
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handleSuccess(res) {
      // console.log(res)
      if (res.status == 200) {
        this.$message({
          message: "导入成功",
          type: "success",
          duration: "2000"
        });
        this.getImpOrder();
        this.fileList = [];
        // this.clearFiles();
      } else {
        this.$message({
          message: "导入失败",
          type: "error",
          duration: "2000"
        });
        this.fileList = [];
      }
    },
    handleChange(file) {
      // console.log(file)
      if (
        file.raw.type.indexOf("xml") > -1 ||
        file.raw.type.indexOf("model") > -1
      ) {
      } else {
        this.$message.error("只能选择XML类型文件！");
        this.fileList = [];
        return false;
      }
    },
    handlePreview(file) {
      // console.log(file);
    },
    resetTemp() {
      this.form = {
        UserName: undefined,
        Phone: undefined,
        State: "",
        Up: undefined,
        Down: undefined,
        MAC: undefined,
        Remark: undefined,
        Yield: 0
      };
    },
    // 路由跳转函数
    routerLink(name, detailinfo, obj) {
      obj.mode = detailinfo;
      this.$router.push({
        // path: 'yourPath',
        name: name,
        // params: {
        //     name: 'name',
        //     dataObj: this.msg
        // }
        query: {
          id: obj.Id,
          mode: detailinfo,
          type: obj.type,
          status: obj.State,
          modelid: obj.OrderId,
          OrderInfo: JSON.stringify(obj)
        }
      });
      localStorage.setItem("OrderInfo", JSON.stringify(obj));
    }
  },
  filters: {
    changeTime(time) {
      // console.log(time);
      var num = /[0-9]+/.exec(time);
      var num1 = parseInt(num[0], 10);
      var star = new Date(time);
      // console.log(star)
      var date = new Date(star.setTime(star.getTime() + 3600 * 1000 * 24 * 60));
      // console.log(date)
      // var date = new Date(parseInt(num1, 10));
      var years = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var currentDate =
        date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return (
        years + "-" + month + "-" + currentDate + "-" + hour + ":" + minutes
      );
    },
    TimeChange(row) {
      //    console.log(row);
      var firstTime = row.toString().substring(0, 10);
      var lastTime = row.toString().substring(10, row.length);

      var time = firstTime + " " + lastTime;
      return time;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-table .success-row {
  background: oldlace;
  /* border-top: 2px solid #aaa; */
}

.el-table .warning-row1 {
  background: #ebf9eb;
  /* border-top: 2px solid #aaa; */
}

.message-box {
  /* display: flex; */
  width: 50%;
  margin: 0 auto;
  /* justify-content: space-between; */
  /* align-items: center; */
}

.table-message {
  display: flex;
  flex-direction: column;
}

.table-message b {
  margin: 10px;
}

.table-message b span {
  font-weight: 500;
}

.table-img {
  width: 100px;
  height: 100px;
  /* border:1px solid red */
}

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

  .editor-slide-upload {
    display: flex;
    align-content: center; // margin-bottom: 30px; // display: inline-block;
    width: 100%; // margin-right: 20px;
  }

  .editor-slide-upload /deep/ .el-upload-list {
    display: flex;
    align-items: start;
    display: -ms-inline-flexbox;
    border: 0px solid #e0e0e0; //  padding: 0 5px;
    margin-left: 5px; //  margin: 5px 0px;
    background: #eef1f6;
    overflow-x: auto;
    max-width: 87%; // height: 52px;

    .el-upload-list__item-name {
      color: #606266;
      display: block;
      margin-right: 40px;
      margin-left: 5px; // overflow: hidden;
      padding-left: 4px;
      margin-top: 0px;
      text-overflow: ellipsis;
      -webkit-transition: color 0.3s;
      transition: color 0.3s;
      /* white-space: nowrap; */
      /* display: inline-block; */
      border: 1px solid #20a0ff;
      border-radius: 5px;
      /* margin: 5px 10px; */
      /* text-align: center; */
      padding: 0 5px;
      /* padding-right: 10px; */
    }

    a {
      display: inline-block;
      border: 1px solid #20a0ff;
      background-color: rgba(32, 160, 255, 0.1);
      border-color: rgba(32, 160, 255, 0.2);
      border-radius: 5px;
      margin: 5px 10px;
      text-align: center;
      padding: 5px 0;
      padding-right: 10px;
    }
  }
}

.editor-slide-upload /deep/ .el-upload-list__item:first-child {
  margin-top: 6px;
}

.filter-item {
  margin-right: 15px;
  height: 36px;
}
</style>
