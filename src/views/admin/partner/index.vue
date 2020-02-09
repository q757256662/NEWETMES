<template>
  <!-- StyleIquiry -->
  
  <div class="app-container calendar-list-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 160px;" class="filter-item" placeholder="请输入款名/样板名"
      v-model="listQuery.modelname"> </el-input>
    <el-input @keyup.enter.native="handleFilter" style="width: 150px;" class="filter-item" placeholder="请输入品牌/客户"
      v-model="listQuery.brand"> </el-input>
    <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="" v-model="listQuery.type"> </el-input> -->
    <el-select style="width: 150px;" v-model="listQuery['type']" @change="selectCategort" placeholder="请选择服装品类">
      <el-option label="全部" value="全部" key="全部"></el-option>
      <el-option v-for="item in categoriesOption" :key="item.Id" :label="item.CategoryName" :value="item.CategoryName">
      </el-option>
    </el-select>
    <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至"
      start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions2" placeholder="请选择创建时间">
    </el-date-picker>
    <!-- <el-input @keyup.enter.native="handleFilter" style="width: 600px;" class="filter-item" placeholder="输入公司名、地址关键字或锁号" v-model="listQuery.query"> </el-input> -->
    <el-input placeholder="请输入样式特征" v-model="listQuery.featrueKey" style="width: 180px;"></el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    <!-- <el-button class="filter-item" type="primary" v-waves  @click="handleaddModel">样式参数列表</el-button> -->
    <div class="filter-container">
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row>
      <el-table-column align="center" label="款名" :render-header="handleHelp">
        <template scope="scope">
          <!-- <el-tooltip class="item" effect="light" content="点击修改款式信息" placement="top"> -->
          <a style="text-decoration:underline; 	color:#20a0ff" @click="handleEditStyle(scope.row)">
            {{scope.row.StyleName}}
          </a>
          <!-- </el-tooltip> -->


        </template>
      </el-table-column>
      <!-- <el-table-column prop="model_name" align="center" label="样板名"> </el-table-column>  -->
      <el-table-column align="center" label="样板名" :render-header="handleHelp2">
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
      <el-table-column width="160px" align="center" label="操作">
        <template scope="scope">
          <el-button style="margin:0;width:45px;" size='small' :loading="isloading == scope.$index"
            v-if="scope.row.State==2 && isloading == scope.$index" type="warning"
            @click="handleDown(scope.row,scope.$index)">
          </el-button>
          <el-button style="margin:0;" size='small' :loading="isloading == scope.$index"
            v-if="scope.row.State==2 && isloading !== scope.$index" type="warning"
            @click="handleDown(scope.row,scope.$index)">
            下载</el-button>
          <el-button style="margin:0" size='small' v-if="scope.row.State==2" type="danger"
            @click="handleDel(scope.row,scope.$index)">
            删除</el-button>
          <el-button style="margin:0;width:100%" size='small' v-if="scope.row.State==1" type="success"
            @click="handleImport(scope.row)">导入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :listQuery="listQuery" @PageChange="getList" :total="total"></Pagination>
    <el-dialog v-dialogDrag :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" :model="form1" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="品牌名：" :label-width="formLabelWidth">
          <el-input style="width: 220px;" v-model="form1.Brand" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item   label="存储模式：" :label-width="formLabelWidth">
        <el-select v-model="form1['SaveModel']" placeholder="请选择"    >
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
        </el-form-item> -->
        <el-form-item v-if="form1['Type'] != ''" label="品类名：" :label-width="formLabelWidth">
          <el-select v-model="form1['Type']" placeholder="请选择品类">
            <el-option v-for="item in categoriesOption1" :key="item.Id" :label="item.CategoryName"
              :value="item.CategoryName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可驱动：" :label-width="formLabelWidth">
          <el-select v-model="form1['model']" placeholder="请选择" :key="form.ModelId">
            <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog v-dialogDrag title="样式列表" :visible.sync="dialogTableVisible">

      类型：
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="" v-model="listQuery.type"> </el-input> -->
      <el-select v-model="styleQurey['isText']" @change="selectParaType" placeholder="请选择">
        <el-option v-for="item in paraTypeOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      范围值：
      <el-input style="width: 100px;" class="filter-item" placeholder="起始值" v-model="styleQurey.start"> </el-input>
      -
      <el-input style="width: 100px;" class="filter-item" placeholder="结束值" v-model="styleQurey.end"> </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <table border class="tableArea" style="width: 100%">
        <tr>
          <th>样式名</th>
          <th>参数</th>
          <th>参数值</th>
          <th>操作</th>
        </tr>
        <template v-for="(tr,index) of modelParaList"> 
          <tr v-for="(item,i) of tr.Items" :key="i">
            <td v-if="i===0" :rowspan="tr.ModelParaItems.length">{{tr.ModelName}}</td>
            <td v-for="(td,index) of item" :key="index+i">{{td}}</td>
            <!-- <td v-for="td of item" :key="index+'_'+i">{{td.ParaVal}}</td> -->
            <td>
              <el-button type="primary" @click="editModelParaItems(tr.ModelParaItems[index])">编辑</el-button>
            </td>

          </tr>
        </template>
        <!-- <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
          	<el-tooltip class="item" effect="dark" content="修改" placement="top-start">
				      <i class="el-icon-edit-outline"  @click="modify(scope)" />
				    </el-tooltip>
				    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <i class="el-icon-delete" @click="deleteData(scope)" />
				    </el-tooltip>
          </template>
        </el-table-column > -->
      </table>
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
  downLoadObj,
  importObj,
  pageSaveModel,
  UpdateStyleInfo,
  deleteStyle,
  getModelInfo
} from "api/admin/findpartner/index";
import { getStyleParalist } from "api/admin/model";
import Pagination from "@/components/Pagination";

