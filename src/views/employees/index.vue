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
        <el-button size="small" type="danger" @click="exportDate"
          >excel导出</el-button
        >
        <el-button
          size="small"
          type="primary"
          @click="addDialog = true"
          :disabled="!checkPermission('POINT-USER-ADD')"
          >新增员工</el-button
        >
      </template>
    </page-tools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table border :data="employeeList" v-loading="loading">
        <el-table-column label="序号" sortable="" type="index" width="100" />
        <el-table-column label="姓名" sortable="" prop="username" width="120" />
        <el-table-column label="头像" width="150" align="center">
          <template slot-scope="{ row }">
            <img
              slot="reference"
              v-imagerror="require('@/assets/common/bigUserHeader.png')"
              :src="row.staffPhoto"
              style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
              alt=""
              @click="showQrCode(row.staffPhoto)"
            />
          </template>
        </el-table-column>
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
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/employees/detail/${row.id}`)"
              :disabled="!checkPermission('POINT-USER-UPDATE')"
              >查看</el-button
            >
            <el-button type="text" size="small">转正</el-button>
            <el-button
              type="text"
              size="small"
              :disabled="!checkPermission('POINT-USER_DIAOGANG')"
              >调岗</el-button
            >
            <el-button type="text" size="small">离职</el-button>
            <el-button
              type="text"
              size="small"
              @click="editRole(row.id)"
              :disabled="!checkPermission('POINT-USER-ROLES')"
              >角色</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="delEmployee(row.id)"
              :disabled="!checkPermission('POINT-USER-DEL')"
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
    <el-dialog title="二维码" :visible.sync="showCodeDialog" width="30%">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <assign-role
      ref="assignRole"
      :showRoleDialog.sync="showRoleDialog"
      :user-id="userId"
    />
  </div>
</template>
<script>
import { getEmployeeList, delEmployeeById } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee'
import { formatDate } from '@/filters/index'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role'
export default {
  name: 'Employees',
  components: {
    AddEmployee,
    AssignRole
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
      addDialog: false, // 添加弹层
      showCodeDialog: false, // 二维码弹层
      showRoleDialog: false, //分配角色弹框
      userId: null
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
    },
    // 导出excel
    exportDate() {
      // 表头对应关系
      const headers = {
        手机号: 'mobile',
        姓名: 'username',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }

      // 懒加载
      import('@/vendor/Export2Excel').then(async excel => {
        // 获取所有数据
        //  没有获取所有数据的接口，所以就查询列表数据page=1,一页的大小为总条数的数据
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.queryInfo.total
        })
        // 调用方法 数组转化成二维数组 [{}] => [[]]
        const data = this.formatJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers), // 导出数据的表头
          data, // 导出的具体数据
          filename: '员工信息表', // 导出文件名
          multiHeader, // 复杂表头
          merges, // 合并选项
          autoWidth: true, // 单元格是否要自适应宽度
          bookType: 'xlsx' // 导出文件类型
        })
      })
    },
    // 该方法负责将数组转化成二维数组, [{},{}] => [[],[]]  数据结构一定要与表头的顺序对应
    formatJson(headers, rows) {
      // 首先遍历数组
      // [{ username: '张三'},{},{}]  => [[’张三'],[],[]]
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            // 转换为excel日期
            return formatDate(item[headers[key]]) // 返回格式化之前的时间
          } else if (headers[key] === 'formOfEmployment') {
            // 转换聘用形式
            var en = EmployeeEnum.hireType.find(
              obj => obj.id === item[headers[key]]
            )
            return en ? en.value : '未知'
          }
          return item[headers[key]]
        }) // => ["张三", "13811"，"2018","1", "2018", "10002"]
      })
    },
    //将图片地址转化成二维码
    showQrCode(url) {
      // url存在的情况下 才弹出层
      if (url === null || url === ' ') {
        this.$message.warning('该用户还未上传头像')
      } else {
        this.showCodeDialog = true // 数据更新了 但是我的弹层会立刻出现吗 ？页面的渲染是异步的！！！！
        // 有一个方法可以在上一次数据更新完毕，页面渲染完毕之后
        this.$nextTick(() => {
          // 此时可以确认已经有ref对象了
          QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化成二维码
          // 如果转化的二维码后面信息 是一个地址的话 就会跳转到该地址 如果不是地址就会显示内容
        })
      }
    },
    // 编辑角色
    async editRole(id) {
      this.userId = id // props传值 是异步的
      await this.$refs.assignRole.getUserDetailById(id) // 父组件调用子组件方法
      this.showRoleDialog = true
    }
  }
}
</script>

<style></style>
