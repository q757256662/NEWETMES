<template>
  <!-- orderImport 生产单导入 -->
  <div class="app-container calendar-list-container">
    <div style="margin-bottom:10px;height:36px ">
      <span style="line-height: 36px"></span>
      <el-button
        style="float: left"
        type="primary"
        @click="handleImportOrder"
        :disabled="selection.length==0"
      >进入生产流程</el-button>
    </div>
    <el-table
      border
      v-loading="loading"
      :data="tableData"
      style="width: 100%"
      @cell-click="handleRowClick"
      ref="table"
      @select="handleSelectOrder"
      @select-all="handleSelectAll"
      :row-key="getRowKeys"
      :expand-row-keys="expandRow"
      :row-class-name="getRowClass"
    > 
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        width="40"
        align="center"
        :render-header="expandTip"
        class-name="expand_header"
        label-class-name="expand_header"
      >
        <template scope="scope">
          <i
            :class="scope.row.Count==1?'el-icon-minus':expandRow.includes(scope.row.Id)?'el-icon-arrow-up':'el-icon-arrow-down'"
          ></i>
        </template>
      </el-table-column>
      <el-table-column prop="OrderName" label="生产单名称"></el-table-column>
      <el-table-column prop="PLName" label="流水线" width="180"></el-table-column>
      <el-table-column prop="__categoryType" label="品类" width="120"></el-table-column>
      <el-table-column prop="Name" label="类型" width="80">
        <template scope="scope">
          <span>
            {{scope.row.Name.substr(0,2)}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="RequestData" label="请求数据" class-name="RequestData" width="150">
        <template scope="scope">
          <div v-if="scope.row.Count>1">点击查看详细数据</div>
          <div v-else class="shengelue">{{scope.row.RequestData}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="RequestTime" :formatter="crtTimeFtt" label="请求时间" width="180"></el-table-column>
      <el-table-column prop="State" label="状态" class-name="StateClass" width="180">
        <template scope="scope">
          <div :style="ColorSelect(scope.row)">{{scope.row | orderStateFilter}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" :render-header="handleHelp">
        <template scope="scope">
          <el-button
            @click="handleEditFabric(scope.row,scope.$index)"
            type="success"
            size="small"
          >物料</el-button>
          <el-button
            @click="()=>{onGetLine(scope.row,scope.$index)}"
            type="success"
            size="small"
          >分配流水线</el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand" class-name="RequestData" width="1">
        <template scope="props">
          <el-table
            border
            :data="props.row._additionalTable"
            style="width: 100%"
            @cell-click="handleRowClick"
            @select="handleSelectOrder"
            @select-all="handleSelectAll"
          >
            <el-table-column prop="OrderName" label="生产单名称"></el-table-column>
            <el-table-column prop="PLName" label="流水线" width="180"></el-table-column>
            <el-table-column prop="__categoryType" label="品类" width="120"></el-table-column>
            <el-table-column prop="Name" label="类型" width="80">
              <template scope="scope">
                <span>
                  {{scope.row.Name.substr(0,2)}}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="RequestData" label="请求数据" class-name="RequestData" width="180">
              <template scope="scope">
                <div class="shengelue">{{scope.row.RequestData}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="RequestTime" :formatter="crtTimeFtt" label="请求时间"></el-table-column>
            <el-table-column prop="State" label="状态" class-name="StateClass">
              <template scope="scope">
                <div :style="ColorSelect(scope.row)">{{scope.row | orderStateFilter}}</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
              <template scope="scope">
                <el-button
                  @click="handleEditFabric(scope.row,scope.$index)"
                  type="success"
                  size="small"
                >物料</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :listQuery="listQuery" @PageChange="initData" :total="total"></Pagination>
    <el-dialog v-dialogDrag title="JSON详情" :visible.sync="jsonDialogVisible" size="small">
      <jsonEditor :value="currentJSONData"></jsonEditor>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="jsonDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="jsonDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="导入状态"
      v-dialogDrag
      :visible.sync="stateDialogVisible"
      size="tiny"
      @close="initData(listQuery)"
    >
      <el-table :data="orderTableData" border style="width: 100%">
        <el-table-column prop="OrderName" label="生产单名"></el-table-column>
        <el-table-column prop="updateState" label="状态">
          <template scope="scope">
            <span style="font-weight:600">{{scope.row.updateState}}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="stateDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag title="编辑物料名称" :visible.sync="fabricDialogVisible" size="tiny">
      <el-table border :data="fabricData" style="width: 100%">
        <el-table-column prop="id" label="物料编号"></el-table-column>
        <el-table-column prop="name" label="原物料名"></el-table-column>
        <el-table-column label="新物料名">
          <template scope="scope">
            <el-input style="width:120px" v-model="scope.row.__newName"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlePutFabric(fabricData)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag title="分配流水线" :visible.sync="dispatchLineDialogVisible" size="tiny">
      流水线:
      <el-select v-model="dispatchLine" placeholder="请选择">
        <el-option :key="mateWaterLine" :label="mateWaterLine" :value="0" v-if="dispatchLine==0"></el-option>
        <el-option :key="mateWaterLine" :label="mateWaterLine" :value="0" v-if="dispatchLine!==0&&lineOptions.length==0"></el-option>
        <el-option v-for="item in lineOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleDispatchLine">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  orderlogs,
  getorderlogone,
  entryprocess,
  updateJson,
  onGetLine,
  updatePL
} from "@/api/admin/orderSearch"
import { getIsNoFabricEnter } from "api/admin/synthesize/index"
import jsonEditor from "@/components/jsonEditor"
import { crtTimeFtt } from "@/utils"
import Pagination from "@/components/Pagination"
import { setTimeout } from "timers"
import { DH, TD, GD } from "@/utils/const"
import { debug } from "util"

export default {
  data() {
    return {
      /**JSON模态框状态 */
      jsonDialogVisible: false,
      /**JSON数据 */
      currentJSONData: "",
      /**显示数据 */
      tableData: [],
      /**选择的生产单 */
      selection: [],
      /**分页 */
      listQuery: {
        page: 1,
        limit: Number(localStorage.getItem("totalPage") || 10)
        // limit:2
      },
      /**当前总条数 */
      total: 0,
      /**表格加载 */
      loading: false,
      /**状态模态框 */
      stateDialogVisible: false,
      /**生产单提交情况 */
      orderTableData: [],
      /**当前选中的物料 */
      fabricData: [],
      /** 物料模态框*/
      fabricDialogVisible: false,
      /**当前选中的生产单序号 */
      fabricDataIndex: 0,
      /**可转移的流水线 */
      lineOptions: [],
      /**当前选择的流水线 */
      dispatchLine: null,
      /** 分配流水线模态框*/
      dispatchLineDialogVisible: false,
      /**当前展开的行 */
      expandRow: [],
      /**当前选择生产单 */
      currentOrder: {},
      /**是否有权限忽略物料 */
      isAuthIgnoreFabric: true,
      /**匹配流水线提示 */
      mateWaterLine:"没有匹配的流水线"
    }
  },
  mounted() {
    this.initData(this.listQuery)
    this.handleisAuthIgnoreFabric()
  },
  components: {
    jsonEditor,
    Pagination
  },
  filters: {
    orderStateFilter(row) {
      if (row.State == 2) {
        return "接收成功(数据未完整)"
      } else if (row.State == 3) {
        let item =
          typeof row.RequestData == "string"
            ? JSON.parse(row.RequestData)
            : row.RequestData
        if (
          item.fabric &&
          item.fabric.findIndex(item => item.name == "") !== -1
        ) {
          return "接收成功(缺失物料名)"
        } else if (row.PLID == 0) {
          return "接收成功(没有流水线)"
        } else {
          return "接收成功(数据已完整)"
        }
      } else {
        return "状态错误"
      }
    }
  },
  methods: {
    handleisAuthIgnoreFabric() {
      getIsNoFabricEnter().then(res => {
        if (res.Success) {
          this.isAuthIgnoreFabric = res.Data.Rows == "y"
        }
      })
    },
    getRowClass: function(row, rowIndex) {
      if (row.Count == 1) {
        return "row-expand-cover"
      }
    },
    getRowKeys(row) {
      return row.Id
    },
    /**获取所有流水线 */
    onGetLine(row, index) {
      this.fabricDataIndex = index
      let data =
        typeof row.RequestData == "string"
          ? JSON.parse(row.RequestData)
          : row.RequestData
      let type = row.Route.slice(-2).toUpperCase()
      let obj = {
        categoryName: type == "TD" ? data.order.type : data.type,
        type: type == "DH" ? "CD" : type
      }
      onGetLine(obj).then(res => {
        if (res.status == 200) {
          this.lineOptions = res.data.rows == null ? [] : res.data.rows
          this.dispatchLine = this.tableData[this.fabricDataIndex].PLID
          // console.log(this.lineOptions.length)
          if(this.lineOptions.length!==0){
            this.mateWaterLine = '请选择流水线'
          }else{
            // console.log(333)
            this.mateWaterLine = '没有匹配的流水线'
          }
        }
        this.dispatchLineDialogVisible=true
      })
    },
    /**分配流水线 */
    handleDispatchLine() {
      let obj = {}
      obj.PLID = this.dispatchLine
      obj.orderName = this.tableData[this.fabricDataIndex].OrderName
      if (obj.PLID == 0) {
        this.$message.warning("没有匹配的流水线")
        this.dispatchLineDialogVisible = false
      } else {
        if (this.tableData[this.fabricDataIndex].PLID == this.dispatchLine) {
          this.$message.success("修改成功")
          this.dispatchLineDialogVisible = false
        } else {
          updatePL(obj).then(res => {
            if (res.status == 200) {
              this.$message.success("修改成功")
              this.dispatchLineDialogVisible = false
              this.initData(this.listQuery)
            } else {
              this.$message.warning(res.tip)
            }
          })
        }
      }
    },
    /**提交修改物料名称 */
    handlePutFabric(row) {
      //将物料数组遍历改变之后删除属性__newName
      let newObj = {
        ...JSON.parse(this.tableData[this.fabricDataIndex].RequestData)
      }
      // let newFabric = {...row}
      if (row.every(el => el.__newName == "")) {
        delete el["__newName"]
        this.$message.success("修改成功")
        this.fabricDialogVisible = false
        return false
      }
      newObj.fabric = row.map(el => {
        let item = { ...el }
        item.name = item.__newName == "" ? item.name : item.__newName
        delete item["__newName"]
        return item
      })
      //前端更改页面
      let obj = {
        requestid: this.currentOrder.Id,
        json: newObj
      }
      updateJson(obj).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          })
          if (this.currentOrder.Id == this.tableData[this.fabricDataIndex].Id) {
            this.tableData[this.fabricDataIndex].RequestData = JSON.stringify(
              newObj
            )
            this.tableData[this.fabricDataIndex]._additionalTable &&
              (this.tableData[this.fabricDataIndex]._additionalTable.find(
                el => el.Id == this.tableData[this.fabricDataIndex].Id
              ).RequestData = JSON.stringify(newObj))
          } else {
            //更改当前选中的order 数据
            this.currentOrder.RequestData = JSON.stringify(newObj)
            //修改父级的order 数据 判断ID是否一致,如果一致,则同步改变
            this.tableData.find(
              el => el.Id == this.currentOrder.Id
            ).RequestData = JSON.stringify(newObj)
          }
          this.fabricDialogVisible = false
        } else {
          this.$message({
            message: res.tip,
            type: "warning"
          })
        }
      })
    },
    /**显示编辑物料名称 */
    handleEditFabric(row, index) {
      /**获取当前数据 */
      this.currentOrder = row
      //解析数据
      let data = JSON.parse(row.RequestData)
      if (data.fabric && data.fabric.length != 0&&data.fabric[0].hasOwnProperty('id')) {
        this.fabricDataIndex = index
        this.fabricData = data.fabric.map(el => {
          el.__newName = ""
          return el
        })
        this.fabricDialogVisible = true
      } else {
        this.$message({
          message: "该生产单不存在物料",
          type: "warning"
        })
      }
    },
    /**选择生产单 */
    handleSelectAll(selection) {
      this.selection = selection
    },
    /**导入生产单 */
    handleImportOrder() {
      let finalArr = []
      let selection = [...this.selection]
      selection.map(el => {
        if (finalArr.length == 0) {
          el.RequestData = Object.assign(
            {},
            typeof el.RequestData == "string"
              ? JSON.parse(el.RequestData)
              : el.RequestData
          )
          el.updateState = "等待"
          finalArr.push(el)
        } else {
          /**获取订单名称 */
          let index = finalArr.findIndex(
            index => index.OrderName == el.OrderName
          )
          //如果找到一致的订单名称
          if (index != -1) {
            finalArr[index].RequestData = Object.assign(
              finalArr[index].RequestData,
              typeof el.RequestData == "string"
                ? JSON.parse(el.RequestData)
                : el.RequestData
            )
          } else {
            //找不到一致的订单名称,需重新创建一个订单
            el.RequestData =
              typeof el.RequestData == "string"
                ? JSON.parse(el.RequestData)
                : el.RequestData
            el.updateState = "等待"
            finalArr.push(el)
          }
        }
      })
      /**获取选中生产单 */
      this.orderTableData = finalArr
      /**状态模态框 */
      this.stateDialogVisible = true
      /**依次请求 */
      this.onImportOrder(0, this.orderTableData)
    },
    /**正式导入生产单 */
    onImportOrder(index, arr) {
      if (index <= arr.length - 1) {
        //导入之前查看是否有可导入
        this.queryOrderState(arr[index])
          .then(res => {
            this.isAuthIgnoreFabric||res.data.RequestData.fabric.map(item => {
              delete item["__newName"]
              return item
            })
            // console.log(RequestData)
            let obj = {
              orderName: arr[index].OrderName,
              type: res.state,
              dynamic: res.data.RequestData,
              PLID: arr[index].PLID
            }
            entryprocess(obj).then(result => {
              if (result.Success) {
                /**请求成功 */
                arr[index].updateState = "成功"
                this.orderTableData.splice(index, 1, arr[index])
                this.onImportOrder(index + 1, arr)
              } else {
                /**请求失败 */
                arr[index].updateState = result.ErrMes
                this.orderTableData.splice(index, 1, arr[index])
                this.onImportOrder(++index, arr)
              }
            })
          })
          .catch(err => {
            arr[index].updateState = err.ErrMes
            this.orderTableData.splice(index, 1, arr[index])
            this.onImportOrder(++index, arr)
          })
      } else {
        // this.initData(this.listQuery)
        if (!this.stateDialogVisible) {
          this.initData(this.listQuery)
        }
        this.selection.splice(0, this.selection.length)
      }
    },
    /**查询生产单状态 */
    queryOrderState(arr) {
      return new Promise(async (resolve, reject) => {
        //是否有流水线
        if (arr.PLID == 0) {
          reject({
            Success: false,
            ErrMes: "没有指定个订流水线"
          })
        }
        if (arr.Route == "/import/gd") {
          //个订
          if (!!arr.RequestData.fabric && !!arr.RequestData.number) {
            try {
              const result = await this.onQueryOrderFabricName(arr)
              resolve({
                data: arr,
                state: GD
              })
            } catch (err) {
              reject({
                Success: false,
                ErrMes: "缺失物料名"
              })
            }
          } else {
            this.supplementOrder(arr.OrderName).then(async res => {
              /**请求数据 */
              let data = {}
              let finalData = {}
              if (res && res.length != 0) {
                res.reverse().map(el => {
                  finalData = el
                  finalData.RequestData = Object.assign(
                    data,
                    typeof el.RequestData == "string"
                      ? JSON.parse(el.RequestData)
                      : el.RequestData
                  )
                })
                /**补全数据后输出 */
                if (
                  !!finalData.RequestData.fabric &&
                  !!finalData.RequestData.number
                ) {
                  try {
                    const result = await this.onQueryOrderFabricName(finalData)
                    resolve({
                      data: finalData,
                      state: GD
                    })
                  } catch (error) {
                    reject({
                      Success: false,
                      ErrMes: "缺失物料名"
                    })
                  }
                } else {
                  if (
                    !!finalData.RequestData.number &&
                    this.isAuthIgnoreFabric
                  ) {
                    resolve({
                      data: finalData,
                      state: GD
                    })
                  } else {
                    reject({
                      Success: false,
                      ErrMes: "生产单不完整"
                    })
                  }
                }
              } else {
                reject({
                  Success: false,
                  ErrMes: "生产单不完整"
                })
              }
            })
          }
        } else if (arr.Route == "/import/dh") {
          //成衣
          try {
            const result = await this.onQueryOrderFabricName(arr)
            resolve({
              data: arr,
              state: DH
            })
          } catch (err) {
            reject({
              Success: false,
              ErrMes: "缺失物料名"
            })
          }
          // resolve({
          //   data: arr,
          //   state: DH
          // })
        } else if (arr.Route == "/import/td") {
          //团订
          if (
            !!arr.RequestData.fabric &&
            !!arr.RequestData.person &&
            !!arr.RequestData.measureName
          ) {
            try {
              const result = await this.onQueryOrderFabricName(arr)
              resolve({
                data: arr,
                state: TD
              })
            } catch (err) {
              reject({
                Success: false,
                ErrMes: "缺失物料名"
              })
            }
          } else {
            this.supplementOrder(arr.OrderName).then(async res => {
              /**请求数据 */
              let data = {}
              let finalData = {}
              if ((res && res.length != 0) || this.isAuthIgnoreFabric) {
                res.reverse().map(el => {
                  finalData = el
                  finalData.RequestData = Object.assign(
                    data,
                    typeof el.RequestData == "string"
                      ? JSON.parse(el.RequestData)
                      : el.RequestData
                  )
                })

                /**补全数据后输出 */
                if ( !!finalData.RequestData.fabric && !!finalData.RequestData.person && !!finalData.RequestData.measureName ) {
                  try {
                    const result = await this.onQueryOrderFabricName(finalData)
                    resolve({
                      data: finalData,
                      state: TD
                    })
                  } catch (err) {
                    reject({
                      Success: false,
                      ErrMes: "缺失物料名"
                    })
                  }
                }else{
                  if (
                    !!finalData.RequestData.person &&
                    !!finalData.RequestData.measureName &&
                    this.isAuthIgnoreFabric
                  ) {
                    resolve({
                      data: finalData,
                      state: TD
                    })
                  }else{
                    reject({
                      Success: false,
                      ErrMes: "生产单缺失"
                    })
                  }
                }
              } else {
                reject({
                  Success: false,
                  ErrMes: "生产单缺失"
                })
              }
            })
          }
        }
      })
    },

    /**查询生产单物料名称是否存在 */
    onQueryOrderFabricName(order) {
      return new Promise((resolve, reject) => {
        if (this.isAuthIgnoreFabric) {
          resolve()
        }
        let fabric = order.RequestData.fabric
        if (fabric && fabric.length != 0) {
          let result = fabric.findIndex(
            item => item.name == "" || !item.hasOwnProperty("name")
          )
          //不存在物料名称为空的情况
          if (result == -1) {
            resolve()
          } else {
            //存在物料名称为空的情况
            reject()
          }
        } else {
          reject()
        }
      })
    },
    /**补全生产单 */
    supplementOrder(orderName) {
      return new Promise((resolve, reject) => {
        getorderlogone({
          orderName
        }).then(res => {
          resolve(res.data.rows)
        })
      })
    },
    /**选择生产单 */
    handleSelectOrder(selection, row) {
      /**判断是移除还是添加生产单 */
      if (selection.find(item => item.Id == row.Id)) {
        /**添加生产单 */
        this.tableData
          .filter(item => item.OrderName == row.OrderName && item.Id != row.Id)
          .map(el => {
            selection.push(el)
          })
      } else {
        /**移除生产单 */
        for (let i = 0; i < selection.length; i++) {
          if (selection[i].OrderName == row.OrderName) {
            selection.splice(i, 1)
            i--
          }
        }
      }
      this.selection = selection
    },
    /**格式化时间 */
    crtTimeFtt(rowData) {
      return crtTimeFtt(rowData.RequestTime.substring(6, 19), true)
    },
    /**行点击 */
    handleRowClick(rowData, column) {
      //点击请求数据
      if (
        column.property == "RequestData" &&
        (rowData.Count == 1 || rowData.Count == 0)
      ) {
        this.currentJSONData =
          typeof rowData.RequestData == "string"
            ? JSON.parse(rowData.RequestData)
            : rowData.RequestData
        this.jsonDialogVisible = true
      } else {
        //点击非请求数据
        if (rowData.Count > 1 && column.label != "操作") {
          let index = this.expandRow.findIndex(item => rowData.Id == item)
          if (index >= 0) {
            //收缩栏
            this.expandRow.splice(index, 1)
          } else {
            //展开
            if (!rowData.hasOwnProperty("_additionalTable")) {
              this.supplementOrder(rowData.OrderName).then(res => {
                if(res){
                  rowData._additionalTable = this.addCategory(res)
                  this.expandRow.push(rowData.Id)
                  if(this.expandRow.length>1){
                    this.expandRow.shift()
                  }
                }else{
                  this.$message.warning('找不到数据')
                }
              })
            } else {
              this.expandRow.push(rowData.Id)
              if(this.expandRow.length>1){
                this.expandRow.shift()
              }
            }
          }
        }
      }
    },
    /**初始化页面 */
    async initData(listQuery) {
      this.listQuery = {
        ...this.listQuery,
        ...listQuery
      }
      this.expandRow.splice(0,this.expandRow.length)
      this.loading = true
      const result = await orderlogs({
        limit: this.listQuery.limit,
        page: this.listQuery.page
      })
      if (result.status == 200) {
        this.loading = false
        this.tableData = this.addCategory(result.data.rows)
        this.total = result.data.total
      } else {
        this.loading = false
        this.$message({
          message: result.tip,
          type: "error"
        })
      }
    },
    /**初始化表格 */
    onInitTableData(row) {
      // console.log(row)
      !!row &&
        !!row.length &&
        row.map(el => {
          if (el.Count > 1) {
            this.supplementOrder(el.OrderName).then(res => {
              el._additionalTable = res
              // console.log(el)
            })
          } else {
            el._additionalTable = []
          }
          return el
        })
      return row
    },
    //添加品类
    addCategory(tableData) {
      let newData = [...tableData]
      newData.map(el => {
        // console.log(JSON.parse(el.RequestData))
        let data = JSON.parse(el.RequestData)
        if (data.order) {
          el.__categoryType = data.order.type
        } else {
          el.__categoryType = data.type
        }
      })
      return newData
    },
    //状态颜色改变
    ColorSelect(row) {
      if (row.State == 2) {
      } else {
        let item =
          typeof row.RequestData == "string"
            ? JSON.parse(row.RequestData)
            : row.RequestData
        if (
          (item.fabric &&
            item.fabric.findIndex(item => item.name == "") !== -1) ||
          row.PLID == 0
        ) {
          // return "接收成功(数据缺失物料名)"
        } else {
          return {
            color: "#13ce66"
          }
        }
      }
    },
    handleHelp(h, { column }) {
      return (
        <el-tooltip class="item" effect="light" content="" placement="top">
          <div slot="content">
            物料：可以修改物料名称,若不填,则不修改。
            <br />
            分配流水线：默认匹配到有该品类的流水线，如无该品类的流水线，则需先自己手动为流水线添加该品类。
          </div>
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
      )
    },
    expandTip(h, { column }) {
      return (
        <el-tooltip
          class="item"
          effect="light"
          content='若有"∨"则可以展开，查看更多数据。若有"-"则无更多数据。'
          placement="top"
        >
          <span>
            {column.label}
            <img src="static/img/icon_help.png" alt="" class="backFile" />
          </span>
        </el-tooltip>
      )
    }
  }
}
</script>
<style>
.box-card {
  margin: 10px;
}

.shengelue {
  overflow: hidden;
  /*超出部分隐藏*/
  text-overflow: ellipsis;
  /* 超出部分显示省略号 */
  white-space: nowrap;
  /*规定段落中的文本不进行换行 */
  width: 100%;
  /*需要配合宽度来使用*/
}

tbody .RequestData:hover {
  cursor: pointer;
}

.row-expand-cover .el-table__expand-icon {
  /* visibility: hidden */
  display: none;
}
/* 
.row-expand-cover .el-table__expand-column:after {
  content: "-"
  font-size: 25px
  text-align: center
  display: block
  width: 5px
  margin: 0 auto
  color: rgb(111, 102, 102)
} */

.el-table__expanded-cell {
  background-color: #f0f3f5;
}

.el-table__expanded-cell:hover {
  background-color: #f0f3f5 !important;
}
.expand_header {
  padding: 0 !important;
}

.expand_header .cell {
  padding: 0 !important;
}
</style>
