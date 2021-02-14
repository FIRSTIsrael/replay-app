import React, { useMemo } from 'react'
import { Text } from 'react-native-paper'

export default function FIRST({ italicFont, children }) {
  return useMemo(
    () =>
      String(children)
        .split(' ')
        .map((text, index) => [
          <React.Fragment key={index}>
            {text === 'FIRST' ? <Text style={{ fontFamily: italicFont }}>{text}</Text> : text}
          </React.Fragment>,
          ' '
        ]),
    [italicFont, children]
  )
}
