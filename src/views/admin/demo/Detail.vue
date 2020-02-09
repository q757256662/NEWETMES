<template>
    <div id="demo" class="table-cantain">
      <el-button v-if="type == 'BD'" type="primary" @click="creatModel('model')">新建版单</el-button> 
       <el-button  v-else type="primary" @click="creatModel('order')">新建生产单</el-button> 
       <el-button v-if="type == 'BD'" type="primary" @click="updateModel('model')" >刷新版单信息</el-button>  
       <el-button v-else type="primary" @click="updateModel('order')" >刷新生产单信息</el-button>         
    <el-tabs style="margin-top:30px;" v-model="activeName2" type="card" @tab-click="handleTabClick">
    <el-tab-pane label="尺码" class="measure" name="first">
       <el-table
    :data="tableData"
    border
    v-if="false"
    style="width: 50%">
     <el-table-column
      label="量体"
      align="center" 
      >
      <template scope="scope">
          {{scope.row.name}}
      </template>
    </el-table-column>
    <el-table-column
       align="center" 
    v-for="(item,index) in tableArrName" 
    :key="index"
    :label="item"
     >
      <template scope="scope">
           {{scope.row.measures[index]}}
      </template>
    </el-table-column>
  </el-table>
  <p v-show="orderTpye =='dh'" style="text-align:center">成衣量体信息列表</p>
    <el-table
    :data="tableData"
    border
    v-show="orderTpye =='dh'"
    style="width: 50%">
     <el-table-column
      label="量体"
      align="center" 
      >
      <template scope="scope">
          {{scope.row.name}}
      </template>
    </el-table-column>
    <el-table-column
       align="center" 
    v-for="(item,index) in tableArrName" 
    :key="index"
    :label="item"
     >
      <template scope="scope">
           {{scope.row.measures[index]}}
      </template>
    </el-table-column>
  </el-table>

     <p v-show="orderTpye =='td'">团订量体信息列表</p>
  <el-table
    :data="measureTD"
    border
v-show="orderTpye =='td'"
    style="width: 50%">
     <el-table-column
      label="姓名"
      align="center" 
      >
      <template scope="scope">
          {{scope.row.name}}
      </template>
    </el-table-column>
      <el-table-column prop="sizeName"  align="center" label="号型"> </el-table-column>  
    <el-table-column
       align="center" 
    v-for="(item,index) in measureTDName" 
    :key="index"
    :label="item"
     >
      <template scope="scope">
           {{scope.row.meaValue[index]}}
      </template>
    </el-table-column>
  </el-table>
    <!-- <p v-show="orderTpye =='td'">量体信息列表</p> -->
    <p v-show="false">量体信息列表</p>
    
    <el-table :row-class-name="selectColor" v-show="false" :key='tableKey' :data="measurebodyList" border fit highlight-current-row style="width: 100%">
       <el-table-column prop="ID"  align="center" label="ID">
<template scope="scope">
   {{scope.row.ID}}
</template>
          </el-table-column>  
           <el-table-column prop="LSH"  align="center" label="流水号"> 
<template scope="scope">
   {{scope.row.LSH}}
  <!-- 多个流水号显示 -->
</template>
             </el-table-column> 
      <el-table-column prop="name"  align="center" label="姓名"> </el-table-column>  
      
       <el-table-column prop="sizeName"  align="center" label="尺码"> </el-table-column>
        <el-table-column :key="index" v-for="(item,index) in measureinfoList.measureName" align="center" :label="item">
<template scope="scope">
   {{scope.row.measureVal[index]}}
</template>
           </el-table-column>
      <el-table-column prop="pod"  align="center" label="pod值">
<template scope="scope">
  <a style="color:blue;text-decoration: underline;" href="javascript:" @click="handleDown(scope.row)">{{scope.row.pod}}</a>
</template>
        
         </el-table-column>    
  </el-table>



  
  <!-- GD量体信息列表 -->
 <p v-show=" orderTpye =='gd'">个订量体信息列表</p>
    <el-table  v-show=" orderTpye =='gd'" :key='tableKey' :data="measureGDList" border fit highlight-current-row style="width: 100%">
       <el-table-column prop="id"  align="center" label="ID">
