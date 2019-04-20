import React from 'react'
import { Animated } from 'react-native'
import { withNavigation } from 'react-navigation'
import { inject, observer } from 'mobx-react'

import Screen from 'components/Screen'
import BasketButton from 'components/BasketButton'
import R from 'res/R'


@withNavigation
@inject('store')
@observer
class BasketScreen extends React.Component {
  constructor(props) {
    super(props)
    this.store = props.store.basketStore
    this.state = {
      messageScale: new Animated.Value(1),
    }
    this.touchLog = R.touchLog.bind(this)
  }

  componentDidMount() {
    this.store.sync()
  }

  animateBasketButton() {
    this.state.messageScale.setValue(0)
    Animated.spring(this.state.messageScale, {
      toValue: 1,
      stiffness: 320,
      damping: 4,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { navigation, contentContainerStyle, children, ...restProps } = this.props
    const { messageScale } = this.state
    const basketSize = this.store.size

    return (
      <Screen
        floatingChildren={
          <BasketButton
            onPress={() => {
              this.touchLog('BasketScreen', 'BasketIcon')
              navigation.navigate('Basket')
            }}
            message={ basketSize.toString() }
            messageScale={ messageScale }
            style={ R.palette.floating } />
        }
        { ...restProps }>
        { children }
      </Screen>
    )
  }
}

export default BasketScreen
