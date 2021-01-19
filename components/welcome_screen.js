import React from 'react'
import { AsyncStorage } from 'react-native'

import i18n from '../logic/i18n'
import BasicPage from './basic_page'

export default function WelcomeScreen({ navigation }) {
  (async () => {
    const number = await AsyncStorage.getItem('teamNumber')
    if (number) {
    	navigation.navigate('PRE_INST')
    }
  }) ()

  return <BasicPage message={i18n.t('welcome')} button={{ text: i18n.t('login'), onPress: () => navigation.navigate('QR') }} />
}
