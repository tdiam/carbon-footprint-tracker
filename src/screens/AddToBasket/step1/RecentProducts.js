import React from 'react'
import { withNavigation } from 'react-navigation'
import { StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'

import R from 'res/R'
import TextButton from 'components/TextButton'


@withNavigation
class RecentProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    productsLimit: 9,
  }

  seeMoreProducts = () => {
    R.touchLog('AddToBasket', 'SeeMoreProducts')
    // Try to increase by 9, not exceeding total length though
    let newLimit = Math.min(
      this.state.productsLimit + 9,
      this.props.products.length,
    )
    // Round up to closest multiple of 3
    if (newLimit % 3 > 0) {
      newLimit += 3 - newLimit % 3
    }
    this.setState({ productsLimit: newLimit })
  }

  getProducts = () => {
    const limit = this.state.productsLimit
    return this.props.products.slice(0, limit)
  }

  render() {
    const { navigation, styles: parentStyles } = this.props
    const products = this.getProducts()

    return (
      <React.Fragment>
        <Text style={ R.palette.screenSection }>
          Recently bought:
        </Text>
        <FlatList
          columnWrapperStyle={ parentStyles.row }
          data={ products }
          numColumns={ 3 }
          horizontal={ false }
          renderItem={({ item }, index) => (
            <TextButton
              style={[
                parentStyles.rowItem,
                index % 3 == 0 ? parentStyles.rowItemMargined : {},
              ]}
              onPress={() => {
                R.touchLog('AddToBasket', 'RecentProduct', item.productName)
                navigation.navigate('AddToBasket2', {
                  product: item.productName,
                  category: item.category,
                })
              }}>
              { item.productName }
            </TextButton>
          )}
          keyExtractor={ item => item.id.toString() }
        />
        { products.length < this.props.products.length && (
          <TouchableOpacity
            onPress={ this.seeMoreProducts }
            style={ R.palette.mt1 }>
            <Text style={ styles.seeMore }>SEE MORE</Text>
          </TouchableOpacity>
        )}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  seeMore: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
})

export default RecentProducts
