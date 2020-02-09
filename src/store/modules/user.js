import {
  loginByEmail,
  logout,
  getInfo,
  getMenus
} from 'api/login';
import {
  getToken,
  setToken,
  getRole,
  setRole,
  removeToken
} from 'utils/auth';
import {
  getPersonal
} from "api/admin/user/index";
import {
  Message
} from 'element-ui';
const user = {
  state: {
    orderState:'',
    bindorderStatus:'',
    user: '',
    login_id:'',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    PLID:'',
    roles: [],
    menus: undefined,
    elements: undefined,
    permissionMenus: undefined,
    setting: {
      articlePlatform: []
    },
    showbindorderstatus:'',
  },
 

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_PLID: (state, PLID) => {
      state.PLID = PLID;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },
    SET_LOGINID: (state, menus) => {
      state.login_id = menus;
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    },
    SET_ORDER: (state,orderState) =>{
      state.orderState = orderState;
    },
    SET_ORDERTYPE: (state,ordertype) =>{
      state.ordertype = ordertype;
    },
    SET_BINDORDER: (state,bindorderStatus) =>{
      state.bindorderStatus = bindorderStatus;
    },
    SET_SHOWBINDORDER: (state,showbindorderStatus) =>{
      state.showbindorderStatus = showbindorderStatus;
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus;
    }
  },

  actions: {
    // 邮箱登录
    LoginByEmail({commit}, userInfo) {
      const username = userInfo.username.trim();
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      commit('SET_MENUS', undefined);
      commit('SET_ELEMENTS', undefined);
      removeToken();
      return new Promise((resolve, reject) => {
        loginByEmail(username, userInfo.password,userInfo.lockinnum).then(response => {
          const data = response.data;
          // console.log(response);
        //   if (data.role === -2) {
        //     Message({
        //       message: '该用户不存在！',
        //       type: 'warning'
        //     });
        //     return Promise.reject('error');
        //   } 
        //  else if (data.role === -1) {
        //     Message({
        //       message: '登录密码有误',
        //       type: 'warning'
        //     });
        //     return Promise.reject('error');
        //   } 
        //   else if (data.role === -3) {
        //     Message({
        //       message: '该用户不合法',
        //       type: 'warning'
        //     });
        //     return Promise.reject('error');
        //   }
            if(response.status==200){
            setToken(data.token);
            setRole(data.role);
            commit('SET_TOKEN', data.token);
            commit('SET_ROLES', [data.role]); 
            resolve(response);
            }else{
              reject(response);
            }
            
        }).catch((err) => {
          reject(response);
        });
      });
    },

    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise( (resolve, reject) => {
        getInfo(state.token).then(async response => {
          const data = response;
          // console.log('================')
          // console.log(data);
          const res = await getPersonal()
          commit('SET_PLID',res.data.PLID);
          commit('SET_NAME',res.data.name);
          commit('SET_ROLES',res.data.power);
          commit('SET_LOGINID',res.data.login_id);
          // commit('SET_ROLES', 'admin');
          // commit('SET_NAME', data.name);
          // commit('SET_AVATAR', 'http://git.oschina.net/uploads/42/547642_geek_qi.png?1499487420');
          commit('SET_INTRODUCTION', data.description);
          const menus = {};
          for (let i = 0; i < data.menus.length; i++) {
            menus[data.menus[i].code] = true;
          }
          commit('SET_MENUS', menus);
          const elements = {};
          for (let i = 0; i < data.elements.length; i++) {
            elements[data.elements[i].code] = true;
          }
          commit('SET_ELEMENTS', elements);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
        getMenus(state.token).then(response => {
          // console.log(response);
          commit('SET_PERMISSION_MENUS', response);
        });
        
      });
    },

    // 第三方验证登录
    LoginByThirdparty({commit,state}, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code).then(response => {
          commit('SET_TOKEN', response.data.token);
          setToken(response.data.token);
          // console.log("token:  " + response.data.token  )
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
  // 生产单状态

  GetOrderState({
    commit,
    state
  },orderstatus){
    // console.log(orderstatus)
    commit('SET_ORDER', orderstatus);
  //  return  commit('SET_ORDER', orderstatus)
  },
  GetOrderType({
    commit,
    type
  },ordertype){
    // console.log(orderstatus)
    commit('SET_ORDERTYPE', ordertype);
  // return  commit('SET_ORDER', orderstatus)
  },
  
  //绑定状态
  GetBindOrderState({
    commit,
    state
  },bindorderstatus){
    // console.log(bindorderstatus)
    commit('SET_BINDORDER', bindorderstatus);
  //  return  commit('SET_ORDER', orderstatus)
  },

    //绑定显示
    ShowBindOrderState({
      commit,
      state
    },showbindorderstatus){
      // console.log(showbindorderstatus)
      commit('SET_SHOWBINDORDER', showbindorderstatus);
    //  return  commit('SET_ORDER', orderstatus)
    },
  

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          commit('SET_MENUS', undefined);
          commit('SET_ELEMENTS', undefined);
          commit('SET_PERMISSION_MENUS', undefined);
          removeToken();
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_MENUS', undefined);
        commit('SET_ELEMENTS', undefined);
        commit('SET_PERMISSION_MENUS', undefined);
        removeToken();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({
      commit
    }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        setToken(role);
        resolve();
      })
    }
  }
};

export default user;
