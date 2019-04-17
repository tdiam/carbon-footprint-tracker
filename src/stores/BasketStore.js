import { observable, action } from 'mobx'
import { AsyncStorage } from 'react-native'


class BasketStore {
  constructor(root) {
    this.rootStore = root
  }

  @observable items = []
  @observable isLoading = true

  @action
  async addItem(data) {
    const item = new BasketItem(this, data)
    this.items.push(item)
    await this.save()
    return item
  }

  @action
  async getItems() {
    let items = []

    try {
      items = await AsyncStorage.getItem('@Basket:Items')
      items = JSON.parse(items)
      items = items.map(itemData => new BasketItem(this, itemData))
    } catch(err) {
      console.error(err)
      items = []
    }

    this.items = items
    return items
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
      const json = JSON.stringify(this.items.map(item => item.toJSON()))
      await AsyncStorage.setItem('@Basket:Items', json)
    } catch(err) {
      console.error(err)
    }
  }
}


class BasketItem {
  constructor(store, { id, productName, category, amount, amountUnit }) {
    this.store = store
    this.id = id
    this.productName = productName
    this.category = category
    this.amount = amount
    this.amountUnit = amountUnit
  }

  toJSON = () => ({
    id: this.id,
    productName: this.productName,
    category: this.category,
    amount: this.amount,
    amountUnit: this.amountUnit,
  })
}

export { BasketItem, BasketStore }
