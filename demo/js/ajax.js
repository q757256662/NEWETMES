function ajax(options) {
    var xhr = null;
    var params = options.data;
    //创建对象
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 连接
    if (options.type == "GET") {
        var params = formsParams(options.data);
        xhr.open(options.type, options.url + "?" + params, options.async);
        xhr.send(null);
        result = JSON.parse(xhr.responseText);
        // console.log(result)
        return result;
    } else if (options.type == "POST") {
        // var params = formsParams(options.data);
        // console.log(params);

          xhr.open(options.type,options.url,options.async);
          xhr.setRequestHeader("Content-Type","application/json");
          xhr.send(JSON.stringify(params));
          result =JSON.parse(xhr.responseText) ;

        // console.log(result);
        return result;
    }
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            options.success(xhr.responseText);
        }
    }
    function formsParams(data) {
        var arr = [];
        for (var prop in data) {
            arr.push(prop + "=" + data[prop]);
        }
        return arr.join("&");
    }

}