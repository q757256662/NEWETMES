webpackJsonp([81],{eKxz:function(e,t,a){"use strict";function i(e){return a.i(s.a)({url:"/ETDispatchApi/companyfile",method:"get",params:e})}function r(e){return a.i(s.a)({url:"/ETDispatchApi/staffmanager?obj",method:"post",data:e})}function l(e){return a.i(s.a)({url:"/ETDispatchApi/myupload/"+e,method:"get"})}function n(e){return a.i(s.a)({url:"/ETDispatchApi/staffmanager/"+e,method:"delete"})}function o(e){return a.i(s.a)({url:"/ETDispatchApi/staffmanager?upUser",method:"put",data:e})}t.a=i,t.d=r,t.b=l,t.c=n,t.e=o;var s=a("Vo7i")},"nO/g":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),r=a.n(i),l=a("eKxz"),n=a("NYxO");t.default={name:"user",data:function(){return{form:{UserName:void 0,Phone:void 0,State:1,Up:void 0,Down:0,MAC:void 0,Remark:void 0},options:[{value:"0",label:"未下载"},{value:"1",label:"已下载"},{value:"2",label:"已上传"}],rules:{name:[{required:!0,message:"请输入用户",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],UserName:[{required:!0,message:"请输入账户",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:5,max:20,message:"长度在 5 到 20 个字符",trigger:"blur"}]},list:null,total:null,listLoading:!0,listQuery:{page:1,limit:10,Stime:void 0,Etime:void 0,QueryType:"0",query:""},sexOptions:["男","女"],dialogFormVisible:!1,formPhone:"",dialogStatus:"",userManager_btn_edit:!0,userManager_btn_del:!0,userManager_btn_add:!0,pickerOptions2:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},value6:"",value7:"",textMap:{update:"编辑",create:"创建"},formLabelWidth:"80px",tableKey:0}},created:function(){var e=new Date,t=new Date;t.setTime(t.getTime()-7776e6),this.listQuery.Etime=e,this.listQuery.Stime=t,this.getList(),this.userManager_btn_edit=this.elements["userManager:btn_edit"],this.userManager_btn_del=this.elements["userManager:btn_del"],this.userManager_btn_add=this.elements["userManager:btn_add"]},computed:r()({},a.i(n.b)(["elements"])),methods:{getList:function(){var e=this;this.listLoading=!0,a.i(l.a)(this.listQuery).then(function(t){e.list=t.data.rows,e.total=t.data.total,e.listLoading=!1})},handleFilter:function(){this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0},handleEdit:function(e,t){this.form=this.list[e],this.currentIndex=e,this.dialogFormVisible=!0,this.dialogStatus="update"},handleUpdate:function(e){var t=this;a.i(l.b)(e.id).then(function(e){t.form=e.data,t.dialogFormVisible=!0,t.dialogStatus="update"})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.i(l.c)(e.id).then(function(){t.$message({offset:700,title:"成功",message:"删除成功",type:"success",duration:2e3});var a=t.list.indexOf(e);t.list.splice(a,1)})})},create:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;a.i(l.d)(t.form).then(function(){t.dialogFormVisible=!1,t.getList(),t.$message({offset:700,title:"成功",message:"创建成功",type:"success",duration:2e3})})})},cancel:function(e){this.dialogFormVisible=!1,this.$refs[e].resetFields()},update:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.dialogFormVisible=!1,t.form.password=void 0,a.i(l.e)(t.form).then(function(){t.dialogFormVisible=!1,t.getList(),t.$message({offset:700,title:"成功",message:"更新成功",type:"success",duration:2e3})})})},dateChange:function(e){if(e){var t=new Date(Date.parse(e));return t.getFullYear()+"-"+(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate())}},getUTCTime:function(e,t){var a=e[t.property];return new Date(a).toUTCString()},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":moment(a).format("YYYY-MM-DD HH:mm:ss")},resetTemp:function(){this.form={UserName:void 0,Phone:void 0,State:1,Up:void 0,Down:0,MAC:void 0,Remark:void 0}}}}},"q3+V":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[e._v("\n    状态：\n    "),a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.listQuery.QueryType,callback:function(t){e.listQuery.QueryType=t},expression:"listQuery.QueryType"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"开始日期","value-format":"yyyy-MM-dd"},model:{value:e.listQuery.Stime,callback:function(t){e.listQuery.Stime=t},expression:"listQuery.Stime"}}),e._v("\n    -\n    "),a("el-date-picker",{attrs:{type:"date","value-format":"yyyy-MM-dd",placeholder:"结束日期"},model:{value:e.listQuery.Etime,callback:function(t){e.listQuery.Etime=t},expression:"listQuery.Etime"}}),e._v(" "),a("el-input",{staticClass:"filter-item",staticStyle:{width:"300px"},attrs:{placeholder:"输入文件名,接收方公司名,接收人名"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.listQuery.query,callback:function(t){e.listQuery.query=t},expression:"listQuery.query"}}),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),a("div",{staticClass:"filter-container"}),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"Attachment",width:"200px",align:"center",label:"文件名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"UserName",width:"400px",align:"center",label:"上传方"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Name",width:"400px",align:"center",label:"接收方"}}),e._v(" "),a("el-table-column",{attrs:{prop:"FileLength",width:"100px",align:"center",label:"文件大小"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Time",width:"100px",align:"center",label:"时间"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"详细",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("  \n    \n        详情\n    \n      ")])]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"用户名：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.UserName,callback:function(t){e.form.UserName=t},expression:"form.UserName"}})],1),e._v(" "),"create"==e.dialogStatus?a("el-form-item",{attrs:{label:"手机：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.Phone,callback:function(t){e.form.Phone=t},expression:"form.Phone"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"备注：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.Remark,callback:function(t){e.form.Remark=t},expression:"form.Remark"}})],1),e._v(" "),"update"==e.dialogStatus?a("el-form-item",{attrs:{label:"MAC：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.MAC,callback:function(t){e.form.MAC=t},expression:"form.MAC"}})],1):e._e(),e._v(" "),"update"==e.dialogStatus?a("el-form-item",{attrs:{label:"状态："}},[a("el-switch",{attrs:{"on-color":"#13ce66","off-color":"#ff4949","on-text":"启用","off-text":"禁用","on-value":1,"off-value":0},model:{value:e.form.State,callback:function(t){e.form.State=t},expression:"form.State"}})],1):e._e(),e._v(" "),"update"==e.dialogStatus?a("el-form-item",{attrs:{label:"上传权限："}},[a("el-switch",{attrs:{"on-color":"#13ce66","off-color":"#ff4949","on-text":"有","off-text":"无","on-value":1,"off-value":0},model:{value:e.form.Up,callback:function(t){e.form.Up=t},expression:"form.Up"}})],1):e._e(),e._v(" "),"update"==e.dialogStatus?a("el-form-item",{attrs:{label:"下载权限："}},[a("el-switch",{attrs:{"on-color":"#13ce66","off-color":"#ff4949","on-text":"有","off-text":"无","on-value":1,"off-value":0},model:{value:e.form.Down,callback:function(t){e.form.Down=t},expression:"form.Down"}})],1):e._e()],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("取 消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.create("form")}}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("form")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},sJ4t:function(e,t,a){var i=a("VU/8")(a("nO/g"),a("q3+V"),null,null,null);e.exports=i.exports}});