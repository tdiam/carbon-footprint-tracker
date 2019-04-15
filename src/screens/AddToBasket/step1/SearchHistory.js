import React from 'react'
import { withNavigation } from 'react-navigation'
import { Text, FlatList } from 'react-native'

import R from 'res/R'
import TextButton from 'components/TextButton'


const SearchHistory = ({ navigation, searchHistory, styles }) => (
  <React.Fragment>
    <Text style={ R.palette.screenSection }>
      Search history:
    </Text>
    <FlatList
      columnWrapperStyle={ styles.row }
      data={ searchHistory }
      numColumns={ 3 }
      horizontal={ false }
      renderItem={({ item }, index) => (
        <TextButton
          style={[
            styles.rowItem,
            index % 3 == 0 ? styles.rowItemMargined : {},
          ]}
          onPress={() => {
            navigation.navigate('AddToBasket2', {
              product: item.title,
            })
          }}>
          { item.title }
        </TextButton>
      )}
      keyExtractor={ item => item.id.toString() }
    />
  </React.Fragment>
)

export default withNavigation(SearchHistory)
