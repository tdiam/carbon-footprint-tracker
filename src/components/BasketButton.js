import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import R from 'res/R'


const ICON_SIZE = 40
const BUTTON_SIZE = 72
const MESSAGE_FONT_SIZE = 12
const MESSAGE_SIZE = 20

const BasketButton = ({ style, message, onPress }) => (
  <TouchableOpacity style={[styles.container, style]} onPress={ onPress }>
    <MaterialIcons
      name='shopping-basket'
      size={ ICON_SIZE }
      color={ R.colors.white } />
    { message && (
      <View style={ styles.message }>
        <Text style={ styles.messageText }>{ message }</Text>
      </View>
    )}
  </TouchableOpacity>
)

// radius * (1 - cos(45deg))
const messageOffset = (BUTTON_SIZE / 2) * (1 - Math.sin(Math.PI / 4))

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.highlight,
    borderRadius: BUTTON_SIZE / 2,
    padding: (BUTTON_SIZE - ICON_SIZE) / 2,
  },
  message: {
    position: 'absolute',
    top: messageOffset - MESSAGE_SIZE / 2,
    right: messageOffset - MESSAGE_SIZE / 2,
    width: MESSAGE_SIZE,
    height: MESSAGE_SIZE,
    borderRadius: MESSAGE_SIZE / 2,
    backgroundColor: R.colors.redHighlight,
  },
  messageText: {
    color: R.colors.white,
    fontSize: MESSAGE_FONT_SIZE,
    lineHeight: MESSAGE_SIZE,
    position: 'absolute',
    top: 0,
    left: 0,
    width: MESSAGE_SIZE,
    height: MESSAGE_SIZE,
    includeFontPadding: false,
    textAlign: 'center',
    textAlignVertical: 'center',
  }
})

export default BasketButton
