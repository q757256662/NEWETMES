webpackJsonp([11],{"1onU":function(e,t,i){var a=i("VU/8")(i("VT+v"),i("Tl1r"),null,null,null);e.exports=a.exports},"9bBU":function(e,t,i){i("mClu");var a=i("FeBl").Object;e.exports=function(e,t,i){return a.defineProperty(e,t,i)}},C4MV:function(e,t,i){e.exports={default:i("9bBU"),__esModule:!0}},E4LH:function(e,t,i){"use strict";function a(e){return/^1[3|4|5|7|8][0-9]\d{8}$/.test(e)}t.a=a},EVbc:function(e,t,i){var a=i("xv1r");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i("rjj0")("482177a6",a,!0)},HXED:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container calendar-list-container"},[i("div",{staticClass:"filter-container"},[e.showAdd?i("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"edit"},on:{click:e.handleCreate}},[e._v("添加")]):e._e()],1),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[i("el-table-column",{attrs:{align:"center",width:e.onAutoWidth(130),label:"工号"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==e.roleNum?i("span",[e._v("\n            "+e._s(t.row.login_id)+"\n          ")]):i("el-button",{attrs:{type:"text"},on:{click:function(i){e.handleEdit(t.$index,t.row)}}},[e._v("\n            "+e._s(t.row.login_id)+"\n          ")])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",width:e.onAutoWidth(140),label:"姓名",prop:"name"},scopedSlots:e._u([{key:"default",fn:function(t){return[""!==t.row.name.trim()&&null!==t.row.name.trim()||!e.showAdd?i("span",[e._v(e._s(e._f("changespance")(t.row.name)))]):i("el-button",{on:{click:function(i){e.handleDelete(t.row)}}},[e._v("删除")])]}}])}),e._v(" "),"2"==e.roleNum?i("el-table-column",{attrs:{align:"center",label:"流水线名称",prop:"PLName"}}):e._e(),e._v(" "),"2"!==e.roleNum?i("el-table-column",{attrs:{prop:"ProcessName",align:"left",label:"工序","header-align":"center","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("filterProcessName")(t.row))+"\n        ")]}}])}):e._e(),e._v(" "),"2"!==e.roleNum?i("el-table-column",{attrs:{prop:"ProcessName",align:"left","header-align":"center",label:"品类","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(e._f("filterCategories")(t.row))+"\n        ")]}}])}):e._e(),e._v(" "),i("el-table-column",{attrs:{prop:"phone",width:e.onAutoWidth(150),align:"center",label:"手机"}}),e._v(" "),i("el-table-column",{attrs:{prop:"last_time",formatter:e.ChangeDateFormat,width:e.onAutoWidth(180),align:"center",label:"登陆时间"}}),e._v(" "),"2"!==e.roleNum?i("el-table-column",{attrs:{prop:"computer",align:"center",label:"电脑"}}):e._e(),e._v(" "),"2"!==e.roleNum?i("el-table-column",{attrs:{prop:"mach_id",align:"center",label:"设备ID",width:e.onAutoWidth(90)}}):e._e(),e._v(" "),"2"!==e.roleNum?i("el-table-column",{attrs:{prop:"grouping",align:"center",label:"分组",width:e.onAutoWidth(90),formatter:e.selectGroup}}):e._e(),e._v(" "),i("el-table-column",{attrs:{width:e.onAutoWidth(140),align:"center",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return["2"==e.roleNum?i("el-select",{key:t.row.login_id,staticStyle:{"text-align":"center"},attrs:{placeholder:"请选择"},on:{change:function(i){e.handleState(t.row)}},model:{value:t.row.state,callback:function(e){t.row.state=e},expression:"scope.row.state"}},e._l(e.options,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):i("el-tag",{attrs:{type:e._f("statusFilter1")(t.row.state)}},[e._v("\n            "+e._s(e._f("statusFilter")(t.row.state)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"操作",width:e.onAutoWidth(180)},scopedSlots:e._u([{key:"default",fn:function(t){return[2==e.roleNum?i("el-button",{attrs:{size:"small",type:"danger"},on:{click:function(i){e.resetPwd({index:t.$index,row:t.row})}}},[e._v("\n            重置密码\n          ")]):i("el-button",{attrs:{size:"small",type:"success"},on:{click:function(i){e.handleEdit(t.$index,t.row)}}},[e._v("\n            编辑\n          ")])]}}])})],1),e._v(" "),i("Pagination",{attrs:{listQuery:e.listQuery,total:e.total},on:{PageChange:e.getList}}),e._v(" "),i("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"创建用户",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{ref:"form",attrs:{rules:e.rules,"label-width":"100px"}},[i("el-form-item",{attrs:{label:"工号：","label-width":e.formLabelWidth,prop:"login_id"}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"必填,输入纯数字工号",placement:"right"}},[i("el-input",{staticStyle:{width:"420px"},attrs:{maxlength:10,"auto-complete":"off"},model:{value:e.form.login_id,callback:function(t){e.form.login_id=e._n(t)},expression:"form.login_id"}})],1)],1),e._v(" "),"2"!==e.roleNum?i("el-form-item",{style:e.widthObj,attrs:{label:"工序：","label-width":e.formLabelWidth,prop:"process"}},[i("el-table",{staticClass:"check-process",staticStyle:{width:"75%"},attrs:{data:e.selectedOptions4,border:""}},[i("el-table-column",{attrs:{label:"生产类型",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.label)+"\n      ")]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"name",label:"工序",align:"left","header-align":"center",width:"","render-header":e.handleHelp},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-checkbox-group",{on:{change:function(t){e.handleCheckedCitiesChange(t)}},model:{value:e.showselectProcess,callback:function(t){e.showselectProcess=t},expression:"showselectProcess"}},e._l(t.row.options,function(t){return i("el-checkbox",{key:t.code,staticStyle:{width:"80px",margin:"0"},attrs:{label:t.code}},[e._v(e._s(t.name))])}))]}}])})],1)],1):e._e(),e._v(" "),e.isShowCategories?i("el-form-item",{attrs:{label:"品类：","label-width":e.formLabelWidth}},[i("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"必选,请选择品类",placement:"right"}},[i("el-select",{staticStyle:{width:"420px"},attrs:{disabled:e.isdisabled,"multiple-limit":10,multiple:"",placeholder:"请选择品类"},model:{value:e.categories,callback:function(t){e.categories=t},expression:"categories"}},e._l(e.categoriesOption,function(e){return i("el-option",{key:e.Id,attrs:{label:e.CategoryName,value:e.Id}})}))],1)],1):e._e(),e._v(" "),"2"!==e.roleNum?i("el-form-item",{attrs:{label:"分组：","label-width":e.formLabelWidth}},[[i("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"请选择分组",placement:"right"}},[i("el-select",{staticStyle:{width:"420px"},attrs:{disabled:e.isdisabled},model:{value:e.form.grouping,callback:function(t){e.$set(e.form,"grouping",t)},expression:"form['grouping']"}},e._l(e.groups,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)]],2):e._e(),e._v(" "),"create"==e.dialogStatus?i("el-form-item",{attrs:{label:"姓名：","label-width":e.formLabelWidth}},[i("el-input",{staticStyle:{width:"420px"},model:{value:e.form.name,callback:function(t){e.form.name=t},expression:"form.name"}}),e._v(" "),i("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"姓名选填，未设置姓名的员工将无法申请任务！",placement:"top"}},[i("span",[i("img",{staticClass:"backFile",attrs:{src:"static/img/icon_help.png",alt:""}})])])],1):e._e(),e._v(" "),"create"==e.dialogStatus?i("el-form-item",{attrs:{label:"手机：","label-width":e.formLabelWidth}},[i("el-input",{staticStyle:{width:"420px"},attrs:{minlength:11,maxlength:11},model:{value:e.form.phone,callback:function(t){e.form.phone=t},expression:"form.phone"}})],1):e._e()],1),e._v(" "),i("div",{staticClass:"dialog-footer",slot:"footer"},["create"==e.dialogStatus?i("span",[i("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.create("form")}}},[e._v("确 定")])],1):e._e()])],1),e._v(" "),i("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"修改",visible:e.UpdateDialogFormVisible},on:{"update:visible":function(t){e.UpdateDialogFormVisible=t}}},[i("el-form",{ref:"form",attrs:{rules:e.rules,"label-width":"100px"}},["2"!==e.roleNum?i("el-form-item",{attrs:{label:"工序：","label-width":e.formLabelWidth,prop:"process"}},[i("el-table",{staticClass:"check-process",staticStyle:{width:"75%"},attrs:{data:e.selectedOptions4,border:""}},[i("el-table-column",{attrs:{label:"类型",width:"180",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.label)+"\n      ")]}}])}),e._v(" "),i("el-table-column",{attrs:{prop:"name",label:"工序",align:"left","header-align":"center",width:"","render-header":e.handleHelp},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-checkbox-group",{on:{change:function(t){e.handleCheckedCitiesChange(t)}},model:{value:e.showselectProcess,callback:function(t){e.showselectProcess=t},expression:"showselectProcess"}},e._l(t.row.options,function(t){return i("el-checkbox",{key:t.code,staticStyle:{width:"80px"},attrs:{label:t.code}},[e._v(e._s(t.name))])}))]}}])})],1)],1):e._e(),e._v(" "),e.isShowCategories?i("el-form-item",{attrs:{label:"品类：","label-width":e.formLabelWidth}},[i("el-select",{staticStyle:{width:"420px"},attrs:{disabled:e.isdisabled,multiple:"",placeholder:"请选择品类"},model:{value:e.categories,callback:function(t){e.categories=t},expression:"categories"}},e._l(e.categoriesOption,function(e){return i("el-option",{key:e.Id,attrs:{label:e.CategoryName,value:e.Id}})}))],1):e._e(),e._v(" "),"2"!==e.roleNum?i("el-form-item",{attrs:{label:"设备ID：",prop:"mach_id","label-width":e.formLabelWidth}},[i("el-input",{staticStyle:{width:"420px"},attrs:{disabled:e.isdisabled,"auto-complete":"off",maxlength:10},model:{value:e.form.mach_id,callback:function(t){e.form.mach_id=t},expression:"form.mach_id"}})],1):e._e(),e._v(" "),i("el-form-item",{attrs:{label:"状态：","label-width":e.formLabelWidth}},[[i("el-select",{staticStyle:{width:"420px"},model:{value:e.form.state,callback:function(t){e.form.state=t},expression:"form.state"}},e._l(e.options,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))]],2),e._v(" "),"2"!==e.roleNum?i("el-form-item",{attrs:{label:"分组：","label-width":e.formLabelWidth}},[[i("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"请选择分组",placement:"right"}},[i("el-select",{staticStyle:{width:"420px"},attrs:{disabled:e.isdisabled},model:{value:e.form.grouping,callback:function(t){e.$set(e.form,"grouping",t)},expression:"form['grouping']"}},e._l(e.groups,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)]],2):e._e()],1),e._v(" "),i("div",{staticClass:"dialog-footer",slot:"footer"},[i("el-button",{attrs:{type:"danger"},on:{click:function(t){e.resetPwd(e.currentSelect)}}},[e._v("\n          重置密码\n        ")]),e._v(" "),i("el-button",{on:{click:function(t){e.UpdateDialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.form)}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},NlWJ:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("BO1k"),s=i.n(a),o=i("//Fk"),r=i.n(o),l=i("Xxa5"),n=i.n(l),c=i("exGp"),u=i.n(c),d=i("bOdI"),h=i.n(d),m=i("TG9w"),f=i("TIfe"),p=(i("NYxO"),i("E4LH")),g=i("1onU"),b=i.n(g),v=0,_=function(e,t,a){t?i.i(p.a)(t)?a():a(new Error("请输入正确的11位手机号码")):a(new Error("请输入电话号码"))};t.default={name:"user",components:{Pagination:b.a},data:function(){var e;return e={value:0,arr:[],state:0,showselect:"",proName:"",processTip:"",categories:[],categoriesOption:[],showselectProcess:[],styleWidth:"width:180px",islimit:3,selectindex:null,options1:[{value:"A",label:"成衣改版",children:[]},{value:"D",label:"成衣大货",children:[]}],options2:[{value:"C",label:"团订大货",children:[]},{value:"B",label:"团订改版",children:[]}],options3:[{value:"A",label:"成衣改版",children:[]},{value:"D",label:"成衣大货",children:[]}],options4:[{value:"C",label:"团订大货",children:[]},{value:"B",label:"团订改版",children:[]}],processList:[],processType:[{value:"CD",label:"成衣生产"},{value:"TD",label:"团订生产"},{value:"GD",label:"个订生产"},{value:"TG",label:"团订改版"},{value:"CG",label:"成衣改版"},{value:"OtherG",label:"其他改版"}],select:0,selectedOptions3:[],selectedOptions4:[],groups:[{value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"},{value:4,label:"4"},{value:0,label:"不分组"}],options:[{value:0,label:"正常"},{value:1,label:"病假"},{value:3,label:"转岗"},{value:5,label:"离职"}],form:{state:0,group:0,processType:null,login_id:"",name:"",phone:"",codes:[]},formName:"",formPhone:"",rules:{login_id:[{type:"number",message:"请输入数字"}],UserName:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],Phone:[{required:!0,validator:_,message:"请输入手机号",trigger:"blur"},{min:11,max:11,message:"长度在11个字符",trigger:"blur"}],phone:[{required:!1,validator:_,message:"请输入手机号",trigger:"blur"},{min:11,max:11,message:"长度在11个字符",trigger:"blur"}]},list:null,user:"",total:null,listLoading:!0,widthObj:{},showAdd:null,listQuery:{page:1,limit:Number(localStorage.getItem("totalPage")||10),name:void 0},sexOptions:["男","女"],dialogFormVisible:!1},h()(e,"formPhone",""),h()(e,"dialogStatus",""),h()(e,"userManager_btn_edit",!0),h()(e,"userManager_btn_del",!0),h()(e,"userManager_btn_add",!0),h()(e,"textMap",{update:"编辑",create:"创建"}),h()(e,"formLabelWidth","80px"),h()(e,"tableKey",0),h()(e,"roleNum",i.i(f.b)()),h()(e,"isdisabled",!1),h()(e,"UpdateDialogFormVisible",!1),h()(e,"currentSelect",{}),h()(e,"checkAll",!0),h()(e,"checkedCodes",[]),h()(e,"isIndeterminate",!0),e},filters:{statusFilter:function(e){return["正常","病假","","转岗","","离职"][e]},statusFilter1:function(e){return{0:"primary",1:"success",2:"warning",3:"danger"}[e]},filterProcessName:function(e){return null==e.ProcessName?"":e.ProcessName.map(function(e){return e.CodeName.includes("TD")?e.CodeName.replace("TD","团"):e.CodeName.includes("GD")?e.CodeName.replace("GD","个"):e.CodeName.includes("CD")?e.CodeName.replace("CD","成"):e.CodeName.includes("TG")?e.CodeName.replace("TG","改"):e.CodeName.includes("CG")?e.CodeName.replace("CG","改"):e.CodeName}).join(" ")},filterCategories:function(e){return null==e.CategoryName?"":e.CategoryName.map(function(e){return e.CategoryName}).join(" ")},changespance:function(e){return e.replace(/\s+/g,"")}},watch:{dialogFormVisible:function(e,t){setTimeout(function(){},100),0==e&&(this.showselectProcess=[],this.categories=[],v=0)},showselectProcess:function(e){}},created:function(){var e=this;return u()(n.a.mark(function t(){return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getCategory(e.$store.state.user.PLID);case 2:e.getList(e.listQuery),e.getPer(),e.showAdd="1"==i.i(f.b)(),"2"==i.i(f.b)()&&(e.isdisabled=!0);case 6:case"end":return t.stop()}},t,e)}))()},computed:{isShowCategories:{get:function(){return!0}}},methods:{handleHelp:function(e,t){return e("el-tooltip",{class:"item",attrs:{effect:"light",content:"工序必选,请选择工序！",placement:"top"}},[e("span",[t.column.label,e("img",{attrs:{src:"static/img/icon_help.png",alt:""},class:"backFile"})])])},handleCheckedCitiesChange:function(e){console.log(e),this.form.codes=e},onAutoWidth:function(e){return 2==this.roleNum?"":e},onCleanCategory:function(e){var t=this;return e.map(function(e){if(null==e.CategoryName)return e;e.CategoryName=e.CategoryName.filter(function(e){return t.categoriesOption.findIndex(function(t){return t.Id==e.Id})>=0})}),e},getCategory:function(e){var t=this;return new r.a(function(a){i.i(m.h)({PLID:e}).then(function(e){200==e.status&&(t.categoriesOption=e.data.rows),a()})})},getPer:function(){var e=this;"2"!==i.i(f.b)()&&i.i(m.f)().then(function(t){e.user=t.data.PLID,e.handleSelectProcess({id:t.data.PLID})})},showProcessArr:function(e){var t=this;i.i(m.g)(e).then(function(e){var i=e.data.rows,a=!0,o=!1,r=void 0;try{for(var l,n=s()(i);!(a=(l=n.next()).done);a=!0){var c=l.value;if(1==c.state){var u={};u.value=c.code,u.label=c.name,t.options1[0].children.push(u)}}}catch(e){o=!0,r=e}finally{try{!a&&n.return&&n.return()}finally{if(o)throw r}}t.selectedOptions4=t.options1[0].children})},showProcessArr1:function(e){var t=this;this.options1[0].children=[],this.options1[1].children=[],this.options2[0].children=[],this.options2[1].children=[],i.i(m.g)(e).then(function(e){var i=e.data.rows,a=!0,o=!1,r=void 0;try{for(var l,n=s()(i);!(a=(l=n.next()).done);a=!0){var c=l.value;if(1==c.state){var u={};u.value=c.code,u.label=c.name,t.options1[0].children.push(u)}}}catch(e){o=!0,r=e}finally{try{!a&&n.return&&n.return()}finally{if(o)throw r}}})},changeShow:function(e){v=1},changeSelected:function(e){this.form.codes=e},removeSelected:function(e){},handleState:function(e){var t=this;e.ProcessName.map(function(e){t.form.codes.push(e.Code)}),e.codes=this.form.codes,i.i(m.b)(e).then(function(e){200===e.status?(t.dialogFormVisible=!1,t.$message({message:e.tip,type:"success",duration:2e3}),t.getList(t.listQuery)):t.$message({message:e.tip,type:"warning",duration:2e3})})},handleChange:function(e){this.form.code=e[1],this.selectedOptions3=e},getList:function(e){var t=this;this.listQuery=e,this.listLoading=!0,i.i(m.a)(this.listQuery).then(function(e){t.list=t.onCleanCategory(e.data.rows),t.total=e.data.total,t.listLoading=!1}).catch(function(e){t.listLoading=!1})},change:function(e){var t=this;i.i(m.b)(e).then(function(e){200===e.status?(t.dialogFormVisible=!1,t.$message({offset:700,title:"成功",message:"更新成功",type:"success",duration:2e3})):t.$message({offset:700,message:e.error,type:"warning",duration:2e3})})},handleSizeChange:function(e){this.listQuery.limit=e,this.getList(this.listQuery)},handleCurrentChange:function(e){this.listQuery.page=e,this.getList(this.listQuery)},handleCreate:function(){var e=this;this.resetTemp(),this.showselectProcess=[],this.islimit=3,this.dialogStatus="create",this.dialogFormVisible=!0,i.i(m.i)({id:this.user}).then(function(t){e.processTip=t.tip})},handleSelectProcess:function(e){var t=this;i.i(m.i)(e).then(function(e){if(200==e.status){var i=t.groupbyProcess(e.data.rows),a=[];for(var s in i)!function(e){var s={options:[],label:""};i[e].map(function(e){1==e.state&&s.options.push({name:e.name,code:e.code})}),t.processType.map(function(t){t.value==e&&(s.label=t.label)}),a.push(s)}(s);t.selectedOptions4=a}})},groupbyProcess:function(e){var t={};return e.map(function(e){t.hasOwnProperty(e.type)?t[e.type].push(e):t[e.type]=[e]}),t},getProcseeArr:function(e){},handleEdit:function(e,t){var a=this;if(this.showselectProcess=[],this.currentSelect={index:e,row:t},"2"==i.i(f.b)()){this.showProcessArr1(t.PLID);var s=[];this.form=this.list[e],this.proName=t.name,this.UpdateDialogFormVisible=!0,this.currentIndex=e}var s=[];this.form=this.list[e],this.proName=t.name,this.UpdateDialogFormVisible=!0,this.currentIndex=e,t.ProcessName.map(function(e){a.showselectProcess.push(e.Code)}),this.form.codes=this.showselectProcess;var s=[];null!=t.CategoryName&&t.CategoryName.forEach(function(e){s.push(e.Id)}),this.categories=s},selectGroup:function(e){return 0==e.grouping?"不分组":e.grouping},processSelect:function(e){e.indexOf(35)},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.i(m.d)(e).then(function(i){200==i.status?(t.$message({type:"success",message:i.tip}),e.login_id==t.$store.state.user.login_id&&t.$store.dispatch("FedLogOut").then(function(){location.reload()}),t.getList(t.listQuery)):(t.$message({type:"error",message:i.tip}),t.getList(t.listQuery))})})},resetPwd:function(e){var t=this,a=(e.index,e.row);this.$confirm("此操作将重置密码, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.password=888888,a.codes=t.form.codes,i.i(m.b)(a).then(function(e){200==e.status?t.$message({message:"重置成功密码为888888",type:"success",duration:2e3}):t.$message({message:e.tip,type:"error",duration:2e3})})})},create:function(e){var t=this;this.$refs;this.form.plid=this.user;var a=/^[0-9]{1,10}$/;if(void 0==this.form.login_id)return this.$message({showClose:!0,message:"请输入数字工号!",type:"error",duration:2e3}),!1;if(!a.test(this.form.login_id))return this.$message({showClose:!0,message:"输入工号有误!",type:"error",duration:2e3}),!1;if(parseInt(this.form.login_id)>2147483647)return this.$message({showClose:!0,message:"工号输入值过大！",type:"error"}),!1;if(0==this.showselectProcess.length)return this.$message({showClose:!0,message:"请选择工序",type:"error",duration:2e3}),!1;if(void 0!=this.form.phone){if(!i.i(p.a)(this.form.phone))return this.$message({showClose:!0,message:"请输入正确的手机号！",type:"error",duration:2e3}),!1}else this.form.phone="";if(0==this.categories.length)return this.$message({showClose:!0,message:"请选择品类！",type:"error",duration:2e3}),!1;var s=[];this.categoriesOption.map(function(e,i){for(var a=0;a<t.categories.length;a++)t.categories[a]==e.Id&&s.push(e)}),this.form.categories=s,this.form.name=this.form.name.replace(/\s+/g,""),i.i(m.e)(this.form).then(function(e){200==e.status?(t.dialogFormVisible=!1,t.getList(t.listQuery),t.$message({offset:700,title:"成功",message:e.tip,type:"success",duration:2e3})):201==e.status&&(t.dialogFormVisible=!1,t.$message({offset:700,title:"失败",message:e.tip,type:"warning",duration:2e3}),t.getList(t.listQuery))})},cancel:function(e){this.dialogFormVisible=!1,this.$refs[e].resetFields(),this.getList(this.listQuery)},update:function(e){var t=this,a=/^[0-9]{1,10}$/;if(this.form.plid=this.user,0==this.showselectProcess.length)return this.$message({showClose:!0,message:"请选择工序",type:"error",duration:2e3}),!1;if(0==this.categories.length)return this.$message({showClose:!0,message:"请选择品类！",type:"error",duration:2e3}),!1;var s=[];this.categoriesOption.map(function(e,i){for(var a=0;a<t.categories.length;a++)t.categories[a]==e.Id&&s.push(e)}),this.form.categories=s,a.test(this.form.mach_id)?parseInt(this.form.mach_id)>2147483647?this.$message({showClose:!0,message:"输入值过大！",type:"error"}):i.i(m.b)(this.form).then(function(e){200===e.status?(t.dialogFormVisible=!1,t.UpdateDialogFormVisible=!1,t.$message({title:"成功",message:e.tip,type:"success",duration:2e3}),t.getList(t.listQuery)):t.$message({message:e.tip,type:"warning",duration:2e3})}):this.$message({showClose:!0,message:"输入有误,请输入数字！",type:"error",duration:2e3})},resetTemp:function(){this.form={},this.form.phone="",this.categories=[],this.form.name="",this.selectedOptions3=[]}}}},R4r1:function(e,t,i){var a=i("wxKm");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i("rjj0")("639b7b02",a,!0)},Tl1r:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,50],"page-size":e.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)},staticRenderFns:[]}},"VT+v":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("woOf"),s=i.n(a);t.default={name:"Pagination",props:{total:{type:Number,default:0},listQuery:{type:Object}},data:function(){return{limit:0,currentPage:0}},methods:{handleSizeChange:function(e){var t=s()({},this.listQuery);t.page=1,t.limit=e,this.limit=e,this.currentPage=1,localStorage.setItem("totalPage",this.limit),this.$emit("PageChange",t)},handleCurrentChange:function(e){var t=s()({},this.listQuery);t.page=e,this.currentPage=e,t.limit=this.limit,this.$emit("PageChange",t)}},created:function(){this.limit=Number(localStorage.getItem("totalPage")||this.listQuery.limit),this.currentPage=this.listQuery.page}}},bOdI:function(e,t,i){"use strict";t.__esModule=!0;var a=i("C4MV"),s=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default=function(e,t,i){return t in e?(0,s.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},cgTB:function(e,t,i){function a(e){i("EVbc"),i("R4r1")}var s=i("VU/8")(i("NlWJ"),i("HXED"),a,"data-v-57bad07f",null);e.exports=s.exports},mClu:function(e,t,i){var a=i("kM2E");a(a.S+a.F*!i("+E39"),"Object",{defineProperty:i("evD5").f})},wxKm:function(e,t,i){t=e.exports=i("FZ+f")(!1),t.push([e.i,".check-process[data-v-57bad07f] .el-checkbox+.el-checkbox{margin-left:0}",""])},xv1r:function(e,t,i){t=e.exports=i("FZ+f")(!1),t.push([e.i,"",""])}});