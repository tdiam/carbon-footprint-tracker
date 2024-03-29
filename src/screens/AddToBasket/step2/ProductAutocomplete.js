import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native'
import { inject, observer } from 'mobx-react'

import TextInput from 'components/TextInput'
import R from 'res/R'


@inject('store')
@observer
class ProductAutocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.purchaseStore
    this.touchLog = R.touchLog.bind(this)
  }

  componentDidMount() {
    this.store.sync()
  }

  getAutocompleteList() {
    let query = this.props.query || '',
        categoryId = this.props.categoryId
    // Hide autocomplete when query has <= 1 characters length
    if (query.length <= 1) return []

    query = query.toLowerCase()
    return this.store.recentProducts.filter(product => {
      // Only autocomplete from the same category
      if (categoryId && categoryId !== product.category) return false

      productName = product.productName.toLowerCase()
      return productName.startsWith(query) && productName != query
    })
  }

  onChangeQuery = (query) => {
    this.touchLog('AddToBasket', 'Autocomplete', 'TextInput', 'query', query)
    this.props.onChangeQuery(query)
  }

  onAutocompletePress = (item) => {
    Keyboard.dismiss()
    this.props.onChangeQuery(item)
  }

  render() {
    const { query, style } = this.props
    const autocompletes = this.getAutocompleteList()

    return (
      <React.Fragment>
        <ScrollView
          contentContainerStyle={[styles.container, style]}>
          <TextInput
            autoFocus
            value={ query }
            onChangeText={ this.onChangeQuery }
            onBlur={ () => this.touchLog('AddToBasket', 'Autocomplete', 'TextInput', 'blur') }
            onFocus={ () => this.touchLog('AddToBasket', 'Autocomplete', 'TextInput', 'focus') }
            placeholder='Select a product...' />
        </ScrollView>
        { autocompletes.length > 0 && (
          <View style={ styles.autocompletesContainer }>
            <View style={ styles.autocompletes }>
              <FlatList
                keyboardShouldPersistTaps='handled'
                horizontal={ false }
                data={ autocompletes }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={ styles.autocompleteItem }
                    onPress={() => {
                      this.touchLog('AddToBasket', 'Autocomplete', query, item.productName)
                      this.onAutocompletePress(item.productName)
                    }}>
                    <Text style={ styles.autocompleteItemText }>{ item.productName }</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={ item => item.id.toString() } />
            </View>
          </View>
        )}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  autocompletesContainer: {
    width: '100%',
  },
  autocompletes: {
    backgroundColor: R.colors.white,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 6,
    zIndex: 2,
  },
  autocompleteItem: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    width: '100%',
  },
  autocompleteItemText: {
    color: '#4C4C4C',
  },
})

export default ProductAutocomplete
