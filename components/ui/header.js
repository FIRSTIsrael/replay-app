import React from 'react'
import { Image, View } from 'react-native'
import { Appbar, Menu } from 'react-native-paper'

import HelpMenu from './help-menu'

import FIRSTLogo from '../../assets/images/FIRST-logo.png'
import TechnionLogo from '../../assets/images/technion-logo.png'

export default function Header(props) {
  return (
    <Appbar.Header style={{ backgroundColor: '#003c66' }}>
      <View style={styles.header}>
        <Image style={styles.image} source={FIRSTLogo} />
        <Image style={styles.image} source={TechnionLogo} />
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {props.showMenu && <HelpMenu route={props.route} navigation={props.navigation} />}
        </View>
      </View>
    </Appbar.Header>
  )
}

const styles = {
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingRight: 16,
    paddingLeft: 16
  },
  image: {
    height: 30,
    width: 100,
    resizeMode: 'contain',
    marginRight: 4,
    marginLeft: 4
  }
}
