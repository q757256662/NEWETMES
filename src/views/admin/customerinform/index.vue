<template>
  <!-- SampleDetails -->
  <div>
    <div class="app-container calendar-list-container">
      品牌：
      <el-input :readonly="true" style="width: 150px;" class="filter-item" v-model="list.Brand">
      </el-input>
    
      品类：
      <el-input :readonly="true" style="width: 150px;" class="filter-item" v-model="list.Type">
      </el-input>
        样式名：
      <el-input :readonly="true" style="width: 150px;" class="filter-item" v-model="routerinfo.ModelName">
      </el-input>
       <el-upload style="display:inline-block" class="upload-demo" ref="upload" action="/bmapi/styleimport/newUpModel" :headers="header" :on-preview="handlePreview" :show-file-list="false" :data="upModelData" :on-remove="handleRemove" :on-success="successUpload"
    :on-error='errorUpload' :before-upload="beforeAvatarUpload" :on-change='handleChangeFile' :multiple="false" :auto-upload="false" accept=".prj">
    <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
    <el-button style="margin-left: 10px;"  @click="upModel()" type="primary">
      上传</el-button>
    <!-- <el-button style="margin-left: 10px;" type="primary" @click="AddUpload" :loading="loading">增加样式</el-button> -->
  </el-upload>
  <el-button  @click="copyModel" type="primary">
    复制</el-button>
      <div class="message-box" v-if="this.$route.query.id !== ''">
        <!-- <div class="table-message">
            <b>服装分类名：<span>{{list[0].Type}}</span></b>
            <b>客户/品牌：<span>{{list[0].Brand}}</span></b>
            <b>创建时间：<span>{{list[0].Time|changeTime}}</span></b>
          </div> -->
      </div>
    </div>
    <!-- </el-row> -->
    <el-tabs type="border-card" v-model="activeName">
      <!-- //样式相关关闭 -->
      <el-tab-pane label="样式" v-if="false" v-loading.body="listLoading" name="first">
        <el-table style="margin-top:18px;" :data="madelData" border>
          <el-table-column property="ModelName" label="样式名" align="center">
            <template scope="scope">
     {{scope.row.ModelName}}
</template>
      </el-table-column>
      <el-table-column :key="index" align="center" :label="item.ParaName" v-for="(item,index) in paraNames">
<template scope="scope">
  <a style="text-decoration: underline;color: rgb(32, 160, 255)" @click="editModelPara(scope.row,index)" v-if="editShow">{{scope.row.ModelParaItems[index].ParaVal}}</a>

  
</template>
      </el-table-column>
                <el-table-column label="操作" align="center">
<template scope="scope">
  <el-upload style="display:inline-block" class="upload-demo" ref="upload" action="/bmapi/styleimport/newUpModel" :headers="header" :on-preview="handlePreview" :show-file-list="false" :data="upModelData" :on-remove="handleRemove" :on-success="successUpload"
    :on-error='errorUpload' :before-upload="beforeAvatarUpload" :on-change='handleChangeFile' :multiple="false" :auto-upload="false" accept=".prj">
    <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button> -->
    <el-button style="margin-left: 10px;" size="mini" @click="upModel(scope.row,scope.$index)" type="primary">
      上传</el-button>
    <!-- <el-button style="margin-left: 10px;" type="primary" @click="AddUpload" :loading="loading">增加样式</el-button> -->
  </el-upload>
  <el-button size="mini" @click="copyModel(scope.row,scope.$index)" type="primary">
    复制</el-button>
  <!-- <el-button v-if="isSure !==scope.$index " size="mini" @click="editModelPara(scope.row,scope.$index)"
                      type="primary">
                      编辑</el-button> -->
  <!-- <el-button v-if="isSure ==scope.$index " size="mini" @click="SureEditModelPara(scope.row,scope.$index)"
                      type="primary">
                      确定</el-button>
                    <el-button v-if="isSure ==scope.$index " size="mini" @click="canceleditModelPara(scope.row,scope.$index)"
                      type="primary">
                      取消</el-button>  -->
  <!-- <el-button size="mini" @click="delteModel(scope.row)" type="danger">
          删除</el-button> -->
</template>
</el-table-column>

   
      
    </el-table>
     
  </el-tab-pane>
    <el-tab-pane label="工序列表" name="second">

   <el-table :key='tableKey' :data="list1" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
          <el-table-column prop="Code" align="center" label="工序名" :formatter="changeProcessName"> </el-table-column>
          <el-table-column prop="loginid" align="center" label="工号"> </el-table-column>
          <el-table-column prop="UserName" align="center" label="执行人"> </el-table-column>
          <el-table-column prop="CreateTime" align="center" label="时间" :formatter="ChangeDateFormat"> </el-table-column>
          <el-table-column prop="State" align="center" label="状态">
<template scope="scope">
   {{scope.row.State|changeStatus}}
</template>
      </el-table-column>
      <!-- <el-table-column align="center" label="编辑">
<template scope="scope">
  <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">
    更改状态
  </el-button>
</template>
      </el-table-column> -->
    </el-table>

         
 </el-tab-pane>
  <el-tab-pane label="参数" name="thrid">

        <el-table style="margin-top:18px;" :data="madelData" border>
          <el-table-column property="ModelName" label="样式名" align="center">
            <template scope="scope">
     {{scope.row.ModelName}}
</template>
      </el-table-column>
      <el-table-column :key="index" align="center" :label="item.ParaName" v-for="(item,index) in paraNames">
<template scope="scope">
  <a style="text-decoration: underline;color: rgb(32, 160, 255)" @click="editModelPara(scope.row,index)" v-if="editShow">{{scope.row.ModelParaItems[index].ParaVal}}</a>

  
</template>
      </el-table-column>
                <el-table-column v-if="false" label="操作" align="center">
