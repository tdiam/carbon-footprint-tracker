import React from 'react'

import Screen from 'components/Screen'
import BasketButton from 'components/BasketButton'
import R from 'res/R'


const BasketScreen = ({ navigation, contentContainerStyle, children, ...restProps }) => (
  <Screen
    floatingChildren={
      <BasketButton style={ R.palette.floating } />
    }
    { ...restProps }>
    { children }
  </Screen>
)

export default BasketScreen
