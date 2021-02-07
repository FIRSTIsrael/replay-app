import React from 'react'
import { AsyncStorage } from 'react-native'

import i18n from '../logic/i18n'
import { login } from '../logic/auth'
import BasicPage from './basic_page'

export default function WelcomeScreen({ navigation }) {
  ;(async () => {
    const number = await AsyncStorage.getItem('teamNumber')
    if (number) {
      navigation.navigate('PRE_INST')
    }
  })()

  return (
    <BasicPage
      message={i18n.t('welcome')}
      button={{
        text: i18n.t('login'),
        onPress: async () => {
          const authId = await login()
          navigation.navigate('TEAMS', { authId })
        }
      }}
    ></BasicPage>
  )
}
