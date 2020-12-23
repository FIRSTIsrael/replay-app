import React from 'react'
import { View, Text, Button, Image, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { HEB } from '../config'

const LOGO = require('../assets/images/logo.svg')

export default function ThankyouScreen({ navigation }) {
  return (<View style={styles.page}>
  	<Text style={styles.message}>{HEB.THAKN_YOU}</Text>
  	<Image source={LOGO} style={styles.logo}/>
    <View style={styles.button}>
  	  <Button title={HEB.SHOOT_ANOTHER} onPress={() => navigation.navigate('PRE_INST')}></Button>
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
  },
  logo: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').height / 2,
    resizeMode: 'contain'
  }
}