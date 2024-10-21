// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    twitchAuthentication: {
      authenticated: false,
      creds: {
        access_token: '',
        id_token: '',
        scope: '',
        token_type: '',
      },
    },
    twitchData: {
      displayName: '',
      id: '',
      login: '',
      profileImageUrl: '',
    },
  }),
  actions: {
    async loginTwitch (creds: { access_token: string, id_token: string, scope: string, token_type: string }) {
      this.twitchAuthentication.creds = creds
      this.twitchAuthentication.authenticated = true
    },
    setTwitchData (data: { displayName: string, id: string, login: string, profileImageUrl: string }) {
      this.twitchData = data
    },
  },
})
