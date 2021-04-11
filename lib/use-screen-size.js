import { useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Dimensions } from 'react-native'

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(() => Dimensions.get('window'))

  useFocusEffect(() => {
    const handleResize = () => setScreenSize(Dimensions.get('window'))
    handleResize()
    Dimensions.addEventListener('change', handleResize)
    return () => Dimensions.removeEventListener('change', handleResize)
  }, [])

  return screenSize
}

export default useScreenSize
