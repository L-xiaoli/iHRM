<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <el-table-column
                label="序号"
                width="120"
                type="index"
                align="center"
              />
              <el-table-column
                label="角色名称"
                width="240"
                align="center"
                prop="name"
              />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row
              type="flex"
              justify="end"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <!-- <el-pagination layout="total,prev,pager,next" :total="total" /> -->
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="queryInfo.page"
                :page-size="queryInfo.pagesize"
                layout="total, prev, pager, next"
                :total="queryInfo.total"
              >
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="企业名称">
                <el-input
                  disabled
                  style="width:400px"
                  v-model="companyInfo.companyAddress"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width:400px"
                  v-model="companyInfo.name"
                />
              </el-form-item>
              <el-form-item label="电话">
                <el-input
                  disabled
                  style="width:400px"
                  v-model="companyInfo.companyPhone"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width:400px"
                  v-model="companyInfo.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width:400px"
                  v-model="companyInfo.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  computed: {
    ...mapGetters(['companyId'])
  },
  data() {
    return {
      queryInfo: {
        page: 1,
        pagesize: 5,
        total: 0 // 总数
      },
      roleList: [], //角色列表
      companyInfo: {} // 公司信息
    }
  },
  created() {
    this.getAllRole()
    this.getCompanyInfo()
  },
  methods: {
    // 获取角色列表
    async getAllRole() {
      const res = await getRoleList(this.queryInfo)
      this.queryInfo.total = res.total
      this.roleList = res.rows
    },
    handleCurrentChange(val) {
      this.queryInfo.page = val
      this.getAllRole()
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(this.companyId)
      console.log(res)
      this.companyInfo = res
    }
  }
}
</script>

<style lang="less" scoped></style>
