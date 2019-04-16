import React from 'react'
import { withNavigation } from 'react-navigation'

import Screen from 'components/Screen'
import BasketButton from 'components/BasketButton'
import R from 'res/R'


const BasketScreen = ({ navigation, contentContainerStyle, children, ...restProps }) => (
  <Screen
    floatingChildren={
      <BasketButton
        style={ R.palette.floating }
        onPress={ () => navigation.navigate('Basket') } />
    }
    { ...restProps }>
    { children }
  </Screen>
)

export default withNavigation(BasketScreen)
