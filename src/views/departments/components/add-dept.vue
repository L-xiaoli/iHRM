<template>
  <el-dialog title="新增部门" :visible.sync="showDialog">
    <el-form :model="deptForm" label-width="120px">
      <el-form-item label="部门名称">
        <el-input
          v-model="deptForm.name"
          style="width:80%"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input
          v-model="deptForm.name"
          style="width:80%"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          v-model="deptForm.manager"
          style="width:80%"
          placeholder="请选择"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input
          v-model="deptForm.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer" type="flex" justify="center">
      <el-button type="primary" @click="addDepts()" size="small"
        >确 定</el-button
      >
      <el-button @click="$emit('close')" size="small">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      required: true
    }
  },
  created() {
    this.getAllManager()
  },
  data() {
    return {
      dialogTableVisible: false,
      // dialogFormVisible: showDialog,
      deptForm: {
        name: null, // 部门名称
        code: null, // 部门编码
        manager: null, // 	负责人名称
        introduce: null, // 介绍
        pid: null // 父级部门ID
      },
      formLabelWidth: '120px'
    }
  },

  methods: {
    getAllManager() {},
    addDepts() {
      console.log('确定！')
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped></style>
