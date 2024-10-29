<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Settings</h2>

        <!-- Volume Slider -->
        <v-slider
          v-model="store.tts.volume"
          label="Volume"
          :max="1"
          :min="0"
          step="0.05"
          tick-size="2"
          @end="saveSetting('volume', store.tts.volume)"
        >
          <template #append>
            <span>{{ (store.tts.volume * 100).toFixed(0) }}%</span>
          </template>
        </v-slider>

        <!-- Rate Slider -->
        <v-slider
          v-model="store.tts.rate"
          label="Rate"
          :max="2"
          :min="0.5"
          step="0.1"
          tick-size="2"
          @end="saveSetting('rate', store.tts.rate)"
        >
          <template #append>
            <span>{{ store.tts.rate }}x</span>
          </template>
        </v-slider>

        <!-- Pitch Slider -->
        <v-slider
          v-model="store.tts.pitch"
          label="Pitch"
          :max="2"
          :min="0.5"
          step="0.1"
          tick-size="2"
          @end="saveSetting('pitch', store.tts.pitch)"
        >
          <template #append>
            <span>{{ store.tts.pitch }}x</span>
          </template>
        </v-slider>

        <!-- Checkboxes -->
        <v-checkbox
          v-model="store.tts.repeatUsernames"
          label="Repeat Usernames"
          @change="saveSetting('repeatUsernames', store.tts.repeatUsernames)"
        />

        <v-checkbox
          v-model="store.tts.speakCastersMessages"
          label="Speak Caster's Messages"
          @change="saveSetting('speakCastersMessages', store.tts.speakCastersMessages)"
        />

        <v-checkbox
          v-model="store.tts.subOnlyMode"
          label="Sub Only Mode"
          @change="saveSetting('subOnlyMode', store.tts.subOnlyMode)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  function saveSetting (name: string, value: any) {
    window.localStorage.setItem(name, value.toString())
  }

</script>
