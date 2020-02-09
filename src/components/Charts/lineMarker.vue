<template>
  <!-- PieceworkStatistics -->
  <div :style="{height:height,width:width}">
    <!-- 年：
                        <el-date-picker v-model="value5" align="right" type="year" placeholder="选择年"  style="width: 100px;">
                        </el-date-picker> -->
    时间：
    <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" :picker-options="pickerOptions2" @change="textChange">
    </el-date-picker>
    <!-- <el-date-picker v-model="listQuery['year']" type="month" placeholder="选择月" @change="choiceMonth"> -->
    <!-- </el-date-picker> -->
    查询模式：
    <el-select v-model="listQuery['model']" placeholder="请选择" style="width: 100px;" @change="search">
      <!-- <el-option key="all" label="综合加权" value="all" v-if="power==1&&staffId==''"></el-option> -->
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-input @keyup.enter.native="search" style="width: 300px;" class="filter-item" v-model.number="staffId" :disabled="power==0" placeholder="请输入员工工号" type="number">
    </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
    <el-button class="filter-item" type="primary" v-waves  :disabled="ishow == false" v-if="power == '1'" @click="downLoad">下载</el-button>
     <el-popover
  ref="popover1"
  placement="bottom"
  trigger="hover"
 >
  有计件统计数据时，可以下载对应的EXCEL文件。<br/>
  
