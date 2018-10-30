/**
 * Created by aweakcoder on 17/3/20.
 */
var _ua = navigator.userAgent.toLowerCase();
var isPC = function () {
  var agents = ["android", "iphone", "symbianos", "windows phone", "ipad", "ipod"];
  var flag = true;
  for (var v = 0; v < agents.length; v++) {
    if (_ua.indexOf(agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
var handleUA = function () {
  var result = {};
  result.weixin = /micromessenger/.test(_ua); // 微信内置浏览器
  result.android = _ua.indexOf('android') > -1 || _ua.indexOf('adr') > -1; // android终端
  result.ios = _ua.indexOf("iphone") > -1 || _ua.indexOf('ipad') > -1; // ios终端
  result.pc = isPC(); // pc终端
  result.weibo = _ua.indexOf('weibo') > -1; // eui的app终端
  return result;
}

export default {
  UA: handleUA(),
  // 获取url参数
  getUrlParam: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  // 匹配目标参数
    if (r != null) return r[2];
    return null; // 返回参数值
  },
  // 获取js文件
  loadScript: function (src) {
    var fm = document.createElement('script');
    fm.type = 'text/javascript';
    fm.async = true;
    fm.src = src;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fm, s);
  },
  /**
   * 判断对象或者数组是否为空
   */
  isEmpty: function (obj) {
    if (obj == null) return true;
    for (var name in obj) {
      return false;
    }
    return true;
  },
  /**
   * 判断元素是否在数组中
   * @param  {[type]} item      [description]
   * @param  {[type]} array     [description]
   * @param  {[type]} needIndex [是否需要返回索引]
   * @return {[type]}           [description]
   */
  inArray: function (item, array, needIndex) {
    if (array.constructor !== Array) return;
    var _index = -1;
    for (var i = array.length - 1; i >= 0; i--) {
      var _item = array[i];
      if (_item == item) {
        _index = i;
        break;
      }
    }
    if (needIndex) {
      return _index
    } else {
      if (_index > -1) {
        return true
      } else {
        return false;
      }
    }
  }
}