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
    logs: [] as { type: LOG_TYPE, log: string, time: Date }[],
    tts: {
      connected: false,
      selectedVoice: '',
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
    addLog (type: LOG_TYPE, log: string) {
      this.logs.push({ type, log, time: new Date() })
    },
    setTtsConnected (state: boolean) {
      this.tts.connected = state
    },
    setTtsVoice (voice: string) {
      this.tts.selectedVoice = voice
    },
  },
})
