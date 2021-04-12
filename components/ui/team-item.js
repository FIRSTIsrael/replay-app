import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'

import config from '../../config'
import { useLocalization } from '../../lib/i18n'

const TeamItem = ({ teamAtEvent, onPress }) => {
  const { t } = useLocalization()
  const { team, event } = teamAtEvent
  return (
    <TouchableOpacity onPress={onPress}>
      <List.Item
        title={t('team_name_long', team)}
        description={event.name}
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
