import request from '@/utils/request'

export function login(data) {
  return request({
    url: ' /sys/login',
    method: 'post',
    data
  })
}
/**
 * 获取用户资料
 * @param {Strig} token

 */
export function getInfo(token) {
  return request({
    url: ' /sys/profile',
    method: 'GET'
  })
}

export function logout() {}
