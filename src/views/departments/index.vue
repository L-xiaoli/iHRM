<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容--头部 -->
      <el-card class="tree-card">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <!-- 左侧内容 -->
          <el-col><span>江苏传智播客教育科技股份有限公司</span></el-col>
          <!-- / 左侧内容 -->
          <!-- 右侧内容 -->
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 -->
                <el-dropdown>
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <!-- / 下拉菜单 -->
              </el-col>
            </el-row>
          </el-col>
          <!-- / 右侧内容 -->
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>