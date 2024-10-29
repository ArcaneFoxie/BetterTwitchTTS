<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>User Blacklist</h2>

        <!-- Add New Blacklisted Word -->
        <v-text-field
          v-model="newUser"
          label="Add New User"
          placeholder="Type a username and press Enter"
          @keyup.enter="addWord"
        />

        <!-- Blacklisted Words List -->
        <div v-for="(username, index) in store.tts.userBlacklist" :key="index">
          <v-btn icon @click="removeUser(index)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          {{ username }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import { useAppStore } from '@/stores/app'
  import { ref } from 'vue'

  const store = useAppStore()
  const newUser = ref('')

  function addWord () {
    const trimmedWord = newUser.value.trim().toLowerCase()
    if (trimmedWord === '') { return }

    if (!store.tts.userBlacklist.includes(trimmedWord)) {
      store.tts.userBlacklist.push(trimmedWord)
      saveBlacklistedUsers()
    }

    newUser.value = ''
  }

  function removeUser (index: number) {
    store.tts.userBlacklist.splice(index, 1)
    saveBlacklistedUsers()
  }

  function saveBlacklistedUsers () {
    window.localStorage.setItem('userBlacklist', JSON.stringify(store.tts.userBlacklist))
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
