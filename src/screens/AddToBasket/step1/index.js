import React from 'react'
import { StyleSheet, FlatList, Text } from 'react-native'

import TextButton from 'components/TextButton'
import R from 'res/R'
import BasketScreen from '../BasketScreen'
import SearchHistory from './SearchHistory'
import CategoryItemText from './CategoryItemText'
import CategoryItemImage from './CategoryItemImage'


const searchHistory = [
  {
    id: 1,
    title: 'milk',
  },
  {
    id: 2,
    title: 'eggplant',
  },
  {
    id: 3,
    title: 'carrot',
  },
  {
    id: 4,
    title: 'peanuts',
  },
  {
    id: 5,
    title: 'melon',
  },
  {
    id: 6,
    title: 'cheese',
  },
  {
    id: 7,
    title: 'pasta',
  },
  {
    id: 8,
    title: 'beef',
  },
  {
    id: 9,
    title: 'eggs',
  },
]

const CategoryItem = CategoryItemImage


class AddToBasket1 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { navigation } = this.props

    return (
      <BasketScreen>
        <SearchHistory searchHistory={ searchHistory } styles={ styles } />
        <Text style={ [R.palette.screenSection, R.palette.screenSectionMargined] }>
          Select category:
        </Text>
        <FlatList
          columnWrapperStyle={ styles.row }
          data={ searchHistory }
          numColumns={ 3 }
          horizontal={ false }
          renderItem={({ item }, index) => (
            <CategoryItem
              image={ R.images.avocado }
              style={[
                styles.rowItem,
                index % 3 == 0 ? styles.rowItemMargined : {},
              ]}
              onPress={() => {
                navigation.navigate('AddToBasket2', {
                  category: item.title,
                })
              }}>
              { item.title }
            </CategoryItem>
          )}
          keyExtractor={ item => item.id.toString() }
        />
        <TextButton
          style={ R.palette.mt2 }
          lg>
          Add new category
        </TextButton>
      </BasketScreen>
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