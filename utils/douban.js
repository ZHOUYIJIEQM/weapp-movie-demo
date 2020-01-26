const URI = 'https://douban-api.uieee.com/v2/movie';
const fetch = require('./fetch');

/**
 * 根据类型(coming_soon top250 new_movies)请求接口
 * @param  {String} type   类型
 * @param  {Object} params 参数
 * @return {Promise}        fetch返回的Promise
 */
function fetchApi (type, params) {
  return fetch(URI, type, params);
}

/**
 * 请求对应类型，页码，条数，搜索关键词 的数据
 * @param  {String} type   类型(coming_soon top250 new_movies等)
 * @param  {Number} page   页码 
 * @param  {Number} count  一个页面的条数 
 * @param  {String} search 搜索关键词
 * @return {Promise}       包含获取数据的Promise        
 */
function find (type, page=1, count=20, search="") {
  let params = {
    start: (page-1) * count,
    count: count,
    city: getApp().data.currentCity
  };
  return fetchApi(type, search ? Object.assign(params, {q: search}) : params)
    .then(res => res.data);
} 

/**
 * 获取对应id的数据
 * @param  {Number} id 对应的电影id
 * @return {Promise}    
 */
function findById (id) {
  return fetchApi('subject/' + id)
    .then(res => res.data);
}

module.exports = {
  find,
  findById
}