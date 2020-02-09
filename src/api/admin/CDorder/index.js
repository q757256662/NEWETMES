import fetch from 'utils/fetch';

export function getList(query) {
    return fetch({
      url: '/bmapi/CY/getTasks',   
      method: 'get',
      params: query
    });
  }

  export function Postapply(obj) {
    return fetch({
        url: '/bmapi/CY/applyTask',
        method: 'post',
        data: obj,
    })
}


export function finishapply(obj) {
  return fetch({
      url: 'bmapi/CY/canyoufinish',
      method: 'post',
      data: obj,
  })
}

export function finishCodey(obj) {
  return fetch({
      url: 'bmapi/CY/finishOneCode',
      method: 'post',
      data: obj,
  })
}
