<template>
  <!-- 公共导入组件 -->
  <upload-excel :onSuccess="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  name: '',

  data() {
    return {
      type: this.$route.query.type
    }
  },
  methods: {
    async success({ header, results }) {
      //header results 的数据是中文
      // 如果是导入员工
      if (this.type === 'user') {
        const userRelations = {
          入职日期: 'timeOfEntry',
          手机号: 'mobile',
          姓名: 'username',
          转正日期: 'correctionTime',
          工号: 'workNumber'
        }
        const newArr = results.map(item => {
          let userInfo = {}
          // Object.keys(item):中文数组(key)
          Object.keys(item).forEach(key => {
            // userRelations[key]: 找到中文对应的英文名称（username）
            // item[key]:表格中的值(张三)
            if (
              userRelations[key] === 'timeOfEntry' ||
              userRelations[key] === 'correctionTime'
            ) {
              // 后端接口限制了不能是字符串，要求转换为时间类型
              userInfo[userRelations[key]] = new Date(
                this.formatDate(item[key], '/')
              )
              return
            }
            userInfo[userRelations[key]] = item[key]
          })
          return userInfo
        })
        try {
          await importEmployee(newArr)
          this.$message.success('导入Excel成功！')
          this.$router.back()
        } catch (error) {
          this.$message.error('导入Excel失败！')
        }
      }
    },
    // 转换Excel的日期格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return (
        year +
        (month < 10 ? '0' + month : month) +
        (date < 10 ? '0' + date : date)
      )
    }
  }
}
</script>

<style lang="less" scoped></style>
