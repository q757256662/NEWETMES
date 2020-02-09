<template>
  <!-- PipelineManagement -->
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!-- <el-tooltip class="item" effect="light" content="点击添加流水线" placement="top-start"> -->
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit"
        v-if="showAdd">添加</el-button>
      <!-- </el-tooltip> -->
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row>
      <el-table-column align="center" label="流水线" :render-header="handleHelp">
        <template scope="scope">
          <!-- <el-tooltip class="item" effect="light" content="点击更改流水线名称" placement="top-start"> -->
          <el-button size="small" type="text" @click="handleName(scope.$index, scope.row)">
            {{ scope.row.name }}
          </el-button>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column prop="type" align="center" label="类型" :render-header="handleHelp3">
        <template scope="scope">
          <el-button @click="handleShowSelectType(scope.row,'Process')" type="text">
            {{scope.row |typeStyle}}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="type" align="center" label="品类" width="360" :render-header="handleHelp4">
        <template scope="scope">
          <el-button @click="handleShowSelectType(scope.row,'Category')" type="text" :title="selectCategoryValue(scope.row.PLCategory)" class="SelectType" >
            {{selectCategoryValue(scope.row.PLCategory)}}
          </el-button>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="主管" :render-header="handleHelp1">
        <template scope="scope">
          <!-- <el-tooltip v-if="showAdd" class="item" effect="light" content="点击更改流水线主管" placement="top-start"> -->
          <el-button size="small" type="text" @click="handleUpdate(scope.row)" v-if="showAdd">
            {{ scope.row | isName }}
          </el-button>
          <!-- </el-tooltip> -->
          <span v-else> {{scope.row.UserName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="180">
        <template scope="scope">
          <!-- <el-tooltip class="item" effect="light" content="点击修改流水线工序权重" placement="top-start"> -->
          <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">
            编辑
          </el-button>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-dialogDrag  key="updatePL" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" v-if="dialogif=='updatePL'" :close-on-press-escape="false" custom-class="WaterLineDialog">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">

        <el-form-item label="流水线：" :label-width="formLabelWidth" prop="name">
          <el-input style="width:400px" placeholder="必填,3到11个字符" v-model="form.name" auto-complete="off"
            :disabled="dialogStatus!=='create'"></el-input>
        </el-form-item>
        <el-form-item label="类型：" v-if="dialogStatus=='create'">
          <el-select v-model="currentSelectProcess" multiple :style="{...newWidthObj,minWidth:'400px'}" @change="getDomWidth('CreatecurrentSelectProcess')">
            <!-- <el-option v-for="item in categoryArr " :key='item.Id' :label='item.CategoryName' :value="item.Id"></el-option> -->
            <el-option key="CG" label="成衣改版" value="CG"></el-option>
            <el-option key="TG" label="团订改版" value="TG"></el-option>
            <el-option key="CD" label="成衣生产" value="CD"></el-option>
            <el-option key="TD" label="团订生产" value="TD"></el-option>
            <el-option key="GD" label="个订生产" value="GD"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品类：" v-if="dialogStatus=='create'">
          <el-select v-model="categoryValue" multiple @change="getDomWidth('categoryValue')" :style="{...widthObj,minWidth:'400px'}" ref="category">
            <el-option v-for="item in categoryArr " :key='item.Id' :label='item.CategoryName' :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主管工号：" :label-width="formLabelWidth" prop="login_id">
          <el-input style="width:400px" placeholder="必填,请输入主管工号" type="number" v-model="form.login_id"
            auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="updateForm('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag key="updateProcess" :title="dialogtitleProcess" :visible.sync="dialogFormVisible" v-if="dialogif=='updateProcess'" width="100%" :close-on-press-escape="false" custom-class="WaterLineDialog">
      <span slot="title">
        <span style="font-weight:550;font-size:15px">{{dialogtitleProcess}}</span>
        <el-tooltip class="item" effect="light" placement="bottom">
        <span slot="content">
          1.跳过工序只能选择两道工序。 <br />
          2.更改对应工序的权重即改变了当前工序对应的工价。
        </span>
        <img class="backFile" src="static/img/icon_help.png" alt="" srcset="">
      </el-tooltip>
      </span>
      
      <el-tabs v-model="currentSelectType" type="card" @tab-click="handleSelectType" v-loading="loading" v-if="currentSelectType.length!=0">
        <el-tab-pane label="成衣改版" name="CG" v-if="onShowProcess('CG')">
          <ProcessTable :tableData="allTypeTable" process="CG" :key="currentSelectType" @deleProcess="handleDeleteProcess"></ProcessTable>
        </el-tab-pane>
        <el-tab-pane label="团订改版" name="TG" v-if="onShowProcess('TG')">
          <ProcessTable :tableData="allTypeTable" process="TG" :key="currentSelectType" @deleProcess="handleDeleteProcess" ></ProcessTable>
        </el-tab-pane>
        <el-tab-pane label="成衣生产" name="CD" v-if="onShowProcess('CD')">
          <ProcessTable :tableData="allTypeTable" process="CD" :key="currentSelectType" @deleProcess="handleDeleteProcess"></ProcessTable>
        </el-tab-pane>
        <el-tab-pane label="团订生产" name="TD" v-if="onShowProcess('TD')">
          <ProcessTable :tableData="allTypeTable" process="TD" :key="currentSelectType" @deleProcess="handleDeleteProcess"></ProcessTable>
        </el-tab-pane>
        <el-tab-pane label="个订生产" name="GD" v-if="onShowProcess('GD')">
          <ProcessTable :tableData="allTypeTable" process="GD" :key="currentSelectType" @deleProcess="handleDeleteProcess"></ProcessTable>
        </el-tab-pane>
      </el-tabs>
      <el-table v-else style="padding:0">
      <el-table-column align="center" label="名称" ></el-table-column>
      <el-table-column align="center" label="是否跳过" ></el-table-column>
      <el-table-column align="center" label="权重"></el-table-column>
      </el-table>

      <!-- <el-table :key='tableKey' :data="list1" v-loading.body="listLoading" border fit highlight-current-row
        style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column prop="name" align="center" label="工序名称"> </el-table-column>
        <el-table-column class-name="status-col" label="是否跳过" width="100px" align="center">
          <template scope="scope">
            <el-switch v-model="scope.row.state" :on-value=0 :off-value=1 off-color="#ff4949" on-color="#13ce66"
              on-text="是" off-text="否" v-if="scope.row.assign==1" @change="setChange(scope.$index,scope.row)"
              :disabled="scope.row.state==1&&isDisabled">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="权重" align="center" width='150'>
          <template scope="scope">
            <el-select v-model="scope.row.weight" placeholder="权重" @change="weightChange(scope.row)"
              :disabled="scope.row.state==0" :key="scope.row.PLID" @visible-change="selectAble">
              <el-option label=0.5 value=0.5></el-option>
              <el-option label=1 value=1></el-option>
              <el-option label=1.5 value=1.5></el-option>
              <el-option label=2 value=2></el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table> -->
    </el-dialog>
    <el-dialog v-dialogDrag key="updateName" :title="dialogtitleProcess" :visible.sync="dialogFormVisible" v-if="dialogif=='updateName'" :close-on-press-escape="false" custom-class="WaterLineDialog">
      <el-form ref="updateForm" label-width="100px" porp=name>
        <el-form-item label="流水线：" :label-width="formLabelWidth">
          <el-input style="width:220px" v-model="form.name" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="新流水线名称" :label-width="formLabelWidth">
          <el-input style="width:220px" placeholder="必填,3到11个字符" v-model="newName" auto-complete="off" :minlength=3>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel('form')">取 消</el-button>
        <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button> -->
        <el-button type="primary" @click="updatePLName()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 重新选择类型 -->
    <el-dialog v-dialogDrag key="WaterLineDialog" :title="dialogtitleProcess" :visible.sync="ReSelectType" :close-on-press-escape="false" custom-class="WaterLineDialog">
      <el-form ref="updateForm" label-width="100px" porp=name>
        <!-- <el-form-item label="流水线：" :label-width="formLabelWidth"> -->
        <el-form-item label="类型：" v-if="categoryOrProcess=='Process'">
           <el-select v-model="currentSelectProcess" multiple ref="currentSelectProcess" @change="getDomWidth('currentSelectProcess')" :style="widthObj">
            <!-- <el-option v-for="item in categoryArr " :key='item.Id' :label='item.CategoryName' :value="item.Id"></el-option> -->
            <el-option key="CG" label="成衣改版" value="CG"></el-option>
            <el-option key="TG" label="团订改版" value="TG"></el-option>
            <el-option key="CD" label="成衣生产" value="CD"></el-option>
            <el-option key="TD" label="团订生产" value="TD"></el-option>
            <el-option key="GD" label="个订生产" value="GD"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品类：" v-if="categoryOrProcess=='Category'">
          <el-select v-model="currentSelectCategory" multiple ref="category" @change="getDomWidth('currentSelectCategory')" :style="widthObj">
            <el-option v-for="item in categoryArr " :key='item.Id' :label='item.CategoryName' :value="item.Id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ReSelectType=false">取 消</el-button>
        <!-- <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button> -->
        <el-button type="primary" @click="handleSureType()" v-if="categoryOrProcess=='Process'">确 定</el-button>
        <el-button type="primary" @click="handleSureCategory()" v-if="categoryOrProcess=='Category'">确 定</el-button>
      </div>
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
  setObj,
  weightObj,
  updateName,
  updateprocess
} from "api/admin/user/device";
import { mapGetters } from "vuex";
import ProcessTable from "@/components/ProcessTable";
import {DH,TD,GD,CG,TG} from '@/utils/const'

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
/**品类管理 */
import { getList, UpdatePLCategory } from "api/admin/category/index";

//这里要俺需要引入，我不是一个对象
import { isvalidPhone } from "utils/validate";
//定义一个全局的变量，谁用谁知道
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  name: "user",
  components: {
    ProcessTable: ProcessTable
  },
  data() {
    return {
      isDisabled: false,
      loading: true,
      showAdd: false,
      value: 0,
      dialogif: null,
      dialogtitleProcess: "",
      ReSelectType: false,
      options1: [
        {
          value: "A",
          label: "成衣改版",
          children: [
            {
              value: "11",
              label: "下载样板"
            },
            {
              value: "13",
              label: "修改样板"
            },
            {
              value: "15",
              label: "放码"
            },
            {
              value: "16",
              label: "检查尺寸"
            },
            {
              value: "18",
              label: "估算用量"
            }
          ]
        },
        {
          value: "B",
          label: "团订改版",
          children: [
            {
              value: "22",
              label: "下载样板"
            },
            {
              value: "23",
              label: "修改样板"
            },
            {
              value: "25",
              label: "放码"
            },
            {
              value: "26",
              label: "检查尺寸"
            },
            {
              value: "27",
              label: "改驱动规则"
            }
          ]
        }
      ],
      processType: [
        {
          value: "CD",
          label: "成衣生产"
        },
        {
          value: "TD",
          label: "团订生产"
        },
        {
          value: "GD",
          label: "个订生产"
        },
        {
          value: "TG",
          label: "团订改版"
        },
        {
          value: "CG",
          label: "成衣改版"
        },
        {
          value: "OtherG",
          label: "其他改版"
        }
      ],
      form: {
        UserName: undefined,
        Phone: undefined,
        State: 1,
        Up: undefined,
        Down: 0,
        MAC: undefined,
        Remark: "",
        type: [],
        weight: 0,
        /**团订改版 */
        TG: false,
        /**成衣改版 */
        CG: false,
        /**其他改版 */
        OtherG: false,
        /**个订生产 */
        GD: false,
        /**团订生产 */
        TD: false,
        /**成衣生产 */
        CD: false
      },
      newName: "",
      setForm: {
        delCode: 0,
        setCode: 0,
        name: "",
        id: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          },
          {
            min: 3,
            max: 11,
            message: "长度在 3 到 11 个字符",
            trigger: "blur"
          }
        ],
        login_id: [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ],
        UserName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        Phone: [
          {
            required: true,
            validator: validPhone,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            min: 11,
            max: 11,
            message: "长度在11个字符",
            trigger: "blur"
          }
        ]
      },
      list: null,
      list1: [],
      arr: [],
      total: null,
      listLoading: true,
      isSelect: false,
      listQuery: {
        page: 1,
        limit: 15,
        name: undefined
      },
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
      /**当前选定的tab页 */
      currentSelectType: "",
      /**是否显示tab页 */
      showType: [],
      /**所有的工序列表 */
      allTypeTable: [],
      /**当前打开的工序列表 */
      currentSelectProcess: [],
      /**当前流水线ID */
      currentPLID: 0,
      /**品类名称 */
      categoryValue: [],
      /**所有品类 */
      categoryArr: [],
      /**当前打开的品类列表 */
      currentSelectCategory: [],
      /**显示品类还是工序 */
      categoryOrProcess: "",
      /**动态长度 */
      widthObj: {},
      /**类型动态长度 */
      newWidthObj: {}
    };
  },
  created() {
    this.getList();
    this.showAdd = getRole() == "2";
    getList().then(res => {
      if (res.status == 200) {
        this.categoryArr = res.data.rows;
      }
    });
  },
  computed: {},
  watch: {
    ReSelectType(state) {
      if (!state) {
        this.currentSelectProcess = [];
      }
    },
    dialogFormVisible(state) {
      if (!state) {
        this.currentSelectProcess = [];
        this.currentSelectType = "";
      }
    }
  },
  methods: {
    handleDeleteProcess(code,process,row){
      // console.log(process)
      // let index = this.allTypeTable.findIndex(el=>el.code==code&&el.type==process)
      // this.allTypeTable.splice(index,1)
      // console.log(index)
      //   getObj(row.id).then(res => {
      //   if (res.status == 200) {
      //     // console.log(res)
      //     this.loading = false;
      //     this.showType = [];
      //     this.allTypeTable = res.data.rows;
      //     res.data.rows.map(el => {
      //       if (!this.showType.includes(el.type)) {
      //         this.showType.push(el.type);
      //       }
      //     });
      //     this.currentSelectType = this.showType[0];
      //     // console.log(this.showType);
      //     // console.log(res.Data.rows)
      //   }else{
      //     this.loading = false;
      //     // this.$message({
      //     //   message:res.tip,
      //     //   type:"warning"
      //     // })
      //   }
      // });
    },
    selectCategoryValue(Id) {
      if (Id) {
        let result = this.categoryArr
          .filter(el => {
            if (Id.includes(el.Id)) {
              return true;
            } else {
              return false;
            }
          })
          .map(el => {
            return el.CategoryName;
          });
        return result.join(' / ');
      } else {
        return "暂未选择品类";
      }
    },
    handleHelp(h, { column }) {
      return (
        <el-tooltip
          class="item"
          effect="light"
          content="点击修改流水线信息"
          placement="top"
        >
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
      );
    },
    handleHelp3(h, { column }) {
      return (
        <el-tooltip
          class="item"
          effect="light"
          content="点击修改流水线类型"
          placement="top"
        >
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
      );
    },handleHelp4(h, { column }) {
      return (
        <el-tooltip
          class="item"
          effect="light"
          content="点击修改流水线品类"
          placement="top"
        >
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
      );
    },
    handleHelp1(h, { column }) {
      // console.log(column);
      if (getRole() == "1") {
        return "主管";
      } else {
        return (
          <el-tooltip
            class="item"
            effect="light"
            content="点击修改流水线主管"
            placement="top"
          >
            <span>
              {column.label}
              <img src="static/img/icon_help.png" alt="" class="backFile" />
            </span>
          </el-tooltip>
        );
      }
    },
    tableRowClassName(row) {
      if (row.code < 30) {
        return "warning-row";
      }
    },
    getList() {
      this.listLoading = true;
      page(this.listQuery).then(response => {
        this.list = response.data.rows;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    weightChange(row) {
      // console.log(row);
      if (this.isSelect) {
        weightObj(row).then(res => {
          if (res.status == 200) {
            this.$message({
              message: res.tip,
              type: "success",
              duration: 2000
            });
          } else {
            this.$message({
              message: res.tip,
              type: "error",
              duration: 2000
            });
          }
        });
      }
    },
    change(row) {
      putObj(row).then(response => {
        if (response.status === 200) {
          this.dialogFormVisible = false;
          this.$message({
            message: response.tip,
            type: "success",
            duration: 2000
          });
        } else {
          //失败提示
          this.$message({
            message: response.error,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    handleFilter() {
      this.getList();
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
      this.dialogif = "updatePL";
      this.getDomWidth("categoryValue");
      this.getDomWidth("CreatecurrentSelectProcess");
      this.dialogFormVisible = true;
    },
    handleName(index, row) {
      //更改流水线名字
      // this.handleClose();
      // this.form = {...row};
      this.newName = "";
      if (this.$refs["form"] == undefined) {
        this.form = {
          ...row
        };
        this.dialogif = "updateName";
        this.dialogFormVisible = true;
        this.dialogtitleProcess = "修改流水线名称";
      } else {
        this.form = {
          ...row
        };
        this.dialogif = "updateName";
        this.dialogFormVisible = true;
        this.$refs["form"].resetFields();
        this.dialogtitleProcess = "修改流水线名称";
      }
      // this.$refs.form.resetFields();
      // console.log(this.$refs)
    },
    updatePLName() {
      var form = {};
      form.PLID = this.form.id;
      form.PLName = this.newName;
      // console.log(this.newName.replace(/\s+/g,""),this.newName.length)
      if (form.PLName.replace(/(^\s+)|(\s+$)/g, "") == "") {
        this.newName = "";
        this.$message({
          message: "请输入流水线名称!",
          type: "warning",
          duration: 2000
        });
      } else if (form.PLName.replace(/\s+/g, "").length < 3) {
        this.$message({
          message: "流水线名称至少3个字符!",
          type: "warning",
          duration: 2000
        });
      } else if (form.PLName.replace(/\s+/g, "").length > 11) {
        this.$message({
          message: "流水线名称至多11个字符!",
          type: "warning",
          duration: 2000
        });
        return false;
      } else {
        form.PLName = this.newName.replace(/\s+/g, "");
        updateName(form)
          .then(res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: res.tip,
                duration: 2000
              });
              this.getList();
            } else {
              this.$message({
                type: "error",
                message: res.tip,
                duration: 2000
              });
              this.getList();
            }
            this.dialogFormVisible = false;
          })
          .catch(err => {
            this.dialogFormVisible = false;
            // console.log(err);
          });
        this.getList();
      }
    },
    handleEdit(index, row) {
      this.loading = true;
      this.isDisabled = false;
      this.dialogtitleProcess = "修改 " + row.name + " 流水线的工序";
      this.form = this.list[index];
      this.currentIndex = index;
      this.dialogFormVisible = true;
      this.dialogif = "updateProcess";
      getObj(row.id).then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.loading = false;
          this.showType = [];
          this.allTypeTable = res.data.rows;
          res.data.rows.map(el => {
            if (!this.showType.includes(el.type)) {
              this.showType.push(el.type);
            }
          });
          this.currentSelectType = this.showType[0];
          // console.log(this.showType);
          // console.log(res.Data.rows)
        }else{
          this.loading = false;
          // this.$message({
          //   message:res.tip,
          //   type:"warning"
          // })
        }
      });
    },
    handleUpdate(row) {
      if (this.$refs["form"] == undefined) {
        this.resetTemp();
        this.dialogStatus = "update";
        this.dialogif = "updatePL";
        this.dialogFormVisible = true;
        this.form = {
          ...row
        };
      } else {
        this.resetTemp();
        this.dialogStatus = "update";
        this.dialogif = "updatePL";
        this.dialogFormVisible = true;
        this.form = {
          ...row
        };
        this.$refs["form"].resetFields();
      }
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(res => {
          this.$message({
            message: res.tip,
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
          if (this.form.name.replace(/(^\s+)|(\s+$)/g, "") == "") {
            this.newName = "";
            this.$message({
              message: "请输入流水线名称!",
              type: "warning",
              duration: 2000
            });
          } else if (parseInt(this.form.login_id) > 2147483647) {
            this.$message({
              showClose: true,
              message: "工号输入值过大！",
              type: "error"
            });
          } else {
            this.currentSelectProcess.map(el => {
              this.form[el] = true;
            });
            /**添加品类 */
            this.form.ids = this.categoryValue;
            addObj(this.form).then(res => {
              if (res.status == 200) {
                this.$message({
                  message: res.tip,
                  type: "success",
                  duration: 2000
                });
              } else {
                this.$message({
                  message: res.tip,
                  type: "error",
                  duration: 2000
                });
              }
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        } else {
          return false;
        }
      });
    },
    selectAble(val) {
      this.isSelect = val;
    },
    /**品类更改 */
    handleSelctCategory() {
      // this.$refs.category.style.border="border:1px solid red"
      this.$refs.category.$el.style;
    },
    cancel(formName) {
      this.dialogFormVisible = false;
      this.newName = "";
      this.form = {};
    },
    update(formName) {
      putObj(formName).then(res => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: res.tip,
            duration: 2000
          });
        } else {
          this.$message({
            type: "error",
            message: res.tip,
            duration: 2000
          });
        }
      });
    },
    /**修改生产线类型 */
    handleSureType() {
      // console.log(this.currentSelectProcess)
      let obj = {};
      this.processType.map(el => {
        if (this.currentSelectProcess.includes(el.value)) {
          obj[el.value] = true;
        } else {
          obj[el.value] = false;
        }
      });
      // this.currentSelectProcess.map(el=>{
      //   obj[el] = true
      // })
      // console.log(obj)
      obj.plid = this.currentPLID;
      updateprocess(obj).then(res => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.ReSelectType = false;
          this.getList();
        } else {
          let key = "";
          this.processType.map(el => {
            if (el.value == res.key) {
              key = el.label;
            }
          });
          this.$message({
            type: "warning",
            message: key + res.tip
          });
        }
      });
    },
    /**修改品类 */
    handleSureCategory() {
      // console.log(this.currentPLID)
      // console.log(this.currentSelectCategory)
      let data = {};
      data.PLID = this.currentPLID;
      data.ids = this.currentSelectCategory;
      UpdatePLCategory(data).then(res => {
        if (res.status == 200) {
          this.ReSelectType = false;
          this.$message({
            message: "修改成功",
            type: "success"
          });
          this.getList();
        } else {
          this.$message({
            message: "修改失败",
            type: "warning"
          });
        }
      });
    },
    /**选择流水线工序 */
    handleSelectType(e) {
      // console.log(e);
      // console.log(this.currentSelectType)
    },
    /**判断是否显示工序 */
    onShowProcess(process) {
      if (this.showType.includes(process)) {
        return true;
      } else {
        return false;
      }
    },
    handleShowSelectType(row, str) {
      this.$nextTick(() => {
        this.categoryOrProcess = str;

        if (str == "Process") {
          this.getDomWidth("currentSelectProcess");
          this.dialogtitleProcess = '修改工序类型'
        } else {
          this.getDomWidth("currentSelectCategory");
          this.dialogtitleProcess = '修改品类'

        }
      });
      this.ReSelectType = true;
      this.currentPLID = row.id;
      // console.log(row)
      // let arr = []
      //当前选择的品类
      // console.log(row)
      this.currentSelectCategory = row.PLCategory || [];
      //当前选择的工序
      for (const i in row) {
        if (typeof row[i] == "boolean") {
          if (row[i]) {
            this.currentSelectProcess.push(i);
          }
        }
      }
    },
    getDomWidth(dom) {
      let obj = {
        minWidth: "220px",
        maxWidth: "600px"
      };
      let width = 0;
      let arr = [];
      if (dom == "CreatecurrentSelectProcess") {
        arr = this.processType
          .map(el => {
            if (this.currentSelectProcess.includes(el.value)) {
              return el.label;
            }
          })
          .filter(el => {
            return el;
          });
        obj.width =
          (arr.length + 1) * 10 +
          35 +
          arr.length * 30 +
          arr.toString().replace(/,/g, "").length * 12 +
          "px";
        this.newWidthObj = obj;
      } else {
        if (dom == "categoryValue" || dom == "currentSelectCategory") {
          arr = this.categoryArr
            .map(el => {
              if (this[dom].includes(el.Id)) {
                return el.CategoryName;
              }
            })
            .filter(el => {
              return el;
            });
        } else if (dom == "currentSelectProcess") {
          arr = this.processType
            .map(el => {
              if (this[dom].includes(el.value)) {
                return el.label;
              }
            })
            .filter(el => {
              return el;
            });
        }
        //间隙+下拉框图标+关闭图标长度+文字长度
        obj.width =
          (arr.length + 1) * 10 +
          35 +
          arr.length * 30 +
          arr.toString().replace(/,/g, "").length * 12 +
          "px";
        this.widthObj = obj;
      }
    },
    updateForm(formName) {
      const set = this.$refs;
      var form1 = {};
      var reg = /^[0-9]{0,10}$/;
      this.form.login_id = this.form.login_id.toString();
      form1.loginid = this.form.login_id;
      // console.log(typeof(this.form.login_id))
      // toString()
      form1.plid = this.form.id;
      //  console.log(form1)
      set[formName].validate(valid => {
        if (valid && reg.test(form1.loginid)) {
          if (parseInt(form1.loginid) > 2147483647) {
            this.$message({
              showClose: true,
              message: "工号输入值过大！",
              type: "error"
            });
          } else {
            setObj(form1).then(res => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: res.tip
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.tip
                });
              }
              this.getList();
            });
            this.dialogFormVisible = false;
          }
          // console.log(form1)
        } else {
          this.$message({
            message: "输入有误!",
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    resetTemp() {
      this.form = {
        UserName: undefined,
        Phone: undefined,
        State: 1,
        Up: undefined,
        Down: 0,
        MAC: undefined,
        Remark: "",
        type: [],
        weight: 0,
        /**团订改版 */
        TG: false,
        /**成衣改版 */
        CG: false,
        /**其他改版 */
        OtherG: false,
        /**个订生产 */
        GD: false,
        /**团订生产 */
        TD: false,
        /**成衣生产 */
        CD: false
      };
      this.currentSelectProcess = [];
      this.categoryValue = [];
    },
    resetForm() {
      this.setForm = {
        delCode: 0,
        setCode: 0,
        name: "",
        id: 0
      };
    }
  },
  filters: {
    isName: function(row) {
      if (row.UserName == "" || row.UserName == null) {
        if (row.login_id == 0) {
          return "暂无主管";
        }
        return row.login_id;
      } else {
        return row.UserName;
      }
    },
    typeStyle(row) {
      let processType = [
        {
          value: "CD",
          label: "成衣生产"
        },
        {
          value: "TD",
          label: "团订生产"
        },
        {
          value: "GD",
          label: "个订生产"
        },
        {
          value: "TG",
          label: "团订改版"
        },
        {
          value: "CG",
          label: "成衣改版"
        },
        {
          value: "OtherG",
          label: "其他改版"
        }
      ];
      let arr = [];
      for (const i in row) {
        // console.log(typeof(row[i]))
        if (typeof row[i] == "boolean") {
          if (row[i]) {
            arr.push(i);
          }
        }
      }
      let result = processType
        .map(el => {
          if (arr.includes(el.value)) {
            return el.label;
          }
        })
        .filter(re => {
          return re;
        });
      // console.log(result.toString().replace(',',''))
      // return result

      if (result.length == 0) {
        return "暂未选择类型";
      }
      return result.join(" / ");
    }
  }
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
.SelectType {
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /*规定段落中的文本不进行换行 */
  max-width: 340px; /*需要配合宽度来使用*/
  /* font-size: 30px; */
}

.processChange .el-dialog__body {
  padding: 10px 20px 75px 20px;
}
.el-dialog__title{
  font-size: 15px;
}
.processChange .item{
  position: relative;
  bottom:2px;
}
.waterline{
  position: relative;
  top: 0;
  bottom: 0;
  left:0;
  right: 0;
}
.WaterLineDialog{
  /* border:1px solid red; */
  min-width: 600px;
}

</style>
