webpackJsonp([76],{"4iIC":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-row",[r("el-col",{attrs:{span:24}},[r("el-button-group",[t.groupManager_btn_add?r("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.handlerAdd}},[t._v("添加")]):t._e(),t._v(" "),t.groupManager_btn_edit?r("el-button",{attrs:{type:"primary",icon:"edit"},on:{click:t.handlerEdit}},[t._v("编辑")]):t._e(),t._v(" "),t.groupManager_btn_del?r("el-button",{attrs:{type:"primary",icon:"delete"},on:{click:t.handleDelete}},[t._v("删除")]):t._e(),t._v(" "),t.groupManager_btn_resourceManager?r("el-button",{attrs:{type:"primary"},on:{click:t.handlerAuthority}},[r("icon-svg",{attrs:{"icon-class":"quanxian1"}}),t._v("权限分配")],1):t._e(),t._v(" "),t.groupManager_btn_userManager?r("el-button",{attrs:{type:"primary"},on:{click:t.handlerUser}},[r("icon-svg",{attrs:{"icon-class":"27"}}),t._v("关联用户")],1):t._e()],1)],1),t._v(" "),r("el-col",{staticStyle:{"margin-top":"15px"},attrs:{span:8}},[r("el-input",{attrs:{placeholder:"输入关键字进行过滤"},model:{value:t.filterText,callback:function(e){t.filterText=e},expression:"filterText"}}),t._v(" "),r("el-tree",{ref:"groupTree",staticClass:"filter-tree",attrs:{data:t.treeData,"node-key":"id","highlight-current":"",props:t.defaultProps,"filter-node-method":t.filterNode,"default-expand-all":""},on:{"node-click":t.getNodeData}})],1),t._v(" "),r("el-col",{staticStyle:{"margin-top":"15px"},attrs:{span:16}},[r("el-form",{ref:"form",attrs:{"label-position":t.labelPosition,"label-width":"80px",model:t.form}},[r("el-form-item",{attrs:{label:"名称"}},[r("el-input",{attrs:{disabled:t.formEdit},model:{value:t.form.name,callback:function(e){t.form.name=e},expression:"form.name"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"编码"}},[r("el-input",{attrs:{disabled:t.formEdit},model:{value:t.form.code,callback:function(e){t.form.code=e},expression:"form.code"}})],1),t._v(" "),r("el-form-item",{attrs:{label:"描述"}},[r("el-input",{attrs:{disabled:t.formEdit},model:{value:t.form.description,callback:function(e){t.form.description=e},expression:"form.description"}})],1),t._v(" "),"update"==t.formStatus?r("el-form-item",[t.groupManager_btn_edit?r("el-button",{attrs:{type:"primary"},on:{click:t.update}},[t._v("更新")]):t._e(),t._v(" "),r("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1):t._e(),t._v(" "),"create"==t.formStatus?r("el-form-item",[t.groupManager_btn_add?r("el-button",{attrs:{type:"primary"},on:{click:t.create}},[t._v("保存")]):t._e(),t._v(" "),r("el-button",{on:{click:t.onCancel}},[t._v("取消")])],1):t._e()],1)],1),t._v(" "),r("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:t.dialogUserName,visible:t.dialogUserVisible},on:{"update:visible":function(e){t.dialogUserVisible=e}}},[r("group-user",{ref:"groupUser",attrs:{groupId:t.currentId},on:{closeUserDialog:t.closeUserDialog}})],1),t._v(" "),r("el-dialog",{directives:[{name:"dialogDrag",rawName:"v-dialogDrag"}],attrs:{title:t.dialogAuthorityName,size:"large",visible:t.dialogAuthorityVisible},on:{"update:visible":function(e){t.dialogAuthorityVisible=e}}},[r("group-authority",{ref:"groupAuthority",attrs:{groupId:t.currentId},on:{closeAuthorityDialog:t.closeAuthorityDialog}})],1)],1)},staticRenderFns:[]}},"5uXp":function(t,e,r){"use strict";function i(t){return r.i(f.a)({url:"/api/admin/group/tree",method:"get",params:t})}function o(t){return r.i(f.a)({url:"/api/admin/group",method:"post",data:t})}function a(t){return r.i(f.a)({url:"/api/admin/group/"+t,method:"get"})}function n(t){return r.i(f.a)({url:"/api/admin/group/"+t,method:"delete"})}function s(t,e){return r.i(f.a)({url:"/api/admin/group/"+t,method:"put",data:e})}function u(t){return r.i(f.a)({url:"/api/admin/group/"+t+"/user",method:"get"})}function l(t,e){return r.i(f.a)({url:"/api/admin/group/"+t+"/user",method:"put",params:e})}function d(t,e){return r.i(f.a)({url:"/api/admin/group/"+t+"/authority/element/remove",method:"post",params:e})}function c(t,e){return r.i(f.a)({url:"/api/admin/group/"+t+"/authority/element/add",method:"post",params:e})}function p(t){return r.i(f.a)({url:"/api/admin/group/"+t+"/authority/element",method:"get"})}function g(t,e){return r.i(f.a)({url:"/api/admin/group/"+t+"/authority/menu",method:"post",params:e})}function m(t){return r.i(f.a)({url:"/api/admin/group/"+t+"/authority/menu",method:"get"})}e.c=i,e.g=o,e.d=a,e.e=n,e.f=s,e.b=u,e.a=l,e.j=d,e.i=c,e.h=p,e.k=g,e.l=m;var f=r("Vo7i")},"76g8":function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r("Dd8w"),o=r.n(i),a=r("5uXp"),n=r("NYxO");e.default={name:"groupDetail",components:{"group-user":function(){return r.e(98).then(r.bind(null,"jmoS"))},"group-authority":function(){return r.e(97).then(r.bind(null,"firN"))}},props:{type:{default:"1"}},data:function(){return{filterText:"",list:null,total:null,formEdit:!0,formAdd:!0,formStatus:"",dialogUserVisible:!1,dialogUserName:"关联用户",dialogAuthorityVisible:!1,dialogAuthorityName:"关联资源",listQuery:{groupType:this.type,name:void 0},treeData:[],defaultProps:{children:"children",label:"label"},labelPosition:"right",groupManager_btn_edit:!1,groupManager_btn_del:!1,groupManager_btn_add:!1,groupManager_btn_userManager:!1,groupManager_btn_resourceManager:!1,form:{code:void 0,name:void 0,description:void 0,groupType:this.type},currentId:-1}},watch:{filterText:function(t){this.$refs.groupTree.filter(t)}},created:function(){this.getList(),this.groupManager_btn_edit=this.elements["groupManager:btn_edit"],this.groupManager_btn_del=this.elements["groupManager:btn_del"],this.groupManager_btn_add=this.elements["groupManager:btn_add"],this.groupManager_btn_userManager=this.elements["groupManager:btn_userManager"],this.groupManager_btn_resourceManager=this.elements["groupManager:btn_resourceManager"]},computed:o()({},r.i(n.b)(["elements"])),methods:{getList:function(){var t=this;r.i(a.c)(this.listQuery).then(function(e){t.treeData=e})},filterNode:function(t,e){return!t||-1!==e.label.indexOf(t)},getNodeData:function(t){var e=this;this.formEdit||(this.formStatus="update"),r.i(a.d)(t.id).then(function(t){e.form=t.data}),this.currentId=t.id},handlerEdit:function(){this.form.id&&(this.formEdit=!1,this.formStatus="update")},handlerAdd:function(){this.resetForm(),this.formEdit=!1,this.formStatus="create"},handleDelete:function(){var t=this;this.$confirm("此操作将永久删除, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){r.i(a.e)(t.currentId).then(function(){t.getList(),t.resetForm(),t.onCancel(),t.$message({title:"成功",offset:700,message:"删除成功",type:"success",duration:2e3})})})},update:function(){var t=this;r.i(a.f)(this.form.id,this.form).then(function(){t.getList(),t.$message({title:"成功",offset:700,message:"创建成功",type:"success",duration:2e3})})},create:function(){var t=this;r.i(a.g)(this.form).then(function(){t.getList(),t.$message({offset:700,title:"成功",message:"创建成功",type:"success",duration:2e3})})},onCancel:function(){this.formEdit=!0,this.formStatus=""},resetForm:function(){this.form={parentId:this.currentId,code:void 0,name:void 0,description:void 0,groupType:this.type}},handlerUser:function(){this.dialogUserVisible=!0,void 0!==this.$refs.groupUser&&(this.$refs.groupUser.groupId=this.currentId,this.$refs.groupUser.initUsers())},handlerAuthority:function(){this.dialogAuthorityVisible=!0,void 0!==this.$refs.groupAuthority&&(this.$refs.groupAuthority.groupId=this.currentId,this.$refs.groupAuthority.initAuthoritys())},closeUserDialog:function(){this.dialogUserVisible=!1},closeAuthorityDialog:function(){this.dialogAuthorityVisible=!1}}}},Ffe0:function(t,e,r){var i=r("VU/8")(r("76g8"),r("4iIC"),null,null,null);t.exports=i.exports}});