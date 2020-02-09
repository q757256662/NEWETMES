<template>
  <!-- dashboard -->
  <div style="width:500px;margin:20px auto;" el-container>
    <el-form :rules="rules" :model="form.data" ref="ruleForm">
      <el-form-item label="工号" :label-width="formLabelWidth">
        <el-input v-model="form.data.login_id" auto-complete="off" disabled=""></el-input>
      </el-form-item>
      <el-tooltip content="必填,长度在 2 到 5 个字符" placement="right-end" effect="light">
   <el-form-item  label="姓名" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.data.name" :disabled.sync="AllowUpde"></el-input>
      </el-form-item>
</el-tooltip>
   <el-tooltip content="必填,长度在 4 到 10 个字符" placement="right-end" effect="light">
  <el-form-item label="用户密码" prop="password" :label-width="formLabelWidth">
        <el-input :type="typePass" v-model="form.data.password" :disabled.sync="AllowUpde" :minlength=4 :maxlength=10></el-input>
      </el-form-item>
</el-tooltip>
      <el-form-item label="工序" :label-width="formLabelWidth">
        <el-input v-model="form.data.ProcessName" disabled></el-input>
      </el-form-item>
      <el-form-item label="品类" :label-width="formLabelWidth">
        <el-input v-model="form.data.CategoryName" disabled></el-input>
      </el-form-item>
<el-tooltip content="选填,输入11位手机号" placement="right-end" effect="light">
     <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.data.phone" :maxlength=11 :minlength=11 :disabled.sync="AllowUpde"></el-input>
      </el-form-item>
</el-tooltip>
      <el-form-item label="流水线名称" :label-width="formLabelWidth">
        <el-input v-model="form.data.PLName" auto-complete="off" disabled=""></el-input>
      </el-form-item>
      <el-form-item label="MAC地址" prop="MAC" :label-width="formLabelWidth">
        <el-input v-model="form.data.MAC" auto-complete="off" :disabled="AllowUpde" ></el-input>
      </el-form-item>
      <el-form-item label="钉钉" prop="DINGDING" :label-width="formLabelWidth">
        <el-input v-model="form.data.DINGDING" auto-complete="off" :disabled="AllowUpde" ></el-input>
      </el-form-item>
    </el-form>
    <div align="center" class="dialog-footer">
      <el-button type="success" @click="handleClick" v-if="AllowUpde">编辑</el-button>
      <el-button type="primary" @click="handleUpdate('ruleForm')" v-if="!AllowUpde">确 定</el-button>
    </div>
    <!-- <div>
      <el-input v-model="testData.id" label="id" placeholder="id"></el-input>
      <el-select v-model="testData.type" label="类型"  placeholder="类型">
        <el-option key="TD" label="团订" value="TD"></el-option>
        <el-option key="CD" label="成衣" value="CD"></el-option>
        <el-option key="GD" label="个订" value="GD"></el-option>
      </el-select>
      <el-input v-model="testData.bedname" label="床名"  placeholder="床名"></el-input>
      <el-button @click="handleTestDown">
        下载
      </el-button>
    </div> -->
  </div>
