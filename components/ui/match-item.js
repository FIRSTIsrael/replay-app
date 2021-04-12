import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'

import { useLocalization } from '../../lib/i18n'

const MatchItem = ({ match, onPress }) => {
  const { t } = useLocalization()
  return (
    <TouchableOpacity onPress={onPress}>
      <List.Item
        title={match.name}
        description={t(`match_status.${match.status}`, { defaultValue: match.status })}
        left={props => (
          <List.Icon
            {...props}
            icon={
              match.status === 'UNSUBMITTED'
                ? 'checkbox-blank-circle-outline'
                : 'checkbox-marked-circle-outline'
            }
            color={match.status === 'UNSUBMITTED' ? '#999' : '#52c41a'}
            style={{
              borderRadius: 8
            }}
          />
        )}
      />
    </TouchableOpacity>
  )
}

export default MatchItem
