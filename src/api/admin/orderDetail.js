import fetch from 'utils/fetch';
// orderDetail


export function page(query) {
  return fetch({
    url: '/bmapi/bedinfo',   
    method: 'get',
    params: query
  });
}

//床信息
export function pageBed(query) {
  return fetch({
    url: '/bmapi/bedinfo?Id='+query,   
    method: 'get',
  });
}

// 工序列表
export function pageStep(id) {
  return fetch({
    url: '/bmapi/orderDetailProcess?ModelId='+id,   
    method: 'get'
  });
}


// 生产单详情
export function pageProduct(query) {
  return fetch({
    url: '/bmapi/OrderDetail',   
    method: 'get',
    params:query
  });
}
//加载床信息
export function getbedlist(query) {
  return fetch({
    url: '/bmapi/orderDetail',   
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
    url: '/bmapi/styleDetailProcess' ,
    method: 'get'
  })
}

export function delObj(Id) {
  return fetch({
    url: '/bmapi/staffmanager/' + Id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/bmapi/staffmanager?upUser',
    method: 'put',
    data: obj
  })
}

export function podObj(obj) {
  return fetch({
    url: '/bmapi/podinfo?id='+obj,   
    method: 'get'
  })
}

//重置工序
export function resetProcess(obj) {
  return fetch({
    url: '/bmapi/pc',   
    method: 'post',
    data:obj
  })
}
// 获取可移交工序员工
export function getremoveInfo(obj) {
  return fetch({
    url: '/bmapi/taskhandle/acceptUsers',     
    method: 'get',
    params: obj
  })
}
// 移交工序
export function removeProcess(obj) {
  return fetch({
    url: '/bmapi/taskhandle/moveTask', 
    method: 'post',
    data:obj
  })
}
// 移交工序pod特体
export function removePod(obj) {
  return fetch({
    url: '/bmapi/taskhandle/movePod',   
    method: 'put',
    data:obj
  })
}

//新增产量链接
export function GetProInfo(obj) {
  return fetch({
    url: '/bmapi/GetProInfo?orderId='+obj,   
    method: 'get'
  })
}

export function showMes(obj) {
  return fetch({
    url: '/bmapi/measurebodyinfo',
    method: 'get',
    params: obj
  })
}

export function GetlshInfo(obj) {
  return fetch({
    url: '/bmapi/getlshbyerpid',   
    method: 'get',
    params: obj
  })
}

export function GetmaterialInfo(obj) {
  return fetch({
    url: '/bmapi/materialInfo?Id='+obj,   
    method: 'get',
    // params: obj
  })
}


//下载床文件
export function downbed(obj) {
  return fetch({
    url: '/bmapi/downbedinfo',   
    method: 'get',
    params: obj
  })
}
//获取订单信息
export function Getorderjson(obj) {
  return fetch({
    url: '/bmapi/getorderjson',   
    method: 'get',
    params: obj
  })
}


export function putOrderMeterialInfo(obj) {
  return fetch({
    url: '/bmapi/editefabric',
    method: 'put',
    data: obj
  })
}

export function Updatestate(data) {
  return fetch({
    url: '/bmapi/Updatestate',
    method: 'post',
    data
  })
}