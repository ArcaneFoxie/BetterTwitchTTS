import tmi, { ChatUserstate } from 'tmi.js'

class Twitch {
  client!: tmi.Client

  async connect (channelName: string) {
    this.client = new tmi.Client({ channels: [channelName], options: { debug: true } })

    await this.client.connect()

    this.client.on('message', this.onMessage.bind(this))
  }

  onMessage (channel: string, userstate: ChatUserstate, message: string, self: boolean) {

  }
}

export default new Twitch()
