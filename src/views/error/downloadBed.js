import fetch from 'utils/fetch';

export function bedinfo(params) {
    return fetch({
      url: '/bmapi/bedinfo',
      method: 'get',
      params
    });
  }
  

export function downbedinfo(params) {
    return fetch({
        url: '/bmapi/downbedinfo',
        method: 'get',
        params
    });
}

export function downbedinfos(params) {
    return fetch({
        url: '/bmapi/downbedinfos',
        method: 'get',
        params
    });
}