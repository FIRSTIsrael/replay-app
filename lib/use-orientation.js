import { useState, useEffect } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'

import useScreenSize from './use-screen-size'

const useOrientation = orientation => {
  const [isOrientated, setOrientated] = useState(true)
  const screenSize = useScreenSize()

  useEffect(() => {
    const portrait = screenSize.height > screenSize.width && orientation === 'PORTRAIT'
    const landscape = screenSize.width > screenSize.height && orientation === 'LANDSCAPE'
    setOrientated(portrait || landscape)

    if (orientation === 'PORTRAIT') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => {})
    } else if (orientation === 'LANDSCAPE') {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE).catch(() => {})
    }
  }, [orientation, setOrientated, screenSize])

  return isOrientated
}

export default useOrientation
