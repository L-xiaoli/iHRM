<template>
  <div class="setting-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showRoleDialog = true"
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
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="success"
                    @click="assignPerm(scope.row.id)"
                    >分配权限</el-button
                  >
                  <el-button
                    size="small"
                    type="primary"
                    @click="editRole(scope.row.id)"
                    >编辑</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="deleteRole(scope.row.id)"
                    >删除</el-button
                  >
                </template>
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
            <el-form ref="roleForm" label-width="120px" style="margin-top:50px">
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
    <!-- 新增与编辑 -->
    <el-dialog
      :title="roleForm.id ? '编辑角色' : '新增角色'"
      :visible="showRoleDialog"
      @close="btnCancel"
    >
      <el-form
        ref="roleForm"
        :model="roleForm"
        :rules="rules"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="submitOK"
            >确定</el-button
          >
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible="showPermDialog"
      @close="btnPermCancel"
    >
      <!-- 权限是一颗树 -->
      <!-- 将数据绑定到组件上 -->
      <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
      <!-- id作为唯一标识 -->
      <el-tree
        ref="permTree"
        :data="permData"
        :props="defaultProps"
        :show-checkbox="true"
        :check-strictly="true"
        :default-expand-all="true"
        :default-checked-keys="selectCheck"
        node-key="id"
      />
      <!-- 确定 取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOK"
            >确定</el-button
          >
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  delRoleById,
  editRole,
  getRoleDetail,
  addRole
} from '@/api/setting'
import { treeData } from '@/utils'
import { getPermissionList } from '@/api/permission'
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
      roleList: [], // 角色列表
      companyInfo: {}, // 公司信息
      showRoleDialog: false, // 控制角色弹出层
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
      },
      roleForm: {
        name: null, // 角色名称
        description: null // 角色描述
      },
      showPermDialog: false, // 控制分配权限弹层的显示后者隐藏
      defaultProps: {
        label: 'name'
      },
      permData: [], // 专门用来接收权限数据 树形数据
      selectCheck: [], // 定义一个数组来接收 已经选中的节点
      roleId: null // 用来记录分配角色的id
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
    // 分页
    handleCurrentChange(val) {
      this.queryInfo.page = val
      this.getAllRole()
    },
    // 获取公司信息
    async getCompanyInfo() {
      const res = await getCompanyInfo(this.companyId)
      console.log(res)
      this.companyInfo = res
    },
    // 删除角色
    async deleteRole(id) {
      await this.$confirm('确认删除该角色吗')
      await delRoleById(id)
      //TODO:  解决BUG:最后页码的最后一页，只剩一条数据时，点击删除后：页码会-1，但是对应的用户信息 还是停留在上一页为空的状态，并且删除后页码-1，也必须在页码总数大于1的情况，不然就为0页了，最少也是一页
      if (document.querySelectorAll('.el-card tbody tr').length === 1) {
        this.queryInfo.page =
          this.queryInfo.page > 1 ? this.queryInfo.page - 1 : 1
      }
      //重新请求最新的数据
      this.getAllRole()
      this.$message.success('删除成功!')
    },
    // 编辑角色
    async editRole(id) {
      this.roleForm = await getRoleDetail(id)
      this.showRoleDialog = true
    },
    // 确认提交
    async submitOK() {
      try {
        await this.$refs.roleForm.validate()
        if (this.roleForm.id) {
          // 编辑操作
          await editRole(this.roleForm)
          this.$message.success('修改成功!')
        } else {
          // 添加操作
          await addRole(this.roleForm)
          this.$message.success('新增成功!')
        }
        // 重新拉取数据
        this.getAllRole()
        this.showRoleDialog = false
      } catch (error) {
        this.$message.error('操作失败!')
      }
    },
    // 关闭新增与删除弹出层
    btnCancel() {
      this.roleForm = {
        name: '',
        description: ''
      }
      // ? 表单清空：回到表单第一次渲染完毕的结果
      this.$refs.roleForm.resetFields()
      this.showRoleDialog = false
    },
    // 分配权限
    async assignPerm(id) {
      // 转化list到树形数据
      this.permData = treeData(await getPermissionList(), '0')
      this.roleId = id // 记录id
      this.showPermDialog = true
    },
    btnPermOK() {
      console.log(1)
      this.showPermDialog = false
    },

    // 关闭新分配角色弹出层
    btnPermCancel() {
      console.log()
      this.showPermDialog = false
    }
  }
}
</script>

<style lang="less" scoped></style>
