
// EmployeeManagement1
import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/bmapi/personal',
    method: 'get',
    params: query
  });
}

// export function page(query) {
//   return fetch({
//     url: '/test/comments',
//     method: 'get',
//     params: query
//   });
// }

export function addObj(obj) {
  return fetch({
    url: '/test/comments?obj',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/test/comments/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/test/comments/' + id,
    method: 'delete'
  })
}

// export function putObj(id,obj) {
//   return fetch({
//     url: '/bmapi/personal/' + id,
//     method: 'put',
//     data: obj
//   })
// }

export function putObj(obj) {
  return fetch({
    url: '/bmapi/personal?obj',
    method: 'put',
    data: obj
  })
}



/**测试接口 */

export function DownNC(params) {
  return fetch({
    url: '/bmapi/export/nc',
    method: 'get',
    params
  })
}

/**下载PLT文件 */
export function DownPLT(params){
  return fetch({
    url: '/bmapi/export/plt',
    method: 'get',
    params
  })
}

/**下载PLT文件 */
export function DownCr(params){
  return fetch({
    url: '/bmapi/export/cr',
    method: 'get',
    params,
    responseType: 'blob',
  })
}

/**下载Excel文件 */
export function DownExcel(params){
  return fetch({
    url: '/bmapi/export/excel',
    method: 'get',
    params,
    responseType: 'blob',
    headers:{
      'Content-Type': 'application/json; application/octet-stream'
  },
  })
}
