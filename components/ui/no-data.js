import React from 'react'
import { Image, View } from 'react-native'
import { Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import { useLocalization } from '../../lib/i18n'
import NoDataIcon from '../../assets/images/no-data.png'

export default function NoData({ title, text }) {
  const { t } = useLocalization()
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={NoDataIcon} />
      <Text style={styles.title}>{title || t('no_data.title')}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
    width: '100%'
  },
  icon: {
    width: '100%',
    height: 100,
    resizeMode: 'contain'
  },
  title: {
    marginTop: RFValue(16),
    fontSize: RFValue(18),
    fontFamily: 'Heebo_700Bold',
    textAlign: 'center'
  },
  text: {
    color: '#666',
    marginTop: RFValue(4),
    marginBottom: RFValue(16),
    fontSize: RFValue(16),
    textAlign: 'center'
  }
}
