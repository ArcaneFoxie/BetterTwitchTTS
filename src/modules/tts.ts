import { useAppStore } from '@/stores/app'
import { getDefaultVoice, getVoiceIndexFromName } from './functions'

class TTS {
  store: ReturnType<typeof useAppStore>
  synth: SpeechSynthesis
  utter: SpeechSynthesisUtterance

  constructor () {
    this.store = useAppStore()
    this.synth = window.speechSynthesis
    this.utter = new SpeechSynthesisUtterance()

    window.speechSynthesis.addEventListener('voiceschanged', this.init.bind(this))
  }

  async init () {
    if (!this.store.twitchAuthentication.authenticated) { return }

    window.speechSynthesis.removeEventListener('voiceschanged', this.init.bind(this))

    let voice = window.localStorage.getItem('TTSVoice')
    if (!voice) {
      const v = getDefaultVoice()
      voice = `${v.lang}#${v.name}`
    }

    this.setVoice(getVoiceIndexFromName(voice))
    this.say('Starting Speech Synthesis')
  }

  connect () {
    this.store.setTtsConnected(true)
  }

  disconnect () {
    this.store.setTtsConnected(false)
  }

  setVoice (voice: SpeechSynthesisVoice) {
    this.store.setTtsVoice(`${voice.lang}#${voice.name}`)
    window.localStorage.setItem('TTSVoice', `${voice.lang}#${voice.name}`)

    this.utter.lang = voice.lang
    this.utter.voice = voice
  }

  say (input: string, forced = false) {
    if (forced && this.synth.speaking) {
      this.synth.cancel()
    }

    // this.utter.lang
    // this.utter.voice
    // this.utter.pitch
    // this.utter.rate
    // this.utter.volume

    this.utter.text = input
    this.synth.speak(this.utter)
  }
}

export default new TTS()
