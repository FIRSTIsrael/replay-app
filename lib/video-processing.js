import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import shortid from 'shortid'

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
  await MediaLibrary.saveToLibraryAsync(newPath).catch(() => null)
  return newPath
}
