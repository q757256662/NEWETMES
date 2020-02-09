//初始化tabs
var requestUrl ="http://"+window.location.host;//测试地址
// ['Authorization'] = "Bearer " + getToken();
//登录进来获取token(登录令牌)并存起来方法。此处demo展示不作处理自定义了一个,并且用md5 hex_md5（）加密
var token =hex_md5("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9hdGUiun38tslPKwuqygqWUJafrGsMw");
var bowserExplorer = '';//浏览器版本
//目前只处理ie 谷歌浏览器， ie版本使用11;
// console.log(token);
//浏览器版本
function bowser(){
    var explorer = navigator.userAgent; 
    var explorer2 = navigator.userAgent.toLowerCase();
    var  rMsie = /msie\s|trident/g; //ie所有版本验证
     //ie 
     if (rMsie.test(explorer2) == true) {
        bowserExplorer ='ie'
        //  console.log('ie');
    }
    //Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
        bowserExplorer ='Chrome';
        // console.log('Chrome');
        // alert("Chrome");
    }
}

function login(user,pass){
        //请求。。。。再成功之后获取token 并存储再cookie
        setCookie('token',token)
}


function setCookie(name,value) 
{ 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 

//读取cookies 
function getCookie(name) 
{ 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
    if(arr=document.cookie.match(reg))
 
        return unescape(arr[2]); 
    else 
        return null; 
} 

//删除cookies 
function delCookie(name) 
{ 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval=getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
}

function init(){
  var tabs = document.getElementsByClassName('tab-head')[0].getElementsByTagName('h2'),
      contents = document.getElementsByClassName('tab-content')[0].getElementsByTagName('div');

            (function changeTab(tab) {
                for(var i = 0, len = tabs.length; i < len; i++) {
                    tabs[i].onclick = showTab;
                }
            })();

            function showTab() {
                for(var i = 0, len = tabs.length; i < len; i++) {
                    if(tabs[i] === this) {
                        tabs[i].className = 'selected';
                        contents[i].className = 'show';
                    } else {
                        tabs[i].className = '';
                        contents[i].className = '';
                    }
                }
            }
}
  
bowser();