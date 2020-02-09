<template>
  <div class="app-container calendar-list-container">
    <!-- 生产单信息 -->
    <div style="display: flex;justify-content: flex-end;">
      <el-button type="primary" @click="updateModel" v-if="isCAD == '1'" :disabled="json == ''">CAD</el-button>
      <!-- <el-button type="primary" @click="updateModel" v-if="isCAD == '1'" :disabled="json == ''">CAD</el-button> -->
      
      <!-- <el-button type="primary" @click="creatModel" >刷新生产单信息</el-button>  -->
    </div>
    <el-table v-if="false" :key='tableKey' ref="multipleTable" :data="listdetail" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" highlight-current-row=true label="生产单名称">
        <template scope="scope">
          <span  style=" color:#20a0ff"   > 
            {{ scope.row.OrderId }}
          </span>
        </template>
      </el-table-column>  
      <el-table-column prop="cusName"  align="center" label="客户名称"> </el-table-column>   
     <el-table-column v-if="type !== 'td'" prop="ModelName"  align="center" label="样板名"> </el-table-column>    
       <el-table-column v-if="type !== 'gd' && type !== 'dh'" prop="StyleName"  align="center" label="款名"> </el-table-column>  
      <el-table-column prop="ErpName"  align="center" label="服装品类"> </el-table-column>    
      <el-table-column prop="nature"  align="center" label="订单性质"> </el-table-column>  
      <el-table-column prop="fTime"  align="center" label="交货时间" :formatter="ChangeDateFormat"> </el-table-column>  
      <el-table-column   align="center" label="是否加急">
        <template scope="scope">
          {{scope.row.rank | isRankStatus}}
        </template>
      </el-table-column> 
      <el-table-column prop="mCode" width="100px" align="center" label="物料名">
        <template scope="scope">
          <a style="text-decoration:underline; 	color:#20a0ff" @click="handGetList('material',scope.row)">
            {{ scope.row.mCode }}
          </a>
        </template>
         </el-table-column>    
      <el-table-column v-if="type !== 'gd' && type !== 'dh'" prop="Pod" width="100px" align="center" label="特体数">
<template scope="scope">
  <a style="text-decoration:underline; 	color:#20a0ff" @click="handGetList('pod',scope.row)">
        {{ scope.row.Pod }}
      </a>
</template>
        </el-table-column> 
      <el-table-column prop="Bed" width="100px" align="center" label="床数">
<template scope="scope">
  <a style="text-decoration:underline; 	color:#20a0ff" @click="handGetList('bed',scope.row)">
        {{ scope.row.Bed }}
      </a>
</template>
        </el-table-column>    
 
  </el-table>

    <!-- orderDetail -->
    <p></p>
    <el-table  :key='tableKey' :data="orderList"  border fit highlight-current-row style="width: 100%">
      <el-table-column prop="OrderId" align="center" label="生产单名称">
<template scope="scope">
  <a style="text-decoration:underline; 	color:#20a0ff" @click="handGetList('process',scope.row)">
        {{ scope.row.OrderId }}
      </a>
</template>
       </el-table-column>
      <el-table-column  prop="ModelName"  align="center" label="样板名"> </el-table-column>    
       <!-- <el-table-column v-if="type == 'gd' || type == 'dh'" prop="StyleName"  align="center" label="款名"> </el-table-column>  -->
             <el-table-column v-if="type !== 'gd' && type !== 'dh'" prop="Pod"  width="110px" align="center" label="特体尺码数">
<template scope="scope">
  <a style="text-decoration:underline; 	color:#20a0ff" @click="handGetList('pod',scope.row)">
        {{ scope.row.Pod }}
      </a>
</template>
        </el-table-column> 
  
          <el-table-column v-if="type !== 'gd' && type !== 'td'"  width="100px" align="center" label="颜色搭配">
                        <!-- <el-table-column  v-if="type !== 'gd'&& type !== 'td'"  width="100px" align="center" label="颜色搭配"> -->
<template scope="scope">
  <a style="text-decoration:underline; 	color:#20a0ff" @click="handGetList('version',scope.row)">
                          详情
                </a>
</template>
          
         </el-table-column> 
       <!-- <el-table-column v-if="type !== 'gd' && this.type !='dh'" width="80px"  align="center" label="人数"> 
<template scope="scope">
  <span>{{scope.row.clothes}}</span>
</template>
       </el-table-column> -->

       <el-table-column  prop="Yield" width="80px" align="center" label="件数">
<template scope="scope">
  <a style="text-decoration:underline; 	color:#20a0ff" @click="handGetList('Yield',scope.row)">
        {{ scope.row.Yield }}
      </a>
</template>
      </el-table-column> 
  
      <el-table-column prop="Bed" width="80px"  align="center" label="床数">
<template scope="scope">
  <a style="text-decoration:underline; 	color:#20a0ff" @click="handGetList('bed',scope.row)">
        {{ scope.row.Bed }}
      </a>
</template>
        </el-table-column>    
       
      <el-table-column prop="sex" v-if="type !='dh'" align="center" label="性别" width="80px"> </el-table-column>
    

      <el-table-column  align="center" label="备注">
        
<template scope="scope">
     <el-tooltip class="item" effect="light" :content="scope.row.remark" placement="bottom">
       <span>{{scope.row.remark | substringRemark}}</span>
    </el-tooltip>
 
</template>
         </el-table-column>
            <el-table-column   align="center" label="订单JSON" width="110px">
              <template scope="scope">
                <el-button  size="mini" type="primary" @click="handGetJson(scope.row)">查看</el-button>
              </template>
               
           </el-table-column>
     <el-table-column v-if="listdetail[0].State == 1 || listdetail[0].State ==  3"  prop="Step" align="center"  label="进度">
<template scope="scope">
   {{scope.row | changeProcessName}}
</template>
      </el-table-column>
                   <el-table-column prop="mCode" align="center" label="物料">
<template scope="scope">
   <el-button v-if="type !=='dh'"  size="mini" type="primary" @click="handGetList('material',scope.row)">查看</el-button>
   <el-button v-if="type=='dh'" size="mini" type="primary" @click="handGetListCD(scope.row)">查看</el-button>
      <el-button v-if="type =='td' && json != null" size="mini" type="info" style="margin-left:0px;" @click="addshow(scope.row,scope.$index)">新增</el-button>
      <el-button v-if="type =='gd'" size="mini" type="info" style="margin-left:0px;"   @click="addGDshow(scope.row,scope.$index)">新增</el-button>
       <!-- <el-button v-if="type =='dh'" size="mini" type="info" @click="addCDshow(scope.row,scope.$index)">CD新增</el-button> -->
       <!-- <el-button size="mini" type="info" @click="editCDshow(scope.row,scope.$index)">编辑</el-button> -->
</template>
         </el-table-column>
         <el-table-column label="充绒数据" align="center">
           <template scope="scope">
             <el-button size="mini" type="primary" @click="jumpPartMsg">
               <!-- <router-link :to="'/partDetails?id='+json.id+'&type='+type" target="_blank">查看</router-link> -->
               查看
             </el-button>
           </template>
         </el-table-column>
     <el-table-column  width="210px" align="center"  label="打包下载"> 
<template scope="scope">
  <span style="    margin-right: 5px;" v-for="item in optionsDown" :key="item.value">
               <a style="text-decoration: underline;color: rgb(32, 160, 255);" @click="ChangeDown(item.value,item)"> {{item.label }}</a>
               </span>
