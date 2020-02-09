<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2 style="text-align:center">充绒数据</h2>
        <span style="line-height: 36px;">
          <el-select v-model="selectPart" filterable placeholder="请选择">
            <el-option-group label="部件名称">
                <el-option
                v-for="item in partoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                ></el-option>
            </el-option-group>
          </el-select>
        </span>
        <span style="line-height: 36px;">
          <!-- <el-slider v-model="scaleSIze" :format-tooltip="formatTooltip" :step="10" show-stops></el-slider> -->
          <!-- <el-input v-model.number="scaleSIze"></el-input> -->
          <el-select v-model="scaleSIze" placeholder="请选择">
            <!-- <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option> -->
            <el-option-group label="缩放比例">
                <el-option label="50%" :value="25" key="5"></el-option>
                <el-option label="75%" :value="37.5" key="3.75"></el-option>
                <el-option label="100%" :value="50" key="5"></el-option>
                <el-option label="125%" :value="62.5" key="6.25"></el-option>
                <el-option label="150%" :value="75" key="7.5"></el-option>
                <el-option label="200%" :value="100" key="10"></el-option>
            </el-option-group>
          </el-select>
        </span>
        <el-button style="float: right;" type="primary" @click="handleDownloadImg">下载</el-button>
      </div>
      <CanvasPart :json="jsonpart" :scaleSIze="scaleSIze/10" ref="CanvasPart"></CanvasPart>
    </el-card>
  </div>
</template>

<script>
import CanvasPart from "@/components/canvas";
import { DownCr } from "api/admin/user/index1";
export default {
  components: {
    CanvasPart
  },
  data() {
    return {
      jsonpart: [],
      teamplteJson: {},
      selectPart: "",
      partoptions: [],
      scaleSIze: 50
    };
  },
  methods: {
    initData() {
      this.teamplteJson.piece.map((el, index) => {
        this.partoptions.push({ value: index, label: el.name + "-" + el.size });
      });
      this.selectPart = 0;
    },
    handleDownloadImg() {
      this.$refs.CanvasPart.handleClick();
    },
    formatTooltip(val) {
      return val / 5;
    },
    /**查询json */
    onQueryJson(obj) {
      DownCr({ id: obj.id, type: obj.type }).then(res => {
        if (res.errcode) {
          this.$message.warning(res.errmsg);
        } else {
          this.teamplteJson = res;
        }
      });
    }
  },
  watch: {
    selectPart(val) {
      this.jsonpart = [...this.teamplteJson.piece].splice(val, 1);
    },
    scaleSIze() {
      this.jsonpart = [...this.teamplteJson.piece].splice(this.selectPart, 1);
    },
    teamplteJson() {
      this.initData();
    }
  },
  created(params) {
    //   var locaItem = this.$route.query.item
    this.query = this.$route.query;
    let query = this.query;
    if (query.id && query.type) {
      this.onQueryJson({ id: query.id, type: query.type });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
