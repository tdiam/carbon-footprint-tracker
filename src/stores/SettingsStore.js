import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'


class SettingsStore {
  constructor(root) {
    this.rootStore = root
  }

  @observable settings = {}
  @observable isLoading = true
  @observable _hasSyncedWithStorage = false

  @action
  async sync() {
    if (this._hasSyncedWithStorage) return

    let settings = {}

    try {
      settings = await AsyncStorage.getItem('@Settings')
      settings = !settings ? {} : JSON.parse(settings)
      if (settings !== Object(settings)) {
        throw new Error('Stored settings is not an object')
      }
      console.log('Loaded settings', settings)
    } catch(err) {
      console.error(err)
      settings = {}
    }

    this.settings = settings
    this._hasSyncedWithStorage = true
  }

  @action
  async set(key, val) {
    this.settings[key] = val
    await this.save()
  }

  @action
  async save() {
    try {
      const json = JSON.stringify(this.settings)
      await AsyncStorage.setItem('@Settings', json)
      return true
    } catch(err) {
      console.error(err)
      return false
    }
  }
}

export { SettingsStore }