</template>
   

    </el-table-column>
     <el-table-column label="状态" v-if="qureyForm.State==4" align="center" >
    <template scope="scope">
      <span>待处理</span>
    </template>
    </el-table-column>
    <el-table-column label="操作" v-if="qureyForm.State==4" align="center" :render-header="handleHelp">
    <template scope="scope">
      <el-button @click="handleProduct(scope.row)" type="success" size="small">
        进入生产流程
      </el-button>
    </template>
    </el-table-column>
    </el-table>
    <p v-show="mode=='bed'">床列表</p>
    <el-table v-show="mode=='bed'" :key='tableKey' :data="bedList"  border fit highlight-current-row style="width: 100%">
      <el-table-column prop="BedName" align="center" label="床名"> </el-table-column>
      <el-table-column prop="MaterialCode" align="center" label="物料编码"> </el-table-column>
      <el-table-column prop="BedLen" align="center" label="长度"> </el-table-column>
      <el-table-column prop="LayCount" align="center" label="层数"> </el-table-column>
      <el-table-column  align="center" label="总长度"> 
<template scope="scope">
   {{scope.row.BedLen * scope.row.LayCount }}
</template>     
      </el-table-column>
      <el-table-column prop="UC" align="center" label="料率"> </el-table-column>
   <el-table-column  align="center" label="下载"> 
<template scope="scope">
  <span style="    margin-right: 5px;" v-for="item in optionsDownBed" :key="item.value">
               <a style="text-decoration: underline;color: rgb(32, 160, 255);" @click="DownloadBed(item.value,scope.row)"> {{item.label }}</a>
               </span>
</template>
                  
      </el-table-column>
    </el-table>
    <p v-show="mode=='process'">工序列表</p>
    <el-table v-show="mode=='process'" :key='tableKey' :data="processList"  border fit highlight-current-row style="width: 100%">
      
      
      <el-table-column prop="Code" align="center" label="工序名" :formatter="changeProcessName"> </el-table-column>
      <el-table-column prop="loginid" align="center" label="工号"> </el-table-column>
      <el-table-column prop="UserName" align="center" label="执行人">
        <template scope="scope">
          {{scope.row.UserName | changeUserName}}
          </template>
         </el-table-column>
      <el-table-column prop="CreateTime" align="center" label="时间" :formatter="ChangeDateFormat"> </el-table-column>
      <el-table-column prop="State" align="center" label="状态">
<template scope="scope">
    <!-- <el-tag :type="scope.row.State | statusFilter1"> -->
            <span :style="scope.row.State==1?'color:#f7ba2a':scope.row.State==0?'color:#13ce66':''"> {{scope.row.State | changeStatus }} </span>
             <!-- </el-tag> -->
</template>
      </el-table-column>
      <el-table-column   v-if="role == 1" align="center" label="操作">
<template scope="scope">
  <el-button size="small" v-if="scope.row.State == 1 && scope.row.Code !==35 &&(scope.row.UserName !== '' && scope.row.UserName !== null)" type="success" @click="handleMove(scope.$index, scope.row)">
    工作移交
  </el-button>
   
  <el-button size="small" v-if="scope.row.State == 1 && scope.row.Code ==35" type="success" @click="handlePod(scope.$index, scope.row)">
    移交
  </el-button>

   <span v-if="(scope.row.Code ==35 && scope.row.State == 0) || ((scope.row.State !== 1 || scope.row.UserName == '' || scope.row.UserName == null) && scope.row.Code !==35)">暂无操作</span>
   <!-- <span v-if="scope.row.State !== 1 && scope.row.UserName == '' && scope.row.UserName== null">暂无操作</span> -->

</template>
      </el-table-column>
  </el-table>
  <p v-show="mode=='pod'">Pod列表</p>
    <el-table v-show="mode=='pod'"  :key='tableKey' :data="PodList"   border fit highlight-current-row style="width: 100%">
      <el-table-column prop="Pod"  align="center" label="特体"> </el-table-column>  
      <el-table-column prop="UserName"  align="center" label="检查人"> 
          <template scope="scope">
          {{scope.row.UserName | changeUserName}}
          </template>
        </el-table-column>    
      <el-table-column prop="State"  align="center" label="状态"> 
<template scope="scope">
     <!-- <el-tag :type="scope.row.State | statusFilter1"> -->
   
              <span :style="scope.row.State==0?'color:#f7ba2a':scope.row.State==1?'color:#13ce66':''"> {{scope.row.State | PodStatus }} </span>
             <!-- </el-tag> -->
</template>
      </el-table-column>    
      <el-table-column prop="Time"  align="center" label="时间" :formatter="this.ChangeDateFormat"> </el-table-column>  
           <el-table-column   v-if="role == 1" align="center" label="操作">
<template scope="scope">
  <el-button size="small" v-if="scope.row.State == 0 && scope.row.UserName !== '' && scope.row.UserName !== null" type="success" @click="handleMovepod(scope.$index, scope.row)">
    工作移交
  </el-button>
  <span v-else>暂无操作</span>
</template>
      </el-table-column>

  </el-table>
  <p v-show="mode=='Yield' && type =='td'">量体信息列表</p>
    <el-table :row-class-name="selectColor" v-show="mode=='Yield' && type=='td'" :key='tableKey' :data="measurebodyList" border fit highlight-current-row style="width: 100%">
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
 <p v-show="mode=='Yield' && type =='gd'">个订量体信息列表</p>
    <el-table  v-show="mode=='Yield' && type =='gd'" :key='tableKey' :data="measureGDList" border fit highlight-current-row style="width: 100%">
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

<!-- v-show="mode=='material' && type !== 'gd'" -->
 <p v-show="mode=='material' && type == 'td' && json == null">物料信息列表</p>
    <el-table v-show="mode=='material' && type == 'td' && json == null"  :data="materialList"   border fit highlight-current-row style="width: 100%">
       <el-table-column prop="mCode" align="center" label="物料名">
         
         </el-table-column>  
      <el-table-column prop="mColor"  align="center" label="颜色"> </el-table-column>  
       <el-table-column prop="fdose"  align="center" label="辅料用量"> </el-table-column>
        <el-table-column prop="ldose" align="center" label="里料用量"></el-table-column>
      <el-table-column prop="mdose"  align="center" label="面料用量"></el-table-column>    
  </el-table>
  <p v-show="mode=='material' && type == 'td'&& json != null">团订物料信息列表</p>
<el-table
    v-show="mode=='material' && type == 'td' && json != null"
    :data="orderMeterial"
    border
    style="width: 100%">
    <el-table-column
      label="描述"
       align="center"
      >
<template scope="scope">
   {{scope.row.details}}
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

  <!-- <el-table-column
      prop=""
      label="物料描述"
      align="center">

    </el-table-column> -->

    <el-table-column
      prop="width"
       width="116px"
        align="center"
      label="门幅(CM)">
    </el-table-column>

     <!-- <el-table-column
      prop="dir"
        align="center"
      label="旋转"
       width="80px">
<template scope="scope">
   {{scope.row.dir==0?"否":scope.row.dir==1?"是":''}}
</template>
      
    </el-table-column> -->
    
  
    <el-table-column
      prop="len_shrinkage"
        align="center"
      label="经纱缩水">
    </el-table-column>
    <el-table-column
      prop="width_shrinkage"
        align="center"
      label="纬纱缩水">
    </el-table-column>
     <el-table-column
      prop="len_grid"
        align="center"
      label="经纱宽度">
    </el-table-column>
    <el-table-column
      prop="width_grid"
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
      prop="gap"
       width="116px"
      align="center"
      label="间隙(CM)">
    </el-table-column>
       <el-table-column
      prop="price"
       width="116px"
      align="center"
      label="价格">
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
  <!-- 个订 -->
 <p v-show="mode=='material' && type== 'gd'">个订物料信息列表</p>

<el-table
    v-show="mode=='material' && type== 'gd'"
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
 <p v-show="mode=='Yield' && type !='gd' && type != 'td'">产量信息表</p>
 <el-table
 v-show="mode=='Yield' && type !='gd' && type != 'td'"
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

