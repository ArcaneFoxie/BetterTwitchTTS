<template>
  <v-navigation-drawer expand-on-hover permanent rail>
    <v-list>
      <v-list-item
        :prepend-avatar="state.twitchData.profileImageUrl"
        :title="state.twitchData.displayName"
      />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles" />
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" />
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useAppStore as appStore } from '@/stores/app'

  const state = appStore()
</script>
