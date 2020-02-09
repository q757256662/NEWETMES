<template>
  <div class="table-containe">
    <p style="text-align:center;font-size:19px;font-weight:600;">团订订单信息</p>
<el-table
    :data="tableData1"
    border
    style="width: 100%">
    <el-table-column
      prop="orderID"
      label="订单ID"
        align="center"
      >
    </el-table-column>
    <el-table-column
      prop="orderName"
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
      prop="code"
        align="center"
      label="物料编码">
    </el-table-column>
    <el-table-column
      prop="color"
      align="center"
      label="色号">
    </el-table-column>
    <el-table-column
      prop="width"
      align="center"
      label="门幅（CM）">
    </el-table-column>
    <el-table-column
      prop="dir"
      align="center"
      label="旋转"
      width="80px">
      <template scope="scope">
          {{scope.row.dir=="0"?'是':'否'}}
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
      label="经纱缩水">
    </el-table-column>
 <el-table-column
      prop="yShark"
        align="center"
      label="经纱缩水">
    </el-table-column>
     <el-table-column
      prop="xWidth"
        align="center"
      label="宽度"
       width="80px">
    </el-table-column>
     <el-table-column
      prop="yWidth"
    align="center"
      label="高度"
       width="80px">
    </el-table-column>
     <el-table-column
      prop="amount"
      align="center"
      label="物料用量（CM）">
    </el-table-column>
  </el-table>
    <el-button class="sub-button" type="primary" size="large">
    <span> 上 </span>
      <span>  传 </span>
  
    </el-button>
</div>
</template>
<script>
export default {
    data(){
        return {
           json:`
           {
	"lsh" : [ 
		 { 
			"orderID":1001,
			"orderName" : "工商银行上衣",
			"lsh" : [ 
				 { 
					"lsh":10001,
					"id":11501,
					"name" : "王刚" 
				},
				 { 
					"lsh":10001,
					"id":11501,
					"name" : "王刚" 
				},
				 { 
					"lsh":10001,
					"id":11501,
					"name" : "王刚" 
				},
				 { 
					"lsh":10001,
					"id":11501,
					"name" : "王刚" 
				} 
			] 
		},
		 { 
			"orderID":1002,
			"orderName" : "工商银行裤子",
			"lsh" : [ 
				 { 
					"lsh":10001,
					"id":11501,
					"name" : "王刚" 
				},
				 { 
					"lsh":10001,
					"id":11501,
					"name" : "王刚" 
				},
				 { 
					"lsh":10001,
					"id":11501,
					"name" : "王刚" 
				},
				 { 
					"lsh":10001,
					"id":11501,
					"name" : "王刚" 
				} 
			] 
		} 
	],
	"fabric" : [ 
		 { 
			"name" : "面料",
			"id" : "ML-1735",
			"code" : "深灰色暗纹华达呢",
			"color" : "金色暗纹",
			"width" : 0.000,
			"dir":0,
			"xShark" : 0.000,
			"yShark" : 0.000,
			"xWidth" : 0.000,
			"yWidth" : 0.000,
			"amount" : 125.000 
		},
		 { 
			"name" : "里料",
			"id" : "LL553",
			"code" : "白棉布",
			"color" : "",
			"width" : 0.000,
			"dir":0,
			"xShark" : 0.000,
			"yShark" : 0.000,
			"xWidth" : 0.000,
			"yWidth" : 0.000,
			"amount" : 130.000 
		} 
	]
}
           `,
            tableData:[],
            tableData1:[]
        }
    },
    created(){
         var data = JSON.parse(this.json)
         this.tableData = data.fabric;
          this.tableData1 = data.lsh;
    },
    methods:{

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
