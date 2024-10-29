import { useAppStore } from '@/stores/app'
import tmi, { ChatUserstate } from 'tmi.js'
import tts from './tts'

class Twitch {
  client!: tmi.Client
  store: ReturnType<typeof useAppStore>

  constructor () {
    this.store = useAppStore()
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
    channel = channel.slice(1)

    this.store.addChatLog(userstate.color || '#FFFFFF', message, userstate['display-name'] || channel)

    if (this.store.tts.subOnlyMode && (!userstate.subscriber && channel !== this.store.twitchData.login)) { return }
    if (!this.store.tts.speakCastersMessages && (self || channel === this.store.twitchData.login)) { return }

    tts.say(`${userstate['display-name'] || channel} said. ${message}`)
  }
}

export default new Twitch()
