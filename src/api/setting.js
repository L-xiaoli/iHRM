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
