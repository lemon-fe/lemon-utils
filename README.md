# Lemon utils
[![npm](https://img.shields.io/npm/v/lemon-utils.svg?maxAge=3600)](https://www.npmjs.com/package/lemon-utils)
![JS gzip size](http://img.badgesize.io/lemon-fe/lemon-utils/master/lib/index.js.svg?compression=gzip&label=gzip%20size:%20JS)
> utils for projects

## Installation
```shell
npm i lemon-utils -s
```

## Usage

```javascript
import LemonUtils from 'lemon-utils';
...
LemonUtils.UA // {ios: 1, android: 0, weixin: 0, }
LemonUtils.getLocalStorage("key")
LemonUtils.setLocalStorage("key", "value")
LemonUtils.getSessionStorage("key")
LemonUtils.setSessionStorage("key", "value")
LemonUtils.getCookie("key")
LemonUtils.setCookie("key", "value")
LemonUtils.removeCookie("key")
LemonUtils.getUrlParam("key") // get url parameter
LemonUtils.formatDate(new Date(), "yyyy-MM-dd") // format Date
LemonUtils.FloatCalculate.accAdd(0.2, 0.1) // 浮点数计算 加法
LemonUtils.FloatCalculate.accSub(0.2, 0.1) // 浮点数计算 减法
LemonUtils.FloatCalculate.accMul(0.2, 0.1) // 浮点数计算 城法
LemonUtils.FloatCalculate.accDiv(0.2, 0.1) // 浮点数计算 除法
```
