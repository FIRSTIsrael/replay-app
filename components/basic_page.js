import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgFromXml } from 'react-native-svg'
import * as ScreenOrientation from 'expo-screen-orientation'

import logo from '../assets/images/logo.svg'

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
    let styles = Object.assign({}, portraitStyles)
    const pageStyle = Object.assign({}, styles.page, { height: Dimensions.get('window').height, width: Dimensions.get('window').width })
    return (<View style={pageStyle}>
      {messages.map(({ text, style }, index) => <Text key={index} style={Object.assign({}, styles.message, style)}>{text}</Text>)}
      <SvgFromXml xml={logo} width='50%' height='40%' fill='#000'/>
      {buttons.map(({ text, style, onPress, disabled, color }, index) => <View key={index} style={Object.assign({}, styles.button, style || {})}>
        <Button title={text} onPress={onPress} disabled={disabled || false} color={color}></Button>
      </View>)}
      {notices.map((notice, index) => <Text key={index} style={styles.notice}>{notice}</Text>)}
    </View>)
  } else {
    let styles = Object.assign({}, landscapeStyles)
    const pageStyle = Object.assign({}, styles.page, { height: Dimensions.get('window').height, width: Dimensions.get('window').width })
    return (<View style={pageStyle}>
      <SvgFromXml xml={logo} width='50%' height='40%' fill='#000'/>
      <View style={styles.subpage}>
        {messages.map(({ text, style }, index) => <Text key={index} style={Object.assign({}, styles.message, style)}>{text}</Text>)}
        {buttons.map(({ text, style, onPress, disabled, color }, index) => <View key={index} style={Object.assign({}, styles.button, style || {})}>
          <Button title={text} onPress={onPress} disabled={disabled || false} color={color}></Button>
        </View>)}
        {notices.map((notice, index) => <Text key={index} style={styles.notice}>{notice}</Text>)}
      </View>
    </View>)
  }
}

const portraitStyles = {
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

const landscapeStyles = {
  page: {
    position: 'absolute',
    background: 'whitesmoke',
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  subpage: {
    padding: RFValue(20),
    width: '50%',
    height: '80%',
    marginLeft: RFValue(40),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: RFValue(20)
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