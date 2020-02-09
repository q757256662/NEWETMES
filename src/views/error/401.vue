<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <span style="line-height: 36px;">卡片名称</span> -->
        <el-input style="width:140px;" v-model="orderName" name="orderName" :key="key" placeholder="请输入订单名"></el-input>
        <el-button type="primary" @click="handleSearchBed">搜索</el-button>
        <el-button type="primary" @click="handleDownMore" :disabled="selectBedRow.length==0" :loading="loading">批量下载</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleFormChange" border ref="bedMes">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="BedName" align="center" label="床名" width="400">
        <template scope="scope">
            <el-button type="text" @click="DownloadBed('nc',scope.row)" >
              {{scope.row.BedName}}
            </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="OrderName" align="center" label="订单名"></el-table-column>
      <el-table-column prop="MaterialCode" align="center" label="物料编码"></el-table-column>
      <el-table-column prop="BedLen" align="center" label="长度"> </el-table-column>
      <el-table-column prop="LayCount" align="center" label="层数"> </el-table-column>
      <el-table-column  align="center" label="总长度"> 
        <template scope="scope">
          {{scope.row.BedLen * scope.row.LayCount }}
        </template>     
      </el-table-column>
      <!-- <el-table-column prop="UC" align="center" label="料率"> </el-table-column>
        <el-table-column  align="center" label="下载"> 
          <template scope="scope">
            <el-button @click="DownloadBed('nc',scope.row)">nc</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {bedinfo,downbedinfo,downbedinfos} from "./downloadBed"
export default {
  data() {
    return {
      /**当前表格数据 */
      tableData:[],
      /**查询订单名 */
      orderName:"",
      /**总页数 */
      toatal:0,
      /**当前勾选信息 */
      selectBedRow:[],
      /**加载 */
      loading:false,
      key:Math.random()
    };
  },
  watch:{
    IsDownMore(){
      return this.selectBedRow==0
    }
  },
  methods: {
    /**下载床信息 */
    DownloadBed(type, row) {
      // console.log(row)
        downbedinfo({type,bedId:row.BedId}).then(res=>{
          // console.log(res)
          if(res.hasOwnProperty("Success")&&!res.Success){
            this.$message.warning(res.ErrMes)
          }else{
            // console.log(res)
            // let data = res //data 为了你的数据流

            // let blob=new Blob([data]);//将返回的数据包装成blob（方法的具体使用参考mdn）

            // let alink = document.createElement("a");

            // alink.download=row.BedName+'.nc';//文件名,大部分浏览器兼容,IE10及以下不兼容

            // alink.href=URL.createObjectURL(blob);//根据blob 创建 url

            // alink.click(); //自动点击
            
            this.$refs.bedMes.clearSelection()
            let alink = document.createElement("a");

            alink.href='/bmapi/downbedinfo?bedId='+row.BedId+"&type="+type;//创建 url地址

            alink.click(); //自动点击
            this.$refs.bedMes.clearSelection()
          }
        })
      
    },
    /**批量下载床信息 */
    async handleDownMore(){
      const bedIds = this.selectBedRow.map(el=>el.BedId).join(',')
      // console.log(bedIds)
      this.loading = true
      const result = await downbedinfos({bedIds})
      this.loading = false
      if(result.hasOwnProperty("Success")&&!result.Success){
        this.$message.warning(result.ErrMes)
      }else{
        let alink = document.createElement("a");

        // alink.download="teamplte"//文件名,大部分浏览器兼容,IE10及以下不兼容

        alink.href='/bmapi/downbedinfos?bedIds='+bedIds;//创建 url地址

        alink.click(); //自动点击
        this.$refs.bedMes.clearSelection()
      }
    },
    /**勾选行 */
    handleFormChange(row){
      this.selectBedRow = row
    },
    /**搜索床信息 */
    async handleSearchBed(){
      if(this.orderName==''){
        this.$message.warning('请输入订单名')
        return false
      }
      const result = await bedinfo({id:"",orderName:this.orderName})
      // console.log(result)
      // console.log(result.status==200)
      // console.log(result.status)
      if(result.status==200){
        this.tableData = result.data.rows
        this.total = result.data.total
      }else{
        this.$message.warning(result.tip)
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container{
  padding:20px;
}
</style>
