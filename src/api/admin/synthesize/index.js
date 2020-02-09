import fetch from 'utils/fetch';

export function page1(query) {
    return fetch({
        url: '/bmapi/FtpAmend/GetFtp',
        method: 'get',
        params: query
    });
}

export function page2(query) {
    return fetch({
        url: '/bmapi/FtpAmend/GetDebug',
        method: 'get',
        params: query
    });
}

export function addObj(obj) {
    return fetch({
        url: '/bmapi/FtpAmend',
        method: 'post',
        data: obj
    });
}

export function getObj(id) {
    return fetch({
        url: '/bmapi/admin/gateLog/' + id,
        method: 'get'
    })
}

export function delObj(id) {
    return fetch({
        url: '/bmapi/admin/gateLog/' + id,
        method: 'delete'
    })
}

export function putObj(obj) {
    return fetch({
        url: '/bmapi/FtpAmend/updateftppwd',
        method: 'put',
        data: obj
    })
}


export function putLog(obj) {
    return fetch({
        url: '/bmapi/FtpAmend/updatebugflg',
        method: 'put',
        data: obj
    })
}

export function DownLog(obj) {
    return fetch({
        url: '/bmapi/downdebug',
        method: 'get',
        data: obj
    })
}

export function Downver(obj) {
    return fetch({
        url: 'http://cywin10:8088/etwebapi/verdown',
        method: 'get',
        data: obj
    })
}    
 
export function Upload(obj) {
    return fetch({
        url: '/bmapi/FtpAmend/testFilesup',
        method: 'post',
        data: obj
    })
}


//数据接口地址设置

// export function setUrl(obj) {
//     return fetch({
//         url: '/bmapi/seturl',
//         method: 'put',
//         data: obj
//     })
// }

export function setUrl(obj) {
    return fetch({
        url: '/bmapi/FtpAmend/seturl',
        method: 'post',
        data: obj
    })
}

//获取获取数据导入地址地址

export function getSetUrl(obj) {
    return fetch({
        url: '/bmapi/FtpAmend/geturl',
        method: 'get',
        data: obj
    })
}
//获取导入方式

export function getOrderWay(obj) {
    return fetch({
        url: '/bmapi/FtpAmend/getimportWay',
        method: 'get',
        data: obj
    })
}

//修改导入模式

export function editOrderWay(obj) {
    return fetch({
        url: '/bmapi/FtpAmend/updateImportWay',
        method: 'put',
        data: obj
    })
}


/**款式按照流水线隔离 */
export function insulateStyle(obj) {
    return fetch({
        url: '/bmapi/FtpAmend/insulateStyle',
        method: 'post',
        data: obj
    })
}


/**获取款式按照流水线隔离 */
export function getinstyle() {
    return fetch({
        url: '/bmapi/FtpAmend/getinstyle',
        method: 'get',
    })
}



/**获取和修改直接进进入生产单流程 */
export function IsDirectImport(data) {
    return fetch({
        url: '/bmapi/import/IsDirectImport',
        method: 'post',
        data
    })
}

/**查看nc文件是否复制到目录下 */
export function getismovenc() {
    return fetch({
        url: '/bmapi/FtpAmend/getismovenc',
        method: 'get'
    })
}

/**修改nc文件是否复制到目录下 */
export function updateismovenc(data) {
    return fetch({
        url: '/bmapi/FtpAmend/updateismovenc',
        method: 'post',
        data
    })
}

/**查看是否忽略物料 */
export function getIsNoFabricEnter() {
    return fetch({
        url: '/bmapi/FtpAmend/getIsNoFabricEnter',
        method: 'get'
    })
}

/**修改忽略物料 */
export function updateIsNoFabricEnter(data) {
    return fetch({
        url: '/bmapi/FtpAmend/updateIsNoFabricEnter',
        method: 'post',
        data
    })
}

/**查看是否成衣忽略样式 */
export function getIsNoStyleEnter() {
    return fetch({
        url: '/bmapi/FtpAmend/getIsNoStyleEnter',
        method: 'get'
    })
}

/**修改成衣忽略样式 */
export function updateIsNoStyleEnter(data) {
    return fetch({
        url: '/bmapi/FtpAmend/updateIsNoStyleEnter',
        method: 'post',
        data
    })
}

/**查看是否简化流程 */
export function getIsProcessSimplification() {
    return fetch({
        url: '/bmapi/FtpAmend/getIsProcessSimplification',
        method: 'get'
    })
}

/**修改简化流程 */
export function updateIsProcessSimplification(data) {
    return fetch({
        url: '/bmapi/FtpAmend/updateIsProcessSimplification',
        method: 'post',
        data
    })
}