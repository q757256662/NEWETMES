<template>
  <!-- synthesize 系统维护-->
  <div style="padding:50px;">
    <!-- <el-row type="flex" justify="space-around"  > -->
    <!-- <el-col > -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;font-weight:600;">设置</span>
        <!-- <el-button style="float: right;" type="primary">操作按钮</el-button> -->
      </div>
      <div style="width:400px;margin:0 auto;text-align:center;">
        <div class="left">
          <!-- <el-button type="primary" @click="dialogCleanVisible =true">清理旧数据</el-button> -->
          <!-- <el-button class="button" type="primary" @click="dialogEditPasswordVisible =true">设定FTP密码</el-button> -->
          <!-- <el-button class="button" type="primary" @click="handleEditUrl">设定数据接口地址</el-button> -->
        </div>
        <div class="right">
          <p>
            启动调试：
            <el-switch
              :width="70"
              style="margin-left:1rem"
              on-text="调试"
              off-text="不调试"
              v-model="form.bug"
              on-value="y"
              off-value="n"
              @change="showLog"
            ></el-switch>
          </p>

          <p>
            款式按照流水线隔离：
            <el-switch
              :width="70"
              on-text="隔离"
              off-text="不隔离"
              v-model="InsulateStyle"
              @change="handleQuarantine"
              on-value="y"
              off-value="n"
            ></el-switch>
          </p>

          <p>
            生产单直接导入流程：
            <el-switch
              on-text="是"
              off-text="否"
              v-model="DirectImport"
              @change="handleDirectImport"
              on-value="y"
              off-value="n"
            ></el-switch>
          </p>
          <p>
            将NC文件复制到BuyiCut目录下：
            <el-switch
              :width="70"
              style="margin-left:1rem"
              on-text="复制"
              off-text="不复制"
              v-model="copyNCFile"
              on-value="y"
              off-value="n"
              @change="handleCopyNCFile"
            ></el-switch>
          </p>
          <p>
            忽略物料进入生产流程:
            <el-switch
              :width="70"
              style="margin-left:1rem"
              on-text="允许"
              off-text="不允许"
              v-model="IsNoFabricEnter"
              on-value="y"
              off-value="n"
              @change="handleIgnoreFabric"
            ></el-switch>
          </p>
          <p>
            成衣忽略样式:
            <el-switch
              :width="70"
              style="margin-left:1rem"
              on-text="允许"
              off-text="不允许"
              v-model="IsNoStyleEnter"
              on-value="y"
              off-value="n"
              @change="handleIgnoreStyleEnter"
            ></el-switch>
          </p>
          <!-- <p>
            简化流程:
            <el-switch
              :width="70"
              style="margin-left:1rem"
              on-text="是"
              off-text="否"
              v-model="IsProcessSimplification"
              on-value="y"
              off-value="n"
              @change="handleIgnoreProcessSimplification"
            ></el-switch>
          </p> -->
          <span>
            <el-button class="button" type="primary" @click="downlog">下载日志文件</el-button>
          </span>
        </div>
      </div>
    </el-card>
    <!-- </el-col> -->
    <!-- <el-col> -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;font-weight:600">设定FTP密码</span>
      </div>
      <div style="width:400px;margin:0 auto;text-align:center">
        <!-- <h2 style="margin-top:0;">设定FTP密码</h2> -->
        <el-form :model="form" ref="form" label-position="left">
          <el-form-item label="账号：" :label-width="formLabelWidth" prop="user">
            <el-input style="width:220px" v-model="form.username" disabled auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码：" :label-width="formLabelWidth" prop="odlPassword">
            <el-input
              style="width:220px"
              v-model="form.newpassword"
              auto-complete="off"
              :disabled="FTPPasswordBTN"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="新密码：" :label-width="formLabelWidth" prop="newPassword">
                    <el-input style="width:220px" v-model="form.newtestPortPassword" auto-complete="off"></el-input>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer" style="width:300px;margin:0 auto;">
          <el-button
            type="warning"
            @click="()=>{this.FTPPasswordBTN = false;this.orginFPTpassword = {...this.form}}"
            :disabled="!FTPPasswordBTN"
          >修 改</el-button>
          <el-button
            @click="handleCancelPutPassword "
            :disabled="FTPPasswordBTN"
          >取 消</el-button>
          <el-button type="primary" @click="sureEditPassword()" :disabled="FTPPasswordBTN">确 定</el-button>
        </div>
      </div>
    </el-card>

    <!-- </el-col> -->

    <!-- <el-col  > -->
    <el-card class="box-card" style="min-width:400px;">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;font-weight:600">数据接口地址</span>
      </div>
      <div style="margin:0 auto;width:500px;text-align:center">
        <!-- <h2 style="margin-top:0">数据接口地址</h2> -->
        <el-form :model="formUrl" label-width="10px" label-position="left">
          <el-form-item label="个订地址1：" label-width="90px" prop="url">
            <el-input
              style="width:350px"
              auto-complete="off"
              v-model="formUrl.GDUrl"
              :disabled="AddressBTN"
            ></el-input>
          </el-form-item>
          <el-form-item label="个订地址2：" label-width="90px" prop="url">
            <el-input
              style="width:350px"
              auto-complete="off"
              v-model="formUrl.GDUrl2"
              :disabled="AddressBTN"
            ></el-input>
          </el-form-item>
          <el-form-item label="团订地址1：" label-width="90px" prop="url">
            <el-input
              style="width:350px"
              auto-complete="off"
              v-model="formUrl.TDUrl"
              :disabled="AddressBTN"
            ></el-input>
          </el-form-item>
          <el-form-item label="团订地址2：" label-width="90px" prop="url">
            <el-input
              style="width:350px"
              auto-complete="off"
              v-model="formUrl.TDUrl2"
              :disabled="AddressBTN"
            ></el-input>
          </el-form-item>
          <el-form-item label="成衣地址1：" label-width="90px" prop="url">
            <el-input
              style="width:350px"
              auto-complete="off"
              v-model="formUrl.CDUrl"
              :disabled="AddressBTN"
            ></el-input>
          </el-form-item>
          <el-form-item label="成衣地址2：" label-width="90px" prop="url">
            <el-input
              style="width:350px"
              auto-complete="off"
              v-model="formUrl.CDUrl2"
              :disabled="AddressBTN"
            ></el-input>
          </el-form-item>

          <!-- <el-form-item label="新密码：" :label-width="formLabelWidth" prop="newPassword">
                                        <el-input style="width:220px" v-model="form.newPassword" auto-complete="off"></el-input>
          </el-form-item>-->
        </el-form>
        <div slot="footer" style="width:250px;margin:0 auto;">
          <el-button
            type="warning"
            @click="()=>{this.AddressBTN = false;orginFormUrl={...formUrl}}"
            :disabled="!AddressBTN"
          >修 改</el-button>
          <el-button @click="handleCancelEdit" :disabled="AddressBTN">取 消</el-button>
          <el-button type="primary" @click="sureEditUrl()" :disabled="AddressBTN">确 定</el-button>
        </div>
      </div>
    </el-card>

    <!-- </el-col> -->
    <!-- </el-row> -->
    <!-- <el-row class="head-btn"> -->

    <!-- <el-button type="primary" @click="Upnumber">上传二次编号</el-button> -->
    <!-- <el-upload
                class="upload-demo"
                ref="upload"
                action="http://cywin10:80/bmapi/testFilesup" 
                :on-preview="handlePreview"
                :data="updata"
                :on-remove="handleRemove"
                :on-success="successUpload"
                :before-upload="beforeAvatarUpload"
                :file-list="fileList"
                multiple
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
                
    </el-upload>-->
    <!-- <form id="myform">
                <input type="file" multiple name="fileup" id="fileup" v-on:change="fileChange($event)" />
    </form>-->
    <!-- <el-button type="primary" @click="Uploadver">下载ver</el-button> -->
    <!-- <input type="file" @change="uploads($event)" id="files" style="display: none;" multiple/> -->
    <!-- </el-row> -->
    <!-- dialogCleanVisible 清理旧数据 -->
    <el-dialog v-dialogDrag title="提示" :visible.sync="dialogCleanVisible" width="30%">
      <span>确认清理旧数据吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCleanVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- dialogCleanVisible 清理旧数据 -->
  </div>
