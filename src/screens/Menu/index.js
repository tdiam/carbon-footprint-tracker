import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Constants } from 'expo'
import { inject, observer } from 'mobx-react'

import R from 'res/R'
import Screen from 'components/Screen'
import IconButton from 'components/IconButton'
import BasketButton from 'components/BasketButton'


const menuItems = [
  {
    screen: 'Home',
    title: 'My Carbon Footprint',
  },
  {
    screen: 'Progress',
    title: 'My Progress',
  },
  {
    screen: 'PastGroceries',
    title: 'Past Groceries',
  },
  {
    screen: 'Settings',
    title: 'Settings',
  }
]


@inject('store')
@observer
class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.touchLog = R.touchLog.bind(this)
  }

  render() {
    const { navigation } = this.props

    return (
      <Screen
        containerStyle={ styles.container }
        contentContainerStyle={ styles.contentContainer }
        floatingChildren={
          <React.Fragment>
            <View style={ styles.closeButtonContainer }>
              <IconButton
                name='close'
                size={ 40 }
                color={ R.colors.white }
                onPress={() => {
                  this.touchLog('Menu', 'close')
                  navigation.goBack()
                }} />
            </View>
            <View style={ styles.basketButtonContainer }>
              <BasketButton
                onPress={() => {
                  this.touchLog('Menu', 'AddToBasket')
                  navigation.navigate('AddToBasket')
                }}
                message='+' />
            </View>
          </React.Fragment>
        }>
        <FlatList
          style={ styles.menuContainer }
          contentContainerStyle={ styles.menuContentContainer }
          data={ menuItems }
          renderItem={({ item }) => (
            <TouchableOpacity style={ styles.menuItem }
              onPress={() => {
                this.touchLog('Menu', item.screen)
                navigation.navigate(item.screen)
              }}>
              <Text style={ styles.menuItemText }>{ item.title }</Text>
            </TouchableOpacity>
          )}
          keyExtractor={ item => item.screen }
        />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.darkScreenBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    paddingBottom: 0,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: Constants.statusBarHeight + 16,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    paddingHorizontal: 24,
    zIndex: 3,
  },
  menuContainer: {
    alignSelf: 'stretch',
  },
  menuContentContainer: {
    marginTop: 80,
    marginHorizontal: 0,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuItemText: {
    color: R.colors.white,
    fontFamily: R.fonts.title,
    fontSize: 27,
    fontWeight: 'normal',
  },
  basketButtonContainer: {
    paddingVertical: 48,
  },
})

export default Menu
