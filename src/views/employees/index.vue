<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :showBefore="true">
        <!-- 左侧总记录 -->
        <span slot="before">
          共11条记录
        </span>
        <!-- 右侧按钮 -->
        <template v-slot:after>
          <el-button size="small" type="warning">excel导入</el-button>
          <el-button size="small" type="danger">excel导出</el-button>
          <el-button size="small" type="primary">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeeList" v-loading="loading">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable="" prop="enableState" />
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
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
    </div>
  </div>
</template>
<script>
import { getEmployeeList } from '@/api/employees'
export default {
  name: 'Employees',
  data() {
    return {
      employeeList: [],
      queryInfo: {
        page: 1,
        size: 5,
        total: null
      },
      loading: false
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
    }
  }
}
</script>

<style></style>
