import { Audio } from 'expo-av'

const FILES = {
  start: require('../assets/sounds/start.mp3'),
  'end-game': require('../assets/sounds/end-game.mp3'),
  end: require('../assets/sounds/end.mp3'),
  stop: require('../assets/sounds/stop.mp3')
}

export async function playSound(file) {
  const { sound } = await Audio.Sound.createAsync(FILES[file], { shouldPlay: true })
}
