import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, View } from 'react-native'
import * as ScreenOrientation from 'expo-screen-orientation'
import { RFValue } from 'react-native-responsive-fontsize'
import { Button, Text } from 'react-native-paper'

import PageTemplate from '../components/page-template'
import i18n from '../lib/i18n'
import RotateDevice from '../components/rotate-device'

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
      <PageTemplate>
        <RotateDevice />
      </PageTemplate>
    )
  }

  return (
    <PageTemplate hideHeader>
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
    </PageTemplate>
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
  }
}
