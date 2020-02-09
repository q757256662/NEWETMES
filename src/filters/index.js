function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time == 'object') {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export function formatTime(time, option) {
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
    }
  }
  return num.toString();
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}
//数字格式化
export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}


// 时间格式化
export function ChangeDateFormat(row, column) {
  var jsondate = row[column.property];
  jsondate = jsondate.replace("/Date(", "").replace(")/", "");
  if (jsondate.indexOf("+") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("+"));
  } else if (jsondate.indexOf("-") > 0) {
    jsondate = jsondate.substring(0, jsondate.indexOf("-"));
  }
  var date = new Date(parseInt(jsondate, 10));
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minutes + ":" + second;
}

//  Code过滤器
export function changeProcessName(row) {
  // console.log(row)
  var total = "";
  switch (row.Step || row.step || row.code || row.Code) {
    case 1:
      total = "导入样式";
      break;
      case 2:
      total = "修改样式";
      break;
      case 12:
      total = "修改样式";
      break;
    case 14:
      total = "放码";
      break;
    case 16:
      total = "检查纸样";
      break;
    case 18:
      total = "估算用量";
      break;
    case 22:
      total = "修改样式";
      break;
    case 24:
      total = "放码";
      break;
    case 26:
      total = "改驱动规则";
      break;
      case 28:
      total = "检查纸样";
      break;
    case 33:
      total = "尺码压缩";
      break;
    case 34:
      total = "尺寸驱动";
      break;
    case 35:
      total = "特体检查";
      break;
    case 37:
      total = "裁剪规划";
      break;
    case 42:
      total = "生产单导入";
      break;
    case 43:
      total = "修改纸样";
      break;
    case 45:
      total = "放码";
      break;
    case 46:
      total = "检查";
      break;
    case 48:
      total = "排料";
      break;
    case 53:
      total = "尺寸驱动";
      break;
    case 54:
      total = "特体检查";
      break;
    case 57:
      total = "裁剪规划";
      break;
    default:
      total = "其他";
      break;
  }
  return total;
}

export function TimeChange1(row) {
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