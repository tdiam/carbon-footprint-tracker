import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
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
    this.store = this.props.store.basketStore
  }

  async componentDidMount() {
    await this.store.getItems()
  }

  removeItem = async (item) => {
    const removed = await this.store.removeItem(item.id)
    console.log('Removed basket item:', removed)
  }

  removeAllItems = () => {
    this.store.removeAll()
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
          onPress={ () => this.props.navigation.goBack() } />
      </View>
    </View>
  )

  render() {
    const items = this.store.items

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
          items={ items }
          onRemoveItem={ this.removeItem } />
        <TextButton
          lg
          style={ styles.finishButton }
          textStyle={ styles.whiteText }>
          Finish
        </TextButton>
        <TextButton
          lg
          onPress={ this.removeAllItems }
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
  contentContainer: {
    flexGrow: 1,
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
