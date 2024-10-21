<template>
  <div>
    <span>
      AUTHENTICATING
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { parseUrlFragments } from '@/modules/functions'
  import { useAppStore as appStore } from '@/stores/app'
  import router from '@/router'

  const state = appStore()
  const test = parseUrlFragments(router.currentRoute.value.fullPath)

  state.loginTwitch(test)
  router.push('/')
</script>

<route lang="json">
  {
    "meta": {
      "layout": "login"
    }
  }
</route>
