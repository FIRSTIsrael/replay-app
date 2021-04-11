import * as FileSystem from 'expo-file-system'
import shortid from 'shortid'

import Backend from './backend'

const copyVideo = async video => {
  const videoId = shortid.generate()
  const newPath = `${FileSystem.documentDirectory}videos/demo_${videoId}.mov`
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos/`, {
    intermediates: true
  })
  await FileSystem.moveAsync({
    from: video.uri,
    to: newPath
  })
  return newPath
}

export const processVideo = async (video, matchId, teamAtEventId, authToken) => {
  const uri = await copyVideo(video)
  await Backend.postMatch(authToken, matchId, teamAtEventId, { ...video, uri })
    .then(r => r.json())
    .then(console.log)
}
