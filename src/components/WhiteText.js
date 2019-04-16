import React from 'react'
import { Text } from 'react-native'

import R from 'res/R'


const WhiteText = ({ style, children, ...restProps }) => (
  <Text
    style={[
      style,
      { color: R.colors.white },
    ]}
    { ...restProps }>
    { children }
  </Text>
)

export default WhiteText
