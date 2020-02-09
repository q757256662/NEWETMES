import fetch from 'utils/fetch';


/**获取所有的API列表 */
export function getRequestInfoAll() {
  return fetch({
    url: '/bmapi/requests/getrequestinfoall',
    method: 'get'
  });
}

/**提交请求API列表 */
export function getRequests(params) {
  return fetch({
    url: '/bmapi/requests/getrequests',
    method: 'get',
    params
  });
}

