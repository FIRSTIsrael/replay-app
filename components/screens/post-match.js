import React from 'react'
import { Image, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import PageTemplate from '../ui/page-template'
import i18n from '../../lib/i18n'
import useOrientation from '../../lib/use-orientation'
import ConfettiIcon from '../../assets/images/confetti.png'

export default function PostMatchScreen({ navigation, route: { params } }) {
  useOrientation('PORTRAIT')
  const { teamAtEvent, match } = params

  return (
    <PageTemplate>
      <View style={styles.container}>
        <Image style={styles.icon} source={ConfettiIcon} />
        <Text style={styles.headline}>{i18n.t('post_match.title', { match: match.name })}</Text>
        <Button
          mode="contained"
          style={{ marginTop: RFValue(36), paddingHorizontal: RFValue(18) }}
          onPress={() => navigation.pop()}
        >
          <Text style={{ fontSize: RFValue(14), color: '#fff', fontFamily: 'Heebo_700Bold' }}>
            {i18n.t('close')}
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
    alignItems: 'center',
    textAlign: 'center',
    padding: 32,
    height: '100%'
  },
  icon: {
    height: RFValue(80),
    resizeMode: 'contain',
    marginBottom: RFValue(54)
  },
  headline: {
    fontSize: RFValue(24),
    lineHeight: RFValue(32),
    textAlign: 'center'
  }
}
