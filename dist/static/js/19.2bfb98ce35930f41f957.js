webpackJsonp([19],{"0Dnf":function(e,t,a){"use strict";a.d(t,"c",function(){return s}),a.d(t,"a",function(){return l}),a.d(t,"b",function(){return i});var s="td",l="gd",i="dh"},"18fe":function(e,t,a){"use strict";function s(e){return a.i(p.a)({url:"/bmapi/pl",method:"get",params:e})}function l(e){return a.i(p.a)({url:"/bmapi/pl",method:"post",data:e})}function i(e){return a.i(p.a)({url:"/bmapi/process?id="+e,method:"get"})}function r(e){return a.i(p.a)({url:"/bmapi/staffmanager/"+e,method:"delete"})}function o(e){return a.i(p.a)({url:"/bmapi/pl",method:"put",data:e})}function n(e){return a.i(p.a)({url:"/bmapi/pl/setplforuser",method:"post",data:e})}function c(e){return a.i(p.a)({url:"/bmapi/UpdateWeight",method:"post",data:e})}function u(e){return a.i(p.a)({url:"/bmapi/UpdatePlName",method:"post",data:e})}function d(e){return a.i(p.a)({url:"/bmapi/pl/updateprocess",method:"post",data:e})}t.a=s,t.e=l,t.c=i,t.d=r,t.b=o,t.i=n,t.f=c,t.g=u,t.h=d;var p=a("Vo7i")},CCEv:function(e,t,a){"use strict";function s(){return a.i(o.a)({url:"/bmapi/category",method:"get"})}function l(e){return a.i(o.a)({url:"/bmapi/category",method:"post",data:e})}function i(e){return a.i(o.a)({url:"/bmapi/category",method:"delete",data:e})}function r(e){return a.i(o.a)({url:"/bmapi/PLCategory/UpdatePLCategory",method:"post",data:e})}t.a=s,t.c=l,t.d=i,t.b=r;var o=a("Vo7i")},E4LH:function(e,t,a){"use strict";function s(e){return/^1[3|4|5|7|8][0-9]\d{8}$/.test(e)}t.a=s},Iw2h:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-table",{staticStyle:{width:"100%","min-height":"258px"},attrs:{data:e.table,"default-sort":{prop:"code",order:"descending"}}},[a("el-table-column",{attrs:{prop:"name",align:"center",label:"工序名称"}}),e._v(" "),a("el-table-column",{attrs:{"class-name":"status-col",label:"是否跳过",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.assign&&"TD"!==t.row.type?a("el-switch",{attrs:{"on-value":0,"off-value":1,"off-color":"#ff4949","on-color":"#13ce66","on-text":"是","off-text":"否"},on:{change:function(a){e.setChange(t.$index,t.row)}},model:{value:t.row.state,callback:function(e){t.row.state=e},expression:"scope.row.state"}}):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"权重",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-select",{key:t.row.PLID,attrs:{placeholder:"权重",disabled:0==t.row.state},on:{change:function(a){e.weightChange(t.row)}},model:{value:t.row.weight,callback:function(e){t.row.weight=e},expression:"scope.row.weight"}},[a("el-option",{attrs:{label:"0.5",value:"0.5"}}),e._v(" "),a("el-option",{attrs:{label:"1",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"1.5",value:"1.5"}}),e._v(" "),a("el-option",{attrs:{label:"2",value:"2"}})],1)]}}])})],1)},staticRenderFns:[]}},T96P:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container calendar-list-container"},[a("div",{staticClass:"filter-container"},[e.showAdd?a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"edit"},on:{click:e.handleCreate}},[e._v("添加")]):e._e()],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,attrs:{data:e.list,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"流水线","render-header":e.handleHelp},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){e.handleName(t.$index,t.row)}}},[e._v("\n          "+e._s(t.row.name)+"\n        ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"type",align:"center",label:"类型","render-header":e.handleHelp3},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text"},on:{click:function(a){e.handleShowSelectType(t.row,"Process")}}},[e._v("\n          "+e._s(e._f("typeStyle")(t.row))+"\n        ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"type",align:"center",label:"品类",width:"360","render-header":e.handleHelp4},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticClass:"SelectType",attrs:{type:"text",title:e.selectCategoryValue(t.row.PLCategory)},on:{click:function(a){e.handleShowSelectType(t.row,"Category")}}},[e._v("\n          "+e._s(e.selectCategoryValue(t.row.PLCategory))+"\n        ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"主管","render-header":e.handleHelp1},scopedSlots:e._u([{key:"default",fn:function(t){return[e.showAdd?a("el-button",{attrs:{size:"small",type:"text"},on:{click:function(a){e.handleUpdate(t.row)}}},[e._v("\n          "+e._s(e._f("isName")(t.row))+"\n        ")]):a("span",[e._v(" "+e._s(t.row.UserName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small",type:"success"},on:{click:function(a){e.handleEdit(t.$index,t.row)}}},[e._v("\n          编辑\n        ")])]}}])})],1),e._v(" "),"updatePL"==e.dialogif?a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],key:"updatePL",attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,"close-on-press-escape":!1,"custom-class":"WaterLineDialog"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"流水线：","label-width":e.formLabelWidth,prop:"name"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"必填,3到11个字符","auto-complete":"off",disabled:"create"!==e.dialogStatus},model:{value:e.form.name,callback:function(t){e.form.name=t},expression:"form.name"}})],1),e._v(" "),"create"==e.dialogStatus?a("el-form-item",{attrs:{label:"类型："}},[a("el-select",{style:Object.assign({},e.newWidthObj,{minWidth:"400px"}),attrs:{multiple:""},on:{change:function(t){e.getDomWidth("CreatecurrentSelectProcess")}},model:{value:e.currentSelectProcess,callback:function(t){e.currentSelectProcess=t},expression:"currentSelectProcess"}},[a("el-option",{key:"CG",attrs:{label:"成衣改版",value:"CG"}}),e._v(" "),a("el-option",{key:"TG",attrs:{label:"团订改版",value:"TG"}}),e._v(" "),a("el-option",{key:"CD",attrs:{label:"成衣生产",value:"CD"}}),e._v(" "),a("el-option",{key:"TD",attrs:{label:"团订生产",value:"TD"}}),e._v(" "),a("el-option",{key:"GD",attrs:{label:"个订生产",value:"GD"}})],1)],1):e._e(),e._v(" "),"create"==e.dialogStatus?a("el-form-item",{attrs:{label:"品类："}},[a("el-select",{ref:"category",style:Object.assign({},e.widthObj,{minWidth:"400px"}),attrs:{multiple:""},on:{change:function(t){e.getDomWidth("categoryValue")}},model:{value:e.categoryValue,callback:function(t){e.categoryValue=t},expression:"categoryValue"}},e._l(e.categoryArr,function(e){return a("el-option",{key:e.Id,attrs:{label:e.CategoryName,value:e.Id}})}))],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"主管工号：","label-width":e.formLabelWidth,prop:"login_id"}},[a("el-input",{staticStyle:{width:"400px"},attrs:{placeholder:"必填,请输入主管工号",type:"number","auto-complete":"off"},model:{value:e.form.login_id,callback:function(t){e.form.login_id=t},expression:"form.login_id"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("取 消")]),e._v(" "),"create"==e.dialogStatus?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.create("form")}}},[e._v("确 定")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updateForm("form")}}},[e._v("确 定")])],1)],1):e._e(),e._v(" "),"updateProcess"==e.dialogif?a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],key:"updateProcess",attrs:{title:e.dialogtitleProcess,visible:e.dialogFormVisible,width:"100%","close-on-press-escape":!1,"custom-class":"WaterLineDialog"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("span",{slot:"title"},[a("span",{staticStyle:{"font-weight":"550","font-size":"15px"}},[e._v(e._s(e.dialogtitleProcess))]),e._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"light",placement:"bottom"}},[a("span",{slot:"content"},[e._v("\n        1.跳过工序只能选择两道工序。 "),a("br"),e._v("\n        2.更改对应工序的权重即改变了当前工序对应的工价。\n      ")]),e._v(" "),a("img",{staticClass:"backFile",attrs:{src:"static/img/icon_help.png",alt:"",srcset:""}})])],1),e._v(" "),0!=e.currentSelectType.length?a("el-tabs",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{type:"card"},on:{"tab-click":e.handleSelectType},model:{value:e.currentSelectType,callback:function(t){e.currentSelectType=t},expression:"currentSelectType"}},[e.onShowProcess("CG")?a("el-tab-pane",{attrs:{label:"成衣改版",name:"CG"}},[a("ProcessTable",{key:e.currentSelectType,attrs:{tableData:e.allTypeTable,process:"CG"},on:{deleProcess:e.handleDeleteProcess}})],1):e._e(),e._v(" "),e.onShowProcess("TG")?a("el-tab-pane",{attrs:{label:"团订改版",name:"TG"}},[a("ProcessTable",{key:e.currentSelectType,attrs:{tableData:e.allTypeTable,process:"TG"},on:{deleProcess:e.handleDeleteProcess}})],1):e._e(),e._v(" "),e.onShowProcess("CD")?a("el-tab-pane",{attrs:{label:"成衣生产",name:"CD"}},[a("ProcessTable",{key:e.currentSelectType,attrs:{tableData:e.allTypeTable,process:"CD"},on:{deleProcess:e.handleDeleteProcess}})],1):e._e(),e._v(" "),e.onShowProcess("TD")?a("el-tab-pane",{attrs:{label:"团订生产",name:"TD"}},[a("ProcessTable",{key:e.currentSelectType,attrs:{tableData:e.allTypeTable,process:"TD"},on:{deleProcess:e.handleDeleteProcess}})],1):e._e(),e._v(" "),e.onShowProcess("GD")?a("el-tab-pane",{attrs:{label:"个订生产",name:"GD"}},[a("ProcessTable",{key:e.currentSelectType,attrs:{tableData:e.allTypeTable,process:"GD"},on:{deleProcess:e.handleDeleteProcess}})],1):e._e()],1):a("el-table",{staticStyle:{padding:"0"}},[a("el-table-column",{attrs:{align:"center",label:"名称"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"是否跳过"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"权重"}})],1)],1):e._e(),e._v(" "),"updateName"==e.dialogif?a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],key:"updateName",attrs:{title:e.dialogtitleProcess,visible:e.dialogFormVisible,"close-on-press-escape":!1,"custom-class":"WaterLineDialog"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"updateForm",attrs:{"label-width":"100px",porp:"name"}},[a("el-form-item",{attrs:{label:"流水线：","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"220px"},attrs:{"auto-complete":"off",disabled:!0},model:{value:e.form.name,callback:function(t){e.form.name=t},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"新流水线名称","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"220px"},attrs:{placeholder:"必填,3到11个字符","auto-complete":"off",minlength:3},model:{value:e.newName,callback:function(t){e.newName=t},expression:"newName"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.cancel("form")}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updatePLName()}}},[e._v("确 定")])],1)],1):e._e(),e._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],key:"WaterLineDialog",attrs:{title:e.dialogtitleProcess,visible:e.ReSelectType,"close-on-press-escape":!1,"custom-class":"WaterLineDialog"},on:{"update:visible":function(t){e.ReSelectType=t}}},[a("el-form",{ref:"updateForm",attrs:{"label-width":"100px",porp:"name"}},["Process"==e.categoryOrProcess?a("el-form-item",{attrs:{label:"类型："}},[a("el-select",{ref:"currentSelectProcess",style:e.widthObj,attrs:{multiple:""},on:{change:function(t){e.getDomWidth("currentSelectProcess")}},model:{value:e.currentSelectProcess,callback:function(t){e.currentSelectProcess=t},expression:"currentSelectProcess"}},[a("el-option",{key:"CG",attrs:{label:"成衣改版",value:"CG"}}),e._v(" "),a("el-option",{key:"TG",attrs:{label:"团订改版",value:"TG"}}),e._v(" "),a("el-option",{key:"CD",attrs:{label:"成衣生产",value:"CD"}}),e._v(" "),a("el-option",{key:"TD",attrs:{label:"团订生产",value:"TD"}}),e._v(" "),a("el-option",{key:"GD",attrs:{label:"个订生产",value:"GD"}})],1)],1):e._e(),e._v(" "),"Category"==e.categoryOrProcess?a("el-form-item",{attrs:{label:"品类："}},[a("el-select",{ref:"category",style:e.widthObj,attrs:{multiple:""},on:{change:function(t){e.getDomWidth("currentSelectCategory")}},model:{value:e.currentSelectCategory,callback:function(t){e.currentSelectCategory=t},expression:"currentSelectCategory"}},e._l(e.categoryArr,function(e){return a("el-option",{key:e.Id,attrs:{label:e.CategoryName,value:e.Id}})}))],1):e._e()],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.ReSelectType=!1}}},[e._v("取 消")]),e._v(" "),"Process"==e.categoryOrProcess?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleSureType()}}},[e._v("确 定")]):e._e(),e._v(" "),"Category"==e.categoryOrProcess?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.handleSureCategory()}}},[e._v("确 定")]):e._e()],1)],1)],1)},staticRenderFns:[]}},THhK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("18fe");t.default={name:"ProcessTable",props:{tableData:{type:Array,required:!0},process:{type:String,required:!0}},data:function(){return{table:[],setForm:{}}},watch:{tableData:function(){this.initData()}},created:function(){this.initData()},methods:{initData:function(){var e=this;this.table=this.tableData.filter(function(t){return t.type==e.process})},setChange:function(e,t){var a=[],s=0;this.table.forEach(function(e){1==e.assign&&1==e.state&&(a.push(1),s=e.code)}),0==t.state?(this.resetForm(),this.setForm.delcode=t.code,this.setForm.setcode=s,this.setForm.name="",this.setForm.id=t.PLID,this.setForm.type=t.type,"CD"==this.process?this.setForm.type="dh":this.setForm.type=this.process.toLowerCase(),this.update(this.setForm,e)):(this.resetForm(),this.setForm.delcode=0,this.setForm.setcode=t.code,this.setForm.name=t.name,this.setForm.id=t.PLID,this.setForm.type=t.type,this.update(this.setForm))},weightChange:function(e){var t=this;a.i(s.f)(e).then(function(e){200==e.status?t.$message({message:e.tip,type:"success",duration:2e3}):t.$message({message:e.tip,type:"error",duration:2e3})})},resetForm:function(){this.setForm={delcode:0,setcode:0,name:"",id:0}},update:function(e,t){var l=this;a.i(s.b)(e).then(function(t){200==t.status?(l.$message({type:"success",message:t.tip,duration:2e3}),l.$emit("deleProcess",e.delcode,l.process,e)):l.$message({type:"error",message:t.tip,duration:2e3})})}}}},WEdy:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".el-table .warning-row{background:oldlace}.SelectType{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:340px}.processChange .el-dialog__body{padding:10px 20px 75px}.el-dialog__title{font-size:15px}.processChange .item{position:relative;bottom:2px}.waterline{position:relative;top:0;bottom:0;left:0;right:0}.WaterLineDialog{min-width:600px}",""])},fQXG:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("Dd8w"),l=a.n(s),i=a("18fe"),r=(a("NYxO"),a("jrjv")),o=a.n(r),n=(a("0Dnf"),a("TIfe")),c=a("CCEv"),u=a("E4LH"),d=function(e,t,s){t?a.i(u.a)(t)?s():s(new Error("请输入正确的11位手机号码")):s(new Error("请输入电话号码"))};t.default={name:"user",components:{ProcessTable:o.a},data:function(){return{isDisabled:!1,loading:!0,showAdd:!1,value:0,dialogif:null,dialogtitleProcess:"",ReSelectType:!1,options1:[{value:"A",label:"成衣改版",children:[{value:"11",label:"下载样板"},{value:"13",label:"修改样板"},{value:"15",label:"放码"},{value:"16",label:"检查尺寸"},{value:"18",label:"估算用量"}]},{value:"B",label:"团订改版",children:[{value:"22",label:"下载样板"},{value:"23",label:"修改样板"},{value:"25",label:"放码"},{value:"26",label:"检查尺寸"},{value:"27",label:"改驱动规则"}]}],processType:[{value:"CD",label:"成衣生产"},{value:"TD",label:"团订生产"},{value:"GD",label:"个订生产"},{value:"TG",label:"团订改版"},{value:"CG",label:"成衣改版"},{value:"OtherG",label:"其他改版"}],form:{UserName:void 0,Phone:void 0,State:1,Up:void 0,Down:0,MAC:void 0,Remark:"",type:[],weight:0,TG:!1,CG:!1,OtherG:!1,GD:!1,TD:!1,CD:!1},newName:"",setForm:{delCode:0,setCode:0,name:"",id:0},rules:{name:[{required:!0,message:"请输入",trigger:"blur"},{min:3,max:11,message:"长度在 3 到 11 个字符",trigger:"blur"}],login_id:[{required:!0,message:"请输入",trigger:"blur"}],UserName:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],Phone:[{required:!0,validator:d,message:"请输入手机号",trigger:"blur"},{min:11,max:11,message:"长度在11个字符",trigger:"blur"}]},list:null,list1:[],arr:[],total:null,listLoading:!0,isSelect:!1,listQuery:{page:1,limit:15,name:void 0},sexOptions:["男","女"],dialogFormVisible:!1,formPhone:"",dialogStatus:"",userManager_btn_edit:!0,userManager_btn_del:!0,userManager_btn_add:!0,textMap:{update:"编辑",create:"创建"},formLabelWidth:"100px",tableKey:0,currentSelectType:"",showType:[],allTypeTable:[],currentSelectProcess:[],currentPLID:0,categoryValue:[],categoryArr:[],currentSelectCategory:[],categoryOrProcess:"",widthObj:{},newWidthObj:{}}},created:function(){var e=this;this.getList(),this.showAdd="2"==a.i(n.b)(),a.i(c.a)().then(function(t){200==t.status&&(e.categoryArr=t.data.rows)})},computed:{},watch:{ReSelectType:function(e){e||(this.currentSelectProcess=[])},dialogFormVisible:function(e){e||(this.currentSelectProcess=[],this.currentSelectType="")}},methods:{handleDeleteProcess:function(e,t,a){},selectCategoryValue:function(e){if(e){return this.categoryArr.filter(function(t){return!!e.includes(t.Id)}).map(function(e){return e.CategoryName}).join(" / ")}return"暂未选择品类"},handleHelp:function(e,t){return e("el-tooltip",{class:"item",attrs:{effect:"light",content:"点击修改流水线信息",placement:"top"}},[e("span",[t.column.label,e("img",{attrs:{src:"static/img/icon_help.png",alt:""},class:"backFile"})])])},handleHelp3:function(e,t){return e("el-tooltip",{class:"item",attrs:{effect:"light",content:"点击修改流水线类型",placement:"top"}},[e("span",[t.column.label,e("img",{attrs:{src:"static/img/icon_help.png",alt:""},class:"backFile"})])])},handleHelp4:function(e,t){return e("el-tooltip",{class:"item",attrs:{effect:"light",content:"点击修改流水线品类",placement:"top"}},[e("span",[t.column.label,e("img",{attrs:{src:"static/img/icon_help.png",alt:""},class:"backFile"})])])},handleHelp1:function(e,t){var s=t.column;return"1"==a.i(n.b)()?"主管":e("el-tooltip",{class:"item",attrs:{effect:"light",content:"点击修改流水线主管",placement:"top"}},[e("span",[s.label,e("img",{attrs:{src:"static/img/icon_help.png",alt:""},class:"backFile"})])])},tableRowClassName:function(e){if(e.code<30)return"warning-row"},getList:function(){var e=this;this.listLoading=!0,a.i(i.a)(this.listQuery).then(function(t){e.list=t.data.rows,e.total=t.data.total,e.listLoading=!1})},weightChange:function(e){var t=this;this.isSelect&&a.i(i.f)(e).then(function(e){200==e.status?t.$message({message:e.tip,type:"success",duration:2e3}):t.$message({message:e.tip,type:"error",duration:2e3})})},change:function(e){var t=this;a.i(i.b)(e).then(function(e){200===e.status?(t.dialogFormVisible=!1,t.$message({message:e.tip,type:"success",duration:2e3})):t.$message({message:e.error,type:"warning",duration:2e3})})},handleFilter:function(){this.getList()},handleSizeChange:function(e){this.listQuery.limit=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogif="updatePL",this.getDomWidth("categoryValue"),this.getDomWidth("CreatecurrentSelectProcess"),this.dialogFormVisible=!0},handleName:function(e,t){this.newName="",void 0==this.$refs.form?(this.form=l()({},t),this.dialogif="updateName",this.dialogFormVisible=!0,this.dialogtitleProcess="修改流水线名称"):(this.form=l()({},t),this.dialogif="updateName",this.dialogFormVisible=!0,this.$refs.form.resetFields(),this.dialogtitleProcess="修改流水线名称")},updatePLName:function(){var e=this,t={};if(t.PLID=this.form.id,t.PLName=this.newName,""==t.PLName.replace(/(^\s+)|(\s+$)/g,""))this.newName="",this.$message({message:"请输入流水线名称!",type:"warning",duration:2e3});else if(t.PLName.replace(/\s+/g,"").length<3)this.$message({message:"流水线名称至少3个字符!",type:"warning",duration:2e3});else{if(t.PLName.replace(/\s+/g,"").length>11)return this.$message({message:"流水线名称至多11个字符!",type:"warning",duration:2e3}),!1;t.PLName=this.newName.replace(/\s+/g,""),a.i(i.g)(t).then(function(t){200==t.status?(e.$message({type:"success",message:t.tip,duration:2e3}),e.getList()):(e.$message({type:"error",message:t.tip,duration:2e3}),e.getList()),e.dialogFormVisible=!1}).catch(function(t){e.dialogFormVisible=!1}),this.getList()}},handleEdit:function(e,t){var s=this;this.loading=!0,this.isDisabled=!1,this.dialogtitleProcess="修改 "+t.name+" 流水线的工序",this.form=this.list[e],this.currentIndex=e,this.dialogFormVisible=!0,this.dialogif="updateProcess",a.i(i.c)(t.id).then(function(e){200==e.status?(s.loading=!1,s.showType=[],s.allTypeTable=e.data.rows,e.data.rows.map(function(e){s.showType.includes(e.type)||s.showType.push(e.type)}),s.currentSelectType=s.showType[0]):s.loading=!1})},handleUpdate:function(e){void 0==this.$refs.form?(this.resetTemp(),this.dialogStatus="update",this.dialogif="updatePL",this.dialogFormVisible=!0,this.form=l()({},e)):(this.resetTemp(),this.dialogStatus="update",this.dialogif="updatePL",this.dialogFormVisible=!0,this.form=l()({},e),this.$refs.form.resetFields())},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.i(i.d)(e.id).then(function(a){t.$message({message:a.tip,type:"success",duration:2e3});var s=t.list.indexOf(e);t.list.splice(s,1)})})},create:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;""==t.form.name.replace(/(^\s+)|(\s+$)/g,"")?(t.newName="",t.$message({message:"请输入流水线名称!",type:"warning",duration:2e3})):parseInt(t.form.login_id)>2147483647?t.$message({showClose:!0,message:"工号输入值过大！",type:"error"}):(t.currentSelectProcess.map(function(e){t.form[e]=!0}),t.form.ids=t.categoryValue,a.i(i.e)(t.form).then(function(e){200==e.status?t.$message({message:e.tip,type:"success",duration:2e3}):t.$message({message:e.tip,type:"error",duration:2e3}),t.dialogFormVisible=!1,t.getList()}))})},selectAble:function(e){this.isSelect=e},handleSelctCategory:function(){this.$refs.category.$el.style},cancel:function(e){this.dialogFormVisible=!1,this.newName="",this.form={}},update:function(e){var t=this;a.i(i.b)(e).then(function(e){200==e.status?t.$message({type:"success",message:e.tip,duration:2e3}):t.$message({type:"error",message:e.tip,duration:2e3})})},handleSureType:function(){var e=this,t={};this.processType.map(function(a){e.currentSelectProcess.includes(a.value)?t[a.value]=!0:t[a.value]=!1}),t.plid=this.currentPLID,a.i(i.h)(t).then(function(t){if(200==t.status)e.$message({type:"success",message:"修改成功"}),e.ReSelectType=!1,e.getList();else{var a="";e.processType.map(function(e){e.value==t.key&&(a=e.label)}),e.$message({type:"warning",message:a+t.tip})}})},handleSureCategory:function(){var e=this,t={};t.PLID=this.currentPLID,t.ids=this.currentSelectCategory,a.i(c.b)(t).then(function(t){200==t.status?(e.ReSelectType=!1,e.$message({message:"修改成功",type:"success"}),e.getList()):e.$message({message:"修改失败",type:"warning"})})},handleSelectType:function(e){},onShowProcess:function(e){return!!this.showType.includes(e)},handleShowSelectType:function(e,t){var a=this;this.$nextTick(function(){a.categoryOrProcess=t,"Process"==t?(a.getDomWidth("currentSelectProcess"),a.dialogtitleProcess="修改工序类型"):(a.getDomWidth("currentSelectCategory"),a.dialogtitleProcess="修改品类")}),this.ReSelectType=!0,this.currentPLID=e.id,this.currentSelectCategory=e.PLCategory||[];for(var s in e)"boolean"==typeof e[s]&&e[s]&&this.currentSelectProcess.push(s)},getDomWidth:function(e){var t=this,a={minWidth:"220px",maxWidth:"600px"},s=[];"CreatecurrentSelectProcess"==e?(s=this.processType.map(function(e){if(t.currentSelectProcess.includes(e.value))return e.label}).filter(function(e){return e}),a.width=10*(s.length+1)+35+30*s.length+12*s.toString().replace(/,/g,"").length+"px",this.newWidthObj=a):("categoryValue"==e||"currentSelectCategory"==e?s=this.categoryArr.map(function(a){if(t[e].includes(a.Id))return a.CategoryName}).filter(function(e){return e}):"currentSelectProcess"==e&&(s=this.processType.map(function(a){if(t[e].includes(a.value))return a.label}).filter(function(e){return e})),a.width=10*(s.length+1)+35+30*s.length+12*s.toString().replace(/,/g,"").length+"px",this.widthObj=a)},updateForm:function(e){var t=this,s=this.$refs,l={},r=/^[0-9]{0,10}$/;this.form.login_id=this.form.login_id.toString(),l.loginid=this.form.login_id,l.plid=this.form.id,s[e].validate(function(e){e&&r.test(l.loginid)?parseInt(l.loginid)>2147483647?t.$message({showClose:!0,message:"工号输入值过大！",type:"error"}):(a.i(i.i)(l).then(function(e){200==e.status?t.$message({type:"success",message:e.tip}):t.$message({type:"error",message:e.tip}),t.getList()}),t.dialogFormVisible=!1):t.$message({message:"输入有误!",type:"warning",duration:2e3})})},resetTemp:function(){this.form={UserName:void 0,Phone:void 0,State:1,Up:void 0,Down:0,MAC:void 0,Remark:"",type:[],weight:0,TG:!1,CG:!1,OtherG:!1,GD:!1,TD:!1,CD:!1},this.currentSelectProcess=[],this.categoryValue=[]},resetForm:function(){this.setForm={delCode:0,setCode:0,name:"",id:0}}},filters:{isName:function(e){return""==e.UserName||null==e.UserName?0==e.login_id?"暂无主管":e.login_id:e.UserName},typeStyle:function(e){var t=[{value:"CD",label:"成衣生产"},{value:"TD",label:"团订生产"},{value:"GD",label:"个订生产"},{value:"TG",label:"团订改版"},{value:"CG",label:"成衣改版"},{value:"OtherG",label:"其他改版"}],a=[];for(var s in e)"boolean"==typeof e[s]&&e[s]&&a.push(s);var l=t.map(function(e){if(a.includes(e.value))return e.label}).filter(function(e){return e});return 0==l.length?"暂未选择类型":l.join(" / ")}}}},jrjv:function(e,t,a){var s=a("VU/8")(a("THhK"),a("Iw2h"),null,null,null);e.exports=s.exports},q7YO:function(e,t,a){var s=a("WEdy");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);a("rjj0")("26ba6c00",s,!0)},r7bU:function(e,t,a){function s(e){a("q7YO")}var l=a("VU/8")(a("fQXG"),a("T96P"),s,null,null);e.exports=l.exports}});