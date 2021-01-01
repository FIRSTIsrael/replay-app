import * as FileSystem from 'expo-file-system'
import shortid from 'shortid'
import { AsyncStorage } from 'react-native'

const copyVideo = async video => {
  const videoId = shortid.generate()
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos/`, { intermediates: true })
  return await FileSystem.moveAsync({ from: video.uri, to: `${FileSystem.documentDirectory}videos/demo_${videoId}.mov` })
}

const uploadVideo = async video => {
  const method = 'post'
  const body = new FormData();

  const name = 'video-upload'
  const type = `video/${video.codec || 'mp4'}`
  const ui = video.uri

  body.append("video", { name, type, uri })

  const teamVideoUrl = await AsyncStorage.getItem('teamVideoUrl')
  return await fetch(teamVideoUrl, { method, body })
}

export const processVideo = async video => {
  return await copyVideo(video)
}