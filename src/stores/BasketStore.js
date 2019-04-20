import { observable, action, computed } from 'mobx'
import { AsyncStorage } from 'react-native'

import { picker } from 'utils/pick'


const BasketItemSerializer = picker('id', 'productName', 'category', 'amount', 'amountUnit')

class BasketStore {
  constructor(root) {
    this.rootStore = root
  }

  @observable items = []
  @observable isLoading = true
  @observable _hasSyncedWithStorage = false

  @computed
  get size() {
    return this.items.length
  }

  @action
  async sync() {
    if (this._hasSyncedWithStorage) return

    let items = []

    try {
      items = await AsyncStorage.getItem('@Basket:Items')
      items = !items ? [] : JSON.parse(items)
      if (items.constructor !== Array) {
        throw new Error('Stored items is not an array')
      }
    } catch(err) {
      console.error(err)
      items = []
    }

    this.items = items
    this._hasSyncedWithStorage = true
    return items
  }

  @action
  async addItem(item) {
    this.items.push(item)
    await this.save()
    return item
  }

  @action
  async removeItem(id) {
    const index = this.items.findIndex(el => el.id === id)
    if (index < 0) {
      return undefined
    }
    // splice returns an array of the deleted elements
    const item = this.items.splice(index, 1)[0]
    await this.save()
    return item
  }

  @action
  async removeAll() {
    this.items = []
    await this.save()
  }

  @action
  async save() {
    try {
      const json = JSON.stringify(this.items.map(BasketItemSerializer))
      await AsyncStorage.setItem('@Basket:Items', json)
    } catch(err) {
      console.error(err)
    }
  }
}

export { BasketStore, BasketItemSerializer }
