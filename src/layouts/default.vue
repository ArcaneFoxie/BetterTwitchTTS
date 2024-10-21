<template>
  <v-app>
    <v-main>

      <v-layout v-if="isAuthenticated" class="rounded rounded-md">
        <AppBar />
        <AppNavDrawer />
        <v-main style="min-height: 100vh;">
          <div style="margin: 24px;">
            <router-view />
          </div>
        </v-main>
        <AppFooter />
      </v-layout>

      <v-btn v-else @click="redirect">LOGIN WITH TWITCH</v-btn>
    </v-main>

  </v-app>
</template>

<script lang="ts" setup>
  import { useAppStore as appStore } from '@/stores/app'
  import config from '@/config.json'

  const state = appStore()
  const isAuthenticated = state.$state.twitchAuthentication.authenticated

  function redirect () {
    window.location.assign(`https://id.twitch.tv/oauth2/authorize?response_type=token+id_token&client_id=${config.clientId}&redirect_uri=http://localhost:3000/twitch_token_auth&scope=user%3Abot+openid`)
  }
</script>
