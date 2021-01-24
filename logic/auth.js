import React from 'react'
import * as AuthSession from 'expo-auth-session'
import { AsyncStorage } from 'react-native'

import config from '../config'

export const login = async () => {
  const redirectUrl = AuthSession.getRedirectUrl()

  const authUrl = `${config.auth.issuer}?redirect_uri=${encodeURIComponent(redirectUrl)}&client_id=${config.auth.clientId}&scope=openid+email+remotehub&response_type=id_token&nonce=nonce`

  const authData = await AuthSession.startAsync({ authUrl })
  alert(JSON.stringify(authData))

  return authData
}

export async function signOut({ accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    })
    await AsyncStorage.removeItem(StorageKey)
    return null
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`)
  }
}
