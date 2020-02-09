<template>
  <el-table
      :data="table"
      :default-sort = "{prop: 'code', order: 'descending'}"
      style="width: 100%;min-height:258px">
      <el-table-column prop="name" align="center" label="工序名称"> </el-table-column>
        <el-table-column class-name="status-col" label="是否跳过"  align="center">
          <template scope="scope">
            <el-switch  v-model="scope.row.state" :on-value=0 :off-value=1 off-color="#ff4949" on-color="#13ce66"
              on-text="是" off-text="否" v-if="scope.row.assign==1 &&scope.row.type!=='TD' " @change="setChange(scope.$index,scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="权重" align="center" width='150'>
          <template scope="scope">
            <el-select v-model="scope.row.weight" placeholder="权重" @change="weightChange(scope.row)"
              :disabled="scope.row.state==0" :key="scope.row.PLID">
              <el-option label=0.5 value=0.5></el-option>
              <el-option label=1 value=1></el-option>
              <el-option label=1.5 value=1.5></el-option>
              <el-option label=2 value=2></el-option>
            </el-select>
          </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { weightObj, putObj } from "api/admin/user/device";
export default {
  name: "ProcessTable",
  props: {
    tableData: {
      type: Array,
      required: true
    },
    process: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      table: [],
      setForm: {}
    };
  },
  watch: {
    tableData() {
      this.initData()
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.table = this.tableData.filter(el => {
        if (el.type == this.process) {
          return true;
        } else {
          return false;
        }
      });
    },
    setChange(index, row) {
        // console.log(row);
      let arr = [];
      let maxCode = 0;
      // 改变后的值
      this.table.forEach(element => {
        if (element.assign == 1 && element.state == 1) {
          //获取可选跳过且未跳过的开关个数
          arr.push(1);
          maxCode = element.code;
        }
      });
      //发送请求
      if (row.state == 0) {
        //跳过时执行的函数
        this.resetForm();
        // this.$confirm("此操作将永久删除该工序, 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
            this.setForm.delcode = row.code
            this.setForm.setcode = maxCode
            this.setForm.name = ""
            this.setForm.id = row.PLID;
             this.setForm.type = row.type;
            if(this.process=='CD'){
              this.setForm.type = 'dh'
            }else{
              this.setForm.type = this.process.toLowerCase()
            }
            // console.log(this.setForm)
            // this.$emit('deleProcess',123)
            this.update(this.setForm, index)
          // })
          // .catch(err => {
          //   if (row.state == 1) {
          //     row.state = 0;
          //   } else {
          //     row.state = 1;
          //   }
          // });
      } else {
        //不跳过时执行的函数
        //重置表单
            // console.log(this.setForm)
        this.resetForm();
        this.setForm.delcode = 0;
        this.setForm.setcode = row.code;
        this.setForm.name = row.name;
        this.setForm.id = row.PLID;
          this.setForm.type = row.type;
        this.update(this.setForm);
      }
    },
    weightChange(row) {
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
    },
    /**重置表单 */
    resetForm() {
      this.setForm = {
        delcode: 0,
        setcode: 0,
        name: "",
        id: 0
      };
    },
    update(formName, index) {
      putObj(formName).then(res => {
        if (res.status == 200) {
          this.$message({
            type: "success",
            message: res.tip,
            duration: 2000
          });
          // this.table.splice(index, 1);
          // this.$emit('deleProcess',{process:this.props.process,index})
          this.$emit("deleProcess", formName.delcode, this.process,formName)

        } else {
          this.$message({
            type: "error",
            message: res.tip,
            duration: 2000
          });
        }
      });
    }
  }
};
</script>

