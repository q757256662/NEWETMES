import fetch from 'utils/fetch';
// category

export function getList() {
  return fetch({
    url: '/bmapi/category',
    method: 'get'
  })
}

export function putCategory(obj) {
  return fetch({
    url: '/bmapi/category',
    method: 'post',
    data: obj
  })
}

export function delCategory(obj) {
  return fetch({
    url: '/bmapi/category',
    method: 'delete',
    data: obj
  })
}

/**修改品类 */
export function UpdatePLCategory(data) {
  return fetch({
    url: '/bmapi/PLCategory/UpdatePLCategory',
    method: 'post',
    data
  })
}