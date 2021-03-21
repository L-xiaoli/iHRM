<template>
  <!-- <div> -->
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="Department">
            <span> 操作<i class="el-icon-arrow-down"></i> </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <span v-if="isRoot">
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="delete">删除部门</el-dropdown-item>
              </span>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <!-- </div> -->
</template>

<script>
import {
  addDepartmentById,
  editDepartmentById,
  delDepartmentById
} from '@/api/departments'

export default {
  props: {
    treeNode: {
      type: Object, // 对象类型
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  methods: {
    // 对部门进行操作
    async Department(command) {
      if (command === 'add') {
        // 新增
        // 告诉父组件 显示弹层
        this.$emit('addDepts', this.treeNode) // 为何传出treeNode 因为是添加子部门 需要当前部门的数据
      } else if (command === 'edit') {
        // 编辑
        editDepartmentById(this.treeNode.id)
        console.log(res)
      } else if (command === 'delete') {
        //  删除操作
        this.$confirm('确定要删除该部门吗')
          .then(() => {
            // 如果点击了确定就会进入then
            return delDepartmentById(this.treeNode.id) // 返回promise对象
          })
          .then(() => {
            //  如果删除成功了  就会进入这里
            this.$emit('success') // 触发自定义事件
            this.$message.success('删除部门成功')
          })
      }
    }
  }
}
</script>
