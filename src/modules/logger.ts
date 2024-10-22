const { debug, error, log, warn } = window.console

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

window.console.debug = function (...args) { debug(parseLog(...args)) }
window.console.error = function (...args) { error(parseLog(...args)) }
window.console.log = function (...args) { log(parseLog(...args)) }
window.console.warn = function (...args) { warn(parseLog(...args)) }
