import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, Image, View } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { RFValue } from 'react-native-responsive-fontsize'
import { Button, Text } from 'react-native-paper'

import BasicPage from '../components/page-template'
import i18n from '../lib/i18n'
import RotateIcon from '../assets/images/rotate.png'

export default function PreInstructorScreen({ navigation, route }) {
  const [isLandscape, setLandscape] = useState(true)
  const { team, event } = route.params.item

  const checkLandscape = useCallback(() => {
    setLandscape(Dimensions.get('window').width > Dimensions.get('window').height)
  }, [])

  useEffect(() => {
    checkLandscape()
    Dimensions.addEventListener('change', checkLandscape)

    // Try force landscape
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(() => {})

    return () => {
      Dimensions.removeEventListener('change', checkLandscape)
      ScreenOrientation.unlockAsync().catch(() => {})
    }
  }, [checkLandscape])

  const handleStart = () => navigation.navigate('INST', { item: route.params.item })
  const handleExit = () => navigation.pop()

  if (!isLandscape) {
    return (
      <BasicPage>
        <View style={{ flex: 1, justifyContent: 'center', padding: 32, width: '100%' }}>
          <Image style={styles.rotateIcon} source={RotateIcon} />
          <Text style={styles.rotateTitle}>{i18n.t('rotate_phone.title')}</Text>
          <Text style={styles.rotateHelper}>
            {i18n.t(
              Platform.OS === 'ios' ? 'rotate_phone.helper_ios' : 'rotate_phone.helper_android'
            )}
          </Text>
        </View>
      </BasicPage>
    )
  }

  return (
    <BasicPage hideHeader>
      <View style={styles.container}>
        <Text style={styles.title}>
          {i18n.t('pre_instructor.welcome_team', { number: team.number })}
        </Text>
        <Text style={styles.description}>
          {i18n.t('pre_instructor.description', { event: event.name })}
        </Text>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button mode="contained" style={styles.actionButton} onPress={handleStart}>
            <Text style={{ fontSize: RFValue(16), color: '#fff', fontFamily: 'Heebo_700Bold' }}>
              {i18n.t('pre_instructor.start')}
            </Text>
          </Button>
          <Button
            mode="text"
            style={{ ...styles.actionButton, ...styles.exitButton }}
            onPress={handleExit}
          >
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Heebo_500Medium' }}>
              {i18n.t('pre_instructor.exit')}
            </Text>
          </Button>
        </View>
      </View>
    </BasicPage>
  )
}

const styles = {
  container: {
    padding: RFValue(24)
  },
  title: {
    fontSize: RFValue(24),
    fontFamily: 'Heebo_700Bold'
  },
  description: {
    fontSize: RFValue(16)
  },
  actionButton: {
    alignSelf: 'center',
    paddingVertical: 2,
    paddingHorizontal: 12
  },
  exitButton: {
    marginTop: 4
  },
  rotateIcon: {
    width: '100%',
    height: 250,
    resizeMode: 'contain'
  },
  rotateTitle: {
    marginTop: RFValue(12),
    fontSize: RFValue(16),
    fontFamily: 'Heebo_500Medium',
    textAlign: 'center'
  },
  rotateHelper: {
    color: '#666',
    marginTop: RFValue(2),
    fontSize: RFValue(14),
    textAlign: 'center'
  }
}
