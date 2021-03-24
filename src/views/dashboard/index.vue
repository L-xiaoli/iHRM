<template>
  <div class="dashboard-container">
    <page-tools :showBefore="showBefore">
      <!-- <span slot="before">aaaa</span> -->
      <template v-slot:before>
        <span class="dashboard-text">name: {{ name }}</span>
      </template>
    </page-tools>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',

  computed: {
    ...mapGetters(['name'])
  },
  data() {
    return {
      showBefore: true // 隐藏左边的插槽
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
