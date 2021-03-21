/**
 * 组织架构APi
 * */
import request from '@/utils/request'
/**
 * 获取企业的部门列表
 */
export function GetDepartmentList() {
  return request({
    url: '/company/department',
    methods: 'GET'
  })
}
