import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Constants } from 'expo'

import R from 'res/R'
import Screen from 'components/Screen'
import TextButton from 'components/TextButton'
import IconButton from 'components/IconButton'
import WhiteText from 'components/WhiteText'
import BasketList from './BasketList'


@inject('store')
@observer
class Basket extends React.Component {
  constructor(props) {
    super(props)
    this.basketStore = props.store.basketStore
    this.purchaseStore = props.store.purchaseStore
    this.touchLog = R.touchLog.bind(this)
  }

  componentDidMount() {
    this.basketStore.sync()
  }

  removeItem = async (item) => {
    this.touchLog('Basket', 'removeItem', item.productName, item.amount, item.amountUnit)
    const removed = await this.basketStore.removeItem(item.id)
  }

  removeAllItems = () => {
    this.touchLog('Basket', 'clear')
    this.basketStore.removeAll()
  }

  saveBasket = async () => {
    this.touchLog('Basket', 'save')
    await this.purchaseStore.addItem({
      timestamp: Date.now(),
      basket: this.basketStore.items,
    })
    this.basketStore.removeAll()
    this.props.navigation.navigate('AddToBasket1', {
      animateBasketButton: true,
    })
  }

  renderTitle = () => (
    <View style={ styles.header }>
      <View style={ styles.headerContainer }>
        <WhiteText style={[R.palette.headerTitle, styles.headerTitle]}>
          My Basket
        </WhiteText>
        <IconButton
          name='close'
          size={ 40 }
          color={ R.colors.white }
          onPress={() => {
            this.touchLog('Basket', 'close')
            this.props.navigation.goBack()
          }} />
      </View>
    </View>
  )

  render() {
    const items = this.basketStore.items
    const isBasketEmpty = !items.length

    return (
      <Screen
        containerStyle={ styles.container }
        contentContainerStyle={ styles.contentContainer }
        floatingChildren={ this.renderTitle() }>
        <WhiteText style={[R.palette.bold, R.palette.mt1, R.palette.mb2]}>
          ADDED PRODUCTS
        </WhiteText>
        <BasketList
          style={ R.palette.mb2 }
          items={ items.slice() }
          onRemoveItem={ this.removeItem } />
        <TextButton
          lg
          disabled={ isBasketEmpty }
          onPress={ () => this.saveBasket() }
          style={[
            styles.finishButton,
            isBasketEmpty && R.palette.disabledButton,
          ]}
          textStyle={ styles.whiteText }>
          Finish
        </TextButton>
        <TextButton
          lg
          disabled={ isBasketEmpty }
          onPress={ this.removeAllItems }
          style={[
            styles.clearButton,
            isBasketEmpty && R.palette.disabledButton,
          ]}
          textStyle={ styles.whiteText }>
          Clear basket
        </TextButton>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: R.colors.darkScreenBackground,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
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
  whiteText: {
    color: R.colors.white,
  },
  finishButton: {
    backgroundColor: R.colors.highlight,
    marginTop: 'auto',
  },
  clearButton: {
    backgroundColor: 'transparent',
  },
})

export default Basket
