import fetch from 'utils/fetch';

export function page(obj) {
  return fetch({
    url: '/bmapi/viewLog',   
    method: 'get',
    params:obj
  });
}

export function getPod(obj) {
  return fetch({
    url: '/bmapi/pods',   
    method: 'get',
    params:obj
  });
}