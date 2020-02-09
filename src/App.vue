<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {
    getToken,
    setToken,
    removeToken
  } from '@/utils/auth';
  export default {
    name: 'APP',
    data() {
      return {
        // bowserExplorer:''
      }
    },
    created() {
      // this.toLogin();
      var hrefUrl = window.location.toString();
      // console.log(hrefUrl.substring(hrefUrl.indexOf('#')+1,hrefUrl.length));
      var firsturl = hrefUrl.substring(hrefUrl.indexOf('#') + 1, hrefUrl.length)
      // console.log(token);
      // alert(firsturl)
      //浏览器版本
      // console.log(this.bowserExplorer)
      var explorer = navigator.userAgent;
      var explorer2 = navigator.userAgent.toLowerCase();
      var rMsie = /msie\s|trident/g; //ie所有版本验证
      //ie 
      if (rMsie.test(explorer2) == true) {
        this.bowserExplorer = 'ie'
        //  console.log('ie');
        try {
          this.GetToken();
        } catch (error) {}
      }
      //Chrome
      else if (explorer.indexOf("Chrome") >= 0) {
        this.bowserExplorer = 'Chrome';
        // console.log('Chrome');
        try {
          this.GetToken();
        } catch (error) {}
        // alert("Chrome");
      }
    },
    methods: {
      GetToken() {
        var mes = '';
        if (this.bowserExplorer == 'ie') {
          try {
            mes = window.external.GetToken(1600, 1200);
            if (mes != '' || mes != null || mes != undefined) {
              setToken(mes);
            }
            localStorage.setItem('isCAD', '1');
            this.$router.push({
              path: firsturl
            })
          } catch (err) {}
          // alert(this.isCAD);
        } else {
          try {
            mes = window.buyiGetToken(1600, 1200);
              if (mes != '' || mes != null || mes != undefined) {
              setToken(mes);
            }
            localStorage.setItem('isCAD', '1');
            this.$router.push({
              path: firsturl
            })
          } catch (err) {}
        }
        // alert(mes);返回值是mac;
      },
     toLogin(){
       if(this.isInnerIPFn ){
     
          this.$router.push({
              path: '/Interlogin'
            })
       }else{
      
          this.$router.push({
              path: '/login'
            })
       }
     } 
    }
  }
</script>

<style lang="scss">
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
