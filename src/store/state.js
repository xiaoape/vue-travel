let defaultCity = '上海'
// 防止有些浏览器或者用户设置了不支持或者不适用localStorage的情况，防止报错
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default {
  city: defaultCity
}
