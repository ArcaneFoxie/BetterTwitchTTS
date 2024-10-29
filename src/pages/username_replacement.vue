<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Replace Usernames</h2>

        <!-- Add New Blacklisted Word -->
        <v-text-field
          v-model="oldUsername"
          label="Username"
          placeholder="Type a username and press Enter"
          @keyup.enter="addUsername"
        />
        <v-text-field
          v-model="newUsername"
          label="Replacement Username"
          placeholder="Type a username and press Enter"
          @keyup.enter="addUsername"
        />

        <!-- Blacklisted Words List -->
        <div v-for="(replacedUsername, username) in store.tts.usernameReplacement" :key="username">
          <v-btn icon @click="removeUsername(username as string)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          {{ username }} -> {{ replacedUsername }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  import { ref } from 'vue'

  const store = useAppStore()

  const oldUsername = ref('')
  const newUsername = ref('')

  function addUsername () {
    const trimmedBlacklistedWord = oldUsername.value.trim().toLowerCase()
    const trimmedReplacementWord = newUsername.value.trim()

    if (trimmedReplacementWord === '') { return }

    if (!store.tts.usernameReplacement[trimmedBlacklistedWord]) {
      store.tts.usernameReplacement[trimmedBlacklistedWord] = trimmedReplacementWord
      saveReplacementUsernames()
    }

    oldUsername.value = ''
    newUsername.value = ''
  }

  function removeUsername (word: string) {
    delete store.tts.usernameReplacement[word]
    saveReplacementUsernames()
  }

  function saveReplacementUsernames () {
    window.localStorage.setItem('usernameReplacement', JSON.stringify(store.tts.usernameReplacement))
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
