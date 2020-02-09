<template>
  <div class="testPort">
    <!-- testPort 开发者工具 -->
    请选择请求方式:
    <el-select style="width:100px;" v-model="httpType" placeholder="请选择">
      <el-option
        v-for="item in httpTypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>请选择API:
    <el-select v-model="apivalue" @change="chageApi" placeholder="请选择">
      <el-option
        v-for="item in apiOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-select v-if="istask ==true" v-model="taskvalue" placeholder="请选择">
      <el-option
        v-for="item in taskOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-button type="primary" @click="handlehttp">执行</el-button>
    <!-- <el-button @click="handleTest">测试</el-button> -->
    <el-input
      class="textarea1"
      type="textarea"
      autosize
      :rows="3"
      :placeholder="placeholder"
      v-model="textarea1"
    ></el-input>
    <jsonEditor :value="textarea2" style="height:100px;"></jsonEditor>
    <!-- <el-input
  type="textarea"
  autosize
    :rows="3"
  placeholder="请输入内容"
  v-model="textarea2">
    </el-input>-->
    <!-- <el-dialog title="收货地址" :visible.sync="dialogTableVisible" >
      <Canvas1 :json="canvasJson"></Canvas1>
    </el-dialog>-->
  </div>
</template>
<script>
import { DHData, GDData, TDData } from "@/utils/testData";
import jsonEditor from "@/components/jsonEditor";
import { isJSON } from "@/utils";
import { DownNC, DownPLT, DownCr, DownExcel } from "api/admin/user/index1";
// import Canvas1 from '@/components/Canvas'
import axios from "axios";
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  selectObj,
  getPersonal,
  showProcess,
  getCategory
} from "api/admin/user/index";
import { importOrder, applyCadDB } from "api/admin/testPort/index";
export default {
  name: "user",
  components: {
    jsonEditor: jsonEditor
  },
  data() {
    return {
      canvasJson: [],
      dialogTableVisible: false,
      textarea1: "",
      textarea2: "",
      apivalue: "",
      httpType: "POST",
      istask: false,
      taskvalue: "cadStyle/Apply",
      apiOptions: [
        {
          value: "import/dh",
          label: "成衣订单导入"
        },
        {
          value: "import/gd",
          label: "个定订单导入"
        },
        {
          value: "import/td",
          label: "团定订单导入"
        },
        {
          value: "申请任务",
          label: "申请任务"
        },
        {
          value: "downloadNCFile",
          label: "下载NC文件"
        },
        {
          value: "downloadPLTFile",
          label: "下载PLT文件"
        },
        {
          value: "downloadFillData",
          label: "下载充绒数据"
        },
        //10.21关闭
        {
          value: "downloadExcel",
          label: "下载团订报表"
        }
      ],
      httpTypeOptions: [
        {
          value: "GET",
          label: "GET"
        },
        {
          value: "POST",
          label: "POST"
        }
      ],
      taskOptions: [
        {
          value: "cadStyle/Apply",
          label: "打版任务"
        },
        {
          value: "cadMark/Apply",
          label: "排料任务"
        }
      ],
      listQuery: {
        page: 1,
        limit: 15,
        name: undefined
      },
      placeholder: ""
    };
  },

  created() {},
  methods: {
    handlehttp() {
      if (
        this.apivalue == "import/td" ||
        this.apivalue == "import/gd" ||
        this.apivalue == "import/dh"
      ) {
        this.importTdOrder();
      } else if (this.apivalue == "申请任务") {
        this.applyCADTask();
      } else if (this.apivalue == "downloadNCFile") {
        this.downloadNCFile();
      } else if (this.apivalue == "downloadPLTFile") {
        this.downloadPLTFile();
      } else if (this.apivalue == "downloadFillData") {
        this.downloadFillFile();
      } else if (this.apivalue == "downloadExcel") {
        this.downloadExcel();
      } else {
        this.$message({
          message: "请选择API",
          type: "warning"
        });
      }
    },
    chageApi(e) {
      if (e == "申请任务") {
        this.istask = true;
      } else {
        this.placeholder = "";
        this.istask = false;
      }
      if (
        e == "downloadNCFile" ||
        e == "downloadPLTFile"
       
      ) {
        this.placeholder = `{
 "id":"订单编号",
 "type":"类型(td,dh,gd)",
 "bed":"床名"
}`;
      }
      if( e == "downloadFillData"||e == "downloadExcel"){
this.placeholder = `{
 "id":"订单编号",
 "type":"类型(td,dh,gd)"
}`;
      }
    },
    exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      this.fakeClick(save_link);
    },
    fakeClick(obj) {
      var ev = document.createEvent("MouseEvents");
      ev.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      obj.dispatchEvent(ev);
    },
    /**下载NC文件 */
    downloadNCFile() {
      if (!isJSON(this.textarea1)) {
        this.$message({
          message: "JSON文件格式错误",
          type: "warning"
        });
        return false;
      }
      var data = JSON.parse(this.textarea1);
      DownNC(data).then(res => {
        if (typeof res == "string") {
          this.exportRaw(data.bed + ".nc", res);
        } else {
          this.textarea2 = res;
        }
      });
    },
    /**下载PLT文件 */
    downloadPLTFile() {
      if (!isJSON(this.textarea1)) {
        this.$message({
          message: "JSON文件格式错误",
          type: "warning"
        });
        return false;
      }
      var data = JSON.parse(this.textarea1);
      DownPLT(data).then(res => {
        if (res.errcode && res.errcode !== 0) {
          //下载不到此文件
          this.textarea2 = res;
        } else {
          let blob = new Blob([res]); //将返回的数据包装成blob（方法的具体使用参考mdn）
          //创建a
          let alink = document.createElement("a");
          alink.download = data.bed + ".plt";
          alink.href = URL.createObjectURL(blob); //根据blob 创建 url
          alink.click(); //自动点击
          //能下载此文件
          // window.open('/export/plt?id='+data.id+'&type='+data.type+'&bedname='+data.bedname);
        }
      });

      // var data = JSON.parse(this.textarea1);
    },
    /**下载充绒文件 */
    downloadFillFile() {
      if (!isJSON(this.textarea1)) {
        this.$message({
          message: "JSON文件格式错误",
          type: "warning"
        });
        return false;
      }
      var data = JSON.parse(this.textarea1);
      DownCr(data).then(res => {
        if (res.errcode && res.errcode !== 0) {
          //下载不到此文件
          this.textarea2 = res;
        } else {
          this.dialogTableVisible = true;
          this.canvasJson = [...res.piece].splice(2, 3);
          let blob = new Blob([JSON.stringify(res)]);
          //创建a
          let alink = document.createElement("a");
          alink.download = "cr.json";
          alink.href = URL.createObjectURL(blob); //根据blob 创建 url
          alink.click(); //自动点击
          //能下载此文件
          // window.open('/export/cr?id='+data.id+'&type='+data.type+'&bedname='+data.bedname);
        }
      });
    },
    /**下载Excel文件 */
    downloadExcel() {
      if (!isJSON(this.textarea1)) {
        this.$message({
          message: "JSON文件格式错误",
          type: "warning"
        });
        return false;
      }
      var data = JSON.parse(this.textarea1);
      // =============================================
      // let tempForm = document.createElement('form')
      // tempForm.action = '/bmapi/export/mark?id='+data.id+'&type='+data.type
      // tempForm.method = 'get'
      // tempForm.style.display = 'none'
      // for (var x in data) {
      //     let opt = document.createElement('textarea')
      //     opt.name = x
      //     opt.value = data[x]
      //     tempForm.appendChild(opt)
      // }
      // document.body.appendChild(tempForm)
      // tempForm.submit()
      // return tempForm
      // ====================================================

      DownExcel(data).then(res => {
        if (res.errcode && res.errcode !== 0) {
          //下载不到此文件
          this.textarea2 = res;
        } else {
          let tempForm = document.createElement("form");
          tempForm.action =
            "/bmapi/export/excel?id=" + data.id + "&type=" + data.type;
          tempForm.method = "get";
          tempForm.style.display = "none";
          for (var x in data) {
            let opt = document.createElement("textarea");
            opt.name = x;
            opt.value = data[x];
            tempForm.appendChild(opt);
          }
          document.body.appendChild(tempForm);
          tempForm.submit();
          return tempForm;
          //能下载此文件
          // window.open('/export/mark?id='+data.id+'&type='+data.type);
        }
      });
    },
    //团队订单导入
    importTdOrder() {
      var type = this.httpType; //请求方式
      var url = this.apivalue;
      if (!isJSON(this.textarea1)) {
        this.$message({
          message: "JSON文件格式错误",
          type: "warning"
        });
        return false;
      }
      this.textarea2 = "正在请求...";
      var data = JSON.parse(this.textarea1);
      if (url == "import/td") {
        this.importOrderWay(type, url, data);
      } else if (url == "import/gd") {
        this.importOrderWay(type, url, data);
      } else if (url == "import/dh") {
        this.importOrderWay(type, url, data);
      } else {
        this.$message({
          message: "请选择对应的API!",
          type: "warning",
          duration: 2000
        });
        return false;
      }
    },
    importOrderWay(type, url, data) {
      importOrder(type, url, data)
        .then(res => {
          this.textarea2 = res;
        })
        .catch(err => {
          this.$message({
            message: err,
            type: "error",
            duration: 2000
          });
        });
    },
    //申请CAD任务
    applyCADTask() {
      var type = this.httpType; //请求方式
      var url = this.taskvalue;
      var data = JSON.parse(this.textarea1);
      applyCadDB(type, url, data)
        .then(res => {
          this.textarea2 = res;
          if (res.indexOf("OK")) {
            this.$message({
              message: "成功!",
              type: "success",
              duration: 2000
            });
          }
        })
        .catch(err => {
          this.$message({
            message: "请选择正确的API!",
            type: "error",
            duration: 2000
          });
        });
    },
    /**一键测试按钮 */
    handleTest() {
      //生成完整测试数据
      // let url = this.apivalue;
      // if (url == "import/td") {
      //   /**完整数据 */
      //   this.textarea1 = TDData(Math.floor(Math.random() * 1000000));
      // } else if (url == "import/gd") {
      //   /**完整数据 */
      //   this.textarea1 = GDData(Math.floor(Math.random() * 1000000));
      // } else if (url == "import/dh") {
      //   /**完整数据 */
      //   this.textarea1 = DHData(Math.floor(Math.random() * 1000000));
      // }

      // this.importTdOrder()

      let DHCheck = {
        id: "SCD123",
        name: "SCD123",
        style: "2018C287190",
        type: "西裤",
        // url: "mes.etsystem.cn/order/SCD123",
        quantity: 210,
        size_type: 1,
        size_name: {
          base: "M",
          name: ["S", "M", "L"]
        },
        size: [
          {
            name: "胸围",
            tolerance: 0.0,
            measures: [-1.0, 0.0, 1.0]
          }
        ],
        version: [
          {
            name: "黑色",
            downloadURL: "Model/123.prj",
            fabric: {
              name: "主面料",
              id: "ZM-173553",
              width: 156.0,
              details: "黑色牛仔",
              len_shrinkage: 0.0,
              width_shrinkage: 0.0,
              price: 30.0,
              amount: 0.0
            },
            quantity: [100, 120, 80]
          }
        ]
      };

      let jsonMes = JSON.parse(this.textarea1);
      let result = this.loopProperty(jsonMes, DHCheck, "根节点");
      if (result !== undefined) {
        alert(result);
      } else {
        alert("校验通过");
      }

      //生成不完整测试数据
    },

    loopProperty(jsonMes, DHCheck, root) {
      for (const item in DHCheck) {
        /**判断有无该属性 */
        if (jsonMes.hasOwnProperty(item)) {
          /**保存当前属性value */
          const element = jsonMes[item];
          /**判断是数组或者对象 */
          if (typeof element == "object") {
            /**判断为数组 */
            if (element.length != undefined) {
              /**循环数组 */
              for (let i = 0; i < element.length; i++) {
                /**判断是不是对象数组 */
                if (typeof element[i] != "object") {
                  /**不是对象的话,则不判断 */
                } else {
                  // console.log(element[i])
                  let result = this.loopProperty(
                    element[i],
                    DHCheck[item][0],
                    item + "[" + i + "]"
                  );
                  if (result != undefined) {
                    return result;
                  }
                }
              }
            } else {
              /**如果是对象 */
              let result = this.loopProperty(element, DHCheck[item], item);
              if (result != undefined) {
                return result;
              }
            }
          }
        } else {
          return root + "下缺失" + item;
        }
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.testPort {
  padding: 20px;
}
.textarea1 {
  margin-bottom: 50px;
  margin-top: 50px;
}
.testPort /deep/ .el-textarea__inner {
  height: 300px !important;
}
</style>
