import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react'

import R from 'res/R'
import Screen from 'components/Screen'
import BubbleChart from 'components/BubbleChart'
import BasketButton, { BUTTON_SIZE } from 'components/BasketButton'


@inject('store')
@observer
class Home extends React.Component {
  static navigationOptions = {
    title: 'My Carbon Footprint',
  }

  constructor(props) {
    super(props)
    this.touchLog = R.touchLog.bind(this)
  }

  render() {
    const { navigation } = this.props

    return (
      <Screen contentContainerStyle={ styles.contentContainer }>
        <View style={ styles.spanSelectContainer }>
          <TouchableOpacity onPress={() => {
            this.touchLog('Home', 'Week')
          }}>
            <Text
              style={[
                styles.spanSelector,
                styles.spanSelected,
                R.palette.mr3,
              ]}>
              WEEK
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.touchLog('Home', 'Month')
          }}>
            <Text style={ styles.spanSelector }>MONTH</Text>
          </TouchableOpacity>
        </View>
        <BubbleChart />
        <Text style={[styles.bubbleHelper, R.palette.mt3]}>
          Click the bubbles to see more details.
        </Text>
        <View style={ styles.basketMessage }>
          <Text>
            Fill your basket with your latest groceries
            to keep track of your Carbon Footprint!
          </Text>
        </View>
        <BasketButton
          message='+'
          onPress={() => {
            this.touchLog('Home', 'BasketButton')
            navigation.navigate('AddToBasket')
          }}
          style={ styles.basketButton } />
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  spanSelectContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  spanSelector: {
    color: '#777777',
    fontWeight: 'bold',
  },
  spanSelected: {
    color: R.colors.textColor,
    textDecorationLine: 'underline',
  },
  bubbleHelper: {
    fontSize: 12,
    textAlign: 'center',
  },
  basketMessage: {
    backgroundColor: R.colors.white,
    borderRadius: 10,
    marginTop: 'auto',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    width: '100%',
  },
  basketButton: {
    alignSelf: 'center',
    marginTop: -Math.round(BUTTON_SIZE / 4),
  },
})

export default Home
