import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import i18n from '../lib/i18n'
import { login } from '../lib/auth'
import BasicPage from '../components/page-template'

export default function LoginScreen({ navigation }) {
  const handleLogin = () => {
    login().then(authToken => {
      if (authToken) navigation.replace('HOME', { authToken })
    })
  }

  return (
    <BasicPage>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          textAlign: 'center',
          padding: 32,
          height: '100%'
        }}
      >
        <Text style={styles.headline}>{i18n.t('welcome')}</Text>
        <Text
          style={{
            fontSize: RFValue(16),
            textAlign: 'center',
            color: '#888',
            marginTop: RFValue(12)
          }}
        >
          אנחנו כבר לא יכולים לחכות לראות את הדברים עליהם עבדתם בעונה זו!
        </Text>
        <Button
          mode="contained"
          style={{
            marginTop: RFValue(60),
            padding: 4
          }}
          onPress={handleLogin}
        >
          <Text style={{ fontSize: RFValue(14), color: '#fff', fontFamily: 'Heebo_700Bold' }}>
            {i18n.t('login')}
          </Text>
        </Button>
      </View>
    </BasicPage>
  )
}

const styles = {
  headline: {
    fontSize: RFValue(24),
    fontFamily: 'Heebo_900Black',
    textAlign: 'center'
  }
}
