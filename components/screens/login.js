import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import PageTemplate from '../ui/page-template'
import i18n from '../../lib/i18n'
import { login } from '../../lib/auth'

export default function LoginScreen({ navigation }) {
  const handleLoginClick = () => {
    login().then(authToken => {
      if (authToken) navigation.replace('HOME', { authToken })
    })
  }

  return (
    <PageTemplate>
      <View style={styles.container}>
        <Text style={styles.headline}>{i18n.t('welcome.headline')}</Text>
        <Text style={styles.intro}>{i18n.t('welcome.intro')}</Text>
        <Button
          mode="contained"
          style={{ marginTop: RFValue(60), padding: 4 }}
          onPress={handleLoginClick}
        >
          <Text style={{ fontSize: RFValue(14), color: '#fff', fontFamily: 'Heebo_700Bold' }}>
            {i18n.t('login')}
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
    fontFamily: 'Heebo_900Black',
    textAlign: 'center'
  },
  intro: {
    fontSize: RFValue(16),
    textAlign: 'center',
    color: '#888',
    marginTop: RFValue(12)
  }
}
