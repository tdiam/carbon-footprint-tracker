import React from 'react'
import { StyleSheet, FlatList, Text } from 'react-native'
import { inject, observer } from 'mobx-react'

import TextButton from 'components/TextButton'
import R from 'res/R'
import BasketScreen from '../BasketScreen'
import RecentProducts from './RecentProducts'
import CategoryItemText from './CategoryItemText'
import CategoryItemImage from './CategoryItemImage'
import { NavigationEvents } from 'react-navigation';


const CategoryItem = CategoryItemImage

@inject('store')
@observer
class AddToBasket1 extends React.Component {
  constructor(props) {
    super(props)
    this.purchaseStore = props.store.purchaseStore
    this.categoryStore = props.store.categoryStore
    this.screen = React.createRef()
  }

  componentDidMount() {
    this.purchaseStore.sync()
    this.categoryStore.sync()
  }

  handleScreenFocus = () => {
    if (this.props.navigation.getParam('animateBasketButton', false)) {
      this.screen.current.wrappedInstance.animateBasketButton()
    }
  }

  render() {
    const { navigation } = this.props

    // Reverse to show most recently added products first
    const recentProducts = this.purchaseStore.recentProducts.slice().reverse()
    const showRecentProducts = !!recentProducts.length
    const categories = this.categoryStore.items.slice()

    return (
      <React.Fragment>
        <NavigationEvents onDidFocus={ this.handleScreenFocus } />
        <BasketScreen onRef={ this.screen }>
          { showRecentProducts && (
            <RecentProducts products={ recentProducts } styles={ styles } />
          )}
          <Text style={[
            R.palette.screenSection,
            showRecentProducts && R.palette.screenSectionMargined
          ]}>
            Select category:
          </Text>
          <FlatList
            columnWrapperStyle={ styles.row }
            data={ categories }
            numColumns={ 3 }
            horizontal={ false }
            renderItem={({ item }, index) => (
              <CategoryItem
                image={ R.images[item.image] }
                style={[
                  styles.rowItem,
                  index % 3 == 0 ? styles.rowItemMargined : {},
                ]}
                onPress={() => {
                  R.touchLog('AddToBasket', 'Category', item.name)
                  navigation.navigate('AddToBasket2', {
                    category: item.id,
                  })
                }}>
                { item.name }
              </CategoryItem>
            )}
            keyExtractor={ item => item.id.toString() }
          />
          {/*
            <TextButton
              style={ R.palette.mt2 }
              lg>
              Add new category
            </TextButton>
          */}
        </BasketScreen>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginVertical: 4,
  },
  rowItem: {
    flex: 0,
    width: '31%',
  },
  rowItemMargined: {
    marginLeft: '2%',
  },
})

export default AddToBasket1
