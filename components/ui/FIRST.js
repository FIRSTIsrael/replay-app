import React, { useMemo } from 'react'
import { Text } from 'react-native'

const Logotype = ({ fontFamily }) => <Text style={{ fontFamily, fontStyle: 'italic' }}>FIRST</Text>

// Italic `FIRST` in text
const FIRST = ({ italicFont = 'Roboto_400Regular_Italic', children = 'FIRST' }) => {
  return useMemo(() => {
    const arr = String(children).split('FIRST')
    return arr.map((text, index) => {
      const render = []
      if (text) render.push(text)
      if (index !== arr.length - 1) {
        render.push(<Logotype key={index + 'FIRST'} fontFamily={italicFont} />)
      }
      return render
    })
  }, [italicFont, children])
}

export default FIRST
