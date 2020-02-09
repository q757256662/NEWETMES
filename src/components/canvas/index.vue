<template>
  <div class="pagination-container">
    <!-- {{min}} -->
    <canvas id="drawing" :width="autoWidth" :height="autoHeight" ref="draw">A drawing of something.</canvas>
    <!-- <el-button @click="handleClick">下载</el-button> -->
  </div>
</template>
<script>
export default {
  name: "CanvasPart",
  props: {
    json: {
      type: Array,
      default: []
    },
    scaleSIze: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      min: 0,
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
      moveX: 0,
      moveY: 0,
      autoWidth: 1000,
      autoHeight: 800
    };
  },

  methods: {
    // initCtx() {
    //   let drawing = document.getElementById("drawing");

    // },
    reDraw(data) {
      // if(this.drawing){
      let drawing = document.getElementById("drawing");
      let context = drawing.getContext("2d");
      data.map(el => {
        el.area.map(item => {
          for (let i = 0; i < item.polygon.length; i++) {
            if (i == 0) {
              // this.minX = item.polygon[i]*this.scaleSIze
              // this.maxX = item.polygon[i]*this.scaleSIze
              this.minX =
                this.minX == 0 ? item.polygon[i] * this.scaleSIze : this.minX;
              this.maxX =
                this.maxX == 0 ? item.polygon[i] * this.scaleSIze : this.maxX;
            }
            if (i == 1) {
              // this.minY = item.polygon[i]*this.scaleSIze
              // this.maxY = item.polygon[i]*this.scaleSIze
              this.maxY =
                this.maxY == 0 ? item.polygon[i] * this.scaleSIze : this.maxY;
              this.minY =
                this.minY == 0 ? item.polygon[i] * this.scaleSIze : this.minY;
            }
            if (i % 2 == 0) {
              //X轴

              //为X轴取最大最小值
              if (this.minX > item.polygon[i] * this.scaleSIze) {
                this.minX = item.polygon[i] * this.scaleSIze;
              }
              if (this.maxX < item.polygon[i] * this.scaleSIze) {
                this.maxX = item.polygon[i] * this.scaleSIze;
              }
            } else {
              //Y轴
              //为Y轴取最大最小值
              if (this.minY > item.polygon[i] * this.scaleSIze) {
                this.minY = item.polygon[i] * this.scaleSIze;
              }
              if (this.maxY < item.polygon[i] * this.scaleSIze) {
                this.maxY = item.polygon[i] * this.scaleSIze;
              }
            }
          }
          this.autoWidth = this.maxX - this.minX + 40;
          this.autoHeight = this.maxY - this.minY + 40;
          this.moveX = this.autoWidth / 2 - (this.minX + this.maxX) / 2;
          this.moveY = this.autoHeight / 2 - (this.minY + this.maxY) / 2;
        });
      });
      
      setTimeout(() => {
      context.fillStyle = 'white'
      context.fillRect(0,0,this.autoWidth,this.autoHeight)
        data.map(el => {
          el.area.map(item => {
            context.fillStyle = '#000'
            context.beginPath();
            context.font = "15px Arial";
            context.lineWidth = 2;
            context.fillText(
              item.weight,
              item.x * this.scaleSIze + this.moveX,
              item.y * this.scaleSIze + this.moveY
            );
            context.moveTo(
              item.polygon[0] * this.scaleSIze + this.moveX,
              item.polygon[1] * this.scaleSIze + this.moveY
            );
            for (let i = 2; i < item.polygon.length; i += 2) {
              // console.log(item.polygon[i])
              context.lineTo(
                item.polygon[i] * this.scaleSIze + this.moveX,
                item.polygon[i + 1] * this.scaleSIze + this.moveY
              );
            }
            context.stroke();
            context.closePath();
          });
          this.min = 0;
        });
      }, 0);
    },
    handleClick() {
      if(this.json.length){
        var save_url = document.getElementById("drawing").toDataURL("image/png");
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.href = save_url;
        a.download = this.json[0].name+"-"+this.json[0].size+".jpg";
        a.click();
      }else{
        this.$message.warning('暂无部件信息')        
      }
    },

    resetForm() {
      this.minX = 0;
      this.maxX = 0;
      this.minY = 0;
      this.maxY = 0;
      this.moveX = 0;
      this.move = 0;
    }
  },
  mounted() {
    // this.initCtx()
  },
  watch: {
    json(val) {
      // console.log(val)
      this.resetForm();
      this.reDraw(val);
    }
  }
};
</script>
