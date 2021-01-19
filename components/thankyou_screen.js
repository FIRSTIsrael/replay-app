import React from 'react'
import { BackHandler } from 'react-native'

import BasicPage from './basic_page'
import i18n from '../logic/i18n'

export default function ThankyouScreen({ navigation }) {
  return <BasicPage message={HEB.THANK_YOU} buttons={[
  	{ text: i18n.t('shoot_another'), onPress: () => navigation.navigate('PRE_INST') },
  	{ text: i18n.t('exit'), color: 'black', onPress: () => BackHandler.exitApp() }
  	]} />
}
