import * as FileSystem from 'expo-file-system'
import shortid from 'shortid'

import Backend from './backend'

export const processVideo = async (videoUri, matchId, teamId) => {
  const uniqueId = shortid.generate()
  const newPath = `${FileSystem.documentDirectory}videos/${teamId}-${matchId}-${uniqueId}.mov`
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos/`, {
    intermediates: true
  })
  await FileSystem.moveAsync({
    from: videoUri,
    to: newPath
  })
  return newPath
}
