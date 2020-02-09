<template>
  <!-- DataImport -->
  <div class="app-container calendar-list-container">
    可驱动：
    <el-select v-model="downloadQuery['model']" placeholder="请选择" style="width: 70px;">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <!-- 存储模式：
        <el-select v-model="downloadQuery['SaveModel']" placeholder="请选择" style="width: 90px;">
          <el-option v-for="item in SaveModeloptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select> -->
    <!-- 品类名： -->
    <el-select v-model="downloadQuery['type']" @visible-change="selectCategort" placeholder="请选择品类">
      <el-option v-for="item in categoriesOption" :key="item.Id" :label="item.CategoryName" :value="item.CategoryName"></el-option>
    </el-select>
    <!-- 品牌： -->
    <el-input placeholder="请输入品牌" @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" v-model="downloadQuery['brand']"> </el-input>
    <!-- 性别： -->
    <!-- <el-input placeholder="请输入性别" @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" v-model="downloadQuery['sex']"> </el-input> -->
        <el-select v-model="downloadQuery['sex']"  placeholder="请选择性别" style="width:80px;">
      <el-option v-for="item in sexOptions" :key="item" :label="item" :value="item"></el-option>
    </el-select>
   <el-select v-model="uploadWay"  @change="changeUploadWay" placeholder="请选择上传方式" style="width:100px;">
      <el-option v-for="item in uploadWayOptions" :key="item.key" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <!-- <el-button class="filter-item" type="primary" v-waves icon="import" @click="handleFilter">导入</el-button> -->
    <!-- <el-button class="filter-item" type="primary" v-waves icon="import" @click="handleStyleUp">款式上传</el-button> -->
    <el-upload style="block:inline-block" class="upload-demo" ref="upload" action="/bmapi/styleimport/upload" :headers="header" :on-preview="handlePreview" :show-file-list="false" :data="downloadQuery" :on-remove="handleRemove" :on-success="successUpload" :on-error='errorUpload'
      :before-upload="beforeAvatarUpload" :on-change='handleChangeFile' :multiple="false" :auto-upload="true" accept=".zip,.prj" >
      <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
      <el-button style="margin-left: 10px;" type="primary" @click="submitUpload" :loading="loading">上  传</el-button>
    </el-upload>



    <!-- <el-tooltip popper-class="popperClass"  value='true' effect="light" placement="top"> -->
    <!-- <div  slot="content"> -->
    <el-popover ref="popover1" placement="top" trigger="hover">
      <!-- <h3 style="margin-top:0px;">如何导入可驱动文件</h3>
      1.在服务器上建立与主管工号相同名的文件夹。<br/> 2.把做好的可驱动文件放入。
      <br/> 3.填写该可驱动信息，导入。
      <br/> 4.此功能导入可驱动文件方式，也可替换已上传的可驱动文件，替换条件：
      <br/> 替换可驱动文件款名必须一样，且样式信息≥已上传的可驱动样式信息
      <br/> （注：也必须包含已上传可驱动的样式信息） -->
         <strong>如何导入款式/样式：</strong><br/>
      <!-- <h3>如何导入款式/样式</h3> -->
      1.填写款式信息。<br/>
      2.点击上传选择文件,上传文件必须为ZIP的压缩文件或者单个prj文件。 <br/> 
      3.可以以prj文件直接压缩或者以文件夹形式压缩。<br/>
       4.压缩包中不能含有压缩文件。
     <br/>
        单款上传：单个款式的所有prj文件压缩上传。<br/>
        多款上传：多个prj文件压缩上传。<br/>
      <strong>备 注：</strong><br/>
      单个prj文件上传时，默认为单款上传。<br/>
     多款上传时一个prj文件对应一个款式，建议以款名命名prj文件名，<br>
     单款上传时以zip文件名作为款名。
    </el-popover>
    <!-- </div> -->
    <img v-popover:popover1 style="opacity: 0.5;width: 17px;margin-left:20px" src="static/img/icon_help.png" alt="" srcset="">
    <!-- <i class="el-icon-information" v-popover:popover1></i> -->
    <!-- </el-tooltip> -->
    <div class="filter-container">
    </div>
    <el-dialog v-dialogDrag title="文件详情" :visible.sync="dialogFormVisible">
      <el-form size="mini" :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="文件名：" :label-width="formLabelWidth">
          <el-input v-model="form['FileName']" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="上传公司：" :label-width="formLabelWidth">
          <el-input v-model="form['CompanyName']" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="上传人：" :label-width="formLabelWidth">
          <el-input v-model="form['Uploader']" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="文件接收人：" :label-width="formLabelWidth">
          <el-input v-model="form['ToUser']" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="文件权限：" :label-width="formLabelWidth">
          <el-input v-model="form['CanOpener']" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="文件大小：" :label-width="formLabelWidth">
          <el-input v-model="form['FileSize']" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="上传时间：" :label-width="formLabelWidth">
          <el-input v-model="form['Time']" auto-complete="off" :readonly="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 原生文件请求 -->
    <!-- <form id="myform" enctype="multipart/form-data">
            <input type="file" name="fileup" id="fileup" v-on:change="fileChange($event)" />
          </form> -->
    <!-- 原生文件请求 -->
  </div>
