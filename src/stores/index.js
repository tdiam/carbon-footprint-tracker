import { BasketStore } from './BasketStore'
import { PurchaseStore } from './PurchaseStore'
import { CategoryStore } from './CategoryStore'


class RootStore {
  constructor() {
    this.basketStore = new BasketStore(this)
    this.purchaseStore = new PurchaseStore(this)
    this.categoryStore = new CategoryStore(this)
  }
}

export default RootStore
