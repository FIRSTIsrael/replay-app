import React from 'react'
import { Image, View } from 'react-native'
import { Appbar, IconButton } from 'react-native-paper'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

import HelpMenu from './help-menu'
import FIRSTLogo from '../../assets/images/FIRST-logo.png'
import TechnionLogo from '../../assets/images/technion-logo.png'

export default function Header(props) {
  return (
    <Appbar.Header style={{ backgroundColor: '#003c66' }}>
      <View style={styles.header}>
        {props.onBack && (
          <IconButton
            icon={props => <Feather name="chevron-right" {...props} />}
            color="#fff"
            onPress={props.onBack}
          />
        )}
        <View style={{ paddingHorizontal: RFValue(props.onBack ? 0 : 12), ...styles.logos }}>
          <Image style={styles.image} source={FIRSTLogo} />
          <Image style={styles.image} source={TechnionLogo} />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: RFValue(4)
  },
  logos: {
    flexDirection: 'row'
  },
  image: {
    height: 30,
    width: 100,
    resizeMode: 'contain',
    marginRight: 4,
    marginLeft: 4
  }
}
