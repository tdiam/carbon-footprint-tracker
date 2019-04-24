import React from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { inject, observer } from 'mobx-react'

import R from 'res/R'
import Screen from 'components/Screen'
import { clearStorage, exportStorage } from 'utils/storage'
import SettingsRow from './SettingsRow'


@inject('store')
@observer
class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }

  constructor(props) {
    super(props)
    this.store = props.store
    this.channelInput = React.createRef()
    this.exportInput = React.createRef()
  }

  componentDidMount() {
    this.store.settingsStore.sync()
  }

  clearPurchases = () => this.store.purchaseStore.removeAll()
  reseedCategories = () => this.store.categoryStore.forceReseed()
  toggleShowCategoriesAs = () => {
    const current = this.store.settingsStore.settings.showCategoriesAs || 'text'
    this.store.settingsStore.set(
      'showCategoriesAs',
      current === 'image' ? 'text' : 'image'
    )
  }
  toggleLogTouchEvents = () => {
    const current = this.store.settingsStore.settings.logTouchEvents || false
    this.store.settingsStore.set('logTouchEvents', !current)
  }
  setExperimentChannel = (evt) => {
    this.store.experimentStore.setChannel(evt.nativeEvent.text)
  }
  printTouchLogsToConsole = () => {
    this.store.experimentStore.printTouchLogsToConsole()
  }
  deleteTouchLogs = () => this.store.experimentStore.deleteTouchLogs()
  clearStorageHandler = async () => {
    await clearStorage()
    this.store.init()
  }

  render() {
    const logTouchEvents = this.store.settingsStore.settings.logTouchEvents || false
    const showCategoriesAs = this.store.settingsStore.settings.showCategoriesAs || 'text'
    const experimentChannel = this.store.experimentStore.channel

    return (
      <Screen>
        <Text style={[R.palette.screenSection, R.palette.mb2]}>Dev tools</Text>
        <SettingsRow onPress={ this.clearPurchases }>
          Clear purchases
        </SettingsRow>
        <SettingsRow onPress={ this.reseedCategories }>
          Reseed categories
        </SettingsRow>
        <SettingsRow
          onPress={ this.toggleShowCategoriesAs }
          left='Show categories as'
          right={
            showCategoriesAs === 'image' ? 'Image' : 'Text'
          } />
        <SettingsRow
          onPress={ () => this.channelInput.current.focus() }
          left='Experiment channel'
          right={
            <TextInput
              ref={ this.channelInput }
              defaultValue={ experimentChannel }
              onEndEditing={ this.setExperimentChannel }
              placeholder=' '
              style={ styles.text } />
          } />
        <SettingsRow
          onPress={ this.toggleLogTouchEvents }
          disabled={ !experimentChannel }
          style={ !experimentChannel && R.palette.disabledButton }
          left='Log touch events'
          right={
            logTouchEvents ? 'Yes' : 'No'
          } />
        <SettingsRow
          onPress={ this.printTouchLogsToConsole }
          disabled={ !experimentChannel }
          style={ !experimentChannel && R.palette.disabledButton }>
          Print touch logs to console
        </SettingsRow>
        <SettingsRow
          onPress={ this.deleteTouchLogs }
          disabled={ !experimentChannel }
          style={ !experimentChannel && R.palette.disabledButton }>
          Delete touch logs
        </SettingsRow>
        <SettingsRow
          onPress={ () => this.exportInput.current.focus() }
          left='Export storage'
          right={
            <TextInput
              ref={ this.exportInput }
              onEndEditing={ evt => exportStorage(evt.nativeEvent.text) }
              style={ styles.text } />
          } />
        <SettingsRow
          onPress={ this.clearStorageHandler }
          style={ styles.danger }>
          Clear all data
        </SettingsRow>
      </Screen>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  danger: {
    backgroundColor: '#E46A6A',
  },
})

export default Settings
