/**
 * Created by aweakcoder on 17/3/20.
 */

export default {
  /**
   * 格式化日期
   * @method format
   * @static
   * @param {Date} d 日期对象
   * @param {string} pattern 日期格式(y年M月d天h时m分s秒)，默认为"yyyy-MM-dd"
   * @return {string}  返回format后的字符串
   * @example
   var d=new Date();
    alert(format(d," yyyy年M月d日\n yyyy-MM-dd\n MM-dd-yy\n yyyy-MM-dd hh:mm:ss"));
    */
  formatDate: function (d, pattern) {
    pattern = pattern || 'yyyy-MM-dd';
    var y = d.getFullYear().toString(),
      o = {
        M: d.getMonth() + 1, //month
        d: d.getDate(), //day
        h: d.getHours(), //hour
        m: d.getMinutes(), //minute
        s: d.getSeconds() //second
      };
    pattern = pattern.replace(/(y+)/ig, function (a, b) {
      return y.substr(4 - Math.min(4, b.length));
    });
    for (var i in o) {
      pattern = pattern.replace(new RegExp('(' + i + '+)', 'g'), function (a, b) {
        return (o[i] < 10 && b.length > 1) ? '0' + o[i] : o[i];
      });
    }
    return pattern;
  },
  /**
   * 获取两个时间间隔秒数
   * @param  {[type]} timelow  格式yyyy-mm-dd
   * @param  {[type]} timehigh [description]
   * @return {[type]}          [description]
   */
  getDisSec: function (timelow, timehigh) {
    return ((new Date(timehigh.replace(/-/mg, "/"))) - (new Date(timelow.replace(/-/mg, "/")))) / 1000;
  },
  /**
   * @param {Date} date
   *获取当月天数
    * @returns {number}
    */
  getMaxDays: function (date) {
    var tmpDate = new Date(date),
      d = 28,
      m = tmpDate.getMonth();
    while (tmpDate.getMonth() == m) {
      ++d;
      tmpDate.setDate(d);
    }
    return d - 1;
  },
  /**
   * @param {Date}   date
   * 日期增加天数
   * @param {number} number_of_days
   */
  addDays: function (date, number_of_days) {
    date.setDate(date.getDate() + number_of_days);
  },

  /**
   * @param {Date}   date
   * 日期增加月份
   * @param {number} number_of_months
   */
  addMonths: function (date, number_of_months) {
    var day = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + number_of_months);
    date.setDate(Math.min(day, this.getMaxDays(date)));
  },

  /**
   * @param {Date}   date
   * 日期增加年份
   * @param {number} number_of_years
   */
  addYears: function (date, number_of_years) {
    var day = date.getDate();
    date.setDate(1);
    date.setFullYear(date.getFullYear() + number_of_years);
    date.setDate(Math.min(day, this.getMaxDays(date)));
  }
}
