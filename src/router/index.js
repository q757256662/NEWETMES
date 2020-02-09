import Vue from 'vue';
import Router from 'vue-router';
const _import = require('./_import_' + process.env.NODE_ENV);
// in development env not use Lazy Loading,because Lazy Loading large page will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router);

/* layout */
import Layout from '../views/layout/Layout';

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [{
  path: '/login',
  component: _import('login/index'),
  hidden: true
},
{
path: '/Interlogin',
component: _import('login/index1'),
hidden: true
},
{
  path: '/authredirect',
  component: _import('login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: _import('error/404'),
  hidden: true
},
{
  path: '/downLoadBed',
  component: _import('error/401'),
  hidden: false
},
{
  path:"/partDetails",
  component:_import('partDetails/index'),
  hidden:false
},
{
  path: '/',
  component: Layout,
  // redirect: '/dashboard',
  // redirect: '/orderSearch',
  redirect: '/baseManager/StyleIquiry',
  
  // name: ' 个人信息',
  name: ' 款式管理',
  // hidden: true,
  hidden: false,
  children: [{
    // path: 'dashboard',
    // path: 'orderSearch',
    path: 'partner',
    // component: _import('dashboard/index')
    // component: _import('admin/test/test1')
    // component: _import('admin/test/test')
      // component: _import('admin/orderSearch/orderSearch')
      component: _import('admin/partner/index')
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  icon: 'form',
  name: '个人信息',
  noDropdown: true,
  children: [{
    path: 'dashboard',
    component: _import('admin/test/test')
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/baseManager/EmployeeManagement',
  name: ' 员工管理',
  hidden: true,
  meta: { role: '1' },
  children: [{
    path: 'EmployeeManagement',
    // component: _import('dashboard/index')
    component: _import('admin/test/test1')
    // component: _import('admin/test/test')
    
  }]
},
{
  path: '/',
  component: Layout,
  redirect: '/baseManager/PipelineManagement',
  name: ' 流水线管理',
  hidden: true,
  meta: { role: '2' },
  children: [{
    path: 'PipelineManagement',
    // component: _import('dashboard/index')
    component: _import('admin/group/index')
    // component: _import('admin/test/test')
    
  }]
},
{
  path: '/introduction',
  component: Layout,
  redirect: '/introduction/index',
  icon: 'form',
  noDropdown: true,
  children: [{
    path: 'index',
    component: _import('introduction/index'),
    name: '帮助'
  }]
}
]

export default new Router({
  //  mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
});

export const asyncRouterMap = [{
  path: '/baseManager',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'baseManager',
  children: [{
    path: 'EmployeeManagement',
    icon: 'fa-user',
    component: _import('admin/user/index'),
    name: '员工管理',
    authority: 'EmployeeManagement'
  },
  {
    path: 'EmployeeManagement1',
    icon: 'fa-user',
    component: _import('admin/test/test'),
    name: '个人信息',
    authority: 'EmployeeManagement1'
  },
  {
    path: 'dashboard',
    icon: 'fa-user',
    component: _import('admin/test/test'),
    name: '个人信息',
    authority: 'dashboard'
  },
  {
    path: 'ProcessModification',
    icon: 'category',
    component: _import('admin/menu/index'),
    name: '谁加了我',
    authority: 'ProcessModification'
  }, {
    path: 'PipelineManagement',
    icon: 'group_fill',
    component: _import('admin/group/index'),
    name: '我加了谁',
    authority: 'PipelineManagement'
  },  {
    path: 'StyleIquiry',
    icon: 'group_fill',
    component: _import('admin/partner/index'),
    name: '寻找伙伴',
    authority: 'StyleIquiry'
  }, 
  {
    path: 'staffTypeManager',
    icon: 'fa-user',
    component: _import('admin/staff/index'),
    name: '员工管理',
    authority: 'staffTypeManager'
  }, 
  {
    path: 'SampleDetails',
    icon: 'fa-user',
    component: _import('admin/customerinform/index'),
    name: '样板详情',
    authority: 'SampleDetails'
  }, 
  {
    path: 'orderSearch',
    icon: 'edit',
    component: _import('admin/orderSearch/orderSearch'),
    name: '生产单查询',
    authority: 'orderSearch'
  }, 
  {
    path: 'orderManage',
    icon: 'office',
    component: _import('admin/orderManage/orderManage'),
    name: '生产单',
    authority: 'orderManage'
  }, 
  {
    path: 'synthesize',
    icon: 'fa-user',
    component: _import('admin/synthesize/synthesize'),
    name: '系统维护',
    authority: 'synthesize'
  }, 
  {
    path: 'orderDetail',
    icon: 'edit',
    component: _import('admin/orderSearch/orderDetail'),
    name: '生产单查询',
    authority: 'orderDetail'
  }, 
  {
    path: 'BOM',
    icon: 'edit',
    component: _import('admin/demo/BOM'),
    name: 'BOM',
    authority: 'BOM'
  }, 
  {
    path: 'LSH',
    icon: 'edit',
    component: _import('admin/demo/LSH'),
    name: 'LSH',
    authority: 'LSH'
  }, 
  {
    path: 'Mark',
    icon: 'edit',
    component: _import('admin/demo/Mark'),
    name: 'Mark',
    authority: 'Mark'
  }, 
  {
    path: 'SaveOrderFile',
    icon: 'edit',
    component: _import('admin/demo/SaveOrderFile'),
    name: '上传生产单文件',
    authority: 'SaveOrderFile'
  }, 
  {
    path: 'SaveModelFile',
    icon: 'edit',
    component: _import('admin/demo/SaveModelFile'),
    name: '上传版单文件',
    authority: 'SaveModelFile'
  }, 
  {
    path: 'Detail',
    icon: 'edit',
    component: _import('admin/demo/Detail'),
    name: '详情',
    authority: 'Detail'
  }, 
  {
    path: 'testPort',
    icon: 'setting',
    component: _import('admin/testPort/testPort'),
    name: '系统工具',
    authority: 'testPort'
  }, 
  {
    path: 'ReDownload',
    icon: 'edit',
    component: _import('admin/demo/ReDownload'),
    name: 'ReDownload',
    authority: 'ReDownload'
  }, 
  {
    path: 'addModel',
    icon: 'edit',
    component: _import('admin/model/addModel'),
    name: '常用款式参数',
    authority: 'addModel'
  }, 
  {
    path: 'setModelPare',
    icon: 'edit',
    component: _import('admin/model/setModelPare'),
    name: '款式参数',
    authority: 'setModelPare'
  }, 
  {
    path: 'gateLogManager',
    icon: 'viewlist',
    component: _import('admin/gateLog/index'),
    name: '操作日志管理',
    authority: 'gateLogManager'
  }, 
   {
    path: 'uploadFile',
    icon: 'viewlist',
    component: _import('admin/upload/uploadFile'),
    name: '我要上传',
    authority: 'uploadFile'
  },
  {
    path: 'PastYearStatistics',
    icon: 'viewlist',
    component: _import('admin/charts/uploadlog'),
    name: '往年统计',
    authority: 'PastYearStatistics'
  },
  {
    path: 'PieceworkStatistics',
    icon: 'viewlist',
    component: _import('admin/charts/line'),
    name: '计件统计',
    authority: 'PieceworkStatistics'
  },
  {
    path: 'PieceworkStatistics1',
    icon: 'viewlist',
    component: _import('admin/charts/line1'),
    name: '样板统计',
    authority: 'PieceworkStatistics1'
  },

  {
    path: 'ProcessDebuggingInterface',
    icon: 'viewlist',
    component: _import('admin/CompanyFileLog/index'),
    name: '流程调试界面',
    authority: 'ProcessDebuggingInterface'
  },
  {
    path: 'DataImport',
    icon: 'viewlist',
    component: _import('admin/CompanyFileLog/needLoad'),
    name: '需要下载',
    authority: 'DataImport'
  },
  {
    path: 'CurrentYearStatistics',
    icon: 'viewlist',
    component: _import('admin/charts/CurrentYearStatistics'),
    name: '当年统计',
    authority: 'CurrentYearStatistics'
  },
  {
    path: 'viewLog',
    icon: 'group',
    component: _import('admin/viewLog/viewLog'),
    name: '查看日志',
    authority: 'viewLog'
  },
  {
    path: 'FlowNumber',
    icon: 'viewlist',
    component: _import('admin/FlowNumber/index'),
    name: '流水号查询',
    authority: 'FlowNumber'
  },
  {
    path: 'categories',
    icon: 'viewlist',
    component: _import('admin/categories/index'),
    name: '品类管理',
    authority: 'categories'
  },
  {
    path: 'orderImport',
    icon: 'viewlist',
    component: _import('admin/orderImport/index'),
    name: '生产单导入',
    authority: 'orderImport'
  },
  {
    path: 'interface',
    icon: 'viewlist',
    component: _import('admin/interface/index'),
    name: '查看接口',
    authority: 'interface'
  }
  // {
  //   path: '/example/table',
  //   component: Layout,
  //   redirect: 'example/table',
  //   icon: 'excel',
  //   noDropdown: true,   
  //   hidden: false ,
  //   meta : { role: ['admin'] } ,
  //   children: [{ path: 'staffManagement', component: _import('example/table/staffManagement'), name:'员工管理', meta: { role: ['admin'] } }]
  // },

]  
}];
