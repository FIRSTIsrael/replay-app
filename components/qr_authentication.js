import React, { Component } from 'react'
import { View, Text, Dimensions, AsyncStorage } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import { RFValue } from 'react-native-responsive-fontsize'

import { TEAM_JSON } from '../config'
import i18n from '../logic/i18n'

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
      (async () => {
        await AsyncStorage.multiSet([
          ['teamNumber', teamData.team.number],
          ['teamName', teamData.team.name],
          ['teamOrganization', teamData.team.organization],
          ['teamCity', teamData.team.city],
          ['teamVideoUrl', teamData['upload-url']]
        ])
        this.props.navigation.navigate('PRE_INST')
      })()
    }
  }

  validate(rawData) {
    try {
      const data = JSON.parse(rawData)
      if (TEAM_JSON.REQUIRED_FIELDS.every(field => data.hasOwnProperty(field))) {
        return data
      } else {
        return false
      }
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
        <View style={styles.instructionsContainer}>
          <Text style={styles.instruction}>{i18n.t('qr')}</Text>
        </View>
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
  instructionsContainer: {
    width: '100%',
    height: RFValue(48),
    background: 'white'
  },
  instruction: {
    fontWeight: 'bold',
    fontSize: RFValue(24),
    textAlign: 'center',
    marginTop: 24,
    color: 'white'
  }
}
