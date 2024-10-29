<template>
  <v-app-bar title="BetterTwitchTTS">
    <v-spacer />
    <v-btn :color="store.tmi.connected ? 'red' : 'green'" variant="outlined" @click="clickMe">
      {{ store.tmi.connected ? 'DISCONNECT' : 'CONNECT' }}
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'
  import twitch from '@/modules/twitch'

  const store = useAppStore()

  function clickMe () {
    store.tmi.connected ? twitch.disconnect() : twitch.connect()
  }

</script>

<style lang="css">
  .v-toolbar-title {
    flex: unset !important;
  }
</style>
