import fetch from 'utils/fetch';
// PieceworkStatistics
export function page(query) {
  return fetch({
    url: '/bmapi/PieceworkStatistics',   
    method: 'get',
    params: query
  });
}
export function getMes(query) {
  return fetch({
    url: '/bmapi/personal',
    method: 'get',
    params: query 
  });
}


export function downPice(query) {
  return fetch({
    url: '/bmapi/downpice',
    method: 'get',
    params: query 
  });
}
