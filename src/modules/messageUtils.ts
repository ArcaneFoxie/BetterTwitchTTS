import tts from './tts'

export function containsBlacklistedWord (message: string) {
  if (tts.store.tts.blacklistedWords.length === 0) { return false }

  const pattern = new RegExp(`\\b(${tts.store.tts.blacklistedWords.join('|')})\\b`, 'i')
  return pattern.test(message)
}
