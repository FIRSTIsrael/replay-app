import { AsyncStorage } from 'react-native'
import * as AuthSession from 'expo-auth-session'
import Constants from 'expo-constants'

import config from '../config'

export const login = async () => {
  const authUrl = `${config.auth.issuer}/auth?redirect_uri=${encodeURIComponent(
    AuthSession.getRedirectUrl()
  )}&client_id=${
    config.auth.clientId
  }&scope=openid+email+remotehub&response_type=id_token&nonce=nonce`
  const authData = await AuthSession.startAsync({ authUrl, returnUrl: Constants.linkingUrl })
  return authData.params.id_token
}

export async function signOut({ accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true
    })
    await AsyncStorage.removeItem(StorageKey)
    return null
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`)
  }
}
