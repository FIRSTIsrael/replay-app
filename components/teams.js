import React, { Component } from 'react'
import { Dimensions, View, Text, TouchableOpacity, Button } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import BasicPage from './basic_page'
import i18n from '../logic/i18n'
import Dashboard from '../logic/dashboard'

export default class Teams extends Component {
  constructor(props) {
    super(props)  

    this.state = { teams: null, selection: null }
  }

  componentDidMount () {
    Dashboard.loadTeams(this.props.route.params.authId).then(teams => {
      this.setState({ teams })
    })
  }

  next () {
    const team = this.state.teams.find(t => t.number === this.state.selection)
    this.props.navigation.navigate('PRE_INST', { team, authId: this.props.route.params.authId })
  }

  renderTeam (team) {
    return <TouchableOpacity key={team.number} onPress={() => this.setState({ selection: team.number })}>
      <View style={(this.state.selection === team.number) ? styles.selectedTeam : styles.team}><Text>{team.number}</Text></View>
    </TouchableOpacity>
  }

  render () {
    if (!this.state.teams) {
      return <View><Text>Loading</Text></View>
    }
    return <View>
     {this.state.teams.map(team => this.renderTeam(team))}
     <Button onPress={() => this.next()} title="Next" />
    </View>
  }
}

const styles = {
  team: {
    height: 50,
    fontSize: RFValue(36),
  }, 
  selectedTeam: {
    height: 50,
    fontSize: RFValue(36),
    backgroundColor: 'blue'
  }
}