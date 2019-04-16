import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'

import R from 'res/R'


class Screen extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      children,
      floatingChildren,
      containerStyle,
      contentContainerStyle,
    } = this.props

    return (
      <SafeAreaView
        style={[R.palette.screenContainer, containerStyle]}>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          style={ R.palette.screenContent }
          contentContainerStyle={[R.palette.screenContentContainer, contentContainerStyle]}>
          { children }
        </ScrollView>
        { floatingChildren }
      </SafeAreaView>
    )
  }
}

export default Screen