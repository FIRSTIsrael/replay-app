import React from 'react'
import { View, Text, Button, Image, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgFromXml } from 'react-native-svg'

import logo from '../assets/images/logo.svg'

export default function BasicPage (props) {
  const messages = (props.messages || (props.message ? [props.message] : []))
    .map(message => ((message.text && message.style) ? message : { text: message, style: {} }))
  
  const buttons = props.buttons || (props.button ? [props.button] : [])

  const notices = props.notices || (props.notice ? [props.notice] : [])

  return (<View style={styles.page}>
    {messages.map(({ text, style }) => <Text style={Object.assign({}, styles.message, style)}>{text}</Text>)}
    <SvgFromXml xml={logo} width='50%' height='40%' fill='#000'/>
    {buttons.map(({ text, style, onPress, disabled, color }) => <View style={Object.assign({}, styles.button, style || {})}>
      <Button title={text} onPress={onPress} disabled={disabled || false} color={color}></Button>
    </View>)}
    {notices.map(notice => <Text style={styles.notice}>{notice}</Text>)}
  </View>)
}

const styles = {
  page: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    background: 'whitesmoke',
    display: 'flex',
    justifyContent: 'center',
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