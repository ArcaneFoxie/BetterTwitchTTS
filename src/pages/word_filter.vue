<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Blacklisted Words</h2>

        <!-- Add New Blacklisted Word -->
        <v-text-field
          v-model="newWord"
          label="Add New Word"
          placeholder="Type a word and press Enter"
          @keyup.enter="addWord"
        />

        <!-- Blacklisted Words List -->
        <div v-for="(word, index) in store.tts.blacklistedWords" :key="index">
          <v-btn icon @click="removeWord(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          {{ word }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  import { ref } from 'vue'

  const store = useAppStore()
  const newWord = ref('')

  function addWord () {
    const trimmedWord = newWord.value.trim()
    if (trimmedWord && !store.tts.blacklistedWords.includes(trimmedWord)) {
      store.tts.blacklistedWords.push(trimmedWord)
      saveBlacklistedWords()
    }
    newWord.value = ''
  }

  function removeWord (index: number) {
    store.tts.blacklistedWords.splice(index, 1)
    saveBlacklistedWords()
  }

  function saveBlacklistedWords () {
    window.localStorage.setItem('blacklistedWords', JSON.stringify(store.tts.blacklistedWords))
  }
</script>

<style scoped>
  .v-list-item {
    display: flex;
    align-items: center;
  }
  .v-btn {
    margin-right: 8px;
  }
</style>