</el-popover>

  <!-- </div> -->
  <img v-popover:popover1 style="opacity: 0.5;width: 17px;" src="static/img/icon_help.png" alt="" srcset="">
    <div :class="className" :id="id" :style="{height:height,width:width}">
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import echarts from "echarts";
import { page, getMes, downPice } from "api/admin/chart/piece";
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
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "800px"
    },
    height: {
      type: String,
      default: "800px"
    }
  },
  data() {
    return {
      chart: null,
      ishow: false,
      power: "",
      staffId: "",
      legend: [],
      chartDate: null,
      value7: "",
      value9: "",
      value4: "",
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
      value5: "2018",
      listQuery: {
        model: "款",
        year: new Date().toISOString().slice(0, 7),
        // sTime:new Date().toLocaleDateString().replace(/\//g, "-").slice(0, 7)+'1 00:00',
        // eTime:new Date().toLocaleDateString().replace(/\//g, "-") +" 23:59",
        sTime: new Date().toISOString().slice(0, 7) + "-01 00:00",
        eTime: new Date().toISOString().slice(0, 10) + " 23:59",
        userId: 0,
        PLID: this.$store.state.user.PLID,
        random: Math.random()
      },
      series: [],
      X: [],
      Y: [],
      options: [
        {
          value: "款",
          label: "款"
        },
        {
          value: "生产单",
          label: "生产单"
        },
        {
          value: "pod",
          label: "特体pod"
        },
        {
          value: "件数",
          label: "件数"
        },
        // {
        //   value: '长度',
        //   label: '长度'
        // }
        {
          value: "床",
          label: "床数"
        }
      ],
      value: "all"
    };
  },
  mounted() {
    // 加载后台数据
    // this.getPLID();
    // this.search();
    // this.listQuery.model = 1  //上传  1
    // page(this.listQuery).then(response => {
    //   if (response.status === 200) {
    //     if (response.data.total === 0) {
    //       this.$message({
    //         message: "无记录",
    //         type: "warning",
    //         duration: 2000
    //       });
    //     } else {
    //       var data = response.data;
    //       console.log(data)
    //       this.X = data.X
    //       this.Y = data.Y
    //       this.initChart()
    //       this.chart = null
    //     }
    //   } else {
    //     this.$message({
    //       message: response.error,
    //       type: "error",
    //       duration: 2000
    //     });
    //   }
    // });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  created() {
    // console.log(this.$store.state.user.PLID)
    this.getPLID();
    this.power = getRole();
    this.defaultTime();
    // console.log(new Date().toISOString())
    //  console.log(this.listQuery)
    // console.log(this.power)
  },
  methods: {
    getPLID() {
      getMes().then(res => {
        this.search();
        // console.log(res.data);
        this.listQuery.PLID = res.data.PLID;
        // return res.data.PLID
        //  console.log(this.listQuery.PLID)
      });
    },
    downLoad() {
      var formDate = {};
      formDate.sTime = this.listQuery.sTime;
      formDate.eTime = this.listQuery.eTime;
      formDate.model = this.listQuery.model;

      downPice(formDate).then(res => {
        // console.log(res)
        if (res.status == 201) {
          this.$message({
            message: "文件不存在",
            type: "error",
            offset: 700
          });
        } else {
          window.location.href =
            "/bmapi/downpice?sTime=" +
            this.listQuery.sTime +
            "&eTime=" +
            this.listQuery.eTime +
            "&model=" +
            this.listQuery.model;
        }
      });

      // console.log(formDate)
    },
    defaultTime() {
      const start = new Date();
      var sFullYear = start.getFullYear();
      var sMonth = start.getMonth();
      // console.log(sMonth)
      var sData = start.getDate();
      // console.log("结束时间：" + sData)
      const end = new Date();
      // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      start.setTime(start.getTime());
      var eFullYear = start.getFullYear();
      var eMonth = start.getMonth();
      var eData = start.getDate() - start.getDate() + 1;
      // console.log("开始时间：" + eData)
      this.value7 = [
        new Date(eFullYear, eMonth, eData),
        new Date(sFullYear, sMonth, sData)
      ];
      // console.log(this.value7[0])
      // this.listQuery.sTime = this.value7[1];
      // this.listQuery.eTime = this.value7[0];
    },
    choiceMonth(month) {
      this.listQuery.year = month;
      this.listQuery.eTime = month + " 01-00:00";
      this.listQuery.sTime = month + " 01-00:00";
      this.search();
    },
    textChange(type) {
      // console.log(new Date(this.value7[0]))
      // console.log(new Date(this.value7[1]))
      // console.log(new Date())
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

      // sTime:new Date().toISOString().slice(0, 7)+'-01 00:00',
      // eTime:new Date().toISOString().slice(0, 10) +" 23:59",
      // this.listQuery.sTime =
      //     new Date(this.value7[0]).toLocaleDateString().replace(/\//g, "-") +
      //     " 00:00";
      //   this.listQuery.eTime =
      //     new Date(this.value7[1]).toLocaleDateString().replace(/\//g, "-") +
      //     " 23:59";
      // console.log("选择的开始时间：" + new Date(this.value7[0]).toLocaleDateString().replace(/\//g, "-") +" 00:00")
      // console.log(new Date(this.value7[0]))

      // this.listQuery.sTime =
      //   new Date(this.value7[0]).toISOString().slice(0, 7) + '-01 00:00';
      // console.log('时间戳' + new Date(this.value7[0]).getTime())
      // this.listQuery.eTime =
      //   new Date(this.value7[1]).toISOString().slice(0, 10) + " 23:59";
      // console.log(this.listQuery.sTime)
      // console.log(this.listQuery.eTime)
      this.search();
      // this.listQuery.model = type;
    },
    search() {
      // console.log(this.listQuery);
      // console.log(getUserId());
      if (this.power == 0) {
        this.staffId = getUserId();
        this.listQuery.userId = getUserId();
      } else {
        if (this.staffId == "" || this.staffId == null) {
          this.listQuery.userId = 0;
        } else {
          this.listQuery.userId = this.staffId;
        }
      }
      // console.log(this.value7)
      if (
        this.value7 !== undefined &&
        this.value7 !== "" &&
        this.value7 !== null
      ) {
        if (this.value7[0] !== null) {
          page(this.listQuery).then(response => {
            if (response.status === 200) {
              this.ishow = true;
              // console.log(response.data)
              this.chartDate = response.data;
              var data = response.data;
              // this.X = data.X
              // this.Y = data.Y
              var x = [];
              var y = [];
              for (let i = 0; i < data.length; i++) {
                if (x.indexOf(data[i].UserName) == -1) {
                  x.push(data[i].UserName);
                }
              }
              for (let i = 0; i < data.length; i++) {
                if (y.indexOf(data[i].CodeName) == -1) {
                  y.push(data[i].CodeName);
                }
              }
              // console.log(x);
              // console.log(y);
              var showData = [];
              for (let i = 0; i < y.length; i++) {
                var obj = {};
                obj.name = y[i]; //下载样板
                obj.type = "bar";
                obj.data = [];
                for (let j = 0; j < x.length; j++) {
                  let z = 0;
                  for (let k = 0; k < data.length; k++) {
                    if (data[k].UserName == x[j] && data[k].CodeName == y[i]) {
                      obj.data.push(data[k].SumMoney);
                      break;
                    }
                    z++;
                  }
                  if (z == data.length) {
                    obj.data.push(0);
                  }
                }
                obj.barWidth = "20%";
                showData.push(obj);
                // console.log(obj);
              }
              // console.log(showData);
              this.legend = y;
              this.x = x;
              this.series = showData;
              // console.log(this.series);
              // console.log('============')
              // console.log(this.x);
              // console.log('============')
              // console.log(this.legend);
              this.initChart();
            } else if (response.status === 201) {
              // this.$message({
              //     message: "无记录",
              //     type: "warning",
              //     duration: 2000,
              //     offset:700
              //   });
              this.ishow = false;
              this.chart.dispose();
            } else {
              this.$message({
                offset: 700,
                message: response.tip,
                type: "error",
                duration: 2000
              });
            }
          });
        } else {
          this.$message({
            offset: 700,
            message: "请输入时间",
            type: "error",
            duration: 2000
          });
        }
        // console.log(this.listQuery)
      } else {
        this.$message({
          offset: 700,
          message: "请输入时间",
          type: "error",
          duration: 2000
        });
      }
    },
    handleFilter() {
      this.search();
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById(this.id));
      this.chart.setOption(
        {
          // color: ['#3398DB'],
          // tooltip: {
          //   trigger: 'axis',
          //   axisPointer: { // 坐标轴指示器，坐标轴触发有效
          //     type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          //   }
          // },
          // grid: {
          //   left: '3%',
          //   right: '4%',
          //   bottom: '3%',
          //   containLabel: true
          // },
          // xAxis: [{
          //   type: 'category',
          //   data: this.X,
          //   axisTick: {
          //     alignWithLabel: true
          //   }
          // }],
          // yAxis: [{
          //   type: 'value'
          // }],
          // series: [{
          //   name: '统计',
          //   type: 'bar',
          //   barWidth: '30%',
          //   data: this.Y
          // }]
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: this.legend
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.x
              // max:4
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          barMaxWidth: "60",
          barCateGoryGap: "10%",
          series: this.series,
          dataZoom: [
            {
              // 这个dataZoom组件，默认 控制x轴。
              type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
              start: 0, // 左边在 10% 的位置。
              end: 100 // 右边在 60% 的位置。
            }
          ]
        },
        true
      );
    }
  }
};
</script>
