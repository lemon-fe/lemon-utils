/**
 * Created by aweakcoder on 17/3/20.
 */
import Cookie from 'js-cookie'
var localStorage = window.localStorage;
var sessionStorage = window.sessionStorage;
export default {
  setCookie: function (key, data, type, opt) {
    if (data == "" || data == null) {
      return;
    }
    if (type == "json" && typeof (data) == "object") {
      Cookie.set(key, this.EnChTo(16, encodeURI(JSON.stringify(data))), opt || { path: '/' });
    } else if (type != "json") {
      Cookie.set(key, this.EnChTo(16, encodeURI(data)), opt || { path: '/' });
    }
  },
  getCookie: function (key, type) {
    var data = Cookie.get(key);
    if (data == null || data == 'null') {
      return null;
    }
    data = this.DeChTo(16, data);
    data = decodeURI(data);
    if (type == "json") {
      return JSON.parse(data.substring(0, data.length - 2) + "}");
    } else {
      return data.substring(0, data.length - 1);
    }
  },
  removeCookie: function (key, opt) {
    return Cookie.remove(key);
  },
  setLocalStorage: function (key, data, type) {
    if (data == "" || data == null) {
      return;
    }
    try {
      if (localStorage) {
        if (type == "json" && typeof (data) == "object") {
          localStorage.setItem(key, this.EnChTo(16, encodeURI(JSON.stringify(data))));
        } else if (type != "json") {
          localStorage.setItem(key, this.EnChTo(16, encodeURI(data)));
        }
      } else {
        var date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        this.setCookie(key, data, type, { path: '/', expires: date });
      }
    } catch (e) {

    }
  },
  getLocalStorage: function (key, type) {
    var data = localStorage ? localStorage.getItem(key) : Cookie.get(key);
    if (data == null || data == 'null') {
      return null;
    }
    data = this.DeChTo(16, data);
    data = decodeURI(data);
    if (type == "json") {
      return JSON.parse(data.substring(0, data.length - 2) + "}");
    } else {
      return data.substring(0, data.length - 1);
    }
  },
  removeLocalStorage: function (key) {
    return localStorage ? localStorage.removeItem(key) : Cookie.remove(key);
  },
  setSessionStorage: function (key, data, type) {
    if (data == "" || data == null) {
      return;
    }
    try {
      if (sessionStorage) {
        if (type == "json" && typeof (data) == "object") {
          sessionStorage.setItem(key, this.EnChTo(16, encodeURI(JSON.stringify(data))));
        } else if (type != "json") {
          sessionStorage.setItem(key, this.EnChTo(16, encodeURI(data)));
        }
      } else {
        this.setCookie(key, data, type);
      }
    } catch (e) {

    }
  },
  getSessionStorage: function (key, type) {
    var data = sessionStorage ? sessionStorage.getItem(key) : Cookie.get(key);
    if (data == null || data == 'null') {
      return null;
    }
    data = this.DeChTo(16, data);
    data = decodeURI(data);
    if (type == "json") {
      return JSON.parse(data.substring(0, data.length - 2) + "}");
    } else {
      return data.substring(0, data.length - 1);
    }
  },
  removeSessionStorage: function (key) {
    return sessionStorage ? sessionStorage.removeItem(key) : Cookie.remove(key);
  },
  /*任意进制加密*/
  EnChTo: function (h, data) {
    var monyer = [];
    var i, s;
    for (i = 0; i < data.length; i++) {
      monyer += data.charCodeAt(i).toString(h) + " ";
    }
    return monyer.toString();
  },
  /*任意进制解密*/
  DeChTo: function (h, data) {
    var monyer = [];
    var i;
    var s = data.split(" ");
    for (i = 0; i < s.length; i++) {
      monyer += String.fromCharCode(parseInt(s[i], h));
    }
    return monyer.toString();
  }
}