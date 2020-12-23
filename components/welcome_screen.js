import React from 'react'

import { HEB } from '../config'
import BasicPage from './basic_page'

export default function WelcomeScreen({ navigation }) {
  return <BasicPage message={HEB.WELCOME} button={{ text: HEB.LOGIN, onPress: () => navigation.navigate('QR') }} />
}
