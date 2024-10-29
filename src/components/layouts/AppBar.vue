<template>
  <v-app-bar title="BetterTwitchTTS">
    <v-spacer />
    <v-btn :color="store.tts.connected ? 'red' : 'green'" variant="outlined" @click="clickMe">
      {{ store.tts.connected ? 'DISCONNECT' : 'CONNECT' }}
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useAppStore } from '@/stores/app'
  import TTS from '@/modules/tts'

  const store = useAppStore()

  function clickMe () {
    store.tts.connected ? TTS.disconnect() : TTS.connect()
  }

</script>

<style lang="css">
  .v-toolbar-title {
    flex: unset !important;
  }
</style>
