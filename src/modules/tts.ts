import { useAppStore } from '@/stores/app'
import { getDefaultVoice, getVoiceIndexFromName } from './functions'

class TTS {
  store: ReturnType<typeof useAppStore>
  synth: SpeechSynthesis
  voice?: SpeechSynthesisVoice
  loaded: boolean

  constructor () {
    this.loaded = false

    this.store = useAppStore()
    this.synth = window.speechSynthesis

    window.speechSynthesis.addEventListener('voiceschanged', this.init.bind(this))
  }

  async init () {
    if (!this.store.twitchAuthentication.authenticated) { return }
    if (this.loaded) { return }
    this.loaded = true

    window.speechSynthesis.removeEventListener('voiceschanged', this.init.bind(this))

    let voice = window.localStorage.getItem('TTSVoice')
    if (!voice) {
      const v = getDefaultVoice()
      voice = `${v.lang}#${v.name}`
    }

    this.setVoice(getVoiceIndexFromName(voice))
    this.say('Starting Speech Synthesis')
  }

  setVoice (voice: SpeechSynthesisVoice) {
    this.store.setTtsVoice(`${voice.lang}#${voice.name}`)
    window.localStorage.setItem('TTSVoice', `${voice.lang}#${voice.name}`)
    this.voice = voice
  }

  say (input: string, forced = false) {
    if (!this.voice) { return }

    const utter = new SpeechSynthesisUtterance()
    utter.lang = this.voice.lang
    utter.voice = this.voice

    if (forced && this.synth.speaking) {
      this.synth.cancel()
    }

    utter.pitch = this.store.tts.pitch
    utter.rate = this.store.tts.rate
    utter.volume = this.store.tts.volume

    utter.text = input
    this.synth.speak(utter)
  }
}

export default new TTS()
