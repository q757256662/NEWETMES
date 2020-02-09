<template>
<div class="table-containe">
    <p style="text-align:center;font-size:19px;font-weight:600;">版单信息</p>
<el-table
    :data="tableData1"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="版单ID"
        align="center"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="名称"
      align="center"
      >
    </el-table-column>
    
  </el-table>
  <p style="text-align:center;font-size:19px;font-weight:600;">物料信息</p>
    <el-table
    :data="tableData"
    border
    style="width: 100%;margin-bottom:50px;">
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
      label="幅宽（CM）">
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
        align="center"
      label="用量（CM）">
    </el-table-column>

  </el-table>
      	
	  <el-button class="sub-button" type="primary" @click="submitUpload" size="large">
    <span> 上 </span>
      <span>  传 </span>
  
    </el-button>

</div>

</template>
<script>
import { CreatFtpInfo, LockOrder ,getsinglejson ,PostBom} from "api/admin/demo";
//获取页面参数
import { GetUrlParam } from "utils/index";
import { getToken } from 'utils/auth';
export default {
    data(){
        return{
             json: '',
      activeName2: "first",
      tableData: [],
      tableArrName:'',
      tableFabric: [],

           tableData:[],
           tableData1:[
            //  {id:'1',name:'test001'}
           ],
        }
    },
    created(){
        
        //  this.tableData = JSON.parse(this.data).fabric;
        //  let obj ={};
        //  obj.id = JSON.parse(this.data).id;
        //  obj.name = JSON.parse(this.data).name;
        //  this.tableData1.push(obj)
        	 this.routerForm = JSON.parse(localStorage.getItem('BDdata'));
            // alert(JSON.stringify(this.routerForm));
         this.getJson(); 
       

    },
    methods:{
      getJson(){
          if(this.bowserExplorer == 'ie'){
              this.json =JSON.parse( window.external.getData()); 
              var data = this.json;     
                if(data.id == ''&& this.routerForm ){
                let obj ={};
           
                obj.id = this.routerForm.ModelId;
                obj.name =this.routerForm.ModelName;
                this.tableData1.push(obj)
              }else{
                let obj ={};
                 obj.id = this.json.id;
                obj.name =this.routerForm.ModelName;
                this.tableData1.push(obj)
              } 
          }else{
              this.json =JSON.parse(window.buyiGetData());
              var data = this.json;
                 if(data.id == ''){
                let obj ={};
                  obj.id = this.routerForm.ModelId;
                obj.name =this.routerForm.ModelName;
                this.tableData1.push(obj)
              }else{
                let obj ={};
                obj.id = this.json.id;
                obj.name =this.routerForm.ModelName;
                this.tableData1.push(obj);
              } 
          }
          // alert(window.location);
              // alert(JSON.stringify(this.tableData1))
              this.tableData =data.fabric;
              //  let obj ={};
              //  obj.id = this.json.id;
              //  obj.name =this.json.name;
              //  this.tableData1.push(obj)
               
        // var form = {};
        //  this.routerForm = JSON.parse(localStorage.getItem('OrderInfo'));
        // form.orderName = this.routerForm.OrderId;

     
      },
      	submitUpload(){
			   let form = {};
        form.json = JSON.stringify(this.json);
        form.token = getToken();
        // alert(JSON.stringify(form))
				PostBom(form).then(res=>{
          // alert(JSON.stringify(res));
          
            	if (res.Success == true) {

						if (this.bowserExplorer == 'ie'){
							window.external.closeDialog(0);
						}else{
							window.buyiCloseDialog(0);
						}
					} else {
						alert(res.ErrMes);
					}
				})
			}
    }
}
</script>
<style>
.table-containe{
    padding: 30px;
}
.sub-button{
 margin:  0 auto;
 display: block;
 width: 300px; 
}

</style>
