import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { List } from 'react-native-paper'

const statusName = {
  UNSUBMITTED: 'לא הוגש',
  SUBMITTED: 'הוגש'
}

const MatchItem = ({ match, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <List.Item
        title={match.name}
        description={statusName[match.status]}
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
