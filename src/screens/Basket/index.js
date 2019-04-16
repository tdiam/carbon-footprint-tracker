import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import { Constants } from 'expo'

import R from 'res/R'
import Screen from 'components/Screen'
import TextButton from 'components/TextButton'
import CloseButton from 'components/CloseButton'
import WhiteText from 'components/WhiteText'
import BasketList from './BasketList'


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

  renderTitle = () => (
    <View style={ styles.header }>
      <View style={ styles.headerContainer }>
        <WhiteText style={[R.palette.headerTitle, styles.headerTitle]}>
          My Basket
        </WhiteText>
        <CloseButton onPress={ () => this.props.navigation.goBack() } />
      </View>
    </View>
  )

  render() {
    const { items } = this.state

    return (
      <Screen
        containerStyle={ styles.container }
        floatingChildren={ this.renderTitle() }>
        <WhiteText style={[R.palette.bold, R.palette.mt1, R.palette.mb2]}>
          ADDED PRODUCTS
        </WhiteText>
        <BasketList items={ items } />
        <TextButton
          lg
          style={ styles.finishButton }
          textStyle={ styles.whiteText }>
          Finish
        </TextButton>
        <TextButton
          lg
          style={ styles.clearButton }
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
