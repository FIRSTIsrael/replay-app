import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'
import i18n from '../lib/i18n'
import moment from '../lib/moment'

const programColors = {
  'FIRST LEGO League Discover': '#662D91',
  'FIRST LEGO League Explore': '#00A651',
  'FIRST LEGO League Challenge': '#ED1C24',
  'FIRST Tech Challenge': '#F57E25',
  'FIRST Robotics Competition': '#009CD7'
}

const formatDates = event => {
  const start = moment(event.start)
  const end = moment(event.end)

  const sameDay = start.isSame(end, 'day')
  if (sameDay) {
    const endTime = end.format('HH:mm')
    return start.format(i18n.t('datetime_formats.long', { endTime }))
  } else {
    const date1 = start.format(i18n.t('datetime_formats.short'))
    const date2 = end.format(i18n.t('datetime_formats.short'))
    return i18n.t('datetime_formats.2dates', { date1, date2 })
  }
}

const TeamItem = ({ item, onPress, ...props }) => {
  const { team } = item
  return (
    <TouchableOpacity onPress={onPress}>
      <List.Item
        title={i18n.t('team_name', team)}
        description={formatDates(item.event)}
        left={props => (
          <List.Icon
            {...props}
            icon="account-multiple-outline"
            color={programColors[team.program]}
            style={{
              backgroundColor: programColors[team.program] + '1f',
              borderRadius: 8
            }}
          />
        )}
        {...props}
      />
    </TouchableOpacity>
  )
}

export default TeamItem
