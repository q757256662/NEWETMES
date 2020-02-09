<template>
  <div class='menu-wrapper'>
    

  </div>
</template>

<script>
import { page } from "api/admin/msgRemind/index";
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    }
  },
  data() {
    return {
      isDot: 0
    };
  },
  created() {
    page().then(res => {
      if (res.status == 200) {
        this.isDot = res.data.total;
      }
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.item {
  position: relative;
  top: 3px;
  left: 3px;
}
.nest-menu {
  border: 1px solid red;
}
</style>