<template scope="scope">
  <!-- <el-upload style="display:inline-block" class="upload-demo" ref="upload" action="/bmapi/styleimport/newUpModel" :headers="header" :on-preview="handlePreview" :show-file-list="false" :data="upModelData" :on-remove="handleRemove" :on-success="successUpload"
    :on-error='errorUpload' :before-upload="beforeAvatarUpload" :on-change='handleChangeFile' :multiple="false" :auto-upload="false" accept=".prj">
  
    <el-button style="margin-left: 10px;" size="mini" @click="upModel(scope.row,scope.$index)" type="primary">
      上传</el-button>

  </el-upload>
  <el-button size="mini" @click="copyModel(scope.row,scope.$index)" type="primary">
    复制</el-button> -->
  <!-- <el-button v-if="isSure !==scope.$index " size="mini" @click="editModelPara(scope.row,scope.$index)"
                      type="primary">
                      编辑</el-button>
  <el-button v-if="isSure ==scope.$index " size="mini" @click="SureEditModelPara(scope.row,scope.$index)"
                      type="primary">
                      确定</el-button>
                    <el-button v-if="isSure ==scope.$index " size="mini" @click="canceleditModelPara(scope.row,scope.$index)"
                      type="primary">
                      取消</el-button>  -->
  <!-- <el-button size="mini" @click="delteModel(scope.row)" type="danger">
          删除</el-button> -->
</template>
</el-table-column>

   
      
    </el-table>

     <!-- <table border="1">
        <tr><td v-for="name of json.fieldNames" :key="name">{{name}}</td></tr>
<template v-for="(tr,index) of json.items">
  <tr v-for="(item,i) of tr.items" :key="index">
    <td v-if="i===0" :rowspan="tr.items.length">{{tr.name}}</td>
    <td v-for="td of item" :key="index+'_'+i">{{td}}</td>
  </tr>
</template>
    </table> -->
    <!-- <table border class="self-table">
<template v-for="(item,index) in seltTableData">
  <tr :key="index">
    <td>{{item.ParaName}}</td>
    <td>{{item.ParaVal}}</td>
  </tr>
</template>
    </table> -->
  </el-tab-pane>
  <el-tab-pane label="效果图"  style="min-height:300px;" name="fourth">
   <div class="img-content">
        <!-- <input type="file" src="www.baidu.com"> -->
        <el-upload class="upload-demo" ref="upload1" action="/bmapi/uploadimg" :on-preview="handlePreview" :data="updata"
          :on-remove="handleRemoveimg" :on-success="successUploadimg" :before-upload="beforeAvatarUploadimg"
          :on-change="changeUploadimg" :file-list="fileList" :multiple="false" :accept="'image/*'" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadimg" :disabled="fileListimg.length==0">上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传图片文件，且不超过2MB</div>
        </el-upload>
         <img v-if="list.Image == '' || list.Image == null"  :src="list.defaultImage"  @click="handldefaultImg(list)" title="点击图片放大" style="height:450px">
        <img v-else :src="'/'+list.Image+'?key='+Math.random()" alt="暂无图片" @click="handlImg(list)" title="点击图片放大" style="height:450px">
        
 <!-- <div class="table-img" @click="handlImg(item,index)" :key="index" v-for="(item,index) in list">
        <img :src="'/'+item.Image+'?key='+Math.random()" alt="暂无图片" title="点击图片放大" style="height:300px"  >
      </div> -->
       </div>
  </el-tab-pane>
  <el-tab-pane label="样式信息" name="fifth">
    <div v-if="activeName=='fifth'" >
      <p class="model-info">
        <b>物料：</b><span>{{prjinfo.fabric&&prjinfo.fabric.join(' 、 ')}}</span>
      </p>
      <p class="model-info">
        <b>尺码：</b><span>{{prjinfo.size&&prjinfo.size.join(' 、 ')}}</span>
      </p>
      <p class="model-info">
        <b>量体部位：</b><span>{{prjinfo.part&&prjinfo.part.join(' 、 ')}}</span>
      </p>
    </div>
  </el-tab-pane>
</el-tabs>
<!-- 编辑款式参数 -->
    <el-dialog v-dialogDrag title="编辑" size="tiny" :visible.sync="dialogEdit">
      <el-form :model="editform">
        <el-form-item :label="editform.name"  :label-width="formLabelWidth">
            <el-select 
            v-model="selectValue" @change="selectArrvalue(index,item)" placeholder="请选择">
            <el-option v-for="item1 in editform.selectArr" :key="item1" :label="item1"
              :value="item1"></el-option>
          </el-select>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEdit = false">取 消</el-button>
        <el-button type="primary" @click="SureEditModelPara">确 定</el-button>
      </div>
    </el-dialog>
  <!-- 增加样式 修改样式 复制样式-->
   <el-dialog v-dialogDrag :title="titletext" size="tiny" style="min-width:760px;max-width:99%" :close-on-click-modal='false' :visible.sync="AddstyleTableVisible">
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
      <el-table :data="styleDate" border class="addTable" >
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

    <el-dialog v-dialogDrag :title="dialogtitleProcess" :visible.sync="dialogFormVisible" width="100%">
      <el-table :key='tableKey' :data="list1" v-loading.body="listLoading" border fit highlight-current-row
        style="width: 100%">
        <el-table-column prop="ProcessName" align="center" label="工序名"> </el-table-column>
        <el-table-column prop="UserName" align="center" label="执行人"> </el-table-column>
        <el-table-column prop="CreateTime" align="center" label="时间"> </el-table-column>
      </el-table>
    </el-dialog>
    <!-- <p style=" text-align: center;">款式编辑列表</p>  -->
    <!-- <p style=" text-align: center;font-weight: bold;">样式编辑</p>  -->
 
    <el-tabs @tab-click="tabChange" style="margin-top:8px;" type="border-card" v-if="false">
      <el-button @click="saveData" style="margin-bottom:15px;margin-left: 16px;" size="small" type="primary">保存
      </el-button>
      <el-tab-pane label="部件选择">
        <!-- <el-table  :key='tableKey' :data="partList"   border fit highlight-current-row style="width: 100%" >
       <el-table-column :key="index" v-for="(item,index) in partList.rows" align="center" :label="item">
