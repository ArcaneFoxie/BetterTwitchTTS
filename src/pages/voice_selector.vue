<template>
  <div>
    <v-list>
      <v-list-subheader>TTS VOICES</v-list-subheader>

      <v-list-item
        v-for="voice in sortedVoices"
        :key="`${voice.lang}#${voice.name}`"
        :active="selectedVoice === `${voice.lang}#${voice.name}`"
        color="primary"
        rounded="shaped"
        :value="`${voice.lang}#${voice.name}`"
        @click="updateVoice(`${voice.lang}#${voice.name}`)"
      >
        {{ voice.lang }} - {{ voice.name }}
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts" setup>
  import { getVoiceIndexFromName } from '@/modules/functions'
  import { onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app'
  import tts from '@/modules/tts'

  const sortedVoices = ref<SpeechSynthesisVoice[]>([])
  const store = useAppStore()
  const voices = window.speechSynthesis.getVoices()
  const selectedVoice = ref('')

  function populateList () {
    selectedVoice.value = store.tts.selectedVoice
    sortedVoices.value = voices.sort((a, b) => `${a.lang} - ${a.name}`.toLowerCase().localeCompare(`${b.lang} - ${b.name}`.toLowerCase()))
  }

  onMounted(() => {
    speechSynthesis.addEventListener('voiceschanged', populateList)
    populateList()
  })

  onUnmounted(() => {
    speechSynthesis.removeEventListener('voiceschanged', populateList)
  })

  function updateVoice (name: string) {
    const foundVoice = getVoiceIndexFromName(name)

    if (!foundVoice) {
      alert(`Error, unable to find voice: ${name}`)
      return
    }

    tts.setVoice(foundVoice)
    tts.say(`Voice changed to ${foundVoice.name}`, true)

    populateList()
  }

</script>
