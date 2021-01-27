import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgFromXml } from 'react-native-svg'
import * as ScreenOrientation from 'expo-screen-orientation'
import { Appbar, Button } from 'react-native-paper'

import firstLogo from '../assets/images/FIRST-logo.png'
import technionLogo from '../assets/images/technion-logo.png'

export default function BasicPage (props) {
  const calcOrientation = () => (Dimensions.get('window').width < Dimensions.get('window').height ? 'PORTRAIT' : 'LANDSCAPE')

  const [orientation, setOrientation] = useState(calcOrientation())
  useEffect(() => {
    Dimensions.addEventListener('change', () => {
      setOrientation(calcOrientation())
    })
  })
  ScreenOrientation.unlockAsync()

  const messages = (props.messages || (props.message ? [props.message] : []))
    .map(message => ((message.text && message.style) ? message : { text: message, style: {} }))
  
  const buttons = props.buttons || (props.button ? [props.button] : [])

  const notices = props.notices || (props.notice ? [props.notice] : [])

  if (orientation === 'PORTRAIT') {
    const pageStyle = Object.assign({}, styles.page, { height: Dimensions.get('window').height, width: Dimensions.get('window').width })
    return <View style={pageStyle}>
      <Appbar style={styles.header}>
        <Image style={styles.image} source={technionLogo} />
        <Image style={styles.image} source={firstLogo} />
      </Appbar>
      {messages.map(({ text, style }, index) => <Text key={index} style={Object.assign({}, styles.message, style)}>{text}</Text>)}
      {props.children}
      {buttons.map(({ text, style, onPress, disabled, color }, index) => <View key={index} style={Object.assign({}, styles.button, style || {})}>
        <Button mode="contained" compact={true} onPress={onPress} disabled={disabled || false} color={COLORS[color || 'primary']}>{text}</Button>
      </View>)}
      {notices.map((notice, index) => <Text key={index} style={styles.notice}>{notice}</Text>)}
    </View>
  } else {
    const pageStyle = Object.assign({}, styles.page, { height: Dimensions.get('window').height, width: Dimensions.get('window').width })
    return  <View style={pageStyle}>
      <Appbar style={styles.header}>
        <Image style={styles.image} source={technionLogo} />
        <Image style={styles.image} source={firstLogo} />
      </Appbar>
      {props.children}
      {messages.map(({ text, style }, index) => <Text key={index} style={Object.assign({}, styles.message, style)}>{text}</Text>)}
      {buttons.map(({ text, style, onPress, disabled, color }, index) => <View key={index} style={Object.assign({}, styles.button, style || {})}>
        <Button mode="contained" compact={true} onPress={onPress} disabled={disabled || false} color={COLORS[color || 'primary']}>{text}</Button>
      </View>)}
      {notices.map((notice, index) => <Text key={index} style={styles.notice}>{notice}</Text>)}
    </View>
  }
}

const COLORS = {
  black: '#000000',
  primary: '#0b487c'
}

const styles = {
  page: {
    backgroundColor: '#f4f5f7',

    paddingBottom: RFValue(30),

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#0b487c',
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    height: 30,
    width: '50%',
    resizeMode: 'contain'
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