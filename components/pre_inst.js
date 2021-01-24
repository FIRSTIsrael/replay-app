import React, { Component } from 'react'
import { Dimensions, AsyncStorage } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import BasicPage from './basic_page'
import i18n from '../logic/i18n'

export default class PreInstructor extends Component {
  constructor(props) {
    super(props)  
    this.state = { orientation: 'PORTRAIT', teamNumber: '...', teamName: '...' }  
  }

  componentDidMount() {
    (async () => {
      this.setState({ orientation: this.getOrientation() })
      Dimensions.addEventListener('change', () => this.setState({ orientation: this.getOrientation() }))
      const [[teamNumberKey, teamNumber], [teamNameKey, teamName]] = await AsyncStorage.multiGet(['teamNumber', 'teamName'])
      this.setState({ teamNumber, teamName })
    })()
  }

  getOrientation() {
    if(Dimensions.get('window').width < Dimensions.get('window').height) {
      return 'PORTRAIT'
    } else {
      return 'LANDSCAPE'
    }
  }

  render () {
    return <BasicPage
      messages={[
        `${i18n.t('pre_inst')} ${this.state.teamNumber}`,
        { text: this.state.teamName, style: styles.teamname }
      ]}
      buttons={[
        { text: i18n.t('start'), disabled: this.state.orientation === 'PORTRAIT', onPress: () => this.props.navigation.navigate('INST') },
        { text: i18n.t('not_us'), color: 'black', onPress: () => this.props.navigation.navigate('QR') },
      ]}
      notices={this.state.orientation === 'PORTRAIT' ? [i18n.t('flip')] : []}
      />
  }
}

const styles = {
  teamname: {
    fontSize: RFValue(36),
  }
}