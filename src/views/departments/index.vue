<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="isRoot" />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>
<script>
import TreeTools from './components/tree-tools'
import { GetDepartmentList } from '@/api/departments'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { id: '', name: '1', manager: '负责人' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      isRoot: false // 控制编辑和删除部门下拉菜单是否显示
    }
  },
  created() {
    this.getDeparList()
  },
  methods: {
    // 获取
    async getDeparList() {
      const res = await GetDepartmentList()
      console.log(res)
      this.departs = res.depts
      this.company = {
        id: res.companyId,
        name: res.companyName,
        manager: res.companyManage
      }
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
