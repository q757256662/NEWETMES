<template>
  <div>
    <!-- 款式参数 setModelPare-->
    <div class="app-container calendar-list-container">
      可驱动：
      <el-select v-model="downloadQuery['model']" placeholder="请选择" style="width: 70px;">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <!-- 存储模式：
          <el-select v-model="downloadQuery['saveModel']" placeholder="请选择" style="width: 90px;">
            <el-option v-for="item in SaveModeloptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
      品类名：
      <el-select style="width: 150px;" v-model="downloadQuery['Type']" @visible-change="selectCategort" placeholder="请选择品类">
        <el-option v-for="item in categoriesOption" :key="item.Id" :label="item.CategoryName" :value="item.CategoryName"></el-option>
      </el-select>
      品牌：
      <el-input placeholder="请输入品牌" style="width: 150px;" class="filter-item" v-model="downloadQuery['Brand']">
      </el-input>
      款名：
      <el-input :readonly="true" style="width: 150px;" class="filter-item" v-model="downloadQuery['StyleName']">
      </el-input>
      <!-- 存储模式：{{downloadQuery['SaveModel']==1?"加法":downloadQuery['SaveModel'] == 0?"普通":"减法"}} -->
      存储模式：
      <!-- <el-input :readonly="true" style="width: 80px;" class="filter-item" :value="downloadQuery['SaveModel']==1?'加法':downloadQuery['SaveModel'] == 0?'普通':''"> </el-input> -->
      <el-select style="width: 80px;" class="filter-item" v-model="downloadQuery.SaveModel">
        <el-option :value="1" label="加法" key="1"></el-option>
        <el-option :value="0" label="普通" key="0"></el-option>
        <el-option :value="-1" label="减法" key="-1"></el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="import" @click="handleSave">保存</el-button>
      <!-- <el-popover ref="popover1" placement="bottom" trigger="hover">
        
       只有保存款式成功之后，<br>
       才可以进行款式参数操作。
      
       
       
      </el-popover>
      <! </div> -->
      <!-- <img v-popover:popover1 style="opacity: 0.5;width: 17px;" src="static/img/icon_help.png" alt="" srcset=""> -->
      <!-- <el-button type="primary" :loading="isloading" @click="submitInfo">下载款式信息</el-button> -->
    </div>
    <el-tabs type="border-card" :active-name="tabactive" v-model="tabactive" @tab-click="changeModel">
      <el-tab-pane name="third" label="样式" style="padding:20px;">
        <!-- <el-button class="filter-item" type="primary" v-waves  @click="handleaddModel">样式参数列表</el-button> -->
        款式参数：
        <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="" v-model="listQuery.type"> </el-input> -->
        <el-select v-model="styleQurey['ParaType']" @visible-change="getSearchPara" @change="selectParaType($event,styleQurey['isText'])" placeholder="请选择">
          <el-option label="全部" value="-1"></el-option>
          <el-option v-for="item in selecetParaTypeOptions" :key="item.label" :label="item.label" :value="item.label">
          </el-option>
        </el-select>
        <el-select v-if="styleQurey['isText'] == 2" v-model="styleQurey.min" @change="selecetQurey($event)" placeholder="请选择">
          <el-option v-for="item in selecetStyleQureyMin" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <!-- <el-input v-if="styleQurey['isText'] == 2" style="width: 100px;" class="filter-item" placeholder="请输入" v-model="styleQurey.min"> </el-input> -->
        <el-input v-if="styleQurey['isText'] == 1" style="width: 100px;" class="filter-item" placeholder="起始值" v-model="styleQurey.min"> </el-input>
        <span v-if="styleQurey['isText'] == 1">-</span>
        <el-input v-if="styleQurey['isText'] == 1" style="width: 100px;" class="filter-item" placeholder="结束值" v-model="styleQurey.max"> </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleSearch">搜索</el-button>
        <!-- <el-button type="primary" @click="editModelStyle">样式定义</el-button> -->
        <el-upload style="display:inline-block" class="upload-demo" ref="upload1" action="/bmapi/styleimport/newUpModel" :headers="header" :on-preview="handlePreview" :show-file-list="false" :data="styleUpload" :on-remove="handleRemove" :on-success="successUpload"
          :on-error='errorUpload' :before-upload="beforeAvatarUpload" :on-change='handleChangeFile' :multiple="false" :auto-upload="false" accept=".prj">
          <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
          <el-button style="margin-left: 10px;" type="primary" @click="AddUpload" :loading="loading">增加样式</el-button>
        </el-upload>
        <!-- <div style="display: flex;justify-content: center;"> -->
        <!-- <el-button type="primary" @click="updateModel" >刷新版单信息</el-button>  -->
        <!-- </div>    -->
        <el-table key="madelData" style="margin-top:18px;" v-if="madelData.length !== 0" :data="madelData" border>
          <el-table-column property="ModelName" label="样式名" align="center">
            <template scope="scope">
                    <a style="text-decoration: underline;color: rgb(32, 160, 255)" @click="handleTo(scope.row)">{{scope.row.ModelName}}</a>
</template>
          
          </el-table-column>
          <el-table-column :key="index" align="center" :label="item.ParaName" v-for="(item,index) in paraNames">
<template scope="scope">
  <!-- {{scope.row.ModelParaItems[index].ParaVal}} -->

  <span >{{scope.row.ModelParaItems[index]|filterItem}}</span>

</template>

          </el-table-column>

          <el-table-column v-if ="false" label="操作" align="center">
<template scope="scope">
  <el-upload style="display:inline-block" class="upload-demo" ref="upload" action="/bmapi/styleimport/newUpModel" :headers="header" :on-preview="handlePreview" :show-file-list="false" :data="upModelData" :on-remove="handleRemove" :on-success="successUpload"
    :on-error='errorUpload' :before-upload="beforeAvatarUpload" :on-change='handleChangeFile' :multiple="false" :auto-upload="false" accept=".prj">
    <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
    <el-button style="margin-left: 10px;" size="mini" @click="upModel(scope.row,scope.$index)" type="primary">
      上传</el-button>
    <!-- <el-button style="margin-left: 10px;" type="primary" @click="AddUpload" :loading="loading">增加样式</el-button> -->
  </el-upload>
  <el-button  size="mini" @click="copyModel(scope.row,scope.$index)" type="primary">
    复制</el-button>
  <!-- <el-button v-if="isSure !==scope.$index " size="mini" @click="editModelPara(scope.row,scope.$index)"
                  type="primary">
                  编辑</el-button>
                <el-button v-if="isSure ==scope.$index " size="mini" @click="SureEditModelPara(scope.row,scope.$index)"
                  type="primary">
                  确定</el-button>
                <el-button v-if="isSure ==scope.$index " size="mini" @click="canceleditModelPara(scope.row,scope.$index)"
                  type="primary">
                  取消</el-button> -->
  <!-- <el-button size="mini" @click="delteModel(scope.row)" type="danger">
      删除</el-button> -->
</template>
          </el-table-column>
        </el-table>

 <!-- 这里放所有样式列表 -->
   <el-table key='modelList' style="margin-top:18px;" v-if="madelData.length == 0" :data="ModelList"  border fit highlight-current-row>
      <el-table-column align="center" label="款名" >
<template scope="scope">
  <!-- <el-tooltip class="item" effect="light" content="点击修改款式信息" placement="top"> -->
  <!-- <a style="text-decoration:underline; 	color:#20a0ff" @click="handleEditStyle(scope.row)"> -->
  {{scope.row.StyleName}}
  <!-- </a> -->
  <!-- </el-tooltip> -->
</template>
      </el-table-column>
      <!-- <el-table-column prop="model_name" align="center" label="样板名"> </el-table-column>  -->
      <el-table-column align="center" label="样板名" >
<template scope="scope">
  <!-- <el-tooltip class="item" effect="light" content="点击进入样板详情" placement="top"> -->
  <a style="text-decoration:underline; 	color:#20a0ff" @click="routerLink('样板详情',scope.row)">
  <!-- <router-link  :to="{name:'样板详情',query:{id:scope.row.ModelName}}"  > {{ scope.row.ModelName }}</router-link> -->
  {{ scope.row.ModelName }}
  </a>
  <!-- </el-tooltip> -->
</template>
      </el-table-column>
      <el-table-column prop="Type" align="center" label="服装品类名"> </el-table-column>

      <el-table-column prop="Brand" align="center" label="客户/品牌"> </el-table-column>
      <el-table-column prop="SaveModel" align="center" label="存储模式">
