import React, { useEffect, useState } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { Text, List, ActivityIndicator } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import PageTemplate from '../ui/page-template'
import TeamItem from '../ui/team-item'
import i18n from '../../lib/i18n'
import Backend from '../../lib/backend'
import { getUserGivenName } from '../../lib/auth'
import moment from '../../lib/moment'
import useOrientation from '../../lib/use-orientation'
import useScreenSize from '../../lib/use-screen-size'

export default function HomeScreen({ route, navigation }) {
  useOrientation('PORTRAIT')
  const screenSize = useScreenSize()
  const [teams, setTeams] = useState(null)
  const { authToken } = route.params

  useEffect(() => {
    Backend.fetchTeams(authToken).then(teams => {
      teams.sort((a, b) => moment(a.event.start_date).unix - moment(b.event.start_date).unix)
      setTeams(teams)
    })
  }, [])

  const handleTeamSelect = teamAtEvent =>
    navigation.navigate('TEAM', { teamAtEventId: teamAtEvent.id, authToken })

  return (
    <PageTemplate>
      {!teams ? (
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
          <ScrollView style={{ width: screenSize.width }}>
            <List.Subheader>בחרו קבוצה</List.Subheader>
            {teams.map(teamAtEvent => (
              <TeamItem
                key={teamAtEvent.id}
                teamAtEvent={teamAtEvent}
                onPress={() => handleTeamSelect(teamAtEvent)}
              />
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