<template scope="scope">
   {{scope.row.id}}
</template>
          </el-table-column>  
   
      <el-table-column prop="name"  align="center" label="姓名">

         </el-table-column>  
      
       <el-table-column prop="sizeName"  align="center" label="尺码"> </el-table-column>
        <el-table-column :key="index" v-for="(item,index) in measureGDinfoList" align="center" :label="item.name">
        <template scope="scope">
        {{scope.row.measure[index].val}}
        </template>
           </el-table-column>
 
  </el-table>

    </el-tab-pane>
    <el-tab-pane label="物料" class="fabic" name="second">
  <el-table
    :data="tableFabric"
    border
    v-if="false"
    style="width: 100%">
    <el-table-column
      label="颜色"
       align="center"
      width="180">
         <template scope="scope">
           {{scope.row.color}}
      </template>
    </el-table-column>
   <el-table-column
      prop="id"
      label="ID"
        align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
        align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="width"
        align="center"
         width="116px"
      label="幅宽(CM)">
    </el-table-column>
    <el-table-column
      prop="details"
        align="center"
      label="详细描述">
    </el-table-column>
    <el-table-column
      prop="len_shrinkage"
        align="center"
      label="经纱缩水率">
    </el-table-column>
    <el-table-column
      prop="width_shrinkage"
        align="center"
      label="纬纱缩水率">
    </el-table-column>
    <el-table-column
      prop="price"
        align="center"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="amount"
       width="116px"
        align="center"
      label="用量(CM)">
    </el-table-column>
  </el-table>


   <div v-if="orderTpye== 'dh'">
<p>颜色搭配详情</p>

  <el-table
    :data="tableFabric"
    border
    style="width: 100%">
    <el-table-column
      label="颜色"
       align="center"
      width="80">
<template scope="scope">
   {{scope.row.color}}
</template>
    </el-table-column>
  <el-table-column
      prop="name"
      label="名称"
        align="center"
      width="180">
    </el-table-column>
   <el-table-column
      prop="id"
      label="ID"
        align="center"
      width="180">
    </el-table-column>
  
    <el-table-column
      prop="width"
       width="116px"
        align="center"
      label="幅宽(CM)">
    </el-table-column>
    <el-table-column
      prop="details"
        align="center"
      label="详细描述">
    </el-table-column>
    <el-table-column
      prop="len_shrinkage"
        align="center"
      label="经纱缩水率">
    </el-table-column>
    <el-table-column
      prop="width_shrinkage"
        align="center"
      label="纬纱缩水率">
    </el-table-column>
    <el-table-column
      prop="price"
        align="center"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="amount"
       width="116px"
      align="center"
      label="用量(CM)">
    </el-table-column>

  </el-table>
    </div> 

    <!-- 个订 -->
 <p v-show=" type== 'gd'">个订物料信息列表</p>

<el-table
    v-show=" type== 'gd'"
    :data="orderMeterial"
    border
    style="width: 100%">
    
  
  <el-table-column
      prop="name"
      label="CAD名称"
        align="center"
      width="180">
    </el-table-column>

   <el-table-column
      prop="id"
      label="ID"
        align="center"
      width="180">
    </el-table-column>

    <el-table-column
      prop="width"
       width="116px"
        align="center"
      label="幅宽(CM)">
    </el-table-column>
<el-table-column
      prop="details"
        align="center"
      label="详细描述">
    </el-table-column>
    
    <el-table-column
      prop="len_shrinkage"
        align="center"
      label="经纱缩水率">
    </el-table-column>
    <el-table-column
      prop="width_shrinkage"
        align="center"
      label="纬纱缩水率">
    </el-table-column>
     <el-table-column
      prop="len_grid"
        align="center"
      label="纬纱条纹宽度">
    </el-table-column>
    <el-table-column
      prop="width_grid"
        align="center"
      label="经纱条纹宽度">
    </el-table-column>
     <el-table-column
      prop="gap"
        align="center"
      label="间隙">
    </el-table-column>
     <el-table-column
      prop="price"
        align="center"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="amount"
       width="116px"
      align="center"
      label="用量(CM)">
    </el-table-column>
  <el-table-column
     
       width="116px"
      align="center"
      label="操作">
      <template scope="scope">
            <el-button size="mini" type="info" @click="editGDShow(scope.row,scope.$index)">编辑</el-button>
      </template>
      
    </el-table-column>
  </el-table>

  
  <!-- 成衣产量信息表 -->
 <p v-if="false">产量信息表</p>
 <el-table
 v-if="false"
    :data="tableGDoutput"
    border
    style="margin-bottom:30px;">
     <el-table-column
      label="颜色"
      align="center" 
      >
