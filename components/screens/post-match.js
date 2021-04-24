import React, { useEffect } from 'react'
import { Image, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import * as Linking from 'expo-linking'

import PageTemplate from '../ui/page-template'
import FIRST from '../ui/FIRST'
import { useLocalization } from '../../lib/i18n'
import useOrientation from '../../lib/use-orientation'
import ConfettiEmoji from '../../assets/images/confetti-emoji.png'
import StarEmoji from '../../assets/images/star-emoji.png'
import Backend from '../../lib/backend'

export default function PostMatchScreen({ navigation, route: { params } }) {
  useOrientation('PORTRAIT')
  const { t } = useLocalization()
  const { teamAtEvent, match } = params
  const remoteEventHubUrl = teamAtEvent.config.remote_event_hub

  useEffect(() => {
    Backend.sendStats(params.authToken, teamAtEvent.id, 'POSTING_MATCH')
  }, [])

  return (
    <PageTemplate onBack={() => navigation.pop()}>
      <View style={styles.container}>
        {remoteEventHubUrl ? (
          <>
            <Image style={styles.small_icon} source={StarEmoji} />
            <Text style={styles.headline}>כמעט סיימנו!</Text>
            <Text style={styles.body_text}>
              <FIRST>
                השלמתם את צילום המקצה, כעת נותר להעלות את הסרטון למערכת התחרות, FIRST Remote Event
                Hub. ההנחיות המלאות נמצאות באתר FIRST.
              </FIRST>
            </Text>
            <Button
              mode="contained"
              style={{ marginTop: RFValue(36) }}
              onPress={() => {
                Backend.sendStats(params.authToken, teamAtEvent.id, 'REH_CLICK')
                Linking.openURL(remoteEventHubUrl)
              }}
            >
              <Text
                style={{
                  fontSize: RFValue(14),
                  color: '#fff',
                  fontFamily: 'Heebo_500Medium',
                  textTransform: 'none'
                }}
              >
                מעבר ל-Remote Event Hub
              </Text>
            </Button>
            <Button
              mode="outlined"
              style={{ marginTop: RFValue(12) }}
              onPress={() => navigation.pop()}
            >
              סיום המקצה
            </Button>
          </>
        ) : (
          <>
            <Image style={styles.icon} source={ConfettiEmoji} />
            <Text style={styles.headline}>{t('post_match.title', { match: match.name })}</Text>
            <Button
              mode="contained"
              style={{ marginTop: RFValue(36), paddingHorizontal: RFValue(18) }}
              onPress={() => navigation.pop()}
            >
              <Text style={{ fontSize: RFValue(14), color: '#fff', fontFamily: 'Heebo_500Medium' }}>
                {t('close')}
              </Text>
            </Button>
          </>
        )}
      </View>
    </PageTemplate>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 32,
    height: '100%'
  },
  icon: {
    height: RFValue(72),
    resizeMode: 'contain',
    marginBottom: RFValue(36)
  },
  small_icon: {
    height: RFValue(56),
    resizeMode: 'contain',
    marginBottom: RFValue(16)
  },
  headline: {
    fontFamily: 'Heebo_700Bold',
    fontSize: RFValue(22),
    textAlign: 'center'
  },
  body_text: {
    color: '#333',
    fontSize: RFValue(14),
    textAlign: 'center',
    marginTop: RFValue(16)
  }
}
