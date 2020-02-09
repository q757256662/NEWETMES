<template>
  <div style="min-width:1300px;" class="app-container calendar-list-container">
    <!-- orderSearch -->
    <div class="order-search-top">
      <el-select v-model="form.type" placeholder="请选择" style="width: 8%;" @change="changeType">
        <el-option-group key="group.label" label="类型">
          <el-option
            v-for="item in TypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-option-group>
      </el-select>
      <span v-if="form.type == 'td'"></span>
      <el-input
        v-if="form.type == 'td'"
        @keyup.enter.native="handleFilter"
        style="width: 6.5%;min-width:120px"
        class="filter-item"
        placeholder="请输入样板名"
        v-model="form.ModelName"
      ></el-input>
      <!-- 搜索条件时传的参数名一样 -->
      <span v-if="form.type !== 'td'"></span>
      <el-input
        v-if="form.type !== 'td'"
        @keyup.enter.native="handleFilter"
        style="width: 6.5%;min-width:120px"
        class="filter-item"
        placeholder="请输入款名"
        v-model="form.ModelName"
      ></el-input>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 6.5%;min-width:120px"
        class="filter-item"
        placeholder="请输入客户名"
        v-model="form.cusName"
      ></el-input>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 7.5%;min-width:120px"
        class="filter-item"
        placeholder="请输入生产单号"
        v-model="form.OrderId"
      ></el-input>
      <el-select
        v-model="form.State"
        placeholder="请选择"
        style="width: 8%;min-width:120px"
        @change="selectStaus"
      >
        <el-option-group key="group.label" label="状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-option-group>
      </el-select>
      <el-select v-model="form.sTime" placeholder="请选择创建时间" style="width: 10%;min-width:120px">
        <el-option label="全部" value="''"></el-option>
        <el-option
          v-for="item in optiontimes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
        <!-- <el-popover ref="popover5" placement="top" trigger="hover">
        <h3 style="margin-top:0px;">绑定说明</h3>
        1.选择对应的选项查看生产单。 <br/> 2.团订进行中和延期的生产单才可以绑定。
        <br> 3.绑定条件：
        <br> ①物料相同②样式一致③样式不一致
        <br> ④人员（指订单里的ID）人数、件数一致（两个订单之间每个人的件数能配套）。
        <br> 符合①②或者①③④情况才能够绑定。
        </el-popover>-->
      </el-select>
      <span v-if="form.type !== 'gd'">件数：</span>
      <el-input
        v-if="form.type !== 'gd'"
        @keyup.enter.native="handleFilter"
        style="width: 3.5%;min-width:120px"
        class="filter-item"
        v-model="form.Yield"
        type="number"
      ></el-input>绑定：
      <!-- <el-switch :width=70  on-value=1 off-value=0 on-text="绑定" off-text="未绑定" v-model="form['IsBind']"></el-switch>  -->
      <el-select
        v-model="form.bingNum"
        placeholder="请选择"
        style="width: 8%;min-width:120px"
        @change="selectBindStaus"
      >
        <el-option
          v-for="item in changeoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!-- <img v-popover:popover5 style="opacity: 0.5;width: 17px; " src="static/img/icon_help.png" alt="" srcset=""> -->
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 600px;" class="filter-item" placeholder="输入公司名、地址关键字或锁号" v-model="listQuery.query"> </el-input> -->
      <el-button
        style="margin-left:8px"
        class="filter-item"
        type="primary"
        v-waves
        icon="search"
        @click="handleFilter"
      >搜索</el-button>
      <!-- <el-button class="filter-item" type="primary" v-waves icon="check" @click="handleBind" style="float:right" v-if="selectState==='unSelect' && form.type == 'td'">绑定</el-button> -->
      <el-button
        class="filter-item"
        type="primary"
        v-waves
        icon="check"
        @click="handleUnBind"
        style="float:right"
        v-if="selectState==='selected'"
      >解绑</el-button>
    </div>
    <div class="filter-container"></div>
    <el-table
      @sort-change="sortChange"
      :key="tableKey"
      ref="multipleTable"
      :data="list"
      v-loading.body="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-class-name="selectColor"
      :row-key="rowKey"
    >
      <!-- <el-table-column prop="model_name" width="100px" align="center" label="样板名"> </el-table-column>  -->
      <!-- <el-table-column type="selection" width="55" :selectable="isSelect" v-if="form.State==1"></el-table-column> -->
      <!-- <el-table-column type="selection" width="55px" :selectable="isSelect" v-if="form.State==1 || form.State==3"></el-table-column> -->
      <el-table-column type="selection" width="55px" :selectable="isSelect" v-if="defaultShow"></el-table-column>
      <el-table-column
        prop="BindId"
        key="BindId"
        align="center"
        width="80px"
        label="绑定号"
        v-if="defaultShow"
        :formatter="isBind"
      ></el-table-column>
      <el-table-column
        align="center"
        key="OrderId"
        highlight-current-row="true"
        label="生产单号"
        :render-header="handleHelp"
      >
        <template scope="scope">
          <a
            style="text-decoration:underline; 	color:#20a0ff"
            @click="routerLink('生产单详情','process',scope.row)"
          >{{ scope.row.OrderId }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="cusName" key="cusName" align="center" label="客户名称"></el-table-column>
      <el-table-column
        v-if="form.type == 'td'"
        prop="ModelName"
        key="ModelName"
        align="center"
        label="样板名"
        :render-header="handleHelp"
      >
        <template scope="scope">
          <a
            href="javascript:"
            style="text-decoration:underline; 	color:#20a0ff"
            @click="handleModelView(scope.row)"
          >{{scope.row.ModelName}}</a>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type !== 'td'"
        key="StyleName"
        prop="ModelName"
        align="center"
        label="样式名"
      >
        <template scope="scope">{{scope.row.ModelName}}</template>
      </el-table-column>
      <el-table-column prop="nature" key="nature" align="center" width="105px" label="订单性质"></el-table-column>
      <el-table-column align="center" key="rank" label="优先级">
        <template scope="scope">
          <el-select
            @visible-change="changeShow"
            @change="ChangeRank($event,scope.row)"
            v-if="rolePower ==1 && scope.row.State == 1 "
            v-model="scope.row.rank"
            placeholder="请选择"
          >
            <el-option
              v-for="item in optionsRank"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span v-else>{{scope.row.rank | isRankStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mCode" key="mCode" align="center" label="物料名">
        <template scope="scope">
          <a
            style="text-decoration:underline; 	color:#20a0ff"
            @click="routerLink('生产单详情','material',scope.row)"
          >{{ scope.row.mCode }}</a>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type !== 'gd'"
        prop="Yield"
        key="Yield"
        width="70px"
        align="center"
        label="件数"
      >
        <template scope="scope">
          <a
            style="text-decoration:underline; 	color:#20a0ff"
            @click="routerLink('生产单详情','Yield',scope.row)"
          >{{ scope.row.Yield }}</a>
        </template>
      </el-table-column>
      <el-table-column
        v-if="form.type !== 'gd' && form.type !== 'dh'"
        prop="Pod"
        key="Pod"
        width="80px"
        align="center"
        label="特体数"
      >
        <template scope="scope">
          <a
            style="text-decoration:underline; 	color:#20a0ff"
            @click="routerLink('生产单详情','pod',scope.row)"
          >{{ scope.row.Pod }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="Bed" width="70px" key="Bed" align="center" label="床数">
        <template scope="scope">
          <a
            style="text-decoration:underline; 	color:#20a0ff"
            @click="routerLink('生产单详情','bed',scope.row)"
          >{{ scope.row.Bed }}</a>
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="Time"
        align="center"
        key="Time"
        width="115px"
        label="创建时间"
        :formatter="ChangeDateFormat"
      ></el-table-column>
      <el-table-column
        sortable="custom"
        prop="fTime"
        align="center"
        key="fTime"
        width="115px"
        label="交货时间"
        :formatter="ChangeDateFormat"
      ></el-table-column>
      <el-table-column
        width="125px"
        key="process"
        v-show="form.State == 1 || form.State ==  3"
        align="center"
        label="进度"
      >
        <template scope="scope">
          <span v-if="scope.row.State == 2" style="color:rgb(19, 206, 102)">已完成</span>
          <span v-else>{{scope.row | changeProcessName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" key="button" width="142px" label="编辑">
        <template scope="scope">
          <el-button
            size="mini"
            v-show="form.State == 1 || form.State ==  3"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
          >删除</el-button>
          <el-button
            size="mini"
            v-show="form.State == 0 || form.State ==  2"
            type="danger"
            @click="handleEdit(scope.$index, scope.row)"
          >删除</el-button>
          <!-- <el-button size="mini" type="warning" style="width:100px; margin-left:0px;margin-bottom:2px;background-color:#F7920F" v-show="form.State == 1 || form.State ==  3" @click="handleEditChange(scope.$index, scope.row)">
          设定裁剪规划
          </el-button>-->
          <!-- </el-tooltip> -->
          <!-- 主管权限删除 -->
          <!-- <el-button v-if="rolePower == 1" size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">
                    删除
          </el-button>-->
          <!-- <span  v-if="rolePower !== 1" >暂无操作</span> -->
          <!-- 主管权限删除 -->
          <el-button
            v-show="scope.row.State == 2"
            size="mini"
            :loading="isloading == scope.$index"
            type="success"
            @click="handleRest(scope.$index, scope.row)"
          >重置</el-button>
          <el-button
            v-show="scope.row.State==5"
            size="mini"
            @click="handleReason(scope.row.OrderId)"
          >查看原因</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :listQuery="listQuery" @PageChange="getList" :total="total"></Pagination>
    <div v-if="false">
      <router-link :to="{name:'BOM'}">BOM</router-link>
      <router-link :to="{name:'Mark'}">Mark</router-link>
      <router-link :to="{name:'LSH'}">LSH</router-link>
      <router-link :to="{name:'上传生产单文件'}">SaveOrderFile</router-link>
      <router-link :to="{name:'上传版单文件'}">SaveModelFile</router-link>
      <router-link :to="{name:'详情'}">Detail</router-link>
      <router-link :to="{name:'ReDownload'}">ReDownload</router-link>
      <router-link :to="{name:'系统工具'}">系统工具</router-link>
    </div>
    <el-dialog v-dialogDrag title="样板名详细" :visible.sync="dialogFormVisible" class="message-box">
      <div class="table-message">
        <b>
          服装分类名：
          <span>{{form1.Type}}</span>
        </b>
        <b>
          客户/品牌：
          <span>{{form1.Brand}}</span>
        </b>
        <b>
          创建时间：
          <span v-if="form1 !==''">{{form1.Time | changeTime}}</span>
          <span v-else>{{form1.Time | changeTime}}</span>
        </b>
      </div>
      <div class="table-img">
        <img :src="'/'+form1.Image" alt style="wisth:100px;height:100px" />
      </div>
    </el-dialog>
    <el-dialog v-dialogDrag size="tiny" title="选择移交员工" :visible.sync="dialogRemove">
      <el-radio
        class="checkRadio"
        :key="item.LoginId"
        v-for="item in optionsRemove"
        v-model="radioRemove"
        :label="item.LoginId"
      >
        {{item.Name}}
        <span>（{{item.LoginId}}）</span>
      </el-radio>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleRemove">取 消</el-button>
        <el-button type="primary" @click="sureRemovePod">确 定</el-button>
        <!-- <el-button type="primary" v-else @click="sureRemove">确 定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="错误原因" :visible.sync="resonVisible">
      <el-table :data="resonList" style="width: 100%" border :show-header="false">
        <el-table-column prop="name" width="100px">
        </el-table-column>
        <el-table-column prop="value">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="resonVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  page,
  addObj,
  getObj,
  delObj,
  delOrder,
  putObj,
  bindObj,
  unBindObj,
  downObj,
  getProcess,
  restOrder,
  editObj,
  editRemove,
  GetRequestsByOrderName
} from "api/admin/orderSearch";
import Pagination from "@/components/Pagination";
import { getremoveInfo, removeProcess, removePod } from "api/admin/orderDetail";
import { getToken, getRole } from "utils/auth";
//获取页面参数
import { GetUrlParam,crtTimeFtt } from "utils/index";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";
export default {
  name: "user",
  components: {
    Pagination: Pagination
  },
  data() {
    return {
      options: [
        {
          value: 0,
          label: "废弃"
        },
        {
          value: 1,
          label: "进行中"
        },
        {
          value: 2,
          label: "已完成"
        },
        {
          value: 3,
          label: "延期"
        },
        {
          value: 4,
          label: "待处理"
        },
        {
          value: 5,
          label: "推送失败"
        }
      ],
      changeoptions: [
        {
          value: 0,
          label: "未绑定"
        },
        {
          value: 1,
          label: "绑定"
        },
        {
          value: -1,
          label: "全部"
        }
      ],
      TypeOptions: [
        {
          value: "td",
          label: "团订生产"
        },
        {
          value: "gd",
          label: "个订生产"
        },
        {
          value: "dh",
          label: "成衣生产"
        }
      ],
      optionsRank: [
        {
          value: 0,
          label: "普通"
        },
        {
          value: 1,
          label: "优先"
        },
        {
          value: 2,
          label: "加急"
        }
      ],
      optiontimes: [
        {
          value:
            new Date(new Date().getTime() - 3600 * 1000 * 24 * 7)
              .toLocaleDateString()
              .replace(/\//g, "-") + "-00:00",
          label: "1周内"
        },
        {
          value:
            new Date(new Date().getTime() - 3600 * 1000 * 24 * 7 * 2)
              .toLocaleDateString()
              .replace(/\//g, "-") + "-00:00",
          label: "2周内"
        },
        {
          value:
            new Date(new Date().getTime() - 3600 * 1000 * 24 * 7 * 3)
              .toLocaleDateString()
              .replace(/\//g, "-") + "-00:00",
          label: "3周内"
        },
        {
          value:
            new Date(new Date().getTime() - 3600 * 1000 * 24 * 7 * 4)
              .toLocaleDateString()
              .replace(/\//g, "-") + "-00:00",
          label: "4周内"
        }
      ],
      isBinding: [
        {
          value: 1,
          label: "绑定"
        },
        {
          value: 0,
          label: "未绑定"
        }
      ],
      defaultShow: false,
      form: {
        type: "td",
        Type: null,
        Brand: null,
        Time: "/Date(1530236079340)/",
        Bed: undefined,
        cusName: "",
        Id: null,
        ModelName: undefined,
        OrderId: null,
        State: 1,
        sTime: undefined,
        eTime: undefined,
        IsBind: 1,
        bingNum: -1,
        page: 1,
        limit: Number(localStorage.getItem("totalPage") || 10),
        Yield: 0,
        orderBy: -1,
        AscOrDesc: "desc"
      },
      form1: {
        Type: null,
        Brand: null,
        Time: "/Date(1530236079340)/",
        Bed: undefined,
        cusName: "",
        Id: null,
        ModelName: undefined,
        OrderId: null,
        State: 1,
        sTime: undefined,
        eTime: undefined,
        IsBind: 1,
        bingNum: -1,
        page: 1,
        limit: Number(localStorage.getItem("totalPage") || 10),
        Yield: 0,
        orderBy: -1,
        AscOrDesc: "desc"
      },
      isloading: -1,
      selectState: "",
      arr: [],
      value8: "",
      value7: "",
      indexColor: 1,
      value9: "",
      colorIndex: 0,
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
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: Number(localStorage.getItem("totalPage") || 10)
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
      formLabelWidth: "80px",
      tableKey: 0,
      createdForm: {},
      rolePower: getRole(),
      flag: 0,
      dialogRemove: false,
      optionsRemove: null,
      radioRemove: "",
      removeId: "",
      formInfo: {},
      /**错误原因模态框 */
      resonVisible: false,
      resonList:[]
    };
  },
  beforeCreate() {},
  created() {
    if (this.$route.params.stateCode == 1 || this.$route.query.stateCode == 1) {
      // console.log('----------------------')
      this.createdForm.State = 3;
      this.form.State = 3;
      this.getList(this.createdForm);
    } else if (this.$route.query.State) {
      this.form.State = Number(this.$route.query.State);
      this.getList(this.form);
    } else {
      this.$store.state.user.orderState.toString() &&
        (this.form.State = this.$store.state.user.orderState);
      //  this.$store.state.user.ordertype && (this.form.type = this.$store.state.user.ordertype);
      this.form.type = localStorage.getItem("GetOrderType") || "td";
      // this.$store.state.user.bindorderStatus.toString()&&(this.form.bingNum = this.$store.state.user.bindorderStatus)
      if (
        this.$store.state.user.bindorderStatus.toString() == "0" ||
        this.$store.state.user.bindorderStatus.toString() == "1"
      ) {
        this.$store.state.user.bindorderStatus.toString() &&
          (this.form.bingNum = this.$store.state.user.bindorderStatus);
        this.defaultShow = true;
        if (
          this.$store.state.user.orderState.toString() == "0" ||
          this.$store.state.user.orderState.toString() == "2"
        ) {
          this.defaultShow = false;
        }
      }
      this.getList(this.form);
      //  this.gotoDetail();
    }
  },
  mounted() {
    // alert(window.location);
    // setTimeout(() => {
    //   if (GetUrlParam('projectID') !== '' && localStorage.getItem('type') == 'order') {
    //     this.$router.push({
    //       path: '/baseManager/Detail',
    //       query: {
    //         projectID: GetUrlParam('projectID'),
    //         type: 'order'
    //       }
    //     });
    //   }
    // }, 200)
  },
  computed: {
    ...mapGetters(["elements"])
  },
  methods: {
    /**推送失败原因 */
    handleReason(name) {
      GetRequestsByOrderName({ orderName: name }).then(res => {
        if(res.status==200){
          // this.resonList=res.data.rows
          this.resonList=[{name:"推送时间",value:this.crtTimeFtt(res.data.rows[0].RequestTime)},{name:"错误代码",value:JSON.parse(res.data.rows[0].ResponseData).errcode},{name:"错误原因",value:JSON.parse(res.data.rows[0].ResponseData).errmsg}]
          
          this.resonVisible = true
        }else{
          this.$message.warning(res.tip)
        }
      });
    },
    //element 1.4版本表格排序监听方法
    sortChange({ column, prop, order }) {
      // console.log(column);
      // console.log(prop)
      // console.log(order)
      if (prop == "Time") {
        if (order == "ascending") {
          this.form.orderBy = 1; //创建时间
          this.form.AscOrDesc = "asc";
        } else {
          this.form.orderBy = 1;
          this.form.AscOrDesc = "desc";
        }
        this.getList(this.form);
      } else if (prop == "fTime") {
        // 交货时间
        if (order == "ascending") {
          this.form.orderBy = 2;
          this.form.AscOrDesc = "asc";
        } else {
          this.form.orderBy = 2;
          this.form.AscOrDesc = "desc";
        }
        this.getList(this.form);
      }
    },
    rowKey(row) {
      // console.log(row)
      return row.Id;
    },
    handleHelp(h, { column }) {
      // console.log(column);
      var str = "点击进入" + column.label + "详情";
      if (column.label == "样板名") {
        var str = "点击显示" + column.label + "详情";
      }
      return (
        <el-tooltip class="item" effect="light" content={str} placement="top">
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile"></img>
          </span>
        </el-tooltip>
      );
    },
    changeType(e) {
      this.$store.dispatch("GetOrderType", e).then(() => {
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
      localStorage.setItem("GetOrderType", e);
      if (e == "gd") {
        this.form.Yield = "";
        this.handleFilter();
      } else {
        this.handleFilter();
      }
    },
    gotoDetail() {
      var that = this;
      this.$nextTick().then(function() {
        if (
          GetUrlParam("projectID") !== "" &&
          localStorage.getItem("type") !== ""
        ) {
          that.$router.push({
            path: "/baseManager/Detail",
            query: {
              projectID: GetUrlParam("projectID"),
              type: localStorage.getItem("type")
            }
          });
        }
      });
    },
    selectType(val) {
      // console.log(val);
      //  console.log(this.form.type);
    },
    selectStaus(val) {
      this.form.State = val;
      this.$store.dispatch("GetOrderState", this.form.State).then(() => {
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
      if (this.form.bingNum == -1) {
        this.defaultShow = false;
      } else {
        if (val == 0 || val == 2) {
          this.defaultShow = false;
        } else {
          this.defaultShow = true;
        }
      }
      this.getList(this.form);
    },
    // 绑定下拉
    selectBindStaus(val) {
      // console.log(val)
      this.form.bingNum = val;
      this.$store.dispatch("GetBindOrderState", this.form.bingNum).then(() => {
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
      if (val == -1) {
        this.form.IsBind = 1;
        this.defaultShow = false;
        this.$store
          .dispatch("ShowBindOrderState", this.defaultShow)
          .then(() => {
            // location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
      } else if (val == 0) {
        this.defaultShow = false;
      } else {
        if (this.form.State == 0 || this.form.State == 2) {
          this.defaultShow = false;
        } else {
          this.defaultShow = true;
          this.$store
            .dispatch("ShowBindOrderState", this.defaultShow)
            .then(() => {
              // location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
        }
        // this.defaultShow = true;
        this.form.IsBind = val;
      }
      // console.log(this.form.IsBind)
      this.getList(this.form);
    },
    selectColor(row, index) {
      // console.log(row);
      // console.log(this.form)
      if (this.form.bingNum == -1) {
        return "";
      }
      if (row.BindId == 0) {
        return "";
      }
      if (row.BindId) {
        if (row.colorIndex % 2 == 0) {
          return "success-row";
        } else {
          return "warning-row1";
        }
      } else {
        return "";
      }
    },
    changeShow() {
      this.flag = 1;
    },
    ChangeRank(val, row) {
      if (this.flag == 0) {
        return false;
      } else {
        var rankForm = {};
        rankForm.Id = row.Id;
        rankForm.rank = row.rank;
        // console.log(rankForm)
        editObj(rankForm).then(res => {
          if (res.status == 200) {
            this.$message({
              message: res.tip,
              type: "success",
              durantion: 1000,
              offset: 700
            });
            this.flag = 0;
            // this.getList();
          } else {
            this.$message({
              message: res.tip,
              type: "error",
              durantion: 1000,
              offset: 700
            });
          }
        });
      }
      // console.log(val)
    },
    // 数据格式转化
    isBind(list) {
      if (list.BindId == 0) {
        return "未绑定";
      } else {
        return list.BindId;
      }
    },
    handleSelectionChange(row) {
      // console.log(row)
      this.arr = [];
      let bindName = [];
      let errSelect = false;
      let localSelect = [];
      row.forEach(element => {
        bindName.push(element.BindId);
        //判断如果选择的既有绑定又有未绑定的则进行全部取消
        if (bindName.indexOf(1) != -1 && bindName.indexOf(0) != -1) {
          errSelect = true;
        }
      });
      // 判断禁止的是绑定的还是未绑定的
      if (bindName.length != 0) {
        if (bindName[0] == 0) {
          this.selectState = "unSelect";
          row.forEach(element => {
            this.arr.push(element.Id);
          });
        } else {
          this.selectState = "selected";
          row.forEach(element => {
            if (this.arr.indexOf(element.BindId) == -1) {
              this.arr.push(element.BindId);
            }
          });
        }
        // console.log(this.arr)
      } else {
        this.selectState = "";
        // console.log(this.arr)
      }
      //判断如果选择的既有绑定又有未绑定的则进行全部取消
      if (errSelect) {
        this.$message({
          message: "全选不可包含绑定和未绑定",
          type: "error"
        });
        this.$refs.multipleTable.clearSelection();
      }
    },
    isSelect(row) {
      // console.log(row);
      if (this.selectState == "unSelect" && row.BindId != 0) {
        return 0;
      } else if (this.selectState == "selected" && row.BindId == 0) {
        return 0;
      } else {
        return 1;
      }
    },
    //为相同的绑定号进行局部全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    getList(form) {
      this.form = { ...this.form, ...form };
      this.listQuery = { ...this.listQuery, ...form };
      this.listLoading = true;
      // console.log(this.form)
      // console.log(form)
      page(form).then(response => {
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
          //在每个list中加判断
          this.list.forEach((element, index) => {
            if (index == 0) {
              element.colorIndex = this.colorIndex;
            } else {
              if (this.list[index].BindId == this.list[index - 1].BindId) {
                element.colorIndex = this.colorIndex;
              } else {
                this.colorIndex++;
                element.colorIndex = this.colorIndex;
              }
            }
          });
        } else {
          //失败提示
          this.list = null;
          this.total = 0;
          this.listLoading = false;
          // this.$message({
          //   message: response.tip,
          //   type: "warning",
          //   duration: 2000,
          //   offset:700
          // });
          // this.listLoading = false;
        }
      });
    },
    //绑定
    handleBind() {
      // var isAllow = false;
      // this.arr.forEach(element => {
      //   if(element.indexOf(this.arr)==-1){
      //     this.$message({
      //       message:"样板名不能一致",
      //       type:"error",
      //       durantion:2000
      //     })
      //   }
      // });
      // console.log(this.arr)
      bindObj(this.arr).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 2000,
            offset: 700
          });
          this.getList(this.form);
        } else if (res.status == 201) {
          this.$message({
            message: res.tip,
            type: "error",
            durantion: 2000,
            offset: 700
          });
          this.getList(this.form);
        }
      });
    },
    // 解绑
    handleUnBind() {
      unBindObj(this.arr).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 2000,
            offset: 700
          });
          this.getList(this.form);
        } else if (res.status == 201) {
          this.$message({
            message: res.tip,
            type: "error",
            durantion: 2000,
            offset: 700
          });
          this.getList(this.form);
        }
      });
    },
    handleModelView(row) {
      getProcess(row.ModelName).then(res => {
        this.form1 = res.data.rows[0];
      });
      this.dialogFormVisible = true;
    },
    crtTimeFtt(rowData) {
      return crtTimeFtt(rowData.substring(6, 19), true)
    },
    handleStyleView(row) {
      getProcess(row.StyleName).then(res => {
        if (res.status == 200) {
          this.form1 = res.data.rows[0];
        } else {
          this.form1 = "";
          this.$message({
            message: res.tip,
            type: "warning",
            durantion: 2000
          });
        }
      });
      this.dialogFormVisible = true;
    },
    handleFilter() {
      this.$store.dispatch("GetOrderState", this.form.State).then(() => {
        // location.reload(); // 为了重新实例化vue-router对象 避免bug
      });
      if (
        this.form.sTime != undefined &&
        this.form.sTime != "" &&
        this.form.sTime != null
      ) {
        this.form.eTime =
          new Date().toLocaleDateString().replace(/\//g, "-") + "-23:59";
      } else {
        this.form.sTime = undefined;
        this.form.eTime = undefined;
      }
      if (this.form.Yield == "") {
        this.form.Yield = undefined;
      }
      this.getList(this.form);
    },
    handleSizeChange(val) {
      this.form.limit = val;
      this.getList(this.form);
    },
    handleCurrentChange(val) {
      this.form.page = val;
      this.getList(this.form);
    },
    handleEdit(index, row) {
      // console.log(row)
      var form = {};
      form.Id = row.Id;
      // form.OrderId = row.OrderId;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delOrder(row.Id).then(res => {
            // console.log(res);
            if (res.status == 200) {
              this.$message({
                message: "删除成功",
                type: "success",
                durantion: 2000
              });
            } else if (res.status == 201) {
              this.$message({
                message: res.tip,
                type: "error",
                durantion: 2000
              });
            } else {
              this.$message({
                message: res.tip,
                type: "warning",
                durantion: 2000
              });
            }
            this.getList(this.form);
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      // console.log(form);
    },
    handleDown(index, row) {
      // // console.log(row);
      this.isloading = index;
      let form = {};
      form.Id = row.Id;
      form.token = this.$store.getters.token;
      // console.log(form)
      downObj(form).then(res => {
        if (res.status == 201) {
          this.$message({
            message: res.tip,
            type: "error",
            durantion: 2000
          });
          this.isloading = -1;
        } else {
          window.location.href =
            "/bmapi/downOrder?Id=" + form.Id + "&token=" + form.token;
          this.isloading = -1;
        }
      });
    },
    handleRest(index, row) {
      // console.log(row)
      var restForm = {};
      // restForm.code = 37; //团订code
      restForm.code = row.Step;
      restForm.pcid = row.Id;
      this.$confirm("此操作将重置订单, 是否继续?", "重置", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        restOrder(restForm).then(res => {
          if (res.status == 200) {
            this.$message({
              title: "成功",
              message: res.tip,
              type: "success",
              duration: 2000,
              offset: 700
            });
            this.form.State == 1;
            this.getList(this.form);
          } else {
            this.$message({
              title: "失败",
              message: res.tip,
              type: "warning",
              duration: 2000,
              offset: 700
            });
          }
        });
      });
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        delObj(row.id).then(res => {
          if (res.status == 200) {
            this.$message({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
              offset: 700
            });
            const index = this.list.indexOf(row);
            this.list.splice(index, 1);
          } else {
            this.$message({
              title: "失败",
              message: res.tip,
              type: "warning",
              duration: 2000,
              offset: 700
            });
          }
        });
      });
    },
    handleEditChange(index, row) {
      // console.log(this.$store.state.user)

      // console.log(row)
      this.formInfo.code = 37;
      this.formInfo.LoginiId = this.$store.state.user.login_id;
      this.formInfo.pcid = row.Id;
      this.removeId = row.Id;
      this.getMoveMes(this.formInfo);
    },
    cancleRemove() {
      this.dialogRemove = false;
      // this.optionsRemove = '';
    },
    getMoveMes(formInfo) {
      getremoveInfo(formInfo).then(res => {
        if (res.status == 200) {
          this.optionsRemove = res.data.rows;
          this.dialogRemove = true;
        } else {
          this.$message({
            message: res.tip,
            type: "warning",
            duration: 2000
          });
        }
      });
    },
    sureRemovePod() {
      // var removeForm = this.formInfo;
      var removeForm = {};
      removeForm.orderId = this.removeId;
      if (this.radioRemove == "" || this.radioRemove == null) {
        this.$message({
          message: "请选择员工",
          type: "warning",
          duration: 2000
        });
        return false;
      } else {
        removeForm.loginId = this.radioRemove;
        // console.log(removeForm)
        editRemove(removeForm).then(res => {
          if (res.status == 200) {
            // console.log(res)
            this.$message({
              message: res.tip,
              type: "success",
              duration: 2000
            });
            this.getList(this.form);
            this.dialogRemove = false;
          } else {
            this.$message({
              message: res.tip,
              type: "warning",
              duration: 2000
            });
          }
          this.dialogRemove = false;
        });
      }
    },
    resetTemp() {
      this.form = {
        UserName: undefined,
        Phone: undefined,
        State: "",
        Up: undefined,
        Down: undefined,
        MAC: undefined,
        Remark: undefined,
        Yield: ""
      };
    },
    // 路由跳转函数
    routerLink(name, detailinfo, obj) {
      obj.mode = detailinfo;
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
      // localStorage.setItem('OrderInfo', JSON.stringify(obj))
    }
  },
  filters: {
    StyleIquiryStatus: function(val) {
      return val == 0
        ? "废弃"
        : val == 1
        ? "进行中"
        : val == 2
        ? "已完成"
        : "未知";
    },
    isRankStatus: function(val) {
      return val == "0" ? "普通" : val == "1" ? "优先" : "加急";
    },
    StyleIquiryStep(row) {
      // 0 团订改版
      let val = row.Step;
      //  children: [{
      //     value: '22',
      //     label: '下载样板'
      //   }, {
      //     value: '23',
      //     label: '修改样板'
      //   }, {
      //     value: '25',
      //     label: '放码'
      //   }, {
      //     value: '26',
      //     label: '检查尺寸'
      //   }, {
      //     value: '27',
      //     label: '改驱动规则'
      //   }]
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
    changeTime(time) {
      // console.log(time);
      if (time !== "" || time !== undefined) {
        var num = /[0-9]+/.exec(time);
        var num1 = parseInt(num[0], 10);
        var date = new Date(parseInt(num1, 10));
        var year = date.getFullYear();
        var month =
          date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;
        var currentDate =
          date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour =
          date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minutes =
          date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var second =
          date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        return (
          year + "-" + month + "-" + currentDate + " " + hour + ":" + minutes
        );
      } else {
        return "/";
      }
    }
  }
};
</script>
<style>
.el-table .success-row {
  background: oldlace;
  /* border-top: 2px solid #aaa; */
}
.el-table .warning-row1 {
  background: #ebf9eb;
  /* border-top: 2px solid #aaa; */
}
.message-box {
  /* display: flex; */
  width: 50%;
  margin: 0 auto;
  /* justify-content: space-between; */
  /* align-items: center; */
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
.table-img {
  width: 100px;
  height: 100px;
  /* border:1px solid red */
}
.el-message-box__wrapper {
  top: 200px;
}
.order-search-top {
  display: flex;
  align-items: center;
}
</style>
