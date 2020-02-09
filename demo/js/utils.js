//获取指定参数
function GetUrlParam(paraName) {
  　　　　var url = document.location.toString();
  　　　　var arrObj = url.split("?");
  
  　　　　if (arrObj.length > 1) {
  　　　　　　var arrPara = arrObj[1].split("&");
  　　　　　　var arr;
  
  　　　　　　for (var i = 0; i < arrPara.length; i++) {
  　　　　　　　　arr = arrPara[i].split("=");
  
  　　　　　　　　if (arr != null && arr[0] == paraName) {
  　　　　　　　　　　return arr[1];
  　　　　　　　　}
  　　　　　　}
  　　　　　　return "";
  　　　　}
  　　　　else {
  　　　　　　return "";
  　　　　}
  　　}

  function  TimeChange(row) { 
    var d = new Date(row);
    var year = d.getFullYear();
    var month = change(d.getMonth() + 1);
    var day = change(d.getDate());
    var hour = change(d.getHours());
    var minute = change(d.getMinutes());
    var second = change(d.getSeconds());
    function change(t) {
        if (t < 10) {
            return "0" + t;
        } else {
            return t;
        }
    }
    var time = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    return time
  }