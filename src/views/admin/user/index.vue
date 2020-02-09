<template>
  <!-- EmployeeManagement --> 
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!-- <el-tooltip class="item" effect="light" content="点击添加员工" placement="top-start"> -->
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit"
        v-if="showAdd">添加</el-button>
      <!-- </el-tooltip> -->
    </div>
    <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row
      style="width: 100%">
      <!-- <el-table-column prop="Id" width="65" align="center" label="序号"> </el-table-column> -->
      <el-table-column align="center"  :width="onAutoWidth(130)" label="工号">
        <template scope="scope">
          <!-- <el-tooltip class="item" effect="light" content="点击修改员工信息" placement="top"> -->
          <span v-if="roleNum==2">
            {{ scope.row.login_id}}
          </span>
          <el-button type="text" @click="handleEdit(scope.$index, scope.row)" v-else>
            {{ scope.row.login_id}}
          </el-button>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column align="center" :width="onAutoWidth(140)" label="姓名" prop="name">
        <template scope="scope">
          <span
            v-if="scope.row.name.trim()!==''&&scope.row.name.trim()!==null||!showAdd">{{ scope.row.name | changespance}}</span>
          <!-- <el-tooltip  class="item" effect="light" content="点击删除该员工" placement="top-start"> -->
          <el-button v-else @click="handleDelete(scope.row)">删除</el-button>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column v-if="roleNum == '2'" align="center" label="流水线名称" prop="PLName"></el-table-column>
      <el-table-column v-if="roleNum !== '2'" prop="ProcessName" align="left"  label="工序" header-align="center" show-overflow-tooltip>
        <template scope="scope">
          {{scope.row | filterProcessName}}
        </template>
      </el-table-column>
      <el-table-column v-if="roleNum !== '2'" prop="ProcessName" align="left"   header-align="center" label="品类" show-overflow-tooltip>
        <template scope="scope">
          {{scope.row | filterCategories}}
        </template>
      </el-table-column>
      <el-table-column prop="phone"  :width="onAutoWidth(150)" align="center" label="手机"> </el-table-column>
      <el-table-column prop="last_time" :formatter="ChangeDateFormat" :width="onAutoWidth(180)"  align="center"   label="登陆时间"> </el-table-column>
      <el-table-column prop="computer" v-if="roleNum !== '2'" align="center"   label="电脑" > </el-table-column>
      <el-table-column prop="mach_id" v-if="roleNum !== '2'" align="center" label="设备ID" :width="onAutoWidth(90)"> </el-table-column>
       <el-table-column prop="grouping" v-if="roleNum !== '2'" align="center" label="分组" :width="onAutoWidth(90)" :formatter="selectGroup">
      </el-table-column>
      <el-table-column :width="onAutoWidth(140)" align="center" label="状态" >
        <template scope="scope">
          <el-select style="text-align:center" v-if="roleNum == '2'" v-model="scope.row.state" placeholder="请选择"
            @change="handleState(scope.row)" :key="scope.row.login_id">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-tag v-else :type="scope.row.state | statusFilter1">
            {{scope.row.state | statusFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" :width="onAutoWidth(180)">
        <template scope="scope">
          <el-button size="small" type="danger" @click="resetPwd({index:scope.$index, row:scope.row})" v-if="roleNum==2">
            重置密码
          </el-button>
          <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)" v-else>
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :listQuery="listQuery" @PageChange="getList" :total="total"></Pagination>
    <el-dialog v-dialogDrag title="创建用户" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="form" label-width="100px">
        <el-form-item label="工号：" :label-width="formLabelWidth" prop="login_id">
          <el-tooltip class="item" effect="light" content="必填,输入纯数字工号" placement="right">
            <el-input style="width:420px" :maxlength="10" v-model.number="form.login_id" auto-complete="off"></el-input>
          </el-tooltip>
        </el-form-item>
        <!-- <el-form-item label="工序：" :label-width="formLabelWidth" v-if="roleNum !== '2'" prop="process" :style="widthObj">
          <el-tooltip class="item" effect="light" content="必选，请选择工序" placement="right">
            <el-select v-model="showselectProcess" @change="changeSelected" multiple :disabled="isdisabled"
              @remove-tag="removeSelected" placeholder="请选择工序" style="width:420px">
              <el-option-group v-for="group in selectedOptions4" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-option-group>
            </el-select>
          </el-tooltip>
        </el-form-item> -->

    <el-form-item label="工序：" :label-width="formLabelWidth" v-if="roleNum !== '2'" prop="process" :style="widthObj">
          <!-- <el-tooltip class="item" effect="light" content="必选，请选择工序" placement="right">
            <el-select v-model="showselectProcess" @change="changeSelected" multiple :disabled="isdisabled"
              @remove-tag="removeSelected" placeholder="请选择工序" style="width:420px">
              <el-option-group v-for="group in selectedOptions4" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-option-group>
            </el-select>
          </el-tooltip> -->
            <el-table
    :data="selectedOptions4"
    border
    class="check-process"
    style="width: 75%">
    <el-table-column
    
      label="生产类型"
      width="180"
      align="center">
      <template scope="scope">
          {{scope.row.label}}
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="工序"
      align="left"
      header-align="center"
      width="" :render-header="handleHelp">
      <template scope="scope">
        <!-- {{scope.row.options}} -->
  <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(scope.row,scope.$index)">全选</el-checkbox> -->

  <el-checkbox-group v-model="showselectProcess" @change="handleCheckedCitiesChange($event)">
    <el-checkbox style="width:80px;margin:0;" v-for="item in scope.row.options" :key="item.code" :label="item.code" >{{item.name}}</el-checkbox>
  </el-checkbox-group>
</template>
    </el-table-column>
    
  </el-table>
        </el-form-item>

        <el-form-item label="品类：" :label-width="formLabelWidth" v-if="isShowCategories">
          <el-tooltip class="item" effect="light" content="必选,请选择品类" placement="right">
            <el-select :disabled="isdisabled" v-model="categories" :multiple-limit="10" multiple placeholder="请选择品类"
              style="width:420px">
              <el-option v-for="item in categoriesOption" :key="item.Id" :label="item.CategoryName" :value="item.Id">
              </el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>
        <el-form-item v-if="roleNum !== '2'" label="分组：" :label-width="formLabelWidth">
          <template>
            <el-tooltip class="item" effect="light" content="请选择分组" placement="right">
              <el-select :disabled="isdisabled" v-model="form['grouping']" style="width:420px">
                <el-option v-for="item in groups" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-tooltip>
          </template>
        </el-form-item>
     
        <el-form-item v-if="dialogStatus=='create'" label="姓名：" :label-width="formLabelWidth">
          <el-input style="width:420px" v-model="form.name"></el-input>
               <el-tooltip
          class="item"
          effect="light"
          content='姓名选填，未设置姓名的员工将无法申请任务！'
          placement="top"
        >
          <span>
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
        </el-form-item>
        <el-form-item v-if="dialogStatus=='create'" label="手机：" :label-width="formLabelWidth">
          <el-input style="width:420px" :minlength="11" :maxlength="11" v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <span v-if="dialogStatus=='create'">
          <el-button @click="cancel('form')">取 消</el-button>
          <el-button type="primary" @click="create('form')">确 定</el-button>
        </span>
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag title="修改" :visible.sync="UpdateDialogFormVisible">
      <el-form :rules="rules" ref="form" label-width="100px">

        <el-form-item label="工序：" :label-width="formLabelWidth" v-if="roleNum !== '2'" prop="process">
          <!-- <el-tooltip class="item" effect="light" content="必选，请选择工序" placement="right">
            <el-select style="width:420px" v-model="showselectProcess" @change="changeSelected" multiple
              :disabled="isdisabled"  @remove-tag="removeSelected" placeholder="请选择工序"
              :style="widthObj">
            
              <el-option-group v-for="group in selectedOptions4" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.code" :label="item.name" :value="item.code">
                </el-option>
              </el-option-group>
            </el-select>
          </el-tooltip> -->
          <!-- <el-tooltip
          class="item"
          effect="light"
          content='执行"特体检查"的人员,可以已经进行品类的选择,若不选择品类,则默认全选'
          placement="top"
        >
          <span>
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip> -->
          <el-table
    :data="selectedOptions4"
    border
     class="check-process"
    style="width: 75%">
    <el-table-column
    
      label="类型"
      width="180"
      align="center">
      <template scope="scope">
          {{scope.row.label}}
      </template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="工序"
      align="left"
      header-align="center"
      width="" :render-header="handleHelp">
      <template scope="scope">
        <!-- {{scope.row.options}} -->
  <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange(scope.row,scope.$index)">全选</el-checkbox> -->

  <el-checkbox-group v-model="showselectProcess" @change="handleCheckedCitiesChange($event)">
    <el-checkbox style="width:80px" v-for="item in scope.row.options" :key="item.code" :label="item.code" >{{item.name}}</el-checkbox>
  </el-checkbox-group>
</template>
    </el-table-column>
    
  </el-table>



        </el-form-item>
        <el-form-item label="品类：" :label-width="formLabelWidth" v-if="isShowCategories">
          <el-select style="width:420px" :disabled="isdisabled" v-model="categories" multiple
            placeholder="请选择品类">
            <el-option v-for="item in categoriesOption" :key="item.Id" :label="item.CategoryName" :value="item.Id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="roleNum !== '2'" label="设备ID：" prop="mach_id" :label-width="formLabelWidth">
          <el-input style="width:420px" :disabled="isdisabled" v-model="form.mach_id" auto-complete="off" :maxlength=10>
          </el-input>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <template>
            <el-select v-model="form.state" style="width:420px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item v-if="roleNum !== '2'" label="分组：" :label-width="formLabelWidth">
          <template>
            <el-tooltip class="item" effect="light" content="请选择分组" placement="right">
              <el-select style="width:420px" :disabled="isdisabled" v-model="form['grouping']">
                <el-option v-for="item in groups" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-tooltip>
          </template>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="resetPwd(currentSelect)">
          重置密码
        </el-button>
        <el-button @click="UpdateDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="update(form)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import helpicon from "assets/icon_help.png";
  import {TD,GD,DH} from '@/utils/const'
import { lookup, lookupService } from "dns";

</script>
<script>
  var IsWindowLoad = 0;
  import {
    page,
    addObj,
    getObj,
    delObj,
    putObj,
    getPersonal,
    showProcess,
    getCategory,
    getProcess
  } from "api/admin/user/index";
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
  import {
    mapGetters
  } from "vuex";
  // 这里要俺需要引入，我不是一个对象
  import {
    isvalidPhone
  } from "utils/validate";
  import Pagination from "@/components/Pagination";
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
      Pagination: Pagination
    },
    data() {
      return {
        value: 0,
        arr: [],
        state: 0,
        showselect: "",
        proName: "",
        processTip: "",
        categories: [],
        // isShowCategories: false,
        categoriesOption: [],
        showselectProcess: [],
        styleWidth: "width:180px",
        islimit: 3,
        selectindex: null,
        options1: [{
            value: "A",
            label: "成衣改版",
            children: []
            // [{
            //   value: 11,
            //   label: '下载样板'
            // }, {
            //   value: 13,
            //   label: '修改样板'
            // }, {
            //   value: 15,
            //   label: '放码'
            // }, {
            //   value: 16,
            //   label: '检查尺寸'
            // }, {
            //   value: 18,
            //   label: '估算用量'
            // }]
          },
          {
            value: "D",
            label: "成衣大货",
            children: []
            // [{
            //   value: 42,
            //   label: '导入订单'
            // }, {
            //   value: 43,
            //   label: '修改纸样'
            // }, {
            //   value: 45,
            //   label: '放码'
            // }, {
            //   value: 46,
            //   label: '检查'
            // }, {
            //   value: 48,
            //   label: '排料'
            // }]
          }
        ],
        options2: [{
            value: "C",
            label: "团订大货",
            children: [
              //     {
              //     value: '33',
              //     label: '尺码压缩',
              //     disabled: false
              //   }, {
              //     value: '34',
              //     label: '尺寸驱动',
              //     disabled: false
              //   }, {
              //     value: '35',
              //     label: '特体检查'
              //   }, {
              //     value: '37',
              //     label: '裁剪规划',
              //     disabled:false
              //   }
            ]
          },
          {
            value: "B",
            label: "团订改版",
            children: [
              //   {
              //   value: '22',
              //   label: '下载样板'
              // }, {
              //   value: '23',
              //   label: '修改样板'
              // }, {
              //   value: '25',
              //   label: '放码'
              // }, {
              //   value: '26',
              //   label: '检查尺寸'
              // }, {
              //   value: '27',
              //   label: '改驱动规则'
              // }
            ]
          }
        ],
        options3: [{
            value: "A",
            label: "成衣改版",
            children: []
            // [{
            //   value: 11,
            //   label: '下载样板'
            // }, {
            //   value: 13,
            //   label: '修改样板'
            // }, {
            //   value: 15,
            //   label: '放码'
            // }, {
            //   value: 16,
            //   label: '检查尺寸'
            // }, {
            //   value: 18,
            //   label: '估算用量'
            // }]
          },
          {
            value: "D",
            label: "成衣大货",
            children: []
          }
        ],
        options4: [{
            value: "C",
            label: "团订大货",
            children: [
          
            ]
          },
          {
            value: "B",
            label: "团订改版",
            children: [
          
            ]
          }
        ],
        /**所有工序列表 */
        processList:[],
        processType: [{
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
        select: 0,
        selectedOptions3: [],
        selectedOptions4: [],
        groups: [{
            value: 1,
            label: "1"
          },
          {
            value: 2,
            label: "2"
          },
          {
            value: 3,
            label: "3"
          },
          {
            value: 4,
            label: "4"
          },
          {
            value: 0,
            label: "不分组"
          }
        ],
        options: [{
            value: 0,
            label: "正常"
          },
          {
            value: 1,
            label: "病假"
          },
          {
            value: 3,
            label: "转岗"
          },
          {
            value: 5,
            label: "离职"
          }
        ],
        form: {
          state: 0,
          group: 0,
          processType: null,
          login_id: "",
          name: "",
          phone: "",
          codes:[]
        },
        formName: "",
        formPhone: "",
        rules: {
          login_id: [{
            type: "number",
            message: "请输入数字"
          }],
          UserName: [{
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
          Phone: [{
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
          ],
          phone: [{
              required: false,
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
          // mach_id: [{
          //   type: "number",
          //   message: "必须为数字"
          // }]
        },
        list: null,
        user: "",
        total: null,
        listLoading: true,
        widthObj: {},
        showAdd: null,
        listQuery: {
          page: 1,
          limit: Number(localStorage.getItem('totalPage') || 10),
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
        formLabelWidth: "80px",
        tableKey: 0,
        roleNum: getRole(),
        isdisabled: false,
        /**修改模态框 */
        UpdateDialogFormVisible: false,
        /**当前选择角色 */
        currentSelect: {},
        checkAll: true,
        checkedCodes: [],
        // cities: cityOptions,
        isIndeterminate: true
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = ["正常", "病假", "", "转岗", "", "离职"];
        return statusMap[status];
      },
      statusFilter1(status) {
        const statusMap = {
          0: "primary",
          1: "success",
          2: "warning",
          3: "danger"
        };
        return statusMap[status];
      },
      filterProcessName(row) {
        // let str = "";
        // row.ProcessName.forEach((element, index) => {
        //   if (element == "待定") {} else {
        //     str += element.CodeName + " ";
        //   }
        // });
        // return str;
        return row.ProcessName==null?'':row.ProcessName.map(el=>{
          if(el.CodeName.includes('TD')){
            return el.CodeName.replace('TD','团')
          }else if(el.CodeName.includes('GD')){
            return el.CodeName.replace('GD','个')
          }else if(el.CodeName.includes('CD')){
            return el.CodeName.replace('CD','成')
          }else if(el.CodeName.includes('TG')){
            return el.CodeName.replace('TG','改')
          }else if(el.CodeName.includes('CG')){
            return el.CodeName.replace('CG','改')
          }else{
            return el.CodeName
          }
        }).join(' ')
      },
      filterCategories(row){
        return row.CategoryName==null?'':row.CategoryName.map(el=>el.CategoryName).join(' ')
      },
      changespance(row) {
        return row.replace(/\s+/g, "");
      },
      
    },
    watch: {
      dialogFormVisible: function (val, oldVal) {
        setTimeout(() => {
          // this.getList(this.listQuery);
        }, 100);
        if (val == false) {
          // this.$router.push('/baseManager/EmployeeManagement')
          // location.reload()
          this.showselectProcess = [];
          // this.isShowCategories = false;
          this.categories = [];
          IsWindowLoad = 0;
        }
      },
      // showselectProcess: function (val, oldVal) {
      //   val.forEach(element => {
      //     if (element == 35 || element == "特体检查") {
      //       this.isShowCategories = true;
      //       getCategory().then(res => {
      //         if (res.status == 200) {
      //           this.categoriesOption = res.data.rows;
      //         }
      //       });
      //     }
      //      else {
      //       this.categories = [];
      //       this.isShowCategories = false;
      //     }
      //   });
      // },
      // showselectProcess(dom) {
      //   // console.log(dom)

      //   this.getDomWidth(dom)
      // },
      // categories: function () {
      //   let n = 150 + this.categories.length * 60;
      //   this.styleWidth = "width:" + n + "px";
      //   this.styleWidth += ";maxWidth:450px";
      // }
      showselectProcess(value) {

      }
    },
    async created() {
      // if(getRole() == "2"){
        await this.getCategory(this.$store.state.user.PLID)
      // }
      this.getList(this.listQuery);
      this.getPer();
      this.showAdd = getRole() == "1";
      if (getRole() == "2") {
        this.isdisabled = true;
      }
      // this.handleSelectProcess({id:14335})
    },
    computed: {
      isShowCategories: {
        get() {
          // return this.showselectProcess.includes(35)
          return true
        }
      },
    },
    methods: {
          handleHelp(h, { column }) {
      // console.log(column);
      return (
        <el-tooltip
          class="item"
          effect="light"
          content="工序必选,请选择工序！"
          placement="top"
        >
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
      );
    },
  //  handleCheckAllChange(row,index) {
  //    console.log(event)
  //   // console.log(row)
  //    console.log(index)
  //     this.checkAll=event.target.checked 
  //       this.checkedCodes = event.target.checked ? this.selectedOptions4.options : [];
  //       this.isIndeterminate = false;
  //     },
      handleCheckedCitiesChange(val) {
        console.log(val)
        this.form.codes = val;
        // console.log(arguments)

      },
      onAutoWidth(width){
        // console.log(this.role)
        if(this.roleNum==2){
          //管理员身份
          return ''
        }else{
          return width
        }
      },
      onCleanCategory(currentCategory){
        // console.log(currentCategory)
        currentCategory.map(item=>{
          if(item.CategoryName!=null){
            // console.log(item.CategoryName)
            item.CategoryName = item.CategoryName.filter(el=>{
              return this.categoriesOption.findIndex(i=>i.Id==el.Id)>=0
            })
          }else{
            return item
          }
        })
        // currentCategory.map()
        return currentCategory
      },
      getCategory(PLID) {
        return new Promise(resolve=>{
          getCategory({PLID}).then(res => {
            if (res.status == 200) {
              this.categoriesOption = res.data.rows;
            }
            resolve()
          })
        })
      },
      getPer() {
        if (getRole() !== "2") {
          getPersonal().then(res => {
            this.user = res.data.PLID;
            //将获取到的process添加到数组中
            this.handleSelectProcess({
              id: res.data.PLID
            })
            // this.showProcessArr(res.data.PLID);
          });
        }
      },
      showProcessArr(plid) {
        showProcess(plid).then(res => {
          var array = res.data.rows;
          var children = [];
          for (var element of array) {
            if (element.state == 1) {
              var obj = {};
              obj.value = element.code;
              obj.label = element.name;
              this.options1[0].children.push(obj)
              // if (element.code < 30 && element.code > 20) {
              //   var obj = {}
              //   obj.value = element.code;
              //   obj.label = element.name;
              //   this.options2[1].children.push(obj)
              // } else if (element.code < 40 && element.code > 30) {
              //   var obj = {}
              //   obj.value = element.code;
              //   obj.label = element.name;
              //   this.options2[0].children.push(obj)
              // } else if (element.code < 20 && element.code > 10) {
              //   var obj = {}
              //   obj.value = element.code;
              //   obj.label = element.name;
              //   this.options1[0].children.push(obj)
              // } else if (element.code < 50 && element.code > 40) {
              //   var obj = {}
              //   obj.value = element.code;
              //   obj.label = element.name;
              //   this.options1[1].children.push(obj)
              // }
            }
          }
          // array.forEach(element => {
          //   if (element.state == 1) {
          //     if (element.code < 30 && element.code > 20) {
          //       var obj = {}
          //       obj.value = element.code;
          //       obj.label = element.name;
          //       this.options2[1].children.push(obj)
          //     } else if (element.code < 40 && element.code > 30) {
          //       var obj = {}
          //       obj.value = element.code;
          //       obj.label = element.name;
          //       this.options2[0].children.push(obj)
          //     } else if (element.code < 20 && element.code > 10) {
          //       var obj = {}
          //       obj.value = element.code;
          //       obj.label = element.name;
          //       this.options1[0].children.push(obj)
          //     } else if (element.code < 50 && element.code > 40) {
          //       var obj = {}
          //       obj.value = element.code;
          //       obj.label = element.name;
          //       this.options1[1].children.push(obj)
          //     }
          //   }
          // });
          // selectObj(this.user).then(res => {
          //   this.processTip = res.tip;
          //   if (this.processTip !== "1") {
          //      this.options1 = this.options2;
          //      this.options3 = this.options1;
          //   }
          // })
          this.selectedOptions4 = this.options1[0].children;
        });
      },
      showProcessArr1(plid) {
        this.options1[0].children = [];
        this.options1[1].children = [];
        this.options2[0].children = [];
        this.options2[1].children = [];
        showProcess(plid).then(res => {
          var array = res.data.rows;
          var children = [];
          for (var element of array) {
            if (element.state == 1) {
              var obj = {};
              obj.value = element.code;
              obj.label = element.name;
              this.options1[0].children.push(obj);
              // if (element.code < 30 && element.code > 20) {
              //   var obj = {}
              //   obj.value = element.code;
              //   obj.label = element.name;
              //   this.options2[1].children.push(obj)
              // } else if (element.code < 40 && element.code > 30) {
              //   var obj = {}
              //   obj.value = element.code;
              //   obj.label = element.name;
              //   this.options2[0].children.push(obj)
              // } else if (element.code < 20 && element.code > 10) {
              //   var obj = {}
              //   obj.value = element.code;
              //   obj.label = element.name;
              //   this.options1[0].children.push(obj)
              // } else if (element.code < 50 && element.code > 40) {
              //   var obj = {}
              //   obj.value = element.code;
              //   obj.label = element.name;
              //   this.options1[1].children.push(obj)
              // }
            }
          }
        });
      },
      // changeShowselect(val) {
      //   if (IsWindowLoad != 0) {
      //     this.showselectProcess = [];
      //     this.selectedOptions3.push(val);
      //     this.options1.forEach(element => {
      //       if (element.value == val) {
      //         // 对于的工序列表
      //         this.selectedOptions4 = element.children;
      //       }
      //     });
      //   }
      // },
      changeShow(val) {
        IsWindowLoad = 1;
      },
      changeSelected(val) {
        // console.log(val);
          this.form.codes = val;
        // this.getDomWidth('showselectProcess')
      },
      removeSelected(val) {
    
      },
      handleState(val) {
        //     var stateForm ={};
        //     stateForm =val
       
          val.ProcessName.map(el =>{
          this.form.codes.push(el.Code);
       
        })
         val.codes= this.form.codes;
        // console.log(this.form.codes);
        putObj(val).then(response => {
          if (response.status === 200) {
            this.dialogFormVisible = false;
            this.$message({
              message: response.tip,
              type: "success",
              duration: 2000
            });
            this.getList(this.listQuery);
          } else {
            //失败提示
            this.$message({
              message: response.tip,
              type: "warning",
              duration: 2000
            });
          }
        });
      },
      handleChange(arg) {
        this.form.code = arg[1];
        this.selectedOptions3 = arg;
      },
      getList(listQuery) {
        this.listQuery = listQuery;
        this.listLoading = true;
        page(this.listQuery)
          .then(response => {
            this.list = this.onCleanCategory(response.data.rows);
            this.total = response.data.total;
            this.listLoading = false;
            // console.log(this.list)
          })
          .catch(err => {
            this.listLoading = false;
          });
      },

      change(row) {
        putObj(row).then(response => {
          if (response.status === 200) {
            this.dialogFormVisible = false;
            this.$message({
              offset: 700,
              title: "成功",
              message: "更新成功",
              type: "success",
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
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList(this.listQuery);
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList(this.listQuery);
      },
      handleCreate() {
        this.resetTemp();
        this.showselectProcess = [];
        this.islimit = 3;
        this.dialogStatus = "create";
        this.dialogFormVisible = true;
        getProcess({
          id: this.user
        }).then(res => {
          this.processTip = res.tip;
        });

      },
      /**选择工序 */
      handleSelectProcess(id) {
        getProcess(id).then(res => {
          if (res.status == 200) {
            let arr = this.groupbyProcess(res.data.rows)
            // this.processList = res.data.rows;
            // console.log(arr)
            let array = []
            for (const i in arr) {
              let t = {
                options: [],
                label: ""
              }
              arr[i].map(el => {
                if(el.state==1){
                    t.options.push({
                    name: el.name,
                    code: el.code
                  })
                }
              })
              this.processType.map(el => {
                if (el.value == i) {
                  t.label = el.label
                }
              })
              array.push(t)
            }
            this.selectedOptions4 = array
          }
        })
      },
      /**工序分组 */
      groupbyProcess(array) {
        let arr = {}
        // console.log(array)
        array.map(el => {
          if (arr.hasOwnProperty(el.type)) {
            arr[el.type].push(el)
          } else {
            arr[el.type] = [el]
          }
        })
        return arr
      },
      getProcseeArr(row) {
        // console.log(row)
 
      },
      handleEdit(index, row) {
        this.showselectProcess = [];
        this.currentSelect = {
          index,
          row
        }

        if (getRole() == "2") {
          this.showProcessArr1(row.PLID);
          var arr = [];
          this.form = this.list[index];
          this.proName = row.name;
          this.UpdateDialogFormVisible = true;
          this.currentIndex = index;
        }
        var arr = [];
        this.form = this.list[index];
        this.proName = row.name;
        this.UpdateDialogFormVisible = true;
        this.currentIndex = index;
        row.ProcessName.map(el =>{
          this.showselectProcess.push(el.Code);
       
        })
        this.form.codes=this.showselectProcess;
        // this.categories = row.CategoryName[0].Id
        //获取品类值
        var arr = [];
        if(row.CategoryName!=null){
          row.CategoryName.forEach(element => {
            arr.push(element.Id);
          });
        }
          this.categories = arr;
          
          // console.log(this.showselectProcess);
      },
      selectGroup(row) {
        if (row.grouping == 0) {
          return "不分组";
        } else {
          return row.grouping;
        }
      },
      processSelect(row) {
        if (row.indexOf(35) != -1) {}
      },
      handleDelete(row) {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          delObj(row).then(res => {
            if (res.status == 200) {
              this.$message({
            
                type: "success",
                message: res.tip
              });
              if (row.login_id == this.$store.state.user.login_id) {
                this.$store.dispatch("FedLogOut").then(() => {
                  location.reload(); // 为了重新实例化vue-router对象 避免bug
                });
              }
              this.getList(this.listQuery);
            } else {
              this.$message({
                type: "error",
                message: res.tip
              });
              this.getList(this.listQuery);
            }
          });
        });
      },
      resetPwd({index,row}) {
        this.$confirm("此操作将重置密码, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          // console.log(row)
          row.password = 888888;
          row.codes= this.form.codes;
      //  console.log(this.form)
          putObj(row).then(res => {
            if(res.status == 200){
              this.$message({
              message: "重置成功密码为888888",
              type: "success",
              duration: 2000
            });
            }else{
              this.$message({
              message: res.tip,
              type: "error",
              duration: 2000
            });
            }
          
          });
        });
      },
      create(formName) {
        const set = this.$refs;
        this.form.plid = this.user;
        // this.form.name= this.formName;
        // this.form.phone = this.formPhone;
        var reg = /^[0-9]{1,10}$/;
        if (this.form.login_id == undefined) {
          this.$message({
            showClose: true,
            message: "请输入数字工号!",
            type: "error",
            duration: 2000
          });
          return false;
        } else if (!reg.test(this.form.login_id)) {
          this.$message({
            showClose: true,
            message: "输入工号有误!",
            type: "error",
            duration: 2000
          });
          return false;
        } else if (parseInt(this.form.login_id) > 2147483647) {
          this.$message({
            showClose: true,
            message: "工号输入值过大！",
            type: "error"
          });
          return false;
        } 
        else if (this.showselectProcess.length == 0) {
          this.$message({
            showClose: true,
            message: "请选择工序",
            type: "error",
            duration: 2000
          });
          return false;
        } else if (this.form.phone != undefined) {
          if (!isvalidPhone(this.form.phone)) {
            this.$message({
              showClose: true,
              message: "请输入正确的手机号！",
              type: "error",
              duration: 2000
            });
            return false;
          }
        } else {
          this.form.phone = "";
        }
        if(this.categories.length == 0){
           this.$message({
              showClose: true,
              message: "请选择品类！",
              type: "error",
              duration: 2000
            });
            return false
        }
         var categories = [];
        this.categoriesOption.map((row, index) => {
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i] == row.Id) {
              categories.push(row);
            }
          }
        });
        this.form.categories = categories;
        this.form.name = this.form.name.replace(/\s+/g, "");
        // console.log(this.categories)
        //  console.log(this.form.categories)
        addObj(this.form).then(res => {
          if (res.status == 200) {
            this.dialogFormVisible = false;
            this.getList(this.listQuery);
            this.$message({
              offset: 700,
              title: "成功",
              message: res.tip,
              type: "success",
              duration: 2000
            });
          } else if (res.status == 201) {
            this.dialogFormVisible = false;
            this.$message({
              offset: 700,
              title: "失败",
              message: res.tip,
              type: "warning",
              duration: 2000
            });
            this.getList(this.listQuery);
          }
        });

     
      },
      cancel(formName) {
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
        this.getList(this.listQuery);
      },
      update(formName) {
        // const set = this.$refs;
        // this.$refs[formName].resetFields();
        // set[formName].validate(valid => {
        //   if (valid) {
        //     this.dialogFormVisible = false;
        // this.form.password = undefined;
        var reg = /^[0-9]{1,10}$/;
        this.form.plid = this.user;
       if (this.showselectProcess.length == 0) {
          this.$message({
            showClose: true,
            message: "请选择工序",
            type: "error",
            duration: 2000
          });
          return false;
        }
      if(this.categories.length == 0){
           this.$message({
              showClose: true,
              message: "请选择品类！",
              type: "error",
              duration: 2000
            });
            return false
        }
        var categories = [];
        this.categoriesOption.map((row, index) => {
          for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i] == row.Id) {
              categories.push(row);
            }
          }
        });
        this.form.categories = categories;
        if (!reg.test(this.form.mach_id)) {
          this.$message({
            showClose: true,
            message: "输入有误,请输入数字！",
            type: "error",
            duration: 2000
          });
        } else if (parseInt(this.form.mach_id) > 2147483647) {
          this.$message({
            showClose: true,
            message: "输入值过大！",
            type: "error"
          });
        } else {
          // console.log(this.form);
          putObj(this.form).then(response => {
            if (response.status === 200) {
              this.dialogFormVisible = false;
              this.UpdateDialogFormVisible = false;
              this.$message({
                title: "成功",
                message: response.tip,
                type: "success",
                duration: 2000
              });
              this.getList(this.listQuery);
            } else {
              //失败提示
              this.$message({
                message: response.tip,
                type: "warning",
                duration: 2000
              });
            }
          });
        }
      },
      resetTemp() {
        this.form = {};

        // this.form.login_id ='';
        this.form.phone = "";
        this.categories = [];
        //   this.form.plid ='';
        //    this.form.code ='';
        //     this.form.code2 ='';
        //      this.form.code3 ='';
        this.form.name = "";
        this.selectedOptions3 = [];
      }
    }
  };

</script>
<style >

</style>
<style lang="scss" scoped>
.check-process /deep/ .el-checkbox+.el-checkbox{
   margin-left: 0px;
}
</style>
