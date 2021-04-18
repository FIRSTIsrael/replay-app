import React, { useState } from 'react'
import { ImageBackground, SafeAreaView, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { Asset } from 'expo-asset'
import AppLoading from 'expo-app-loading'

import { useLocalization } from '../../lib/i18n'
import FIRST from '../ui/FIRST'
import { login } from '../../lib/auth'
import useOrientation from '../../lib/use-orientation'
import seasonBackground from '../../assets/images/season-background.png'
import Header from '../ui/header'

export default function LoginScreen({ navigation }) {
  useOrientation('PORTRAIT')
  const { t, locale } = useLocalization()
  const [isReady, setReady] = useState(false)

  const handleLoginClick = () => {
    login().then(authToken => {
      if (authToken) navigation.replace('HOME', { authToken })
    })
  }

  if (!isReady) {
    return (
      <AppLoading
        startAsync={() => Asset.fromModule(seasonBackground).downloadAsync()}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    )
  }

  return (
    <ImageBackground
      source={seasonBackground}
      resizeMode="cover"
      style={{ flex: 1, width: null, height: null }}
    >
      <Header />
      <SafeAreaView>
        <View style={styles.container}>
          <Text
            style={{
              fontFamily: locale === 'en' ? 'Roboto_900Black' : 'Heebo_900Black',
              ...styles.headline
            }}
          >
            <FIRST italicFont="Roboto_900Black_Italic">{t('welcome.headline')}</FIRST>
          </Text>
          <Button
            mode="contained"
            style={{ marginTop: RFValue(60), padding: 4, backgroundColor: '#fff' }}
            onPress={handleLoginClick}
          >
            <Text style={{ fontSize: RFValue(14), color: '#000', fontFamily: 'Heebo_700Bold' }}>
              {t('login')}
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = {
  container: {
    padding: 32,
    height: '100%'
  },
  headline: {
    color: '#fff',
    fontSize: RFValue(24),
    lineHeight: RFValue(32),
    textAlign: 'center',
    marginTop: '36%'
  },
  intro: {
    color: '#999',
    fontSize: RFValue(16),
    textAlign: 'center',
    marginTop: RFValue(12)
  }
}
