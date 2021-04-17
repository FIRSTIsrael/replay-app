import React from 'react'
import { Image, View, ScrollView } from 'react-native'
import { Text, List, ActivityIndicator } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'

import PageTemplate from '../ui/page-template'
import TeamItem from '../ui/team-item'
import { useLocalization } from '../../lib/i18n'
import Backend from '../../lib/backend'
import { getUserGivenName } from '../../lib/auth'
import moment from '../../lib/moment'
import useOrientation from '../../lib/use-orientation'
import useScreenSize from '../../lib/use-screen-size'
import Error from '../ui/error'
import NoData from '../ui/no-data'
import { useAsync } from '../../lib/use-async'

export default function HomeScreen({ route, navigation }) {
  useOrientation('PORTRAIT')
  const { t } = useLocalization()
  const screenSize = useScreenSize()
  const { authToken } = route.params
  const teams = useAsync(() =>
    Backend.fetchTeams(authToken).then(list => {
      list.sort((a, b) => moment(a.event.start_date).unix - moment(b.event.start_date).unix)
      return list
    })
  )

  const handleTeamSelect = teamAtEvent =>
    navigation.navigate('TEAM', { teamAtEventId: teamAtEvent.id, authToken })

  return (
    <PageTemplate showMenu={true} route={route} navigation={navigation}>
      {teams.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : teams.error ? (
        <Error errorCode={teams.error} onRetry={teams.reload} usePageTemplate={false} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.user}>
              {t('hello_user', { name: getUserGivenName(authToken) })}
            </Text>
          </View>

          {teams.data.length > 0 ? (
            <ScrollView style={{ width: screenSize.width }}>
              <List.Subheader>{t('select_team')}</List.Subheader>
              {teams.data.map(teamAtEvent => (
                <TeamItem
                  key={teamAtEvent.id}
                  teamAtEvent={teamAtEvent}
                  onPress={() => handleTeamSelect(teamAtEvent)}
                />
              ))}
            </ScrollView>
          ) : (
            <NoData text={t('no_data.teams')} />
          )}
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
