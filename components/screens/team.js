import React, { useEffect, useState } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import { Text, ActivityIndicator, Card } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import PageTemplate from '../ui/page-template'
import MatchItem from '../ui/match-item'
import i18n from '../../lib/i18n'
import Backend from '../../lib/backend'
import moment from '../../lib/moment'
import useOrientation from '../../lib/use-orientation'
import useScreenSize from '../../lib/use-screen-size'

export default function HomeScreen({ route, navigation }) {
  useOrientation('PORTRAIT')
  const screenSize = useScreenSize()
  const { authToken, teamAtEventId } = route.params
  const [teamAtEvent, setTeamAtEvent] = useState(null)

  useEffect(() => {
    Backend.fetchTeamData(authToken, teamAtEventId).then(teamAtEvent => {
      setTeamAtEvent(teamAtEvent)
    })
  }, [])

  const handleMatchSelect = match =>
    navigation.navigate('PRE_INST', { teamAtEvent, match, authToken })

  return (
    <PageTemplate>
      {!teamAtEvent ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.team_number}>{i18n.t('team_name', teamAtEvent.team)}</Text>
            <Text style={styles.event_name}>{teamAtEvent.event.name}</Text>
          </View>
          <ScrollView style={{ width: screenSize.width }}>
            {teamAtEvent.config.stages.map(stage => {
              const matches = teamAtEvent.matches.filter(m => m.stage === stage.id)
              if (matches.length === 0) return <View key={stage.id} />

              return (
                <Card key={stage.id} style={styles.stage.card}>
                  <Text style={styles.stage.title}>{stage.title}</Text>
                  {stage.description && (
                    <Text style={styles.stage.description}>{stage.description}</Text>
                  )}
                  {stage.deadline && (
                    <Text style={styles.stage.deadline}>
                      {i18n.t('deadline', {
                        date: moment(stage.deadline).format(i18n.t('datetime_formats.short'))
                      })}
                    </Text>
                  )}
                  {matches.map(match => (
                    <MatchItem
                      key={match.id}
                      match={match}
                      onPress={() => handleMatchSelect(match)}
                    />
                  ))}
                </Card>
              )
            })}
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
  team_number: {
    fontSize: RFValue(24),
    fontFamily: 'Heebo_700Bold',
    textAlign: 'center',
    paddingTop: RFValue(24),
    paddingBottom: RFValue(2)
  },
  event_name: {
    fontSize: RFValue(16),
    fontFamily: 'Heebo_300Light',
    textAlign: 'center',
    paddingTop: RFValue(0),
    paddingBottom: RFValue(24)
  },
  stage: {
    card: {
      marginTop: RFValue(4),
      marginBottom: RFValue(4),
      marginLeft: RFValue(16),
      marginRight: RFValue(16)
    },
    title: {
      fontSize: RFValue(14),
      fontFamily: 'Heebo_500Medium',
      marginTop: RFValue(16),
      marginBottom: RFValue(4),
      marginLeft: RFValue(16),
      marginRight: RFValue(16)
    },
    description: {
      fontSize: RFValue(12),
      fontFamily: 'Heebo_300Light',
      marginBottom: RFValue(4),
      marginLeft: RFValue(16),
      marginRight: RFValue(16)
    },
    deadline: {
      fontSize: RFValue(12),
      marginBottom: RFValue(8),
      marginLeft: RFValue(16),
      marginRight: RFValue(16)
    }
  }
}
