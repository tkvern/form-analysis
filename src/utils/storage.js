const localStorage = window.localStorage
/**
 * 保存数据
 * @export
 * @param {*} name
 * @param {*} val
 * @returns
 */
export function setStorage(name, val = '') {
  return localStorage.setItem(name, val)
}
/**
 * 获取缓存数据
 * @export
 * @param {*} name
 * @returns
 */
export function getStorage(name) {
  return name ? localStorage.getItem(name) : ''
}

/**
 * 删除缓存数据
 * @export
 * @param {*} name
 */
export function removeStorage(name) {
  return localStorage.removeItem(name)
}

/**
 * 清空全部缓存数据
 * @export
 */
export function clearStorage() {
  return localStorage.clear()
}
/**
 * 设置多个缓存数据
 * @export
 * @param {*} obj
 */
export function setMoreStorage(obj) {
  for (const key in obj) {
    localStorage.setItem(key, obj[key])
  }
}
/**
 * 获取多个缓存数据
 * @export
 * @param {*} arr
 * @returns
 */
export function getMoreStorage(arr) {
  let obj = {}
  arr.forEach(key => {
    obj[key] = localStorage.getItem(key)
  })
  return obj
}
/**
 * 删除多个缓存数据
 * @export
 * @param {*} arr
 */
export function removeMoreStorage(arr) {
  arr.forEach(key => {
    localStorage.removeItem(key)
  })
}
