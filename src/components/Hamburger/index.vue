<template>
  <div @click="toggleClick" class="hamburger" >
    <!-- <svg t="1492500959545"  style="" viewBox="0 0 1024 1024"
      version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
      <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
        p-id="1692"></path>
      <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
        p-id="1693"></path>
      <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
        p-id="1694"></path>
    </svg> -->
    <div class="arrow-border">
      <i class="el-icon-arrow-right" :class="{'is-active':isActive}"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 20px;
	height: 20px;
	transition: .38s;
  transform-origin: 50% 50%;
  
}
/* .hamburger.is-active .el-icon-arrow-right{
	transform: rotate(0deg);
} */

.hamburger:hover{
}
.el-icon-arrow-right{
	transform: rotate(0deg);
  color:#fff;
}

.el-icon-arrow-right.is-active{
	transform: rotate(-180deg);
}

.arrow-border{
  width: 20px;
  padding-left:4px;
  height: 80px;
  border-radius: 30%;
  background:#324157;
  line-height: 80px;
  z-index: 10000;
}

.arrow-border:hover{
  /* border:1px solid red; */
  background:rgb(72,87,106);

}
</style>
