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
      <v-list-item prepend-icon="mdi-message-processing" title="Chat" to="/" />
      <v-list-item prepend-icon="mdi-cog" title="General Settings" to="/general_settings" />
      <v-list-item prepend-icon="mdi-microphone-message" title="Voice Selector" to="/voice_selector" />
      <v-list-item prepend-icon="mdi-filter" title="Word Filter" to="/word_filter" />
      <v-list-item prepend-icon="mdi-file-edit" title="Word Replacement" to="/word_replacement" />
      <v-list-item prepend-icon="mdi-account-cancel" title="User Blacklist" to="/user_blacklist" />
      <v-list-item prepend-icon="mdi-bug" title="Debug" to="/debug" />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { useAppStore as appStore } from '@/stores/app'

  const state = appStore()
</script>
