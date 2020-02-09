import fetch from 'utils/fetch';

export function page(query) {
    return fetch({
      url: '/bmapi/createstyle/getparanames',   
      method: 'get',
      params: query
    });
  }


  export function addModel(obj) {
    return fetch({
        url: '/bmapi/createstyle/addpara',
        method: 'post',
        data: obj
    })
}

export function updateModel(obj) {
  return fetch({
    url:'/bmapi/createstyle/updateparaname',
    method: 'put',
    data: obj
  })
}


export function deleteModel(obj) {
  return fetch({
    url: '/bmapi/createstyle/delparaname',
    method: 'delete',
    data: obj
  })
}



export function pageStyle(query) {
  return fetch({
    url: '/bmapi/createstyle/getstylepara',   
    method: 'get',
    params: query
  });
}
 
export function getpartList(query) {
  return fetch({
    url: '/bmapi/createstyle/getpart',   
    method: 'get',
    params: query
  });
}


export function getparaStyle(query) {
  return fetch({
    url: '/bmapi/createstyle/getstyleparaBysid',   
    method: 'get',
    params: query
  });
}

 


export function getStyleDrivesp(query) {
  return fetch({
    url: '/bmapi/createstyle/getnodrivesp',   
    method: 'get',
    params: query
  });
}



export function addStyle(obj) {
  return fetch({
    url: '/bmapi/createstyle/addstyle',
    method: 'post',
    data: obj
  })
}


export function deleteDriverVal(obj) {
  return fetch({
    url: '/bmapi/createstyle/delparaval',
    method: 'delete',
    data: obj
  })
}
 
export function addDriveVal(obj) {
  return fetch({
    url: '/bmapi/createstyle/adddriveVal',
    method: 'post',
    data: obj
  })
}


export function editStylePara(obj) {
  return fetch({
    url: '/bmapi/createstyle/getstylepara',
    method: 'post',
    data: obj
  })
}

export function addPartRelation(obj) {
  return fetch({
    url: '/bmapi/createstyle/addpartrelation',
    method: 'post',
    data: obj
  })
}


export function editorStylepara (obj) {
  return fetch({
    url: '/bmapi/createstyle/editorstylepara',
    method: 'put',
    data: obj
  })
}

export function addStylepara (obj) {
  return fetch({
    url: '/bmapi/createstyle/editorstylepara',
    method: 'post',
    data: obj
  })
}

 
 export function delStylepara (obj) {
  return fetch({
    url: '/bmapi/createstyle/delestylepara',
    method: 'delete',
    data: obj
  })
}


export function addStylepart (obj) {
  return fetch({
    url: '/bmapi/createstyle/addpart',
    method: 'post',
    data: obj
  })
}

export function updateStylePart (obj) {
  return fetch({
    url: '/bmapi/createstyle/updatepart',
    method: 'put',
    data: obj
  })
}
   
export function getStyle(query) {
  return fetch({
    url: '/bmapi/createstyle/getstyle',   
    method: 'get',
    params: query
  });
}


export function delPart (obj) {
  return fetch({
    url: '/bmapi/createstyle/delstylepart',
    method: 'post',
    data: obj
  })
}

 export function getPossible (obj) {
  return fetch({
    url: '/bmapi/createstyle/getallposible',
    method: 'post',
    data: obj
  })
}

  

export function getStyleJson(query) {
  return fetch({
    url: '/bmapi/createstyle/createstylejson',   
    method: 'get',
    params: query
  });
}


export function addStyleModel(obj) {
  return fetch({
    url: '/bmapi/modeldefine/addmodelpara',
    method: 'post',
    data: obj
  })
}


export function getStyleParalist(query) {
  return fetch({
    url: '/bmapi/modeldefine/getmodelparalist',   
    method: 'get',
    params: query
  });
}

// 获取数值跟文字类型的的所有参数  搜索时可用

export function getStyleParaName(query) {
  return fetch({
    url: '/bmapi/modeldefine/getstyleparavaNmae',   
    method: 'get',
    params: query
  });
}
  
// 说明：获取某一不可驱动的 所有选项值  使用情况  在编辑时可用
export function getStyleDivevals(query) {
  return fetch({
    url: '/bmapi/modeldefine/getnodivevals',   
    method: 'get',
    params: query
  });
}


//编辑更新样式可选择参数值

export function updateStylemodel (obj) {
  return fetch({
    url: '/bmapi/modeldefine/updatemodel',
    method: 'put',
    data: obj
  })
}


//获取样式可选择参数
export function getParavals(query) {
  return fetch({
    url: '/bmapi/modeldefine/getparavals',   
    method: 'get',
    params: query
  });
}


//检查prj文件命名是否存在

export function getCheckModel(query) {
  return fetch({
    url: '/bmapi/styleimport/checkmodel',   
    method: 'get',
    params: query
  });
}

export function Stylepage(query) {
  return fetch({
    url: '/bmapi/style',   
    method: 'get',
    params: query
  });
}



export function copynewModel(obj) {
  return fetch({
    url: '/bmapi/styleimport/copyModel',
    method: 'post',
    data: obj
  })
}

/**下载部件 */
export function downloadPart(params){
  return fetch({
    url: '/bmapi/styleimport/downloadPart',
    method: 'get',
    params,
    responseType:"blob"
  })
}


/**上传部件 */
export function uploadPart(data){
  return fetch({
    url: '/bmapi/styleimport/uploadPart',
    method: 'post',
    data
  })
}

export function isexsistFile(params){
  return fetch({
    url: '/bmapi/styleimport/isexsistFile',
    method: 'get',
    params
  })
}

