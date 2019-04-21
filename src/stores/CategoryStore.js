import { observable, action, computed } from 'mobx'
import { AsyncStorage } from 'react-native'

import categories from 'data/categories'
import { picker } from 'utils/pick'


const CategoryItemSerializer = picker('id', 'name', 'image', 'unit', 'carbonPerUnit', '_builtin')

class CategoryStore {
  constructor(root) {
    this.rootStore = root
  }

  @observable items = new Map()
  @observable isLoading = true
  @observable _autoincrement = 0
  @observable _hasSyncedWithStorage = false

  @action
  async initialSeed() {
    const hasSeeded = await AsyncStorage.getItem('@Category:HasSeeded')
    if (hasSeeded === 'true') return

    this.setFromArray(categories)
    console.log('Replacing categories with:')
    console.table(categories)
    // Set autoincrement to one more than the max id (or 0 if no items)
    const autoincrement = Math.max(0, ...Array.from(this.items.keys())) + 1

    try {
      const success = await this.save()
      if (success) {
        await Promise.all([
          AsyncStorage.setItem('@Category:HasSeeded', 'true'),
          this._updateAutoincrement(autoincrement),
        ])
      }
    } catch(err) {
      console.error(err)
    }
  }

  @action
  async forceReseed() {
    try {
      await AsyncStorage.removeItem('@Category:HasSeeded')
      await this.initialSeed()
    } catch(err) {
      console.error(err)
    }
  }

  @action
  async sync() {
    if (this._hasSyncedWithStorage) return
    await this.initialSeed()

    let items = []

    try {
      items = await AsyncStorage.getItem('@Category:Items')
      items = !items ? [] : JSON.parse(items)
      if (items.constructor !== Array) {
        throw new Error('Stored category items is not an array')
      }
      this._autoincrement = parseInt(
        await AsyncStorage.getItem('@Category:ItemsAutoincrementId')
      )
    } catch(err) {
      console.error(err)
      items = []
    }

    this.setFromArray(items)
    this._hasSyncedWithStorage = true
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
    this.items.set(item.id, item)
    const success = await this.save()
    if (success) {
      await this._updateAutoincrement()
    }
    return item
  }

  @action
  setFromArray(items) {
    items.forEach(item => this.items.set(item.id, item))
  }

  @action
  async save() {
    try {
      const arr = Array.from(this.items.values())
      const json = JSON.stringify(arr.map(CategoryItemSerializer))
      await AsyncStorage.setItem('@Category:Items', json)
      return true
    } catch(err) {
      console.error(err)
      return false
    }
  }
}

export { CategoryStore, CategoryItemSerializer }
