import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import BasicPage from './basic_page'
import i18n from '../logic/i18n'

export default class PreInstructor extends Component {
  constructor(props) {
    super(props)  
    this.state = { orientation: 'PORTRAIT', teamNumber: '...' }  
  }

  componentDidMount() {
    (async () => {
      this.setState({ orientation: this.getOrientation() })
      Dimensions.addEventListener('change', () => this.setState({ orientation: this.getOrientation() }))

      this.setState({ teamNumber: this.props.route.params.team.number })
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
        `${i18n.t('pre_inst')} ${this.state.teamNumber}`
      ]}
      buttons={[
        { text: i18n.t('start'), disabled: this.state.orientation === 'PORTRAIT', onPress: () => this.props.navigation.navigate('INST', { team: this.props.route.params.team }) },
        { text: i18n.t('not_us'), color: 'black', onPress: () => this.props.navigation.navigate('TEAMS') },
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