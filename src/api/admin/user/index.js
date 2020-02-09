
// EmployeeManagement
import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/bmapi/staffmanage',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/bmapi/staffmanage?obj',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/bmapi/staffmanager/' + id,
    method: 'get'
  })
}

export function delObj(obj) {
  return fetch({
    url: '/bmapi/staffmanage?obj',
    method: 'delete',
    data:obj
  })
}

export function putObj(obj) {
  return fetch({
    url: '/bmapi/staffmanage?obj',
    method: 'put',
    data: obj
  })
}

export function selectObj(obj){
  return fetch({
    url:'/bmapi/process?id='+obj,
    method:'get'
  })
}

export function getPersonal(query) {
  return fetch({
    url: '/bmapi/personal',
    method: 'get',
    params: query
  });
}
export function showProcess(id){
  return fetch({
    url: '/bmapi/process?id='+id ,
    method: 'get'
  })
}


//获取品类
export function getCategory(params){
  return fetch({
    url: '/bmapi/categoryByPL',
    method: 'get',
    params
  })
}

/**获取工序 */
export function getProcess(params) {
  return fetch({
    url: '/bmapi/process' ,
    method: 'get',
    params
  })
}