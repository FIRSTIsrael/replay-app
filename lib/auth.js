import Constants from 'expo-constants'
import * as WebBrowser from 'expo-web-browser'
import jwtDecode from 'jwt-decode'
import i18n from '../lib/i18n'

import config from '../config'

const parseQueryParams = url =>
  Object.fromEntries(
    url
      .split('?')?.[1]
      .split('&')
      .map(i => i.split('=').map(i => decodeURIComponent(i))) ?? []
  )

export const login = async () => {
  const appRedirect = Constants.linkingUri
  const loginParams = new URLSearchParams({
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

  const authUrl = `${config.auth.issuer}/auth?${loginParams.toString()}`
  const result = await WebBrowser.openAuthSessionAsync(authUrl, appRedirect)

  if (result.type === 'success') {
    return parseQueryParams(result.url).id_token
  } else if (result.type === 'cancel') {
    return null
  } else {
    throw new Error('Unknown Error')
  }
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
