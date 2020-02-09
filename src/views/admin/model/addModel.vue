<template>
  <div>
    <!-- 系统参数 addModel-->
    <el-tabs active-name="3" type="border-card" @tab-click="changeModel">
      <el-tab-pane name='3' label="量体">
        <el-button class="add-button" type="primary" @click="addModel">增加</el-button>
        <el-table :data="tableData" border style="width: 45%">
          <el-table-column prop="ParaName" label="参数名">
          </el-table-column>
          <el-table-column prop="DefaultVal" label="默认值">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template scope="scope">
              <el-button size="mini" @click="editModel(scope.row)" type="primary">
                编辑</el-button>
              <el-button size="mini" @click="delteModel(scope.row)" type="danger">
                删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name='4' label="物料">
        <el-button class="add-button" type="primary" @click="addModel">增加</el-button>
        <el-table :data="tableData" border style="width: 45%">
          <el-table-column prop="ParaName" label="参数名">
          </el-table-column>
          <el-table-column prop="DefaultVal" label="默认值">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template scope="scope">
              <el-button size="mini" @click="editModel(scope.row)" type="primary">
                编辑</el-button>
              <el-button size="mini" @click="delteModel(scope.row)" type="danger">
                删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
      <el-tab-pane name='1' label="数值型工艺参数">
        <el-button class="add-button" type="primary" @click="addModel">增加</el-button>
        <el-table :data="tableData" border style="width: 45%">
          <el-table-column prop="ParaName" label="参数名">
          </el-table-column>
          <el-table-column prop="DefaultVal" label="默认值">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template scope="scope">
              <el-button size="mini" @click="editModel(scope.row)" type="primary">
                编辑</el-button>
              <el-button size="mini" @click="delteModel(scope.row)" type="danger">
                删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-tab-pane>
      <el-tab-pane name='2' label="文字型工艺参数">

        <el-button class="add-button" type="primary" @click="addModel">增加</el-button>
        <el-table :data="tableData" border style="width: 45%">
          <el-table-column prop="ParaName" label="参数名">
          </el-table-column>
          <el-table-column prop="DefaultVal" label="默认值">
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template scope="scope">
              <el-button size="mini" @click="editModel(scope.row)" type="primary">
                编辑</el-button>
              <el-button size="mini" @click="delteModel(scope.row)" type="danger">
                删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 增加数据 -->
    <el-dialog v-dialogDrag :title="textMap[dialogStatus]" size="tiny" :visible.sync="addFormVisible">
      <el-form :model="addform">
        <el-form-item label="参数名" label-width="60px">
          <el-input :disabled="dialogStatus !== 'create'" style="max-width:300px;min-width:190px;"
            v-model="addform.paraName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认值" label-width="60px">
          <el-input style="max-width:300px;min-width:190px;" v-model="addform.defaultVal" auto-complete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus == 'create'" type="primary" @click="addSubmit">确 定</el-button>
        <el-button v-else type="primary" @click="updateSubmit">确 定</el-button>

      </div>
    </el-dialog>
    <div>
      <!-- <el-button  type="primary" @click="next">下一步</el-button> -->
    </div>
  </div>
</template>
<script>
import { page, addModel, updateModel, deleteModel } from "api/admin/model";
export default {
  data() {
    return {
      tableData: [],
      addform: {
        paraType: 3,
        paraName: "",
        defaultVal: ""
      },
      updateForm: {
        defaultVal: "",
        paraName: "",
        Id: ""
      },
      formLabelWidth: "120px",
      addFormVisible: false,
      dialogStatus: "",
      listQuery: {
        paraType: 3
      },
      textMap: {
        update: "编辑",
        create: "新增量体"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      page(this.listQuery).then(res => {
        // console.log(res);
        if (res.Success == 200) {
          if (res.Data.Rows == "") {
            this.tableData = [];
          } else {
            this.tableData = res.Data.Rows;
          }
        }
      });
    },
    changeModel(e) {
      // console.log(e);
      this.textMap.create = "新增" + e.label;
      this.addform.paraType = e.name;
      this.listQuery.paraType = e.name;
      this.getList();
    },
    addModel() {
      this.addFormVisible = true;
      this.dialogStatus = "create";
      this.addform.paraName = "";
      this.addform.defaultVal = "";
      this.addform.paraType = this.listQuery.paraType;
      // console.log( this.addform.paraType);
    },
    editModel(row) {
      // console.log(row);
      this.textMap.update = "";
      this.addFormVisible = true;
      this.textMap.update += row.ParaName;
      this.dialogStatus = "update";
      this.addform.paraName = row.ParaName;
      this.addform.defaultVal = row.DefaultVal;
      this.updateForm = {
        ...row
      };
    },
    updateSubmit() {
      // console.log(this.updateForm)
      var form = {};
      form.paraName = this.updateForm.ParaName;
      form.defaultVal = this.addform.defaultVal;
      form.Id = this.updateForm.Id;
      // console.log(form);
      updateModel(form).then(res => {
        if (res.Success) {
          this.$message({
            showClose: true,
            message: "成功！",
            type: "success",
            duration: 2000
          });
          this.addFormVisible = false;
          this.getList();
        }
      });
    },
    delteModel(row) {
      var form = {};
      form.Id = row.Id;
      deleteModel(form).then(res => {
        if (res.Success) {
          this.$message({
            showClose: true,
            message: "删除成功！",
            type: "success",
            duration: 2000
          });
        }
        this.getList();
      });
    },
    addSubmit() {
      // console.log(this.addform)
      if (this.addform.paraName == "" && this.addform.defaultVal == "") {
        this.$message({
          showClose: true,
          message: "参数不能为空！",
          type: "warning",
          duration: 2000
        });
        return false;
      } else {
        addModel(this.addform).then(res => {
          // console.log(res);
          if (res.Success) {
            this.$message({
              showClose: true,
              message: "成功！",
              type: "success",
              duration: 2000
            });
            this.addFormVisible = false;
            this.getList();
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
      }
    },
    next() {
      this.$router.push({
        path: "setModelPare"
      });
    }
  }
};
</script>
<style>
.add-button {
  margin-bottom: 15px;
}
</style>
