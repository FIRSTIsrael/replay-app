import React from 'react'
import { BackHandler } from 'react-native'

import BasicPage from './basic_page'
import { HEB } from '../config'

export default function ThankyouScreen({ navigation }) {
  return <BasicPage message={HEB.THANK_YOU} buttons={[
  	{ text: HEB.SHOOT_ANOTHER, onPress: () => navigation.navigate('PRE_INST') },
  	{ text: HEB.EXIT, onPress: () => BackHandler.exitApp() }
  	]} />
}
