<template>
  <div>
    <div v-for="(log, index) in logs" :key="`log-${index}`" :class="{ 'altline' : index % 2 }">
      <span style="color:lightslategrey;">{{ log.time.toLocaleTimeString() }}</span>
      :
      <span :style="{ color: getLogColor(log.type) }">{{ LOG_TYPE[log.type] }}</span>
       - {{ log.log }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  import { LOG_TYPE } from '@/modules/logger'

  const store = useAppStore()

  function getLogColor(type: LOG_TYPE) {
    if (type === LOG_TYPE.DEBUG) { return 'plum' }
    if (type === LOG_TYPE.ERROR) { return '#ae0202' }
    if (type === LOG_TYPE.LOG) { return 'white' }
    if (type === LOG_TYPE.WARN) { return '#2081ab' }
  }

  const logs = computed(() => {
    return store.logs.slice(0).reverse()
  })
</script>

<style lang="css" scoped>
  .altline {
    background-color: #333333;
  }
</style>
