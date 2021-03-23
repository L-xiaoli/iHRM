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
    methods: 'get'
  })
}
/**
 * 根据ID删除部门
 */
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
/**
 *  获取员工的简单列表
 *
 **/
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
/**
 * 新增部门
 */
export function addDepartment(data) {
  return request({
    url: '/company/department',
    methods: 'POST',
    data
  })
}
