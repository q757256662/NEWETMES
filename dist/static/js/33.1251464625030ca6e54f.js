webpackJsonp([33],{AD5B:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),o=a.n(r),i=a("mvHQ"),l=a.n(i),n=a("aHb3"),s=a("QxNj"),d=a("0xDb"),u=a("TIfe");t.default={data:function(){return{json:"",activeName2:"first",tableData:[],tableArrName:"",tableFabric:[],routerForm:"",routerinfo:{},type:"",tableKey:"0",orderMeterial:[],measureTD:[],measureTDName:[],measurebodyList:[],measureinfoList:[],CDMeterial:[],MeterCDFromArr:[],measureGDList:[],measureGDinfoList:[],dialogMeterial:!1,MeterialForm:{name:"",id:"",code:"",color:"",width:null,amount:0,dir:0,xShark:0,xWidth:0,yShark:0,yWidth:0},merterailIndex:"",rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],id:[{required:!0,message:"请输入id",trigger:"blur"}],width:[{type:"number",required:!0,message:"请输入幅宽",trigger:"blur"}]},orderTpye:localStorage.getItem("type"),demotype:"",demoimg:""}},created:function(){if(this.type=a.i(d.d)("type"),"BD"==this.type){this.demotype="model";var e={};this.routerinfo.ModelName=JSON.parse(localStorage.getItem("BDdata")).ModelName,this.routerForm=JSON.parse(localStorage.getItem("BDdata")),e.orderId=this.routerForm.Id,this.getStyle(),this.getOrderinfo(e)}else{var t={};this.routerForm=JSON.parse(localStorage.getItem("OrderInfo")),t.orderId=this.routerForm.Id,this.getOrderinfo(t),this.getTDMeasureInfo(),this.demoimg="/static/img/demo-img.png"}},methods:{getStyle:function(){var e=this;a.i(n.m)(this.routerinfo).then(function(t){200==t.status?e.demoimg=t.data.rows[0].Image:e.demoimg="/static/img/demo-img.png"})},handleTabClick:function(){},getOrderinfo:function(){var e=this,t={};t.orderId=this.routerForm.Id,a.i(s.d)(t).then(function(t){if(t.Success&&null!=t.Data.Rows)if(e.json=t.Data.Rows,e.measureTD=t.Data.Rows.person,e.measureTDName=t.Data.Rows.measureName,e.orderMeterial=t.Data.Rows.fabric,""!==t.Data&&"dh"==e.orderTpye){e.CDMeterial=t.Data.Rows.fabric;var a=JSON.parse(l()(t.Data.Rows));e.MeterCDFromArr=a.fabric,e.tableData=a.size;var r=a.version;e.tableData[0].size_name=a.size_name,e.tableArrName=a.size_name.name;var o=[],i=[];r.forEach(function(e,t){var r={};if(r.color=e.name,i.push(r),a.fabric.map(function(e,a){a==t&&(e.color=r.color,o.push(e))}),void 0==e.fabric||""==e.fabric)return!1;e.fabric.forEach(function(e){e.color=r.color,o.push(e)})}),e.tableGDoutput=r,e.tableFabric=o,console.log(e.tableFabric)}else if(""!==t.Data&&"gd"==e.orderTpye){var n={};n.id=t.Data.Rows.id,n.name=t.Data.Rows.person.name,n.phone=t.Data.Rows.person.phone,n.sizeName=t.Data.Rows.sizeName,e.measureGDList.push(n),e.measureGDinfoList=t.Data.Rows.number,e.measureGDList[0].measure=t.Data.Rows.number}})},getJson:function(e){var t=this;a.i(n.a)(e).then(function(e){var a=e.Data;t.json=e.Data,t.tableData=a.size;t.tableData[0].size_name=a.size_name,t.tableArrName=a.size_name.name;var r=[];a.version.forEach(function(e){var t={};t.color=e.name,e.fabric.forEach(function(e){e.color=t.color,r.push(e)})}),t.tableFabric=r})},getJson1:function(e){var t=this;a.i(s.d)(e).then(function(e){var a=e.Data;t.json=e.Data,t.tableData=a.size;t.tableData[0].size_name=a.size_name,t.tableArrName=a.size_name.name;var r=[];a.version.forEach(function(e){var t={};t.color=e.name,e.fabric.forEach(function(e){e.color=t.color,r.push(e)})}),t.tableFabric=r})},getTDMeasureInfo:function(){var e=this,t={};t.OrderId=this.routerForm.OrderId,t.State=this.routerForm.State,t.Id=this.routerForm.Id,a.i(s.j)(t).then(function(t){200==t.status?(e.listLoading=!1,e.measurebodyList=t.data.rows.personList,e.measureinfoList=t.data.rows):(e.measurebodyList=[],e.measureinfoList=[]),e.listLoading=!1})},editShow:function(e,t){this.dialogMeterial=!0,this.MeterialForm=o()({},e),this.merterailIndex=t},sureEditMeterial:function(e){var t=this;console.log(this.MeterialForm),this.$refs[e].validate(function(e){if(!e)return!1;var a=t.merterailIndex;t.$set(t.json.fabric,a,t.MeterialForm);var r={};r.orderJson={},r.orderId=t.routerForm.Id,r.orderJson=t.json,r.orderFabric=t.json.fabric,t.EditMertrial(r)})},EditMertrial:function(e){var t=this;a.i(s.c)(e).then(function(e){e.Success?(t.dialogMeterial=!1,t.dialogAddMeterial=!1,t.dialogAddGDMeterial=!1,t.dialogEditGDMeterial=!1,t.$message({showClose:!0,message:"成功",type:"success",duration:2e3}),t.resetAddmeterial(),t.resetAddGDmeterial(),t.getOrderinfo()):(t.dialogMeterial=!1,t.dialogAddMeterial=!1,t.dialogAddGDMeterial=!1,t.$message({showClose:!0,message:e.ErrMes,type:"error",duration:2e3}),t.resetAddmeterial(),t.resetAddGDmeterial(),t.getOrderinfo())})},updateModel:function(e){if("ie"==this.bowserExplorer){var t=window.external.setData(e,l()(this.json));"OK"==t?(this.$message({showClose:!0,message:t,type:"success",duration:2e3}),window.external.closeDialog(0)):this.$message({showClose:!0,message:t,type:"error",duration:2e3})}else{var t=window.buyiSetData(e,l()(this.json));"OK"==t?window.buyiCloseDialog(0):this.$message({showClose:!0,message:t,type:"error",duration:2e3})}},creatModel:function(e){var t=this,r={};r.mode="create",r.projectName=this.json.name,r.projectID=this.json.id,r.fileID=0,r.filePath="",r.fileName="",r.token=a.i(u.a)(),a.i(n.b)(r).then(function(a){alert(l()(a));var o="";"ie"==t.bowserExplorer?(o=window.external.openFile(e,l()(t.json),l()(a.Data)),"OK"==o?(t.$message({showClose:!0,message:o,type:"success",duration:2e3}),window.external.closeDialog(0),t.LockOrderInfo(r.projectID)):t.$message({showClose:!0,message:o,type:"error",duration:2e3})):(o=window.buyiOpenFile(e,l()(t.json),l()(a.Data)),"OK"==o?(t.$message({showClose:!0,message:o,type:"success",duration:2e3}),window.buyiCloseDialog(0),t.LockOrderInfo(r.projectID)):t.$message({showClose:!0,message:o,type:"error",duration:2e3}))})},LockOrderInfo:function(e){var t={};t.projectID=e,t.token=a.i(u.a)(),a.i(n.c)(t).then(function(e){})},selectColor:function(e,t){return e.IsPod?"success-row1":""},resetAddmeterial:function(){this.MeterialForm={name:"",id:"",code:"",color:"",width:"",amount:"",dir:0,xShark:0,xWidth:0,yShark:0,yWidth:0}},resetAddGDmeterial:function(){this.MeterGDFrom={id:"",name:"",width:"",details:"",len_shrinkage:0,width_shrinkage:0,len_grid:0,width_grid:0,gap:0,price:30,amount:0}}}}},QxNj:function(e,t,a){"use strict";function r(e){return a.i(g.a)({url:"/bmapi/bedinfo?Id="+e,method:"get"})}function o(e){return a.i(g.a)({url:"/bmapi/orderDetailProcess?ModelId="+e,method:"get"})}function i(e){return a.i(g.a)({url:"/bmapi/OrderDetail",method:"get",params:e})}function l(e){return a.i(g.a)({url:"/bmapi/podinfo?id="+e,method:"get"})}function n(e){return a.i(g.a)({url:"/bmapi/pc",method:"post",data:e})}function s(e){return a.i(g.a)({url:"/bmapi/taskhandle/acceptUsers",method:"get",params:e})}function d(e){return a.i(g.a)({url:"/bmapi/taskhandle/moveTask",method:"post",data:e})}function u(e){return a.i(g.a)({url:"/bmapi/taskhandle/movePod",method:"put",data:e})}function c(e){return a.i(g.a)({url:"/bmapi/measurebodyinfo",method:"get",params:e})}function m(e){return a.i(g.a)({url:"/bmapi/getlshbyerpid",method:"get",params:e})}function p(e){return a.i(g.a)({url:"/bmapi/materialInfo?Id="+e,method:"get"})}function b(e){return a.i(g.a)({url:"/bmapi/downbedinfo",method:"get",params:e})}function f(e){return a.i(g.a)({url:"/bmapi/getorderjson",method:"get",params:e})}function h(e){return a.i(g.a)({url:"/bmapi/editefabric",method:"put",data:e})}function v(e){return a.i(g.a)({url:"/bmapi/Updatestate",method:"post",data:e})}t.g=r,t.e=o,t.f=i,t.h=l,t.m=n,t.a=s,t.n=d,t.o=u,t.j=c,t.k=m,t.i=p,t.l=b,t.d=f,t.c=h,t.b=v;var g=a("Vo7i")},"Z/YN":function(e,t,a){function r(e){a("elae")}var o=a("VU/8")(a("AD5B"),a("bQqC"),r,null,null);e.exports=o.exports},aHb3:function(e,t,a){"use strict";function r(e){return a.i(v.a)({url:"/bmapi/demo/vuebuyiPostreturn",method:"post",data:e})}function o(e){return a.i(v.a)({url:"/bmapi/demo/createftp",method:"post",params:e})}function i(e){return a.i(v.a)({url:"/bmapi/demo/buyiLockOrder",method:"post",params:e})}function l(e){return a.i(v.a)({url:"/bmapi/demo/buyiLockModel",method:"post",params:e})}function n(e){return a.i(v.a)({url:"/bmapi/demo/getFileinfobyId",method:"get",params:e})}function s(e){return a.i(v.a)({url:"/bmapi/demo/getFileList",method:"get",params:e})}function d(e){return a.i(v.a)({url:"/bmapi/demo/singlejson",method:"get",params:e})}function u(e){return a.i(v.a)({url:"/bmapi/demo/uploadftp",method:"post",params:e})}function c(e){return a.i(v.a)({url:"/bmapi/demo/savaFilePara",method:"post",params:e})}function m(e){return a.i(v.a)({url:"/bmapi/demo/vuebuyiPostreturn",method:"post",data:e})}function p(e){return a.i(v.a)({url:"/bmapi/styleDetail",method:"get",params:e})}function b(e){return a.i(v.a)({url:"/bmapi/demo/delefailfile",method:"delete",params:e})}function f(e){return a.i(v.a)({url:"/bmapi/demo/vuegetfabriclist",method:"get",params:e})}function h(e){return a.i(v.a)({url:"/bmapi/demo/vueeditefabric",method:"post",data:e})}t.l=r,t.b=o,t.c=i,t.f=l,t.g=n,t.h=s,t.a=d,t.k=u,t.i=c,t.n=m,t.m=p,t.j=b,t.d=f,t.e=h;var v=a("Vo7i")},bQqC:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"table-cantain",attrs:{id:"demo"}},["BD"==e.type?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.creatModel("model")}}},[e._v("新建版单")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.creatModel("order")}}},[e._v("新建生产单")]),e._v(" "),"BD"==e.type?a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updateModel("model")}}},[e._v("刷新版单信息")]):a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updateModel("order")}}},[e._v("刷新生产单信息")]),e._v(" "),a("el-tabs",{staticStyle:{"margin-top":"30px"},attrs:{type:"card"},on:{"tab-click":e.handleTabClick},model:{value:e.activeName2,callback:function(t){e.activeName2=t},expression:"activeName2"}},[a("el-tab-pane",{staticClass:"measure",attrs:{label:"尺码",name:"first"}},[e._e(),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:"dh"==e.orderTpye,expression:"orderTpye =='dh'"}],staticStyle:{"text-align":"center"}},[e._v("成衣量体信息列表")]),e._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:"dh"==e.orderTpye,expression:"orderTpye =='dh'"}],staticStyle:{width:"50%"},attrs:{data:e.tableData,border:""}},[a("el-table-column",{attrs:{label:"量体",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.name)+"\n      ")]}}])}),e._v(" "),e._l(e.tableArrName,function(t,r){return a("el-table-column",{key:r,attrs:{align:"center",label:t},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n           "+e._s(t.row.measures[r])+"\n      ")]}}])})})],2),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:"td"==e.orderTpye,expression:"orderTpye =='td'"}]},[e._v("团订量体信息列表")]),e._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:"td"==e.orderTpye,expression:"orderTpye =='td'"}],staticStyle:{width:"50%"},attrs:{data:e.measureTD,border:""}},[a("el-table-column",{attrs:{label:"姓名",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n          "+e._s(t.row.name)+"\n      ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"sizeName",align:"center",label:"号型"}}),e._v(" "),e._l(e.measureTDName,function(t,r){return a("el-table-column",{key:r,attrs:{align:"center",label:t},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n           "+e._s(t.row.meaValue[r])+"\n      ")]}}])})})],2),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]},[e._v("量体信息列表")]),e._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{"row-class-name":e.selectColor,data:e.measurebodyList,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"ID",align:"center",label:"ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n   "+e._s(t.row.ID)+"\n")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"LSH",align:"center",label:"流水号"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n   "+e._s(t.row.LSH)+"\n  ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sizeName",align:"center",label:"尺码"}}),e._v(" "),e._l(e.measureinfoList.measureName,function(t,r){return a("el-table-column",{key:r,attrs:{align:"center",label:t},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n   "+e._s(t.row.measureVal[r])+"\n")]}}])})}),e._v(" "),a("el-table-column",{attrs:{prop:"pod",align:"center",label:"pod值"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{staticStyle:{color:"blue","text-decoration":"underline"},attrs:{href:"javascript:"},on:{click:function(a){e.handleDown(t.row)}}},[e._v(e._s(t.row.pod))])]}}])})],2),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:"gd"==e.orderTpye,expression:" orderTpye =='gd'"}]},[e._v("个订量体信息列表")]),e._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:"gd"==e.orderTpye,expression:" orderTpye =='gd'"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.measureGDList,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"id",align:"center",label:"ID"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n   "+e._s(t.row.id)+"\n")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",align:"center",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sizeName",align:"center",label:"尺码"}}),e._v(" "),e._l(e.measureGDinfoList,function(t,r){return a("el-table-column",{key:r,attrs:{align:"center",label:t.name},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n        "+e._s(t.row.measure[r].val)+"\n        ")]}}])})})],2)],1),e._v(" "),a("el-tab-pane",{staticClass:"fabic",attrs:{label:"物料",name:"second"}},[e._e(),e._v(" "),"dh"==e.orderTpye?a("div",[a("p",[e._v("颜色搭配详情")]),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableFabric,border:""}},[a("el-table-column",{attrs:{label:"颜色",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n   "+e._s(t.row.color)+"\n")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"名称",align:"center",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"id",label:"ID",align:"center",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"width",width:"116px",align:"center",label:"幅宽(CM)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"details",align:"center",label:"详细描述"}}),e._v(" "),a("el-table-column",{attrs:{prop:"len_shrinkage",align:"center",label:"经纱缩水率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"width_shrinkage",align:"center",label:"纬纱缩水率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",align:"center",label:"价格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",width:"116px",align:"center",label:"用量(CM)"}})],1)],1):e._e(),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:"gd"==e.type,expression:" type== 'gd'"}]},[e._v("个订物料信息列表")]),e._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:"gd"==e.type,expression:" type== 'gd'"}],staticStyle:{width:"100%"},attrs:{data:e.orderMeterial,border:""}},[a("el-table-column",{attrs:{prop:"name",label:"CAD名称",align:"center",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"id",label:"ID",align:"center",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"width",width:"116px",align:"center",label:"幅宽(CM)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"details",align:"center",label:"详细描述"}}),e._v(" "),a("el-table-column",{attrs:{prop:"len_shrinkage",align:"center",label:"经纱缩水率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"width_shrinkage",align:"center",label:"纬纱缩水率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"len_grid",align:"center",label:"纬纱条纹宽度"}}),e._v(" "),a("el-table-column",{attrs:{prop:"width_grid",align:"center",label:"经纱条纹宽度"}}),e._v(" "),a("el-table-column",{attrs:{prop:"gap",align:"center",label:"间隙"}}),e._v(" "),a("el-table-column",{attrs:{prop:"price",align:"center",label:"价格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",width:"116px",align:"center",label:"用量(CM)"}}),e._v(" "),a("el-table-column",{attrs:{width:"116px",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(a){e.editGDShow(t.row,t.$index)}}},[e._v("编辑")])]}}])})],1),e._v(" "),e._e(),e._v(" "),e._e(),e._v(" "),a("p",{directives:[{name:"show",rawName:"v-show",value:"td"==e.orderTpye&&null!=e.json,expression:"orderTpye == 'td'&& json != null"}]},[e._v("团订物料信息列表")]),e._v(" "),a("el-table",{directives:[{name:"show",rawName:"v-show",value:"td"==e.orderTpye&&null!=e.json,expression:"orderTpye == 'td' && json != null"}],staticStyle:{width:"100%"},attrs:{data:e.orderMeterial,border:""}},[a("el-table-column",{attrs:{label:"色号",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n   "+e._s(t.row.color)+"\n")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"CAD名称",align:"center",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"id",label:"物料编码",align:"center",width:"180"}}),e._v(" "),a("el-table-column",{attrs:{prop:"code",label:"物料描述",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"width",width:"116px",align:"center",label:"门幅(CM)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"dir",align:"center",label:"旋转",width:"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n   "+e._s(0==t.row.dir?"否":1==t.row.dir?"是":"")+"\n")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"xShark",align:"center",label:"经纱缩水"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yShark",align:"center",label:"纬纱缩水"}}),e._v(" "),a("el-table-column",{attrs:{prop:"xWidth",align:"center",label:"经纱宽度"}}),e._v(" "),a("el-table-column",{attrs:{prop:"yWidth",align:"center",label:"纬纱宽度"}}),e._v(" "),a("el-table-column",{attrs:{prop:"amount",width:"116px",align:"center",label:"用量(CM)"}}),e._v(" "),a("el-table-column",{attrs:{width:"116px",align:"center",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"mini",type:"info"},on:{click:function(a){e.editShow(t.row,t.$index)}}},[e._v("编辑")])]}}])})],1)],1)],1),e._v(" "),a("div",{staticClass:"table-img"},[a("img",{attrs:{src:e.demoimg,alt:"",srcset:""}})]),e._v(" "),a("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:"编辑",visible:e.dialogMeterial,size:"tiny"},on:{"update:visible":function(t){e.dialogMeterial=t}}},[a("el-form",{ref:"ruleForm",staticStyle:{"padding-left":"13%"},attrs:{model:e.MeterialForm,rules:e.rules,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"名称","label-width":"100px",prop:"name"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{"auto-complete":"off"},model:{value:e.MeterialForm.name,callback:function(t){e.MeterialForm.name=t},expression:"MeterialForm.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"物料编码",prop:"id"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{"auto-complete":"off"},model:{value:e.MeterialForm.id,callback:function(t){e.MeterialForm.id=t},expression:"MeterialForm.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"幅宽",prop:"width"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{"auto-complete":"off"},model:{value:e.MeterialForm.width,callback:function(t){e.MeterialForm.width=t},expression:"MeterialForm.width"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"物料描述"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{"auto-complete":"off"},model:{value:e.MeterialForm.code,callback:function(t){e.MeterialForm.code=t},expression:"MeterialForm.code"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"色号"}},[a("el-input",{staticStyle:{width:"220px"},attrs:{"auto-complete":"off"},model:{value:e.MeterialForm.color,callback:function(t){e.MeterialForm.color=t},expression:"MeterialForm.color"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogMeterial=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.sureEditMeterial("ruleForm")}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},elae:function(e,t,a){var r=a("soit");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);a("rjj0")("778535fa",r,!0)},mvHQ:function(e,t,a){e.exports={default:a("qkKv"),__esModule:!0}},qkKv:function(e,t,a){var r=a("FeBl"),o=r.JSON||(r.JSON={stringify:JSON.stringify});e.exports=function(e){return o.stringify.apply(o,arguments)}},soit:function(e,t,a){t=e.exports=a("FZ+f")(!1),t.push([e.i,".table-cantain{padding:30px}.table-img img{margin-top:25px;width:650px;height:410px}.el-table .success-row1{background:#fde9e6}.el-table .warning-row{background:#f0f9eb}p{text-align:center}.measure p,p{font-size:19px;font-weight:600}.measure p{text-align:left;margin-left:20%}",""])}});