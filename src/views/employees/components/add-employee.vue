<template>
  <div>
    <el-dialog
      title="收货地址"
      :visible="addDialog"
      width="40%"
      @close="btnCanel"
    >
      <el-form
        :model="employeeForm"
        :rules="rules"
        ref="employeeForm"
        :label-width="formLabelWidth"
      >
        <el-form-item label="姓名" prop="username">
          <el-input
            v-model="employeeForm.username"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input
            v-model="employeeForm.mobile"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="timeOfEntry">
          <el-date-picker
            type="date"
            placeholder="请选择日期"
            v-model="employeeForm.timeOfEntry"
            prop="mobile"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="聘用形式" prop="formOfEmployment">
          <el-select
            v-model="employeeForm.formOfEmployment"
            placeholder="请选择"
          >
            <el-option
              v-for="item in formOfEmployment"
              :label="item.value"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="workNumber">
          <el-input
            v-model="employeeForm.workNumber"
            placeholder="请输入工号"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="departmentName">
          <el-input
            v-model="employeeForm.departmentName"
            placeholder="请输入部门"
            @focus="getDeptList()"
          ></el-input>
          <el-tree
            v-if="showTree"
            :data="treeData"
            :props="defaultProps"
            @node-click="selectNode"
            default-expand-all
          ></el-tree>
        </el-form-item>
        <el-form-item label="转正时间" prop="correctionTime">
          <el-date-picker
            type="date"
            placeholder="请选择日期"
            v-model="employeeForm.correctionTime"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" type="flex" justify="end">
        <el-button type="primary" @click="addForm">确 定</el-button>
        <el-button @click="btnCanel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import { getDepartmentList } from '@/api/departments'
import { treeData } from '@/utils/index'
export default {
  name: 'AddEmployee',
  props: {
    addDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      employeeForm: {
        username: null, // 姓名
        mobile: null, // 手机号
        formOfEmployment: null, // 聘用形式
        workNumber: null, //  工号
        departmentName: null, // 组织名称
        timeOfEntry: null, // 入职时间
        correctionTime: null // 转正时间
      },
      formLabelWidth: '120px',
      formOfEmployment: EmployeeEnum.hireType,
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },

  methods: {
    // 关闭弹层
    btnCanel() {
      // 重置表单
      this.employeeForm = {
        username: null, // 姓名
        mobile: null, // 手机号
        formOfEmployment: null, // 聘用形式
        workNumber: null, //  工号
        departmentName: null, // 组织名称
        timeOfEntry: null, // 入职时间
        correctionTime: null // 转正时间
      }
      this.$refs.employeeForm.resetFields() // 重置校验结果
      this.$parent.addDialog = false
    },
    // 提交表单
    async addForm() {
      await this.$refs.employeeForm.validate()
      try {
        await addEmployee(this.employeeForm)
        // this.$emit('success')
        // await addEmployee(this.employeeForm)
        this.$parent.getEmployeeList()
        this.$message.success('新增成功！')
        this.$parent.addDialog = false
      } catch (error) {
        this.$message.error('新增失败！')
      }
    },
    // 获取部门信息（转为树型结构）
    async getDeptList() {
      this.showTree = true
      this.loading = true
      const res = await getDepartmentList()
      this.treeData = treeData(res.depts, '')
      console.log(this.treeData)
      this.loading = false
    },
    selectNode(node) {
      console.log(node)
      this.employeeForm.departmentName = node.name
      this.showTree = false
    }
  }
}
</script>

<style scoped>
.el-input,
.el-select {
  width: 80%;
}
</style>
