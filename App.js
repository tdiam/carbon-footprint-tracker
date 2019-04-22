import React from 'react'
import { createStackNavigator, createAppContainer, HeaderBackButton } from 'react-navigation'
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
import Settings from './src/screens/Settings'
import R from 'res/R'


const AddToBasketStack = createStackNavigator({
  AddToBasket1,
  AddToBasket2,
}, {
  headerMode: 'none',
})

AddToBasketStack.navigationOptions = ({ navigation }) => ({
  title: 'Add to Basket',
  headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} />
})


const MainStack = createStackNavigator({
  Home,
  Settings,
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
