import fetch from 'utils/fetch';
// orderSearch
export function page(query) {
  return fetch({
    url: '/bmapi/orderSearch',   
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/bmapi/partner?obj',
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

export function putObj(obj) {
  return fetch({
    url: '/bmapi/staffmanager?upUser',
    method: 'put',
    data: obj
  })
}

export function bindObj(obj) {
  return fetch({
    url: '/bmapi/binding',
    method: 'put',
    data: obj
  })
}

export function unBindObj(obj) {
  return fetch({
    url: '/bmapi/removebinding ',
    method: 'put',
    data: obj
  })
}

export function delObj(obj){
  return fetch({
    url: '/bmapi/order',
    method: 'put',
    data: obj
  })
}

export function editObj(obj){
  return fetch({
    url: '/bmapi/order',
    method: 'put',
    data: obj
  })
}

export function delOrder(id){
  return fetch({
    url: '/bmapi/order?Id='+id,
    method: 'delete',
  
  })
}

export function downObj(form){
  return fetch({
    url: '/bmapi/downOrder?Id='+form.Id+"&token="+form.token,
    method: 'get'
  })
}

export function getProcess(id) {
  return fetch({
    url: '/bmapi/styleDetail?ModelName='+id ,
    method: 'get'
  })
}
// 重置
export function restOrder(obj) {
  return fetch({
    url: '/bmapi/pc',
    method: 'post',
    data: obj
  });
}

//设定裁剪规划

export function  editRemove(obj) {
  return fetch({
    url: '/bmapi/setOrderDoMark',
    method: 'put',
    data: obj
  });
}

/**初始化生产单导入 */
export function orderlogs(params){
  return fetch({
    url: '/bmapi/requests/getorderlogs',
    method: 'get',
    params
  });
}

/**获取单个生产单 */
export function getorderlogone(params){
  return fetch({
    url: '/bmapi/requests/getorderlogone',
    method: 'get',
    params
  });
}

/**导入生产流程 */
export function entryprocess(data){
  return fetch({
    url: '/bmapi/import/entryprocess',
    method: 'post',
    data
  });
}

/**更新物料名称 */
export function updateJson(data){
  return fetch({
    url: '/bmapi/requests/UpdateJson',
    method: 'post',
    data
  });
}

/**获取所有流水线 */
export function onGetLine(params){
  return fetch({
    url: '/bmapi/pl/GetPLALL',
    method: 'get',
    params
  });
}



/**获取所有流水线 */
export function updatePL(data){
  return fetch({
    url: '/bmapi/requests/UpdatePL',
    method: 'post',
    data
  });
}


/**获取所有流水线 */
export function GetRequestsByOrderName(params){
  return fetch({
    url: '/bmapi/requests/GetRequestsByOrderName',
    method: 'get',
    params
  });
}