<template scope="scope">
   {{scope.row.SaveModel | SwitchMode}}
</template>
      </el-table-column>
      <el-table-column align="center" label="是否可驱动">
<template scope="scope">
   {{scope.row.model | isModel}}
</template>
      </el-table-column>
      <el-table-column prop="Time" :formatter="ChangeDateFormat" align="center" label="创建时间">
      </el-table-column>
      <el-table-column align="center" label="状态">
<template scope="scope">
   {{scope.row.State | StyleIquiryStatus}}
</template>
      </el-table-column>
    </el-table>
      </el-tab-pane>
      <el-tab-pane name="first" label="款式/订单参数" style="padding:20px;">
        <el-button class="add-button" type="primary" @click="addModel" :disabled="buttonDisbale">增加</el-button>
        <el-table :data="tableData" border style="width:100%;min-width:1000px;">
          <el-table-column prop="ParaName" label="参数名" align="center">
          </el-table-column>
          <el-table-column  label="参数值" align="center">
<template scope="scope">
  <el-select v-if="scope.row.IsDrive == '0'" v-model="scope.row.StyleParaVals" @change="defaultvalChange($event,scope)" placeholder="请选择">
    <el-option label="新增" value="新增" key="新增"></el-option>
    <el-option label="删除" value="删除" key="删除"></el-option>
    <el-option v-for="(item,index) in scope.row.selectArr" :key="index" :label="item" :value="item">
    </el-option>
  </el-select>
  <span v-else>{{scope.row.DefaultVal}}</span>
</template>
          </el-table-column>
          <el-table-column label="可选参数值" width="410px" align="center">
<template scope="scope">
  <el-tooltip v-if="scope.row.StyleParaVals!= null && scope.row.StyleParaVals.length>10" :content="scope.row.StyleParaVals | StyleParaValsFilter1" placement="bottom" effect="light">
    <span>
                    {{scope.row.selectArr | StyleParaValsFilter}}
                  </span>
  </el-tooltip>
  <span v-else>
                  {{scope.row.selectArr | StyleParaValsFilter}}
                </span>
</template>
          </el-table-column>
          <el-table-column prop="DefaultVal" label="部件实现" width="125px" align="center">
<template scope="scope">
  <el-switch @change="changeIsDriver($event,scope.row,scope.$index)" v-model="scope.row.IsDrive" on-color="#13ce66" off-color="#ff4949" :width="70" :on-value="0" on-text="需要" off-text="不需要" :off-value="1">
  </el-switch>
  <!-- <span :style="scope.row.IsDrive==1?'color: red;':''">
               {{scope.row.IsDrive == 1?"是":"否"}}
              </span> -->
</template>
          </el-table-column>
          <el-table-column prop="address" label="操作" align="center">
<template scope="scope">
  <el-button size="mini" @click="editModel(scope.row)" :disabled="buttonDisbale" type="primary">
    编辑</el-button>
  <el-button size="mini" @click="delteModel(scope.row)" type="danger">
    删除</el-button>
</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="second" label="部件" style="padding:20px;">
      <el-button class="add-button" type="primary" @click="addPart" :disabled="buttonDisbale">增加</el-button>
      <el-button type="primary" :loading="isloading" @click="submitInfo">下载款式信息</el-button>
      <el-button type="primary" @click="handleDownloadPart" :loading="downloading">下载部件</el-button>
      <el-upload
        style="display:inline-block;margin-left:10px;"
        action="/bmapi/styleimport/uploadPart"
        :data="{styleId:downloadQuery.StyleId,
          styleName:downloadQuery.StyleName,}"
        :headers="header"
        :limit="1"
        :show-file-list="false"
        :before-upload="beforePartUpload"
        :on-success="handlePartSuccess"
        :on-error="handlePartError"
        :file-list="uploadPartFile">
        <el-button type="primary" :loading="partLoading">上传部件</el-button>
        <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
      </el-upload>
      <!-- <el-button type="primary" @click="handleUploadPart">上传部件</el-button> -->
<template>
  <el-table :data="tableData1" border style="width: 100%;">
    <el-table-column prop="PartName" label="部件名/参数名" align="center">
      <template scope="scope">
                  <a style="color: rgb(32, 160, 255)" @click="handleUpate(scope.row)"> <span>
                      {{scope.row.PartName}}
                    </span>
                  </a>
</template>
            </el-table-column>
            <el-table-column v-for="(item,index) in partName" :key="item" prop="IsHave" :label="item" 
              align="center">
<template scope="scope">
  <!-- <el-radio-group v-model="scope.row.IsHave[index]" @change="relationChange($event,scope.row,index)">
          <el-radio class="radio"  :label='0'>
              <span class="el-icon-close" style="color: red;"></span>
              </el-radio>
            <el-radio class="radio"  :label="1">
              <span class="el-icon-check"></span>
            </el-radio>
          </el-radio-group> -->
  <el-switch v-model="scope.row.IsHave[index]" @change="relationChange($event,scope.row,index)" on-color="#13ce66" off-color="#ff4949" :width="70" :on-value="1" on-text="相关" off-text="不相关" :off-value="0">
  </el-switch>
  <!-- <span :class="scope.row.IsDrive[index] == 0?'el-icon-close':'el-icon-check'" :style="scope.row.IsDrive[index] == 0?'color: red;':'color: green;'"> -->
  <!-- {{scope.row.IsDrive[index]}} -->
  <!-- </span> -->
</template>
            </el-table-column>
            <el-table-column prop="PartName" label="操作" align="center">
<template scope="scope">
  <el-button size="mini" @click="getAllPossible(scope.row)" type="primary">
    查看组合结果</el-button>
  <el-button size="mini" @click="deltePart(scope.row)" type="danger">
    删除</el-button>
</template>
            </el-table-column>
          </el-table>
        </template>
      </el-tab-pane>
         <!-- 此处为测试demo显示表格数据 -->

    </el-tabs>

    <!-- 此处为demo模态框修改 -->

    <!-- 此处为demo模态框修改 -->
    <!-- 结果显示 -->
    <div class="dialogPartList" v-if="dialogPart">
      <el-dialog v-dialogDrag :title="stylepartName" :visible.sync="dialogPart">
        <!-- <el-card class="box-card lists">
  <div v-for="item in possibleList" :key="item" class="text item">
    {{ item }}
  </div>
