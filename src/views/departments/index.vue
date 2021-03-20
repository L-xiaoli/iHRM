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
        <!-- 树形组件 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          @node-click="handleNodeClick"
          :default-expand-all="true"
        >
          <!-- 自定义插槽 -->
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
          <el-row
            type="flex"
            justify="space-between"
            align="middle"
            style="width: 100%"
            slot-scope="{ data }"
          >
            <!-- 左侧内容 -->
            <el-col
              ><span>{{ data.name }}</span></el-col
            >
            <!-- / 左侧内容 -->
            <!-- 右侧内容 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 -->
                  <el-dropdown>
                    <span> 操作<i class="el-icon-arrow-down" /> </span>
                    <!-- 具名插槽 -->
                    <el-dropdown-menu slot="dropdown">
                      <!-- 下拉选项 -->
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑部门</el-dropdown-item>
                      <el-dropdown-item>删除部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <!-- / 下拉菜单 -->
                </el-col>
              </el-row>
            </el-col>
            <!-- /右侧内容 -->
          </el-row>

          <!-- / 自定义插槽 -->
        </el-tree>
        <!-- / 树形组件 -->
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
      { name: '行政部', manager: '刘备' },
      { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }

}
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>