<!-- 此处为测试demo显示表格数据 -->

   <div v-if="mode =='version'">
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
 


<!-- <p>尺码</p> -->
<!-- <el-table
    :data="tableData"
    border
    style="margin-bottom:30px;">
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

    
  </el-table> -->
   
     
<!-- 此处为测试demo显示表格数据 -->


<el-dialog v-dialogDrag size="tiny" title="" :visible.sync="dialogPod">
  <el-table :data="lshList">
    <el-table-column   align="center" label="流水号" >
<template scope="scope">
   {{scope.row}}
</template>
          
    </el-table-column>
    
  </el-table> 
</el-dialog>

<el-dialog v-dialogDrag size="tiny" title="选择移交员工" :visible.sync="dialogRemove">
  <el-radio class="checkRadio" :key="item.LoginId" v-for="item in optionsRemove" v-model="radioRemove" :label="item.LoginId">{{item.Name}}
    <span>（{{item.LoginId}}）</span>
    </el-radio>
 
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancleRemove">取 消</el-button>
    <el-button type="primary" v-if='showPodBtn == true' @click="sureRemovePod">确 定</el-button>
     <el-button type="primary" v-else @click="sureRemove">确 定</el-button>
  </div>
</el-dialog>
 
</el-dialog>

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
      <el-input style="width:220px"  v-model="MeterialForm.width" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input style="width:220px" v-model="MeterialForm.details" auto-complete="off"></el-input>
    </el-form-item>
      <!-- <el-form-item label="色号">
      <el-input style="width:220px" v-model="MeterialForm.color" auto-complete="off"></el-input>
    </el-form-item> -->
     
  </el-form>
  <!-- </div> -->
  <div slot="footer" class="dialog-footer">
    <!-- <el-button type="primary" @click="addMeterialFormArr">继续添加</el-button> -->
    <el-button @click="dialogMeterial = false">取 消</el-button>
    <el-button type="primary" @click="sureEditMeterial('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
<!-- //增加团订单物料 -->
<el-dialog v-dialogDrag title="增加团订物料" :visible.sync="dialogAddMeterial" size="tiny" >
   <!-- <div v-for ="item in AddMeterialFormArr">  -->
  <el-form :rules="rules" ref="ruleForm" :model="MeterialForm"  style="padding-left: 13%;" label-width="100px" >
    <el-form-item label="名称：" label-width="100px" prop="name">
      <el-input style="width:220px" v-model="MeterialForm.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物料编码：" prop="id">
      <el-input style="width:220px" v-model="MeterialForm.id" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="幅宽：" prop="width">
      <el-input style="width:220px" v-model="MeterialForm.width" auto-complete="off"></el-input>
    </el-form-item>
     <!-- <el-form-item label="物料描述：">
      <el-input style="width:220px" v-model="MeterialForm.code" auto-complete="off"></el-input>
    </el-form-item> -->
      <el-form-item label="描述：">
      <el-input style="width:220px" v-model="MeterialForm.details" auto-complete="off"></el-input>
    </el-form-item>
  </el-form>
  <!-- </div> -->
  <div slot="footer" class="dialog-footer">
    <!-- <el-button type="primary" @click="addMeterialFormArr">继续添加</el-button> -->
    <el-button @click="dialogAddMeterial = false">取 消</el-button>
    <el-button type="primary" @click="sureAddMeterial('ruleForm')">确 定</el-button>
  </div>
</el-dialog>

<!-- 个订物料编辑 -->
<!-- 个订物料新增 -->
<el-dialog v-dialogDrag title="增加" :visible.sync="dialogAddGDMeterial" size="tiny" >
  
  <el-form :rules="rules" ref="ruleForm" :model="MeterGDFrom"  style="padding-left: 13%;" label-width="100px" >
    <el-form-item label="名称：" label-width="100px" prop="name">
      <el-input style="width:220px" v-model="MeterGDFrom.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物料编码：" prop="id">
      <el-input style="width:220px" v-model="MeterGDFrom.id" auto-complete="off"></el-input>
    </el-form-item>
      <el-form-item label="幅宽：" prop="width">
      <el-input style="width:220px" v-model="MeterGDFrom.width" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物料描述：">
      <el-input style="width:220px" v-model="MeterGDFrom.details" auto-complete="off"></el-input>
    </el-form-item>
      <el-form-item label="价格：">
      <el-input style="width:220px" v-model="MeterGDFrom.price" auto-complete="off"></el-input>
    </el-form-item>
    
  </el-form>

  <div slot="footer" class="dialog-footer">
    <!-- <el-button type="primary" @click="addMeterialFormArr">继续添加</el-button> -->
    <el-button @click="dialogAddGDMeterial = false">取 消</el-button>
    <el-button type="primary" @click="sureAddGDMeterial('ruleForm')">确 定</el-button>
  </div>
</el-dialog>
<!-- 个订物料编辑 -->
<el-dialog v-dialogDrag title="编辑" :visible.sync="dialogEditGDMeterial" size="tiny" >
  
  <el-form :rules="rules" ref="ruleForm" :model="MeterGDFrom"  style="padding-left: 13%;" label-width="100px" >
    <el-form-item label="名称：" label-width="100px" prop="name">
      <el-input style="width:220px" v-model="MeterGDFrom.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物料编码：" prop="id">
      <el-input style="width:220px" v-model="MeterGDFrom.id" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="幅宽：" prop="width">
      <el-input style="width:220px" v-model="MeterGDFrom.width" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物料描述：">
      <el-input style="width:220px" v-model="MeterGDFrom.details" auto-complete="off"></el-input>
    </el-form-item>
      <el-form-item label="价格：">
      <el-input style="width:220px" v-model="MeterGDFrom.price" auto-complete="off"></el-input>
    </el-form-item>
     
  </el-form>

  <div slot="footer" class="dialog-footer">
    <!-- <el-button type="primary" @click="addMeterialFormArr">继续添加</el-button> -->
    <el-button @click="dialogEditGDMeterial = false">取 消</el-button>
    <el-button type="primary" @click="sureEditGDMeterial('ruleForm')">确 定</el-button>
  </div>
</el-dialog>

<!-- 成衣物料编辑 -->

 <!-- <table border="1">
        <tr><td v-for="name of json.fieldNames" :key="name">{{name}}</td></tr>
        <template v-for="(tr,index) of json.items">
            <tr v-for="(item,i) of tr.items" :key="index">
                <td v-if="i===0" :rowspan="tr.items.length">{{tr.name}}</td>
                <td v-for="td of item" :key="index+'_'+i">{{td}}</td>
            </tr>
        </template>
    </table> -->

<el-dialog v-dialogDrag title="成衣物料详情"  :visible.sync="CDdialogTable">
<el-table
  v-if="CDMeterial !='' || CDMeterial != undefined"
    :data="CDMeterial"
    border
    style="width: 100%">
    <!-- <el-table-column
       
       align="center"
      >
<template scope="scope">
   {{scope.row.color}}
</template>
    </el-table-column> -->
  <el-table-column
      prop="name"
      label="名称"
        align="center"
     >
    </el-table-column>
   <el-table-column
      prop="id"
      label="物料编码"
        align="center"
      >
    </el-table-column>
  
    <el-table-column
      prop="width"
      
        align="center"
      label="幅宽(CM)">
    </el-table-column>
    <el-table-column
      prop="price"
        align="center"
      label="价格"
      >
    </el-table-column>
  </el-table>
