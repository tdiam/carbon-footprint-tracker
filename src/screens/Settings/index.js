import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { inject, observer } from 'mobx-react'

import R from 'res/R'
import Screen from 'components/Screen'
import SettingsRow from './SettingsRow'


@inject('store')
@observer
class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  constructor(props) {
    super(props)
    this.store = this.props.store
  }

  clearPurchases = () => this.store.purchaseStore.removeAll()
  reseedCategories = () => this.store.categoryStore.forceReseed()

  render() {
    return (
      <Screen>
        <Text style={[R.palette.screenSection, R.palette.mb2]}>Dev tools</Text>
        <SettingsRow onPress={ this.clearPurchases }>
          Clear purchases
        </SettingsRow>
        <SettingsRow onPress={ this.reseedCategories }>
          Reseed categories
        </SettingsRow>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({

})

export default Settings
