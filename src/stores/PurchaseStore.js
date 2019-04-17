import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'

import { picker } from 'utils/pick'
import { BasketItemSerializer } from './BasketStore'


const PurchaseItemSerializer = (item) => {
  item = picker('id', 'timestamp', 'basket')(item)
  item.basket = item.basket.map(BasketItemSerializer)
  return item
}

class PurchaseStore {
  constructor(root) {
    this.rootStore = root
  }

  @observable items = []
  @observable isLoading = true
  @observable _hasSyncedWithStorage = false

  @action
  async sync() {
    if (this._hasSyncedWithStorage) return
    let items = []

    try {
      items = await AsyncStorage.getItem('@Purchases:Items')
      items = JSON.parse(items)
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
  async removeAll() {
    this.items = []
    await this.save()
  }

  @action
  async save() {
    try {
      const json = JSON.stringify(this.items.map(PurchaseItemSerializer))
      await AsyncStorage.setItem('@Purchases:Items', json)
    } catch(err) {
      console.error(err)
    }
  }
}

export { PurchaseStore }
