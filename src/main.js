// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
//import '../theme/index.css';
import ElementUI from 'element-ui';

// import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-default/index.css';
import 'assets/custom-theme/index.css'; // 换肤版本element-ui css
// import '@/styles/index.scss' // global css
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式
import 'normalize.css/normalize.css'; // normalize.css 样式格式化
import 'assets/iconfont/iconfont'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import 'assets/iconfont/iconfont1'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import 'assets/iconfont/iconfont1.css'; // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as filters from './filters'; // 全局vue filter
import Multiselect from 'vue-multiselect'; // 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'; // 多选框组件css
import Sticky from 'components/Sticky'; // 粘性header组件
import IconSvg from 'components/Icon-svg'; // svg 组件
import vueWaves from './directive/waves'; // 水波纹指令
import errLog from 'store/errLog'; // error log组件
import x2js from 'x2js' //xml数据处理插件
import { GetUrlParam } from "utils/index";
import './directive/dialogDrag'; //放大模态框
import './mock/index.js'; // 该项目所有请求使用mockjs模拟
import 'handsontable/dist/handsontable.full.css';
import {
  getToken,
  getRole
} from 'utils/auth';
import axios from 'axios';
import Mock from "mockjs";

// import $ from 'jquery';
// import moment from "moment";
// import VueMomentJS from "vue-momentjs";

// Vue.use(VueMomentJS);
// Vue.use(moment);

Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;


Vue.config.devtools = true;
//更改时间格式
Vue.prototype.ChangeDateFormat = function (row, column) {

  // ChangeDateFormat(row, column) {
  //   var jsondate = row[column.property];

  var jsondate = row[column.property];
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  } else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }
  var date = new Date(parseInt(jsondate, 10));
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  // return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minutes + ":" + second;
  return month + "-" + currentDate + " " + hour + ":" + minutes;
}

//更改工序名称
Vue.prototype.changeProcessName = function (row) {
  var total = "";
  switch (row.Code) {
    case 1:
      total = "导入样式";
      break;
      case 2:
      total = "修改样式";
      break;
      case 12:
      total = "修改样式";
      break;
    case 14:
      total = "放码";
      break;
    case 16:
      total = "检查纸样";
      break;
    case 18:
      total = "估算用量";
      break;
    case 22:
      total = "修改样式";
      break;
    case 24:
      total = "放码";
      break;
    case 26:
      total = "改驱动规则";
      break;
      case 28:
      total = "检查纸样";
      break;
    case 33:
      total = "尺码压缩";
      break;
    case 34:
      total = "尺寸驱动";
      break;
    case 35:
      total = "特体检查";
      break;
    case 37:
      total = "裁剪规划";
      break;
    case 42:
      total = "生产单导入";
      break;
    case 43:
      total = "修改纸样";
      break;
    case 45:
      total = "放码";
      break;
    case 46:
      total = "检查";
      break;
    case 48:
      total = "排料";
      break;
    case 53:
      total = "尺寸驱动";
      break;
    case 54:
      total = "特体检查";
      break;
    case 57:
      total = "裁剪规划";
      break;
    default:
      total = "其他";
      break;
  }
  return total;
}


// register globally
Vue.component('multiselect', Multiselect);
Vue.component('Sticky', Sticky);
Vue.component('icon-svg', IconSvg)
Vue.prototype.$x2js = new x2js() //创建x2js对象，挂到vue原型上
Vue.use(ElementUI);
Vue.use(vueWaves);
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// register global progress.
const whiteList = ['/login', '/authredirect','/downLoadBed','/Interlogin']; // 不重定向白名单

 Vue.prototype.bowserExplorer = '';
 Vue.prototype.isInnerIPFn = '';
// console.log(token);
//浏览器版本
function bowser(){
    var explorer = navigator.userAgent; 
    var explorer2 = navigator.userAgent.toLowerCase();
    var  rMsie = /msie\s|trident/g; //ie所有版本验证
     //ie 
     if (rMsie.test(explorer2) == true) {
      Vue.prototype.bowserExplorer ='ie'
        //  console.log('ie');
    }
    //Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
      Vue.prototype.bowserExplorer ='Chrome';
        // console.log('Chrome');
        // alert("Chrome");
    }
}
bowser();




