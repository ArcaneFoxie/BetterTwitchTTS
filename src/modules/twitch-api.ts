import config from '@/config.json'
import { useAppStore as appStore } from '@/stores/app'
const store = appStore()

type GetUserDetails = {
  broadcaster_type: string
  created_at: string
  description: string
  display_name: string
  id: string
  login: string
  offline_image_url: string
  profile_image_url: string
  type: string
  view_count: number
}

export async function GetUserDetails (): Promise<{ data: GetUserDetails[] }> {
  const data = await fetch('https://api.twitch.tv/helix/users', {
    headers: {
      'Client-Id': config.clientId,
      Authorization: `Bearer ${store.$state.twitchAuthentication.creds.access_token}`,
    },
  })

  return data.json()
}
