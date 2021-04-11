import React from 'react'
import { Image, View } from 'react-native'
import { Appbar, Menu } from 'react-native-paper'

import HelpMenu from './help-menu'

import FIRSTLogo from '../../assets/images/FIRST-logo.png'
import TechnionLogo from '../../assets/images/technion-logo.png'

export default function Header(props) {
  return (
    <Appbar.Header style={{ backgroundColor: '#0b487c' }}>
      <View style={styles.header}>
        <Image style={styles.image} source={FIRSTLogo} />
        <Image style={styles.image} source={TechnionLogo} />
        {props.showMenu && <HelpMenu setLanguage={props.setLanguage}/>}
      </View>
    </Appbar.Header>
  )
}

const styles = {
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
