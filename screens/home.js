import React, { useEffect, useState } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { Text, List, ActivityIndicator } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import PageTemplate from '../components/page-template'
import i18n from '../lib/i18n'
import Backend from '../lib/backend'
import TeamItem from '../components/team-item'
import { getUserGivenName } from '../lib/auth'

export default function HomeScreen({ route, navigation }) {
  const { authToken } = route.params
  const [events, setEvents] = useState(null)

  useEffect(() => {
    Backend.fetchTeams(route.params.authToken).then(teams => {
      const events = teams.reduce((obj, team) => {
        if (!obj[team.event.name]) obj[team.event.name] = []
        obj[team.event.name].push(team)
        return obj
      }, {})
      setEvents(events)
    })
  }, [])

  const width = Dimensions.get('window').width

  const handleTeamSelect = item => navigation.navigate('PRE_INST', { item, authToken })

  return (
    <PageTemplate>
      {!events ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.user}>
              {i18n.t('hello_user', { name: getUserGivenName(authToken) })}
            </Text>
          </View>
          <ScrollView style={{ width }}>
            {Object.entries(events).map(([eventName, items]) => (
              <View key={eventName}>
                <List.Subheader>{eventName}</List.Subheader>
                {items.map(item => (
                  <TeamItem key={item.id} item={item} onPress={() => handleTeamSelect(item)} />
                ))}
              </View>
            ))}
          </ScrollView>
        </>
      )}
    </PageTemplate>
  )
}

const styles = {
  loading: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: '#fff',
    borderBottomColor: '#eaeaea',
    borderBottomWidth: 1,
    width: '100%'
  },
  user: {
    fontSize: RFValue(24),
    fontFamily: 'Heebo_700Bold',
    textAlign: 'center',
    paddingTop: RFValue(24),
    paddingBottom: RFValue(24)
  }
}
