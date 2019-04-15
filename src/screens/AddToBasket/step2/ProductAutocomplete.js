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

import TextInput from 'components/TextInput'
import R from 'res/R'


const products = [
  'milk',
  'eggplant',
  'carrot',
  'peanuts',
  'melon',
  'cheese',
  'pasta',
  'beef',
  'eggs',
]

class ProductAutocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: props.value,
      isFocused: false,
    }
  }

  onChangeQuery = (query) => {
    this.setState({ query })
  }

  getAutocompleteList() {
    let query = this.state.query || ''
    // Hide autocomplete when query has <= 1 characters length
    if (query.length <= 1) return []

    query = query.toLowerCase()
    return products.filter(product => {
      product = product.toLowerCase()
      return product.startsWith(query) && product != query
    })
  }

  onAutocompletePress = (item) => {
    console.log('Pressed', item)
    Keyboard.dismiss()
    this.setState({ query: item })
  }

  render() {
    const { style } = this.props
    const { query } = this.state
    const autocompletes = this.getAutocompleteList()

    return (
      <React.Fragment>
        <ScrollView
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={[styles.container, style]}>
          <TextInput
            autoFocus
            value={ query }
            onChangeText={ this.onChangeQuery }
            placeholder='Select a product...' />
        </ScrollView>
        { autocompletes.length > 0 && (
          <View style={ styles.autocompletesContainer }>
            <View style={ styles.autocompletes }>
              <FlatList
                horizontal={ false }
                data={ autocompletes }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={ styles.autocompleteItem }
                    onPress={ () => this.onAutocompletePress(item) }>
                    <Text style={ styles.autocompleteItemText }>{ item }</Text>
                  </TouchableOpacity>
                )}
                keyExtractor={ (_item, index) => index.toString() } />
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
    zIndex: 2,
  },
  autocompletes: {
    backgroundColor: R.colors.white,
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginTop: 6,
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
