<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 实现页面的基本布局 -->
      <el-card class="tree-card">
        <tree-tools
          :tree-node="company"
          :is-root="isRoot"
          @addDepts="addDepts"
        />
        <el-tree :data="departs" :props="defaultProps" default-expand-all>
          <!-- 说明el-tree里面的这个内容 就是插槽内容 => 填坑内容  => 有多少个节点循环多少次 -->
          <!-- scope-scope 是 tree组件传给每个节点的插槽的内容的数据 -->
          <tree-tools
            slot-scope="obj"
            :tree-node="obj.data"
            @success="getDeparList()"
            @addDepts="addDepts"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
      <add-dept
        ref="addDept"
        :tree-node="node"
        :showDialog.sync="isShowDialog"
        @success="getDeparList()"
      />
    </div>
  </div>
</template>
<script>
import TreeTools from './components/tree-tools'
import { getDepartmentList } from '@/api/departments'
import { treeData } from '@/utils/index'
import AddDept from './components/add-dept'
export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      isRoot: false, // 控制编辑和删除部门下拉菜单是否显示
      isShowDialog: false, // 控制添加部门弹窗框
      node: null, // 当前点击的node
      loading: false // 用来控制进度弹层的显示和隐藏
    }
  },
  created() {
    this.getDeparList()
  },
  methods: {
    // 获取
    async getDeparList() {
      this.loading = true
      const res = await getDepartmentList()
      this.departs = treeData(res.depts, '')
      this.company = {
        id: '',
        name: res.companyName,
        manager: '负责人'
      }
      this.loading = false
    },
    // 添加部门
    addDepts(node) {
      this.isShowDialog = true
      this.node = node
    },
    editDepts(node) {
      this.isShowDialog = true
      this.node = node
      // ! 父组件调用子组件的方法(获取详情)
      this.$refs.addDept.getDeptDetail(node.id) // 直接调用子组件中的方法 传入一个id
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
