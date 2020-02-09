import fetch from 'utils/fetch';


export function getList(query) {
    return fetch({
      url: '/bmapi/demo/buyiGetModel',   
      method: 'get',
      params: query
    });
  }

  export function PostMark(obj) {
    return fetch({
        url: '/bmapi/demo/vuebuyiPostreturn',
        method: 'post',
        data: obj,
    })
}



export function CreatFtpInfo(obj) {
    return fetch({
        url: '/bmapi/demo/createftp',
        method: 'post',
        params: obj
    })
}




export function LockOrder(obj) {
    return fetch({
        url: '/bmapi/demo/buyiLockOrder',
        method: 'post',
        params: obj
    })
}

export function LockModel(obj) {
    return fetch({
        url: '/bmapi/demo/buyiLockModel',
        method: 'post',
        params: obj
    })
}



export function getFilebyIdList(query) {
    return fetch({
      url: '/bmapi/demo/getFileinfobyId',   
      method: 'get',
      params: query
    });
  }


  export function getFileList(query) {
    return fetch({
      url: '/bmapi/demo/getFileList',   
      method: 'get',
      params: query
    });
  }
  


 export function getsinglejson(query) {
    return fetch({
      url: '/bmapi/demo/singlejson',   
      method: 'get',
      params: query
    });
  }

  export function getuploadftp(obj) {
    return fetch({
        url: '/bmapi/demo/uploadftp',
        method: 'post',
        params: obj
    })
}

export function getSavaFileParap(obj) {
    return fetch({
        url: '/bmapi/demo/savaFilePara',
        method: 'post',
        params: obj
    })
}



// export function PostBom(obj) {
//     return fetch({
//         url: '/bmapi/demo/buyiPostBom',
//         method: 'post',
//         // data: obj
//         params: obj
//     })
// }

export function PostBom(obj) {
    return fetch({
        url: '/bmapi/demo/vuebuyiPostreturn',
        method: 'post',
        data: obj,
    })
}



export function getStyleInfo(query) {
    return fetch({
      url: '/bmapi/styleDetail',   
      method: 'get',
      params: query
    });
  }


//   delefailfile

export function deleteFailFile(obj) {
    return fetch({
      url: '/bmapi/demo/delefailfile',
      method: 'delete',
      params: obj
    })
  }

// /bmapi/demo/vueeditefabric

export function getEditFabric(query) {
    return fetch({
      url: '/bmapi/demo/vuegetfabriclist',   
      method: 'get',
      params: query
    });
  }

  export function postEditFabric(query) {
    return fetch({
      url: '/bmapi/demo/vueeditefabric',   
      method: 'post',
      data: query
    });
  }