import fetch from 'utils/testPortFetch';

export function importOrder(type,url,obj) {
    return fetch({
        url: '/bmapi/'+url,
        method:type,
        data: obj
    });
}



export function applyCadDB(type,url,obj) {
    return fetch({
        url: '/bmapi/'+url,
        method:type,
        params: obj
    });
}
