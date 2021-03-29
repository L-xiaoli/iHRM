import request from '@/utils/request'
/**
 * 获取角色列表
 * ***/
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

/**
 * 根据id查询企业
 * ***/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
/**
 * 根据id删除角色
 * ***/
export function delRoleById(roleId) {
  return request({
    url: `/sys/role/${roleId}`,
    method: 'DELETE'
  })
}
/**
 * 新增角色
 * ***/
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
/**
 * 获取角色详情
 * **/
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
/**
 * 根据ID更新角色
 * ***/
export function editRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