</el-dialog>
<!-- //增加成衣物料 -->
<el-dialog v-dialogDrag title="增加" :visible.sync="dialogEditCDMeterial" size="tiny" >
  
  <el-form :rules="rules" ref="ruleForm" :model="MeterCDFrom"  style="padding-left: 13%;" label-width="100px" >
 <el-form-item label="颜色：">
     <el-select v-model="CDcolor" placeholder="请选择" @change="chageCDcolor">
    <el-option
      v-for="(item,index) in optionsCDcolor"
      :key="index"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
     

    </el-form-item>
    <el-form-item label="物料编码：" label-width="100px">
     <el-select v-model="MeterCDFrom.name" placeholder="请选择" @change="chageCDname">
    <el-option
      v-for="(item,index) in optionsCD"
      :key="index"
      :label="item.id"
      :value="item.id">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="名称：">
      <el-input style="width:220px" v-model="MeterCDFrom.id" auto-complete="off"></el-input>
    </el-form-item>
     <el-form-item label="幅宽：">
      <el-input style="width:220px" v-model="MeterCDFrom.width" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="物料描述：">
      <el-input style="width:220px" v-model="MeterCDFrom.details" auto-complete="off"></el-input>
    </el-form-item>
      <el-form-item label="价格：">
      <el-input style="width:220px" v-model="MeterCDFrom.price" auto-complete="off"></el-input>
    </el-form-item>
     
  </el-form>

 
  <div slot="footer" class="dialog-footer">
    <!-- <el-button type="primary" @click="addMeterialFormArr">继续添加</el-button> -->
    <el-button @click="dialogEditCDMeterial = false">取 消</el-button>
    <el-button type="primary" @click="sureEditCDMeterial('ruleForm')">确 定</el-button>
  </div>