//获取页面参数
import { GetUrlParam } from "utils/index";
import { getToken } from "utils/auth";
import { getCategory } from "api/admin/user/index";
import { getList } from "api/admin/category/index";
import { mapGetters } from "vuex";
export default {
  name: "user",
  components: {
    Pagination: Pagination
  },
  data() {
    return {
      form: {
        Brand: undefined,
        StyleId: undefined,
        model: ""
      },
      form1: {
        Brand: undefined,
        StyleId: undefined,
        model: ""
      },
      // defaultDownload: 'http://fwq2012',
      // elseDownload: '',
      // Download: 'http://mes.etsystem.cn',
      value8: "",
      value7: "",
      value9: "",
      isloading: -1,
      isShowDown: -1,
      labelPosition: "right",
      categoriesOption: [],
      categoriesOption1: "",
      token: getToken(),
      pickerOptions2: {
        shortcuts: [
          {
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
      options1: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      options: [
        {
          label: "加法",
          value: 1
        },
        {
          label: "普通",
          value: 0
        },
        {
          label: "减法",
          value: -1
        }
      ],
      rules: {
        name: [
          {
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
        UserName: [
          {
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
        password: [
          {
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
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        limit: Number(localStorage.getItem("totalPage") || 10),
        page: 1,
        modelname: "",
        brand: "",
        type: "",
        sTime: "",
        eTime: "",
        featrueKey: ""
      },
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
      formLabelWidth: "100px",
      tableKey: 0,
      downForm: {
        ModelId: 0
      },
      dialogTableVisible: false,
      paraTypeOptions: [
        {
          value: "-1",
          label: "全部"
        },
        {
          value: "0",
          label: "数值型工艺参数"
        },
        {
          value: "1",
          label: "文字型工艺参数"
        }
      ],
      styleQurey: {
        isText: "-1",
        start: "",
        end: "",
        pageIndex: 1,
        pageSize: 5,
        currModelId: 0
      },
      modelParaList: [],
      modelParaList2: []
    };
  },
  filters: {
    StyleIquiryStatus: function(val) {
      return val == "0"
        ? "废弃"
        : val == "1"
        ? "修改中"
        : val == "2"
        ? "正常"
        : "未知";
    },
    SwitchMode: function(val) {
      return val == 0
        ? "普通"
        : val == 1
        ? "加法"
        : val == -1
        ? "减法"
        : "未知";
    },
    isModel: function(val) {
      return val == 0 ? "否" : val == 1 ? "是" : "未知";
    }
  },
  mounted() {
    //  alert(window.location);
    //   setTimeout(()=>{
    //     if(GetUrlParam('projectID')!== ''&& localStorage.getItem('type') == 'BD'){
            
    //       this.$router.push({
    //       path: '/baseManager/Detail', 
    //       query:{
    //         projectID:GetUrlParam('projectID'),
    //         type:'BD'
    //       }
    //     });
    //   }
    //   },200)

    this.getList(this.listQuery);
    this.getCategoryList();
    // this.getCategorys();
    // console.log(getToken())
    this.userManager_btn_edit = this.elements["userManager:btn_edit"];
    this.userManager_btn_del = this.elements["userManager:btn_del"];
    this.userManager_btn_add = this.elements["userManager:btn_add"];
    // console.log(window.location.href.split('/'))
    // console.log(window.location.href.split('/')[2])
    // this.elseDownload = window.location.href.split('/')[2]
    // this.defaultDownload =window.location.href.split('/')[2]
    // 默认时间：前一个月
    // const start = new Date();
    // var sFullYear = start.getFullYear();
    // var sMonth = start.getMonth();
    // var sData = start.getDate();
    // const end = new Date();
    // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    // var eFullYear = start.getFullYear();
    // var eMonth = start.getMonth();
    // var eData = start.getDate();
    // this.value7 = [
    //   new Date(eFullYear, eMonth, eData),
    //   new Date(sFullYear, sMonth, sData)
    // ];
  },
  computed: {
    ...mapGetters(["elements"])
  },

  methods: {
    handleHelp(h, { column }) {
      // console.log(column);
      return (
        <el-tooltip
          class="item"
          effect="light"
          content="点击修改款式信息"
          placement="top"
        >
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
      );
    },
    handleHelp2(h, { column }) {
      // console.log(column);
      return (
        <el-tooltip
          class="item"
          effect="light"
          content="点击进入样板详情"
          placement="top"
        >
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
      );
    },
    selectParaType(e) {},
    editModelParaItems(row) {
      // console.log(row);
    },
    getModelParaList() {
      this.modelParaList = JSON.parse(localStorage.getItem("data")).Data;
      var arr = [];
      JSON.parse(localStorage.getItem("data")).Data.Rows.forEach(element => {
        let obj = {};
        obj.ModelId = element.ModelId;
        obj.ModelName = element.ModelName;
        obj.ModelParaItems = [];
        obj.Items = [];
        element.ModelParaItems.forEach(el => {
          let item = {};
          let arr2 = [];
          item.Id = el.Id;
          item.IsDrive = el.IsDrive;
          item.ParaName = el.ParaName;
          item.ParaVal = el.ParaVal;
          item.StyleParaId = el.StyleParaId;
          obj.ModelParaItems.push(item);
          arr2.push(el.ParaName);
          arr2.push(el.ParaVal);
          obj.Items.push(arr2);
        });
        arr.push(obj);
      });
      this.modelParaList = arr;
      // console.log(this.modelParaList);
      // console.log(arr);
      // getStyleParalist(this.styleQurey).then(res=>{
      //      console.log(res);
      //      localStorage.setItem('data',JSON.stringify(res));
      //      this.modelParaList =JSON.parse(localStorage.getItem('data')).Data;
      //      console.log(this.modelParaList);

      // })
    },
    getList(obj) {
      this.listQuery = {
        ...this.listQuery,
        ...obj
      };
      this.listLoading = true;
      page(this.listQuery).then(response => {
        // console.log(response)
        if (response.status === 200) {
          //成功加载
          this.list = response.data.rows;
          this.total = response.data.total;
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
          this.list = response.data.rows;
          this.total = response.data.total;
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
    selectCategort(val) {
      // console.log(val)
      this.getList();

      // getCategory().then(res=>{
      //   console.log(res)
      //   if(res.status==200){
      //     this.categoriesOption = res.data.rows;
      //   }
      // })
    },
    getCategoryList() {
      var obj = {};
      obj.CategoryName = "全部";
      getList().then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.categoriesOption1 = res.data.rows;
          this.categoriesOption = res.data.rows
          // this.categoriesOption.unshift(obj);
        }
        // console.log(this.categoriesOption)
      });
    },
    getCategorys() {
      getList().then(res => {
        // console.log(res)
        if (res.status == 200) {
          this.categoriesOption = res.data.rows;
        }
        // console.log(this.categoriesOption)
      });
    },
    handleEditStyle(row) {
      // this.dialogStatus = "update";
      // this.dialogFormVisible = true;
      // // console.log(row)
      // this.form1 = {...row};
      var form = JSON.stringify(row);
      this.$router.push({
        // path: "setModelPare",
        name: '款式参数',
        query: {
          item: form
          // id: obj.ModelName,
          // styleId:obj.StyleId,
          // modelId:obj.ModelId,
          // StyleName:obj.StyleName
        }
      });
      // localStorage.setItem('BDdatadetail',JSON.stringify(row));
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
    handleaddModel() {
      this.dialogTableVisible = true;
      this.getModelParaList();
      // this.$router.push({
      // path: 'setModelPare',
      // name: '新增款式',
      // params: {
      //     name: 'name',
      //     dataObj: this.msg
      // }
      // query: {
      //   id: obj.ModelName,
      //   styleId:obj.StyleId,
      //   modelId:obj.ModelId,
      //   StyleName:obj.StyleName
      // }
      // })
    },
    downLoad(obj) {
      // console.log(obj.row);
      this.downForm.ModelId = obj.row.ModelId;
      this.sownForm.downLoadObj(this.downForm).then(res => {
        // console.log(res);
        // console.log(res);
      });
    },
    handleImport(row) {
      // console.log(row.ModelId);
      importObj(row.ModelId).then(res => {
        if (res.status == 200) {
          this.$message({
            message: res.tip,
            type: "success",
            offset: 700,
            duration: 2000
          });
        } else {
          this.$message({
            message: res.tip,
            type: "error",
            offset: 700,
            duration: 2000
          });
        }
      });
    },
    handleDel(row, index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(row)
          var form = {};
          form.StyleId = row.StyleId;
          // form.OrderId = row.OrderId;
          // console.log(form);
          deleteStyle(row.StyleId).then(res => {
            // console.log(res);
            if (res.status == 200) {
              this.$message({
                title: "成功",
                offset: 700,
                message: "删除成功",
                type: "success",
                durantion: 2000
              });
            } else if (res.status == 201) {
              this.$message({
                title: "失败",
                offset: 700,
                message: res.tip,
                type: "error",
                durantion: 2000
              });
            } else {
              this.$message({
                offset: 700,
                message: res.tip,
                type: "warning",
                durantion: 2000
              });
            }
            this.getList(this.form);
          });

          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      // var form = {};
      // form.Id = row.Id;
      // form.OrderId = row.OrderId;
      // alert('确认删除吗？')
      // console.log(form);
      // deleteStyle(form).then(res => {
      //   // console.log(res);
      //   if (res.status == 200) {
      //     this.$message({
      //       title: "成功",
      //       offset: 700,
      //       message: "删除成功",
      //       type: "success",
      //       durantion: 2000
      //     });
      //   } else if (res.status == 201) {
      //     this.$message({
      //       title: "失败",
      //       offset: 700,
      //       message: res.tip,
      //       type: "error",
      //       durantion: 2000
      //     });
      //   } else {
      //     this.$message({
      //       offset: 700,
      //       message: res.tip,
      //       type: "warning",
      //       durantion: 2000
      //     });
      //   }
      //   this.getList(this.form);
      // });
    },
    handleSwitch(row) {
      //改变储存模式
      // console.log(row);
      let form = {};
      form.StyleId = row.StyleId;
      form.SaveModel = row.SaveModel;
      pageSaveModel(form).then(res => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: res.tip,
            duration: 2000,
            offset: 700
          });
        } else {
          this.$message({
            message: res.tip,
            type: "error",
            duration: 2000,
            offset: 700
          });
        }
        this.getList();
      });
    },
    handleDown(row, index) {
      // console.log("/bmapi/downStyle?ModelId=" + row.ModelId + "&token=" + getToken());
      var form = {};
      form.ModelId = row.ModelId;
      form.token = this.$store.getters.token;
      // console.log(index)
      this.isloading = index;
      downLoadObj(form).then(res => {
        // console.log(res.tip)
        if (res.status == 201) {
          this.$message({
            message: res.tip,
            type: "error",
            offset: 700,
            duration: 2000
          });
          this.isloading = -1;
        } else {
          window.location.href =
            "/bmapi/downStyle?ModelId=" + row.ModelId + "&token=" + getToken();
          this.isloading = -1;
        }
      });
      // setTimeout(() => {
      //    this.isloading = -1;
      // }, 2000);
    },
    handleFilter() {
      if (this.value7[0] != null) {
        let Starttime = new Date(this.value7[0]);
        let Endtime = new Date(this.value7[1]);
        var sFullYear = Starttime.getFullYear();
        var sMonth = Starttime.getMonth() + 1;
        var sData = Starttime.getDate();

        var EFullYear = Endtime.getFullYear();
        var EMonth = Endtime.getMonth() + 1;
        // console.log(sMonth)
        var EData = Endtime.getDate();
        this.listQuery.sTime = (
          sFullYear +
          "-" +
          sMonth +
          "-" +
          sData +
          " " +
          "00" +
          ":" +
          "00" +
          ":" +
          "00"
        ).toString();
        this.listQuery.eTime = (
          EFullYear +
          "-" +
          EMonth +
          "-" +
          EData +
          " " +
          "23" +
          ":" +
          "59" +
          ":" +
          "00"
        ).toString();
        // console.log(this.listQuery.sTime)
        // console.log( this.listQuery.eTime)

        // this.listQuery.sTime =
        //   new Date(this.value7[0]).toLocaleDateString().replace(/\//g, "-") +
        //   " 00:00";
        // this.listQuery.eTime =
        //   new Date(this.value7[1]).toLocaleDateString().replace(/\//g, "-") +
        //   " 23:59";
      } else {
        this.listQuery.sTime = this.listQuery.eTime = "";
      }
      if (this.listQuery.featrueKey == "") {
        this.getList();
      } else {
        this.getModel(this.listQuery);
      }
      // console.log(this.listQuery);
      // console.log(this.listQuery);
      // console.log('listQuery-----------------------------------' + this.listQuery)

      // console.log("tag", this.value7[0].toISOString().slice(0, 10));
      // console.log("tag", this.value7[1].toISOString().slice(0, 10));
    },
    getModel() {
      var modelForm = {};
      modelForm.featrueKey = this.listQuery.featrueKey;
      getModelInfo(modelForm).then(response => {
        // console.log(response)
        if (response.status == 200) {
          //成功加载
          this.list = response.data.rows;
          this.total = response.data.total;
          this.listLoading = false;
          //成功提示
          //  this.$message({
          //   message: response.error,
          //   type: "warning",
          //   duration: 2000
          // });
        } else {
          //失败提示
          this.$message({
            offset: 700,
            message: response.tip,
            type: "warning",
            duration: 2000
          });
          this.list = [];
          // this.total = response.data.total;
          this.listLoading = false;
        }
      });
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
    handleEdit(index, row) {
      this.addPartner.Id = row.Id;
      // 添加合作伙伴
      addObj(this.addPartner).then(response => {
        if (response.status === 200) {
          //成功加载
          // var data = response.data;
          // console.log(data)
          //成功提示
          this.$message({
            offset: 700,
            title: "成功",
            message: "创建成功",
            type: "warning",
            duration: 2000
          });
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
      // this.form = this.list[index];
      // this.currentIndex = index;
      // this.dialogFormVisible = true;
      // this.dialogStatus = "update";
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
          // console.log(this.form1)
          UpdateStyleInfo(this.form1).then(res => {
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
    }
  }
};
</script>
<style>


</style>
