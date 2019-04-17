import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

import R from 'res/R'
import IconButton from 'components/IconButton'
import commonStyles from './styles'


class BasketItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { id, productName, amount, amountUnit } = this.props.item

    return (
      <TouchableOpacity
        style={ commonStyles.basketItem }>
        <Text style={ styles.basketItemText }>{ productName }</Text>
        <Text style={ styles.basketItemAmountText }>
          { amount } { amountUnit }
        </Text>
        <IconButton
          name='delete'
          size={ 32 }
          color={ R.colors.textColor }
          style={ R.palette.ml1 }
          onPress={ this.props.onRemove } />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  basketItemAmountText: {
    fontSize: 12,
    marginLeft: 'auto',
  },
})

export default BasketItem
