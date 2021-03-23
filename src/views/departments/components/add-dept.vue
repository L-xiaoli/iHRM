<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <el-form
      ref="deptRuleForm"
      :model="deptForm"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="deptForm.name"
          style="width:80%"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="deptForm.code"
          style="width:80%"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="deptForm.manager"
          style="width:80%"
          placeholder="请选择"
        >
          <el-option
            v-for="manager in managers"
            :key="manager.id"
            :label="manager.username"
            :value="manager.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
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
      <el-button type="primary" @click="addDepts" size="small">确 定</el-button>
      <el-button size="small" @click="btnCancel">取 消 </el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  getDepartmentList,
  getEmployeeSimple,
  addDepartment,
  getDeptDetail,
  updateDepartments
} from '@/api/departments'
export default {
  name: 'AddDept',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },

  data() {
    // 现在定义一个函数 这个函数的目的是 去找 同级部门下 是否有重复的部门名称
    // const checkNameRepeat = async (rule, value, callback) => {
    //   // 先要获取最新的组织架构数据
    //   const { depts } = await getDepartmentList()
    //   // depts是所有的部门数据
    //   // 如何去找技术部所有的子节点
    //   const isRepeat = depts
    //     .filter(item => item.pid === this.treeNode.id)
    //     .some(item => item.name === value)
    //   isRepeat
    //     ? callback(new Error(`同级部门下已经有${value}的部门了`))
    //     : callback()
    // }
    // // * 检查同级部门下 是否有重复的部门名称
    const checkNameRepeat = async (rule, value, callback) => {
      // value 是部门名称
      const { depts } = await getDepartmentList()
      let isRepeat = false // 如果isRepeat为true 则有重复的
      if (this.deptForm.id) {
        // 编辑状态(同级部门名字不能重复（排除自己）)
        isRepeat = depts
          .filter(
            item =>
              item.pid === this.treeNode.pid && item.id !== this.deptForm.id
          )
          .some(item => item.name === value)
      } else {
        // 新增状态(同级部门名字不能重复)
        isRepeat = depts
          .filter(item => item.pid === this.treeNode.id)
          .some(item => item.name === value)
      }
      isRepeat
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback()
    }
    // * 检查编码重复
    const checkCodeRepeat = async (rule, value, callback) => {
      // 先要获取最新的组织架构数据
      const { depts } = await getDepartmentList()
      let isRepeat = false
      if (this.deptForm.id) {
        // 编辑状态:不能有一样的code(除了自己)
        isRepeat = depts
          .filter(item => item.id !== this.treeNode.id)
          .some(item => item.code === value && value)
      } else {
        // 新增状态
        isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      }
      isRepeat
        ? callback(new Error(`组织架构中已经有部门使用${value}编码`))
        : callback()
    }
    return {
      // dialogFormVisible: showDialog,
      deptForm: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门名称要求1-50个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: checkNameRepeat // 自定义函数的形式校验
          }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 50,
            message: '部门编码要求1-50个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: checkCodeRepeat // 自定义函数的形式校验
          }
        ],
        manager: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          {
            trigger: 'blur',
            min: 1,
            max: 300,
            message: '部门介绍要求1-50个字符'
          }
        ]
      },
      managers: [] // 全部负责人数据
    }
  },
  computed: {
    showTitle() {
      return this.deptForm.id ? '编辑部门' : '新增子部门'
    }
  },
  created() {
    this.getAllManager()
  },
  methods: {
    async getAllManager() {
      this.managers = await getEmployeeSimple()
    },
    // 获取详情
    async getDeptDetail(id) {
      this.deptForm = await getDeptDetail(id)
      // props 传值是异步的 id不能this.treeNode.id，用父组件传入的方式接受id
    },
    addDepts() {
      this.$refs.deptRuleForm.validate(async valid => {
        if (valid) {
          if (this.deptForm.id) {
            // 编辑
            await updateDepartments(this.deptForm)
            this.$message.success('修改成功！')
          } else {
            // 新增
            await addDepartment({ ...this.deptForm, pid: this.treeNode.id })
            this.$message.success('添加成功！')
          }
          // 子组件 update:固定写法 (update:props名称, 值)
          this.$emit('success') // 触发自定义事件

          this.$emit('update:showDialog', false) // 触发事件
        }
      })
    },
    btnCancel() {
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      this.deptForm = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$refs.deptRuleForm.resetFields() // 重置校验字段
      this.$emit('update:showDialog', false) // 关闭
    }
  }
}
</script>

<style lang="less" scoped></style>
