<template>
  <div>
    <span>
      Index
    </span>
  </div>
</template>

<script lang="ts" setup>
  // import Twitch from '@/modules/twitch'
  import { GetUserDetails } from '@/modules/twitch-api'
  import { useAppStore as appStore } from '@/stores/app'

  const state = appStore()

  onMounted(async () => {
    console.log('owo?')

    const res = (await GetUserDetails()).data[0]

    state.setTwitchData({
      displayName: res.display_name,
      id: res.id,
      login: res.login,
      profileImageUrl: res.profile_image_url,
    })

    // Twitch.connect('ArcaneFoxie')
  })

</script>
