import { useAppStore } from '@/stores/app'
import tmi, { ChatUserstate } from 'tmi.js'
import tts from './tts'
import { containsBlacklistedWord, replaceBlacklistedWords } from './messageUtils'

class Twitch {
  client!: tmi.Client
  store: ReturnType<typeof useAppStore>
  lastSpokenUsername: string

  constructor () {
    this.store = useAppStore()
    this.lastSpokenUsername = ''
  }

  async connect () {
    this.store.tmi.connected = true
    this.client = new tmi.Client({ channels: [this.store.twitchData.login], options: { debug: true } })

    tts.say('Connecting')

    try {
      await this.client.connect()
    } catch (error) {
      console.error(error)
      tts.say('Error connecting, view debug for more infomation')
    }

    tts.say(`Connected to ${this.store.twitchData.displayName}`)

    this.client.on('message', this.onMessage.bind(this))
  }

  async disconnect () {
    await this.client.disconnect()
    tts.say('Disconnected')
    this.store.tmi.connected = false
  }

  onMessage (channel: string, userstate: ChatUserstate, message: string, self: boolean) {
    if (!userstate.username) { return }

    this.store.addChatLog(userstate.color || '#FFFFFF', message, userstate['display-name'] || userstate.username)

    if (this.store.tts.userBlacklist.includes(userstate.username)) { return }
    if (this.store.tts.subOnlyMode && (!userstate.subscriber && userstate.username !== this.store.twitchData.login)) { return }
    if (!this.store.tts.speakCastersMessages && (self || userstate.username === this.store.twitchData.login)) { return }

    if (containsBlacklistedWord(message)) { return }
    message = replaceBlacklistedWords(message)

    if (!this.store.tts.repeatUsernames && this.lastSpokenUsername === userstate.username) {
      tts.say(message)
    } else {
      if (this.store.tts.usernameReplacement[userstate.username]) {
        tts.say(`${this.store.tts.usernameReplacement[userstate.username]} said ${message}`)
      } else {
        tts.say(`${userstate['display-name'] || userstate.username} said. ${message}`)
      }
    }

    this.lastSpokenUsername = userstate.username
  }
}

export default new Twitch()
