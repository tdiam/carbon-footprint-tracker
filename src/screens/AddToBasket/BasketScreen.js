import React from 'react'
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
  }

  componentDidMount() {
    this.store.sync()
  }

  render() {
    const { navigation, contentContainerStyle, children, ...restProps } = this.props
    const basketSize = this.store.size

    return (
      <Screen
        floatingChildren={
          <BasketButton
            onPress={ () => navigation.navigate('Basket') }
            message={ basketSize.toString() }
            style={ R.palette.floating } />
        }
        { ...restProps }>
        { children }
      </Screen>
    )
  }
}

export default BasketScreen
