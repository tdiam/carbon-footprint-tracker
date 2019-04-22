import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

import R from 'res/R'


class Bubble extends React.Component {
  constructor(props) {
    super(props)
  }

  calculateStyle = () => {
    const { size, selected, color, x, y } = this.props
    const halfSize = Math.round(size / 2)
    // If not selected, the bubble will have 50% background opacity
    const colorAffix = selected ? '' : '80'

    return {
      backgroundColor: color + colorAffix,
      width: size,
      height: size,
      left: x,
      top: y,
      marginLeft: -halfSize,
      marginTop: -halfSize,
      borderRadius: halfSize + 1,
      zIndex: selected ? 1 : 0,
    }
  }

  render() {
    const { name, size, onPress, style, textStyle, x, y, ...restProps } = this.props

    return (
      <TouchableOpacity
        onPress={ onPress }
        activeOpacity={ 1 }
        style={[styles.bubble, this.calculateStyle(), style]}
        { ...restProps }>
        <Text style={[styles.bubbleText, textStyle]}>
          { name }
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    color: R.colors.white,
  },
})

export default Bubble