<template scope="scope">
   {{scope.row}}
</template>
   
       
      </el-table-column>    

  </el-table> -->
        <div v-if="xmlList.param.part !== ''">
          <hot-table :root="root" width="500" height="300" class="hot-table-part" ref="testHot1"
            :settings="hotSettings"></hot-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="量体尺寸">
        <!-- <el-table  :key='tableKey' :data="measurebodyList" border fit highlight-current-row style="width: 100%"> -->
        <!-- <el-table-column :key="index" v-for="(item,index) in this.partList.data.param.measure.string" align="center" :label="item"> -->
        <!--<template scope="scope">
   -->
  <!-- {{scope.row.modelList.model[0].measureList.measure.string[index]}} -->
  <!--
</template>-->
        <!-- </el-table-column> -->

        <!-- </el-table> -->
        <hot-table :root="root1" class="hot-table-measure" ref="testHot2" :settings="hotSettings2"></hot-table>
      </el-tab-pane>
      <el-tab-pane label="样式参数">
        <div v-if="xmlList.param.value !== ''">

          <hot-table :root="root" width="500" height="300" class="hot-table-value" ref="testHot1"
            :settings="hotSettings4"></hot-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="物料">
        <hot-table class="hot-table-material " height="300" :root="root1" ref="testHot3" :settings="hotSettings3">
        </hot-table>
      </el-tab-pane>
    </el-tabs>
  <el-dialog v-dialogDrag :title="dialogImage" :visible.sync="dialogImageVisible" width="100%">
      <img :src="'/'+showImage" width="100%" height="500px" />
    </el-dialog>

  <el-dialog v-dialogDrag :title="dialogImage" :visible.sync="dialogdefaultImageVisible" width="100%" top="10px">
      <img src="static/img/default.png" width="100%" style="margin:0 auto;display:block"/>
    </el-dialog>
  </div>
</template>

