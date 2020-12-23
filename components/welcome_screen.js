import React from 'react'
import { View, Text, Button, Image, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgFromXml } from 'react-native-svg'

import { HEB } from '../config'
import logo from '../assets/images/logo.svg'

export default function WelcomeScreen({ navigation }) {
  return (<View style={styles.page}>
  	<Text style={styles.message}>{HEB.WELCOME}</Text>
  	<SvgFromXml xml={logo} width='50%' height='40%' fill='#000'/>
    <View style={styles.button}>
  	  <Button title={HEB.LOGIN} onPress={() => navigation.navigate('QR')}></Button>
    </View>
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
  }
}