<template scope="scope">
   {{scope.row.name}}
</template>
    </el-table-column>
    <el-table-column
       align="center" 
    v-for="(item,index) in tableArrName" 
    :key="index"
    :label="item"
     >
<template scope="scope">
   {{scope.row.quantity[index]}}
</template>
    </el-table-column>

    
  </el-table>

  <p v-show="orderTpye == 'td'&& json != null">团订物料信息列表</p>
<el-table
    v-show="orderTpye == 'td' && json != null"
    :data="orderMeterial"
    border
    style="width: 100%">
    <el-table-column
      label="色号"
       align="center"
      >
<template scope="scope">
   {{scope.row.color}}
</template>
    </el-table-column>
  <el-table-column
      prop="name"
      label="CAD名称"
        align="center"
      width="180">
    </el-table-column>

   <el-table-column
      prop="id"
      label="物料编码"
        align="center"
      width="180">
    </el-table-column>

  <el-table-column
      prop="code"
      label="物料描述"
      align="center">

    </el-table-column>

    <el-table-column
      prop="width"
       width="116px"
        align="center"
      label="门幅(CM)">
    </el-table-column>

     <el-table-column
      prop="dir"
        align="center"
      label="旋转"
       width="80px">
<template scope="scope">
   {{scope.row.dir==0?"否":scope.row.dir==1?"是":''}}
</template>
      
    </el-table-column>
    
  
    <el-table-column
      prop="xShark"
        align="center"
      label="经纱缩水">
    </el-table-column>
    <el-table-column
      prop="yShark"
        align="center"
      label="纬纱缩水">
    </el-table-column>
     <el-table-column
      prop="xWidth"
        align="center"
      label="经纱宽度">
    </el-table-column>
    <el-table-column
      prop="yWidth"
        align="center"
      label="纬纱宽度">
    </el-table-column>
    <el-table-column
      prop="amount"
       width="116px"
      align="center"
      label="用量(CM)">
    </el-table-column>
  <el-table-column
     
       width="116px"
      align="center"
      label="操作">
      <template scope="scope">
            <el-button size="mini" type="info" @click="editShow(scope.row,scope.$index)">编辑</el-button>
      </template>
      
    </el-table-column>

  </el-table>

    </el-tab-pane>
  </el-tabs>
  <!-- <img src="/static/img/demo-img.png" alt="" srcset=""> -->
  <div class="table-img">
    <img :src="demoimg" alt="" srcset="">

  </div>

<!-- 编辑团订单物料 -->
<el-dialog v-dialogDrag title="编辑" :visible.sync="dialogMeterial" size="tiny" >
   <!-- <div v-for ="item in MeterialFormArr"> -->
  <el-form :model="MeterialForm" :rules="rules" ref="ruleForm" style="padding-left: 13%;" label-width="100px" >
    <el-form-item label="名称" label-width="100px"  prop="name">
      <el-input style="width:220px" v-model="MeterialForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物料编码"  prop="id">
      <el-input style="width:220px" v-model="MeterialForm.id" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="幅宽"  prop="width">
      <el-input style="width:220px" v-model="MeterialForm.width" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物料描述">
      <el-input style="width:220px" v-model="MeterialForm.code" auto-complete="off"></el-input>
    </el-form-item>
      <el-form-item label="色号">
      <el-input style="width:220px" v-model="MeterialForm.color" auto-complete="off"></el-input>
    </el-form-item>
     
  </el-form>
  <!-- </div> -->
  <div slot="footer" class="dialog-footer">
    <!-- <el-button type="primary" @click="addMeterialFormArr">继续添加</el-button> -->
    <el-button @click="dialogMeterial = false">取 消</el-button>
    <el-button type="primary" @click="sureEditMeterial('ruleForm')">确 定</el-button>
  </div>
