<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Replace Words</h2>

        <!-- Add New Blacklisted Word -->
        <v-text-field
          v-model="blacklistedWord"
          label="Blacklisted Word"
          placeholder="Type a word and press Enter"
          @keyup.enter="addWord"
        />
        <v-text-field
          v-model="replacementWord"
          label="Replacement Word"
          placeholder="Type a word and press Enter"
          @keyup.enter="addWord"
        />

        <!-- Blacklisted Words List -->
        <div v-for="(replacedWord, bannedWord) in store.tts.wordReplacement" :key="bannedWord">
          <v-btn icon @click="removeWord(bannedWord as string)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          {{ bannedWord }} -> {{ replacedWord }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  import { ref } from 'vue'

  const store = useAppStore()

  const blacklistedWord = ref('')
  const replacementWord = ref('')

  function addWord () {
    const trimmedBlacklistedWord = blacklistedWord.value.trim()
    const trimmedReplacementWord = replacementWord.value.trim()

    if (trimmedReplacementWord === '') { return }

    if (!store.tts.wordReplacement[trimmedBlacklistedWord]) {
      store.tts.wordReplacement[trimmedBlacklistedWord] = trimmedReplacementWord
      saveBlacklistedWords()
    }

    blacklistedWord.value = ''
    replacementWord.value = ''
  }

  function removeWord (word: string) {
    delete store.tts.wordReplacement[word]
    saveBlacklistedWords()
  }

  function saveBlacklistedWords () {
    window.localStorage.setItem('wordReplacement', JSON.stringify(store.tts.wordReplacement))
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
