/**
 * 组织架构APi
 * */
import request from '@/utils/request'
/**
 * 获取企业的部门列表
 */
export function getDepartmentList() {
  return request({
    url: '/company/department',
    methods: 'GET'
  })
}
/**
 * 根据ID删除部门
 */
export function delDepartmentById(id) {
  return request({
    url: `/company/department/${id}`,
    methods: 'delete'
  })
}
