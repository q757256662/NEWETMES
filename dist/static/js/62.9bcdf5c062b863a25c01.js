webpackJsonp([62],{E4LH:function(e,t,a){"use strict";function o(e){return/^1[3|4|5|7|8][0-9]\d{8}$/.test(e)}t.a=o},WB11:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("cBpk"),r=(a("NYxO"),a("E4LH")),l=a("TIfe");t.default={data:function(){return{testData:{type:"CD",id:"TSETDH0731003",bedname:"工商银行001[1]面A 流水号[10001-10004] 4刀1层=4套"},form:{status:200,tip:"成功",data:{}},typePass:"password",formData:{data:{}},formLabelWidth:"100px",AllowUpde:!0,role:"",rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"},{min:2,max:5,message:"长度在 2 到 5 个字符",trigger:"blur"}],password:[{required:!0,message:"密码不能为空",trigger:"blur"},{min:4,max:10,message:"长度在 4 到 10 个字符",trigger:"blur"}],phone:[{required:!1}],MAC:[{min:12,max:12,message:"MAC地址长度为12",trigger:"blur"}]}}},created:function(){this.getMessage()},methods:{fakeClick:function(e){var t=document.createEvent("MouseEvents");t.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),e.dispatchEvent(t)},exportRaw:function(e,t){var a=window.URL||window.webkitURL||window,o=new Blob([t]),r=document.createElementNS("http://www.w3.org/1999/xhtml","a");r.href=a.createObjectURL(o),r.download=e,this.fakeClick(r)},handleTestDown:function(){var e=this;a.i(o.b)(this.testData).then(function(t){0!=t.errcode?e.exportRaw("template.rar",t):e.$message({message:t.errmsg,type:"error"})})},handleClick:function(){this.AllowUpde=!this.AllowUpde,this.typePass="text"},handleUpdate:function(e){var t=this;this.$refs[e].validate(function(e){if(e)if(""==t.form.data.name.replace(/(^\s+)|(\s+$)/g,""))t.form.data.name="",t.$message({message:"请输入名称!",type:"warning",duration:2e3});else if(t.form.data.phone){if(t.form.data.phone){if(!a.i(r.a)(t.form.data.phone))return t.$message.error("手机号输入有误！"),!1;a.i(o.f)(t.form.data).then(function(e){200===e.status?(t.$message({offset:700,title:"成功",message:"更新成功",type:"success",duration:2e3}),t.$store.commit("SET_NAME",t.form.data.name),t.AllowUpde=!t.AllowUpde,t.typePass="password"):201===e.status?t.$message({offset:700,message:e.tip,type:"warning",duration:2e3}):t.$message({offset:700,message:e.error,type:"warning",duration:2e3})})}}else a.i(o.f)(t.form.data).then(function(e){200===e.status?(t.$message({offset:700,title:"成功",message:"更新成功",type:"success",duration:2e3}),t.typePass="password",t.$store.commit("SET_NAME",t.form.data.name),t.handleClick()):201===e.status&&t.$message({offset:700,message:e.tip,type:"warning",duration:2e3})})})},getMessage:function(){var e=this;a.i(o.e)().then(function(t){a.i(l.e)(t.data.login_id)," "==t.data.phone&&(t.data.phone=t.data.phone.trim()),e.form.data=t.data,e.form.data.ProcessName=e.filterProcessName(e.form.data),e.form.data.CategoryName=e.filterCategories(e.form.data),e.formData.data=t.data})},filterProcessName:function(e){return null==e.ProcessName?"":e.ProcessName.map(function(e){return e.CodeName.includes("TD")?e.CodeName.replace("TD","团"):e.CodeName.includes("GD")?e.CodeName.replace("GD","个"):e.CodeName.includes("CD")?e.CodeName.replace("CD","成"):e.CodeName.includes("TG")?e.CodeName.replace("TG","改"):e.CodeName.includes("CG")?e.CodeName.replace("CG","改"):e.CodeName}).join(" ")},filterCategories:function(e){return null==e.CategoryName?"":e.CategoryName.map(function(e){return e.CategoryName}).join(" ")}}}},cBpk:function(e,t,a){"use strict";function o(e){return a.i(p.a)({url:"/bmapi/personal",method:"get",params:e})}function r(e){return a.i(p.a)({url:"/test/comments?obj",method:"post",data:e})}function l(e){return a.i(p.a)({url:"/test/comments/"+e,method:"get"})}function n(e){return a.i(p.a)({url:"/test/comments/"+e,method:"delete"})}function s(e){return a.i(p.a)({url:"/bmapi/personal?obj",method:"put",data:e})}function i(e){return a.i(p.a)({url:"/bmapi/export/nc",method:"get",params:e})}function d(e){return a.i(p.a)({url:"/bmapi/export/plt",method:"get",params:e})}function m(e){return a.i(p.a)({url:"/bmapi/export/cr",method:"get",params:e,responseType:"blob"})}function f(e){return a.i(p.a)({url:"/bmapi/export/excel",method:"get",params:e,responseType:"blob",headers:{"Content-Type":"application/json; application/octet-stream"}})}t.e=o,t.i=r,t.g=l,t.h=n,t.f=s,t.b=i,t.c=d,t.a=m,t.d=f;var p=a("Vo7i")},i3es:function(e,t,a){var o=a("VU/8")(a("WB11"),a("z+dQ"),null,null,null);e.exports=o.exports},"z+dQ":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{width:"500px",margin:"20px auto"},attrs:{"el-container":""}},[a("el-form",{ref:"ruleForm",attrs:{rules:e.rules,model:e.form.data}},[a("el-form-item",{attrs:{label:"工号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.form.data.login_id,callback:function(t){e.form.data.login_id=t},expression:"form.data.login_id"}})],1),e._v(" "),a("el-tooltip",{attrs:{content:"必填,长度在 2 到 5 个字符",placement:"right-end",effect:"light"}},[a("el-form-item",{attrs:{label:"姓名",prop:"name","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:e.AllowUpde},on:{"update:disabled":function(t){e.AllowUpde=t}},model:{value:e.form.data.name,callback:function(t){e.form.data.name=t},expression:"form.data.name"}})],1)],1),e._v(" "),a("el-tooltip",{attrs:{content:"必填,长度在 4 到 10 个字符",placement:"right-end",effect:"light"}},[a("el-form-item",{attrs:{label:"用户密码",prop:"password","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:e.typePass,disabled:e.AllowUpde,minlength:4,maxlength:10},on:{"update:disabled":function(t){e.AllowUpde=t}},model:{value:e.form.data.password,callback:function(t){e.form.data.password=t},expression:"form.data.password"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"工序","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.data.ProcessName,callback:function(t){e.form.data.ProcessName=t},expression:"form.data.ProcessName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"品类","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:""},model:{value:e.form.data.CategoryName,callback:function(t){e.form.data.CategoryName=t},expression:"form.data.CategoryName"}})],1),e._v(" "),a("el-tooltip",{attrs:{content:"选填,输入11位手机号",placement:"right-end",effect:"light"}},[a("el-form-item",{attrs:{label:"手机",prop:"phone","label-width":e.formLabelWidth}},[a("el-input",{attrs:{maxlength:11,minlength:11,disabled:e.AllowUpde},on:{"update:disabled":function(t){e.AllowUpde=t}},model:{value:e.form.data.phone,callback:function(t){e.form.data.phone=t},expression:"form.data.phone"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"流水线名称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",disabled:""},model:{value:e.form.data.PLName,callback:function(t){e.form.data.PLName=t},expression:"form.data.PLName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"MAC地址",prop:"MAC","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",disabled:e.AllowUpde},model:{value:e.form.data.MAC,callback:function(t){e.form.data.MAC=t},expression:"form.data.MAC"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"钉钉",prop:"DINGDING","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",disabled:e.AllowUpde},model:{value:e.form.data.DINGDING,callback:function(t){e.form.data.DINGDING=t},expression:"form.data.DINGDING"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{align:"center"}},[e.AllowUpde?a("el-button",{attrs:{type:"success"},on:{click:e.handleClick}},[e._v("编辑")]):e._e(),e._v(" "),e.AllowUpde?e._e():a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleUpdate("ruleForm")}}},[e._v("确 定")])],1)],1)},staticRenderFns:[]}}});