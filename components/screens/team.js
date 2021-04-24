import React, { useCallback, useState } from 'react'
import { View, ScrollView, Dimensions } from 'react-native'
import {
  Text,
  ActivityIndicator,
  Card,
  List,
  Portal,
  Dialog,
  Paragraph,
  Button
} from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useFocusEffect } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import * as Linking from 'expo-linking'

import PageTemplate from '../ui/page-template'
import MatchItem from '../ui/match-item'
import { useLocalization } from '../../lib/i18n'
import Backend from '../../lib/backend'
import moment from '../../lib/moment'
import useOrientation from '../../lib/use-orientation'
import useScreenSize from '../../lib/use-screen-size'
import { useAsync } from '../../lib/use-async'
import Error from '../ui/error'
import FIRST from '../ui/FIRST'
import config from '../../config'
import NoData from '../ui/no-data'

export default function HomeScreen({ route, navigation }) {
  useOrientation('PORTRAIT')
  const { t, locale } = useLocalization()
  const screenSize = useScreenSize()
  const { authToken, teamAtEventId } = route.params
  const [overwriteMatch, setOverwriteMatch] = useState(null)
  const [stageDeadlineError, setStageDeadlineError] = useState(null)
  const teamAtEvent = useAsync(() => Backend.fetchTeamData(authToken, teamAtEventId))

  useFocusEffect(
    useCallback(() => {
      if (!teamAtEvent.isLoading) {
        teamAtEvent.reload()
      }
    }, [])
  )

  const startMatch = match =>
    navigation.navigate('PRE_MATCH', { teamAtEvent: teamAtEvent.data, match, authToken })

  const handleMatchSelect = (match, stage) => {
    if (
      stage?.deadline &&
      moment().tz(config.timezone).isAfter(moment(stage.deadline).tz(config.timezone))
    ) {
      setStageDeadlineError(stage)
    } else if (match.status === 'SUBMITTED') {
      setOverwriteMatch(match)
    } else {
      startMatch(match)
    }
  }

  return (
    <PageTemplate onBack={() => navigation.pop()}>
      {teamAtEvent.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : teamAtEvent.error ? (
        <Error errorCode={teamAtEvent.error} onRetry={teamAtEvent.reload} usePageTemplate={false} />
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.team_number}>{t('team_name', teamAtEvent.data.team)}</Text>
            <Text style={styles.event_name}>{teamAtEvent.data.event.name}</Text>
          </View>
          {teamAtEvent.data.matches.length > 0 || true ? (
            <ScrollView style={{ width: screenSize.width }}>
              <Card style={styles.card}>
                {teamAtEvent.data.config.remote_event_hub && (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(teamAtEvent.data.config.remote_event_hub)}
                  >
                    <List.Item
                      title={<FIRST>{t('team_page.open_remote_event_hub.title')}</FIRST>}
                      description={
                        <FIRST>{t('team_page.open_remote_event_hub.description')}</FIRST>
                      }
                      left={props => <List.Icon {...props} icon="view-dashboard-outline" />}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL('https://www.surveymonkey.com/r/nonmedicalincidentreport')
                  }
                >
                  <List.Item
                    title={<FIRST>{t('team_page.report_concern')}</FIRST>}
                    left={props => <List.Icon {...props} icon="progress-alert" />}
                  />
                </TouchableOpacity>
                {teamAtEvent.data.config.judging_complaint && (
                  <TouchableOpacity
                    onPress={() => Linking.openURL(teamAtEvent.data.config.judging_complaint)}
                  >
                    <List.Item
                      title={<FIRST>{t('team_page.judging_complaint')}</FIRST>}
                      left={props => <List.Icon {...props} icon="comment-alert-outline" />}
                    />
                  </TouchableOpacity>
                )}
              </Card>

              {teamAtEvent.data.config.use_reh_matches && (
                <Button
                  style={styles.start_match.wrapper}
                  labelStyle={styles.start_match.label}
                  mode="contained"
                  icon={props => (
                    <Feather {...props} name="camera" size={styles.start_match.label.fontSize} />
                  )}
                  onPress={() => startMatch({ id: 'match', name: 'מקצה זירה' })}
                >
                  צילום מקצה
                </Button>
              )}

              {(teamAtEvent.data.config.stages || []).map(stage => {
                const matches = teamAtEvent.data.matches.filter(m => m.stage === stage.id)
                if (matches.length === 0) return <View key={stage.id} />

                return (
                  <Card key={stage.id} style={styles.card}>
                    <Text style={styles.stage.title}>{stage.title}</Text>
                    {stage.description && (
                      <Text style={styles.stage.description}>{stage.description}</Text>
                    )}
                    {stage.deadline && (
                      <Text style={styles.stage.deadline}>
                        {t('deadline.date', {
                          date: moment(stage.deadline)
                            .tz(config.timezone)
                            .locale(locale)
                            .format(t('datetime_formats.short'))
                        })}
                      </Text>
                    )}
                    {matches.map(match => (
                      <MatchItem
                        key={match.id}
                        match={match}
                        onPress={() => handleMatchSelect(match, stage)}
                      />
                    ))}
                  </Card>
                )
              })}
            </ScrollView>
          ) : (
            <NoData text={t('no_data.matches')} />
          )}
          <Portal>
            <Dialog visible={overwriteMatch !== null} onDismiss={() => setOverwriteMatch(null)}>
              <Dialog.Title>
                {t('overwrite_warning.title', { match: overwriteMatch?.name || '' })}
              </Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  {t('overwrite_warning.description', { match: overwriteMatch?.name || '' })}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setOverwriteMatch(null)} color="#333">
                  {t('overwrite_warning.cancel')}
                </Button>
                <Button
                  onPress={() => {
                    startMatch(overwriteMatch)
                    setOverwriteMatch(null)
                  }}
                >
                  {t('overwrite_warning.overwrite')}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <Portal>
            <Dialog
              visible={stageDeadlineError !== null}
              onDismiss={() => setStageDeadlineError(null)}
            >
              <Dialog.Title>{t('deadline.title')}</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  {t('deadline.description', { stage: stageDeadlineError?.title || '' })}
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => setStageDeadlineError(null)}>{t('deadline.close')}</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
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
    width: '100%',
    marginBottom: RFValue(8)
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
  card: {
    marginVertical: RFValue(4),
    marginHorizontal: RFValue(16)
  },
  start_match: {
    wrapper: {
      marginVertical: RFValue(12),
      marginHorizontal: RFValue(16),
      paddingVertical: RFValue(4)
    },
    label: {
      fontSize: RFValue(14),
      fontFamily: 'Heebo_700Bold'
    }
  },
  stage: {
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
