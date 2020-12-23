import React, { Component } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'

import { TEAM_JSON } from '../config'

export default class QrAuthentication extends Component {

  constructor(props) {
    super(props)

    this.state = {
      hasPermission: null,
      scanned: false
    }
  }

  componentDidMount() {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      this.setState({ hasPermission: (status === 'granted') })
    })()
  }

  handleBarCodeRead({ data }) {
    this.setState({ scanned: true })
    const teamData = this.validate(data)
    if (teamData) {
      this.props.navigation.navigate('PRE_INST', { team: JSON.parse(data) })
    }
  }

  validate(rawData) {
    try {
      const data = JSON.parse(rawData)
      return TEAM_JSON.REQUIRED_FIELDS.every(field => data.hasOwnProperty(field))
    } catch (e) {
      return false
    }
  }

  render() {
    if (this.state.hasPermission === null) {
      return <View />
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.state.scanned ? undefined : (qr) => this.handleBarCodeRead(qr)}
          style={styles.camera}
        />
      </View>
    )
  }
}

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    display: 'flex'
  },
  camera: {
    height: '100%',
    width: '100%'
  },
  button: {

  },
  instruction: {

  }
}
