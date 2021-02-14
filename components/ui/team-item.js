import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'

import config from '../../config'
import i18n from '../../lib/i18n'
import { formatDates } from '../../lib/moment'

const TeamItem = ({ item, onPress }) => {
  const { team, event } = item
  return (
    <TouchableOpacity onPress={onPress}>
      <List.Item
        title={i18n.t('team_name', team)}
        description={formatDates(event)}
        left={props => (
          <List.Icon
            {...props}
            icon="account-multiple-outline"
            color={config.programColors[team.program]}
            style={{
              backgroundColor: config.programColors[team.program] + '1f',
              borderRadius: 8
            }}
          />
        )}
      />
    </TouchableOpacity>
  )
}

export default TeamItem
