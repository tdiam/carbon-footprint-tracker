import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'

import R from 'res/R'


class SettingsRow extends React.Component {
  constructor(props) {
    super(props)
  }

  renderChild(child) {
    if (child == null) {
      return null
    }
    if (typeof child === 'string') {
      return <Text style={ styles.text }>{ child }</Text>
    }
    return child
  }

  render() {
    let {
      onPress,
      left,
      children,
      right,
      style,
      ...restProps
    } = this.props

    if (!left) left = children

    return (
      <TouchableOpacity
        onPress={ onPress }
        style={[
          styles.container,
          right && styles.twoChildren,
          style,
        ]}
        { ...restProps }>
        <View style={ styles.leftChild }>
          { this.renderChild(left) }
        </View>
        <View style={ styles.rightChild }>
          { this.renderChild(right) }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: R.colors.textColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 6,
  },
  twoChildren: {
    justifyContent: 'space-between',
  },
  rightChild: {
    opacity: 0.5,
  },
  text: {
    fontSize: 20,
  },
})

export default SettingsRow
