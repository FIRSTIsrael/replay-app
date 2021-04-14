import React from 'react'
import { Image, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import PageTemplate from '../ui/page-template'
import FIRST from '../ui/FIRST'
import { useLocalization } from '../../lib/i18n'
import ErrorIcon from '../../assets/images/error.png'

export default function Error({
  errorCode,
  errorDescription,
  onRetry,
  onClose,
  usePageTemplate = true
}) {
  const { t } = useLocalization()
  return (
    <PageTemplate hideHeader={!usePageTemplate}>
      <View style={styles.container}>
        <Image style={styles.icon} source={ErrorIcon} />
        <Text style={styles.headline}>{t('errors.title')}</Text>
        <Text style={styles.description}>
          <FIRST>{errorDescription || t('errors.failed_connect')}</FIRST>
        </Text>
        {errorCode && (
          <Text style={styles.error_code}>
            #{String(errorCode).replace(/\ |\-/g, '_').toUpperCase()}
          </Text>
        )}
        {onRetry ? (
          <Button mode="contained" style={styles.button.wrapper} onPress={onRetry}>
            <Text style={styles.button.text}>{t('errors.retry')}</Text>
          </Button>
        ) : onClose ? (
          <Button mode="contained" style={styles.button.wrapper} onPress={onClose}>
            <Text style={styles.button.text}>{t('errors.close')}</Text>
          </Button>
        ) : null}
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
    height: RFValue(64),
    resizeMode: 'contain',
    marginBottom: RFValue(24)
  },
  headline: {
    fontFamily: 'Heebo_900Black',
    fontSize: RFValue(20),
    textAlign: 'center'
  },
  description: {
    color: '#666',
    fontSize: RFValue(16),
    textAlign: 'center'
  },
  error_code: {
    fontFamily: 'Heebo_300Light',
    fontSize: RFValue(12),
    marginTop: RFValue(6),
    textAlign: 'center'
  },
  button: {
    wrapper: {
      marginTop: RFValue(36),
      paddingHorizontal: RFValue(18)
    },
    text: {
      fontSize: RFValue(14),
      color: '#fff',
      fontFamily: 'Heebo_500Medium'
    }
  }
}