</el-card> -->
        <div class="lists">
          <li v-for="item in possibleList" :key="item" class="text item"> {{ item }} </li>
          <li v-if="possibleList == ''"> 暂无数据</li>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPart = false">取 消</el-button>
          <!-- <el-button type="primary" @click="dialogPart= false">确 定</el-button> -->
        </div>
      </el-dialog>
    </div>

    <el-dialog v-dialogDrag title="修改部件名称" custom-class="part-dialogDrag" size="tiny" :visible.sync="dialogUpdatePart">
      <el-form :model="addPartform">
        <el-form-item label="部件名称" :label-width="formLabelWidth">
          <el-input style="max-width:300px;min-width:190px;" v-model="addPartform.PartName" auto-complete="off">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdatePart = false">取 消</el-button>
        <el-button type="primary" @click="UpdatePartSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 结果显示 -->
    <!-- 新增部件 -->
    <el-dialog v-dialogDrag  title="新增部件" custom-class="part-dialogDrag" size="tiny" :visible.sync="dialogAddPart">
      <el-form :model="addPartform">
        <el-form-item label="部件名称" :label-width="formLabelWidth">
          <el-input style="max-width:300px;min-width:190px;" v-model="addPartform.PartName" auto-complete="off">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddPart = false">取 消</el-button>
        <el-button type="primary" @click="addPartSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增部件 -->
    <!-- 增加数据 -->
    <el-dialog v-dialogDrag custom-class="part-dialogDrag" :title="textMap[dialogStatus]" size="tiny" :visible.sync="addFormVisible">
      <el-form :model="addform" :rules="addrules" ref="ruleForm">
        <el-form-item prop="paraType" v-if="dialogStatus !== 'update'" label="参数类型" :label-width="formLabelWidth">
          <el-select v-model="addform.paraType" placeholder="请选择" @change="paraTypeChange">
            <el-option v-for="item in paraTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item v-if="dialogStatus !== 'update'" label="常用参数" :label-width="formLabelWidth">
          <el-select @change="paraNameChange" v-model="addform.paraName"
            :disabled="addform.paraType == '数值型工艺参数' || addform.paraType == '文字型工艺参数' " placeholder="请选择">
            <el-option v-for="item in paraNameOptions" :key="item.value" :label="item.label" :value="item.label">
            </el-option>

          </el-select>

        </el-form-item>
        <el-form-item label="参数名" :label-width="formLabelWidth" prop="addName">
          <el-input v-if="dialogStatus !== 'update'" style="max-width:300px;min-width:190px;"
            :disabled="addform.paraName!=='' " v-model="addform.addName" auto-complete="off"></el-input>
          <el-input v-else style="max-width:300px;min-width:190px;" disabled v-model="addform.addName"
            auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认值" :label-width="formLabelWidth" prop="defaultVal">
          <el-input style="max-width:300px;min-width:190px;" v-model="addform.defaultVal" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item v-if="dialogStatus == 'create'" label="需要部件实现" :label-width="formLabelWidth">
          <el-switch v-model="addform.isPart" @change="isPartChange"
            :disabled="addform.paraType == '量体' || addform.paraType == '物料'" on-color="#13ce66" off-color="#ff4949"
            :on-value="0" on-text="是" off-text="否" :off-value="1">
          </el-switch>
        </el-form-item>
        <el-form-item v-if="false" label="是否驱动" :label-width="formLabelWidth">
          <el-switch v-model="addform.isPart" @change="isPartChange" disabled on-color="#13ce66" off-color="#ff4949"
            :on-value="1" on-text="是" off-text="否" :off-value="0">
          </el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="addSubmit">确 定</el-button>
        <el-button v-else type="primary" @click="updateSubmit">确 定</el-button>

      </div>
    </el-dialog>

    <!-- 增加默认值 -->
    <el-dialog v-dialogDrag title="增加" size="tiny" :visible.sync="dialogFormVisible">
      <el-form :model="driveForm">
        <el-form-item label="参数值" label-width="60px">
          <el-input style="max-width:300px;min-width:190px;" v-model="driveForm.paraVal" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDrivevalue">取 消</el-button>
        <el-button type="primary" @click="submitDrivevalue">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加默认值 -->
    <!-- 删除默认值 -->
    <el-dialog v-dialogDrag title="删除" size="tiny" :visible.sync="deleteFormVisible">
      <el-form :model="delDriveForm">
        <el-form-item label="参数值" label-width="60px">
          <el-select v-model="delDriveForm.paraVal" @change="delValChange" placeholder="请选择">
            <el-option v-for="item in delDriveForm.StyleParaVals" :key="item" :label="item" :value="item">
            </el-option>

          </el-select>
          <el-button type="danger" @click="deleteValue">删 除</el-button>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deleteFormVisible =false">取 消</el-button>
        <!-- <el-button type="primary" @click="deleteFormVisible =false">确 定</el-button> -->
      </div>
    </el-dialog>
    <!-- 删除默认值 -->
    <!-- 样式定义 -->
    <el-dialog v-dialogDrag title="编辑样式定义" style="width:65%;min-width:760px;left:15%;" :visible.sync="styleTableVisible">
      <el-form :model="styleForm">
        <el-form-item label="样式名：" style="margin-left: 52px;" label-width="80px;">
          <el-input style="max-width:300px;min-width:150px;" v-model="styleForm.styleName" auto-complete="off">
          </el-input>
        </el-form-item>
      </el-form>

      <el-table :data="styleDate" border style="width: 85%;margin: 0 auto;">
        <el-table-column prop="ParaName" label="参数名">
        </el-table-column>
        <el-table-column prop="DefaultVal" label="参数值">
<template scope="scope">
  <el-select v-if="scope.row.IsDrive == '0'" v-model="scope.row.DefaultVal" @change="styleValChange($event,scope)" placeholder="请选择">
    <el-option v-for="item in scope.row.StyleParaVals" :key="item" :label="item" :value="item">
    </el-option>
  </el-select>
  <span v-else>
                <!-- {{scope.row.DefaultVal}} -->
                <el-input v-model="scope.row.DefaultVal" auto-complete="off"></el-input>
              </span>
</template>

        </el-table-column>

      </el-table>
      <div slot="footer" class="dialog-footer style-button">
        <el-button @click="styleTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStyleInfo">确 定</el-button>
      </div>
    </el-dialog>
   <!-- 增加样式 修改样式 复制样式-->
   <el-dialog v-dialogDrag :title="titletext" style="width:65%;min-width:760px;left:15%;" :close-on-click-modal='false' :visible.sync="AddstyleTableVisible">
      <el-form :model="styleForm">
        <el-form-item label="样式名：" style="margin-left: 52px;" label-width="80px;">
          <el-input style="max-width:300px;min-width:150px;" v-model="modelFileName" auto-complete="off">
          </el-input>
           <el-input v-if=" titletext !== '复制样式'" style="max-width:50px;min-width:50px;" :disabled="true" v-model="LastmodelFileName" auto-complete="off">
          </el-input>
        </el-form-item>
        <el-form-item v-if=" titletext == '复制样式'" label="改款流程：" style="margin: 13px 0 14px 52px;">

       
      <el-radio-group  class="Changeradio" v-model="styleForm.chenckType" @change="typeChange">
    <el-radio class="el-radio--small is-bordered" border label="tg">团订</el-radio>
    <el-radio class="el-radio--small is-bordered" border label="cg">成衣</el-radio>
 
  </el-radio-group>
     </el-form-item>
      </el-form>

      <el-table :data="styleDate" border style="width: 85%;margin: 0 auto;">
        <el-table-column prop="ParaName" label="参数名">
        </el-table-column>
        <el-table-column prop="DefaultVal" label="参数值">
<template scope="scope">
  <el-select v-if="scope.row.IsDrive == '0'" v-model="scope.row.DefaultVal" @change="styleValChange($event,scope)" placeholder="请选择">
    <el-option v-for="item in scope.row.StyleParaVals" :key="item" :label="item" :value="item">
    </el-option>
  </el-select>
  <span v-else>
                {{scope.row.DefaultVal}}
                <!-- <el-input v-model="scope.row.DefaultVal" auto-complete="off"></el-input> -->
              </span>
</template>

        </el-table-column>

      </el-table>
      <div slot="footer" class="dialog-footer style-button">
        <el-button @click="AddstyleTableVisible = false">取 消</el-button>
           <el-button v-if="titletext == '复制样式'" type="primary" @click="sureCopyModel">确定复制</el-button>
        <el-button v-else type="primary" @click="sureAddModel">确 定</el-button>
     
      </div>
    </el-dialog>

    <!-- 样式定义 -->
    <el-dialog v-dialogDrag title="样式列表" :visible.sync="dialogTableVisible">


    </el-dialog>
  </div>

