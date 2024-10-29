export function parseUrlFragments (input: string): { access_token: string, id_token: string, scope: string, token_type: string } {
  const fragment = input.split('#')[1]
  const pairs = fragment.split('&')

  const output: any = {}

  pairs.forEach(pair => {
    const [key, value] = pair.split('=')
    output[decodeURIComponent(key)] = decodeURIComponent(value)
  })

  return output
}

export function getVoiceIndexFromName (input: string | null) {
  // aa-BB#VOICE NAME

  if (input === null) { return getDefaultVoice() }

  const split = input.split('#')
  const lang = split.splice(0, 1)[0]
  const name = split.join('#')

  const voices = window.speechSynthesis.getVoices()

  let foundVoice: SpeechSynthesisVoice | null = null

  for (let i = 0; i < voices.length; i++) {
    if (voices[i].lang === lang && voices[i].name === name) {
      foundVoice = voices[i]
      break
    }
  }

  if (foundVoice === null) {
    foundVoice = getDefaultVoice()
  }

  return foundVoice
}

export function getDefaultVoice (): SpeechSynthesisVoice {
  const voices = window.speechSynthesis.getVoices()

  let foundVoice: SpeechSynthesisVoice | null = null
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].default) {
      foundVoice = voices[i]
      break
    }
  }

  if (foundVoice === null) {
    throw new Error('Unable to find default voice')
  }

  return foundVoice
}

export function loadSetting <T> (name: string, fallback: T): T {
  const value = window.localStorage.getItem(name)
  let output: any = null

  if (value !== null) {
    if (typeof fallback === 'boolean') { output = value === 'true' }
    if (typeof fallback === 'number') { output = Number(value) }
    if (Array.isArray(fallback)) { output = JSON.parse(value) }
    if (typeof fallback === 'object') { output = JSON.parse(value) }
  }

  return output === null ? fallback : output
}
