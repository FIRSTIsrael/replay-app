import React from 'react'
import { View } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Button, Text } from 'react-native-paper'

import PageTemplate from '../ui/page-template'
import RotateDevice from '../ui/rotate-device'
import { useLocalization } from '../../lib/i18n'
import useOrientation from '../../lib/use-orientation'
import FIRST from '../ui/FIRST'

export default function PreMatchScreen({ navigation, route }) {
  const isOrientated = useOrientation('LANDSCAPE')
  const { t } = useLocalization()
  const { teamAtEvent, match } = route.params
  const { team, event } = route.params.teamAtEvent

  const handleStart = () => navigation.replace('MATCH', route.params)
  const handleExit = () => navigation.pop()

  if (!isOrientated) {
    return (
      <PageTemplate onBack={() => navigation.pop()}>
        <RotateDevice />
      </PageTemplate>
    )
  }

  return (
    <PageTemplate hideHeader>
      <View style={styles.container}>
        <Text style={styles.title}>
          <FIRST>{t('pre_match.title', { match_name: match.name })}</FIRST>
        </Text>
        <Text style={styles.description}>
          <FIRST>
            {t('pre_match.description', {
              team: team.number,
              event: event.name,
              match: match.name
            })}
          </FIRST>
        </Text>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Button mode="contained" style={styles.actionButton} onPress={handleStart}>
            <Text style={{ fontSize: RFValue(16), color: '#fff', fontFamily: 'Heebo_700Bold' }}>
              {t('pre_match.start')}
            </Text>
          </Button>
          <Button
            mode="text"
            style={{ ...styles.actionButton, ...styles.exitButton }}
            onPress={handleExit}
          >
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Heebo_500Medium' }}>
              {t('pre_match.exit')}
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
