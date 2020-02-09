<template>
    <div class="table-cantain">
      <div style=" text-align: center" >
 <el-input style="width: 230px;" class="filter-item" placeholder="请输入文件名" v-model="fileInfo.FileName"> </el-input>
        <el-button class="filter-item" type="primary" @click="handleSave">保存</el-button>
        <span style='font-size: 18px;margin-left: 50px;'>款名：{{fileInfo.StyleName}}</span> <span style='font-size: 18px;margin-left: 50px;margin-right: 50px;'>路径：{{fileInfo.FilePath}}</span>
      </div>
       
        <el-table :data="tableDataFileList" border style="width: 100%;margin-top:25px;">
            <el-table-column prop="Id" label="ID" align="center">
            </el-table-column>
            <el-table-column prop="StyleName" label="款名" align="center">
            </el-table-column>
            <el-table-column prop="FileName" align="center" label="文件名">
            </el-table-column>
            <el-table-column prop="FilePath" align="center" label="文件路径">
            </el-table-column>
            <el-table-column prop="CreateTime" align="center" label="时间">
                <template scope="scope">
                  {{scope.row.CreateTime | TimeChange}}
</template>
    </el-table-column>
  </el-table>
    </div>
</template>
<script>
    import {
        getFilebyIdList,
        getFileList,
        getuploadftp,
        getSavaFileParap,
        deleteFailFile
    } from "api/admin/demo";
    import {
        GetUrlParam
    } from "utils/index";
    import {
        getToken
    } from "utils/auth";
    export default {
        data() {
            return {
                tableDataFileList: [],
                fileInfo: {
                    StyleName: "",
                    FilePath: ""
                },
                SaveName:'',
                fileId:'',
            };
        },
        mounted() {},
        created() {
            // alert(window.location);
            this.getFileInfo();
            this.getfile();
        },
        methods: {
            getFileInfo() {
                var fileId = "";
                var projectID = "";
                if (GetUrlParam("id") != "") {
                    projectID = GetUrlParam("id");
                }
                if (GetUrlParam("fileid") != "") {
                    fileId = GetUrlParam("fileid");
                } else if (GetUrlParam("fileid") == "") {
                    fileId = 0;
                    this.fileId =0;
                }
                var data = {
                    fileId: fileId,
                    projectID: projectID,
                    token: getToken()
                };
                getFilebyIdList(data).then(res => {
                    if (res.Success) {
                        this.fileInfo = res.Data;
                        this.SaveName = res.Data.FileName;
                        // console.log(res);
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.ErrMes,
                            type: "error",
                            duration: 2000
                        });
                    }
                });
            },
            getfile() {
                var queryForm = {
                    projectID: GetUrlParam("id"),
                    query: "",
                    pageIndex: 1,
                    pageSize: 10,
                    token: getToken(),
                    fileType: ""
                };
                getFileList(queryForm).then(res => {
                    if (res.Success) {
                        // console.log(res);
                        this.tableDataFileList = res.Data.Rows;
                    } else {
                        this.tableDataFileList = [];
                        this.$message({
                            showClose: true,
                            message: res.ErrMes,
                            type: "error",
                            duration: 2000
                        });
                    }
                });
            },
            handleSave() {
                // alert(window.location);
                if (this.fileInfo.FileName.replace(/\s+/g, "") == "") {
                    this.$message({
                        showClose: true,
                        message: "请输入文件名！",
                        type: "warning",
                        duration: 2000
                    });
                    return false;
                }
                if (this.fileInfo.FileId == 0) {
                    var data = {
                        fileId: this.fileId, //url上拿过来的id
                        projectID: GetUrlParam("id"), //url上拿过来的fileid
                        isUP: 0,
                        fileName: this.fileInfo.FileName,
                        fileType: "BD",
                        token: getToken()
                    };

                    getSavaFileParap(data).then(res => {
                        // alert(JSON.stringify(res))
                        if (res.Success) {
                            var form = {};
                            form.projectID = GetUrlParam("id"); //url上拿过来的fileid
                            form.fileID = res.Data.FileId;
                            form.filePath = res.Data.Path;
                            form.fileName = this.fileInfo.FileName;
                            form.token = getToken();
                            this.GetUploadFtpInfo(form);
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.ErrMes,
                                type: "error",
                                duration: 2000
                            });
                        }
                    });
                }else{
                if (this.fileInfo.FileName.replace(/\s+/g, "") == this.SaveName) {
                var form = {};
                form.projectID = GetUrlParam("id");//url上拿过来的fileid
                form.fileID = this.fileInfo.FileId;
                form.filePath = this.fileInfo.FilePath;
                form.fileName = this.fileInfo.FileName;
                form.token = getToken();
                this.GetUploadFtpInfo(form);
            }
                }
                
            },
            //上传失败调用
            deleteFile(fileID){
                var data ={};
                    data.fileID = fileID;
                deleteFailFile(data).then(res=>{
                    //  alert(JSON.stringify(res));
                       if(res.Success){

                   }else{
                          this.$message({
                                showClose: true,
                                message: res.ErrMes,
                                type: "error",
                                duration: 2000
                            });
                   }
                })
            },
            // 获取upload参数
            GetUploadFtpInfo(form) {
                getuploadftp(form).then(res => {
                    // alert(JSON.stringify(res.Data));
                    if (res.Success) {
                        var state = "";
                        if (this.bowserExplorer == "ie") {
                            state = window.external.saveFile(JSON.stringify(res.Data));
                            if (state == "OK") {
                                form.isUP = 1;
                                this.postsavaFilePara(form);
                                
                                window.external.closeDialog(0);
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: state,
                                    type: "error",
                                    duration: 2000
                                });
                                this.deleteFile(form.fileID);
                            }
                        } else {
                            state = window.buyiSaveFile(JSON.stringify(res.Data));
                            if (state == "OK") {
                                form.isUP = 1;
                                this.postsavaFilePara(form);
                                window.buyiCloseDialog(0);
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: state,
                                    type: "error",
                                    duration: 2000
                                });
                                this.deleteFile(form.fileID);
                            }
                        }
                    }
                });
            },
            postsavaFilePara(form) {
                getSavaFileParap(form).then(res=>{
                    // alert(JSON.stringify(res));
                   if(res.Success){

                   }else{
                          this.$message({
                                showClose: true,
                                message: res.ErrMes,
                                type: "error",
                                duration: 2000
                            });
                   }
                })
            }
        }
    };
</script>
<style>
    .table-cantain {
        padding: 30px;
    }
</style>
