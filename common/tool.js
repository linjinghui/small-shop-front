/**
* 判断参数是否为空， []|{}|''|null|undefined 都为空
* @param {Object} obj -  参数
*/
export function isEmpty (obj) {
  var objstr = JSON.stringify(obj);
  
  return typeof obj === 'undefined' || obj === null || obj === '' || objstr === '{}';
}