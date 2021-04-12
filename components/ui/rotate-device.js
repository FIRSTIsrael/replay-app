import React from 'react'
import { Image, View } from 'react-native'
import { Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import { useLocalization } from '../../lib/i18n'
import RotateIcon from '../../assets/images/rotate.png'

export default function RotateDevice() {
  const { t } = useLocalization()
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={RotateIcon} />
      <Text style={styles.title}>{t('rotate_phone.title')}</Text>
      <Text style={styles.helper}>
        {t(Platform.OS === 'ios' ? 'rotate_phone.helper_ios' : 'rotate_phone.helper_android')}
      </Text>
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
    height: 250,
    resizeMode: 'contain'
  },
  title: {
    marginTop: RFValue(12),
    fontSize: RFValue(16),
    fontFamily: 'Heebo_500Medium',
    textAlign: 'center'
  },
  helper: {
    color: '#666',
    marginTop: RFValue(2),
    fontSize: RFValue(14),
    textAlign: 'center'
  }
}
