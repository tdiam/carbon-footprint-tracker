import React from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native'

import R from 'res/R'


class BasketList extends React.Component {
  constructor(props) {
    super(props)
  }

  renderSeparator = () => (
    <View style={ styles.itemSeparator }></View>
  )

  render() {
    const { items, style } = this.props

    return (
      <View style={[styles.basketItems, style]}>
        <FlatList
          keyboardShouldPersistTaps='handled'
          horizontal={ false }
          data={ items }
          ItemSeparatorComponent={ this.renderSeparator }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={ styles.basketItem }>
              <Text style={ styles.basketItemText }>{ item.productName }</Text>
              <Text style={ styles.basketItemAmountText }>
                { item.amount } { item.amountUnit }
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={ item => item.id.toString() } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  basketItems: {
    backgroundColor: R.colors.white,
    borderRadius: 10,
  },
  basketItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  basketItemAmountText: {
    fontSize: 12,
  },
  itemSeparator: {
    backgroundColor: R.colors.primary,
    height: 1,
    width: '100%',
  },
})

export default BasketList
