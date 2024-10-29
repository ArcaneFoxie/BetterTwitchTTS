import tts from './tts'

export function containsBlacklistedWord (message: string) {
  if (tts.store.tts.blacklistedWords.length === 0) { return false }

  const blacklistSet = new Set(tts.store.tts.blacklistedWords.map(word => word.toLowerCase()))
  const words = message.toLowerCase().match(/\b\w+\b/g)

  if (!words) { return false }

  return words.some(word => blacklistSet.has(word))
}