</template>
<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  putObj,
  DownNC
} from "api/admin/user/index1";
import { mapGetters } from "vuex";
// 这里要俺需要引入，我不是一个对象
import { isvalidPhone } from "utils/validate";
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
} from "utils/auth";
//定义一个全局的变量，谁用谁知道
export default {
  data() {
    return {
      testData: {
        type: "CD",
        id: "TSETDH0731003",
        bedname: "工商银行001[1]面A 流水号[10001-10004] 4刀1层=4套"
      },
      form: {
        status: 200,
        tip: "成功",
        data: {
        }
      },
      typePass: "password",
      formData: {
        data: {}
      },
      formLabelWidth: "100px",
      AllowUpde: true,
      role: "",
      rules: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          { min: 4, max: 10, message: "长度在 4 到 10 个字符", trigger: "blur" }
        ],
        phone: [
          {
            required: false
          }
        ],
        MAC: [{ min: 12, max: 12, message: "MAC地址长度为12", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getMessage();
    // console.log(getRole());
  },
  methods: {
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
    handleTestDown() {
      // window.location.href = `http://192.168.3.18:1000/export/nc?id=${this.testData.id}&type=${this.testData.type}&bedname=${this.testData.bedname}`;
      DownNC(this.testData).then(res => {
        if (res.errcode != 0) {
          // var content = "file content!";
          // var data = new Blob([content], { type: "text/plain;charset=UTF-8" });
          // var downloadUrl = window.URL.createObjectURL(data);
          // var anchor = document.createElement("a");
          // anchor.href = downloadUrl;
          // anchor.download = "文件名.txt";
          // anchor.click();
          // window.URL.revokeObjectURL(data);

          this.exportRaw('template.rar',res)
          // this.$message({
          //   message:res.errmsg,
          //   type:"success"
          // })
        } else {
          this.$message({
            message: res.errmsg,
            type: "error"
          });
        }
      });
    },
    handleClick() {
      this.AllowUpde = !this.AllowUpde;
      this.typePass = "text";
    },
    handleUpdate(formName) {
      // console.log(this.form.data.phone)
      //       if(this.form.data.name == this.formData.data.name && this.form.data.password == this.formData.data.password && this.form.data.phone == this.formData.data.phone){
      //        return false;
      // }
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.data.name.replace(/(^\s+)|(\s+$)/g, "") == "") {
            this.form.data.name = "";
            this.$message({
              message: "请输入名称!",
              type: "warning",
              duration: 2000
            });
          } else if (!this.form.data.phone) {
            putObj(this.form.data).then(response => {
              if (response.status === 200) {
                this.$message({
                  offset: 700,
                  title: "成功",
                  message: "更新成功",
                  type: "success",
                  duration: 2000
                });
                this.typePass = "password";
                this.$store.commit('SET_NAME',this.form.data.name)
                this.handleClick();
              } else if (response.status === 201) {
                //失败提示
                // console.log(response.status)
                this.$message({
                  offset: 700,
                  message: response.tip,
                  type: "warning",
                  duration: 2000
                });
              }
            });
          } else if (this.form.data.phone) {
            if (!isvalidPhone(this.form.data.phone)) {
              this.$message.error("手机号输入有误！");
              return false;
            } else {
              putObj(this.form.data).then(response => {
                if (response.status === 200) {
                  this.$message({
                    offset: 700,
                    title: "成功",
                    message: "更新成功",
                    type: "success",
                    duration: 2000
                  });
                  this.$store.commit('SET_NAME',this.form.data.name)
                  this.AllowUpde = !this.AllowUpde;
                  this.typePass = "password";
                  // this.handleClick();
                } else if (response.status === 201) {
                  //失败提示
                  // console.log(response.status)
                  this.$message({
                    offset: 700,
                    message: response.tip,
                    type: "warning",
                    duration: 2000
                  });
                } else {
                  //失败提示
                  this.$message({
                    offset: 700,
                    message: response.error,
                    type: "warning",
                    duration: 2000
                  });
                }
                // console.log(res);
              });
            }
          }
        }
      });
    },
    getMessage() {
      page().then(res => {
        // console.log(res.data);
        setUserId(res.data.login_id);
        // console.log(getUserId())
        if (res.data.phone == " ") {
          res.data.phone = res.data.phone.trim();
          // res.data.phone = "";
        }
        this.form.data = res.data;
        this.form.data.ProcessName = this.filterProcessName(this.form.data);
        this.form.data.CategoryName = this.filterCategories(this.form.data);
        this.formData.data = res.data;
        // console.log(this.getToken);
      });
    },
    filterProcessName(row) {
      return row.ProcessName==null?'':row.ProcessName.map(el=>{
          if(el.CodeName.includes('TD')){
            return el.CodeName.replace('TD','团')
          }else if(el.CodeName.includes('GD')){
            return el.CodeName.replace('GD','个')
          }else if(el.CodeName.includes('CD')){
            return el.CodeName.replace('CD','成')
          }else if(el.CodeName.includes('TG')){
            return el.CodeName.replace('TG','改')
          }else if(el.CodeName.includes('CG')){
            return el.CodeName.replace('CG','改')
          }else{
            return el.CodeName
          }
        }).join(' ')
    },
    filterCategories(row){
      // console.log(row.CategoryName==null?'':row.CategoryName.map(el=>el.CategoryName))
        return row.CategoryName==null?'':row.CategoryName.map(el=>el.CategoryName).join(' ')
      }
  }
};
</script>