</template>
<script>
  import {
    pageStyle,
    addStyle,
    addStylepara,
    delStylepara,
    addStylepart,
    getStyle,
    getpartList,
    delPart,
    editStylePara,
    addDriveVal,
    deleteDriverVal,
    updateStylePart,
    
  } from "api/admin/model";
  import {
    page,
    addModel,
    updateModel,
    deleteModel,
    getStyleDrivesp,
    addPartRelation,
    getPossible,
    getStyleJson,
    addStyleModel,
    editorStylepara,
    getStyleParalist,
    getStyleParaName,
    getStyleDivevals,
    updateStylemodel,
    getParavals,
    getCheckModel,
    Stylepage,
    copynewModel,
    downloadPart,
    uploadPart,
    isexsistFile
  } from "api/admin/model";
  import {
    UpdateStyleInfo
  } from "api/admin/findpartner/index";
  import {
    getCategory
  } from "api/admin/user/index";
  import {
  getPltype
} from "api/admin/FileLog/needdown";
  //此处是测试demoapi
  import {
    CreatFtpInfo,
    LockModel,
    getsinglejson,
    getEditFabric,
    postEditFabric
  } from "api/admin/demo";
  //此处是测试demoapi
  import {
    getToken
  } from "utils/auth";
  import {
    mapMutations
  } from "vuex";
  import {
    constants
  } from "zlib";
  import {
    POINT_CONVERSION_COMPRESSED,
    POINT_CONVERSION_UNCOMPRESSED
  } from "constants";
  import {
    setTimeout
  } from "timers";
  export default {
    data() {
      return {
        tableData1: [], //部件列表
        styleDate: [], //样式
        tableData: [], //款式参数列表
        possibleList: [], //组合结果显示列表
        /**部件上传 */
        uploadPartFile:[],
        partLoading:false,
        /**下载loading */
        downloading:false,
        list: [],
        preTabsTabs: "first",
        options: [{
            value: 0,
            label: "否"
          },
          {
            value: 1,
            label: "是"
          }
        ],
        defaultValOptions: [],
        DefaultVal: "",
        textMap: {
          update: "编辑",
          create: "新增"
        },
        SaveModeloptions: [{
            value: 0,
            label: "普通"
          },
          {
            value: 1,
            label: "加法"
          }
        ],
        paraTypeOptions: [{
            value: 3,
            label: "量体"
          },
          {
            value: 4,
            label: "物料"
          },
          {
            value: 1,
            label: "数值型工艺参数"
          },
          {
            value: 2,
            label: "文字型工艺参数"
          }
        ],
        paraNameOptions: [],
        downloadQuery: {},
        listQuery: {
          paraType: 3
        },
        styleQuery: {
          styleId: 0,
          styleParaId: 0
        },
        addrules: {
          paraType: [{
            required: true,
            type: "number",
            message: "请选择参数类型",
            trigger: "blur"
          }],
          addName: [{
            required: true,
            message: "参数名不能为空",
            trigger: "blur"
          }],
          defaultVal: [{
            required: true,
            message: "值不能为空",
            trigger: "blur"
          }]
        },
        categoriesOption: "",
        sexOptions: ["男", "女"],
        addFormVisible: false,
        dialogStatus: "",
        buttonDisbale: false,
        dialogFormVisible: false,
        deleteFormVisible: false,
        dialogUpdatePart: false,
        dialogPart: false,
        formLabelWidth: "120px",
        addform: {
          paraType: "3",
          paraName: "",
          addName: "",
          isPart: false,
          defaultVal: "",
          oldVal: ""
        },
        addPartform: {
          PartName: "",
          StyleParaId: [],
          StyleId: ""
        },
        driveForm: {
          paraVal: ""
        },
        delDriveForm: {
          paraVal: "",
          StyleParaVals: []
        },
        partName: [],
        partId: [],
        pareVal: "",
        dialogAddPart: false,
        updateForm: {
          defaultVal: "",
          paraName: "",
          Id: ""
        },
        form1: {
          Brand: undefined,
          StyleId: undefined,
          model: ""
        },
        isloading: false,
        styleTableVisible: false,
        styleForm: {
          styleName: "",
          chenckType: ''
        },
        dialogTableVisible: false,
        styleQurey: {
          isText: "-1",
          min: "",
          max: "",
          currModelId: 0,
          styleId: "",
          ParaType: "-1"
        },
        selecetParaTypeOptions: [],
        selecetStyleQureyMin: [],
        madelData: [],
        paraNames: [],
        editShow: true,
        isSure: -1,
        tabactive: "third",
        stylepartName: "",
        styleParaIdQuery: "",
        //这里是demo数据变量
        tableDataBD: [],
        tableFabric: [],
        json: "",
        tableArrName: "",
        routerForm: "",
        demoFormVisible: false,
        isedit: -1,
        header: {
        Authorization : "Bearer " + getToken()
        },
        loading: false,
        modelFileName: '',
        LastmodelFileName: '',
        AddstyleTableVisible: false,
        StylelistQuery: {
          limit: 10,
          page: 1,
          modelname: "",
          brand: "",
          type: "",
          sTime: "",
          eTime: "",
          featrueKey: "",
          styleId: ''
        },
        styleUpload: {},
        ModelList: [],
        upModelData: {},
        titletext: '',
        copyShow: '',
        copyData: {},
        pingleiId:''
      };
    },
    filters: {
      filterItem(val){
        // !!val&&return val.ParaVal
        if(val!==undefined){
        // console.log(val)
          return val.ParaVal
        }else{
          return ''
        }
        // return val
      },
      saveModel: function(val) {
        return val == 0 ? "普通" : val == 1 ? "加法" : "";
      },
      StyleIquiryStatus: function(val) {
        return val == "0" ?
          "废弃" :
          val == "1" ?
          "修改中" :
          val == "2" ?
          "正常" :
          "未知";
      },
      SwitchMode: function(val) {
        return val == 0 ?
          "普通" :
          val == 1 ?
          "加法" :
          val == -1 ?
          "减法" :
          "未知";
      },
      isModel: function(val) {
        return val == 0 ? "否" : val == 1 ? "是" : "未知";
      },
      StyleParaValsFilter(row) {
        var str = "";
        if (row == null) {
          return "无";
        } else {
          if (row.length > 10) {
            return row.length + "个";
          }
          if (0 < row.length < 10) {
            str = row.join("，");
            return str;
          }
        }
      },
      StyleParaValsFilter1(row) {
        var str = "";
        if (row == null) {
          return "无";
        } else {
          if (0 < row.length) {
            str = row.join("，");
            return str;
          }
        }
      }
    },
    created() {
      //详细列表显示
      // alert(window.location);
      //  localStorage.setItem('BDdata',JSON.stringify(row));
      // var locaItem = JSON.parse(localStorage.getItem('BDdatadetail'))
      var locaItem = JSON.parse(this.$route.query.item);
      // this.routerForm = JSON.parse(this.$route.query.item);
      // this.downloadQuery = JSON.parse(this.$route.query.item);
      this.routerForm = locaItem;
      this.downloadQuery = locaItem;
      //  console.log(locaItem)
      // var styleId = JSON.parse(this.$route.query.item).StyleId;
      var styleId = locaItem.StyleId;
      this.styleQuery.styleId = styleId;
      this.styleQurey.styleId = styleId;
      this.StylelistQuery.styleId = styleId;
      this.styleUpload.styleName = locaItem.StyleName;
      // console.log(styleId);
      this.getList(this.styleQuery);
      this.getTypePl();
      this.getModelParaList(this.styleQurey)
      // this.getFabricList(styleId);
    },
    methods: {
       //获取流水线性质
    getTypePl() {
      getPltype().then(res => {
    
        this.pingleiId=res.data.rows[0].id;
    
        // console.log(res)
      });
    },

      //这里是测试cad程序方法
      //获取物料
      getFabricList(styleId) {
        let form = {};
        form.styleId = styleId;
        getEditFabric(form).then(res => {
          // console.log(res);
          // this.tabactive = 'third';
          if (res.Success) {
            if (res.Data == "") {
              this.getJson();
            } else {}
          }
        });
      },
      getJson() {
        var form = {};
        form.orderName = this.routerForm.ModelName;
        form.id = this.routerForm.ModelId;
        form.type = "BD";
        getsinglejson(form).then(res => {
          // console.log(res);
          var data = res.Data;
          this.json = res.Data;
          this.tableDataBD = data.size;
          var obj = {};
          //  this.tableDataBD[0].size_name = data.size_name;
          this.tableArrName = data.size_name.name;
          var arr = [];
          data.version.forEach(element => {
            let obj = {};
            obj.color = element.name;
            element.fabric.forEach(ele => {
              ele.color = obj.color;
              arr.push(ele);
            });
          });
          this.tableFabric = arr;
          //  console.log(this.tableFabric);
        });
      },
      //编辑修改demo版单信息
      editDemoModel(row, index) {
        this.isedit = index;
      },
      getJson() {
        var form = {};
        form.orderName = this.routerForm.ModelName;
        form.id = this.routerForm.ModelId;
        getsinglejson(form).then(res => {
          // console.log(res);
          if (res.Success) {
            if (res.Data !== "") {
              var data = res.Data;
              this.json = res.Data;
              this.tableDataBD = data.size;
              var obj = {};
              // this.tableDataBD[0].size_name = data.size_name;
              this.tableArrName = data.size_name.name;
              var arr = [];
              data.version.forEach(element => {
                let obj = {};
                obj.color = element.name;
                element.fabric.forEach(ele => {
                  ele.color = obj.color;
                  arr.push(ele);
                });
              });
              this.tableFabric = arr;
            }
          }
          //  console.log(this.tableFabric);
        });
      },
      // 上传函数
      AddUpload() {
        this.titletext = "增加样式"
        // this.styleTableVisible = true;
        // this.$refs.upload.submit();
      },
      typeChange(e) {
        this.styleForm.chenckType = e;
        this.copyData.pcType = e;
      },
      //复制样式
      sureCopyModel() {
        var form = {};
        form.styleId = JSON.parse(this.$route.query.item).StyleId.toString();
        form.modelFileName = this.modelFileName;
        form.modelWay = 'copy';
        if (this.modelFileName.replace(/\s+/g, "") == "" || this.styleForm.chenckType == '') {
          this.$message({
            message: '名称类型不能为空',
            type: "warning"
          });
          return false
        }
        getCheckModel(form).then(res => {
          // console.log(res);
          if (res.Success) {
            this.saveStyleInfo();
          } else {
            this.$message({
              message: res.ErrMes,
              type: "warning"
            });
          }
        })
      },
      CopynewModel(val) {
        let form = {};
        form.styleName = JSON.parse(this.$route.query.item).StyleName;
        form.newModelName = this.modelFileName;
        form.oldModelName = this.copyData.oldModelName
        form.pcType = this.copyData.pcType;
        form.newModelId = val;
        // console.log(form)
        copynewModel(form).then(res => {
          if (res.Success) {
            this.$nextTick(() => {
              this.AddstyleTableVisible = false;
            })
            this.$message({
              showClose: true,
              message: "成功！",
              type: "success",
              duration: 2000
            });
          } else {
            this.$message({
              showClose: true,
              message: res.ErrMes,
              type: "success",
              duration: 2000
            });
               this.$nextTick(() => {
              this.AddstyleTableVisible = false;
            }) 
          }
        })
      },
      //新增样式
      sureAddModel() {
        var form = {};
        form.styleId = JSON.parse(this.$route.query.item).StyleId.toString();
        form.modelFileName = this.modelFileName;
        form.modelWay = 'add';
        this.styleUpload.styleId = JSON.parse(this.$route.query.item).StyleId.toString();
        this.styleUpload.styleName = JSON.parse(this.$route.query.item).StyleName;
        this.styleUpload.modelWay = 'add';
        this.styleUpload.modelName = this.modelFileName;
        // console.log(this.upModelData);
        if (this.titletext == '增加样式') {
          getCheckModel(form).then(res => {
            // console.log(res);
            if (res.Success) {
              this.$refs.upload1.submit();
            } else {
              this.$message({
                message: res.ErrMes,
                type: "warning"
              });
            }
          })
        } else {
          this.$refs.upload.submit();
        }
      },
      // 移除文件函数
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      beforeAvatarUpload(file) {
        // console.log(file)
        // var ext = file.name.substring(0, file.name.lastIndexOf("."));
        this.loading = true
        let fileName = file.name.lastIndexOf("."); //取到文件名开始到最后一个点的长度
        let fileNameLength = file.name.length; //取到文件名长度
        let fileFormat = file.name.substring(fileName + 1, fileNameLength); //截
        // console.log(fileFormat);
        const isJPG = fileFormat;
        // const isLt2M = file.size / 1024 / 1024 < 2;
        const isType = this.downloadQuery.type;
        // if (!isJPG) {
        //   this.$message.error("上传文件只能是 ZIP 格式!");
        // }
        // // if (!isType) {
        // //   this.$message({
        // //     message: "请选择品类！",
        // //     type: "warning"
        // //   });
        // // }
        // return isJPG;
      },
      //选择文件就上传
      handleChangeFile(file, fileList) {
        // console.log(file)
        // console.log('上传带的')
        this.header.Authorization = "Bearer " + getToken();
        let fileName = file.name.lastIndexOf("."); //取到文件名开始到最后一个点的长度
        let fileNameLength = file.name.length; //取到文件名长度
        let fileFormat = file.name.substring(fileName + 1, fileNameLength); //截
        // console.log(fileFormat);
        const isJPG = fileFormat;
        this.LastmodelFileName = file.name.substring(fileName, fileNameLength);
        this.modelFileName = file.name.substring(0, fileName);
        //  console.log(file.name.substring(0,fileName));
        // const isLt2M = file.size / 1024 / 1024 < 2;
        const isType = this.downloadQuery.type;
        if (isJPG != 'prj') {
          this.$message.error("上传文件只能是 prj 格式!");
        }
        this.AddstyleTableVisible = true;
        // if (!isType) {
        //   this.$message({
        //     message: "请选择品类！",
        //     type: "warning"
        //   });
        // }
        // return isJPG;
      },
      // 点击预览
      handlePreview(file) {
        // console.log(file);
      },
      // 上传成功函数
      successUpload(response, file) {
        var that = this;
        if (response.Success) {
          // this.handleFilter();
          that.AddstyleTableVisible = false;
          that.$message({
            message: '上传成功',
            type: "success",
            duration: 2000
          });
          if (this.titletext == '增加样式') {
            that.saveStyleInfo();
          }
          that.getList(that.styleQuery);
          that.$nextTick(() => {
            that.AddstyleTableVisible = false;
          })
        } else {
          that.$message({
            message: response.ErrMes,
            type: "error",
            duration: 2000
          });
          that.$nextTick(() => {
            that.AddstyleTableVisible = false;
          })
        }
        that.loading = false
        // console.log(response)
        // console.log(file)
      },
      errorUpload(err, file, fileList) {
        this.$message({
          message: "上传失败",
          type: "error"
        });
        this.$nextTick(() => {
          this.AddstyleTableVisible = false;
        })
        this.loading = false;
        // console.log(err)
      },
      copyModel(row, index) {
        this.titletext = "复制样式"
        this.copyData.pcType = '';
        this.styleForm.chenckType = '';
        this.modelFileName = '';
        this.AddstyleTableVisible = true;
        this.copyData.oldModelName = row.ModelName;
      },
      upModel(row, index) {
        this.upModelData.modelId = row.ModelId;
        this.upModelData.oldModelName = row.ModelName;
        this.upModelData.modelWay = 'update';
        this.upModelData.styleName = JSON.parse(this.$route.query.item).StyleName;
        this.titletext = "编辑样式"
      },
      //编辑修改demo版单信息
      editDemoModel(row, index) {
        this.isedit = index;
      },
      SureEditDemoModel(row, index) {
        postEditFabric().then(res => {});
      },
      canceleditDemoModel(row, index) {
        this.isedit = -1;
      },
      //刷新版单信息 调用setData
      updateModel() {
        localStorage.setItem("type", "BD");
        // console.log(this.bowserExplorer)
        if (this.bowserExplorer == "ie") {
          var state = window.external.setData("order", JSON.stringify(this.json));
          if (state == "OK") {
            localStorage.setItem("BDdata", this.$route.query.item);
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
          var state = window.buyiSetData("order", JSON.stringify(this.json));
          if (state == "OK") {
            localStorage.setItem("BDdata", this.$route.query.item);
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
      creatModel() {
        let form = {};
        form.mode = "create";
        form.projectName = this.json.name;
        form.projectID = this.json.id;
        //   form.projectName = this.json.name || this.json.code ||this.json.order.orderName;
        // form.projectID = this.json.id || this.json.order.orderID;
        form.fileID = 0;
        form.filePath = "";
        form.fileName = "";
        form.token = getToken();
        localStorage.setItem("type", "BD");
        CreatFtpInfo(form).then(res => {
          // alert(JSON.stringify(res))
          if (res.Success) {
            var state = "";
            if (this.bowserExplorer == "ie") {
              state = window.external.openFile(
                "model",
                JSON.stringify(this.json),
                JSON.stringify(res.Data)
              );
              if (state == "OK") {
                localStorage.setItem("BDdata", this.$route.query.item);
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
                "model",
                JSON.stringify(this.json),
                JSON.stringify(res.Data)
              );
              if (state == "OK") {
                localStorage.setItem("BDdata", this.$route.query.item);
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
          }
        });
      },
      //锁定生产单 buyiLockOrder
      LockOrderInfo(projectID) {
        var data = {};
        data.ModelId = projectID;
        LockModel(data).then(res => {
          // alert(JSON.stringify(res));
        });
      },
      //这里是测试cad程序方法
      //部件信息
      getpartInfo() {
        var styleId = JSON.parse(this.$route.query.item).StyleId;
        var form = {};
        form.styleId = styleId;
        this.tableData1 = [];
        getpartList(form).then(res => {
          if (res.Data != "") {
            res.Data.Rows.forEach(element => {
              var obj = {};
              obj.PartName = element.PartName;
              obj.Id = element.Id;
              obj.StyleId = element.StyleId;
              obj.IsHave = element.IsHave;
              var arr1 = [];
              var arr2 = [];
              this.list.forEach(element => {
                obj.styleParaId = element.Id;
                arr2.push(element.Id);
                arr1.push(element.IsDrive);
              });
              obj.IsDrive = arr1;
              obj.styleparaIds = arr2;
              this.tableData1.push(obj);
              // console.log(obj)
            });
            //  console.log(this.tableData1);
          }
        });
      },
      //获取可驱动参数
      getDriver() {
        var styleId = JSON.parse(this.$route.query.item).StyleId;
        var form = {};
        form.styleId = styleId;
        this.list = [];
        getStyleDrivesp(form).then(res => {
          // console.log(res);
          if (res.Data != "") {
            this.list = res.Data.Rows;
            var arrname = [];
            res.Data.Rows.forEach(element => {
              arrname.push(element.ParaName);
            });
            //  console.log(arrname);
            this.partName = arrname;
          }
          this.getpartInfo();
        });
      },
      //获取款式参数列表
      getList(obj) {
        this.tableData = [];
        pageStyle(obj).then(res => {
          // console.log(res);
          if (res.Data == '') {
            this.tableData = [];
          } else {
            this.tableData = res.Data.Rows;
            if (this.tableData && this.tableData.length != 0) {
             res.Data.Rows.map((el, index) => {
                el.selectArr = JSON.parse(JSON.stringify(el.StyleParaVals));
                el.StyleParaVals =el.DefaultVal 
              });
            }
            // this.pareVal = this.tableData[0].StyleParaVals[0];
            console.log(this.tableData)
            this.styleDate = res.Data.Rows;
            var arr = [];
            this.partId = arr;
            this.getDriver();
          }
        });
      },
      getModelList() {
        let form = this.StylelistQuery;
        Stylepage(form).then(res => {
          if (res.status == 200) {
            this.ModelList = res.data.rows;
          }
        })
      },
      //获取样式列表
      getModelParaList() {
        getStyleParalist(this.styleQurey).then(res => {
          // console.log(res)
          this.madelData = [];
          this.paraNames = [];
          if (res.Success) {
            
            if (res.Data == "") {
              this.getModelList();
            } else {
                this.madelData = res.Data.Rows;
            this.seltTableData = res.Data.Rows[0].ModelParaItems;
            this.paraNames = res.Data.Rows[0].ModelParaItems;
              //  this.madelData=res.Data.Rows;
            // this.madelData = res.Data.Rows;
            // this.seltTableData = res.Data.Rows[0].ModelParaItems;
            // this.paraNames = res.Data.Rows[0].ModelParaItems;
              // res.Data.Rows.map((el, index) => {
              //   if (el.ModelName == JSON.parse(this.$route.query.item).ModelName) {
              //     // this.madelData.push(el);
              //     this.paraNames = el.ModelParaItems;
              //   }
              // })
              //  console.log(this.madelData)
            }
          }
          //  console.log(this.modelParaList);
        });
      },
      //搜索选择样式参数
      getSearchPara(e) {
        if (e) {
          var styleId = JSON.parse(this.$route.query.item).StyleId;
          var form = {};
          form.styleId = styleId;
          getStyleParaName(form).then(res => {
            var arr = [];
            res.Data.Rows.forEach(element => {
              let obj = {};
              if (element.ParaType == "1") {
                obj.value = 1;
              } else {
                obj.value = 2;
              }
              // obj.value = element.ParaVal;
              obj.label = element.ParaVal;
              obj.StyleParaId = element.StyleParaId;
              arr.push(obj);
            });
            // console.log(arr);
            this.selecetParaTypeOptions = arr;
          });
        }
      },
      //搜索选择文字型参数
      selectStyleParaIds(e) {
        // console.log(e);
      },
      // 编辑样式参数
      editModelPara(row, index) {
        //  console.log(row);
        this.isSure = index;
        this.editShow = false;
        var form = {};
        form.modelId = row.ModelId;
        getStyleDivevals(form).then(res => {
          var Divevals = res.Data.Rows;
          getStyleParalist(this.styleQurey).then(res => {
            this.madelData = res.Data.Rows;
            this.paraNames = res.Data.Rows[0].ModelParaItems;
            this.madelData[index].ModelParaItems.forEach((element, index) => {
              Divevals.forEach(el => {
                var obj = {};
                if (element.StyleParaId == el.StyleParaId) {
                  // obj.StyleParaIds = el.ParaVal;
                  element.StyleParaIds = el.ParaVal;
                }
              });
            });
            // console.log(this.madelData)
          });
        });
      },
      //取消修改样式
      canceleditModelPara() {
        this.isSure = -1;
        this.editShow = true;
      },
      //确认修改样式参数值
      SureEditModelPara(row, index) {
        //  console.log(row);
        var form = {};
        form.ModelId = row.ModelId;
        form.ItemModels = [];
        row.ModelParaItems.forEach(element => {
          let obj = {};
          if (element.StyleParaIds !== undefined) {
            obj.StyleParaId = element.StyleParaId;
            obj.ParaVal = element.ParaVal;
            form.ItemModels.push(obj);
          }
        });
        //  console.log(form);
        updateStylemodel(form).then(res => {
          //  console.log(res)
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "成功！",
              type: "success",
              duration: 2000
            });
            this.isSure = -1;
            this.editShow = true;
            this.getModelParaList();
          } else {
            this.isSure = -1;
            this.editShow = true;
            this.$message({
              showClose: true,
              message: res.ErrMes,
              type: "error",
              duration: 2000
            });
            this.getModelParaList();
          }
        });
      },
      //查询条件选择
      selectParaType(e, val) {
        // console.log(e);
        this.selecetParaTypeOptions.forEach(element => {
          if (element.label == e) {
            this.styleQurey.ParaType = e;
            this.styleQurey.min = "";
            this.styleQurey.max = "";
            this.styleQurey.isText = element.value;
            this.styleParaIdQuery = element.StyleParaId;
          }
        });
        if (this.styleQurey.isText == "2") {
          this.getParas(this.styleParaIdQuery);
        }
        if (e == "1") {
          this.styleQurey.end = "";
        }
        if (e == "-1") {
          this.styleQurey.ParaType = e;
          this.styleQurey.min = "";
          this.styleQurey.max = "";
          this.styleQurey.isText = "-1";
        }
      },
      //文字型参数选择
      selecetQurey(e) {
        //  console.log(e);
      },
      //获取文字型参数下拉可选项
      getParas(id) {
        let form = {};
        form.styleParaId = id;
        getParavals(form).then(res => {
          // console.log(res);
          if (res.Success) {
            this.selecetStyleQureyMin = res.Vals;
          }
        });
      },
      //查询搜索样式
      handleSearch() {
        //  console.log(this.styleQurey)
        //  console.log( JSON.parse(this.$route.query.item));
        this.getModelParaList();
      },
      //显示样式列表model
      handleaddModel() {
        this.dialogTableVisible = true;
        //  JSON.parse(this.$route.query.item).StyleId;
        this.styleQurey.styleId = JSON.parse(this.$route.query.item).StyleId;
        //  console.log( JSON.parse(this.$route.query.item));
        this.styleQurey.min = "";
        this.styleQurey.max = "";
        this.styleQurey.isText = "-1";
        this.selecetParaTypeOptions = [];
        this.getModelParaList();
      },
      //品类选择
      selectCategort() {
        let form ={};
        form.PLID = this.pingleiId;
        getCategory(form).then(res => {
          if (res.status == 200) {
            this.categoriesOption = res.data.rows;
          }
        });
      },
      //是否驱动
      changeIsDriver(e, row, index) {
        var form = {};
        form.styleId = row.StyleId;
        form.paraType = row.ParaType;
        form.paraName = row.ParaName;
        form.defaultVal = row.DefaultVal;
        form.oldVal = row.IsDrive;
        form.isDrive = e;
        // console.log(form)
        editorStylepara(form).then(res => {
          // console.log(res);
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "成功！",
              type: "success",
              duration: 2000
            });
            this.getList(this.styleQuery);
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
      styleValChange(e, row) {
        //  console.log(this.styleDate)
      },
      //默认值选择
      defaultvalChange(e, row) {
        // console.log(e);
        // console.log(row);
        
        if (e == "新增") {
          this.dialogFormVisible = true;
          this.driveForm.paraVal = "";
          this.driveForm.index = row.$index;
          this.driveForm.styleParaId = row.row.Id;
          this.driveForm.StyleId = row.row.StyleId;
          this.getList(this.styleQuery);
          setTimeout(() => {
            this.driveForm.StyleParaVals = this.tableData[
              this.driveForm.index
            ].StyleParaVals;
          }, 200);
          // console.log(this.driveForm)
        }
        if (e == "删除") {
          this.delDriveForm.index = row.$index;
          this.delDriveForm.styleParaId = row.row.Id;
          this.delDriveForm.StyleId = row.row.StyleId;
          this.deleteFormVisible = true;
          this.getList(this.styleQuery);
          // console.log(this.tableData);
          setTimeout(() => {
            this.delDriveForm.StyleParaVals = this.tableData[
              this.delDriveForm.index
            ].selectArr;
          }, 200);
         
          this.delDriveForm.paraVal = "";
        } else {}
      },
      //删除默认值选择
      delValChange(e) {
     
        this.driveForm.paraVal = e;
        
      },
      //删除默认值
      deleteValue() {
        let form = {};
        form.paraVal = this.delDriveForm.paraVal;
        form.styleParaId = this.delDriveForm.styleParaId;
        form.StyleId = this.delDriveForm.StyleId;
        deleteDriverVal(form).then(res => {
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "删除成功！",
              type: "success",
              duration: 2000
            });
            this.deleteFormVisible = false;
            this.getList(this.styleQuery);
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
      //删除默认值
      deleValChange(e, row) {
        let form = {};
        form.paraVal = e.value;
        form.styleParaId = row.Id;
        form.StyleId = row.StyleId;
        deleteDriverVal(form).then(res => {
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "删除成功！",
              type: "success",
              duration: 2000
            });
            this.getList(this.styleQuery);
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
      //增加默认值
      submitDrivevalue() {
        if (this.driveForm.paraVal.replace(/\s+/g, "") == "") {
          this.$message({
            showClose: true,
            message: "请输入",
            type: "warning",
            duration: 2000
          });
          return false;
        }
        addDriveVal(this.driveForm).then(res => {
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "成功！",
              type: "success",
              duration: 2000
            });
            this.dialogFormVisible = false;
            this.getList(this.styleQuery);
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
      //样式编辑
      editModelStyle() {
        this.styleTableVisible = true;
      },
      saveStyleInfo() {
        var form = {};
        this.styleForm.styleName = this.modelFileName;
        if (this.styleForm.styleName.replace(/\s+/g, "") == "") {
          this.$message({
            showClose: true,
            message: "请输入名称",
            type: "warning",
            duration: 2000
          });
          return false;
        } else if (this.styleDate != undefined) {
          form.ModelName = this.styleForm.styleName;
          form.StyleId = JSON.parse(this.$route.query.item).StyleId;
          let arr = [];
          this.styleDate.forEach(element => {
            let obj = {};
            obj.StyleParaId = element.Id;
            obj.ParaVal = element.DefaultVal;
            arr.push(obj);
          });
          form.ParaVals = arr;
          //  console.log(form);
          // this.$confirm("确认保存样式信息, 是否继续?", "提示", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // })
          //   .then(() => {
          addStyleModel(form).then(res => {
            // console.log(res);
            if (res.Success) {
              // this.$message({
              //   showClose: true,
              //   message: "成功！",
              //   type: "success",
              //   duration: 2000
              // });
              if (this.titletext == "复制样式") {
                this.copyData.newModelId = res.ModelId;
                this.CopynewModel(res.ModelId);
              }
              this.styleTableVisible = false;
              this.getModelParaList();
            } else {
              this.$message({
                showClose: true,
                message: res.ErrMes,
                type: "success",
                duration: 2000
              });
              this.styleTableVisible = false;
            }
          });
          // })
          // .catch(() => {
          //   this.styleTableVisible = false;
          // });
        } else {
          this.$message({
            showClose: true,
            message: "请先设置款式参数和部件！",
            type: "warning",
            duration: 2000
          });
        }
      },
      //取消增加默认值
      cancelDrivevalue() {
        this.dialogFormVisible = false;
        this.getList(this.styleQuery);
      },
      //部件关系选择
      relationChange(e, row, index) {
        var form = {};
        form.partId = row.Id;
        form.styleParaId = row.styleparaIds[index];
        form.isHave = e;
        addPartRelation(form).then(res => {
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "成功！",
              type: "success",
              duration: 2000
            });
            this.getDriver();
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
      //参数类型选择
      paraTypeChange(e) {
        // console.log(e);
        this.listQuery.paraType = e;
        this.getParaList();
      },
      // 选项卡
      changeModel(e) {
        //点击标题时不会重复请求
        if (e.name !== this.preTabsTabs) {
          this.preTabsTabs = e.name;
          if (e.name == "first") {
            setTimeout(() => {
              this.getList(this.styleQuery);
            }, 200);
          } else if (e.name == "second") {
            this.getpartInfo();
          } else if (e.name == "third") {
            this.styleQurey.styleId = JSON.parse(this.$route.query.item).StyleId;
            this.styleQurey.min = "";
            this.styleQurey.max = "";
            this.styleQurey.isText = "-1";
            this.selecetParaTypeOptions = [];
            this.getModelParaList();
          } else {
            this.getJson();
          }
        } else {
          this.preTabsTabs = e.name;
        }
      },
      //常用参数选择
      paraNameChange(e) {
        this.addform.addName = e;
        this.addform.defaultVal = "";
        this.paraNameOptions.forEach(element => {
          if (e == element.label) {
            this.addform.defaultVal = element.defaultVal;
          }
        });
      },
      //获取常用参数
      getParaList() {
        page(this.listQuery).then(res => {
          // console.log(res);
          var arr = [];
          this.paraNameOptions = [];
          this.addform.paraName = "";
          res.Data.Rows.forEach((element, index) => {
            var obj = {};
            obj.label = element.ParaName;
            obj.value = element.Id;
            obj.defaultVal = element.DefaultVal;
            arr.push(obj);
          });
          //  console.log(arr);
          this.paraNameOptions = arr;
        });
      },
      //增加款式参数
      addModel() {
        this.addFormVisible = true;
        this.dialogStatus = "create";
        this.addform.paraName = "";
        this.addform.defaultVal = "";
        this.addform.paraType = this.listQuery.paraType;
        this.getParaList();
        // console.log( this.addform.paraType);
      },
      //增加部件
      addPart() {
        this.dialogAddPart = true;
        this.addPartform.PartName = "";
      },
      //更改部件名称
      UpdatePartSubmit() {
        if (this.addPartform.PartName.replace(/\s+/g, "") == "") {
          this.$message({
            showClose: true,
            message: "请输入部件名称",
            type: "warning",
            duration: 2000
          });
          return false;
        } else {
          var partForm = {};
          partForm.partName = this.addPartform.PartName;
          partForm.Id = this.addPartform.Id;
          //  console.log(partForm);
          updateStylePart(partForm).then(res => {
            //  console.log(res);
            if (res.Success) {
              this.dialogUpdatePart = false;
              this.$message({
                showClose: true,
                message: "成功！",
                type: "success",
                duration: 2000
              });
              this.getList(this.styleQuery);
            } else {
              this.$message({
                showClose: true,
                message: res.ErrMes,
                type: "error",
                duration: 2000
              });
            }
          });
        }
      },
      //确认增加部件
      addPartSubmit() {
        if (this.addPartform.PartName.replace(/\s+/g, "") == "") {
          this.$message({
            showClose: true,
            message: "请输入部件名称",
            type: "warning",
            duration: 2000
          });
          return false;
        } else {
          var partForm = {};
          partForm.PartName = this.addPartform.PartName;
          partForm.styleId = JSON.parse(this.$route.query.item).StyleId;
          //  console.log(partForm);
          addStylepart(partForm).then(res => {
            //  console.log(res);
            if (res.Success) {
              this.dialogAddPart = false;
              this.$message({
                showClose: true,
                message: "成功！",
                type: "success",
                duration: 2000
              });
              this.getList(this.styleQuery);
            } else {
              this.$message({
                showClose: true,
                message: res.ErrMes,
                type: "error",
                duration: 2000
              });
            }
          });
        }
      },
      isPartChange(e) {
        // console.log(e);
        // console.log(this.addform.isPart);
      },
      //款式参数编辑
      editModel(row) {
        // console.log(row);
        this.addFormVisible = true;
        this.dialogStatus = "update";
        this.addform.isPart = row.IsDrive.toString();
        this.addform.addName = row.ParaName;
        this.addform.defaultVal = row.DefaultVal;
        this.addform.oldVal = row.DefaultVal;
        this.addform.ParaType = row.ParaType;
        // console.log(this.addform)
        this.updateForm = {
          ...row
        };
      },
      //款式参数删除
      delteModel(row) {
        var form = {};
        form.Id = row.Id;
        delStylepara(form).then(res => {
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "删除成功！",
              type: "success",
              duration: 2000
            });
            this.getList(this.styleQuery);
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
      //部件删除
      deltePart(row) {
        // console.log(row);
        var form = {};
        form.Id = row.Id;
        delPart(form).then(res => {
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "删除成功！",
              type: "success",
              duration: 2000
            });
            this.getList(this.styleQuery);
            // this.getPartList()
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
      //修改部件名称
      handleUpate(row) {
        //  console.log(row);
        this.dialogUpdatePart = true;
        this.addPartform = {
          ...row
        };
      },
      /**下载部件 */
      handleDownloadPart(){
        // console.log()
        
        let obj = {styleName:this.downloadQuery.StyleName}
        this.downloading = true
        isexsistFile(obj).then(res=>{
          // console.log(res)
          if(res){
            window.open('/bmapi/styleimport/downloadPart?styleName='+this.downloadQuery.StyleName+"&token="+getToken());//创建 url地址
          }else{
            this.$message.warning('文件不存在')
          }
          this.downloading = false
        })
      },
      /**上传部件前 */
      beforePartUpload(file){
        // const isJPG = file.type === 'image/jpeg'
        if(file.name.substr(file.name.indexOf('.')+1).toLowerCase()!=='zip'){
          this.$message.warning('请上传zip文件')
          return false;
        }else{
          this.partLoading = true
          return true
        }
      },
      handlePartSuccess(res){
       if(res.Success){
      this.$message.success(res.ErrMes);
      this.partLoading = false;
         }else{
      this.$message.warning(res.ErrMes);
      this.partLoading = false;
         }
      },
      handlePartError(res){
      this.$message.warning(res);
      this.partLoading = false;
      },
      //获取结果集合
      getAllPossible(row) {
        this.dialogPart = true;
        // console.log(row);
        this.stylepartName = row.PartName;
        var form = {};
        var arr = [];
        row.IsHave.forEach((element, index) => {
          if (element == 1) {
            arr.push(row.styleparaIds[index]);
          }
        });
        form.styleparaIds = arr;
        getPossible(form.styleparaIds).then(res => {
          if (res.Success) {
            if (res.Data.Total != 0) {
              this.possibleList = res.Data.Rows;
              this.stylepartName = row.PartName + res.Data.Total + "种";
            }
          }
        });
      },
      //添加款式参数
      addSubmit() {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            var form = {};
            form.styleId = JSON.parse(this.$route.query.item).StyleId;
            form.paraType = this.addform.paraType;
            form.paraName = this.addform.addName;
            form.defaultVal = this.addform.defaultVal;
            form.isDrive = this.addform.isPart;
            form.oldVal = "";
            // console.log(form)
            editorStylepara(form).then(res => {
              // console.log(res);
              if (res.Success) {
                this.addFormVisible = false;
                this.$message({
                  showClose: true,
                  message: "成功！",
                  type: "success",
                  duration: 2000
                });
                this.getList(this.styleQuery);
              } else {
                this.$message({
                  showClose: true,
                  message: res.ErrMes,
                  type: "error",
                  duration: 2000
                });
              }
            });
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      //编辑更新款式参数
      updateSubmit() {
        // console.log(this.addform);
        var form = {};
        form.styleId = JSON.parse(this.$route.query.item).StyleId;
        form.paraType = this.addform.ParaType;
        form.paraName = this.addform.addName;
        form.defaultVal = this.addform.defaultVal;
        form.isDrive = this.addform.isPart;
        form.oldVal = this.addform.oldVal;
        //  console.log(form)
        editorStylepara(form).then(res => {
          // console.log(res);
          if (res.Success) {
            this.addFormVisible = false;
            this.$message({
              showClose: true,
              message: "成功！",
              type: "success",
              duration: 2000
            });
            this.getList(this.styleQuery);
          } else {
            this.$message({
              showClose: true,
              message: res.ErrMes,
              type: "error",
              duration: 2000
            });
            this.addFormVisible = false;
          }
        });
      },
      //下载款式json
      submitInfo() {
        this.isloading = true;
        var form = {};
        form.modelId = JSON.parse(this.$route.query.item).ModelId;
        //  form.modelName  = JSON.parse(this.$route.query.item).ModelName;
        //  console.log(form);
        getStyleJson(form).then(res => {
          // console.log(res);
          if (res.Success == false) {
            this.isloading = false;
            this.$message({
              showClose: true,
              message: res.ErrMes,
              type: "error",
              duration: 2000
            });
          } else if (res) {
            window.location.href =
              "/bmapi/createstyle/createstylejson?modelId=" + form.modelId;
            this.isloading = false;
          }
        });
      },
      //保存款式
      handleSave() {
        // console.log(this.downloadQuery)
        this.form1 = {
          ...this.downloadQuery
        };
        UpdateStyleInfo(this.form1).then(res => {
          //  console.log(res);
          if (res.status == 200) {
            this.$message({
              showClose: true,
              message: res.tip,
              type: "success",
              duration: 2000
            });
          }else{
              this.$message({
              showClose: true,
              message: res.tip,
              type: "warning",
              duration: 2000
            });
          }
        });
      },
      //跳转
      handleTo(row) {
        // console.log(row);
        // console.log(JSON.parse(this.$route.query.item))
        let obj = {};
        obj.id = row.ModelName;
          obj.styleId = this.styleQuery.styleId;
           obj.modelId= row.ModelId,
            obj.StyleName =JSON.parse(this.$route.query.item).StyleName;
            // obj.ModelName = JSON.parse(this.$route.query.item).StyleName;
            // console.log(obj)
        this.$router.push({
          path: "/baseManager/SampleDetails",
          query: {
            item:JSON.stringify(obj)
         
          }
        });
      },
         // 路由跳转函数
    routerLink(name, obj) {
      // console.log(obj);
       let objform = {};
       objform.id = obj.ModelName;
       objform.styleId = obj.StyleId;
       objform.modelId= obj.ModelId,
       objform.StyleName = obj.StyleName;
       this.$router.push({
        // path: 'yourPath',
        name: name,
        query: {
          item:JSON.stringify(objform),
          // id: obj.ModelName,
          // styleId: obj.StyleId,
          // modelId: obj.ModelId,
          // StyleName: obj.StyleName
        }
      });
      localStorage.setItem("id", obj.ModelName);
    },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .lists {
    text-align: center;
    border: 0;
    -webkit-box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
    box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.12), 0 0 0px 0 rgba(0, 0, 0, 0.04);
    list-style: none; // display: flex;
    // flex-wrap: wrap;
    li {
      margin-right: 10px;
      font-size: 16px;
    }
  }
  .text {
    font-size: 14px;
  }
  .item {
    padding: 8px 0;
  }
  .box-card {
    width: 480px;
  }
  .style-button {
    text-align: center;
  }
  p {
    text-align: center;
    font-size: 19px;
    font-weight: 600;
  }
  .add-button {
    margin-bottom: 15px;
  }
  .dialogPartList /deep/ .el-dialog {
    min-width: 500px;
    max-width: 1400px;
    max-height: 700px;
    overflow-y: auto;
    width: 30%;
  }
  .part-dialogDrag{
     min-width: 30% !important;
      width: 30%;
  }
  .Changeradio {
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    font-size: 0;
    // margin-bottom: 15px;
    // margin-left: 120px;
  }
  .Changeradio  /deep/ .el-radio__inner{
    border: 1px solid #bfcbd9;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    cursor: pointer;
    box-sizing: border-box
     }
  .Changeradio /deep/ .el-radio--small.is-bordered {
    padding: 8px 15px 0 10px;
    border-radius: 3px;
    height: 34px;
    // border: 1px solid #409eff;
    margin-right: 14px;
  }
  .Changeradio /deep/ .el-radio.is-bordered.is-checked {
    border-color: #409eff;
  }
</style>
