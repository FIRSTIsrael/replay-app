import React from 'react'

import BasicPage from './basic_page'
import { HEB } from '../config'

export default function ThankyouScreen({ navigation }) {
  return <BasicPage message={HEB.THANK_YOU} button={{ text: HEB.SHOOT_ANOTHER, onPress: () => navigation.navigate('PRE_INST') }} />
}
