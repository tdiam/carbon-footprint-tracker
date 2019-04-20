import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { inject, observer } from 'mobx-react'

import R from 'res/R'


@inject('store')
@observer
class Screen extends React.Component {
  constructor(props) {
    super(props)
    this.touchLog = R.touchLog.bind(this)
  }

  handleTouch = () => {
    this.touchLog('@Root')
    return false
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
        style={[R.palette.screenContainer, containerStyle]}
        onStartShouldSetResponderCapture={ this.handleTouch }
        >
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
