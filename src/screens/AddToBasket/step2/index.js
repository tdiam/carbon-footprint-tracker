import React from 'react'
import { StyleSheet, Text, View, Keyboard } from 'react-native'
import { inject, observer } from 'mobx-react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import round from 'utils/round'
import TextButton from 'components/TextButton'
import Slider from 'components/Slider'
import BasketScreen from '../BasketScreen'
import ProductAutocomplete from './ProductAutocomplete'
import R from 'res/R'


AMOUNT_MIN = 0
AMOUNT_MAX = 10
AMOUNT_STEP = 0.1

const roundAmount = (value) => round(value, AMOUNT_MIN, AMOUNT_STEP)

@inject('store')
@observer
class AddToBasket2 extends React.Component {
  constructor(props) {
    super(props)
    this.store = this.props.store.basketStore
    this.state = {
      amount: roundAmount(AMOUNT_MIN),
      product: props.navigation.getParam('product', ''),
    }
    this.touchLog = R.touchLog.bind(this)
  }

  /**
   * @todo Better id generation.
   */
  handleSubmit = () => {
    const { product, amount } = this.state
    const item = {
      productName: product.trim(),
      amount,
      amountUnit: 'kg',
    }
    this.touchLog('AddToBasket', 'Submit', item)
    this.store.addItem({
      id: Math.floor(Math.random() * 10000000),
      ...item,
    })
    this.props.navigation.navigate('AddToBasket1', {
      animateBasketButton: true,
    })
  }

  render() {
    const { navigation } = this.props
    const { amount, product } = this.state
    const category = navigation.getParam('category', '')

    return (
      <BasketScreen>
        <Text style={ R.palette.bold }>
          DAIRY PRODUCTS
        </Text>
        <ProductAutocomplete
          style={ R.palette.mt2 }
          query={ product }
          onChangeQuery={ (query) => this.setState({ product: query }) }
          />
        <View style={[styles.amountContainer, R.palette.mt5]}>
          <Text style={ R.palette.bold }>
            AMOUNT
          </Text>
          <Text style={ styles.amountValue }>{ amount.toFixed(1) } kg</Text>
        </View>
        <View style={ styles.sliderControlsContainer }>
          <Slider
            style={ styles.slider }
            minimumValue={ AMOUNT_MIN }
            maximumValue={ AMOUNT_MAX }
            step={ AMOUNT_STEP }
            onValueChange={ amount => {
              this.setState({ amount: roundAmount(amount) })
            }}
            onSlidingComplete={ amount => {
              this.touchLog('AddToBasket', 'AmountSlider', roundAmount(amount))
            }} />
          <Text style={ styles.sliderLimits }>{ AMOUNT_MIN } kg</Text>
          <Text style={ styles.sliderLimits }>{ AMOUNT_MAX } kg</Text>
        </View>
        <TextButton
          inverted
          lg
          onPress={ this.handleSubmit }
          style={ R.palette.mt5 }
          icon={
            <MaterialIcons
              name='shopping-basket'
              size={ 24 }
              color={ R.colors.white }
              style={ R.palette.mr1 } />
          }>
          Add to Basket
        </TextButton>
      </BasketScreen>
    )
  }
}

const styles = StyleSheet.create({
  amountContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountValue: {
    backgroundColor: R.colors.white,
    borderRadius: 8,
    fontFamily: R.fonts.title,
    fontSize: 24,
    paddingHorizontal: 18,
    paddingVertical: 4,
  },
  sliderControlsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  slider: {
    marginHorizontal: '12.5%',
    transform: [
      { scaleX: 4 / 3 },
      { scaleY: 4 / 3 },
    ],
    width: '75%', // 100 / (4 / 3)
  },
  sliderLimits: {
    fontSize: 10,
    marginHorizontal: 10,
  },
})

export default AddToBasket2
