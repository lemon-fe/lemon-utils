/**
 * Created by aweakcoder on 17/3/20.
 * 数值操作函数
 * 金额格式化
 * 浮点计算
 */
export default {
  /**
   * 金额格式化（千分位，保留两位小数）
   * @param  {[type]} moneyByFen  [金额（单位分）]
   * @param  {[type]} needDecimal [是否需要小数部分]
   * @param  {[type]} noZero [小数部分为零的情况下是否去掉显示]
   * @return {[type]}             [description]
   */
  formate_money: function (moneyByFen, needDecimal, noZero) {
    //- 分——>元
    var moneyByYuan = moneyByFen / 100;
    var array = ('' + moneyByYuan).split('.');
    //- 整数
    var intString = array[0] + '';
    intString = intString.replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");

    var decimalsString = "";

    if (array[1]) {
      if (array[1].length >= 2) {
        decimalsString = array[1].slice(0, 2);
      } else {
        decimalsString = array[1] + "0";
      }
    } else {
      if (noZero) {
        decimalsString = '';
      } else {
        decimalsString = "00";
      }
    }

    //- ——>千分位
    if (needDecimal) {
      return decimalsString != '' ? (intString + "." + decimalsString) : intString;
    } else {
      return intString;
    }
  },
  /**
   * 金额格式化（无千分位，保留两位小数）
   * @param  {[type]} moneyByFen  [金额（单位分）]
   * @param  {[type]} needDecimal [是否需要小数部分]
   * @return {[type]}             [description]
   */
  formate_money_dec: function (moneyByFen, needDecimal) {
    //- 分——>元
    var moneyByYuan = moneyByFen / 100;
    var array = ('' + moneyByYuan).split('.');
    //- 整数
    var intString = array[0] + '';

    var decimalsString = "";

    if (array[1]) {
      if (array[1].length >= 2) {
        decimalsString = array[1].slice(0, 2);
      } else {
        decimalsString = array[1] + "0";
      }
    } else {
      decimalsString = "00";
    }

    //- ——>千分位
    if (needDecimal) {
      return Number(intString + "." + decimalsString);
    } else {
      return Number(intString);
    }
  },
  /**
   * 浮点数计算，修正精度问题
   * 原理，将两位数都乘以小数位数最大的，相加后再除
   * @type {Object}
   */
  FloatCalculate: {
    accAdd: function (arg1, arg2) {
      var r1, r2, t1, t2, m;

      try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }

      t1 = Number(arg1.toString().replace(".", ""))
      t2 = Number(arg2.toString().replace(".", ""))

      if (r1 > r2) {
        t2 = t2 * Math.pow(10, r1 - r2)
      } else if (r1 < r2) {
        t1 = t1 * Math.pow(10, r2 - r1)
      }
      m = Math.pow(10, Math.max(r1, r2))

      return (t1 + t2) / m
    },
    accSub: function (arg1, arg2) {
      var r1, r2, t1, t2, m, n;
      try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
      try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
      t1 = Number(arg1.toString().replace(".", ""))
      t2 = Number(arg2.toString().replace(".", ""))
      if (r1 > r2) {
        t2 = t2 * Math.pow(10, r1 - r2)
      } else if (r1 < r2) {
        t1 = t1 * Math.pow(10, r2 - r1)
      }
      m = Math.pow(10, Math.max(r1, r2));
      //last modify by deeka
      //动态控制精度长度
      n = (r1 >= r2) ? r1 : r2;
      return ((t1 - t2) / m).toFixed(n);
    },
    accMul: function (arg1, arg2) {
      var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
      try { m += s1.split(".")[1].length } catch (e) { }
      try { m += s2.split(".")[1].length } catch (e) { }
      return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    accDiv: function (arg1, arg2) {
      var t1 = 0, t2 = 0, r1, r2;
      try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
      try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
      r1 = Number(arg1.toString().replace(".", ""))
      r2 = Number(arg2.toString().replace(".", ""))
      return (r1 / r2) * Math.pow(10, t2 - t1);
    }
  },
  /**
   * 获取小数位数
   */
  getDecimalCount: function (decimal) {
    if (isNaN(decimal)) return 0;
    var _decimal_arr = (decimal + "").split(".");
    var _decimal_count = _decimal_arr.length == 2 ? _decimal_arr[1].length : 0;
    return _decimal_count;
  }
}
