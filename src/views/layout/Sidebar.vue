<template>
<transition name="fade" appear>
  <el-menu mode="vertical" theme="dark" class="el-menu-vertical-demo" unique-opened  :collapse="isCollapse">
    <div class="logo" v-if="!isCollapse">
      <a href="http://www.etsystem.cn/" target="_blank"> <img src="./logo.png" alt="logo" /></a>
    </div>
    <div v-else>
      <a href="http://www.etsystem.cn/" target="_blank"> <img src="./avatar.png" alt="logo" style="margin:0 auto;width:30px; display:block;"/></a>
    </div>
    <!-- <sidebar-item :routes='permissionMenus'></sidebar-item> -->
      <template v-for="item in permissionMenus">
            <!-- <router-link :to="'/'+item.code+'/'+item.children[0].code"> -->
          <el-menu-item :index="'/'+item.code+'/'+item.children[0].code" v-if="item.children.length==1" @click="handleLink('/'+item.code+'/'+item.children[0].code)" :key="item.code">
              <icon-svg :icon-class="item.children[0].icon"></icon-svg>
              <span slot="title">{{item.children[0].title}}</span>
          </el-menu-item>
            <!-- </router-link> -->
      <el-submenu :index="item.title" :key="item.title"  v-else> 
        <template slot="title" >
          <i :class='item.icon1' v-if="item.icon1"></i>
          <icon-svg :icon-class="item.icon"></icon-svg>
          <span>{{item.title}}</span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]' :key="child">
          </sidebar-item>
          <router-link v-else :to="'/'+item.code+'/'+child.code" :key="child.code">
            <el-menu-item :index="'/'+item.code+'/'+child.code">
              <icon-svg :icon-class="child.icon"></icon-svg>
              <span>{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </el-menu>
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
  </transition>
</template>


<script>
  import {
    mapGetters
  } from 'vuex';
  import SidebarItem from './SidebarItem';
  export default {
    components: {
      SidebarItem
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'permissionMenus'
      ]),
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    data(){
      return{
      // isCollapse:true
      }
    },
    created(){
      // console.log(this.$store.getters.permissionMenus);
      // router.push(this.$store.getters.permissionMenus)
    },
    methods:{
      handleLink(url){
        // console.log(url)
        // console.log(this.$route.path)
        this.$router.push(url)
      }
    }
  }
</script>

<style>
  .logo{
    display: block;
    margin:10px auto 0;
    width:140px;
    height: 30px;

  }

  .logo img{
    width: 140px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }


  .el-menu-item .el-tooltip{
    padding: 0!important;
    left:3px
  }

  .el-menu-item, .el-submenu__title{
    padding: 0!important;
    left:3px
  }

</style>

