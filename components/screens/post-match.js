import React from 'react'
import { BackHandler } from 'react-native'

import PageTemplate from '../ui/page-template'
import i18n from '../../lib/i18n'
import useOrientation from '../../lib/use-orientation'

export default function PostMatchScreen({ navigation }) {
  useOrientation('PORTRAIT')

  return (
    <PageTemplate
      message={i18n.t('thank_you')}
      buttons={[
        { text: i18n.t('shoot_another'), onPress: () => navigation.navigate('PRE_INST') },
        { text: i18n.t('exit'), color: 'black', onPress: () => BackHandler.exitApp() }
      ]}
    />
  )
}
