import React from 'react'
import { SafeAreaView } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import Header from './header'

export default function PageTemplate({
  children,
  hideHeader,
  showMenu,
  onBack,
  route,
  navigation
}) {
  return (
    <>
      {!hideHeader && (
        <Header showMenu={showMenu} onBack={onBack} route={route} navigation={navigation} />
      )}
      <SafeAreaView style={styles.page}>{children}</SafeAreaView>
    </>
  )
}

const styles = {
  page: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingBottom: RFValue(50),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
