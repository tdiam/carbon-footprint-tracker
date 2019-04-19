import React from 'react'
import { StyleSheet, Animated, View, Text, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import R from 'res/R'


const ICON_SIZE = 40
const BUTTON_SIZE = 72
const MESSAGE_FONT_SIZE = 12
const MESSAGE_SIZE = 20

// radius * (1 - cos(45deg))
const messageOffset = (BUTTON_SIZE / 2) * (1 - Math.sin(Math.PI / 4))

class BasketButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { style, message, messageScale, onPress } = this.props

    const dynamicMessageStyle = messageScale && {
      transform: [
        ...styles.message.transform,
        {
          scale: messageScale,
        },
      ],
    }

    return (
      <TouchableOpacity style={[styles.container, style]} onPress={ onPress }>
        <MaterialIcons
          name='shopping-basket'
          size={ ICON_SIZE }
          color={ R.colors.white } />
        { message && (
          <Animated.View style={[styles.message, dynamicMessageStyle]}>
            <Text style={ styles.messageText }>
              { message }
            </Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.highlight,
    borderRadius: BUTTON_SIZE / 2,
    padding: (BUTTON_SIZE - ICON_SIZE) / 2,
  },
  message: {
    backgroundColor: R.colors.redHighlight,
    position: 'absolute',
    top: messageOffset,
    right: messageOffset,
    width: MESSAGE_SIZE,
    height: MESSAGE_SIZE,
    borderRadius: MESSAGE_SIZE / 2,
    transform: [{
      translateX: MESSAGE_SIZE / 2,
    }, {
      translateY: -MESSAGE_SIZE / 2,
    }],
  },
  messageText: {
    color: R.colors.white,
    fontSize: MESSAGE_FONT_SIZE,
    position: 'absolute',
    top: 0,
    left: 0,
    includeFontPadding: false,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: MESSAGE_SIZE,
    width: MESSAGE_SIZE,
    height: MESSAGE_SIZE,
  }
})

export default BasketButton
