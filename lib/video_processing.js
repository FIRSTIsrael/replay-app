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

const uploadVideo = async (video, teamId, authToken) => {
  const body = new FormData()
  body.append('video', {
    name: 'video',
    type: `video/${video.codec || 'mp4'}`,
    uri: video.uri
  })
  return Backend.postMatch(authToken, teamId, body)
    .then(r => r.json())
    .then(console.log)
}

export const processVideo = async (video, teamId, authToken) => {
  const uri = await copyVideo(video)
  await uploadVideo({ ...video, uri }, teamId, authToken)
}
