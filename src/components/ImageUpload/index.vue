<template>
  <div>
    <!-- 给action一个#号 就不会报错了 -->
    <!-- file-list是上传的文件列表 可以绑定到上传组件上 让上传组件来显示 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
const cos = new COS({
  SecretId: 'AKIDDCWcfTZPWN1ScYhQTGmDWZO6W8TPgB9r',
  SecretKey: 'b3KMFclfKnNltwnPvJ27xXr2nLQ1we5s'
})
export default {
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: '',
      currentFileUid: null // 记录当前上传照片的uid
    }
  },
  computed: {
    // 如果它为true 表示就不应该显示 +号上传了
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 点击预览事件
    preview(file) {
      console.log(file.url)
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 不能用push 这个钩子会执行多次
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      // 先检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 检查文件大小 5M 1M=1024KB 1KB=1024B
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      console.log(file)
      this.currentFileUid = file.uid
      return true
    },
    // 进行上传操作
    upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: 'xiaoshayu63-1305398197', // 存储桶
            Region: 'ap-beijing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD' // 上传的模式类型 直接默认 标准模式即可
          },
          function(err, data) {
            console.log(err || data)
            if (!err && data.statusCode === 2000) {
              this.fileList.map(item => {
                if (item.uid === this.currentFileUid) {
                  return { url: 'http://' + data.Location }
                }
                return item
              })
            }
          }
        )
      }
    }
  }
}
</script>
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
