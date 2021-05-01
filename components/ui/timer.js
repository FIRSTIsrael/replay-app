import React, { useRef, useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { RFValue } from 'react-native-responsive-fontsize'
import moment from 'moment'

const Timer = ({ duration, onStart, onFinished, everySecond }) => {
  const timerRef = useRef()
  const [time, setTime] = useState(duration)
  const startTime = useMemo(() => moment(), [duration])

  const handleTick = () => {
    const time = duration - Math.round(moment.duration(moment().diff(startTime)).asSeconds())
    if (time <= 0) {
      if (onFinished) onFinished()
    } else {
      setTime(time)
      if (everySecond) everySecond(time)
    }
  }

  useEffect(() => {
    if (time !== duration) setTime(duration)
    timerRef.current = setInterval(() => handleTick(), 1000)
    if (onStart) onStart()
    return () => clearInterval(timerRef.current)
  }, [duration])

  const formatedTime = useMemo(() => {
    const pad = num => (num <= 9 ? `0${num}` : num)
    const minutes = pad(Math.floor(time / 60))
    const seconds = pad(time % 60)
    return `${minutes}:${seconds}`
  }, [time])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{formatedTime}</Text>
    </View>
  )
}

export default Timer

const styles = {
  container: {
    position: 'absolute',
    right: '8%',
    bottom: '8%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: RFValue(10),
    paddingHorizontal: 18,
    paddingVertical: 6
  },
  text: {
    fontFamily: 'Heebo_700Bold',
    fontSize: RFValue(24),
    textAlign: 'center',
    color: 'white'
  }
}
