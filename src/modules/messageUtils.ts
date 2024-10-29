import tts from './tts'

export function containsBlacklistedWord (message: string) {
  if (tts.store.tts.blacklistedWords.length === 0) { return false }

  const blacklistSet = new Set(tts.store.tts.blacklistedWords.map(word => word.toLowerCase()))
  const words = message.toLowerCase().match(/\b\w+\b/g)

  if (!words) { return false }

  return words.some(word => blacklistSet.has(word))
}

export function replaceBlacklistedWords (message: string) {
  if (Object.keys(tts.store.tts.wordReplacement).length === 0) { return message }

  const blacklistSet = new Set(Object.keys(tts.store.tts.wordReplacement).map(word => word.toLowerCase()))
  const words = message.split(/\b/)

  const replacedMessage = words.map(word => {
    const lowerWord = word.toLowerCase()

    if (blacklistSet.has(lowerWord)) { return tts.store.tts.wordReplacement[lowerWord] || word }

    return word
  })

  return replacedMessage.join('')
}
