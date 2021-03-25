<template>
  <div class="employee-container">
    <page-tools :showBefore="true">
      <!-- 左侧总记录 -->
      <span slot="before">
        共11条记录
      </span>
      <!-- 右侧按钮 -->
      <template v-slot:after>
        <el-button
          size="small"
          type="warning"
          @click="$router.push('/import?type=user')"
          >excel导入</el-button
        >
        <el-button size="small" type="danger">excel导出</el-button>
        <el-button size="small" type="primary" @click="addDialog = true"
          >新增员工</el-button
        >
      </template>
    </page-tools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table border :data="employeeList" v-loading="loading">
        <el-table-column label="序号" sortable="" type="index" width="100" />
        <el-table-column label="姓名" sortable="" prop="username" width="120" />
        <el-table-column label="手机号" sortable="" prop="mobile" width="160" />
        <el-table-column
          label="工号"
          sortable=""
          prop="workNumber"
          width="120"
        />
        <el-table-column
          label="聘用形式"
          sortable=""
          prop="formOfEmployment"
          :formatter="formatEmployment"
          width="140"
        />
        <el-table-column
          label="部门"
          sortable=""
          prop="departmentName"
          width="120"
        />
        <el-table-column label="入职时间" sortable="" width="160">
          <template scope="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column
          label="账户状态"
          sortable=""
          prop="enableState"
          width="120"
        >
          <template scope="{row}">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="260">
          <template scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delEmployee(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <!-- <el-pagination layout="prev, pager, next" /> -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="queryInfo.page"
          :page-size="queryInfo.size"
          layout="total, prev, pager, next"
          :total="queryInfo.total"
        >
        </el-pagination>
      </el-row>
    </el-card>
    <add-employee :addDialog.sync="addDialog" />
  </div>
</template>
<script>
import { getEmployeeList, delEmployeeById } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
export default {
  name: 'Employees',
  components: {
    AddEmployee
  },
  data() {
    return {
      employeeList: [],
      queryInfo: {
        page: 1,
        size: 10,
        total: null
      },
      loading: false,
      addDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 获取员工的综合列表数据
    async getEmployeeList() {
      this.loading = true
      const res = await getEmployeeList(this.queryInfo)
      this.queryInfo.total = res.total
      this.employeeList = res.rows
      this.loading = false
    },
    // 分页
    handleCurrentChange(val) {
      this.queryInfo.page = val
      this.getEmployeeList()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // 找到1 对应的值
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
      // row:行 column:列 cellValue：单元格的数据 index：索引
    },
    // 删除员工
    async delEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗?')
        await delEmployeeById(id)
        // if (document.querySelectorAll('.el-card tbody tr').length === 1) {
        //   this.queryInfo.page =
        //     this.queryInfo.page > 1 ? this.queryInfo.page - 1 : 1
        // }
        // console.log(document.querySelectorAll('el-card  tbody tr'))
        this.getEmployeeList()
        this.$message.success('删除成功！')
      } catch (error) {
        return false
        // this.$message.info('取消删除！')
      }
    }
  }
}
</script>

<style></style>
