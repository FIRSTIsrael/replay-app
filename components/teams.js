import React, { Component } from 'react'
import { Dimensions, AsyncStorage, View, Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import BasicPage from './basic_page'
import i18n from '../logic/i18n'
import Dashboard from '../logic/dashboard'

export default class Teams extends Component {
  constructor(props) {
    super(props)  

    this.state = { teams: null }
  }

  componentDidMount () {
    Dashboard.loadTeams(this.props.route.params.authId).then(teams => {
      this.setState({ teams })
    })
  }

  renderTeam (team) {
    return <View><Text>{team.number}</Text></View>
  }

  render () {
    if (!this.state.teams) {
      return <View><Text>Loading</Text></View>
    }
    return <View>
     {this.state.teams.map(team => this.renderTeam(team))}
    </View>
  }
}

const styles = {
  teamname: {
    fontSize: RFValue(36),
  }
}