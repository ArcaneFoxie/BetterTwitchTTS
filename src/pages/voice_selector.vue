<template>
  <div>
    <v-list>
      <v-list-subheader>TTS VOICES</v-list-subheader>

      <v-list-item
        v-for="voice in sortedVoices"
        :key="voice.name"
        color="primary"
        rounded="shaped"
        :value="voice.name"
      >
        {{ voice.lang }} - {{ voice.name }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
  const voices = window.speechSynthesis.getVoices()

  const sortedVoices = voices.sort((a, b) => `${a.lang} - ${a.name}`.toLowerCase().localeCompare(`${b.lang} - ${b.name}`.toLowerCase()))

</script>
