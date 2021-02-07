import React, { Component } from 'react'
import { Dimensions, View, Text, TouchableOpacity, ScrollView, Button } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Surface, Avatar } from 'react-native-paper'

import BasicPage from './basic_page'
import i18n from '../logic/i18n'
import Dashboard from '../logic/dashboard'

import FLL from '../assets/images/fll.png'
import FTC from '../assets/images/ftc.png'

const IMAGES = {
  'FIRST LEGO League Challenge': FLL,
  'FIRST Tech Challenge': FTC
}

export default class Teams extends Component {
  constructor(props) {
    super(props)

    this.state = { teams: null, selection: null }
  }

  componentDidMount() {
    Dashboard.loadTeams(this.props.route.params.authId).then(teams => {
      this.setState({ teams })
    })
  }

  next() {
    const team = this.state.teams.find(t => t.number === this.state.selection)
    this.props.navigation.navigate('PRE_INST', { team, authId: this.props.route.params.authId })
  }

  renderTeam(team) {
    const style = Object.assign({}, styles.team)
    if (this.state.selection === team.number) {
      Object.assign(style, styles.selectedTeam)
    }
    return (
      <TouchableOpacity key={team.number} onPress={() => this.setState({ selection: team.number })}>
        <Surface style={style}>
          <Avatar.Image style={styles.avatar} size={RFValue(50)} source={IMAGES[team.program]} />
          <View>
            <Text style={styles.teamNumber}>{team.number}</Text>
            <Text style={styles.meta}>
              {team.affiliation}, {team.city}
            </Text>
          </View>
        </Surface>
      </TouchableOpacity>
    )
  }

  render() {
    if (!this.state.teams) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      )
    }
    return (
      <BasicPage
        button={{
          text: i18n.t('next'),
          onPress: async () => {
            this.next()
          }
        }}
      >
        <ScrollView style={styles.teams}>
          {this.state.teams.map(team => this.renderTeam(team))}
        </ScrollView>
      </BasicPage>
    )
  }
}

const styles = {
  teams: {
    width: '100%',
    height: '80%',
    padding: '5%'
  },
  team: {
    height: RFValue(50),
    width: '98%',
    marginTop: '1%',
    marginRight: '1%',
    fontSize: RFValue(36),
    marginBottom: RFValue(18),
    elevation: 4,
    borderRadius: RFValue(5),
    display: 'flex',
    flexDirection: 'row-reverse'
  },
  selectedTeam: {
    backgroundColor: 'lightgray'
  },
  avatar: {
    float: 'right',
    backgroundColor: 'white',
    marginLeft: RFValue(5)
  },
  teamNumber: {
    direction: 'rtl',
    textAlign: 'right',
    fontWeight: 'bold'
  },
  meta: {
    direction: 'rtl',
    textAlign: 'right',
    color: 'gray'
  }
}
