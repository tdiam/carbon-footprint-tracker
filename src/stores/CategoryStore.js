import { observable, action, computed } from 'mobx'
import { AsyncStorage } from 'react-native'

import categories from 'data/categories'
import { picker } from 'utils/pick'


const CategoryItemSerializer = picker('id', 'name', 'image', 'unit', 'carbonPerUnit', '_builtin')

class CategoryStore {
  constructor(root) {
    this.rootStore = root
  }

  @observable items = []
  @observable isLoading = true
  @observable _autoincrement = 0
  @observable _hasSyncedWithStorage = false

  @action
  async initialSeed() {
    const hasSeeded = await AsyncStorage.getItem('@Category:HasSeeded')
    if (hasSeeded === 'true') return

    this.items = categories
    // Set autoincrement to one more than the max id (or 0 if no items)
    const autoincrement = Math.max(0, ...this.items.map(item => item.id)) + 1

    const success = await this.save()
    if (success) {
      await Promise.all([
        AsyncStorage.setItem('@Category:HasSeeded', 'true'),
        this._updateAutoincrement(autoincrement),
      ])
    }
  }

  @action
  async sync() {
    if (this._hasSyncedWithStorage) return
    await this.initialSeed()

    let items = []

    try {
      items = await AsyncStorage.getItem('@Category:Items')
      items = JSON.parse(items)
      if (items.constructor !== Array) {
        throw new Error('Stored items is not an array')
      }
      this._autoincrement = parseInt(
        await AsyncStorage.getItem('@Category:ItemsAutoincrementId')
      )
      console.log('Fetched category data:')
      console.table(items)
      console.log(this._autoincrement)
    } catch(err) {
      console.error(err)
      items = []
    }

    this.items = items
    this._hasSyncedWithStorage = true
    return items
  }

  /**
   * Increases the autoincrement by 1 or sets it to `custom` if provided.
   *
   * @param {Number} [custom] If provided, the new autoincrement will be set to `custom`.
   * @returns {Number} The autoincrement before this function was called.
   * @throws Error if saving the autoincrement fails.
   */
  @action
  async _updateAutoincrement(custom) {
    let current = this._autoincrement
    let next = current + 1
    if (typeof custom !== 'undefined') {
      next = custom
    }
    await AsyncStorage.setItem('@Category:ItemsAutoincrementId', next.toString())
    this._autoincrement = next
    return current
  }

  @action
  async addItem(item) {
    item.id = this._autoincrement
    item._builtin = false
    this.items.push(item)
    const success = await this.save()
    if (success) {
      await this._updateAutoincrement()
    }
    return item
  }

  @action
  async save() {
    try {
      const json = JSON.stringify(this.items.map(CategoryItemSerializer))
      await AsyncStorage.setItem('@Category:Items', json)
      return true
    } catch(err) {
      console.error(err)
      return false
    }
  }
}

export { CategoryStore, CategoryItemSerializer }
