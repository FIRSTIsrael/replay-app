import React from 'react'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { openSettings } from 'expo-linking'
import { RFValue } from 'react-native-responsive-fontsize'

import { useLocalization } from '../../lib/i18n'
import FIRST from './FIRST'

const PermissionRequired = ({ androidText, iosText }) => {
  const { t } = useLocalization()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('permissions.permission_required')}</Text>
      <Text style={styles.text}>
        <FIRST italicFont="Roboto_400Regular_Italic">
          {t(Platform.OS === 'ios' ? iosText : androidText)}
        </FIRST>
      </Text>
      <Button
        onPress={openSettings}
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        {t('permissions.settings')}
      </Button>
    </View>
  )
}

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Heebo_700Bold',
    fontWeight: '700',
    fontSize: RFValue(32)
  },
  text: {
    fontWeight: 'bold',
    maxWidth: '60%',
    fontSize: RFValue(18),
    textAlign: 'center',
    marginTop: 16,
    color: '#666'
  },
  button: {
    paddingHorizontal: 12,
    marginTop: RFValue(32)
  },
  buttonLabel: {
    fontSize: 20,
    fontFamily: 'Heebo_700Bold'
  }
}

export default PermissionRequired