</el-dialog>

    </div>

</template>
<script>
//此处是测试demoapi
import { CreatFtpInfo, LockOrder ,getsinglejson,getStyleInfo} from "api/admin/demo";
import {Getorderjson ,showMes ,putOrderMeterialInfo}  from 'api/admin/orderDetail'
//获取页面参数
import { GetUrlParam } from "utils/index";
  import {
    getToken,
  
  } from 'utils/auth';
//此处是测试demoapi
export default {
  data() {
    return {
      json: '',
      activeName2: "first",
      tableData: [],
      tableArrName:'',
      tableFabric: [],
      routerForm:'',
      routerinfo:{},
      type:'',
      tableKey:'0',
      orderMeterial:[],
      measureTD:[],
      measureTDName:[],
      measurebodyList: [],
      measureinfoList:[],
      CDMeterial:[],
      MeterCDFromArr:[],
      measureGDList:[],
      measureGDinfoList:[],
      dialogMeterial:false,
      MeterialForm:{
          name: "",
        id: "",
        code: "",
        color: "",
        width: null,
        amount: 0,
        dir: 0,
        xShark: 0,
        xWidth: 0,
        yShark: 0,
        yWidth: 0
      },
      merterailIndex:'',
       rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],

        id: [{ required: true, message: "请输入id", trigger: "blur" }],
        width: [{ type: "number", required: true, message: "请输入幅宽", trigger: "blur" }]
      },
      orderTpye:localStorage.getItem('type'),
      demotype:'',
      demoimg:''
    };
  },
  created() {
    // alert(window.location);
    this.type = GetUrlParam('type');

    if(this.type == 'BD'){
         this.demotype = 'model';
         let form = {};
        this.routerinfo.ModelName =JSON.parse(localStorage.getItem('BDdata')).ModelName;
         this.routerForm = JSON.parse(localStorage.getItem('BDdata'));
        //  form.orderName = this.routerForm.ModelName;
        //  form.id = this.routerForm.ModelId;
          form.orderId = this.routerForm.Id;
         this.getStyle();
         this.getOrderinfo(form)
        // this.getJson(form);
    }else{
        let form = {};
        this.routerForm = JSON.parse(localStorage.getItem('OrderInfo'));
        // form.orderName = this.routerForm.OrderId;
        form.orderId = this.routerForm.Id;
        // this.getJson(form);
        this.getOrderinfo(form)
        this.getTDMeasureInfo();
        // alert(JSON.stringify(this.routerForm));
         this.demoimg = '/static/img/demo-img.png';
    }
  

  },
  methods: {
     getStyle(){
       getStyleInfo(this.routerinfo).then(res=>{
        //  alert(JSON.stringify(res));
         if(res.status == 200){
            this.demoimg = res.data.rows[0].Image;
       
            // this.demoimg = '/static/img/demo-img.png';
         }else{
            this.demoimg = '/static/img/demo-img.png';
         }
        // console.log(res);
      })
     },
    handleTabClick() {},
       //获取当前订单详细json
    getOrderinfo() {
      let form = {};
      form.orderId = this.routerForm.Id;
     
      Getorderjson(form).then(res => {
        //  console.log(res);

        if (res.Success && res.Data.Rows != null) {
          this.json = res.Data.Rows;
          this.measureTD = res.Data.Rows.person;
          this.measureTDName = res.Data.Rows.measureName;
          this.orderMeterial = res.Data.Rows.fabric;
          //成衣显示数据
          if (res.Data !== "" && this.orderTpye == "dh") {
        
            this.CDMeterial = res.Data.Rows.fabric;
            var data = JSON.parse(JSON.stringify(res.Data.Rows));
            this.MeterCDFromArr = data.fabric;
            this.tableData = data.size; //尺码产量
            // this.tableGDoutput = data.version;
            var tableCDVersion = data.version; //颜色搭配
            var obj = {};
            this.tableData[0].size_name = data.size_name; //尺码产量
            this.tableArrName = data.size_name.name;
            var arr = [];
            var arrColor = [];
           
            tableCDVersion.forEach((element,index) => {
              let obj = {};
              obj.color = element.name;

              arrColor.push(obj);
              data.fabric.map((el,key)=>{
                if(key == index){
              el.color = obj.color;
              arr.push(el);
                }
               
            })
              // console.log(element.fabric);
              if (element.fabric == undefined || element.fabric == "") {
                return false;
              } else {
                element.fabric.forEach(ele => {
                  ele.color = obj.color;
                  arr.push(ele);
                });
              }
            });
         
            this.tableGDoutput = tableCDVersion;
            this.tableFabric = arr;
            console.log(this.tableFabric);
          } else if (res.Data !== "" && this.orderTpye == "gd") {
            let personInfo = {}; // 个订数据
            personInfo.id = res.Data.Rows.id;
            personInfo.name = res.Data.Rows.person.name;
            personInfo.phone = res.Data.Rows.person.phone;
            personInfo.sizeName = res.Data.Rows.sizeName;
            this.measureGDList.push(personInfo);

            this.measureGDinfoList = res.Data.Rows.number;

            this.measureGDList[0].measure = res.Data.Rows.number;
          }
        }
      });
    },
    //这里是测试cad程序方法
      getJson(form){
        getsinglejson(form).then(res=>{
          // alert(JSON.stringify(res));
           var data =  res.Data;
           this.json = res.Data;
           this.tableData  =  data.size;
           var obj ={};
           this.tableData[0].size_name = data.size_name;
           this.tableArrName = data.size_name.name;
             var arr = [];
           data.version.forEach(element => {
               let obj = {}
             obj.color = element.name;
             element.fabric.forEach(ele => {
                  ele.color =  obj.color;
                  arr.push(ele);
             });
           });
           this.tableFabric =arr;
          //  console.log(this.tableData);
        })
      },

    getJson1(form){
        Getorderjson(form).then(res=>{
          // alert(JSON.stringify(res));
           var data =  res.Data;
           this.json = res.Data;
           this.tableData  =  data.size;
           var obj ={};
           this.tableData[0].size_name = data.size_name;
           this.tableArrName = data.size_name.name;
             var arr = [];
           data.version.forEach(element => {
               let obj = {}
             obj.color = element.name;
             element.fabric.forEach(ele => {
                  ele.color =  obj.color;
                  arr.push(ele);
             });
           });
           this.tableFabric =arr;
          //  console.log(this.tableData);
        })
      },
      getTDMeasureInfo(){
        var obj = {};
        obj.OrderId =  this.routerForm .OrderId;
        obj.State = this.routerForm.State;
        obj.Id = this.routerForm.Id;
        showMes(obj).then(res => {
          if (res.status == 200) {
            this.listLoading = false;
            this.measurebodyList = res.data.rows.personList;
            this.measureinfoList = res.data.rows;
          } else {
            // this.$message({
            //   type: "warning",
            //   message: res.tip.substring(0, 6),
            //   duration: 2000
            // });
            this.measurebodyList = [];
            this.measureinfoList = [];
          }
          this.listLoading = false;
        });
      },
        //物料编辑方法
    editShow(row, index) {
      this.dialogMeterial = true;
      this.MeterialForm = { ...row };
      this.merterailIndex = index;
    },
      sureEditMeterial(formName) {
        console.log(this.MeterialForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          var index = this.merterailIndex;
          let arr = {};
          this.$set(this.json.fabric, index, this.MeterialForm);
          var form = {};
          form.orderJson = {};
          form.orderId = this.routerForm.Id;
          form.orderJson = this.json;
          form.orderFabric = this.json.fabric;
          // console.log(this.json)
          this.EditMertrial(form);
        } else {
          return false;
        }
      });
    },
        //订单物料编辑接口方法
    EditMertrial(form) {
      putOrderMeterialInfo(form).then(res => {
        // console.log(res);
        if (res.Success) {
             this.dialogMeterial = false;
          this.dialogAddMeterial = false;
          this.dialogAddGDMeterial = false;
          this.dialogEditGDMeterial = false;
          this.$message({
            showClose: true,
            message: "成功",
            type: "success",
            duration: 2000
          });
          this.resetAddmeterial();
          this.resetAddGDmeterial();
          this.getOrderinfo();
        } else {
         this.dialogMeterial = false;
          this.dialogAddMeterial = false;
          this.dialogAddGDMeterial = false;
          this.$message({
            showClose: true,
            message: res.ErrMes,
            type: "error",
            duration: 2000
          });
          this.resetAddmeterial();
          this.resetAddGDmeterial();
          this.getOrderinfo();
        }
      });
    },
    //刷新版单信息 调用setData
    updateModel(type) {
      // console.log(this.bowserExplorer)
      if (this.bowserExplorer == "ie") {
        var state = window.external.setData(type,JSON.stringify(this.json) );
        if (state == "OK") {
            this.$message({
                     showClose: true,
                     message: state,
                     type: "success",
                     duration: 2000
                            });
          window.external.closeDialog(0);
        } else {
             this.$message({
                                showClose: true,
                                message: state,
                                type: "error",
                                duration: 2000
                            });
          // alert(state);

        }
      } else {
        var state = window.buyiSetData(type,JSON.stringify(this.json));
        if (state == "OK") {
          window.buyiCloseDialog(0);
        } else {
             this.$message({
                                showClose: true,
                                message: state,
                                type: "error",
                                duration: 2000
                            });
          // alert(state);
        }
      }
    },
    //新建
    creatModel(type){
       let form = {};
          form.mode  = 'create';
          form.projectName  =this.json.name;
          form.projectID  = this.json.id;
          form.fileID  = 0;
          form.filePath  = '';
          form.fileName  = '';   
          form.token=getToken();
          // alert(JSON.stringify(this.json))
         CreatFtpInfo(form).then(res=>{
           alert(JSON.stringify(res))
                var state = ''
               if(this.bowserExplorer == 'ie'){
               
                  state = window.external.openFile(type, JSON.stringify(this.json), JSON.stringify(res.Data));
           
                  // alert(state)
                  if(state == 'OK'){
                    this.$message({
                                showClose: true,
                                message: state,
                                type: "success",
                                duration: 2000
                            });
                        window.external.closeDialog(0);
                        this.LockOrderInfo(form.projectID);
                  }else{
                    // alert(state);
                      this.$message({
                                showClose: true,
                                message: state,
                                type: "error",
                                duration: 2000
                            });
                  }
                   }
                   else{
                    state = window.buyiOpenFile(type, JSON.stringify(this.json), JSON.stringify(res.Data));
                    if(state == 'OK'){
                        this.$message({
                                showClose: true,
                                message: state,
                                type: "success",
                                duration: 2000
                            });
                      window.buyiCloseDialog(0);
                      this.LockOrderInfo(form.projectID);
                    }else{
                        // alert(state);
                            this.$message({
                                showClose: true,
                                message: state,
                                type: "error",
                                duration: 2000
                            });
                    }
                   }
             
        })
    },
    //锁定生产单 buyiLockOrder
    LockOrderInfo(projectID) {
      var data = {};
      data.projectID = projectID;
          data.token = getToken();
      LockOrder(data).then(res => {
        // alert(JSON.stringify(res));
      });
    },

    //这里是测试cad程序方法
        selectColor(row, index) {
      if (row.IsPod) {
        return "success-row1";
      } else {
        return "";
      }
    },
      resetAddmeterial() {
      this.MeterialForm = {
        name: "",
        id: "",
        code: "",
        color: "",
        width: "",
        amount: "",
        dir: 0,
        xShark: 0,
        xWidth: 0,
        yShark: 0,
        yWidth: 0
      };
    },
    resetAddGDmeterial() {
      this.MeterGDFrom = {
        id: "",
        name: "",
        width: "",
        details: "",
        len_shrinkage: 0.0,
        width_shrinkage: 0.0,
        len_grid: 0.0,
        width_grid: 0.0,
        gap: 0.0,
        price: 30.0,
        amount: 0.0
      };
    },
  }
};
</script>
<style>
.table-cantain {
  padding: 30px;
}
.table-img img{
  margin-top: 25px;
  width: 650px;
  height: 410px;;
}
.el-table .success-row1 {
  background: rgb(253, 233, 230);
}
.el-table .warning-row {
  background: #f0f9eb;
}
 p {
  text-align: center;
  font-size: 19px;
  font-weight: 600;
}
.measure p {
   text-align: left;
   margin-left: 20%;
  font-size: 19px;
  font-weight: 600;
}
</style>
