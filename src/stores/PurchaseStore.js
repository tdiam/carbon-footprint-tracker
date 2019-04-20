import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'

import { picker } from 'utils/pick'
import { BasketItemSerializer } from './BasketStore'


const RECENT_PRODUCTS_MAX_LENGTH = 27

const PurchaseItemSerializer = (item) => {
  item = picker('id', 'timestamp', 'basket')(item)
  item.basket = item.basket.map(BasketItemSerializer)
  return item
}

const RecentProductSerializer = BasketItemSerializer

class PurchaseStore {
  constructor(root) {
    this.rootStore = root
  }

  @observable items = []
  @observable recentProducts = []
  @observable isLoading = true
  @observable _hasSyncedWithStorage = false

  @action
  async sync() {
    if (this._hasSyncedWithStorage) return
    let items = [], recentProducts = []

    try {
      items = await AsyncStorage.getItem('@Purchases:Items')
      items = !items ? [] : JSON.parse(items)
      if (items.constructor !== Array) {
        throw new Error('Stored purchase items is not an array')
      }
      recentProducts = await AsyncStorage.getItem('@Purchases:RecentProducts')
      recentProducts = !recentProducts ? [] : JSON.parse(recentProducts)
      if (recentProducts.constructor !== Array) {
        throw new Error('Stored recent products is not an array')
      }
    } catch(err) {
      console.error(err)
      items = []
      recentProducts = []
    }

    this.items = items
    this.recentProducts = recentProducts
    this._hasSyncedWithStorage = true
    return items
  }

  @action
  async addItem(item) {
    this.items.push(item)
    this.addToRecent(item.basket.slice())
    await this.save()
    return item
  }

  @action
  async addToRecent(products) {
    products.forEach(product => {
      // Add only if it doesn't already exist
      if (!this.recentProducts.some(p => p.productName === product.productName)) {
        // Basket id's don't make sense any more
        product.id = Math.floor(Math.random() * 1000000)
        this.recentProducts.push(product)
      }
    })

    const howManyExtra = this.recentProducts.length - RECENT_PRODUCTS_MAX_LENGTH
    // Remove oldest (from the beginning)
    // NOTE: If howManyExtra is <= 0, splice does nothing by default
    this.recentProducts.splice(0, howManyExtra)
  }

  @action
  async removeAll() {
    this.items = []
    this.recentProducts = []
    await this.save()
  }

  @action
  async save() {
    try {
      const pJson = JSON.stringify(this.items.map(PurchaseItemSerializer))
      const rJson = JSON.stringify(this.recentProducts.map(RecentProductSerializer))
      await Promise.all([
        AsyncStorage.setItem('@Purchases:Items', pJson),
        AsyncStorage.setItem('@Purchases:RecentProducts', rJson),
      ])
    } catch(err) {
      console.error(err)
    }
  }
}

export { PurchaseStore }
