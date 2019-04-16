import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native'
import { Constants } from 'expo'

import R from 'res/R'
import CloseButton from 'components/CloseButton'
import BasketButton from 'components/BasketButton'


const windowWidth = Dimensions.get('window').width

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

const Menu = ({ navigation }) => (
  <View style={ styles.container }>
    <View style={ styles.closeButtonContainer }>
      <CloseButton onPress={ () => navigation.goBack() } />
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
  </View>
)

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
    marginHorizontal: 24,
    height: 40,
    width: windowWidth - 48,
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
