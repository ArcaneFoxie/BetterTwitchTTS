<template>
  <div>
    <div v-for="(log, index) in logs" :key="`log-${index}`" :class="{ 'altline' : index % 2 }">
      <span style="color:lightslategrey;">{{ log.time.toLocaleTimeString() }}</span>
      :
      <span :style="{ color: `${log.color}` }">{{ log.username }}</span>
      - {{ log.message }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { GetUserDetails } from '@/modules/twitch-api'
  import { useAppStore as appStore } from '@/stores/app'

  const state = appStore()

  onMounted(async () => {
    const res = (await GetUserDetails()).data[0]

    state.setTwitchData({
      displayName: res.display_name,
      id: res.id,
      login: res.login,
      profileImageUrl: res.profile_image_url,
    })
  })

  const logs = computed(() => {
    return state.messages.slice(0).reverse()
  })
</script>