</template>
<script>
import {
  page1,
  page2,
  addObj,
  getObj,
  delObj,
  putObj,
  putLog,
  DownLog,
  Upload,
  Downver,
  setUrl,
  getSetUrl,
  getOrderWay,
  editOrderWay,
  insulateStyle,
  getinstyle,
  IsDirectImport,
  getismovenc,
  updateismovenc,
  getIsNoFabricEnter,
  updateIsNoFabricEnter,
  getIsNoStyleEnter,
  updateIsNoStyleEnter,
  getIsProcessSimplification,
  updateIsProcessSimplification
} from "api/admin/synthesize/index";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialogCleanVisible: false,
      dialogEditPasswordVisible: false,
      dialogEditUrlVisible: false,
      formLabelWidth: "80px",
      newUrl: "",
      orginFormUrl: {},
      copyNCFile: "",
      orginFPTpassword:{},
      formUrl: {
        //   url: '',
        TDUrl: "",
        GDUrl: "",
        CDUrl: "",
        TDUrl2: "",
        GDUrl2: "",
        CDUrl2: ""
      },
      /**禁止FTP密码修改 */
      FTPPasswordBTN: true,
      AddressBTN: true,
      form: {
        username: "",
        newpassword: "",
        bug: ""
      },
      fileList: [],
      checked: true,
      checked1: false,
      updata: {},
      InsulateStyle: "",
      /**生产单导入流程 */
      DirectImport: "",
      /**忽略物料 */
      IsNoFabricEnter: "",
      /**成衣忽略样式 */
      IsNoStyleEnter: "",
      /**简化流程 */
      IsProcessSimplification:""
    };
  },
  created() {
    this.getFtp();
    this.getOrderway();
    this.handleGetinstyle();
    this.getsetUrl();
    this.handleDirectImport();
    this.handleGetNCFlie();
    this.handleGetNoFabricEnter();
    this.handleGetNoStyleEnter();
    // this.handleGetIsProcessSimplification()
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    /**取消更改密码 */
    handleCancelPutPassword(){
      this.form = {...this.orginFPTpassword}
      this.dialogEditPasswordVisible = false
      this.FTPPasswordBTN=true
    },
    handleCancelEdit() {
      this.formUrl = { ...this.orginFormUrl };
      this.dialogEditUrlVisible = false;
      this.AddressBTN = true;
    },
    /**生产单直接导入流程 */
    handleDirectImport(val) {
      if (!val) {
        IsDirectImport().then(res => {
          if (res.Success) {
            this.DirectImport = res.IsDirectImport;
          } else {
            this.DirectImport = "n";
          }
        });
      } else {
        IsDirectImport({
          val
        }).then(res => {
          if (res.Success) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.DirectImport = val;
          } else {
            this.DirectImport = "n";
          }
        });
      }
    },
    /**获取是否流水线隔离 */
    handleGetinstyle() {
      getinstyle().then(res => {
        if (res.Success) {
          this.InsulateStyle = res.Data.Rows;
        } else {
          this.InsulateStyle = "n";
        }
      });
    },
    handleQuarantine() {
      insulateStyle({
        InsulateStyle: this.InsulateStyle
      }).then(res => {
        if (res.Success) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
        } else {
          this.$message({
            message: res.tip,
            type: "warning"
          });
        }
      });
    },
    sure() {},
    /**获取NC文件目录 */
    handleGetNCFlie() {
      getismovenc().then(res => {
        if (res.Success) {
          this.copyNCFile = res.Data.Rows;
        } else {
          this.$message.warning(res.ErrMes);
        }
      });
    },
    /**修改NC文件 */
    handleCopyNCFile(row) {
      updateismovenc({ ismovenc: row }).then(res => {
        if (res.Success) {
          this.$message.success("修改成功");
        } else {
          this.$message.warning(res.ErrMes);
        }
      });
    },
    /**查看是否忽略物料 */
    handleGetNoFabricEnter() {
      getIsNoFabricEnter().then(res => {
        if (res.Success) {
          this.IsNoFabricEnter = res.Data.Rows;
        } else {
          this.$message.warning(res.ErrMes);
        }
      });
    },
    /**修改忽略物料 */
    handleIgnoreFabric(row) {
      updateIsNoFabricEnter({ IsNoFabricEnter: row }).then(res => {
        if (res.Success) {
          this.$message.success("修改成功");
        } else {
          this.$message.warning(res.ErrMes);
        }
      });
    },
    /**查看成衣忽略样式 */
    handleGetNoStyleEnter() {
      getIsNoStyleEnter().then(res => {
        if (res.Success) {
          this.IsNoStyleEnter = res.Data.Rows;
        } else {
          this.$message.warning(res.ErrMes);
        }
      });
    },
    /**修改成衣忽略物料 */
    handleIgnoreStyleEnter(row) {
      updateIsNoStyleEnter({ IsNoStyleEnter: row }).then(res => {
        if (res.Success) {
          this.$message.success("修改成功");
        } else {
          this.$message.warning(res.ErrMes);
        }
      });
    },
    // /**查看简化流程 */
    // handleGetIsProcessSimplification() {
    //   getIsProcessSimplification().then(res => {
    //     if (res.Success) {
    //       this.IsProcessSimplification = res.Data.Rows;
    //     } else {
    //       this.$message.warning(res.ErrMes);
    //     }
    //   });
    // },
    // /**修改简化流程 */
    // handleIgnoreProcessSimplification(row) {
    //   updateIsProcessSimplification({ IsProcessSimplification: row }).then(res => {
    //     if (res.Success) {
    //       this.$message.success("修改成功");
    //     } else {
    //       this.$message.warning(res.ErrMes);
    //     }
    //   });
    // },
    Upnumber() {},
    changeOrder(e) {
      var impWay = {};
      if (this.checked == true) {
        impWay.way = "y";
      } else {
        impWay.way = "n";
      }
      // console.log(impWay.way)
      editOrderWay(impWay).then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 2000
          });
          this.getOrderway();
        }
      });
    },
    getsetUrl() {
      getSetUrl().then(res => {
        // console.log(res)
        if (res.status == 200) {
          // this.formUrl.url = res.url
          // console.log(res);
          res.data.rows.map(el => {
            this.formUrl[el.key_name] = el.key_val;
          });
        } else {
          this.$message({
            message: res.tip,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    getOrderway() {
      getOrderWay().then(res => {
        // console.log(res)
        if (res.status == 200) {
          if (res.way == "y") {
            this.checked = true;
          } else {
            this.checked = false;
          }
        } else {
          this.$message({
            message: res.tip,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    handleEditUrl() {
      this.dialogEditUrlVisible = true;
      this.getsetUrl();
    },
    sureEditUrl() {
      // var reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
      // var reg = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/;
      // if (
      //   !reg.test(
      //     this.formUrl.TDUrl ||
      //       !reg.test(this.formUrl.GDUrl) ||
      //       !reg.test(this.formUrl.CYUrl)
      //   )
      // ) {
      //   this.$message({
      //     message: "网址有误，请注意检查一下！",
      //     type: "warning",
      //     duration: 2000
      //   });
      // } else {
      setUrl(this.formUrl).then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 2000
          });
          this.AddressBTN = true;
          this.dialogEditUrlVisible = false;
        } else {
          this.$message({
            message: res.tip,
            type: "error",
            duration: 2000
          });
          this.dialogEditUrlVisible = false;
        }
      });
      // }
    },
    Uploadver() {
      Downver().then(res => {
        if (res.status == 201) {
          this.$message({
            message: res.tip,
            type: "error",
            durantion: 2000,
            offset: 700
          });
        } else {
          window.location.href = "http://cywin10:8088/etwebapi/verdown";
        }
      });
    },
    // fileChange(e){
    //     console.log(e)
    //      Upload().then(res =>{
    //      })
    // },
    fileChange: function(el) {
      // if (!el.target.files[0].size) return;
      // console.log(el)
      var obj = new FormData(document.getElementById("myform"));
      // obj.append("name", "wzh");
      // console.log(obj)
      var _this = this;
      $.ajax({
        type: "post",
        url: "/bmapi/testFilesup",
        data: obj,
        cache: false,
        processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
        contentType: false, // 不设置Content-type请求头
        success: function(res) {}
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 移除文件函数
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    // 点击预览
    handlePreview(file) {
      // console.log(file);
    },
    // 上传成功函数
    successUpload(response, file) {
      // console.log(response)
      this.getList();
      // console.log(file)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === imageArry.indexOf() ;
    },
    downlog() {
      DownLog().then(res => {
        if (res.status == 201) {
          this.$message({
            message: "文件不存在",
            type: "error",
            offset: 700
          });
        } else {
          window.location.href = "/bmapi/downdebug";
        }
      });
    },
    getFtp() {
      page1().then(response => {
        this.form.username = response.data.ftp.username;
        this.form.newpassword = response.data.ftp.newpassword;
      });
      page2().then(res => {
        this.form.bug = res.data.ftp.bug;
      });
    },
    sureEditPassword() {
      // console.log(this.form);
      // if(/^[0-9a-zA-Z]+$/.test(this.form.newpassword)){
        putObj(this.form).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.$message({
            offset: 700,
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000,
            offset: 700
          });
          this.dialogEditPasswordVisible = false;
          this.FTPPasswordBTN = true;
        } else {
          //失败提示
          this.$message({
            offset: 700,
            message: response.error,
            type: "warning",
            duration: 2000,
            offset: 700
          });
          this.dialogEditPasswordVisible = false;
        }
      });
      // }else{
      //   this.$message.warning('只能用数字或者英文作为密码')
      // }
      
    },
    //是否记录日志
    showLog() {
      // console.log(this.bug);
      putLog(this.form).then(res => {
        if (res.status === 200) {
          this.$message({
            offset: 700,
            title: "成功",
            message: "修改成功",
            type: "success",
            duration: 2000,
            offset: 700
          });
        } else {
          //失败提示
          this.$message({
            offset: 700,
            message: response.error,
            type: "warning",
            duration: 2000,
            offset: 700
          });
        }
      });
    }
  }
};
</script>
<style lang="scss">
.head-btn {
  padding: 17px;
  margin-left: 30px;
}

.three-button {
  display: flex;
  flex-direction: column;

  .button {
    width: 150px;
    margin: 8px auto;
  }
}

.right {
  margin-top: 18px;
  font-size: 17px;
  text-align: center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right p {
  width: 360px;
  text-align: left;
}

.box-card {
  min-height: 350px;
}
</style>