</el-dialog>

  <!-- 订单json显示 -->
   <el-dialog v-dialogDrag title="JSON详情" :visible.sync="jsonDialogVisible" size="small">
      <jsonEditor :value="json"></jsonEditor>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="jsonDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="jsonDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import {
  pageBed,
  pageStep,
  pageProduct,
  podObj,
  resetProcess,
  GetProInfo,
  showMes,
  GetlshInfo,
  GetmaterialInfo,
  getremoveInfo,
  removeProcess,
  removePod,
  downbed,
  Getorderjson,
  putOrderMeterialInfo,
  Updatestate
} from "api/admin/orderDetail";
import {
  getToken,
  setToken,
  getRole,
  setRole,
  setUserId,
  getUserId,
  removeRole,
  removeUserID,
  removeToken
} from "utils/auth";
//此处是测试demoapi
import { CreatFtpInfo, LockOrder, getsinglejson } from "api/admin/demo";
//此处是测试demoapi
import { downLoad, downPLan } from "api/admin/flowNumber/flowNumber";
import jsonEditor from "@/components/jsonEditor"
import { downObj } from "api/admin/orderSearch";
import { mapGetters } from "vuex";
export default {
  name: "user",
  porps: ["OrderId", "mode"],
  components: {
    jsonEditor: jsonEditor
  },
  data() {
    return {
      form: {
        UserName: undefined,
        Phone: undefined,
        State: 1,
        Up: undefined,
        Down: 0,
        MAC: undefined,
        Remark: undefined
      },
      isloading: -1,
      role: getRole(),
      mode: "",
      type: "",
      value8: "",
      value7: "",
      value9: "",
      qureyForm: {},
      bedList: null,
      processList: null,
      showEditState: null,
      PodList: null,
      orderList: [],
      YieldList: null,
      measurebodyList: null,
      measureinfoList: "",
      total: null,
      listLoading: true,
      listQuery: null,
      infoForm: null,
      addPartner: {},
      sexOptions: ["男", "女"],
      dialogFormVisible: false,
      formPhone: "",
      dialogStatus: "",
      userManager_btn_edit: true,
      userManager_btn_del: true,
      userManager_btn_add: true,
      textMap: {
        update: "编辑",
        create: "创建"
      },
      formLabelWidth: "80px",
      dialogPod: false,
      lshList: null,
      materialList: [],
      tableKey: 0,
      listdetail: [],
      routerForm: null,
      dialogRemove: false,
      optionsRemove: null,
      radioRemove: "",
      formInfo: {},
      optionsDown: [
        {
          value: 0,
          label: "排料文件"
        },
        {
          value: 1,
          label: "订单文件"
        }
      ],
      optionsDownBed: [
        {
          value: "nc",
          label: "NC文件"
        },
        // {
        //   value: "plt",
        //   label: "plt文件"
        // }
      ],
      DownNum: "",
      moveloginid: "",
      showPodBtn: false,
      showversion: false,
      json: "",
      demojson: "",
      tableData: [],
      tableArrName: "",
      tableFabric: [],
      tableGDoutput: [],
      orderMeterial: [],
      measureGDList: [],
      measureGDinfoList: [],
      CDMeterial: [],
      dialogMeterial: false,
      dialogAddMeterial: false,
      dialogEditCDMeterial: false,
      CDdialogTable: false,
      dialogAddGDMeterial: false,
      dialogEditGDMeterial: false,
      AddMeterialFormArr: [
        {
          name: "",
          id: "",
          details: "",
          width: "",
          amount: 0,
          dir: 0,
          xShark: 0,
          xWidth: 0,
          yShark: 0,
          yWidth: 0
        }
      ],
      MeterialFormArr: [
        {
         name: "",
        id: "",
        width: "",
        details: "",
        gap: 0.0,
        len_shrinkage: 0.0,
        width_shrinkage: 0.0,
        len_grid: 0.0,
        width_grid: 0.0,
        price: 30.0,
        amount: 0.0
        }
      ],
      MeterialForm: {
       name: "",
        id: "",
        width: "",
        details: "",
        gap: 0.0,
        len_shrinkage: 0.0,
        width_shrinkage: 0.0,
        len_grid: 0.0,
        width_grid: 0.0,
        price: 30.0,
        amount: 0.0
      },
      MeterGDFrom: {
        name: "",
        id: "",
        width: "",
        details: "",
        gap: 0.0,
        len_shrinkage: 0.0,
        width_shrinkage: 0.0,
        len_grid: 0.0,
        width_grid: 0.0,
        price: 30.0,
        amount: 0.0
      },
      MeterCDFrom: {
        name: "",
        id: "",
        width: "",
        details: "",
        len_shrinkage: 0.0,
        width_shrinkage: 0.0,
        price: 30.0,
        amount: 0.0
      },
      isCAD:'0',
      optionsCD: [],
      optionsCDcolor: [],
      CDcolor: "",
      CDname: "",
      MeterCDFromArr: [],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],

        id: [{ required: true, message: "请输入id", trigger: "blur" }],
        width: [{ required: true, message: "请输入幅宽", trigger: "blur" }]
      },
      merterailIndex: "",
      addmerterailIndex: 0,
      jsonDialogVisible:false
    };
  },
  computed: {
    ...mapGetters(["elements"])
  },
  filters: {
    changeStatus: function(val) {
      return val == "0" ? "完成" : "未完成";
    },
  changeUserName(val){
      return val == "" || val == null ? "/" : val;
         },
    statusFilter1(status) {
        const statusMap = {
          "2": "primary",
          "1": "success",
          "0": "warning",
          "3": "danger"
        };
      return status == "0" ? "warning" : status == "1" ? "success" : "primary";
        // return statusMap[status];
      },
    StyleIquiryStatus: function(val) {
      return val == 0
        ? "废弃"
        : val == 1
        ? "进行中"
        : val == 2
        ? "已完成"
        : "未知";
    },
    StyleIquiryStep(row) {
      let val = row.Step;

      if (row.type == 0) {
        return val == 22
          ? "废弃"
          : val == 23
          ? "进行中"
          : val == 25
          ? "已完成"
          : val == 26
          ? "废弃"
          : val == 27
          ? "进行中"
          : val == 33
          ? "尺码压缩"
          : val == 34
          ? "尺寸驱动"
          : val == 35
          ? "特体检查"
          : val == 37
          ? "裁剪规划"
          : "未知";
      } else {
        return val == 33
          ? "尺码压缩"
          : val == 34
          ? "尺寸驱动"
          : val == 35
          ? "特体检查"
          : val == 37
          ? "裁剪规划"
          : "未知";
      }
    },
    PodStatus: function(val) {
      return val == "0" ? "未检查" : val == "1" ? "检查完成" : "已修改";
    },
    isRankStatus: function(val) {
      return val == "0" ? "不加急" : val == "1" ? "加急" : "未知";
    },
    substringRemark: function(val) {
      // console.log(val)
      return (val = val.substring(0, 10) + "...");
    },
    filltersLSH(row) {
      if (parseInt(row.copys) - 1 == 0) {
        return parseInt(row.LSH);
      } else {
        let i = 0;
        if (i < parseInt(row.copys)) {
          i++;
          var numLSH =
            parseInt(row.LSH) - i + "," + parseInt(row.LSH).toString();
          return numLSH;
        }
      }
    }
  },
  created() {
    this.listLoading = true;
    this.isCAD = localStorage.getItem('isCAD');
    // console.log(JSON.parse(this.$route.query.OrderInfo));
    // this.routerForm = JSON.parse(localStorage.getItem('OrderInfo'));
    this.routerForm = JSON.parse(this.$route.query.OrderInfo);
    this.listQuery = this.routerForm.Id;
    this.mode = this.routerForm.mode;
    this.type = this.routerForm.type;
    // this.listdetail.push(JSON.parse(localStorage.getItem('OrderInfo')));
    this.listdetail.push(this.routerForm);

    this.qureyForm.OrderId = this.routerForm.OrderId;
    this.qureyForm.State = this.routerForm.State;
    this.qureyForm.Id = this.routerForm.Id;
    
    // console.log(this.qureyForm)
    // //详细列表显示测试数据
    // this.getJson();
    if (this.listQuery != null) {
      this.getList();
      this.getOrderinfo();
    } else {
      this.listLoading = false;
    
    }
  },
  methods: {
    handleHelp(h,{column}){
    return (
            <el-tooltip
              class="item"
              effect="light"
              content="只有待处理状态才可以操作"
              placement="top"
            >
              <span>{column.label}<img src='static/img/icon_help.png' alt="" class="backFile"></img></span>
              </el-tooltip>
          )
      },
    /**进入生产流程 */
    handleProduct(row){

      Updatestate({id:row.Id}).then(res=>{
        this.$confirm('此操作将该生产单进入生产流程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass:"message-box"
        }).then(() => {
          if(res.Success){
          this.$message({
            message:res.tip,
            type:"success"
          })
        }else{
          this.$message({
            message:res.tip,
            type:"warning"
          })
        }
        }).catch(() => {
                   
        });
        
      })

    },
    //物料编辑方法
    editShow(row, index) {
     
      this.MeterialForm = { ...row };
      this.MeterialForm.width =this.MeterialForm.width.toString();
      this.merterailIndex = index;
       this.dialogMeterial = true;
    },
    sureEditMeterial(formName) {
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

      // putOrderMeterialInfo(form).then(res => {
      //   // console.log(res);
      //   if (res.Success) {
      //     this.dialogMeterial = false;
      //     this.getOrderinfo();
      //     this.$message({
      //       showClose: true,
      //       message: "成功",
      //       type: "success",
      //       duration: 2000
      //     });
      //   } else {
      //     this.$message({
      //       showClose: true,
      //       message: res.ErrMes,
      //       type: "error",
      //       duration: 2000
      //     });
      //     this.dialogMeterial = false;
      //     this.getOrderinfo();
      //   }
      // });
    },
    addshow() {
      this.resetAddmeterial();
      this.dialogAddMeterial = true;
      // console.log(this.addMeterialFormArr)
    },
    addGDshow() {
      this.resetAddGDmeterial();
      this.dialogAddGDMeterial = true;
    },
    addCDshow() {
      this.dialogEditCDMeterial = true;
      this.optionsCD = [];
      this.optionsCDcolor = [];
      this.MeterCDFromArr.forEach(element => {
        this.optionsCD.push(element);
      });
      this.tableGDoutput.forEach(element => {
        this.optionsCDcolor.push(element);
      });
    },
    addMeterialFormArr() {
      this.addmerterailIndex++;
      this.AddMeterialFormArr.push(this.MeterialForm);
      // console.log(this.AddMeterialFormArr)
    },
    sureAddMeterial(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let index = this.addmerterailIndex;
          var form = {};
          form.orderJson = {};
          this.json.fabric.push(this.MeterialForm);
          form.orderId = this.routerForm.Id;
          form.orderJson = this.json;
          form.orderFabric = this.json.fabric;
          // console.log(this.json)
          // console.log(this.MeterialForm);
          this.EditMertrial(form);
        } else {
          this.$message({
            showClose: true,
            message: "名称，物料编码，幅宽不能为空！",
            type: "warning",
            duration: 2000
          });
          return false;
        }
      });
    },
    //成衣编辑
    editCDshow() {
      this.dialogEditCDMeterial = true;
      this.optionsCD = [];
      this.MeterCDFromArr.forEach(element => {
        this.optionsCD.push(element);
      });
    },
    chageCDcolor(e) {
      this.CDcolor = e;
    },
    chageCDname(e) {
      this.MeterCDFromArr.forEach(element => {
        if (e == element.id) {
          this.MeterCDFrom = Object.assign(this.MeterCDFrom, element);

          this.json.version.forEach(element1 => {
            if (element1.name == this.CDcolor) {
              if (element1.fabric != undefined || element1.fabric != "") {
                element1.fabric.push(this.MeterCDFrom);
              } else {
                let fabric = [];
                fabric.push(element);

                element1.fabric = fabric;
              }
            }
          });
        }
      });
    },
    sureEditCDMeterial() {
      // console.log(this.MeterCDFrom )
      var form = {};
      form.orderJson = {};
      form.orderId = this.routerForm.Id;
      form.orderJson = this.json;
      form.orderFabric = this.json.fabric;
      // delete form.orderId; //删除对象里面的某个属性
      putOrderMeterialInfo(form).then(res => {
        // console.log(res);
        if (res.Success) {
          this.dialogEditCDMeterial = false;
          this.$message({
            showClose: true,
            message: "成功",
            type: "success",
            duration: 2000
          });
          this.getOrderinfo();
        } else {
          this.dialogEditCDMeterial = false;
          this.$message({
            showClose: true,
            message: res.ErrMes,
            type: "error",
            duration: 2000
          });
          this.getOrderinfo();
        }
      });
    },
    //个订物料编辑
    editGDShow(row, index) {
      this.dialogEditGDMeterial = true;
      this.MeterGDFrom = { ...row };
      this.merterailIndex = index;
    },
    //新增个订物料
    sureAddGDMeterial(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var form = {};
          form.orderJson = {};
          this.json.fabric.push(this.MeterGDFrom);
          form.orderId = this.routerForm.Id;
          form.orderJson = this.json;
          form.orderFabric = this.json.fabric;
          this.EditMertrial(form);
        } else {
          this.$message({
            showClose: true,
            message: "名称，物料编码，幅宽不能为空！",
            type: "warning",
            duration: 2000
          });
          return false;
        }
      });
      // console.log(this.json);
    },
    //个订订单编辑
    sureEditGDMeterial(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var index = this.merterailIndex;
          // console.log(index);
          let arr = {};
          this.$set(this.json.fabric, index, { ...this.MeterGDFrom });
          // console.log(this.json);
          var form = {};
          form.orderJson = {};
          form.orderId = this.routerForm.Id;
          form.orderJson = this.json;
          form.orderFabric = this.json.fabric;
          this.EditMertrial(form);
          // alert('submit!');
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
          this.dialogAddMeterial = false;
          this.dialogAddGDMeterial = false;
          this.dialogEditGDMeterial = false;
          this.dialogMeterial = false;
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
         this.dialogAddMeterial = false;
          this.dialogAddGDMeterial = false;
          this.dialogEditGDMeterial = false;
          this.dialogMeterial = false;
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
   handGetJson(row){
   
    this.jsonDialogVisible = true;
   },
   /**跳转充绒文件 */
   jumpPartMsg(){
     if(this.type=="gd"||this.type=="dh"){
       const {href} = this.$router.resolve({
         path:'/partDetails',
         query:{
           id:this.json.id,
           type:this.type
         }
       })
       window.open(href, "_blank");
     }else{
        const {href} = this.$router.resolve({
         path:'/partDetails',
         query:{
           id:this.json.order.orderID,
           type:this.type
         }
       })
       window.open(href, "_blank");
     }
   },
    //获取当前订单详细json
    getOrderinfo() {
      let form = {};
      form.orderId = this.routerForm.Id;
      Getorderjson(form).then(res => {
        if (res.Success && res.Data.Rows != null) {
          this.json = res.Data.Rows;
          this.orderMeterial = res.Data.Rows.fabric;
          //成衣显示数据
          if (res.Data !== "" && this.type == "dh") {
            
            if( res.Data.Rows.fabric == undefined || res.Data.Rows.fabric == ''){
              this.CDMeterial  = [];
            }
            this.CDMeterial = res.Data.Rows.fabric;
            var data = JSON.parse(JSON.stringify(res.Data.Rows));
            this.MeterCDFromArr = data.fabric;
            if(data.size == undefined || data.size == ''){
            this.tableData  =[]
            }else{
              this.tableData = data.size; //尺码产量
               this.tableData[0].size_name = data.size_name; //尺码产量
            }
            // this.tableGDoutput = data.version;
            var tableCDVersion = data.version; //颜色搭配
            var obj = {};
           
            this.tableArrName = data.size_name.name;
            var arr = [];
            var arrColor = [];
            tableCDVersion.forEach((element,index) => {
              let obj = {};
              obj.color = element.name;

              arrColor.push(obj);
              if(data.fabric == undefined || data.fabric == ''){
                    data.fabric = []
              }else{
                data.fabric.map((el,key)=>{
                if(key == index){
              el.color = obj.color;
              arr.push(el);
                }
               
            })
              }
          
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
            // console.log(this.tableFabric);
          } else if (res.Data !== "" && this.type == "gd") {
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
    editMerterial() {
      var form = {};
      form.id = this.routerForm.Id;

      //  putOrderMeterialInfo().then(res=>{

      //  })
    },
    //这里是测试cad程序方法
    getJson() {
      this.showversion = true;
      var form = {};
      form.orderName = this.routerForm.OrderId;
      form.id = this.routerForm.Id;
      form.type = "order";
      getsinglejson(form).then(res => {
        // console.log(JSON.stringify(res));
        if (res.Success) {
          if (res.Data !== "") {
            var data = res.Data;
            this.demojson = res.Data;
            // this.tableData = data.size;
            // this.tableGDoutput = res.Data.version;
            // var obj = {};
            // this.tableData[0].size_name = data.size_name;
            // this.tableArrName = data.size_name.name;
            // var arr = [];
            // var arrColor = [];
            //  this.tableGDoutput.forEach(element => {
            //     let obj = {};
            //     obj.color = element.name;
            //     arrColor.push(obj);
            //     element.fabric.forEach(ele => {
            //       ele.color = obj.color;
            //       arr.push(ele);
            //     });
            //   });
            // this.tableFabric = arr;
          }
        }
        //  console.log( this.tableData);
      });
    },
    //刷新版单信息 调用setData
    updateModel() {
      // console.log(this.bowserExplorer)
      localStorage.setItem("type", this.type);
        var cadtype= '';
      if(this.type == 'dh'){
              cadtype = 'order'
          }else if(this.type == 'gd'){
               cadtype = 'gd'
          }else{
             cadtype = 'td'
          }
          // alert(cadtype);
          // alert(JSON.stringify(this.json));
      if (this.bowserExplorer == "ie") {
        var state = window.external.setData(
          cadtype,
          JSON.stringify(this.json)
        );
        if (state == "OK") {
          localStorage.setItem("OrderInfo", this.$route.query.OrderInfo);
          window.external.closeDialog(0);
        } else {
          alert(state);
        }
      } else {
          localStorage.setItem("OrderInfo", this.$route.query.OrderInfo);
        var state = window.buyiSetData(cadtype, JSON.stringify(this.json));
        if (state == "OK") {
          localStorage.setItem("OrderInfo", this.$route.query.OrderInfo);
          window.buyiCloseDialog(0);
        } else {
          alert(state);
        }
      }
    },
    //新建 成衣用order 团订 td 个订 gd
    creatModel() {
      let form = {};
      form.mode = "create";
      form.projectName = this.json.name || this.json.code ||this.json.order.orderName;
      form.projectID = this.json.id || this.json.order.orderID;
      form.fileID = 0;
      form.filePath = "";
      form.fileName = "";
      form.token = getToken();
      var cadtype= '';
      // console.log(form);
      alert(JSON.stringify(this.json));
      localStorage.setItem("type", "order");
      if(this.type == 'dh'){
              cadtype = 'order'
          }else if(this.type == 'gd'){
               cadtype = 'gd'
          }else{
             cadtype = 'td'
          }
      alert(JSON.stringify(cadtype));
      CreatFtpInfo(form).then(res => {
        // console.log(res);
        alert(JSON.stringify(res.Data));
        localStorage.setItem("OrderInfo", this.$route.query.OrderInfo);
        //  alert(JSON.stringify(res));
        var state = "";
        if (this.bowserExplorer == "ie") {
      
            state = window.external.openFile(
            cadtype,
            JSON.stringify(this.json),
            JSON.stringify(res.Data)
          );
          // alert(state)
          if (state == "OK") {
            this.$message({
              showClose: true,
              message: state,
              type: "success",
              duration: 2000
            });
            window.external.closeDialog(0);
            this.LockOrderInfo(form.projectID);
          } else {
            // alert(state);
            this.$message({
              showClose: true,
              message: state,
              type: "error",
              duration: 2000
            });
          }
        } else {
          state = window.buyiOpenFile(
            cadtype,
            JSON.stringify(this.json),
            JSON.stringify(res.Data)
          );
          if (state == "OK") {
            this.$message({
              showClose: true,
              message: state,
              type: "success",
              duration: 2000
            });
            window.buyiCloseDialog(0);
            this.LockOrderInfo(form.projectID);
          } else {
            // alert(state);
            this.$message({
              showClose: true,
              message: state,
              type: "error",
              duration: 2000
            });
          }
        }
      });
    },
    creatCD(){

    },
    //锁定生产单 buyiLockOrder
    LockOrderInfo(projectID) {
      let data = {};
      data.OrderId = projectID;
      data.token = getToken();
      LockOrder(data).then(res => {
        // alert(JSON.stringify(res));
      });
    },
    //这里是测试cad程序方法
    getProcess() {
      //工序列表
      pageStep(this.listQuery).then(response => {
        // console.log(response)
        if (response.status === 200) {
          //成功加载
          this.processList = response.data.rows;
          this.listLoading = false;
          this.processList.forEach(element => {
            if (20 < element.Code < 30) {
              this.showEditState == true;
            }
          });
        } else if (response.status === 201) {
          this.listLoading = false;
        } else {
          //失败提示
          this.$message({
            offset: 700,
            message: response.error,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    getList() {
      // 加载生产单信息
      // this.mode = this.routerForm.mode;
      var obj = {};
      obj.Id = this.listQuery;
      obj.ModelId = this.routerForm.ModelId;
      pageProduct(obj).then(res => {
        // console.log(res)
        if (res.status == 200) {
          let form = res.data;
          form.OrderId = this.routerForm.OrderId;
          form.ModelName = this.routerForm.ModelName;
          form.StyleName = this.routerForm.StyleName;
          form.Yield = this.routerForm.Yield;
          form.State = this.routerForm.State;
          form.Pod = this.routerForm.Pod;
          form.Bed = this.routerForm.Bed;
          form.Id = this.routerForm.Id;
          form.mCode = this.routerForm.mCode;
          form.Step = this.routerForm.Step;
          this.orderList.push(form);
        }
      });
      // 床信息
      if (this.mode == "bed") {
        pageBed(this.listQuery).then(response => {
          if (response.status === 200) {
            //成功加载
            this.bedList = response.data.rows;
            this.total = response.data.total;
            this.listLoading = false;
          } else if (response.status === 201) {
            //成功加载
            this.listLoading = false;
          } else {
            //失败提示
            this.$message({
              offset: 700,
              message: response.error,
              type: "warning",
              duration: 2000
            });
          }
        });
      }
      //加载Pod列表
      if (this.mode == "pod") {
        podObj(this.listQuery).then(res => {
          if (res.status == 200) {
            //成功加载
            this.PodList = res.data.rows;
            this.total = res.data.total;
            this.listLoading = false;
          } else if (res.status == 201) {
            this.listLoading = false;
          } else {
            this.$message({
              offset: 700,
              message: res.error,
              type: "warning",
              duration: 2000
            });
          }
        });
      }
      //加载产量信息
      if (this.mode == "Yield" && this.type == "td") {
        // console.log(this.type);
        this.handleMes(this.qureyForm);
      }
      //加载工序信息
      if (this.mode == "process") {
        // console.log('process')
        this.getProcess();
      }
      //  加载物料信息
      if (this.mode == "material") {
        GetmaterialInfo(this.listQuery).then(res => {
          // console.log(res);
          this.materialList = [];
          if (res.status == 200) {
            this.listLoading = false;
            this.materialList.push(res.data.rows);
            // console.log(this.materialList)
          } else {
            this.$message({
              offset: 700,
              type: "error",
              message: res.tip,
              duration: 2000
            });
          }
          this.listLoading = false;
        });
      }
    },
    selectColor(row, index) {
      if (row.IsPod) {
        return "success-row1";
      } else {
        return "";
      }
    },
    handGetListCD(row) {
      this.CDdialogTable = true;
    },
    handGetList(name, objinfo) {
      this.mode = name;
      this.type = this.routerForm.type;
      this.infoForm = this.routerForm.Id;
      if (name == "process") {
        this.getProcess();
      }
      // 床信息
      if (name == "bed") {
        pageBed(this.infoForm).then(response => {
          if (response.status === 200) {
            //成功加载
            this.bedList = response.data.rows;
            this.total = response.data.total;
            this.listLoading = false;
          } else if (response.status === 201) {
            //成功加载
            this.listLoading = false;
          } else {
            //失败提示
            this.$message({
              offset: 700,
              message: response.error,
              type: "warning",
              duration: 2000
            });
          }
        });
      }
      //加载Pod列表
      if (name == "pod") {
        podObj(this.infoForm).then(res => {
          // console.log(res)
          if (res.status == 200) {
            //成功加载
            this.PodList = res.data.rows;
            this.listLoading = false;
          } else if (res.status == 201) {
            this.listLoading = false;
          } else {
            this.$message({
              offset: 700,
              message: res.error,
              type: "warning",
              duration: 2000
            });
          }
        });
      }
      //加载产量信息
      if (name == "Yield" && this.type == "td") {
        // console.log(this.type);
        var obj = {};
        obj.OrderId = objinfo.OrderId;
        obj.State = this.routerForm.State;
        obj.Id = this.routerForm.Id;
        showMes(obj).then(res => {
          if (res.status == 200) {
            this.listLoading = false;
            this.measurebodyList = res.data.rows.personList;
            this.measureinfoList = res.data.rows;
          } else {
            this.$message({
              type: "warning",
              message: res.tip.substring(0,6),
              duration: 2000
            });
            this.measurebodyList = [];
            this.measureinfoList = [];
          }
          this.listLoading = false;
        });
      }
      //  加载物料信息
      if (name == "material") {
        if (this.type == "td" && this.json == null) {
          GetmaterialInfo(this.listQuery).then(res => {
            // console.log(res);
            this.materialList = [];
            if (res.status == 200) {
              this.listLoading = false;
              this.materialList.push(res.data.rows);
              // console.log(this.materialList)
            } else {
              this.$message({
                type: "error",
                message: res.tip,
                duration: 2000
              });
            }
            this.listLoading = false;
          });
        } else {
          this.dialogMeterial = false;
        }
      }
      //显示颜色搭配
      if (name == "version") {
        // this.getJson()
        this.getOrderinfo();
      }
    },
    handleMes(obj) {
      showMes(obj).then(res => {
        if (res.status == 200) {
          this.listLoading = false;
          this.measurebodyList = res.data.rows.personList;
          this.measureinfoList = res.data.rows;
        } else {
          this.$message({
            offset: 700,
            type: "warning",
            message: res.tip.substring(0,6),
            duration: 2000
          });
        }
        this.listLoading = false;
      });
    },
    handlePod(row) {
      var info = {};
      info.ID = row.ID;
      info.OrderId = this.$route.query.id;
      if (row.ID.indexOf("ID") != -1) {
        this.$message({
          message: "ID数据格式不规范",
          type: "error",
          offset: 700
        });
        return false;
      } else {
        this.dialogPod = true;
        this.getlshinfo(info);
      }
    },
    getlshinfo(obj) {
      GetlshInfo(obj).then(res => {
        if (res.status == 200) {
          this.lshList = res.data.rows;
        }
      });
    },
    DownloadBed(value, row) {
      let form = {};
      form.bedId = row.BedId;
      form.type = value;
      downbed(form).then(res => {
        if (!res.Success && value == 'plt') {
          this.$message({
            message: res.ErrMes,
            type: "error"
          });
        } else if(!res && value == 'nc'){
            this.$message({
            message: res.ErrMes,
            type: "error"
          });
        }
        else {
          if(res.hasOwnProperty("Success")&&!res.Success){
            this.$message.warning(res.ErrMes)
          }else{
            // console.log(res)
            let data = res //data 为了你的数据流

            let blob=new Blob([data]);//将返回的数据包装成blob（方法的具体使用参考mdn）

            let alink = document.createElement("a");

            alink.download=row.BedName+'.nc';//文件名,大部分浏览器兼容,IE10及以下不兼容

            alink.href=URL.createObjectURL(blob);//根据blob 创建 url

            alink.click(); //自动点击
          }
        }
      });
    },
    handleDown(row) {
      let form = {};
      form.OrderName = this.routerForm.OrderId;
      form.Id = this.routerForm.Id;
      form.Pod = parseInt(row.pod);
      form.State = parseInt(this.routerForm.State);
      form.token = getToken();
  
      downLoad(form).then(res => {
        // console.log(res)
        if (res.status == 201) {
          // console.log(res.tip.indexOf(','))
          this.$message({
            message: res.tip.substring(0,res.tip.indexOf(',')),
            type: "error",
            offset: 700
          });
        } else {
          window.location.href =
            "/bmapi/downloadLSH?orderName=" +
            form.OrderName +
            "&pod=" +
            row.pod +
            "&state=" +
            form.State +
            "&token=" +getToken() +
            "&Id=" +
            form.Id;
        }
      });
    },
    //下载PLAN文件
    handleDownPlan(index, row) {
      let form = {};
      form.BindId = this.routerForm.BindId;
      form.Id = parseInt(this.routerForm.Id);
      form.State = parseInt(this.routerForm.State);
      form.type = index;
      form.token = getToken();
      downPLan(form).then(res => {
        // console.log(res)
        if (res.status == 201) {
          this.$message({
            message: res.tip,
            type: "error",
            offset: 700
          });
          this.isloading = -1;
        } else {
          window.location.href =
            "/bmapi/downplan?BindId=" +
            form.BindId +
            "&Id=" +
            form.Id +
            "&State=" +
            form.State +
            "&type=" +
            index +
            "&token=" +
            this.$store.getters.token;
          this.isloading = -1;
        }
      });
    },
    //下载订单文件
    handleDownOrder(index, row) {
      let form = {};
      form.Id = parseInt(this.routerForm.Id);
      form.token = this.$store.getters.token;
      downObj(form).then(res => {
        if (res.status == 201) {
          this.$message({
            message: res.tip,
            type: "error",
            durantion: 2000,
            offset: 700
          });
        } else {
          window.location.href =
            "/bmapi/downOrder?Id=" + form.Id + "&token=" + form.token;
        }
      });
    },
    //下载excel文件
    handleDownExcel(index, row) {
      // // console.log(row);
      let form = {};
      form.BindId = this.routerForm.BindId;
      form.Id = parseInt(this.routerForm.Id);
      form.State = parseInt(this.routerForm.State);
      form.type = index;
      form.token = this.$store.getters.token;
      downPLan(form).then(res => {
        if (res.status == 201) {
          this.$message({
            message: res.tip,
            type: "error",
            durantion: 2000,
            offset: 700
          });
          // this.isloading = -1;
        } else {
          window.location.href =
            "/bmapi/downplan?BindId=" +
            form.BindId +
            "&Id=" +
            form.Id +
            "&State=" +
            form.State +
            "&type=" +
            index +
            "&token=" +
            this.$store.getters.token;
          // this.isloading = -1;
        }
      });
    },
    handelClick() {
      // console.log('click')
    },
    ChangeDown(e, row) {
      //0下载PLAN
      // console.log(row)
      if (e == 0) {
        // this.DownNum = e;
        let type = "plan";
        this.handleDownPlan(type);
      } else if (e == 1) {
        //1下载订单文件
        // this.DownNum = e;
        this.handleDownOrder(e, row);
      } else {
        // 下载EXCEL
        // this.DownNum = e;
        let type = "mark.xls";
        this.handleDownExcel(type, row);
      }
    },
    handleFilter() {
      //this.getList();
      // console.log("tag", this.value7);
      // console.log("tag", this.value7[0].toISOString().slice(0, 10));
      // console.log("tag", this.value7[1].toISOString().slice(0, 10));
    },
    handleSizeChange(val) {
      // this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      // this.listQuery.page = val;
      this.getList();
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleEdit(index, row) {
      var form = {};
      form.code = row.Code;
      form.pcid = this.listQuery;
      resetProcess(form).then(res => {
        if (res.status == 200) {
          this.$message({
            offset: 700,
            type: "success",
            message: res.tip,
            duration: 2000
          });
        } else {
          this.$message({
            offset: 700,
            type: "error",
            message: res.tip,
            duration: 2000
          });
        }
      });
    },
    handlePod(index, row) {
      // console.log('pod')
      this.moveloginid = row.loginid;
      this.handGetList("pod");
    },
    handleMove(index, row) {
      // console.log('notpod')
    // console.log(row)
      this.formInfo.code = row.Code;
      this.formInfo.LoginiId = row.loginid;
      this.formInfo.pcid = this.routerForm.Id;
      getremoveInfo(this.formInfo).then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.dialogRemove = true;
          this.optionsRemove = res.data.rows;
        } else {
          this.$message({
            message: res.tip,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    handleMovepod(index, row) {
     
      this.formInfo.code = 35;
      this.formInfo.pcid = parseInt(this.routerForm.Id);
      // this.formInfo.LoginiId = this.moveloginid;
      if (this.moveloginid == "" || this.moveloginid == null) {
        this.formInfo.LoginiId = 0;
      } else {
        this.formInfo.LoginiId = this.moveloginid;
      }
      // console.log(row)
      this.formInfo.Pod = row.Pod;
      getremoveInfo(this.formInfo).then(res => {
        if (res.status == 200) {
          // console.log(res)
           this.dialogRemove = true;
           this.showPodBtn = true;
          this.optionsRemove = res.data.rows;
        } else {
          this.$message({
            offset: 700,
            // title: "",
            message: res.tip,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    cancleRemove() {
      this.dialogRemove = false;
      // this.optionsRemove = '';
    },
    sureRemove() {
      var removeForm = this.formInfo;
      removeForm.Id = this.listQuery;
      if (this.radioRemove == "" || this.radioRemove == null) {
        this.$message({
          message: "请选择员工",
          type: "warning",
          duration: 2000
        });
        return false;
      } else {
        removeForm.LoginiId = this.radioRemove;
        // console.log(removeForm)
        removeProcess(removeForm).then(res => {
          if (res.status == 200) {
            // console.log(res)
            this.$message({
              offset: 700,
              title: "成功",
              message: res.tip,
              type: "success",
              duration: 2000
            });
            this.getProcess();
            this.dialogRemove = false;
          } else {
            this.$message({
              offset: 700,
              title: "失败",
              message: res.tip,
              type: "warning",
              duration: 2000
            });
          }
          this.dialogRemove = false;
        });
      }
    },
    sureRemovePod() {
      var removeForm = this.formInfo;
      removeForm.Id = this.listQuery;
      if (this.radioRemove == "" || this.radioRemove == null) {
        this.$message({
          message: "请选择员工",
          type: "warning",
          duration: 2000
        });
        return false;
      } else {
        removeForm.LoginiId = this.radioRemove;
        // console.log(removeForm)
        removePod(removeForm).then(res => {
          if (res.status == 200) {
            // console.log(res)
            this.$message({
              offset: 700,
              title: "成功",
              message: res.tip,
              type: "success",
              duration: 2000
            });
            this.handGetList("pod");
            this.dialogRemove = false;
          } else {
            this.$message({
              offset: 700,
              title: "失败",
              message: res.tip,
              type: "warning",
              duration: 2000
            });
          }
          this.dialogRemove = false;
        });
      }
    },
    create(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          addObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$message({
              offset: 700,
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    update(formName) {
      const set = this.$refs;
      set[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false;
          this.form.password = undefined;
          putObj(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$message({
              offset: 700,
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        } else {
          return false;
        }
      });
    },
    isable(obj) {
      // console.log(obj);
      if (obj === 10) {
        return true;
      } else return false;
    },
    resetTemp() {
      this.form = {
        UserName: undefined,
        Phone: undefined,
        State: 1,
        Up: undefined,
        Down: 0,
        MAC: undefined,
        Remark: undefined
      };
    },
    resetAddmeterial() {
      this.MeterialForm = {
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
    // 路由跳转函数
    routerLink(name, detailinfo, obj) {
      this.$router.push({
        // path: 'yourPath',
        name: name,
        // params: {
        //     name: 'name',
        //     dataObj: this.msg
        // }
        query: {
          id: obj.Id,
          mode: detailinfo,
          type: obj.type,
          status: obj.State,
          modelid: obj.OrderId,
          OrderInfo: JSON.stringify(obj)
        }
      });
    }
  }
};
</script>
<style scoped>
.el-table .success-row1 {
  background: rgb(253, 233, 230);
}
.el-table .warning-row {
  background: #f0f9eb;
}
.line {
  width: 100%;
  height: 30px;
  display: block;
}
.app-container p {
  text-align: center;
  font-size: 19px;
  font-weight: 600;
}
.down-list li {
  list-style: none;
  margin: 0 auto;
  display: table-header-group;
}
.checkRadio {
  margin-left: 16px !important;
}
.demo-form-inline {
  padding-left: 83px;
}

.message-box{
  position:relative;
  top:-270px;
}
</style>

