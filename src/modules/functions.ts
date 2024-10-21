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
