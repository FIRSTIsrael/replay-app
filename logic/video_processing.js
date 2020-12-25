import * as FileSystem from 'expo-file-system'
import shortid from 'shortid'

export const processVideo = async video => {
  const videoId = shortid.generate()
  await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}videos/`, { intermediates: true })
  await FileSystem.moveAsync({ from: video.uri, to: `${FileSystem.documentDirectory}videos/demo_${videoId}.mov` })
}