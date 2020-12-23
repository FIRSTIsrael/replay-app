import React, { Component } from 'react'
import { View, Text, Button, Image, Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { SvgFromXml } from 'react-native-svg'

import { HEB } from '../config'
import logo from '../assets/images/logo.svg'


export default class PreInstructor extends Component {
  constructor(props) {
    super(props);
    this.state = { orientation: 'PORTRAIT' };
  }

  componentDidMount() {
    this.setState({ orientation: this.getOrientation() })
    Dimensions.addEventListener('change',() => this.setState({ orientation: this.getOrientation() }))
  }

  getOrientation() {
    if(Dimensions.get('window').width < Dimensions.get('window').height) {
      return 'PORTRAIT'
    } else {
      return 'LANDSCAPE'
    }
  }

  render () {
    return (<View style={styles.page}>
    	<Text style={styles.message}>{HEB.PRE_INST} {this.props.route.params.team.team.number}</Text>
      <Text style={styles.teamname}>{this.props.route.params.team.team.name}</Text>
      <SvgFromXml xml={logo} width='50%' height='40%' fill='#000'/>
      <View style={styles.button}>
    	  <Button title={HEB.START} disabled={this.state.orientation === 'PORTRAIT'} onPress={() => navigation.navigate('PRE_INST')}></Button>
      </View>
      <View style={styles.button}>
        <Button title={HEB.NOT_US} color='black' onPress={() => navigation.navigate('QR')}></Button>
      </View>
      <Text style={styles.notice}>{this.state.orientation === 'PORTRAIT' ? HEB.FLIP : ''}</Text>
    </View>)
  }
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
  teamname: {
    fontWeight: 'bold',
    fontSize: RFValue(36),
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