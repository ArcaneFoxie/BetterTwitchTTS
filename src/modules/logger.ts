import { useAppStore } from '@/stores/app'

const { debug, error, log, warn } = window.console
const store = useAppStore()

export enum LOG_TYPE {
  DEBUG,
  ERROR,
  LOG,
  WARN
}

function parseLog (...args: any[]): string {
  let output = ''
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] !== 'string') {
      output += JSON.stringify(args[i])
    } else {
      output += args[i]
    }

    output += ' '
  }

  return output
}

window.console.debug = function (...args) {
  const res = parseLog(...args)
  debug(res)
  store.addLog(LOG_TYPE.DEBUG, res)
}

window.console.error = function (...args) {
  const res = parseLog(...args)
  error(res)
  store.addLog(LOG_TYPE.ERROR, res)
}

window.console.log = function (...args) {
  const res = parseLog(...args)
  log(res)
  store.addLog(LOG_TYPE.LOG, res)
}

window.console.warn = function (...args) {
  const res = parseLog(...args)
  warn(res)
  store.addLog(LOG_TYPE.WARN, res)
}
