import React from 'react'
import { AsyncStorage } from 'react-native';

import { HEB } from '../config'
import BasicPage from './basic_page'

export default function WelcomeScreen({ navigation }) {
  (async () => {
    const number = await AsyncStorage.getItem('teamNumber')
    if (number) {
    	navigation.navigate('PRE_INST')
    }
  }) ()

  return <BasicPage message={HEB.WELCOME} button={{ text: HEB.LOGIN, onPress: () => navigation.navigate('QR') }} />
}
