webpackJsonp([37],{"36s2":function(e,t,i){function a(e){i("Rz/Y")}var n=i("VU/8")(i("51Pj"),i("YZj9"),a,null,null);e.exports=n.exports},"51Pj":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("mvHQ"),n=i.n(a),l=i("aHb3"),o=i("0xDb"),r=i("TIfe");t.default={data:function(){return{tableDataFileList:[],fileInfo:{StyleName:"",FilePath:""},SaveName:"",fileId:""}},mounted:function(){},created:function(){this.getFileInfo(),this.getfile()},methods:{getFileInfo:function(){var e=this,t="",a="";""!=i.i(o.d)("id")&&(a=i.i(o.d)("id")),""!=i.i(o.d)("fileid")?t=i.i(o.d)("fileid"):""==i.i(o.d)("fileid")&&(t=0,this.fileId=0);var n={fileId:t,projectID:a,token:i.i(r.a)()};i.i(l.g)(n).then(function(t){t.Success?(e.fileInfo=t.Data,e.SaveName=t.Data.FileName):e.$message({showClose:!0,message:t.ErrMes,type:"error",duration:2e3})})},getfile:function(){var e=this,t={projectID:i.i(o.d)("id"),query:"",pageIndex:1,pageSize:10,token:i.i(r.a)(),fileType:""};i.i(l.h)(t).then(function(t){t.Success?e.tableDataFileList=t.Data.Rows:(e.tableDataFileList=[],e.$message({showClose:!0,message:t.ErrMes,type:"error",duration:2e3}))})},handleSave:function(){var e=this;if(""==this.fileInfo.FileName.replace(/\s+/g,""))return this.$message({showClose:!0,message:"请输入文件名！",type:"warning",duration:2e3}),!1;if(0==this.fileInfo.FileId){var t={fileId:this.fileId,projectID:i.i(o.d)("id"),isUP:0,fileName:this.fileInfo.FileName,fileType:"SCD",token:i.i(r.a)()};i.i(l.i)(t).then(function(t){if(t.Success){var a={};a.projectID=i.i(o.d)("id"),a.fileID=t.Data.FileId,a.filePath=t.Data.Path,a.fileName=e.fileInfo.FileName,a.token=i.i(r.a)(),e.GetUploadFtpInfo(a)}else e.$message({showClose:!0,message:t.ErrMes,type:"error",duration:2e3})})}else if(this.fileInfo.FileName.replace(/\s+/g,"")==this.SaveName){var a={};a.projectID=i.i(o.d)("id"),a.fileID=this.fileInfo.FileId,a.filePath=this.fileInfo.FilePath,a.fileName=this.fileInfo.FileName,a.token=i.i(r.a)(),this.GetUploadFtpInfo(a)}},deleteFile:function(e){var t=this,a={};a.fileID=e,i.i(l.j)(a).then(function(e){e.Success||t.$message({showClose:!0,message:e.ErrMes,type:"error",duration:2e3})})},GetUploadFtpInfo:function(e){var t=this;i.i(l.k)(e).then(function(i){if(i.Success){var a="";"ie"==t.bowserExplorer?(a=window.external.saveFile(n()(i.Data)),"OK"==a?(e.isUP=1,t.postsavaFilePara(e),window.external.closeDialog(0)):(t.$message({showClose:!0,message:a,type:"error",duration:2e3}),t.deleteFile(e.fileID))):(a=window.buyiSaveFile(n()(i.Data)),"OK"==a?(e.isUP=1,t.postsavaFilePara(e),window.buyiCloseDialog(0)):(t.$message({showClose:!0,message:a,type:"error",duration:2e3}),t.deleteFile(e.fileID)))}})},postsavaFilePara:function(e){var t=this;i.i(l.i)(e).then(function(e){e.Success||t.$message({showClose:!0,message:e.ErrMes,type:"error",duration:2e3})})}}}},OpEI:function(e,t,i){t=e.exports=i("FZ+f")(!1),t.push([e.i,".table-cantain{padding:30px}",""])},"Rz/Y":function(e,t,i){var a=i("OpEI");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i("rjj0")("45fe4fcd",a,!0)},YZj9:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"table-cantain"},[i("div",{staticStyle:{"text-align":"center"}},[i("el-input",{staticClass:"filter-item",staticStyle:{width:"230px"},attrs:{placeholder:"请输入文件名"},model:{value:e.fileInfo.FileName,callback:function(t){e.fileInfo.FileName=t},expression:"fileInfo.FileName"}}),e._v(" "),i("el-button",{staticClass:"filter-item",attrs:{type:"primary"},on:{click:e.handleSave}},[e._v("保存")]),e._v(" "),i("span",{staticStyle:{"font-size":"18px","margin-left":"50px"}},[e._v("款名："+e._s(e.fileInfo.StyleName))]),e._v(" "),i("span",{staticStyle:{"font-size":"18px","margin-left":"50px","margin-right":"50px"}},[e._v("路径："+e._s(e.fileInfo.FilePath))])],1),e._v(" "),i("el-table",{staticStyle:{width:"100%","margin-top":"25px"},attrs:{data:e.tableDataFileList,border:""}},[i("el-table-column",{attrs:{prop:"Id",label:"ID",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{prop:"StyleName",label:"款名",align:"center"}}),e._v(" "),i("el-table-column",{attrs:{prop:"FileName",align:"center",label:"文件名"}}),e._v(" "),i("el-table-column",{attrs:{prop:"FilePath",align:"center",label:"文件路径"}}),e._v(" "),i("el-table-column",{attrs:{prop:"CreateTime",align:"center",label:"时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                  "+e._s(e._f("TimeChange")(t.row.CreateTime))+"\n")]}}])})],1)],1)},staticRenderFns:[]}},aHb3:function(e,t,i){"use strict";function a(e){return i.i(v.a)({url:"/bmapi/demo/vuebuyiPostreturn",method:"post",data:e})}function n(e){return i.i(v.a)({url:"/bmapi/demo/createftp",method:"post",params:e})}function l(e){return i.i(v.a)({url:"/bmapi/demo/buyiLockOrder",method:"post",params:e})}function o(e){return i.i(v.a)({url:"/bmapi/demo/buyiLockModel",method:"post",params:e})}function r(e){return i.i(v.a)({url:"/bmapi/demo/getFileinfobyId",method:"get",params:e})}function s(e){return i.i(v.a)({url:"/bmapi/demo/getFileList",method:"get",params:e})}function f(e){return i.i(v.a)({url:"/bmapi/demo/singlejson",method:"get",params:e})}function u(e){return i.i(v.a)({url:"/bmapi/demo/uploadftp",method:"post",params:e})}function d(e){return i.i(v.a)({url:"/bmapi/demo/savaFilePara",method:"post",params:e})}function m(e){return i.i(v.a)({url:"/bmapi/demo/vuebuyiPostreturn",method:"post",data:e})}function p(e){return i.i(v.a)({url:"/bmapi/styleDetail",method:"get",params:e})}function c(e){return i.i(v.a)({url:"/bmapi/demo/delefailfile",method:"delete",params:e})}function h(e){return i.i(v.a)({url:"/bmapi/demo/vuegetfabriclist",method:"get",params:e})}function g(e){return i.i(v.a)({url:"/bmapi/demo/vueeditefabric",method:"post",data:e})}t.l=a,t.b=n,t.c=l,t.f=o,t.g=r,t.h=s,t.a=f,t.k=u,t.i=d,t.n=m,t.m=p,t.j=c,t.d=h,t.e=g;var v=i("Vo7i")},mvHQ:function(e,t,i){e.exports={default:i("qkKv"),__esModule:!0}},qkKv:function(e,t,i){var a=i("FeBl"),n=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}}});