import React from 'react'
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { Constants } from 'expo'

import R from 'res/R'
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

class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigation } = this.props

    return (
      <SafeAreaView style={ styles.container }>
        <View style={ styles.closeButtonContainer }>
          <IconButton
            name='close'
            size={ 40 }
            color={ R.colors.white }
            onPress={ () => navigation.goBack() } />
        </View>
        <FlatList
          style={ styles.menuContainer }
          contentContainerStyle={ styles.menuContentContainer }
          data={ menuItems }
          renderItem={({ item }) => (
            <TouchableOpacity style={ styles.menuItem }
              onPress={ () => navigation.navigate(item.screen) }>
              <Text style={ styles.menuItemText }>{ item.title }</Text>
            </TouchableOpacity>
          )}
          keyExtractor={ item => item.screen }
        />
        <View style={ styles.basketButtonContainer }>
          <BasketButton
            onPress={ () => navigation.navigate('AddToBasket') }
            message='+' />
        </View>
      </SafeAreaView>
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
  closeButtonContainer: {
    position: 'absolute',
    top: Constants.statusBarHeight + 12,
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
    marginTop: 160,
    marginHorizontal: 48,
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