// console.log(window.location.href.substring(window.location.href.indexOf('#')+1));


router.beforeEach((to, from, next) => {

  NProgress.start(); // 开启Progress
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({
        path: '/'
      });
    }
    else {
      if (store.getters.menus === undefined) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(info => { // 拉取user_info
          const menus = {};
          for (let i = 0; i < info.menus.length; i++) {
            menus[info.menus[i].code] = true;
          }
          
          store.dispatch('GenerateRoutes', menus).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            if(getRole() !== '1'){
              next({ ...to
              }); // hack方法 确保addRoutes已完成
              next('/dashboard')
            }else{
              next({ ...to
              }); // hack方法 确保addRoutes已完成
            }
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
       
            next({
              path: '/login'
            });
          })
        })
      } else {
        //  else {
        //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //   if (hasPermission(store.getters.roles, to.meta.role)) {
        //     next();//
        //   } else {
        next();
        //   }
        //   // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
        
    } else {
        next('/login'); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

Vue.config.productionTip = false;


/*判断是否是内网IP*/
function isInnerIPFn(){
     // 获取当前页面url
      var curPageUrl = window.location.href;
  //     console.log('curPageUrl-0  '+curPageUrl);
  
      var reg1 = /(http|ftp|https|www):\/\//g;//去掉前缀
      curPageUrl =curPageUrl.replace(reg1,'');
      // console.log('curPageUrl-1  '+curPageUrl);
  
      var reg2 = /\:+/g;//替换冒号为一点
      curPageUrl =curPageUrl.replace(reg2,'.');
      // console.log('curPageUrl-2  '+curPageUrl);
  
      curPageUrl = curPageUrl.split('.');//通过一点来划分数组
      console.log(curPageUrl);
  
      var ipAddress = curPageUrl[0]+'.'+curPageUrl[1]+'.'+curPageUrl[2]+'.'+curPageUrl[3];
      
      var isInnerIp = false;//默认给定IP不是内网IP
      var ipNum = getIpNum(ipAddress);
      /**
       * 私有IP：
       *         A类  10.0.0.0    -10.255.255.255
       *       B类  172.16.0.0  -172.31.255.255
       *       C类  192.168.0.0 -192.168.255.255
       *       D类  127.0.0.0   -127.255.255.255(环回地址)
       **/
      var aBegin = getIpNum("10.0.0.0");
      var aEnd = getIpNum("10.255.255.255");
      
      var bBegin = getIpNum("172.16.0.0");
      var bEnd = getIpNum("172.31.255.255");
      
      var cBegin = getIpNum("192.168.0.0");
      var cEnd = getIpNum("192.168.255.255");
      
      var dBegin = getIpNum("127.0.0.0");
      var dEnd = getIpNum("127.255.255.255");
      
      isInnerIp = isInner(ipNum,aBegin,aEnd) || isInner(ipNum,bBegin,bEnd) || isInner(ipNum,cBegin,cEnd) || isInner(ipNum,dBegin,dEnd);
  //     console.log('是否是内网:'+isInnerIp);
      return isInnerIp;
  }
  
  function getIpNum(ipAddress) {/*获取IP数*/
      var ip = ipAddress.split(".");
      var a = parseInt(ip[0]);
      var b = parseInt(ip[1]);
      var c = parseInt(ip[2]);
      var d = parseInt(ip[3]);
      var ipNum = a * 256 * 256 * 256 + b * 256 * 256 + c * 256 + d;
      return ipNum;
  }
  
  function isInner(userIp,begin,end){
      return (userIp>=begin) && (userIp<=end);
  }

  Vue.prototype.isInnerIPFn =  isInnerIPFn();

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    // console.log(err, window.location.href);
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  };
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
