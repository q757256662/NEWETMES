webpackJsonp([13],{"+Eh2":function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container calendar-list-container",staticStyle:{"min-width":"1300px"}},[i("div",{staticClass:"order-search-top"},[i("el-select",{staticStyle:{width:"8%"},attrs:{placeholder:"请选择"},on:{change:e.changeType},model:{value:e.form.type,callback:function(t){e.form.type=t},expression:"form.type"}},[i("el-option-group",{key:"group.label",attrs:{label:"类型"}},e._l(e.TypeOptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),"td"==e.form.type?i("span"):e._e(),e._v(" "),"td"==e.form.type?i("el-input",{staticClass:"filter-item",staticStyle:{width:"6.5%","min-width":"120px"},attrs:{placeholder:"请输入样板名"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.form.ModelName,callback:function(t){e.form.ModelName=t},expression:"form.ModelName"}}):e._e(),e._v(" "),"td"!==e.form.type?i("span"):e._e(),e._v(" "),"td"!==e.form.type?i("el-input",{staticClass:"filter-item",staticStyle:{width:"6.5%","min-width":"120px"},attrs:{placeholder:"请输入款名"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.form.ModelName,callback:function(t){e.form.ModelName=t},expression:"form.ModelName"}}):e._e(),e._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"6.5%","min-width":"120px"},attrs:{placeholder:"请输入客户名"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.form.cusName,callback:function(t){e.form.cusName=t},expression:"form.cusName"}}),e._v(" "),i("el-input",{staticClass:"filter-item",staticStyle:{width:"7.5%","min-width":"120px"},attrs:{placeholder:"请输入生产单号"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.form.OrderId,callback:function(t){e.form.OrderId=t},expression:"form.OrderId"}}),e._v(" "),i("el-select",{staticStyle:{width:"8%","min-width":"120px"},attrs:{placeholder:"请选择"},on:{change:e.selectStaus},model:{value:e.form.State,callback:function(t){e.form.State=t},expression:"form.State"}},[i("el-option-group",{key:"group.label",attrs:{label:"状态"}},e._l(e.options,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-select",{staticStyle:{width:"10%","min-width":"120px"},attrs:{placeholder:"请选择创建时间"},model:{value:e.form.sTime,callback:function(t){e.form.sTime=t},expression:"form.sTime"}},[i("el-option",{attrs:{label:"全部",value:"''"}}),e._v(" "),e._l(e.optiontimes,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})],2),e._v(" "),"gd"!==e.form.type?i("span",[e._v("件数：")]):e._e(),e._v(" "),"gd"!==e.form.type?i("el-input",{staticClass:"filter-item",staticStyle:{width:"3.5%","min-width":"120px"},attrs:{type:"number"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleFilter(t)}},model:{value:e.form.Yield,callback:function(t){e.form.Yield=t},expression:"form.Yield"}}):e._e(),e._v("绑定：\n    "),e._v(" "),i("el-select",{staticStyle:{width:"8%","min-width":"120px"},attrs:{placeholder:"请选择"},on:{change:e.selectBindStaus},model:{value:e.form.bingNum,callback:function(t){e.form.bingNum=t},expression:"form.bingNum"}},e._l(e.changeoptions,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{"margin-left":"8px"},attrs:{type:"primary",icon:"search"},on:{click:e.handleFilter}},[e._v("搜索")]),e._v(" "),"selected"===e.selectState?i("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",staticStyle:{float:"right"},attrs:{type:"primary",icon:"check"},on:{click:e.handleUnBind}},[e._v("解绑")]):e._e()],1),e._v(" "),i("div",{staticClass:"filter-container"}),e._v(" "),i("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:e.listLoading,expression:"listLoading",modifiers:{body:!0}}],key:e.tableKey,ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.list,border:"",fit:"","highlight-current-row":"","row-class-name":e.selectColor,"row-key":e.rowKey},on:{"sort-change":e.sortChange,"selection-change":e.handleSelectionChange}},[e.defaultShow?i("el-table-column",{attrs:{type:"selection",width:"55px",selectable:e.isSelect}}):e._e(),e._v(" "),e.defaultShow?i("el-table-column",{key:"BindId",attrs:{prop:"BindId",align:"center",width:"80px",label:"绑定号",formatter:e.isBind}}):e._e(),e._v(" "),i("el-table-column",{key:"OrderId",attrs:{align:"center","highlight-current-row":"true",label:"生产单号","render-header":e.handleHelp},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{staticStyle:{"text-decoration":"underline",color:"#20a0ff"},on:{click:function(i){e.routerLink("生产单详情","process",t.row)}}},[e._v(e._s(t.row.OrderId))])]}}])}),e._v(" "),i("el-table-column",{key:"cusName",attrs:{prop:"cusName",align:"center",label:"客户名称"}}),e._v(" "),"td"==e.form.type?i("el-table-column",{key:"ModelName",attrs:{prop:"ModelName",align:"center",label:"样板名","render-header":e.handleHelp},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{staticStyle:{"text-decoration":"underline",color:"#20a0ff"},attrs:{href:"javascript:"},on:{click:function(i){e.handleModelView(t.row)}}},[e._v(e._s(t.row.ModelName))])]}}])}):e._e(),e._v(" "),"td"!==e.form.type?i("el-table-column",{key:"StyleName",attrs:{prop:"ModelName",align:"center",label:"样式名"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.ModelName))]}}])}):e._e(),e._v(" "),i("el-table-column",{key:"nature",attrs:{prop:"nature",align:"center",width:"105px",label:"订单性质"}}),e._v(" "),i("el-table-column",{key:"rank",attrs:{align:"center",label:"优先级"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==e.rolePower&&1==t.row.State?i("el-select",{attrs:{placeholder:"请选择"},on:{"visible-change":e.changeShow,change:function(i){e.ChangeRank(i,t.row)}},model:{value:t.row.rank,callback:function(e){t.row.rank=e},expression:"scope.row.rank"}},e._l(e.optionsRank,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})):i("span",[e._v(e._s(e._f("isRankStatus")(t.row.rank)))])]}}])}),e._v(" "),i("el-table-column",{key:"mCode",attrs:{prop:"mCode",align:"center",label:"物料名"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{staticStyle:{"text-decoration":"underline",color:"#20a0ff"},on:{click:function(i){e.routerLink("生产单详情","material",t.row)}}},[e._v(e._s(t.row.mCode))])]}}])}),e._v(" "),"gd"!==e.form.type?i("el-table-column",{key:"Yield",attrs:{prop:"Yield",width:"70px",align:"center",label:"件数"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{staticStyle:{"text-decoration":"underline",color:"#20a0ff"},on:{click:function(i){e.routerLink("生产单详情","Yield",t.row)}}},[e._v(e._s(t.row.Yield))])]}}])}):e._e(),e._v(" "),"gd"!==e.form.type&&"dh"!==e.form.type?i("el-table-column",{key:"Pod",attrs:{prop:"Pod",width:"80px",align:"center",label:"特体数"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{staticStyle:{"text-decoration":"underline",color:"#20a0ff"},on:{click:function(i){e.routerLink("生产单详情","pod",t.row)}}},[e._v(e._s(t.row.Pod))])]}}])}):e._e(),e._v(" "),i("el-table-column",{key:"Bed",attrs:{prop:"Bed",width:"70px",align:"center",label:"床数"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{staticStyle:{"text-decoration":"underline",color:"#20a0ff"},on:{click:function(i){e.routerLink("生产单详情","bed",t.row)}}},[e._v(e._s(t.row.Bed))])]}}])}),e._v(" "),i("el-table-column",{key:"Time",attrs:{sortable:"custom",prop:"Time",align:"center",width:"115px",label:"创建时间",formatter:e.ChangeDateFormat}}),e._v(" "),i("el-table-column",{key:"fTime",attrs:{sortable:"custom",prop:"fTime",align:"center",width:"115px",label:"交货时间",formatter:e.ChangeDateFormat}}),e._v(" "),i("el-table-column",{directives:[{name:"show",rawName:"v-show",value:1==e.form.State||3==e.form.State,expression:"form.State == 1 || form.State ==  3"}],key:"process",attrs:{width:"125px",align:"center",label:"进度"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.State?i("span",{staticStyle:{color:"rgb(19, 206, 102)"}},[e._v("已完成")]):i("span",[e._v(e._s(e._f("changeProcessName")(t.row)))])]}}])}),e._v(" "),i("el-table-column",{key:"button",attrs:{align:"center",width:"142px",label:"编辑"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.form.State||3==e.form.State,expression:"form.State == 1 || form.State ==  3"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){e.handleEdit(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:0==e.form.State||2==e.form.State,expression:"form.State == 0 || form.State ==  2"}],attrs:{size:"mini",type:"danger"},on:{click:function(i){e.handleEdit(t.$index,t.row)}}},[e._v("删除")]),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.row.State,expression:"scope.row.State == 2"}],attrs:{size:"mini",loading:e.isloading==t.$index,type:"success"},on:{click:function(i){e.handleRest(t.$index,t.row)}}},[e._v("重置")]),e._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:5==t.row.State,expression:"scope.row.State==5"}],attrs:{size:"mini"},on:{click:function(i){e.handleReason(t.row.OrderId)}}},[e._v("查看原因")])]}}])})],1),e._v(" "),i("Pagination",{attrs:{listQuery:e.listQuery,total:e.total},on:{PageChange:e.getList}}),e._v(" "),e._e(),e._v(" "),i("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],staticClass:"message-box",attrs:{title:"样板名详细",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("div",{staticClass:"table-message"},[i("b",[e._v("\n        服装分类名：\n        "),i("span",[e._v(e._s(e.form1.Type))])]),e._v(" "),i("b",[e._v("\n        客户/品牌：\n        "),i("span",[e._v(e._s(e.form1.Brand))])]),e._v(" "),i("b",[e._v("\n        创建时间：\n        "),(e.form1,i("span",[e._v(e._s(e._f("changeTime")(e.form1.Time)))]))])]),e._v(" "),i("div",{staticClass:"table-img"},[i("img",{staticStyle:{wisth:"100px",height:"100px"},attrs:{src:"/"+e.form1.Image,alt:""}})])]),e._v(" "),i("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{size:"tiny",title:"选择移交员工",visible:e.dialogRemove},on:{"update:visible":function(t){e.dialogRemove=t}}},[e._l(e.optionsRemove,function(t){return i("el-radio",{key:t.LoginId,staticClass:"checkRadio",attrs:{label:t.LoginId},model:{value:e.radioRemove,callback:function(t){e.radioRemove=t},expression:"radioRemove"}},[e._v("\n      "+e._s(t.Name)+"\n      "),i("span",[e._v("（"+e._s(t.LoginId)+"）")])])}),e._v(" "),i("div",{staticClass:"dialog-footer",slot:"footer"},[i("el-button",{on:{click:e.cancleRemove}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.sureRemovePod}},[e._v("确 定")])],1)],2),e._v(" "),i("el-dialog",{attrs:{title:"错误原因",visible:e.resonVisible},on:{"update:visible":function(t){e.resonVisible=t}}},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.resonList,border:"","show-header":!1}},[i("el-table-column",{attrs:{prop:"name",width:"100px"}}),e._v(" "),i("el-table-column",{attrs:{prop:"value"}})],1),e._v(" "),i("span",{staticClass:"dialog-footer",slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.resonVisible=!1}}},[e._v("确 定")])],1)],1)],1)},staticRenderFns:[]}},"1onU":function(e,t,i){var a=i("VU/8")(i("VT+v"),i("Tl1r"),null,null,null);e.exports=a.exports},"672h":function(e,t,i){var a=i("rD+4");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i("rjj0")("baa11468",a,!0)},"7ByH":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("mvHQ"),n=i.n(a),o=i("Dd8w"),r=i.n(o),s=i("dNGm"),l=i("1onU"),u=i.n(l),c=i("QxNj"),d=i("TIfe"),m=i("0xDb"),f=i("NYxO"),p=i("ZPKS");i.n(p);t.default={name:"user",components:{Pagination:u.a},data:function(){return{options:[{value:0,label:"废弃"},{value:1,label:"进行中"},{value:2,label:"已完成"},{value:3,label:"延期"},{value:4,label:"待处理"},{value:5,label:"推送失败"}],changeoptions:[{value:0,label:"未绑定"},{value:1,label:"绑定"},{value:-1,label:"全部"}],TypeOptions:[{value:"td",label:"团订生产"},{value:"gd",label:"个订生产"},{value:"dh",label:"成衣生产"}],optionsRank:[{value:0,label:"普通"},{value:1,label:"优先"},{value:2,label:"加急"}],optiontimes:[{value:new Date((new Date).getTime()-6048e5).toLocaleDateString().replace(/\//g,"-")+"-00:00",label:"1周内"},{value:new Date((new Date).getTime()-12096e5).toLocaleDateString().replace(/\//g,"-")+"-00:00",label:"2周内"},{value:new Date((new Date).getTime()-18144e5).toLocaleDateString().replace(/\//g,"-")+"-00:00",label:"3周内"},{value:new Date((new Date).getTime()-24192e5).toLocaleDateString().replace(/\//g,"-")+"-00:00",label:"4周内"}],isBinding:[{value:1,label:"绑定"},{value:0,label:"未绑定"}],defaultShow:!1,form:{type:"td",Type:null,Brand:null,Time:"/Date(1530236079340)/",Bed:void 0,cusName:"",Id:null,ModelName:void 0,OrderId:null,State:1,sTime:void 0,eTime:void 0,IsBind:1,bingNum:-1,page:1,limit:Number(localStorage.getItem("totalPage")||10),Yield:0,orderBy:-1,AscOrDesc:"desc"},form1:{Type:null,Brand:null,Time:"/Date(1530236079340)/",Bed:void 0,cusName:"",Id:null,ModelName:void 0,OrderId:null,State:1,sTime:void 0,eTime:void 0,IsBind:1,bingNum:-1,page:1,limit:Number(localStorage.getItem("totalPage")||10),Yield:0,orderBy:-1,AscOrDesc:"desc"},isloading:-1,selectState:"",arr:[],value8:"",value7:"",indexColor:1,value9:"",colorIndex:0,pickerOptions2:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-6048e5),e.$emit("pick",[i,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-2592e6),e.$emit("pick",[i,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,i=new Date;i.setTime(i.getTime()-7776e6),e.$emit("pick",[i,t])}}]},list:null,total:0,listLoading:!0,listQuery:{page:1,limit:Number(localStorage.getItem("totalPage")||10)},addPartner:{},sexOptions:["男","女"],dialogFormVisible:!1,formPhone:"",dialogStatus:"",userManager_btn_edit:!0,userManager_btn_del:!0,userManager_btn_add:!0,textMap:{update:"编辑",create:"创建"},formLabelWidth:"80px",tableKey:0,createdForm:{},rolePower:i.i(d.b)(),flag:0,dialogRemove:!1,optionsRemove:null,radioRemove:"",removeId:"",formInfo:{},resonVisible:!1,resonList:[]}},beforeCreate:function(){},created:function(){1==this.$route.params.stateCode||1==this.$route.query.stateCode?(this.createdForm.State=3,this.form.State=3,this.getList(this.createdForm)):this.$route.query.State?(this.form.State=Number(this.$route.query.State),this.getList(this.form)):(this.$store.state.user.orderState.toString()&&(this.form.State=this.$store.state.user.orderState),this.form.type=localStorage.getItem("GetOrderType")||"td","0"!=this.$store.state.user.bindorderStatus.toString()&&"1"!=this.$store.state.user.bindorderStatus.toString()||(this.$store.state.user.bindorderStatus.toString()&&(this.form.bingNum=this.$store.state.user.bindorderStatus),this.defaultShow=!0,"0"!=this.$store.state.user.orderState.toString()&&"2"!=this.$store.state.user.orderState.toString()||(this.defaultShow=!1)),this.getList(this.form))},mounted:function(){},computed:r()({},i.i(f.b)(["elements"])),methods:{handleReason:function(e){var t=this;i.i(s.a)({orderName:e}).then(function(e){200==e.status?(t.resonList=[{name:"推送时间",value:t.crtTimeFtt(e.data.rows[0].RequestTime)},{name:"错误代码",value:JSON.parse(e.data.rows[0].ResponseData).errcode},{name:"错误原因",value:JSON.parse(e.data.rows[0].ResponseData).errmsg}],t.resonVisible=!0):t.$message.warning(e.tip)})},sortChange:function(e){var t=(e.column,e.prop),i=e.order;"Time"==t?("ascending"==i?(this.form.orderBy=1,this.form.AscOrDesc="asc"):(this.form.orderBy=1,this.form.AscOrDesc="desc"),this.getList(this.form)):"fTime"==t&&("ascending"==i?(this.form.orderBy=2,this.form.AscOrDesc="asc"):(this.form.orderBy=2,this.form.AscOrDesc="desc"),this.getList(this.form))},rowKey:function(e){return e.Id},handleHelp:function(e,t){var i=t.column,a="点击进入"+i.label+"详情";if("样板名"==i.label)var a="点击显示"+i.label+"详情";return e("el-tooltip",{class:"item",attrs:{effect:"light",content:a,placement:"top"}},[e("span",[i.label,e("img",{attrs:{src:"static/img/icon_help.png",alt:""},class:"backFile"})])])},changeType:function(e){this.$store.dispatch("GetOrderType",e).then(function(){}),localStorage.setItem("GetOrderType",e),"gd"==e?(this.form.Yield="",this.handleFilter()):this.handleFilter()},gotoDetail:function(){var e=this;this.$nextTick().then(function(){""!==i.i(m.d)("projectID")&&""!==localStorage.getItem("type")&&e.$router.push({path:"/baseManager/Detail",query:{projectID:i.i(m.d)("projectID"),type:localStorage.getItem("type")}})})},selectType:function(e){},selectStaus:function(e){this.form.State=e,this.$store.dispatch("GetOrderState",this.form.State).then(function(){}),-1==this.form.bingNum?this.defaultShow=!1:this.defaultShow=0!=e&&2!=e,this.getList(this.form)},selectBindStaus:function(e){this.form.bingNum=e,this.$store.dispatch("GetBindOrderState",this.form.bingNum).then(function(){}),-1==e?(this.form.IsBind=1,this.defaultShow=!1,this.$store.dispatch("ShowBindOrderState",this.defaultShow).then(function(){})):0==e?this.defaultShow=!1:(0==this.form.State||2==this.form.State?this.defaultShow=!1:(this.defaultShow=!0,this.$store.dispatch("ShowBindOrderState",this.defaultShow).then(function(){})),this.form.IsBind=e),this.getList(this.form)},selectColor:function(e,t){return-1==this.form.bingNum?"":0==e.BindId?"":e.BindId?e.colorIndex%2==0?"success-row":"warning-row1":""},changeShow:function(){this.flag=1},ChangeRank:function(e,t){var a=this;if(0==this.flag)return!1;var n={};n.Id=t.Id,n.rank=t.rank,i.i(s.b)(n).then(function(e){200==e.status?(a.$message({message:e.tip,type:"success",durantion:1e3,offset:700}),a.flag=0):a.$message({message:e.tip,type:"error",durantion:1e3,offset:700})})},isBind:function(e){return 0==e.BindId?"未绑定":e.BindId},handleSelectionChange:function(e){var t=this;this.arr=[];var i=[],a=!1;e.forEach(function(e){i.push(e.BindId),-1!=i.indexOf(1)&&-1!=i.indexOf(0)&&(a=!0)}),0!=i.length?0==i[0]?(this.selectState="unSelect",e.forEach(function(e){t.arr.push(e.Id)})):(this.selectState="selected",e.forEach(function(e){-1==t.arr.indexOf(e.BindId)&&t.arr.push(e.BindId)})):this.selectState="",a&&(this.$message({message:"全选不可包含绑定和未绑定",type:"error"}),this.$refs.multipleTable.clearSelection())},isSelect:function(e){return"unSelect"==this.selectState&&0!=e.BindId?0:"selected"==this.selectState&&0==e.BindId?0:1},toggleSelection:function(e){var t=this;e?e.forEach(function(e){t.$refs.multipleTable.toggleRowSelection(e)}):this.$refs.multipleTable.clearSelection()},getList:function(e){var t=this;this.form=r()({},this.form,e),this.listQuery=r()({},this.listQuery,e),this.listLoading=!0,i.i(s.c)(e).then(function(e){200===e.status?(t.list=e.data.rows,t.total=e.data.total,t.listLoading=!1,t.list.forEach(function(e,i){0==i?e.colorIndex=t.colorIndex:t.list[i].BindId==t.list[i-1].BindId?e.colorIndex=t.colorIndex:(t.colorIndex++,e.colorIndex=t.colorIndex)})):(t.list=null,t.total=0,t.listLoading=!1)})},handleBind:function(){var e=this;i.i(s.d)(this.arr).then(function(t){200==t.status?(e.$message({message:"修改成功",type:"success",duration:2e3,offset:700}),e.getList(e.form)):201==t.status&&(e.$message({message:t.tip,type:"error",durantion:2e3,offset:700}),e.getList(e.form))})},handleUnBind:function(){var e=this;i.i(s.e)(this.arr).then(function(t){200==t.status?(e.$message({message:"修改成功",type:"success",duration:2e3,offset:700}),e.getList(e.form)):201==t.status&&(e.$message({message:t.tip,type:"error",durantion:2e3,offset:700}),e.getList(e.form))})},handleModelView:function(e){var t=this;i.i(s.f)(e.ModelName).then(function(e){t.form1=e.data.rows[0]}),this.dialogFormVisible=!0},crtTimeFtt:function(e){return i.i(m.e)(e.substring(6,19),!0)},handleStyleView:function(e){var t=this;i.i(s.f)(e.StyleName).then(function(e){200==e.status?t.form1=e.data.rows[0]:(t.form1="",t.$message({message:e.tip,type:"warning",durantion:2e3}))}),this.dialogFormVisible=!0},handleFilter:function(){this.$store.dispatch("GetOrderState",this.form.State).then(function(){}),void 0!=this.form.sTime&&""!=this.form.sTime&&null!=this.form.sTime?this.form.eTime=(new Date).toLocaleDateString().replace(/\//g,"-")+"-23:59":(this.form.sTime=void 0,this.form.eTime=void 0),""==this.form.Yield&&(this.form.Yield=void 0),this.getList(this.form)},handleSizeChange:function(e){this.form.limit=e,this.getList(this.form)},handleCurrentChange:function(e){this.form.page=e,this.getList(this.form)},handleEdit:function(e,t){var a=this;({}).Id=t.Id,this.$confirm("此操作将永久删除该文件, 是否继续?","删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.i(s.g)(t.Id).then(function(e){200==e.status?a.$message({message:"删除成功",type:"success",durantion:2e3}):201==e.status?a.$message({message:e.tip,type:"error",durantion:2e3}):a.$message({message:e.tip,type:"warning",durantion:2e3}),a.getList(a.form)})}).catch(function(){})},handleDown:function(e,t){var a=this;this.isloading=e;var n={};n.Id=t.Id,n.token=this.$store.getters.token,i.i(s.h)(n).then(function(e){201==e.status?(a.$message({message:e.tip,type:"error",durantion:2e3}),a.isloading=-1):(window.location.href="/bmapi/downOrder?Id="+n.Id+"&token="+n.token,a.isloading=-1)})},handleRest:function(e,t){var a=this,n={};n.code=t.Step,n.pcid=t.Id,this.$confirm("此操作将重置订单, 是否继续?","重置",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.i(s.i)(n).then(function(e){200==e.status?(a.$message({title:"成功",message:e.tip,type:"success",duration:2e3,offset:700}),a.form.State,a.getList(a.form)):a.$message({title:"失败",message:e.tip,type:"warning",duration:2e3,offset:700})})})},handleDelete:function(e){var t=this;this.$confirm("此操作将永久删除, 是否继续?","删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.i(s.j)(e.id).then(function(i){if(200==i.status){t.$message({title:"成功",message:"删除成功",type:"success",duration:2e3,offset:700});var a=t.list.indexOf(e);t.list.splice(a,1)}else t.$message({title:"失败",message:i.tip,type:"warning",duration:2e3,offset:700})})})},handleEditChange:function(e,t){this.formInfo.code=37,this.formInfo.LoginiId=this.$store.state.user.login_id,this.formInfo.pcid=t.Id,this.removeId=t.Id,this.getMoveMes(this.formInfo)},cancleRemove:function(){this.dialogRemove=!1},getMoveMes:function(e){var t=this;i.i(c.a)(e).then(function(e){200==e.status?(t.optionsRemove=e.data.rows,t.dialogRemove=!0):t.$message({message:e.tip,type:"warning",duration:2e3})})},sureRemovePod:function(){var e=this,t={};if(t.orderId=this.removeId,""==this.radioRemove||null==this.radioRemove)return this.$message({message:"请选择员工",type:"warning",duration:2e3}),!1;t.loginId=this.radioRemove,i.i(s.k)(t).then(function(t){200==t.status?(e.$message({message:t.tip,type:"success",duration:2e3}),e.getList(e.form),e.dialogRemove=!1):e.$message({message:t.tip,type:"warning",duration:2e3}),e.dialogRemove=!1})},resetTemp:function(){this.form={UserName:void 0,Phone:void 0,State:"",Up:void 0,Down:void 0,MAC:void 0,Remark:void 0,Yield:""}},routerLink:function(e,t,i){i.mode=t,this.$router.push({name:e,query:{id:i.Id,mode:t,type:i.type,status:i.State,modelid:i.OrderId,OrderInfo:n()(i)}})}},filters:{StyleIquiryStatus:function(e){return 0==e?"废弃":1==e?"进行中":2==e?"已完成":"未知"},isRankStatus:function(e){return"0"==e?"普通":"1"==e?"优先":"加急"},StyleIquiryStep:function(e){var t=e.Step;return 0==e.type?22==t?"废弃":23==t?"进行中":25==t?"已完成":26==t?"废弃":27==t?"进行中":33==t?"尺码压缩":34==t?"尺寸驱动":35==t?"特体检查":37==t?"裁剪规划":"未知":33==t?"尺码压缩":34==t?"尺寸驱动":35==t?"特体检查":37==t?"裁剪规划":"未知"},changeTime:function(e){if(""!==e||void 0!==e){var t=/[0-9]+/.exec(e),i=parseInt(t[0],10),a=new Date(parseInt(i,10)),n=a.getFullYear(),o=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,r=a.getDate()<10?"0"+a.getDate():a.getDate(),s=a.getHours()<10?"0"+a.getHours():a.getHours(),l=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes();a.getSeconds()<10?a.getSeconds():a.getSeconds();return n+"-"+o+"-"+r+" "+s+":"+l}return"/"}}}},QxNj:function(e,t,i){"use strict";function a(e){return i.i(b.a)({url:"/bmapi/bedinfo?Id="+e,method:"get"})}function n(e){return i.i(b.a)({url:"/bmapi/orderDetailProcess?ModelId="+e,method:"get"})}function o(e){return i.i(b.a)({url:"/bmapi/OrderDetail",method:"get",params:e})}function r(e){return i.i(b.a)({url:"/bmapi/podinfo?id="+e,method:"get"})}function s(e){return i.i(b.a)({url:"/bmapi/pc",method:"post",data:e})}function l(e){return i.i(b.a)({url:"/bmapi/taskhandle/acceptUsers",method:"get",params:e})}function u(e){return i.i(b.a)({url:"/bmapi/taskhandle/moveTask",method:"post",data:e})}function c(e){return i.i(b.a)({url:"/bmapi/taskhandle/movePod",method:"put",data:e})}function d(e){return i.i(b.a)({url:"/bmapi/measurebodyinfo",method:"get",params:e})}function m(e){return i.i(b.a)({url:"/bmapi/getlshbyerpid",method:"get",params:e})}function f(e){return i.i(b.a)({url:"/bmapi/materialInfo?Id="+e,method:"get"})}function p(e){return i.i(b.a)({url:"/bmapi/downbedinfo",method:"get",params:e})}function h(e){return i.i(b.a)({url:"/bmapi/getorderjson",method:"get",params:e})}function g(e){return i.i(b.a)({url:"/bmapi/editefabric",method:"put",data:e})}function v(e){return i.i(b.a)({url:"/bmapi/Updatestate",method:"post",data:e})}t.g=a,t.e=n,t.f=o,t.h=r,t.m=s,t.a=l,t.n=u,t.o=c,t.j=d,t.k=m,t.i=f,t.l=p,t.d=h,t.c=g,t.b=v;var b=i("Vo7i")},Tl1r:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"pagination-container"},[i("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,30,50],"page-size":e.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t}}})],1)},staticRenderFns:[]}},"VT+v":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("woOf"),n=i.n(a);t.default={name:"Pagination",props:{total:{type:Number,default:0},listQuery:{type:Object}},data:function(){return{limit:0,currentPage:0}},methods:{handleSizeChange:function(e){var t=n()({},this.listQuery);t.page=1,t.limit=e,this.limit=e,this.currentPage=1,localStorage.setItem("totalPage",this.limit),this.$emit("PageChange",t)},handleCurrentChange:function(e){var t=n()({},this.listQuery);t.page=e,this.currentPage=e,t.limit=this.limit,this.$emit("PageChange",t)}},created:function(){this.limit=Number(localStorage.getItem("totalPage")||this.listQuery.limit),this.currentPage=this.listQuery.page}}},ZPKS:function(e,t,i){(function(e){function a(e,t){this._id=e,this._clearFn=t}var n=void 0!==e&&e||"undefined"!=typeof self&&self||window,o=Function.prototype.apply;t.setTimeout=function(){return new a(o.call(setTimeout,n,arguments),clearTimeout)},t.setInterval=function(){return new a(o.call(setInterval,n,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},a.prototype.unref=a.prototype.ref=function(){},a.prototype.close=function(){this._clearFn.call(n,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},i("mypn"),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(t,i("DuR2"))},dNGm:function(e,t,i){"use strict";function a(e){return i.i(w.a)({url:"/bmapi/orderSearch",method:"get",params:e})}function n(e){return i.i(w.a)({url:"/bmapi/binding",method:"put",data:e})}function o(e){return i.i(w.a)({url:"/bmapi/removebinding ",method:"put",data:e})}function r(e){return i.i(w.a)({url:"/bmapi/order",method:"put",data:e})}function s(e){return i.i(w.a)({url:"/bmapi/order",method:"put",data:e})}function l(e){return i.i(w.a)({url:"/bmapi/order?Id="+e,method:"delete"})}function u(e){return i.i(w.a)({url:"/bmapi/downOrder?Id="+e.Id+"&token="+e.token,method:"get"})}function c(e){return i.i(w.a)({url:"/bmapi/styleDetail?ModelName="+e,method:"get"})}function d(e){return i.i(w.a)({url:"/bmapi/pc",method:"post",data:e})}function m(e){return i.i(w.a)({url:"/bmapi/setOrderDoMark",method:"put",data:e})}function f(e){return i.i(w.a)({url:"/bmapi/requests/getorderlogs",method:"get",params:e})}function p(e){return i.i(w.a)({url:"/bmapi/requests/getorderlogone",method:"get",params:e})}function h(e){return i.i(w.a)({url:"/bmapi/import/entryprocess",method:"post",data:e})}function g(e){return i.i(w.a)({url:"/bmapi/requests/UpdateJson",method:"post",data:e})}function v(e){return i.i(w.a)({url:"/bmapi/pl/GetPLALL",method:"get",params:e})}function b(e){return i.i(w.a)({url:"/bmapi/requests/UpdatePL",method:"post",data:e})}function y(e){return i.i(w.a)({url:"/bmapi/requests/GetRequestsByOrderName",method:"get",params:e})}t.c=a,t.d=n,t.e=o,t.j=r,t.b=s,t.g=l,t.h=u,t.f=c,t.i=d,t.k=m,t.q=f,t.p=p,t.o=h,t.n=g,t.l=v,t.m=b,t.a=y;var w=i("Vo7i")},gMxL:function(e,t,i){function a(e){i("672h")}var n=i("VU/8")(i("7ByH"),i("+Eh2"),a,null,null);e.exports=n.exports},mvHQ:function(e,t,i){e.exports={default:i("qkKv"),__esModule:!0}},mypn:function(e,t,i){(function(e,t){!function(e,i){"use strict";function a(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),i=0;i<t.length;i++)t[i]=arguments[i+1];var a={callback:e,args:t};return u[l]=a,s(l),l++}function n(e){delete u[e]}function o(e){var t=e.callback,a=e.args;switch(a.length){case 0:t();break;case 1:t(a[0]);break;case 2:t(a[0],a[1]);break;case 3:t(a[0],a[1],a[2]);break;default:t.apply(i,a)}}function r(e){if(c)setTimeout(r,0,e);else{var t=u[e];if(t){c=!0;try{o(t)}finally{n(e),c=!1}}}}if(!e.setImmediate){var s,l=1,u={},c=!1,d=e.document,m=Object.getPrototypeOf&&Object.getPrototypeOf(e);m=m&&m.setTimeout?m:e,"[object process]"==={}.toString.call(e.process)?function(){s=function(e){t.nextTick(function(){r(e)})}}():function(){if(e.postMessage&&!e.importScripts){var t=!0,i=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=i,t}}()?function(){var t="setImmediate$"+Math.random()+"$",i=function(i){i.source===e&&"string"==typeof i.data&&0===i.data.indexOf(t)&&r(+i.data.slice(t.length))};e.addEventListener?e.addEventListener("message",i,!1):e.attachEvent("onmessage",i),s=function(i){e.postMessage(t+i,"*")}}():e.MessageChannel?function(){var e=new MessageChannel;e.port1.onmessage=function(e){r(e.data)},s=function(t){e.port2.postMessage(t)}}():d&&"onreadystatechange"in d.createElement("script")?function(){var e=d.documentElement;s=function(t){var i=d.createElement("script");i.onreadystatechange=function(){r(t),i.onreadystatechange=null,e.removeChild(i),i=null},e.appendChild(i)}}():function(){s=function(e){setTimeout(r,0,e)}}(),m.setImmediate=a,m.clearImmediate=n}}("undefined"==typeof self?void 0===e?this:e:self)}).call(t,i("DuR2"),i("W2nU"))},qkKv:function(e,t,i){var a=i("FeBl"),n=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}},"rD+4":function(e,t,i){t=e.exports=i("FZ+f")(!1),t.push([e.i,".el-table .success-row{background:oldlace}.el-table .warning-row1{background:#ebf9eb}.message-box{width:50%;margin:0 auto}.table-message{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.table-message b{margin:10px}.table-message b span{font-weight:500}.table-img{width:100px;height:100px}.el-message-box__wrapper{top:200px}.order-search-top{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}",""])}});