<script>
  import {
    page,
    addObj,
    getObj,
    delObj,
    putObj,
    pageStep,
    getStyleDetail,
    getXmlInfo,
    editXmlInfo,
    getmodelprjinfo
  } from "api/admin/styleDetail";
  import {
    pageStyle,
    updateStylemodel,
    getStyleDivevals,
    getStyleParalist,
    getpartList,
    getStyleDrivesp,
    getCheckModel,
    addStyleModel,
    copynewModel
  } from "api/admin/model";
  import {
    getToken
  } from "utils/auth";
  import {
    mapGetters
  } from "vuex";
  import {
    HotTable
  } from "@handsontable/vue";
  export default {
    name: "user",
    components: {
      HotTable
    },
    watch:{
      activeName(val){
        if(val=="fifth"){
          // this.handleGetPrjInfo({modelId:routeForm.modelId,modelName:routeForm.id})
          this.handleGetPrjInfo({modelId:this.routeForm.modelId,modelName:this.routeForm.id})
        }
      }
    },
    data() {
      return {
        // data: [
        //   ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
        //   ['2019', 10, 11, 12, 13],
        //   ['2020', 20, 11, 14, 13],
        //   ['2021', 30, 15, 12, 13]
        // ],
        activeName:"second",
        /**样式信息 */
        prjinfo:{
          fabric:[],

        },
        root: "test-hot",
        root1: "test-hot1",
        SaveList: "",
        hotSettings: {
          data: [
            //数据，可以是数据，对象
          ],
          colHeaders: [], //自定义列表头or 布尔值
          rowHeaders: true,
          className: "htCenter htMiddle",
          rowHeights: "50",
          afterChange: function(changes, source) {
            //数据改变时触发此方法
            var that = this;
            that.SaveList = that.getData();
            // console.log(that.SaveList)
            // return that.getData()
          },
          readOnly: true, // 设置只读属性
          cellProperties: {
            readOnly: true
          },
          licenseKey: "non-commercial-and-evaluation"
        },
        hotSettings2: {
          data: [],
          colHeaders: true, //自定义列表头or 布尔值
          rowHeaders: true,
          className: "htCenter htMiddle",
          licenseKey: "non-commercial-and-evaluation",
          // startRows: 6, //初始行列数
          // startCols: 6,
          // minRows: 1, //最小行列
          // minCols: 1,
          // maxCols:5,//最大列数
          // maxRows:6 // 最大行数
          hiddenColumns: {
            columns: [5],
            indicators: true
          },
          colWidths: ["100", "100", "100", "100", "100"],
          rowHeights: "50",
          autoColumnSize: true,
          autoWrapRow: true,
          autoWrapCol: true,
          //  stretchH: 'all',
          // readOnly:true,
          afterChange: function(changes, source) {
            //数据改变时触发此方法
            var that = this;
            that.SaveList = that.getData();
            //  console.log(that.getData())
          }
        },
        hotSettings3: {
          data: [
            //数据，可以是数据，对象
          ],
          colHeaders: [], //自定义列表头or 布尔值
          rowHeaders: [],
          className: "htCenter htMiddle",
          colWidths: "100",
          rowHeights: "50",
          autoColumnSize: true,
          autoWrapRow: true,
          autoWrapCol: true,
          readOnly: true,
          licenseKey: "non-commercial-and-evaluation"
        },
        hotSettings4: {
          data: [
            //数据，可以是数据，对象
          ],
          colHeaders: [], //自定义列表头or 布尔值
          rowHeaders: [],
          className: "htCenter htMiddle",
          colWidths: "100",
          rowHeights: "50",
          autoColumnSize: true,
          autoWrapRow: true,
          autoWrapCol: true,
          readOnly: true,
          licenseKey: "non-commercial-and-evaluation"
        },
        defaultImg: "",
        form: {
          UserName: undefined,
          Phone: undefined,
          State: 1,
          Up: undefined,
          Down: 0,
          MAC: undefined,
          Remark: undefined
        },
        value8: "",
        value7: "",
        value9: "",
        showImage: '',
        pickerOptions2: {
          shortcuts: [{
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        rules: {
          name: [{
              required: true,
              message: "请输入用户",
              trigger: "blur"
            },
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符",
              trigger: "blur"
            }
          ],
          UserName: [{
              required: true,
              message: "请输入账户",
              trigger: "blur"
            },
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符",
              trigger: "blur"
            }
          ],
          password: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            },
            {
              min: 5,
              max: 20,
              message: "长度在 5 到 20 个字符",
              trigger: "blur"
            }
          ]
        },
        list: {
          Brand:'',

        },
        list1: null,
        total: null,
        listLoading: true,
        listQuery: {
          ModelName: 1
        },
        dialogtitleProcess: "",
        dialogImage: "",
        addPartner: {},
        sexOptions: ["男", "女"],
        dialogFormVisible: false,
        dialogImageVisible: false,
        dialogdefaultImageVisible:false,
        bigImg: "",
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
        tableKey: 0,
        fileList: [],
        fileListimg: [],
        updata: {
          ModelName: '',
          ModelId: ""
        },
        routerinfo: {},
        xmlForm: {
          StyleId: "",
          ModelId: ""
        },
        styleQurey1: {
          isText: "-1",
          min: "",
          max: "",
          currModelId: 0,
          styleId: "",
          ParaType: "-1"
        },
        paraNames: [],
        editShow: true,
        isSure: -1,
        xmlList: "",
        madelData: [],
        seltTableData: [],
        partList: [], //部件信息
        measueList: [], //量体信息
        part: [],
        tableData: [],
        styleQuery: {
          styleId: 0,
          styleParaId: 0
        },
        dialogEdit: false,
        editform: {
          arrvalue: []
        },
        selectValue: '',
        header: {},
        styleForm: {
          styleName: "",
          chenckType: ''
        },
        downloadQuery: {},
        styleDate: [], //样式
        tableData1: [], //部件列表
        listData: [],
        modelFileName: '',
        LastmodelFileName: '',
        AddstyleTableVisible: false,
        styleUpload: {},
        ModelList: [],
        upModelData: {},
        titletext: '',
        copyShow: '',
        copyData: {},
        loading: false,
        routeForm:{} 
      };
    },
    created() {
      // this.getList();
      var routeForm = JSON.parse(this.$route.query.item)
      this.routeForm = routeForm
      // this.handleGetPrjInfo({modelId:routeForm.modelId,modelName:routeForm.id})
      var id = routeForm.styleId;
      this.xmlForm.StyleId = routeForm.styleId;
      this.xmlForm.ModelId = routeForm.modelId;
      this.listQuery.ModelName = routeForm.id;
      this.updata.ModelName = routeForm.id;
      this.routerinfo.ModelName =  routeForm.id || localStorage.getItem("id");
      this.styleQurey1.currModelId = routeForm.modelId;
      this.styleQuery.styleId = routeForm.styleId;
      if (this.routerinfo.ModelName == null || this.routerinfo.ModelName == "") {
        this.routerinfo.ModelName = "";
        this.listLoading = false;
      } else {
        this.styleQurey1.styleId = id;
        this.getList();
        this.getModelParaList();
        this.getListStyle(this.styleQuery)
        // this.GetXmlInfo();
      }
    },
    mounted() {},
    computed: {
      ...mapGetters(["elements"])
    },
    filters: {
      tempPath(imgurl) {
        // console.log(imgurl)
        return imgurl.replace(/\\/g, "/").replace(/\s+/g, "");
      },
      changeStatus: function(val) {
        return val == "0" ? "完成" : "未完成";
      },
      changeTime(time) {
        var num = /[0-9]+/.exec(time);
        var num1 = parseInt(num[0], 10);
        var date = new Date(parseInt(num1, 10));
        var month =
          date.getMonth() + 1 < 10 ?
          "0" + (date.getMonth() + 1) :
          date.getMonth() + 1;
        var currentDate =
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return month + "-" + currentDate + " " + hour + ":" + minutes;
      }
    },
    methods: {
      getList() {
        // console.log( this.routerinfo)
        page(this.routerinfo).then(response => {
          // console.log(response)
          if (response.status == 200) {
            //成功加载
             this.list = response.data.rows[0];
            if(response.data.rows[0].Image == '' || response.data.rows[0].Image == null || response.data.rows[0].Image == undefined){
              
              //  this.list.Image = 'static/img/default.png';
              this.list.defaultImage = 'static/img/default.png';
            }
           
            this.total = response.data.total;
            // this.listLoading = false;
            this.updata.ModelId = JSON.parse(this.$route.query.item).modelId;
            this.handleEdit1(1, this.updata.ModelId);
            //成功提示
            //  this.$message({
            //   message: response.error,
            //   type: "warning",
            //   duration: 2000
            // });
          } else if (response.status === 201) {
            //成功加载
            // this.$message({
            //   message: "暂无数据",
            //   type: "warning",
            //   duration: 2000
            // });
            this.listLoading = false;
          } else {
            //失败提示
            // this.$message({
            //   message: response.error,
            //   type: "warning",
            //   duration: 2000
            // });
          }
        });
      },
      //获取款式参数列表
      getListStyle(obj) {
        this.tableData = [];
        pageStyle(obj).then(res => {
          // console.log(res);
          if (res.Data == '') {
            this.listLoading = false;
            this.tableData = [];
          } else {
             this.listLoading = false;
            this.tableData = res.Data.Rows;
            if (this.tableData && this.tableData.length != 0) {
              res.Data.Rows.map((el, index) => {
                el.selectArr = JSON.parse(JSON.stringify(el.StyleParaVals));
                el.StyleParaVals = el.DefaultVal
              });
            }
            
            // this.pareVal = this.tableData[0].StyleParaVals[0];
            // console.log(this.tableData)
            this.styleDate = res.Data.Rows;
            var arr = [];
            this.partId = arr;
            this.getDriver();
          }
        });
      },
      //获取可驱动参数
      getDriver() {
        var styleId = JSON.parse(this.$route.query.item).styleId;
        var form = {};
        form.styleId = styleId;
        this.listData = [];
        getStyleDrivesp(form).then(res => {
          // console.log(res);
          if (res.Data != "") {
            this.listData = res.Data.Rows;
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
      /**获取prj信息 */
      handleGetPrjInfo({modelId,modelName}){
        if(modelId!==""&&modelName!=""){
          getmodelprjinfo({modelId,modelName}).then(res=>{
            if(res.Success){
              this.prjinfo = {...res.Data.Rows}
            }
          })
        }
      },
      //部件信息
      getpartInfo() {
        var styleId = JSON.parse(this.$route.query.item).styleId;
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
              this.listData.forEach(element => {
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
      getstyleDetail() {
        getStyleDetail(this.listQuery.modelname).then(response => {
          // console.log(this.listQuery)
          if (response.status === 200) {
            //成功加载
            this.list = response.data.rows;
            this.total = response.data.total;
            // this.listLoading = false;
            //成功提示
            //  this.$message({
            //   message: response.error,
            //   type: "warning",
            //   duration: 2000
            // });
          } else if (response.status === 201) {
            //成功加载
            // this.$message({
            //   message: "暂无数据",
            //   type: "warning",
            //   duration: 2000
            // });
            this.listLoading = false;
          } else {
            //失败提示
            // this.$message({
            //   message: response.error,
            //   type: "warning",
            //   duration: 2000
            // });
          }
        });
      },
      //获取列表
      getModelParaList() {
        getStyleParalist(this.styleQurey1).then(res => {
          if (res.Success) {
            this.listLoading = false;
            this.madelData = res.Data.Rows;
            this.seltTableData = res.Data.Rows[0].ModelParaItems;
            this.paraNames = res.Data.Rows[0].ModelParaItems;
          }
        });
      },
      //搜索选择文字型参数
      selectStyleParaIds(e) {
        // console.log(e);
      },
      selectArrvalue(e, index, val) {
        //       console.log(e);
        //  console.log(index);
      },
      // 编辑样式参数
      editModelPara(row, index) {
        //  console.log(row);
        // console.log(index);
        // console.log(arguments)
        this.editform = { ...row
        }; //编辑模态框数据
        this.editform.selectArr = [];
        this.editform.index = index;
        this.editform.name = row.ModelParaItems[index].ParaName;
        this.editform.paraNames = row.ModelParaItems[index];
        this.selectValue = row.ModelParaItems[index].ParaVal;
        // this.isSure = index;
        // this.editShow = false;
        var form = {};
        form.modelId = row.ModelId;
        getStyleDivevals(form).then(res => {
          var Divevals = res.Data.Rows;
          res.Data.Rows.map((el, key) => {
            if (el.StyleParaId == row.ModelParaItems[index].StyleParaId) {
              // console.log(key);
              this.editform.selectArr = res.Data.Rows[key].ParaVal;
            }
          })
          // console.log(this.editform)
          this.dialogEdit = true;
          getStyleParalist(this.styleQurey1).then(res => {
            // console.log(res)
            this.madelData = res.Data.Rows;
            this.paraNames = res.Data.Rows[0].ModelParaItems;
            this.madelData[index].ModelParaItems.forEach((element, index) => {
              Divevals.forEach(el => {
                var obj = {};
                if (element.StyleParaId == el.StyleParaId) {
                  // obj.StyleParaIds = el.ParaVal;
                  element.StyleParaIds = el.ParaVal;
                  //  console.log(element)
                  //
                  // console.log(element)
                }
              });
            });
            console.log(this.madelData)
          });
        });
      },
      typeChange(e) {
        this.styleForm.chenckType = e;
        this.copyData.pcType = e;
      },
      saveStyleInfo() {
        console.log(this.styleDate);
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
        } else if (this.styleDate.length != 0) {
          form.ModelName = this.styleForm.styleName;
          // form.StyleId = JSON.parse(this.$route.query.item).StyleId;
          form.StyleId = JSON.parse(this.$route.query.item).styleId;
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
      //复制样式
      sureCopyModel() {
        var form = {};
        form.styleId = JSON.parse(this.$route.query.item).styleId.toString();
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
            this.getList();
          } else {
            this.$message({
              showClose: true,
              message: res.ErrMes,
              type: "warning",
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
        form.styleId = JSON.parse(this.$route.query.item).styleId.toString();
        form.modelFileName = this.modelFileName;
        form.modelWay = 'add';
        this.styleUpload.styleId = JSON.parse(this.$route.query.item).styleId.toString();
        this.styleUpload.styleName = JSON.parse(this.$route.query.item).StyleName;
        this.styleUpload.modelWay = 'add';
        this.styleUpload.modelName = this.modelFileName;
        // console.log(this.styleUpload);
        // console.log(this.upModelData);
        if (this.titletext == '增加样式') {
          getCheckModel(form).then(res => {
            // console.log(res);
            if (res.Success) {
              this.$refs.upload.submit();
            } else {
              this.$message({
                message: res.ErrMes,
                type: "warning"
              });
            }
          })
        } else {
          this.$refs.upload.submit();
          this.getList();
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
      //复制样式
      copyModel() {
        this.titletext = "复制样式"
        this.copyData.pcType = '';
        this.styleForm.chenckType = 'tg';
        this.modelFileName = this.listQuery.ModelName;
        this.AddstyleTableVisible = true;
        // this.copyData.oldModelName = row.ModelName;
         this.copyData.oldModelName=JSON.parse(this.$route.query.item).id
        // console.log(row);
      },
      //上传样式 编辑样式
      upModel() {
        // this.upModelData.modelId = row.ModelId;
        // this.upModelData.oldModelName = row.ModelName;
        this.upModelData.modelId = JSON.parse(this.$route.query.item).modelId;
        this.upModelData.oldModelName = JSON.parse(this.$route.query.item).id;
        this.upModelData.modelWay = 'update';
        this.upModelData.styleName = JSON.parse(this.$route.query.item).StyleName;
        this.titletext = "编辑样式";
        // console.log(this.upModelData);

      },
      //取消修改样式
      canceleditModelPara() {
        this.isSure = -1;
        this.editShow = true;
      },
      //确认修改样式参数值
      SureEditModelPara(row, index) {
        //  console.log(row);
        // console.log(this.editform)
        var form = {};
        // form.ModelId = row.ModelId;
        form.ItemModels = [];
        form.ModelId = this.editform.ModelId;
        this.editform.ModelParaItems.map((el, index) => {
          let obj = {};
          if (index == this.editform.index) {
            obj.StyleParaId = this.editform.paraNames.StyleParaId;
            obj.ParaVal = this.selectValue;
            form.ItemModels.push(obj);
          } else {
            obj.StyleParaId = el.StyleParaId;
            obj.ParaVal = el.ParaVal;
            form.ItemModels.push(obj);
          }
        })
        // row.ModelParaItems.forEach(element => {
        //   let obj = {};
        //   if (element.StyleParaIds !== undefined) {
        //     obj.StyleParaId = element.StyleParaId;
        //     obj.ParaVal = element.ParaVal;
        //     form.ItemModels.push(obj);
        //   }
        // });
        //  console.log(form);
        updateStylemodel(form).then(res => {
          //  console.log(res)
          this.listLoading = true;
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "成功！",
              type: "success",
              duration: 2000
            });
            this.getModelParaList();
            this.listLoading = false;
            this.dialogEdit = false;
         
            // this.isSure = -1;
            // this.editShow = true;
          } else {
            this.$message({
              showClose: true,
              message: res.ErrMes,
              type: "errot",
              duration: 2000
            });
             this.listLoading = false;
            // this.dialogEdit = false;
            this.getModelParaList();
          }
        });
      },
      tabChange(e) {
        // console.log(this.$refs.testHot1.hotInstance)
        // console.log(e.label)
        if (e.label == "部件选择") {
          this.getPart();
        } else if (e.label == "量体尺寸") {
          this.getMeasuList();
        } else if (e.label == "样式参数") {
          //  this.getMeasuList()
        } else if (e.label == "物料") {
          this.getSharkList();
        }
        // this.GetXmlInfo();
        // console.log(this.xmlList)
        //  this.$refs.testHot.hotInstance.render(this.xmlList)
      },
      //获取xml处理
      GetXmlInfo() {
        // var jsonObj = this.$x2js.xml2js('<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><soap:Body><ns1:getSDLengthByJMLXResponse xmlns:ns1="http://server.Gw"><ns1:out>&lt;?xml version="1.0" encoding="UTF-8"?&gt;&lt;NODES&gt;&lt;NODE&gt;&lt;NAME&gt;方沟&lt;/NAME&gt;&lt;VALUE&gt;337.9432807&lt;/VALUE&gt;&lt;/NODE&gt;&lt;NODE&gt;&lt;NAME&gt;砖混&lt;/NAME&gt;&lt;VALUE&gt;66.8424335&lt;/VALUE&gt;&lt;/NODE&gt;&lt;NODE&gt;&lt;NAME&gt;盾构&lt;/NAME&gt;&lt;VALUE&gt;14.8955979&lt;/VALUE&gt;&lt;/NODE&gt;&lt;NODE&gt;&lt;NAME&gt;暗挖&lt;/NAME&gt;&lt;VALUE&gt;48.1186321&lt;/VALUE&gt;&lt;/NODE&gt;&lt;NODE&gt;&lt;NAME&gt;顶管&lt;/NAME&gt;&lt;VALUE&gt;2.9357091&lt;/VALUE&gt;&lt;/NODE&gt;&lt;NODE&gt;&lt;NAME&gt;总长度&lt;/NAME&gt;&lt;VALUE&gt;1272.8081174&lt;/VALUE&gt;&lt;/NODE&gt;&lt;NODE&gt;&lt;NAME&gt;检查井总数&lt;/NAME&gt;&lt;VALUE&gt;94885&lt;/VALUE&gt;&lt;/NODE&gt;&lt;/NODES&gt;</ns1:out></ns1:getSDLengthByJMLXResponse></soap:Body></soap:Envelope>')
        // var newjsonObj = this.$x2js.xml2js(jsonObj.Envelope.Body.getSDLengthByJMLXResponse.out.__text)
        getXmlInfo(this.xmlForm).then(res => {
          // this.date1 = [];
          // console.log(res)
          if (res.Success == true) {
            // console.log(res)
            this.xmlList = JSON.parse(
              JSON.stringify(this.$x2js.xml2js(res.Data))
            );
            // console.log(this.xmlList)
            this.xmlList = JSON.parse(JSON.stringify(this.xmlList.modelTable));
            this.getPart();
            // this.part = this.partList.modelList.model;
            // var arr = [];
            // var measureArr = []
            // console.log(this.xmlList)
            // this.xmlList.modelList.model.forEach((element,index) => {
            //   console.log(element)
            //     if(element.name == this.$route.query.id){
            //      console.log(index)
            //         element.part.string.forEach(e=>{
            //           arr.push(e)
            //         })
            //     }
            // });
            // var arrname = [];
            // if (this.xmlList.param.part !== '') {
            //   this.xmlList.param.part.string.forEach(element => {
            //     arrname.push(element)
            //   });
            // }
            // console.log(arrname)
            // console.log(arr)
            // // arr.forEach((element, index) => {
            // //   this.partList.push(element)
            // // });
            // this.partList = arr;
            // this.$set(this.partList, 'rows', arrname)
            // this.hotSettings.colHeaders = this.partList.rows; // 部件信息列表数据
            // this.hotSettings.data = this.partList; // 部件信息列表数据
            // console.log(this.partList)
            //   this.hotSettings2.rowHeaders = this.xmlList.param.measure.string; //量体信息列表数据
            //   this.hotSettings2.colHeaders = ["默认值", "圆整方式", "圆整精度", "安全范围", "排序级别", "grop默认值" ]; //量体信息列表数据
            //   // this.hotSettings2.data = this.measueList; // 部件信息列表数据
            //   this.hotSettings2.data = this.xmlList.modelList.model[0].measureList.measure;
            //   // console.log(this.measueList)
            //   // 物料信息列表数据
            //  this.hotSettings3.rowHeaders = this.xmlList.param.fabric.string;
            //  this.hotSettings3.colHeaders = ["名称","xShark","yShark"];
            //  this.hotSettings3.data = this.xmlList.modelList.model[0].fabricList.fabric;
            // this.saveData();
          }
        });
      },
      getPart() {
        this.partList = [];
        var arr = [];
        var arrname = [];
        if (
          this.xmlList.param.part != "" ||
          this.xmlList.param.part != undefined
        ) {
          this.xmlList.modelList.model.forEach((element, index) => {
            // console.log(element)
            if (element.name == this.$route.query.id) {
              // console.log(index)
              element.part.string.forEach(e => {
                arr.push(e);
              });
            }
          });
          this.xmlList.param.part.string.forEach(element => {
            arrname.push(element);
          });
          this.$set(this.partList, "rows", arrname);
          // this.partList.push(arrname);
          this.partList.push(arr);
          this.hotSettings.colHeaders = this.partList.rows; // 部件信息列表数据
          this.hotSettings.data = this.partList; // 部件信息列表数据
          //  console.log(this.partList)
          setTimeout(() => {
            this.$refs.testHot1.hotInstance.loadData(this.hotSettings.data);
          }, 200);
        } else {
          return false;
        }
        // console.log(arrname)
        // console.log(arr)
      },
      getMeasuList() {
        var measureArr = [];
        // this.hotSettings2.data = this.measueList; // 部件信息列表数据
        // this.hotSettings2.data = this.xmlList.modelList.model[0].measureList.measure;
        // console.log(this.xmlList.modelList)
        if (
          this.xmlList.modelList.model != "" ||
          this.xmlList.modelList.model != undefined
        ) {
          this.xmlList.modelList.model.forEach((element, index) => {
            if (element.name == this.$route.query.id) {
              // console.log(index)
              this.hotSettings2.data = this.xmlList.modelList.model[
                index
              ].measureList.measure;
            }
          });
          // console.log(this.hotSettings2)
          // console.log(this.xmlList.modelList)
          this.hotSettings2.rowHeaders = this.xmlList.param.measure.string; //量体信息列表数据
          this.hotSettings2.colHeaders = [
            "默认值",
            "圆整方式",
            "圆整精度",
            "安全范围",
            "排序级别",
            "grop默认值"
          ]; //量体信息列表数据
          this.$refs.testHot2.hotInstance.loadData(this.hotSettings2.data);
        }
      },
      getSharkList() {
        // 物料信息列表数据
        if (
          this.xmlList.param.fabric != "" ||
          this.xmlList.param.fabric != undefined
        ) {
          this.hotSettings3.rowHeaders = this.xmlList.param.fabric.string;
          this.hotSettings3.colHeaders = ["名称", "经纱缩水", "纬纱缩水"];
          this.xmlList.modelList.model.forEach((element, index) => {
            if (element.name == this.$route.query.id) {
              // console.log(index)
              this.hotSettings3.data = this.xmlList.modelList.model[
                index
              ].fabricList.fabric;
            }
          });
          // console.log(this.hotSettings3)
          this.$refs.testHot3.hotInstance.loadData(this.hotSettings3.data);
        }
      },
      getValuekList() {
        // 物料信息列表数据
        if (
          this.xmlList.param.value != "" ||
          this.xmlList.param.fabric != value
        ) {
          this.hotSettings4.rowHeaders = this.xmlList.param.value.string;
          // this.hotSettings3.colHeaders = ["名称", "经纱缩水", "纬纱缩水"];
          this.xmlList.modelList.model.forEach((element, index) => {
            if (element.name == this.$route.query.id) {
              // console.log(index)
              this.hotSettings4.data = this.xmlList.modelList.model[index].value;
            }
          });
          // console.log(this.hotSettings4)
          this.$refs.testHot3.hotInstance.loadData(this.hotSettings4.data);
        }
      },
      saveData() {
        //创建一个x2js对象进行转换
        //  console.log(this.$x2js)
        var modelTable = {};
        modelTable.modelTable = this.xmlList;
        var xmlAsStr = this.$x2js.js2xml(modelTable);
        // console.log(modelTable)
        // console.log(this.xmlList)
        var editForm = {};
        editForm.StyleName = this.$route.query.StyleName;
        editForm.ModelId = this.$route.query.modelId;
        editForm.xmlStr = '<?xml version="1.0" encoding="utf-8"?>' + xmlAsStr;
        // console.log(editForm.xmlStr)
        //  console.log(this.$refs.testHot.hotInstance.getData())
        //  console.log(this.$refs.testHot.hotInstance.getSourceData())
        //  var examData = this.$refs.testHot.table.getData(); //这里要注意，如果使用this.hotSettings.data 保存表格数据，拖拽完以后数据的顺序将不会更新，因此使用 this.$refs.testHot.table.getData(); 来获取数据，获取的数据格式为二维数组。
        editXmlInfo(editForm).then(res => {
          // console.log(res)
          if (res.Success == true) {
            this.$message({
              offset: 700,
              message: "修改成功！",
              type: "success",
              duration: 2000
            });
            this.GetXmlInfo();
          }
        });
      },
      handlImg(item, index) {
        // console.log(item);
        this.showImage = item.Image  ;
        this.dialogImageVisible = true;
        // console.log(imgUrl)
        // this.bigImg = this.defaultImg + imgUrl;
      },
     handldefaultImg(item, index) {
        // console.log(item);
        this.showImage = item.defaultImage;
        this.dialogdefaultImageVisible = true;
        // console.log(imgUrl)
        // this.bigImg = this.defaultImg + imgUrl;
      },
      handleFilter() {
        //this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      handleCreate() {
        this.resetTemp();
        this.dialogStatus = "create";
        this.dialogFormVisible = true;
      },
      handleEdit1(index, row) {
        getObj(row).then(response => {
          if (response.status === 200) {
            //成功加载
            this.list1 = response.data.rows;
            this.total = response.data.total;
            this.dialogtitleProcess = " 此款式的工序列表";
            // console.log(this.list1)
            // this.form = this.list[index];
            // this.currentIndex = index;
            // this.dialogFormVisible = true;
            this.listLoading = false;
            //成功提示
            //  this.$message({
            //   message: response.error,
            //   type: "warning",
            //   duration: 2000
            // });
          } else if (response.status === 201) {
            //成功加载
            // this.$message({
            //   message: "暂无数据",
            //   type: "warning",
            //   duration: 2000
            // });
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
      handleEdit(index, row) {
        this.$message({
          offset: 700,
          message: "待完善...",
          type: "warning",
          duration: 2000
        });
        // console.log(row);
      },
      handleUpdate(row) {
        getObj(row.id).then(response => {
          this.form = response.data;
          this.dialogFormVisible = true;
          this.dialogStatus = "update";
        });
      },
      handleDelete(row) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          delObj(row.id).then(() => {
            this.$message({
              offset: 700,
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000
            });
            const index = this.list.indexOf(row);
            this.list.splice(index, 1);
          });
        });
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
      submitUploadimg() {
        this.$refs.upload1.submit();
       
        // this.getList();
      },
      // 移除文件函数
      handleRemoveimg(file, fileList) {
        // console.log(file, fileList);
      },
      // 点击预览
      handlePreviewimg(file) {
        // console.log(file);
      },
      // 上传成功函数
      successUploadimg(response, file) {
        // console.log(response)
         this.$refs.upload1.clearFiles();
        this.getList();
        // console.log(file)
      },
      changeUploadimg(file, fileList) {
        // console.log(file.raw.type.indexOf("image"));
        // console.log(fileList)
        // console.log(this.updata)
        this.fileListimg = fileList;
        if (fileList.length >= 2) {
          fileList.shift();
        }
        if (file.raw.type.indexOf("image") == -1) {
          this.$message.error("只能选择图片类型！");
          this.fileList = [];
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.fileList = [];
          this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isLt2M;
      },
      beforeAvatarUploadimg(file) {
        console.log(1);
        // const isJPG = file.type === imageArry.indexOf() ;
      },
      // 原生文件请求
      // fileChange: function(el) {
      //   console.log(el)
      //   if (!el.target.files[0].size) return;
      //   var obj = new FormData(document.getElementById("myform"));
      //   console.log(obj)
      //   // obj.append("name", "wzh");
      //   var _this = this;
      //   $.ajax({
      //     type: 'post',
      //     url: 'http://lbwin7/bmapi/api/values',
      //     data: obj,
      //     cache: false,
      //     processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
      //     contentType: false, // 不设置Content-type请求头
      //     success: function(res) {
      //       console.log(res)
      //     },
      //   });
      // },
      // 原生文件请求结束
      // 文件上传测试
      indexMethod(index) {
        return index * 1;
      },
      //文件大小格式化  去掉小数点后的位
      dateFormat(row, column) {
        var date = row[column.property];
        return parseInt(date) + date.substr(date.length - 2, date.length);
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
      }
    }
  };
</script>
<style scoped lang="scss">
.addTable{
  max-width: 1200px;
}
  .model-info{
    display: flex;
    align-items: center;
  }
  .model-info b{
    // border:1px solid red;
    min-width: 80px;
  }
  .grid-content {
    border: 1px solid red;
    height: 20px;
  }
  .message-box {
    display: flex;
    width: 600px;
    margin: 0 auto;
    justify-content: space-between;
    align-items: center;
  }
  .table-message {
    display: flex;
    flex-direction: column;
  }
  .table-message b {
    margin: 10px;
  }
  .table-message b span {
    font-weight: 500;
  }
  .img-content {
    padding: 15px;
  }
  .table-img {
    width: 350px;
    height: 300px;
    display: inline-block;
    margin-right: 30px;
    margin-top: 15px; // border: 1px solid red;
  }
  .hot-table-part {
    margin: 15px;
  }
  .hot-table-part /deep/ .handsontable th {
    background-color: #eef1f6;
  }
  .hot-table-part /deep/ .handsontable thead th .relative {
    padding: 16px 4px;
  }
  .hot-table-part /deep/ .handsontable .relative {
    position: relative;
    padding: 13px 0 0 0;
  }
  .hot-table-measure {
    // width: 578px;
    margin: 15px;
  } // .hot-table-measure /deep/ .handsontable{
  //       width: 80px;
  // }
  .hot-table-measure /deep/ .handsontable th {
    background-color: #eef1f6;
  }
  .hot-table-measure /deep/ .handsontable thead th .relative {
    padding: 16px 4px;
  }
  .hot-table-measure /deep/ .handsontable .relative {
    position: relative;
    padding: 13px 0 0 0;
  }
  .hot-table-measure /deep/ .htCore {
    // width: 100px;
    // border: 1px solid red;
  }
  .hot-table-material {
    width: 378px;
    margin: 15px;
  }
  .hot-table-material /deep/ .handsontable th {
    background-color: #eef1f6;
  }
  .hot-table-material /deep/ .handsontable thead th .relative {
    padding: 16px 4px;
  }
  .hot-table-material /deep/ .handsontable .relative {
    position: relative;
    padding: 13px 0 0 0;
  }
  .upload-demo {
    max-width: 200px;
  }
  .self-table {
    border-color: #606266;
    tr {
      height: 55px;
      line-height: 55px;
      background-color: #fff;
      border: 1px solid #ebeef5;
      color: #606266;
    }
    td {
      text-align: center;
      width: 250px;
    }
  }
</style>