</template>

<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  getPltype,
  upStyleObj
} from "api/admin/FileLog/needdown";
import { downloadFile } from "api/admin/FileLog/downloadFile";
import { details } from "api/admin/FileLog/details";
import { mapGetters } from "vuex";
import { getToken } from "utils/auth";
import Cookies from "js-cookie";
import { getCategory } from "api/admin/user/index";
export default {
  name: "user",
  data() {
    return {
      visible2: true,
      form: {
        UserName: undefined,
        Phone: undefined,
        State: 1,
        Up: undefined,
        Down: 0,
        MAC: undefined,
        Remark: undefined
      },
      categoriesOption: [],
      IP: process.env.BASE_API,
      options: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      SaveModeloptions: [
        {
          value: 0,
          label: "普通"
        },
        {
          value: 1,
          label: "加法"
        },
        {
          value: -1,
          label: "减法"
        }
      ],
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        UserName: [
          {
            required: true,
            message: "请输入账户",
            trigger: "blur"
          },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "长度在 5 到 20 个字符",
            trigger: "blur"
          }
        ]
      },
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        QueryType: "0",
        SaveModel: "0",
        query: ""
      },
      detailQuery: {
        Id: null
      },
      downloadQuery: {
        model: "",
        type: "",
        brand: "",
        sex: "男",
        uploadWay: "singleStyle"
      },
      upLoadQuery:{

      },
      sexOptions: ["男", "女"],
      uploadWayOptions: [
        { value: "singleStyle", label: "单款" },
        { value: "moreStyle", label: "多款" },
      
      ],
      dialogFormVisible: false,
      formPhone: "",
      dialogStatus: "",
      userManager_btn_edit: true,
      userManager_btn_del: true,
      userManager_btn_add: true,
      value6: "",
      value7: "",
      textMap: {
        update: "文件详情",
        create: "创建"
      },
      formLabelWidth: "100px",
      token: Cookies.get("ETDispatch-Token"),
      tableKey: 0,
      fileList: [],
      header: {},
      updata: {
        model: "",
        type: "",
        brand: "",
        sex: "男"
      },
      /**加载 */
      loading: false,
      pingleiId:'',
      uploadWay:'singleStyle'
    };
  },
  created() {
    // this.getList();
    this.getTypePl();
    this.userManager_btn_edit = this.elements["userManager:btn_edit"];
    this.userManager_btn_del = this.elements["userManager:btn_del"];
    this.userManager_btn_add = this.elements["userManager:btn_add"];
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    //获取流水线性质
    getTypePl() {
      getPltype().then(res => {
    
        this.pingleiId=res.data.rows[0].id;
        if (res.data.rows[0].type == 0) {
          this.downloadQuery.model = 1;
        } else {
          this.downloadQuery.model = 0;
        }
        // console.log(res)
      });
    },
    changeUploadWay(e){
      this.downloadQuery.uploadWay = e;
    },
    // vue文件上传测试
    // 上传函数
    submitUpload() {
      // this.$refs.upload.submit();
    },
    // 移除文件函数
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    //上传文件前的准备
    beforeAvatarUpload(file) {
      // console.log(file)
      // var ext = file.name.substring(0, file.name.lastIndexOf("."));
      let fileName = file.name.lastIndexOf("."); //取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length; //取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength); //截
      // console.log(fileFormat);
      const isJPG = fileFormat;
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // const isType = this.downloadQuery.type;
      
      if ((isJPG == "zip" || isJPG == "prj") && !!!this.downloadQuery.type) {
        if (!!!this.downloadQuery.type) {
          this.$message({
            message: "请选择品类！",
            type: "warning",
            duration: 2000
          });
        } else {
          this.$message({
            message: "上传文件只能是 ZIP或者PRJ文件格式!",
            type: "warning",
            duration: 2000
          });
        }
        return false;
      }
      this.loading = true;
    },
    //选择文件就上传
    handleChangeFile(file, fileList) {
      // console.log(file)
      // console.log('上传带的')
      this.header.Authorization = "Bearer " + getToken();

      let fileName = file.name.lastIndexOf("."); //取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length; //取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength); //截
      // console.log(fileFormat);
      const isJPG = fileFormat;
      // const isLt2M = file.size / 1024 / 1024 < 2;
      const isType = this.downloadQuery.type;
      if(isJPG == 'prj'){
        this.downloadQuery.uploadWay = 'prj';
     
      }
      // console.log(this.downloadQuery);
      // if (isJPG != "zip") {
      //   this.$message.error("上传文件只能是 ZIP 格式!");
      // }
      // if (!isType) {
      //   this.$message({
      //     message: "请选择品类！",
      //     type: "warning",
      //     duration: 2000
      //   });
      //   return false;
      // }
      // return isJPG && isType;
    },
    // 点击预览
    handlePreview(file) {
      // console.log(file);
    },
    // 上传成功函数
    successUpload(response, file) {
      if (response.Success) {
        // this.handleFilter();
        this.$message({
          message: response.ErrMes,
          type: "success",
          duration: 2000
        });
      this.uploadWay = 'singleStyle'
      } else {
        this.$message({
          message: response.ErrMes,
          type: "warning",
          duration: 2000
        });
      }
      this.loading = false;
      // console.log(response)
      // console.log(file)
    },
    errorUpload(err, file, fileList) {
      this.$message({
        message: err.ErrMes,
        type: "warning"
      });
      this.loading = false;
      // console.log(err)
    },
    // 原生文件请求
    // fileChange: function(el) {
    //   console.log(el)
    //   if (!el.target.files[0].size) return;
    //   var obj = new FormData(document.getElementById("myform"));
    //   console.log(obj)
    //   // obj.append("name", "wzh");
    //   var _this = this;
    //   $.ajax({
    //     type: 'post',
    //     url: 'http://lbwin7/bmapi/api/values',
    //     data: obj,
    //     cache: false,
    //     processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
    //     contentType: false, // 不设置Content-type请求头
    //     success: function(res) {
    //       console.log(res)
    //     },
    //   });
    // },
    // 原生文件请求结束
    // 文件上传测试
    indexMethod(index) {
      return index * 1;
    },
    //文件大小格式化  去掉小数点后的位
    dateFormat(row, column) {
      var date = row[column.property];
      return parseInt(date) + date.substr(date.length - 2, date.length);
    },
    selectCategort() {
      let form ={};
      form.PLID = this.pingleiId;
      getCategory(form).then(res => {
        if (res.status == 200) {
          this.categoriesOption = res.data.rows;
        }
      });
    },
    handleFilter() {
      //判断参数  是否有效
      // if (this.listQuery.Etime  > this.listQuery.Etime ){
      // }
      // console.log(this.downloadQuery)
      if (this.downloadQuery.type == "") {
        this.$message({
          message: "请选择品类！",
          type: "warning"
        });
      } else {
        // addObj(this.downloadQuery).then(res => {
        //   if (res.status === 200) {
        //     this.$message({
        //       message: res.tip,
        //       type: "success",
        //       duration: 2000
        //     });
        //     this.resetTemp();
        //   } else {
        //     //失败提示
        //     this.$message({
        //       message: res.tip,
        //       type: "warning",
        //       duration: 2000
        //     });
        //     this.resetTemp();
        //   }
        // });
      }
      // this.getList();
    },
    handleStyleUp() {
      if (this.downloadQuery.type == "") {
        this.$message({
          message: "请选择品类！",
          type: "warning"
        });
      } else {
        upStyleObj(this.downloadQuery).then(res => {
          if (res.status === 200) {
            this.$message({
              offset: 700,
              title: "成功",
              message: res.tip,
              type: "success",
              duration: 2000
            });
            this.handleFilter();
            this.resetTemp();
          } else {
            //失败提示
            this.$message({
              offset: 700,
              message: res.tip,
              type: "warning",
              duration: 2000
            });
            this.resetTemp();
          }
        });
      }
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      this.detailQuery.Id = row.Id;
      details(this.detailQuery).then(response => {
        this.form = response.data.rows;
        this.dialogFormVisible = true;
      });
    },
    handleUpdate(row) {
      getObj(row.id).then(response => {
        this.form = response.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(() => {
          this.$message({
            offset: 700,
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000
          });
          const index = this.list.indexOf(row);
          this.list.splice(index, 1);
        });
      });
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$message({
              offset: 700,
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$message({
              offset: 700,
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    resetTemp() {
      this.form = {
        UserName: undefined,
        Phone: undefined,
        State: 1,
        Up: undefined,
        Down: 0,
        MAC: undefined,
        Remark: undefined
      };
      this.downloadQuery = {
          model: "",
        type: "",
        brand: "",
        sex: "男",
        uploadWay: "singleStyle"
      };
    }
  }
};
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
.upload-demo {
  display: inline-block;
}
a:link {
  color: #20a0ff;
}
/* 未被访问的链接     蓝色 */
a:visited {
  color: #20a0ff;
}
/* 已被访问过的链接   蓝色 */
a:hover {
  color: #20a0ff;
}
/* 鼠标悬浮在上的链接 蓝色 */
a:active {
  color: #20a0ff;
}
.popperClass {
  border: 1px solid red;
}
/* 鼠标点中激活链接   蓝色 */
.calendar-list-container {
  display: flex;
  align-items: center;
}
</style>
