webpackJsonp([68],{ARoL:function(e,t,a){var i=a("VU/8")(a("bPRz"),a("bQUS"),null,null,null);e.exports=i.exports},E4LH:function(e,t,a){"use strict";function i(e){return/^1[3|4|5|7|8][0-9]\d{8}$/.test(e)}t.a=i},bPRz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),l=a.n(i),n=a("TG9w"),s=a("NYxO"),r=a("E4LH"),o=function(e,t,i){t?a.i(r.a)(t)?i():i(new Error("请输入正确的11位手机号码")):i(new Error("请输入电话号码"))};t.default={name:"user",data:function(){return{value:0,options1:[{value:"A",label:"成衣改版",children:[{value:"11",label:"下载样板"},{value:"13",label:"修改样板"},{value:"15",label:"放码"},{value:"16",label:"检查尺寸"},{value:"18",label:"估算用量"}]},{value:"B",label:"团订改版",children:[{value:"22",label:"下载样板"},{value:"23",label:"修改样板"},{value:"25",label:"放码"},{value:"26",label:"检查尺寸"},{value:"27",label:"改驱动规则"}]}],selectedOptions3:["A","11"],options:[{value:"0",label:"正常"},{value:"1",label:"病假"},{value:"3",label:"转岗"},{value:"5",label:"离职"}],form:{UserName:void 0,Phone:void 0,State:1,Up:void 0,Down:0,MAC:void 0,Remark:""},rules:{name:[{required:!0,message:"请输入用户",trigger:"blur"},{min:3,max:20,message:"长度在 3 到 20 个字符",trigger:"blur"}],UserName:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],Phone:[{required:!0,validator:o,message:"请输入手机号",trigger:"blur"},{min:11,max:11,message:"长度在11个字符",trigger:"blur"}]},list:null,total:null,listLoading:!0,listQuery:{page:1,limit:15,name:void 0},sexOptions:["男","女"],dialogFormVisible:!1,formPhone:"",dialogStatus:"",userManager_btn_edit:!0,userManager_btn_del:!0,userManager_btn_add:!0,textMap:{update:"编辑",create:"创建"},formLabelWidth:"80px",tableKey:0}},created:function(){this.getList(),this.userManager_btn_edit=this.elements["userManager:btn_edit"],this.userManager_btn_del=this.elements["userManager:btn_del"],this.userManager_btn_add=this.elements["userManager:btn_add"]},computed:l()({},a.i(s.b)(["elements"])),methods:{getList:function(){var e=this;this.listLoading=!0,a.i(n.a)(this.listQuery).then(function(t){e.list=t.data.rows,e.total=t.data.total,e.listLoading=!1})},change:function(e){var t=this;a.i(n.b)(e).then(function(e){200===e.status?(t.dialogFormVisible=!1,t.$message({offset:700,title:"成功",message:"更新成功",type:"success",duration:2e3})):t.$message({offset:700,message:e.error,type:"warning",duration:2e3})})},handleFilter:function(){this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0},handleEdit:function(e,t){this.form=this.list[e],this.currentIndex=e,this.dialogFormVisible=!0,this.dialogStatus="update"},handleUpdate:function(e){var t=this;a.i(n.c)(e.id).then(function(e){t.form=e.data,t.dialogFormVisible=!0,t.dialogStatus="update"})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.i(n.d)(e.id).then(function(){t.$message({offset:700,title:"成功",message:"删除成功",type:"success",duration:2e3});var a=t.list.indexOf(e);t.list.splice(a,1)})})},create:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;a.i(n.e)(t.form).then(function(){t.dialogFormVisible=!1,t.getList(),t.$message({offset:700,title:"成功",message:"创建成功",type:"success",duration:2e3})})})},cancel:function(e){this.dialogFormVisible=!1,this.$refs[e].resetFields()},update:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.dialogFormVisible=!1,t.form.password=void 0,a.i(n.b)(t.form).then(function(e){200===e.status?(t.dialogFormVisible=!1,t.$message({offset:700,title:"成功",message:"更新成功",type:"success",duration:2e3})):t.$message({offset:700,message:e.error,type:"warning",duration:2e3})})})},resetTemp:function(){this.form={UserName:void 0,Phone:void 0,State:1,Up:void 0,Down:0,MAC:void 0,Remark:void 0}}}}},bQUS:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"edit"},on:{click:e.handleCreate}},[e._v("添加")])],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"login_id",width:"110px",align:"center",label:"工号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",width:"80px",align:"center",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"process",width:"200px",align:"center",label:"工序"}},[e._v(" --\x3e\n      ")]),e._v(" "),a("el-table-column",{attrs:{prop:"phone",width:"150px",align:"center",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{prop:"LastTime",width:"150px",align:"center",label:"登陆时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"Compute",width:"130px",align:"center",label:"电脑名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"MachID",width:"100px",align:"center",label:"设备ID"}}),e._v(" "),a("el-table-column",{attrs:{prop:"State",width:"80px",align:"center",label:"状态"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("\n      编辑\n    ")]),e._v(" "),a("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("\n      重置密码\n    ")])]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:!e.listLoading,expression:"!listLoading"}],staticClass:"pagination-container"},[a("el-pagination",{attrs:{"current-page":e.listQuery.page,"page-sizes":[10,15,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.listQuery.page=t}}})],1),e._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},["create"==e.dialogStatus?a("el-form-item",{attrs:{label:"工号：","label-width":e.formLabelWidth,prop:"UserName"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{"auto-complete":"off"},model:{value:e.form.UserName,callback:function(t){e.form.UserName=t},expression:"form.UserName"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"工序：","label-width":e.formLabelWidth}},[a("el-cascader",{attrs:{options:e.options1},model:{value:e.selectedOptions3,callback:function(t){e.selectedOptions3=t},expression:"selectedOptions3"}})],1),e._v(" "),"update"==e.dialogStatus?a("el-form-item",{attrs:{label:"设备ID：","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"220px"},attrs:{"auto-complete":"off"},model:{value:e.form.MachID,callback:function(t){e.form.MachID=t},expression:"form.MachID"}})],1):e._e(),e._v(" "),"update"==e.dialogStatus?a("el-form-item",{attrs:{label:"状态：","label-width":e.formLabelWidth}},[[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.form.State,callback:function(t){e.form.State=t},expression:"form.State"}},e._l(e.options,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))]],2):e._e()],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("取 消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.create("form")}}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("form")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}}});