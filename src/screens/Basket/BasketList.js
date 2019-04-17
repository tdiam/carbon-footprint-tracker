import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'

import R from 'res/R'
import BasketItem from './BasketItem'
import commonStyles from './styles'


class BasketList extends React.Component {
  constructor(props) {
    super(props)
  }

  renderSeparator = () => (
    <View style={ styles.itemSeparator }></View>
  )

  renderEmpty = () => (
    <Text style={ commonStyles.basketItem }>The basket is empty.</Text>
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
          ListEmptyComponent={ this.renderEmpty }
          renderItem={({ item }) => (
            <BasketItem item={ item } onRemove={ () => this.props.onRemoveItem(item) } />
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
  itemSeparator: {
    backgroundColor: R.colors.primary,
    height: 1,
    width: '100%',
  },
})

export default BasketList
