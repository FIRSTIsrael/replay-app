import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, SafeAreaView } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import * as ScreenOrientation from 'expo-screen-orientation'
import { Button } from 'react-native-paper'

import Header from './header'

export default function PageTemplate(props) {
  // const calcOrientation = () =>
  //   Dimensions.get('window').width < Dimensions.get('window').height ? 'PORTRAIT' : 'LANDSCAPE'

  // const [orientation, setOrientation] = useState(calcOrientation())
  // useEffect(() => {
  //   Dimensions.addEventListener('change', () => {
  //     setOrientation(calcOrientation())
  //   })
  // })
  // // ScreenOrientation.unlockAsync()

  const messages = (props.messages || (props.message ? [props.message] : [])).map(message =>
    message.text && message.style ? message : { text: message, style: {} }
  )
  const buttons = props.buttons || (props.button ? [props.button] : [])
  const notices = props.notices || (props.notice ? [props.notice] : [])

  return (
    <>
      {!props.hideHeader && <Header />}

      <SafeAreaView style={styles.page}>
        {messages.map(({ text, style }, index) => (
          <Text key={index} style={Object.assign({}, styles.message, style)}>
            {text}
          </Text>
        ))}
        {props.children}
        {buttons.map(({ text, style, onPress, disabled, color }, index) => (
          <View key={index} style={Object.assign({}, styles.button, style || {})}>
            <Button
              mode="contained"
              compact={true}
              onPress={onPress}
              disabled={disabled || false}
              color={COLORS[color || 'primary']}
            >
              {text}
            </Button>
          </View>
        ))}
        {notices.map((notice, index) => (
          <Text key={index} style={styles.notice}>
            {notice}
          </Text>
        ))}
      </SafeAreaView>
    </>
  )
}

const COLORS = {
  black: '#000000',
  primary: '#0b487c'
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
  },
  message: {
    fontWeight: 'bold',
    fontSize: RFValue(24),
    textAlign: 'center',
    marginTop: 24
  },
  button: {
    width: '80%',
    fontWeight: 'bold',
    fontSize: RFValue(24),
    textAlign: 'center',
    marginTop: 24
  },
  notice: {
    fontWeight: 'bold',
    fontSize: RFValue(20),
    textAlign: 'center',
    marginTop: 24,
    color: '#881111'
  }
}
