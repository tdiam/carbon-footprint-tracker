import React from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import { Provider } from 'mobx-react'
import { Font, AppLoading } from 'expo'

import RootStore from './src/stores'
import Hamburger from './src/components/header/Hamburger'
import Menu from './src/screens/Menu'
import Home from './src/screens/Home'
import Basket from './src/screens/Basket'
import {
  AddToBasket1,
  AddToBasket2,
} from './src/screens/AddToBasket'
import R from 'res/R'


const AddToBasketStack = createStackNavigator({
  AddToBasket1,
  AddToBasket2,
}, {
  headerMode: 'none',
})

AddToBasketStack.navigationOptions = {
  headerLeft: null,
  title: 'Add to Basket',
}


const MainStack = createStackNavigator({
  Home,
  AddToBasket: AddToBasketStack,
}, {
  defaultNavigationOptions: {
    headerTransparent: true,
    headerRight: <Hamburger />,
    headerStyle: R.palette.header,
    headerTitleStyle: [R.palette.headerContainers, R.palette.headerTitle],
    headerRightContainerStyle: R.palette.headerContainers,
  },
})


const RootStack = createStackNavigator({
  Main: MainStack,
  Menu,
  Basket,
}, {
  mode: 'modal',
  headerMode: 'none',
})


const AppContainer = createAppContainer(RootStack)


class App extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      [R.fonts.title]: require('./assets/fonts/AbhayaLibre-SemiBold.ttf'),
    })
    this.setState({ fontLoaded: true })
  }

  render() {
    const { fontLoaded } = this.state
    if (!fontLoaded) return <AppLoading />

    return (
      <Provider store={ new RootStore() }>
        <AppContainer />
      </Provider>
    )
  }
}

export default App
