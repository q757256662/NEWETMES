import fetch from 'utils/fetch';


export function page(query) {
    return fetch({
      url: '/bmapi/erporder',   
      method: 'get',
      params: query
    });
  }


  export function importErp(obj) {
    return fetch({
        url: '/bmapi/erpdataImport',
        method: 'post',
        data: obj
    })
}

export function UpLoadXml(obj) {
  return fetch({
      url: '/bmapi/simulateImport/uploadXml',
      method: 'post',
      data: obj
  })
}

//获取模拟导入数据

export function pageSim(query) {
  return fetch({
    url: '/bmapi/simulateImport/getxmldatas',   
    method: 'get',
    params: query
  });
}

export function importSimErp(obj) {
  return fetch({
      url: '/bmapi/simulateImport/importdata',
      method: 'post',
      data: obj
  })
}