import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import jwtDecode from 'jwt-decode'
import i18n from '../lib/i18n'

import config from '../config'

export const login = async () => {
  const appRedirect = Constants.linkingUri
  const params = new URLSearchParams({
    client_id: config.auth.clientId,
    response_type: 'code',
    scope: 'openid+email+profile+remotehub',
    claims: encodeURIComponent(
      JSON.stringify({
        id_token: {
          given_name: null,
          english_given_name: null
        }
      })
    ),
    redirect_uri: config.auth.redirectUri,
    nonce: 'none',
    state: encodeURIComponent(JSON.stringify({ redirect: appRedirect }))
  })

  try {
    const authUrl = `${config.auth.issuer}/auth?${params.toString()}`
    const result = await WebBrowser.openAuthSessionAsync(authUrl, appRedirect)

    if (result.type === 'success') {
      const resParams = Object.fromEntries(
        result.url
          .split('?')?.[1]
          .split('&')
          .map(i => i.split('=').map(i => decodeURIComponent(i))) ?? []
      )

      if (String(resParams.id_token) !== 'undefined' && String(resParams.id_token) !== 'null') {
        return resParams.id_token || null
      }
    }
  } catch (error) {
    console.error(error)
  }

  return null
}

export const getUserGivenName = authToken => {
  let user = { given_name: 'משתמש', english_given_name: 'User' }
  try {
    user = jwtDecode(authToken)
  } catch {}
  const locateName = i18n.currentLocale() === 'he' ? user.given_name : user.english_given_name
  const fallback = user.given_name || user.english_given_name
  return locateName || fallback
}
