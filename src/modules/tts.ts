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

    this.utter.pitch = this.store.tts.pitch
    this.utter.rate = this.store.tts.rate
    this.utter.volume = this.store.tts.volume

    this.utter.text = input
    this.synth.speak(this.utter)
  }
}

export default new TTS()
