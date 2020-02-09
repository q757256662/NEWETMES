<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <levelbar></levelbar>
    <tabs-view></tabs-view>
    <!-- <error-log  class="errLog-container" :logsList="log"></error-log> -->
    <div class="userName">
      <!-- <el-button @click="handleEntrance">入口</el-button> -->
      <router-link to="/dashboard">
        <el-tag size="medium" class="tag" type="primary">
          {{this.$store.state.user.roles | rolesChange}}{{" ： "+this.$store.state.user.name}}</el-tag>
      </router-link>
    </div>
    <!-- <el-tooltip class="item" effect="light" content="点击全屏" placement="top-start"> -->
    <!-- <screenfull class='screenfull' style="margin:0 40px"></screenfull> -->
    <!-- </el-tooltip> -->
    <el-dropdown class="avatar-container" trigger="click">
      <!-- <el-tooltip class="item" effect="light" content="点击选择帮助,个人信息,退出" placement="top-start"> -->
      <!-- <div class="avatar-wrapper"> <img class="user-avatar" src="./avatar.png">
        <i class="el-icon-arrow-down"></i>
      </div> -->
      <el-button type="primary" size="small" class="settingBTN"><icon-svg icon-class="setting"></icon-svg>&nbsp;设置</el-button>
      <!-- </el-tooltip> -->
      <el-dropdown-menu  class="user-dropdown" slot="dropdown" style="font-size:15px">
        <!-- <a  @click="Tohelp">
        <el-dropdown-item  >帮         助  </el-dropdown-item></a> -->
        <router-link class='inlineBlock' to="/dashboard">
          <el-dropdown-item > 个人信息 </el-dropdown-item>
        </router-link>
        <router-link v-if="rolePower == '1'|| rolePower == '2'" class='inlineBlock' to="/baseManager/addModel">
          <el-dropdown-item> 常用款式参数 </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <MsgRemind class="msgRemind"></MsgRemind>
  </el-menu>
</template>

<script>
  import {
    mapGetters
  } from "vuex";
  import Levelbar from "./Levelbar";
  import TabsView from "./TabsView";
  import Hamburger from "components/Hamburger";
  import Screenfull from "components/Screenfull";
  import ErrorLog from "components/ErrLog";
  import MsgRemind from "components/MsgRemind";
  import errLogStore from "store/errLog";
  import {
    getToken,
    getRole
  } from "utils/auth";
  export default {
    components: {
      Levelbar,
      TabsView,
      Hamburger,
      ErrorLog,
      Screenfull,
      MsgRemind
    },
    data() {
      return {
        log: errLogStore.state.errLog,
        rolePower: getRole()
      };
    },
    computed: {
      ...mapGetters(["sidebar", "name", "avatar"])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch("ToggleSideBar");
      },
      logout() {
        this.$store.dispatch("FedLogOut").then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      },
      Tohelp() {
        // console.log('bangzhu')
        window.open("static/help.html?role=" + this.rolePower);
      },
      handleEntrance(){
        /**State==4 待处理状态 */
        this.$router.push({name:"生产单管理",params:{State:4}})
      }
    },
    filters: {
      rolesChange(role) {
        if (role == 0) {
          return "普通员工";
        } else if (role == 1) {
          return "主管";
        } else {
          return "管理员";
        }
      }
    }
  };

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .navbar {
    // border:1px solid red;
    position: relative;
    // float:left;
    background-color: #fff;
    border-bottom: 1px solid #e6e6e6;
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    // min-width: 800px;
    width: 100%;
    margin-left: 1px;
    .hamburger-container {
					line-height: 58px;
					height: 50px;
					float: left;
          padding: 0 10px;
          position:absolute;
          left:-20px;
          top:300px;
          z-index: 1000;
      }
      .hamburger-container:hover{
          z-index: 10020;
      }
    .errLog-container {
      display: inline-block;
      position: absolute;
      right: 150px;
    }

    .userName {
      position: absolute;
      top: 13px;
      right: 184px;
      height: 28px;
      line-height: 28px;
      color: #20a0ff !important;

      .tag {
        font-size: 16px;
        padding:0 10px;
      }
    }

    .help {
      position: absolute;
      top: 2px;
      font-size: 20px;
      right: 158px;
    }

    .screenfull {
      position: absolute;
      right: 90px;
      top: 16px;
      color: red;
    }

    .avatar-container {
      height: 50px;
      display: inline-block;
      position: absolute;
      right: 111px;
      vertical-align: middle;
      height: 32px;

      .settingBTN {
        padding: 9px;
      }
      
    }
    .msgRemind {
      width: 44px;
      height: 32px;
      display: inline-block;
      float: right;
      margin-right: 58px;
    }
  }
  // .text{
  //   height: 50px;
  //   position: fixed;
  //   width: 80%;
  //   z-index: 999;
  // }
</style>
