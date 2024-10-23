// Utilities
import { defineStore } from 'pinia'
import { LOG_TYPE } from '@/modules/logger'

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
    logs: [],
  }),
  actions: {
    async loginTwitch (creds: { access_token: string, id_token: string, scope: string, token_type: string }) {
      this.twitchAuthentication.creds = creds
      this.twitchAuthentication.authenticated = true
    },
    setTwitchData (data: { displayName: string, id: string, login: string, profileImageUrl: string }) {
      this.twitchData = data
    },
    addLog (type: LOG_TYPE, log: string) {
      (this.logs as any).push({ type, log, time: new Date() })
    },
  },
})
