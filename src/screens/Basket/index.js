import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Constants } from 'expo'

import R from 'res/R'
import Screen from 'components/Screen'
import CloseButton from 'components/CloseButton'
import WhiteText from 'components/WhiteText' 


const basketItems = [
  {
    id: 1,
    title: 'Milk',
    amount: 2,
    amountUnit: 'L',
  },
  {
    id: 2,
    title: 'Gouda Cheese',
    amount: 0.35,
    amountUnit: 'kg',
  },
  {
    id: 3,
    title: 'Apricots',
    amount: 1.5,
    amountUnit: 'kg',
  },
  {
    id: 4,
    title: 'Coconut Cream',
    amount: 0.25,
    amountUnit: 'L',
  },
  {
    id: 5,
    title: 'Eggs',
    amount: 0.5,
    amountUnit: 'kg',
  },
]

@inject('store')
@observer
class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.basketStore
    this.state = {
      items: [],
    }
  }

  async componentDidMount() {
    const items = await this.store.getItems()
    this.setState({ items })
  }

  renderSeparator = () => (
    <View style={ styles.itemSeparator }></View>
  )

  render() {
    const { navigation } = this.props
    const { items } = this.state

    return (
      <Screen
        containerStyle={ styles.container }
        floatingChildren={
          <View style={ styles.header }>
            <View style={ styles.headerContainer }>
              <WhiteText style={[R.palette.headerTitle, styles.headerTitle]}>
                My Basket
              </WhiteText>
              <CloseButton onPress={ () => navigation.goBack() } />
            </View>
          </View>
        }>
        <WhiteText style={[R.palette.bold, R.palette.mt1, R.palette.mb2]}>
          ADDED PRODUCTS
        </WhiteText>
        <View style={ styles.basketItems }>
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
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: R.colors.darkScreenBackground,
  },
  header: {
    position: 'absolute',
    top: Constants.statusBarHeight + 12,
    width: '100%',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
  },
  headerTitle: {
    marginTop: 4,
  },
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

export default Basket
