import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import { useLocalization } from '../../lib/i18n'
import PageTemplate from '../ui/page-template'
import FIRST from '../ui/FIRST'
import { login } from '../../lib/auth'
import useOrientation from '../../lib/use-orientation'

export default function LoginScreen({ navigation }) {
  useOrientation('PORTRAIT')
  const { t, locale } = useLocalization()

  const handleLoginClick = () => {
    login().then(authToken => {
      if (authToken) navigation.replace('HOME', { authToken })
    })
  }

  return (
    <PageTemplate>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: locale === 'en' ? 'Roboto_900Black' : 'Heebo_900Black',
            ...styles.headline
          }}
        >
          <FIRST italicFont="Roboto_900Black_Italic">{t('welcome.headline')}</FIRST>
        </Text>
        <Text style={styles.intro}>{t('welcome.intro')}</Text>
        <Button
          mode="contained"
          style={{ marginTop: RFValue(60), padding: 4 }}
          onPress={handleLoginClick}
        >
          <Text style={{ fontSize: RFValue(14), color: '#fff', fontFamily: 'Heebo_700Bold' }}>
            {t('login')}
          </Text>
        </Button>
      </View>
    </PageTemplate>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    padding: 32,
    height: '100%'
  },
  headline: {
    fontSize: RFValue(24),
    lineHeight: RFValue(32),
    textAlign: 'center'
  },
  intro: {
    fontSize: RFValue(16),
    textAlign: 'center',
    color: '#888',
    marginTop: RFValue(12)
  }
}
