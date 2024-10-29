// Utilities
import { defineStore } from 'pinia'
import { LOG_TYPE } from '@/modules/logger'
import { loadSetting } from '@/modules/functions'

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
    tmi: {
      connected: false,
    },
    logs: [] as { type: LOG_TYPE, log: string, time: Date }[],
    messages: [] as { color: string, message: string, time: Date, username: string }[],
    tts: {
      selectedVoice: '',
      volume: loadSetting('volume', 0.5),
      rate: loadSetting('rate', 1),
      pitch: loadSetting('pitch', 1),
      repeatUsernames: loadSetting('repeatUsernames', true),
      speakCastersMessages: loadSetting('speakCastersMessages', true),
      subOnlyMode: loadSetting('subOnlyMode', false),
      blacklistedWords: loadSetting('blacklistedWords', []) as string[],
      wordReplacement: loadSetting('wordReplacement', {}) as { [x: string]: string },
      userBlacklist: loadSetting('userBlacklist', []) as string[],
      usernameReplacement: loadSetting('usernameReplacement', {}) as { [x: string]: string },
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
    addChatLog (color: string, message: string, username: string) {
      this.messages.push({ color, message, username, time: new Date() })
    },
    setTtsVoice (voice: string) {
      this.tts.selectedVoice = voice
    },
  },
})
