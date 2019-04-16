import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

import R from 'res/R'


class TextButton extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    selected: false,
  }

  onPress = () => {
    const selected = this.state.selected
    if (this.props.selectable) {
      this.setState({ selected: !selected })
    }
    if (typeof this.props.onPress === 'function') {
      this.props.onPress(!selected)
    }
  }

  render() {
    const {
      children,
      style,
      textStyle,
      inverted,
      selectedStyle,
      selectedTextStyle,
      selectable,
      icon,
      onPress,
      lg,
      ...props
    } = this.props
    const { selected } = this.state

    // selected and inverted both invert the styles
    // if they are equal they cancel each other out
    let themeStyles = (selected ^ inverted) ? invertedThemeStyles : normalThemeStyles

    return (
      <TouchableOpacity
        style={[
          commonStyles.textButton,
          themeStyles.textButton,
          lg && commonStyles.largeButton,
          selected && selectedStyle,
          style,
        ]}
        onPress={ this.onPress }
        { ...props }>
        { icon }
        <Text style={[
          commonStyles.textStyle,
          themeStyles.textStyle,
          lg && commonStyles.largeButtonText,
          selected && selectedTextStyle,
          textStyle,
        ]}>
          { children }
        </Text>
      </TouchableOpacity>
    )
  }
}

const commonStyles = StyleSheet.create({
  textButton: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
  largeButton: {
    padding: 16,
    width: '100%',
  },
  largeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

const normalThemeStyles = StyleSheet.create({
  textButton: {
    backgroundColor: R.colors.white,
  },
  textStyle: {
    color: R.colors.textColor,
  },
})

const invertedThemeStyles = StyleSheet.create({
  textButton: {
    backgroundColor: R.colors.primary,
  },
  textStyle: {
    color: R.colors.white,
  },
})

export default TextButton
